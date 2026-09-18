import stylelint from 'stylelint';

const { report, ruleMessages, validateOptions } = stylelint.utils;

const RAW =
  /(?:#[0-9a-fA-F]{3,8}\b|(?<![-\w])(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab)\s*\()/i;
const OKLCH_LITERAL = /(?<!in\s)oklch\s*\(/i;
const PRIMITIVE_HUES =
  /--eevenkoto-color-(?:turquoise|parchment|gold|green|orange|crimson|purple|obsidian)-/;
const FONT_LADDER = /--eevenkoto-font-size-(?:xs|sm|md|lg|xl|2xl|3xl)\b/;

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
    rejected: (value) => `Tier 1 primitive leaked: ${value}`,
  }),
  (root, result, messages) => {
    root.walkDecls((decl) => {
      const hay = `${decl.prop} ${decl.value}`;
      if (PRIMITIVE_HUES.test(hay) || FONT_LADDER.test(hay)) {
        report({
          message: messages.rejected(hay.slice(0, 120)),
          node: decl,
          result,
          ruleName: 'eevenkoto/no-primitive-in-components',
        });
      }
    });
  },
);

const FOCUS_ALLOW = /--eevenkoto-color-boundary-focus-(?:outer|inner)/;
const SYSTEM_COLOR =
  /\b(?:Canvas|CanvasText|ButtonText|ButtonFace|Highlight|LinkText|GrayText|transparent|currentColor|inherit|none)\b/;

export const enforcePrivateBridge = createRule(
  'eevenkoto/enforce-private-bridge',
  ruleMessages('eevenkoto/enforce-private-bridge', {
    rejected: (prop, value) =>
      `Property "${prop}" must read a private --_eevenkoto-* bridge, not ${value}`,
  }),
  (root, result, messages) => {
    root.walkDecls((decl) => {
      if (decl.prop.startsWith('--')) return;
      if (!/--eevenkoto-color-/.test(decl.value)) return;
      if (
        /^(?:outline|box-shadow)$/.test(decl.prop) &&
        FOCUS_ALLOW.test(decl.value) &&
        !PRIMITIVE_HUES.test(decl.value)
      ) {
        return;
      }
      if (SYSTEM_COLOR.test(decl.value) && !/--eevenkoto-color-/.test(decl.value)) return;
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

const plugins = [
  noRawColorLiterals,
  noInverseToken,
  requireTextTuple,
  requireDisabledTuple,
  noPrimitiveInComponents,
  enforcePrivateBridge,
  noSelfReferencingVars,
];

export default plugins;
