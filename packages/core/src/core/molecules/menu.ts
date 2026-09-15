export interface MenuItemEntry {
  kind?: 'item';
  /** Stable entry id (used for selection / activation). */
  id: string;
  /** Visible label. */
  label: string;
  /** When true, the item is non-interactive. */
  disabled?: boolean;
  /** When set, the item renders as a link. */
  href?: string;
  /** Marks the current choice. */
  selected?: boolean;
}

export interface MenuHeaderEntry {
  kind: 'header';
  /** Visible group label. */
  label: string;
}

export interface MenuSeparatorEntry {
  kind: 'separator';
}

/**
 * Nested branch (eevenko.to-style sidebar sections).
 * Renders as `<details>` / `<summary>`; children indent one level.
 */
export interface MenuGroupEntry {
  kind: 'group';
  id: string;
  /** Branch label on the disclosure control. */
  label: string;
  /** Start open (`details` open attribute). Default: false */
  expanded?: boolean;
  children: MenuEntry[];
}

export type MenuEntry =
  | MenuItemEntry
  | MenuHeaderEntry
  | MenuSeparatorEntry
  | MenuGroupEntry;

export interface MenuProps {
  entries: MenuEntry[];
  /** Accessible name for the menu. */
  label?: string;
}

export const menuClassNames = (): string => 'eevenkoto-menu';

export const menuItemClassNames = (selected = false): string => {
  const selectedClass = selected ? ' eevenkoto-menu__item--selected' : '';
  return `eevenkoto-menu__item${selectedClass}`;
};

export const menuBranchClassNames = (): string => 'eevenkoto-menu__branch';

export const menuSummaryClassNames = (): string =>
  'eevenkoto-menu__item eevenkoto-menu__summary';

export const menuGroupClassNames = (): string => 'eevenkoto-menu__group';
