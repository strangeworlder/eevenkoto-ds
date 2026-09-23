/**
 * Icon glyph tokens — single-tier inventory (like space / duration).
 * Components (Icon, Button, …) consume these; they do not own the list.
 */

/** Canonical name list. Storybook Tokens catalog iterates this. */
export const ICON_NAMES = [
  'star',
  'check',
  'arrow',
  'plus',
  'lock',
  'menu',
  'chevron-down',
  'chevron-right',
  'search',
  'user',
  'external-link',
] as const;

export type IconName = (typeof ICON_NAMES)[number];

/**
 * Control-safe subset for Button (and similar dense chrome).
 * Derived type keeps Button from re-listing names.
 */
export const BUTTON_ICON_NAMES = [
  'star',
  'check',
  'arrow',
  'plus',
  'lock',
  'menu',
  'search',
] as const;

export type ButtonIconName = (typeof BUTTON_ICON_NAMES)[number];

/** SVG path `d` values (16×16 viewBox). */
export const iconPaths: Record<IconName, string> = {
  star: 'M8 1.5a.75.75 0 0 1 .67.41l1.52 3.08 3.4.5a.75.75 0 0 1 .42 1.28l-2.46 2.4.58 3.39a.75.75 0 0 1-1.09.79L8 12.27l-3.04 1.6a.75.75 0 0 1-1.09-.79l.58-3.39-2.46-2.4a.75.75 0 0 1 .42-1.28l3.4-.5L7.33 1.91A.75.75 0 0 1 8 1.5Z',
  check:
    'M12.207 4.793a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L7 8.586l3.793-3.793a1 1 0 0 1 1.414 0Z',
  arrow:
    'M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L11.44 8.75H2.75a.75.75 0 0 1 0-1.5h8.69L8.22 4.03a.75.75 0 0 1 0-1.06Z',
  plus: 'M8 3a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 0 1.5h-3.5v3.5a.75.75 0 0 1-1.5 0v-3.5h-3.5a.75.75 0 0 1 0-1.5h3.5v-3.5A.75.75 0 0 1 8 3Z',
  lock: 'M8 1.5a3.25 3.25 0 0 0-3.25 3.25V6.5h1.75V4.75a1.5 1.5 0 0 1 3 0V6.5h1.75V4.75A3.25 3.25 0 0 0 8 1.5ZM3.75 7.5A1.25 1.25 0 0 0 2.5 8.75v4.5A1.25 1.25 0 0 0 3.75 14.5h8.5a1.25 1.25 0 0 0 1.25-1.25v-4.5A1.25 1.25 0 0 0 12.25 7.5h-8.5Z',
  menu: 'M2.75 4a.75.75 0 0 1 .75-.75h9.5a.75.75 0 0 1 0 1.5H3.5A.75.75 0 0 1 2.75 4Zm0 4a.75.75 0 0 1 .75-.75h9.5a.75.75 0 0 1 0 1.5H3.5A.75.75 0 0 1 2.75 8Zm0 4a.75.75 0 0 1 .75-.75h9.5a.75.75 0 0 1 0 1.5H3.5A.75.75 0 0 1 2.75 12Z',
  'chevron-down':
    'M3.22 5.97a.75.75 0 0 1 1.06 0L8 9.69l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L3.22 7.03a.75.75 0 0 1 0-1.06Z',
  'chevron-right':
    'M5.97 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L9.69 8 5.97 4.28a.75.75 0 0 1 0-1.06Z',
  search:
    'M7 2a5 5 0 1 0 3.09 8.93l2.49 2.49a.75.75 0 1 0 1.06-1.06l-2.49-2.49A5 5 0 0 0 7 2Zm0 1.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z',
  user: 'M8 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM4.5 9.5A2.5 2.5 0 0 0 2 12v.75c0 .69.56 1.25 1.25 1.25h9.5c.69 0 1.25-.56 1.25-1.25V12a2.5 2.5 0 0 0-2.5-2.5h-7Z',
  'external-link':
    'M9.25 2a.75.75 0 0 0 0 1.5h1.69L6.72 7.72a.75.75 0 1 0 1.06 1.06L12 4.56v1.69a.75.75 0 0 0 1.5 0v-3.5A.75.75 0 0 0 12.75 2h-3.5ZM3.5 4.5A1.5 1.5 0 0 0 2 6v6.5A1.5 1.5 0 0 0 3.5 14H10a1.5 1.5 0 0 0 1.5-1.5V9.25a.75.75 0 0 0-1.5 0v3.25H3.5V6h3.25a.75.75 0 0 0 0-1.5H3.5Z',
};
