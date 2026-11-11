/** Escape text for safe HTML text-node / attribute insertion. */
export const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const SIMPLE_INLINE_ALLOWLIST = new Set(['em', 'strong', 'i', 'b', 'code', 'abbr', 'sub', 'sup']);
const ATTR_INLINE_ALLOWLIST = new Set(['a', 'span', 'code', 'abbr']);
const COMMON_ATTR_ALLOWLIST = new Set([
  'class',
  'lang',
  'title',
  'aria-hidden',
  'aria-label',
  'aria-current',
]);
const ANCHOR_ATTR_ALLOWLIST = new Set([...COMMON_ATTR_ALLOWLIST, 'href', 'target', 'rel']);
const SVG_ATTR_ALLOWLIST = new Set([
  'class',
  'xmlns',
  'viewbox',
  'fill',
  'focusable',
  'aria-hidden',
  'role',
  'aria-label',
]);

const isSafeHref = (raw: string): boolean => {
  const trimmed = raw.trim().replace(/[\u0000-\u001f\u007f]+/g, '');
  if (!trimmed) return false;
  if (trimmed.startsWith('#') || trimmed.startsWith('/') || trimmed.startsWith('.')) return true;
  return /^(?:https?:|mailto:)/i.test(trimmed);
};

const sanitizeAttributes = (
  rawAttrs: string | undefined,
  allowed: ReadonlySet<string>,
  options?: { requireClassPrefix?: string; checkHref?: boolean },
): string | null => {
  if (!rawAttrs) {
    return options?.requireClassPrefix ? null : '';
  }
  const attrRegex = /([a-zA-Z_:][a-zA-Z0-9_.:-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  const out: string[] = [];
  let hasRequiredClass = false;
  let match: RegExpExecArray | null;

  while ((match = attrRegex.exec(rawAttrs)) !== null) {
    const rawName = match[1];
    const lower = rawName.toLowerCase();
    const val = match[2] ?? match[3] ?? match[4] ?? '';

    const isSafeData = /^data-[a-z0-9-]+$/.test(lower);
    if (!allowed.has(lower) && !isSafeData) continue;

    if (lower === 'href') {
      if (options?.checkHref && !isSafeHref(val)) continue;
    }

    if (lower === 'class' && options?.requireClassPrefix) {
      if (val.split(/\s+/).some((cls) => cls.startsWith(options.requireClassPrefix!))) {
        hasRequiredClass = true;
      }
    }

    const canonicalName = lower === 'viewbox' ? 'viewBox' : lower;
    out.push(` ${canonicalName}="${escapeHtml(val)}"`);
  }

  if (options?.requireClassPrefix && !hasRequiredClass) {
    return null;
  }

  return out.join('');
};

/**
 * Escape description copy while preserving a safe inline-tag allowlist
 * (`em`, `strong`, `i`, `b`, `code`, `abbr`, `sub`, `sup`, `br`, `a`, `span`,
 * and DS `.eevenkoto-icon` SVGs). Dangerous attributes and non-http(s)/relative
 * URL schemes are stripped; unknown tags are escaped as text.
 */
export const sanitizeInlineHtml = (value: string): string => {
  const parts = value.split(/(<\/?[a-zA-Z][^>]*>)/g);
  let openSvgDepth = 0;

  return parts
    .map((part) => {
      const voidBr = part.match(/^<br\s*\/?>$/i);
      if (voidBr) return '<br>';

      const selfClosePath = part.match(/^<path(\s[^>]*)?\/>$/i);
      if (selfClosePath && openSvgDepth > 0) {
        const attrs = sanitizeAttributes(selfClosePath[1], new Set(['d']));
        return attrs !== null ? `<path${attrs} />` : escapeHtml(part);
      }

      const open = part.match(/^<([a-zA-Z]+)(\s[^>]*)?>$/);
      if (open) {
        const tag = open[1].toLowerCase();
        const rawAttrs = open[2];

        if (tag === 'svg') {
          const attrs = sanitizeAttributes(rawAttrs, SVG_ATTR_ALLOWLIST, {
            requireClassPrefix: 'eevenkoto-icon',
          });
          if (attrs !== null) {
            openSvgDepth += 1;
            return `<svg${attrs}>`;
          }
          return escapeHtml(part);
        }

        if (tag === 'a') {
          const attrs = sanitizeAttributes(rawAttrs, ANCHOR_ATTR_ALLOWLIST, { checkHref: true });
          return `<a${attrs ?? ''}>`;
        }

        if (ATTR_INLINE_ALLOWLIST.has(tag)) {
          const attrs = sanitizeAttributes(rawAttrs, COMMON_ATTR_ALLOWLIST);
          return `<${tag}${attrs ?? ''}>`;
        }

        if (SIMPLE_INLINE_ALLOWLIST.has(tag)) {
          return `<${tag}>`;
        }

        return escapeHtml(part);
      }

      const close = part.match(/^<\/([a-zA-Z]+)>$/);
      if (close) {
        const tag = close[1].toLowerCase();
        if (tag === 'svg' && openSvgDepth > 0) {
          openSvgDepth -= 1;
          return '</svg>';
        }
        if (SIMPLE_INLINE_ALLOWLIST.has(tag) || ATTR_INLINE_ALLOWLIST.has(tag)) {
          return `</${tag}>`;
        }
        return escapeHtml(part);
      }

      return escapeHtml(part);
    })
    .join('');
};

/** Stable DOM id fragment from a visible label. */
export const slugifyId = (value: string): string => {
  const slug = value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || 'item';
};
