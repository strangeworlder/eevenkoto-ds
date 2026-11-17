export interface SwatchButtonProps {
  /** Optional DOM element `id` on `<button>`. */
  id?: string;
  /** CSS color value applied to the button background via `--eevenkoto-swatch-button-color`. */
  color: string;
  /** Optional uppercase role/slot label above the main shade label (e.g. "60 % Pääväri"). */
  roleLabel?: string;
  /** Primary shade or selection name. */
  label: string;
  /** Optional secondary hint line below `label` (e.g. "Vaihda" / "Sulje"). */
  hint?: string;
  /** Controls `aria-expanded` when toggling an associated picker panel. */
  expanded?: boolean;
  /** Highlights the button as currently active/selected. */
  active?: boolean;
  /** Disables interaction. */
  disabled?: boolean;
  /** Optional `aria-controls` target id (e.g. the controlled `Panel` id). */
  controls?: string;
}

export type SwatchButtonClassNameProps = Pick<SwatchButtonProps, 'active' | 'expanded'>;

export const swatchButtonClassNames = (props: SwatchButtonClassNameProps = {}): string =>
  [
    'eevenkoto-swatch-button',
    props.active || props.expanded ? 'eevenkoto-swatch-button--active' : '',
  ]
    .filter(Boolean)
    .join(' ');

export const swatchButtonContentClassNames = (): string => 'eevenkoto-swatch-button__content';
export const swatchButtonRoleClassNames = (): string => 'eevenkoto-swatch-button__role';
export const swatchButtonLabelClassNames = (): string => 'eevenkoto-swatch-button__label';
export const swatchButtonHintClassNames = (): string => 'eevenkoto-swatch-button__hint';
export const swatchButtonChevronClassNames = (): string => 'eevenkoto-swatch-button__chevron';
