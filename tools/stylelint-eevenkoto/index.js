import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import stylelint from 'stylelint';

const { report, ruleMessages, validateOptions } = stylelint.utils;

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '../..');
const primitiveTokensPath = join(repoRoot, 'packages/css/tokens/primitive-tokens.css');
const semanticTokensPath = join(repoRoot, 'packages/css/tokens/tokens.css');
const cssPackageDir = join(repoRoot, 'packages/css');

function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

function collectDeclaredCustomProps(css, prefix = '--') {
  const out = new Set();
  const clean = stripComments(css);
  const re = /(--_?eevenkoto-[a-z0-9-]+)\s*:/gi;
  let match;
  while ((match = re.exec(clean))) {
    if (match[1].startsWith(prefix)) out.add(match[1]);
  }
  return out;
}

function walkCssFiles(dir, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walkCssFiles(full, files);
    else if (entry.isFile() && entry.name.endsWith('.css')) files.push(full);
  }
  return files;
}

function loadTokenInventory() {
  const primitiveCss = readFileSync(primitiveTokensPath, 'utf8');
  const semanticCss = readFileSync(semanticTokensPath, 'utf8');
  const primitiveTokens = collectDeclaredCustomProps(primitiveCss, '--eevenkoto-');
  const tier2Tokens = collectDeclaredCustomProps(semanticCss, '--eevenkoto-');

  const declaredPublicComponentTokens = new Set();
  const declaredPrivateTokens = new Set();
  for (const file of walkCssFiles(cssPackageDir)) {
    if (file === primitiveTokensPath || file === semanticTokensPath) continue;
    const css = readFileSync(file, 'utf8');
    for (const prop of collectDeclaredCustomProps(css, '--eevenkoto-')) {
      declaredPublicComponentTokens.add(prop);
    }
    for (const prop of collectDeclaredCustomProps(css, '--_eevenkoto-')) {
      declaredPrivateTokens.add(prop);
    }
  }

  return {
    primitiveTokens,
    tier2Tokens,
    declaredPublicComponentTokens,
    declaredPrivateTokens,
  };
}

const INVENTORY = loadTokenInventory();

