export type ListItemStatus = 'included' | 'accent' | 'excluded';

export interface ListItemProps {
  /** Visible item copy (`li` text node). Optional when `html` or framework slot is set. */
  text?: string;
  /** Trusted pre-rendered inline HTML for the list item. Takes precedence over `text`. */
  html?: string;
  /** Checklist status when parent `List` uses `variant="checklist"`. Default: `'included'`. */
  status?: ListItemStatus;
  /** Optional leading Swatch color value (renders a non-interactive `sm` Swatch before the label). */
  swatchColor?: string;
}

export const listItemClassNames = (
  statusOrProps?: ListItemStatus | Pick<ListItemProps, 'status' | 'swatchColor'>,
): string => {
  const status = typeof statusOrProps === 'string' ? statusOrProps : statusOrProps?.status;
  const hasSwatch = typeof statusOrProps === 'object' && Boolean(statusOrProps?.swatchColor);
  if (!status && !hasSwatch) return '';
  return [
    'eevenkoto-list__item',
    status ? `eevenkoto-list__item--${status}` : '',
  ]
    .filter(Boolean)
    .join(' ');
};
