/**
 * Semantic contrast tuples for light (`:root`) and dark (`[data-theme="dark"]`).
 *
 * WCAG 2.1 ratios via culori. Translucent fills are composited in sRGB before
 * the ratio is measured. Subtle feedback borders and boundary-subtle are
 * reported and do not fail the run.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { converter, formatHex, interpolate, parse, wcagContrast } from 'culori';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const tokensPath = join(rootDir, 'packages/css/tokens/tokens.css');
const primitivePath = join(rootDir, 'packages/css/tokens/primitive-tokens.css');

const toOklch = converter('oklch');
const toRgb = converter('rgb');

const SURFACES = ['canvas', 'subtle', 'sunken', 'raised'].map(
  (name) => `--eevenkoto-color-surface-${name}`,
);
const CONTENT_TEXT = [
  ['primary', 4.5],
  ['secondary', 4.5],
  ['tertiary', 3],
  ['accent', 3],
  ['accent-strong', 4.5],
  ['disabled', 3],
];

function collectBlock(css, selector) {
  const idx = css.indexOf(selector);
  if (idx < 0) return '';
  const start = css.indexOf('{', idx);
  let depth = 0;
  for (let i = start; i < css.length; i++) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}') {
      depth--;
      if (depth === 0) return css.slice(start + 1, i);
    }
  }
  return '';
}

function parseDecls(block) {
  const map = new Map();
  const re = /(--eevenkoto-[a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let match;
  while ((match = re.exec(block))) {
    map.set(match[1], match[2].trim());
  }
  return map;
}

function mergeMaps(...maps) {
  const out = new Map();
  for (const map of maps) {
    for (const [key, value] of map) out.set(key, value);
  }
  return out;
}

function splitCommas(value) {
  const parts = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < value.length; i++) {
    const char = value[i];
    if (char === '(') depth++;
    else if (char === ')') depth--;
    else if (char === ',' && depth === 0) {
      parts.push(value.slice(start, i));
      start = i + 1;
    }
  }
  parts.push(value.slice(start));
  return parts;
}

function parseStop(part) {
  const trimmed = part.trim();
  const match = trimmed.match(/^(.*?)(?:\s+(\d+(?:\.\d+)?)%)\s*$/);
  if (!match) return { color: trimmed, percent: null };
  return { color: match[1].trim(), percent: Number(match[2]) / 100 };
}

function asOklch(color) {
  const converted = toOklch(color);
  return {
    mode: 'oklch',
    l: converted.l,
    c: converted.c,
    h: converted.h ?? 0,
    alpha: converted.alpha ?? 1,
  };
}

function mixOklch(first, second, weightFirst, weightSecond) {
  const a = asOklch(first);
  const b = asOklch(second);
  const analogousA = a.alpha === 0 ? { ...b, alpha: 0 } : a;
  const analogousB = b.alpha === 0 ? { ...a, alpha: 0 } : b;
  const alpha = weightFirst * analogousA.alpha + weightSecond * analogousB.alpha;
  if (alpha === 0) return { mode: 'oklch', l: 0, c: 0, h: analogousA.h, alpha: 0 };
  const towardA = (weightFirst * analogousA.alpha) / alpha;
  const mixed = interpolate(
    [
      { mode: 'oklch', l: analogousB.l, c: analogousB.c, h: analogousB.h },
      { mode: 'oklch', l: analogousA.l, c: analogousA.c, h: analogousA.h },
    ],
    'oklch',
  )(towardA);
  return { ...mixed, alpha };
}

function resolveExpr(expr, maps, stack = new Set()) {
  let value = expr.trim();
  const variable = value.match(/^var\(\s*(--eevenkoto-[a-z0-9-]+)\s*(?:,\s*([\s\S]+))?\)\s*$/i);
  if (variable) {
    const name = variable[1];
    if (stack.has(name)) throw new Error(`Cycle: ${name}`);
    if (maps.has(name)) {
      stack.add(name);
      const resolved = resolveExpr(maps.get(name), maps, stack);
      stack.delete(name);
      return resolved;
    }
    if (variable[2]) return resolveExpr(variable[2], maps, stack);
    throw new Error(`Unknown token ${name}`);
  }

  if (/^color-mix\s*\(/i.test(value)) {
    const body = value.slice(value.indexOf('(') + 1, value.lastIndexOf(')'));
    const parts = splitCommas(body);
    if (!/^in\s+oklch$/i.test(parts[0].trim())) {
      throw new Error(`Unsupported color-mix: ${value}`);
    }
    const stops = parts.slice(1).map(parseStop);
    if (stops.length !== 2) throw new Error(`Expected two color-mix stops: ${value}`);
    const colors = stops.map((stop) => ({
      color: resolveExpr(stop.color, maps, stack),
      percent: stop.percent,
    }));
    let first = colors[0].percent;
    let second = colors[1].percent;
    if (first == null && second == null) {
      first = 0.5;
      second = 0.5;
    } else if (first == null) first = 1 - second;
    else if (second == null) second = 1 - first;
    const sum = first + second;
    if (sum <= 0) throw new Error(`Invalid color-mix weights: ${value}`);
    return mixOklch(colors[0].color, colors[1].color, first / sum, second / sum);
  }

  if (value === 'transparent') return { mode: 'rgb', r: 0, g: 0, b: 0, alpha: 0 };
  const parsed = parse(value);
  if (!parsed) throw new Error(`Cannot parse color: ${value}`);
  return parsed;
}

function composite(foreground, background) {
  const fg = toRgb(foreground);
  const bg = toRgb(background);
  const fgAlpha = fg.alpha ?? 1;
  const bgAlpha = bg.alpha ?? 1;
  if (fgAlpha >= 0.999 && bgAlpha >= 0.999) return fg;
  const outAlpha = fgAlpha + bgAlpha * (1 - fgAlpha);
  const channel = (fgChannel, bgChannel) =>
    (fgChannel * fgAlpha + bgChannel * bgAlpha * (1 - fgAlpha)) / (outAlpha || 1);
  return {
    mode: 'rgb',
    r: channel(fg.r, bg.r),
    g: channel(fg.g, bg.g),
    b: channel(fg.b, bg.b),
    alpha: outAlpha,
  };
}

function alphaOf(color) {
  return color.alpha ?? 1;
}

function visibleBackground(background, underlay) {
  if (alphaOf(background) === 0) return underlay;
  if (alphaOf(background) < 0.999) return composite(background, underlay);
  return background;
}

const primitives = parseDecls(collectBlock(readFileSync(primitivePath, 'utf8'), ':root'));
const tokensCss = readFileSync(tokensPath, 'utf8');
const lightDecls = parseDecls(collectBlock(tokensCss, ':root'));
const darkDecls = parseDecls(collectBlock(tokensCss, '[data-theme="dark"]'));
const themes = [
  ['light', mergeMaps(primitives, lightDecls)],
  ['dark', mergeMaps(primitives, lightDecls, darkDecls)],
];

const failures = [];
const notes = [];

function remember(kind, line) {
  const bucket = kind === 'fail' ? failures : notes;
  bucket.push(line);
  console.log(`${kind} ${line}`);
}

function ratioAgainst(fg, bg, underlay) {
  const base = underlay ? visibleBackground(bg, underlay) : bg;
  const ink = alphaOf(fg) < 0.999 ? composite(fg, base) : fg;
  // WCAG relative luminance is sRGB. Gamut-map before measuring so wide-gamut
  // oklch matches the color the browser (and axe) actually paint.
  return wcagContrast(formatHex(ink), formatHex(base));
}

function checkPair(colors, label, fgName, bgName, minimum, underlayNames = []) {
  const fg = colors.get(fgName);
  const bg = colors.get(bgName);
  if (!fg || !bg) {
    remember('fail', `${label} missing ${fg ? bgName : fgName}`);
    return;
  }
  const underlays =
    alphaOf(bg) < 0.999 ? underlayNames.map((name) => [name, colors.get(name)]) : [[null, null]];
  for (const [underName, underlay] of underlays) {
    if (underName && !underlay) {
      remember('fail', `${label} missing underlay ${underName}`);
      continue;
    }
    const ratio = ratioAgainst(fg, bg, underlay);
    const where = underName ? `${bgName} on ${underName}` : bgName;
    const line = `${label} ${fgName} on ${where}: ${ratio.toFixed(2)}:1 (need ${minimum}:1)`;
    if (!(ratio >= minimum)) remember('fail', line);
    else console.log(`pass ${line}`);
  }
}

function tokenExists(colors, name) {
  return colors.has(name);
}

function auditTheme(label, maps) {
  const colors = new Map();
  for (const name of maps.keys()) {
    if (!name.startsWith('--eevenkoto-color-')) continue;
    if (name.includes('-tint') || name.includes('depth-shadow')) continue;
    colors.set(name, resolveExpr(maps.get(name), maps));
  }

  const canvas = '--eevenkoto-color-surface-canvas';
  const raised = '--eevenkoto-color-surface-raised';

  for (const [role, minimum] of CONTENT_TEXT) {
    const fg = `--eevenkoto-color-content-${role}`;
    for (const surface of SURFACES) {
      checkPair(colors, label, fg, surface, minimum, [canvas]);
    }
  }

  const variants = [...colors.keys()]
    .map((name) => name.match(/^--eevenkoto-color-control-([a-z]+)-background$/))
    .filter(Boolean)
    .map((match) => match[1]);

  for (const variant of variants) {
    const text = `--eevenkoto-color-control-${variant}-text`;
    const icon = `--eevenkoto-color-control-${variant}-icon`;
    for (const state of ['', '-hover', '-active']) {
      const background = `--eevenkoto-color-control-${variant}-background${state}`;
      if (!tokenExists(colors, background)) continue;
      checkPair(colors, label, text, background, 4.5, [canvas]);
      if (tokenExists(colors, icon)) checkPair(colors, label, icon, background, 3, [canvas]);
    }
    const disabledBg = `--eevenkoto-color-control-${variant}-background-disabled`;
    const disabledText = `--eevenkoto-color-control-${variant}-text-disabled`;
    const disabledIcon = `--eevenkoto-color-control-${variant}-icon-disabled`;
    if (tokenExists(colors, disabledBg) && tokenExists(colors, disabledText)) {
      checkPair(colors, label, disabledText, disabledBg, 3, [canvas]);
    }
    if (tokenExists(colors, disabledBg) && tokenExists(colors, disabledIcon)) {
      checkPair(colors, label, disabledIcon, disabledBg, 3, [canvas]);
    }
  }

  const feedbackIntents = new Set();
  for (const name of colors.keys()) {
    const match = name.match(/^--eevenkoto-color-feedback-([a-z]+)(?:-solid)?-background$/);
    if (match) feedbackIntents.add(match[1]);
  }
  for (const intent of feedbackIntents) {
    for (const mode of ['', '-solid']) {
      const background = `--eevenkoto-color-feedback-${intent}${mode}-background`;
      const text = `--eevenkoto-color-feedback-${intent}${mode}-text`;
      const icon = `--eevenkoto-color-feedback-${intent}${mode}-icon`;
      if (!tokenExists(colors, background)) continue;
      checkPair(colors, label, text, background, 4.5, [canvas, raised]);
      if (tokenExists(colors, icon)) {
        checkPair(colors, label, icon, background, 3, [canvas, raised]);
      }
    }
  }

  const inputText = '--eevenkoto-color-form-input-text';
  for (const state of ['', '-hover', '-invalid']) {
    const background = `--eevenkoto-color-form-input-background${state}`;
    const text =
      state === '-invalid' ? '--eevenkoto-color-form-input-text-invalid' : inputText;
    if (!tokenExists(colors, background) || !tokenExists(colors, text)) continue;
    checkPair(colors, label, text, background, 4.5, [canvas]);
  }
  checkPair(
    colors,
    label,
    '--eevenkoto-color-form-input-message-invalid',
    canvas,
    4.5,
  );
  for (const border of [
    '--eevenkoto-color-form-input-border',
    '--eevenkoto-color-form-input-border-focus',
    '--eevenkoto-color-form-input-border-invalid',
  ]) {
    if (!tokenExists(colors, border)) continue;
    const borderColor = colors.get(border);
    if (alphaOf(borderColor) === 0) continue;
    checkPair(colors, label, border, canvas, 3);
  }
  if (
    tokenExists(colors, '--eevenkoto-color-form-input-text-disabled') &&
    tokenExists(colors, '--eevenkoto-color-form-input-background-disabled')
  ) {
    checkPair(
      colors,
      label,
      '--eevenkoto-color-form-input-text-disabled',
      '--eevenkoto-color-form-input-background-disabled',
      3,
      [canvas],
    );
  }

  const body = '--eevenkoto-color-content-primary';
  for (const state of ['default', 'hover', 'visited']) {
    const link = `--eevenkoto-color-link-${state}`;
    if (!tokenExists(colors, link)) continue;
    for (const surface of SURFACES) checkPair(colors, label, link, surface, 4.5, [canvas]);
    const linkColor = colors.get(link);
    const bodyColor = colors.get(body);
    const ratio = wcagContrast(formatHex(linkColor), formatHex(bodyColor));
    const line = `${label} ${link} against ${body}: ${ratio.toFixed(2)}:1 (need 3:1)`;
    if (!(ratio >= 3)) remember('fail', line);
    else console.log(`pass ${line}`);
  }

  const focusOuter = '--eevenkoto-color-boundary-focus-outer';
  for (const surface of SURFACES) checkPair(colors, label, focusOuter, surface, 3);
  const focusInner = '--eevenkoto-color-boundary-focus-inner';
  const fills = [...colors.keys()].filter(
    (name) =>
      /^--eevenkoto-color-control-[a-z]+-background(?:-hover|-active)?$/.test(name) ||
      /^--eevenkoto-color-form-input-background(?:-hover|-invalid)?$/.test(name),
  );
  for (const fill of fills) {
    const fillColor = colors.get(fill);
    // A fully transparent control has no inner edge. The outer ring carries the 3:1 boundary.
    if (fillColor && alphaOf(fillColor) === 0) continue;
    checkPair(colors, label, focusInner, fill, 3, [canvas]);
  }

  for (const name of colors.keys()) {
    const fade =
      name === '--eevenkoto-color-boundary-subtle' ||
      /^--eevenkoto-color-feedback-[a-z]+(?:-solid)?-border$/.test(name);
    if (!fade) continue;
    const color = colors.get(name);
    if (alphaOf(color) === 0) {
      remember('info', `${label} ${name} is transparent`);
      continue;
    }
    const ratio = ratioAgainst(color, colors.get(canvas), null);
    remember('info', `${label} ${name} on ${canvas}: ${ratio.toFixed(2)}:1`);
  }
}

for (const [label, maps] of themes) auditTheme(label, maps);

if (failures.length) {
  console.error(`\nContrast audit failed (${failures.length}).`);
  process.exit(1);
}
console.log(`\nContrast audit passed. ${notes.length} informational fade(s).`);
