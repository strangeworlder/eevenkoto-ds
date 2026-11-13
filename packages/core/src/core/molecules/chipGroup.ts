import type { IconName } from '../../tokens/icons';
import type { ChipSize } from '../atoms/chip';

export type ChipGroupMode = 'single' | 'multiple';
export type ChipGroupAttributes = Record<string, string | boolean | undefined>;

export interface ChipGroupOption {
  value: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  title?: string;
  icon?: IconName;
  swatchColor?: string;
  href?: string;
  attributes?: ChipGroupAttributes;
}

export interface ChipGroupProps {
  /** Optional DOM element `id` on `<fieldset>`. */
  id?: string;
  /** Accessible group legend. */
  label: string;
  /** Visually hide `<legend>` while keeping it for screen readers. Default: `false`. */
  hideLegend?: boolean;
  /** Selection semantics (`'single'` or `'multiple'`). Default: `'single'`. */
  mode?: ChipGroupMode;
  /** Chip size ladder. Default: `'sm'`. */
  size?: ChipSize;
  /** Hide the entire group (`hidden` attribute). Default: `false`. */
  hidden?: boolean;
  options: ChipGroupOption[];
}

export const chipGroupClassNames = (): string => 'eevenkoto-chip-group';
export const chipGroupLegendClassNames = (hideLegend = false): string =>
  hideLegend
    ? 'eevenkoto-chip-group__legend eevenkoto-visually-hidden'
    : 'eevenkoto-chip-group__legend';
export const chipGroupListClassNames = (): string => 'eevenkoto-chip-group__list';
