/**
 * Dual-canvas contrast: content-primary vs canvas / subtle / sunken (WCAG 2.1 AA 4.5:1).
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, wcagContrast } from 'culori';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const tokensPath = join(rootDir, 'packages/css/tokens/tokens.css');
const primitivePath = join(rootDir, 'packages/css/tokens/primitive-tokens.css');

const PAIR_FG = '--eevenkoto-color-content-primary';
const PAIR_BGS = [
  '--eevenkoto-color-surface-canvas',
  '--eevenkoto-color-surface-subtle',
  '--eevenkoto-color-surface-sunken',
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
  let m;
  while ((m = re.exec(block))) {
    map.set(m[1], m[2].trim());
  }
  return map;
}

function mergeMaps(...maps) {
  const out = new Map();
  for (const map of maps) {
    for (const [k, v] of map) out.set(k, v);
  }
  return out;
}

function resolve(name, maps, stack = new Set()) {
  if (stack.has(name)) throw new Error(`Cycle: ${name}`);
  stack.add(name);
  let value = maps.get(name);
  if (value == null) throw new Error(`Unknown token ${name}`);
  for (let i = 0; i < 20; i++) {
    const varMatch = value.match(/^var\(\s*(--eevenkoto-[a-z0-9-]+)\s*(?:,([^)]*))?\)$/i);
    if (varMatch) {
      if (maps.has(varMatch[1])) {
        value = resolve(varMatch[1], maps, new Set(stack));
        continue;
      }
      if (varMatch[2]) {
        value = varMatch[2].trim();
        continue;
      }
    }
    const nested = value.match(/var\(\s*(--eevenkoto-[a-z0-9-]+)\s*\)/i);
    if (nested && maps.has(nested[1])) {
      const inner = resolve(nested[1], maps, new Set(stack));
      value = value.replace(nested[0], inner);
      continue;
    }
    break;
  }
  return value;
}

function toColor(value) {
  if (value === 'transparent') return parse('oklch(1 0 0 / 0)');
  const parsed = parse(value);
  if (!parsed) throw new Error(`Cannot parse color: ${value}`);
  return parsed;
}

function auditTheme(label, maps) {
  const fg = toColor(resolve(PAIR_FG, maps));
  const failures = [];
  for (const bgName of PAIR_BGS) {
    const bg = toColor(resolve(bgName, maps));
    const ratio = wcagContrast(fg, bg);
    const ok = ratio >= 4.5;
    const line = `${label} ${PAIR_FG} on ${bgName}: ${ratio.toFixed(2)}:1`;
    console.log(ok ? `pass ${line}` : `FAIL ${line}`);
    if (!ok) failures.push(line);
  }
  return failures;
}

const primitives = parseDecls(collectBlock(readFileSync(primitivePath, 'utf8'), ':root'));
const tokensCss = readFileSync(tokensPath, 'utf8');
const light = mergeMaps(primitives, parseDecls(collectBlock(tokensCss, ':root')));
const darkDecls = parseDecls(collectBlock(tokensCss, '[data-theme="dark"]'));
const dark = mergeMaps(light, darkDecls);

const failures = [
  ...auditTheme('light', light),
  ...(darkDecls.size ? auditTheme('dark', dark) : []),
];

if (failures.length) {
  console.error('\nContrast audit failed.');
  process.exit(1);
}
console.log('\nContrast audit passed.');
