export type ListItemStatus = 'included' | 'accent' | 'excluded';

export interface ListItemProps {
  /** Visible item copy (`li` text node). Optional when `html` or framework slot is set. */
  text?: string;
  /** Trusted pre-rendered inline HTML for the list item. Takes precedence over `text`. */
  html?: string;
  /** Checklist status when parent `List` uses `variant="checklist"`. Default: `'included'`. */
  status?: ListItemStatus;
}

export const listItemClassNames = (status?: ListItemStatus): string =>
  status ? `eevenkoto-list__item eevenkoto-list__item--${status}` : '';
