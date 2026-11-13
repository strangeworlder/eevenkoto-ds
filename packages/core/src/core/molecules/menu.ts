import type { IconName } from '../../tokens/icons';
import type { BadgeIntent } from '../atoms/badge';

export type MenuSize = 'sm' | 'md';
export type MenuItemTone = 'default' | 'destructive';

/** Safe HTML/data/ARIA attributes forwarded onto rendered menu elements. */
export type MenuAttributes = Record<string, string | boolean | undefined>;

export interface MenuItemEntry {
  kind?: 'item';
  /** Stable entry id (React/Vue keys; `onSelect` for the button escape hatch). */
  id: string;
  /** Visible label. */
  label: string;
  /** Optional leading glyph from token `ICON_NAMES` (renders decorative Icon). */
  icon?: IconName;
  /** Semantic action tone (`'destructive'` renders crimson action styling). Default: `'default'`. */
  tone?: MenuItemTone;
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
  /**
   * Destination URL. Navigation contract for HTML-first menus.
   * Omit only for the in-page button escape hatch.
   */
  href?: string;
  /** Marks the current page. Renderers set `aria-current="page"` on links. */
  selected?: boolean;
  /** Extra HTML attributes (`data-*`, `aria-*`, `target`, `rel`, etc.) applied to the rendered item control. */
  attributes?: MenuAttributes;
}

export interface MenuHeaderEntry {
  kind: 'header';
  id?: string;
  /** Visible group label. */
  label: string;
  /** Extra HTML attributes applied to the header element. */
  attributes?: MenuAttributes;
}

export interface MenuSeparatorEntry {
  kind: 'separator';
  id?: string;
  /** Extra HTML attributes applied to the separator `<hr>`. */
  attributes?: MenuAttributes;
}

/**
 * Nested branch (eevenko.to-style sidebar sections).
 * Renders as `<details>` / `<summary>` with a nested `<ul>`; supports arbitrary nesting depth.
 */
export interface MenuGroupEntry {
  kind: 'group';
  id: string;
  /** Branch label on the disclosure control. */
  label: string;
  /** Optional leading glyph on the disclosure control. */
  icon?: IconName;
  /** Start open (`details` open attribute). Default: false */
  expanded?: boolean;
  children: MenuEntry[];
  /** Extra HTML attributes (`data-*`, `aria-*`, etc.) applied to the `<details>` branch. */
  attributes?: MenuAttributes;
}

export type MenuEntry =
  | MenuItemEntry
  | MenuHeaderEntry
  | MenuSeparatorEntry
  | MenuGroupEntry;

export interface MenuProps {
  entries: MenuEntry[];
  /** Accessible name for the nav landmark. */
  label?: string;
  /**
   * Shared control size ladder: `sm | md`.
   * Default: `md` (host class alone is also `md` in CSS).
   */
  size?: MenuSize;
  /**
   * Transparent flush surface for a sunken sidebar.
   * Default false = raised plaque (auto-flush inside Popover).
   */
  embedded?: boolean;
}

export type MenuClassNameProps = Pick<MenuProps, 'embedded' | 'size'>;

export const menuClassNames = (props: MenuClassNameProps = {}): string =>
  [
    'eevenkoto-menu',
    props.size ? `eevenkoto-menu--${props.size}` : '',
    props.embedded ? 'eevenkoto-menu--embedded' : '',
  ]
    .filter(Boolean)
    .join(' ');

export type MenuItemClassNameProps = Pick<MenuItemEntry, 'selected' | 'locked' | 'tone'>;

/** Optional item BEM alias; CSS paints rows from `a` / `button` / `summary` under the host. */
export const menuItemClassNames = (props: MenuItemClassNameProps = {}): string => {
  const selectedClass = props.selected ? ' eevenkoto-menu__item--selected' : '';
  const lockedClass = props.locked ? ' eevenkoto-menu__item--locked' : '';
  const toneClass = props.tone === 'destructive' ? ' eevenkoto-menu__item--destructive' : '';
  return `eevenkoto-menu__item${selectedClass}${lockedClass}${toneClass}`;
};

export const menuBranchClassNames = (): string => 'eevenkoto-menu__branch';

export const menuSummaryClassNames = (): string =>
  'eevenkoto-menu__item eevenkoto-menu__summary';

export const menuGroupClassNames = (): string => 'eevenkoto-menu__group';

export const menuItemLabelClassNames = (): string => 'eevenkoto-menu__item-label';

export const menuIconClassNames = (): string => 'eevenkoto-menu__icon';
