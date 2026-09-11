/** Escape text for safe HTML text-node / attribute insertion. */
export const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const INLINE_ALLOWLIST = new Set(['em', 'strong', 'i', 'b', 'br']);

/**
 * Escape description copy while preserving a small inline-tag allowlist.
 * Attributes are stripped. Unknown tags are escaped as text.
 */
export const sanitizeInlineHtml = (value: string): string => {
  const parts = value.split(/(<\/?[a-zA-Z][^>]*>)/g);
  return parts
    .map((part) => {
      const open = part.match(/^<([a-zA-Z]+)(\s[^>]*)?>$/);
      if (open) {
        const tag = open[1].toLowerCase();
        return INLINE_ALLOWLIST.has(tag) ? `<${tag}>` : escapeHtml(part);
      }
      const close = part.match(/^<\/([a-zA-Z]+)>$/);
      if (close) {
        const tag = close[1].toLowerCase();
        return INLINE_ALLOWLIST.has(tag) && tag !== 'br' ? `</${tag}>` : escapeHtml(part);
      }
      const voidBr = part.match(/^<br\s*\/?>$/i);
      if (voidBr) return '<br>';
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
