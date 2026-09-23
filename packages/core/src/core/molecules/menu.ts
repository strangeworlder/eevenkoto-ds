import type { BadgeIntent } from '../atoms/badge';

export interface MenuItemEntry {
  kind?: 'item';
  /** Stable entry id (used for selection / activation). */
  id: string;
  /** Visible label. */
  label: string;
  /** When true, the item is non-interactive. */
  disabled?: boolean;
  /**
   * Gated leaf: trailing lock Icon. Keep `href` when login still navigates.
   * Sets `aria-disabled` when there is no followable href.
   */
  locked?: boolean;
  /** Accessible lock name. Default: Locked */
  lockedLabel?: string;
  /** Trailing StatusDot intent (readiness). */
  status?: BadgeIntent;
  /** Accessible name for the status pip. Default derived from intent in renderers. */
  statusLabel?: string;
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
  /**
   * Transparent flush surface for a sunken sidebar.
   * Default false = raised panel (Popover menus).
   */
  embedded?: boolean;
}

export type MenuClassNameProps = Pick<MenuProps, 'embedded'>;

export const menuClassNames = (props: MenuClassNameProps = {}): string =>
  ['eevenkoto-menu', props.embedded ? 'eevenkoto-menu--embedded' : '']
    .filter(Boolean)
    .join(' ');

export type MenuItemClassNameProps = Pick<MenuItemEntry, 'selected' | 'locked'>;

export const menuItemClassNames = (props: MenuItemClassNameProps = {}): string => {
  const selectedClass = props.selected ? ' eevenkoto-menu__item--selected' : '';
  const lockedClass = props.locked ? ' eevenkoto-menu__item--locked' : '';
  return `eevenkoto-menu__item${selectedClass}${lockedClass}`;
};

export const menuBranchClassNames = (): string => 'eevenkoto-menu__branch';

export const menuSummaryClassNames = (): string =>
  'eevenkoto-menu__item eevenkoto-menu__summary';

export const menuGroupClassNames = (): string => 'eevenkoto-menu__group';

export const menuItemLabelClassNames = (): string => 'eevenkoto-menu__item-label';