const RAW =
  /(?:#[0-9a-fA-F]{3,8}\b|(?<![-\w])(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab)\s*\()/i;
const OKLCH_LITERAL = /(?<!in\s)oklch\s*\(/i;
const GLOBAL_NAMESPACE =
  /^--eevenkoto-(?:color|space|radius|font|line|duration|ease|transition|icon-mask)-/;
const FOCUS_ALLOW = /^--eevenkoto-color-boundary-focus-(?:outer|inner)$/;
const VISITED_ALLOW = /^--eevenkoto-color-link-visited$/;
const SYSTEM_COLOR =
  /\b(?:Canvas|CanvasText|ButtonText|ButtonFace|Highlight|LinkText|VisitedText|GrayText|transparent|currentColor|inherit|none)\b/;
const STATE_BRIDGE_SUFFIX =
  /(?:^|-)(?:hover|active|disabled|invalid|checked|error)(?:$|-)/;
const MODIFIER_OR_STATE_SELECTOR =
  /(?:--[a-z0-9-]+|:(?:hover|active|focus|focus-visible|focus-within|disabled|checked|invalid|user-invalid|visited)\b|\[(?:open|aria-|data-))/i;
const EMBEDDED_SVG_PATH = /(?:<path\b|%3Cpath\b)/i;

function extractVarCalls(value) {
  const calls = [];
  const lower = value.toLowerCase();
  let idx = 0;
  while (idx < value.length) {
    const pos = lower.indexOf('var(', idx);
    if (pos < 0) break;
    const prev = pos > 0 ? value[pos - 1] : '';
    if (/[-\w]/.test(prev)) {
      idx = pos + 4;
      continue;
    }
    let depth = 1;
    let cursor = pos + 4;
    let commaAt = -1;
    while (cursor < value.length && depth > 0) {
      const ch = value[cursor];
      if (ch === '(') depth++;
      else if (ch === ')') depth--;
      else if (ch === ',' && depth === 1 && commaAt < 0) commaAt = cursor;
      cursor++;
    }
    if (depth === 0) {
      const end = cursor - 1;
      const name = (commaAt >= 0 ? value.slice(pos + 4, commaAt) : value.slice(pos + 4, end)).trim();
      const hasFallback = commaAt >= 0;
      calls.push({ name, hasFallback });
    }
    idx = pos + 4;
  }
  return calls;
}

function extractColorMixCalls(value) {
  const calls = [];
  const lower = value.toLowerCase();
  let idx = 0;
  while (idx < value.length) {
    const pos = lower.indexOf('color-mix(', idx);
    if (pos < 0) break;
    let depth = 1;
    let cursor = pos + 10;
    while (cursor < value.length && depth > 0) {
      if (value[cursor] === '(') depth++;
      else if (value[cursor] === ')') depth--;
      cursor++;
    }
    if (depth === 0) {
      calls.push(value.slice(pos + 10, cursor - 1));
    }
    idx = pos + 10;
  }
  return calls;
}

function splitTopLevelCommas(str) {
  const parts = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') depth++;
    else if (str[i] === ')') depth--;
    else if (str[i] === ',' && depth === 0) {
      parts.push(str.slice(start, i).trim());
      start = i + 1;
    }
  }
  parts.push(str.slice(start).trim());
  return parts;
}

function createRule(ruleName, messages, check) {
  const ruleFn = (primary) => (root, result) => {
    if (!validateOptions(result, ruleName, { actual: primary })) return;
    if (primary === false) return;
    check(root, result, messages);
  };
  ruleFn.ruleName = ruleName;
  ruleFn.messages = messages;
  ruleFn.meta = { url: 'https://github.com/eevenkoto/eevenkoto-ds' };
  return stylelint.createPlugin(ruleName, ruleFn);
}

export const noRawColorLiterals = createRule(
  'eevenkoto/no-raw-color-literals',
  ruleMessages('eevenkoto/no-raw-color-literals', {
    rejected: (value) => `Unexpected raw color in "${value}"`,
  }),
  (root, result, messages) => {
    root.walkDecls((decl) => {
      const value = decl.value;
      if (RAW.test(value) || OKLCH_LITERAL.test(value)) {
        report({
          message: messages.rejected(value),
          node: decl,
          result,
          ruleName: 'eevenkoto/no-raw-color-literals',
        });
      }
    });
  },
);

export const noInverseToken = createRule(
  'eevenkoto/no-inverse-token',
  ruleMessages('eevenkoto/no-inverse-token', {
    rejected: (prop) => `Banned inverse token name "${prop}"`,
  }),
  (root, result, messages) => {
    root.walkDecls((decl) => {
      if (decl.prop.includes('-inverse')) {
        report({
          message: messages.rejected(decl.prop),
          node: decl,
          result,
          ruleName: 'eevenkoto/no-inverse-token',
        });
      }
    });
  },
);

export const requireTextTuple = createRule(
  'eevenkoto/require-text-tuple',
  ruleMessages('eevenkoto/require-text-tuple', {
    rejected: (bg, text) => `Token ${bg} requires matching ${text} in the same rule`,
  }),
  (root, result, messages) => {
    root.walkRules((rule) => {
      const props = new Set();
      rule.walkDecls((decl) => {
        if (decl.prop.startsWith('--')) props.add(decl.prop);
      });
      for (const prop of props) {
        if (!prop.startsWith('--eevenkoto-color-')) continue;
        if (!prop.endsWith('-background') && !prop.endsWith('-solid-background')) continue;
        if (prop.includes('-background-')) continue;
        const textProp = prop.replace(/-background$/, '-text');
        if (!props.has(textProp)) {
          report({
            message: messages.rejected(prop, textProp),
            node: rule,
            result,
            ruleName: 'eevenkoto/require-text-tuple',
          });
        }
      }
    });
  },
);

export const requireDisabledTuple = createRule(
  'eevenkoto/require-disabled-tuple',
  ruleMessages('eevenkoto/require-disabled-tuple', {
    rejected: (bg) =>
      `${bg} requires matching -text-disabled and -border-disabled in the same rule`,
  }),
  (root, result, messages) => {
    root.walkRules((rule) => {
      const props = new Set();
      rule.walkDecls((decl) => {
        if (decl.prop.startsWith('--')) props.add(decl.prop);
      });
      for (const prop of props) {
        if (!prop.endsWith('-background-disabled')) continue;
        const text = prop.replace(/-background-disabled$/, '-text-disabled');
        const border = prop.replace(/-background-disabled$/, '-border-disabled');
        if (!props.has(text) || !props.has(border)) {
          report({
            message: messages.rejected(prop),
            node: rule,
            result,
            ruleName: 'eevenkoto/require-disabled-tuple',
          });
        }
      }
    });
  },
);

export const noPrimitiveInComponents = createRule(
  'eevenkoto/no-primitive-in-components',
  ruleMessages('eevenkoto/no-primitive-in-components', {
    rejected: (token) => `Tier 1 primitive leaked: ${token}`,
  }),
  (root, result, messages) => {
    root.walkDecls((decl) => {
      const hay = `${decl.prop} ${decl.value}`;
      const re = /--eevenkoto-[a-z0-9-]+/g;
      let match;
      while ((match = re.exec(hay))) {
        const token = match[0];
        if (INVENTORY.primitiveTokens.has(token) && !INVENTORY.tier2Tokens.has(token)) {
          report({
            message: messages.rejected(token),
            node: decl,
            result,
            ruleName: 'eevenkoto/no-primitive-in-components',
          });
        }
      }
    });
  },
);

export const enforcePrivateBridge = createRule(
  'eevenkoto/enforce-private-bridge',
  ruleMessages('eevenkoto/enforce-private-bridge', {
    rejected: (prop, value) =>
      `Property "${prop}" must read a private --_eevenkoto-* bridge, not ${value}`,
  }),
  (root, result, messages) => {
    root.walkDecls((decl) => {
      if (decl.prop.startsWith('--')) return;
      const colorRefs = decl.value.match(/--eevenkoto-color-[a-z0-9-]+/g);
      if (!colorRefs) return;
      if (
        /^(?:outline|outline-color|box-shadow)$/.test(decl.prop) &&
        colorRefs.every((ref) => FOCUS_ALLOW.test(ref))
      ) {
        return;
      }
      if (
        decl.prop === 'color' &&
        decl.parent?.type === 'rule' &&
        decl.parent.selector.includes(':visited') &&
        colorRefs.every((ref) => VISITED_ALLOW.test(ref))
      ) {
        return;
      }
      if (SYSTEM_COLOR.test(decl.value) && colorRefs.length === 0) return;
      report({
        message: messages.rejected(decl.prop, decl.value.trim().slice(0, 80)),
        node: decl,
        result,
        ruleName: 'eevenkoto/enforce-private-bridge',
      });
    });
  },
);

export const noSelfReferencingVars = createRule(
  'eevenkoto/no-self-referencing-vars',
  ruleMessages('eevenkoto/no-self-referencing-vars', {
    rejected: (prop) => `Public token "${prop}" must not fall back to itself`,
  }),
  (root, result, messages) => {
    root.walkDecls((decl) => {
      if (!decl.prop.startsWith('--eevenkoto-') || decl.prop.startsWith('--_')) return;
      const escaped = decl.prop.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const self = new RegExp(`var\\(\\s*${escaped}\\s*[,)]`);
      if (self.test(decl.value)) {
        report({
          message: messages.rejected(decl.prop),
          node: decl,
          result,
          ruleName: 'eevenkoto/no-self-referencing-vars',
        });
      }
    });
  },
);

export const noUnknownTokens = createRule(
  'eevenkoto/no-unknown-tokens',
  ruleMessages('eevenkoto/no-unknown-tokens', {
    rejected: (token) => `Unknown or undefined token "${token}"`,
  }),
  (root, result, messages) => {
    const file = (root.source?.input?.file ?? '').replace(/\\/g, '/');
    const isTokensSheet = file.endsWith('/packages/css/tokens/tokens.css');

    root.walkDecls((decl) => {
      for (const { name, hasFallback } of extractVarCalls(decl.value)) {
        if (isTokensSheet) {
          if (
            name.startsWith('--eevenkoto-') &&
            !INVENTORY.primitiveTokens.has(name) &&
            !INVENTORY.tier2Tokens.has(name)
          ) {
            report({
              message: messages.rejected(name),
              node: decl,
              result,
              ruleName: 'eevenkoto/no-unknown-tokens',
            });
          }
          continue;
        }

        if (name.startsWith('--_eevenkoto-')) {
          if (!hasFallback && !INVENTORY.declaredPrivateTokens.has(name)) {
            report({
              message: messages.rejected(name),
              node: decl,
              result,
              ruleName: 'eevenkoto/no-unknown-tokens',
            });
          }
          continue;
        }

        if (!name.startsWith('--eevenkoto-')) continue;
        // Leaked Tier 1 primitives are reported by eevenkoto/no-primitive-in-components.
        if (INVENTORY.primitiveTokens.has(name) && !INVENTORY.tier2Tokens.has(name)) continue;

        if (GLOBAL_NAMESPACE.test(name)) {
          if (!INVENTORY.tier2Tokens.has(name)) {
            report({
              message: messages.rejected(name),
              node: decl,
              result,
              ruleName: 'eevenkoto/no-unknown-tokens',
            });
          }
        } else if (!hasFallback && !INVENTORY.declaredPublicComponentTokens.has(name)) {
          report({
            message: messages.rejected(name),
            node: decl,
            result,
            ruleName: 'eevenkoto/no-unknown-tokens',
          });
        }
      }
    });
  },
);

export const constrainTier2ColorMix = createRule(
  'eevenkoto/constrain-tier2-color-mix',
  ruleMessages('eevenkoto/constrain-tier2-color-mix', {
    invalidSpace: (expr) =>
      `Tier 2 color-mix must interpolate "in oklch": color-mix(${expr})`,
    hueMix: (expr) =>
      `Tier 2 color-mix may only mix a single pigment with transparent or a *-tint-disabled* endpoint (define a Tier 1 stop instead): color-mix(${expr})`,
  }),
  (root, result, messages) => {
    root.walkDecls((decl) => {
      for (const inner of extractColorMixCalls(decl.value)) {
        const parts = splitTopLevelCommas(inner);
        if (parts.length !== 3 || !/^in\s+oklch$/i.test(parts[0])) {
          report({
            message: messages.invalidSpace(inner.slice(0, 100)),
            node: decl,
            result,
            ruleName: 'eevenkoto/constrain-tier2-color-mix',
          });
          continue;
        }
        const stops = parts.slice(1);
        const allowedEndpoint = stops.some(
          (stop) =>
            /^transparent(?:\s+\d+(?:\.\d+)?%)?$/i.test(stop) ||
            /--eevenkoto-color-[a-z0-9-]+-tint-disabled/.test(stop),
        );
        if (!allowedEndpoint) {
          report({
            message: messages.hueMix(inner.slice(0, 100)),
            node: decl,
            result,
            ruleName: 'eevenkoto/constrain-tier2-color-mix',
          });
        }
      }
    });
  },
);

export const privateBridgeHygiene = createRule(
  'eevenkoto/private-bridge-hygiene',
  ruleMessages('eevenkoto/private-bridge-hygiene', {
    stateNamed: (prop) =>
      `Private bridge "${prop}" must be stateless; move state onto public --eevenkoto-* overrides`,
    reassignedOnState: (prop, selector) =>
      `Do not assign private bridge "${prop}" on modifier/state selector "${selector}"; set public --eevenkoto-* instead`,
    duplicateBridge: (prop) =>
      `Private bridge "${prop}" is declared multiple times; declare it once on its host and override via public --eevenkoto-*`,
    embeddedSvgPath: () =>
      'Do not embed SVG <path> strings in component CSS; use @eevenkoto/core iconPaths or canonical mask tokens in tokens.css',
  }),
  (root, result, messages) => {
    const seenPrivateBridges = new Set();

    root.walkDecls((decl) => {
      if (EMBEDDED_SVG_PATH.test(decl.value)) {
        report({
          message: messages.embeddedSvgPath(),
          node: decl,
          result,
          ruleName: 'eevenkoto/private-bridge-hygiene',
        });
      }

      if (!decl.prop.startsWith('--_eevenkoto-')) return;
      if (decl.parent?.type === 'atrule' && decl.parent.name === 'property') return;

      if (seenPrivateBridges.has(decl.prop)) {
        report({
          message: messages.duplicateBridge(decl.prop),
          node: decl,
          result,
          ruleName: 'eevenkoto/private-bridge-hygiene',
        });
      }
      seenPrivateBridges.add(decl.prop);

      const suffix = decl.prop.replace(/^--_eevenkoto-/, '');
      if (STATE_BRIDGE_SUFFIX.test(suffix)) {
        report({
          message: messages.stateNamed(decl.prop),
          node: decl,
          result,
          ruleName: 'eevenkoto/private-bridge-hygiene',
        });
      }

      if (decl.parent?.type === 'rule') {
        const selector = decl.parent.selector;
        if (MODIFIER_OR_STATE_SELECTOR.test(selector)) {
          report({
            message: messages.reassignedOnState(decl.prop, selector),
            node: decl,
            result,
            ruleName: 'eevenkoto/private-bridge-hygiene',
          });
        }
      }
    });
  },
);

const plugins = [
  noRawColorLiterals,
  noInverseToken,
  requireTextTuple,
  requireDisabledTuple,
  noPrimitiveInComponents,
  enforcePrivateBridge,
  noSelfReferencingVars,
  noUnknownTokens,
  constrainTier2ColorMix,
  privateBridgeHygiene,
];

export default plugins;
