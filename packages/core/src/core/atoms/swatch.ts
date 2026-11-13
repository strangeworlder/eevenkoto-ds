export type SwatchSize = 'sm' | 'md' | 'lg';
export type SwatchShape = 'circle' | 'rounded';

export interface SwatchProps {
  /** CSS color value applied via `--eevenkoto-swatch-color`. */
  color: string;
  /** Shared sm | md | lg size ladder. Default: `'md'` (`1.6rem`). */
  size?: SwatchSize;
  /** Geometry of the swatch sample. Default: `'circle'`. */
  shape?: SwatchShape;
  /**
   * Accessible name (`role="img"` + `aria-label`).
   * When omitted, the swatch is decorative (`aria-hidden="true"`).
   */
  label?: string;
}

export type SwatchClassNameProps = Pick<SwatchProps, 'size' | 'shape'>;

export const swatchClassNames = (props: SwatchClassNameProps = {}): string => {
  const size = props.size ?? 'md';
  const shape = props.shape ?? 'circle';
  return [
    'eevenkoto-swatch',
    `eevenkoto-swatch--${size}`,
    `eevenkoto-swatch--${shape}`,
  ].join(' ');
};
