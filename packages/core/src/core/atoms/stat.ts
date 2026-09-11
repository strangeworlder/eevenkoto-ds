export type StatShape = 'disk' | 'arch' | 'shield';
export type StatSize = 'sm' | 'md' | 'lg';

export interface StatProps {
  /** Displayed numeric or signed value (e.g. `16`, `+3`). */
  value: string;
  /** Geometric treatment. Default: `disk` */
  shape?: StatShape;
  /** Shared sm | md | lg ladder. Default: `md` */
  size?: StatSize;
  /**
   * Deep accent border (`content-accent-strong`) plus a thicker stroke/outline
   * so emphasis is not color-only. Used for proficient saving throws.
   */
  emphasis?: boolean;
}

export type StatClassNameProps = Pick<StatProps, 'shape' | 'size' | 'emphasis'>;

export const statClassNames = (props: StatClassNameProps = {}): string => {
  const shape = props.shape ?? 'disk';
  const size = props.size ?? 'md';
  const emphasis = props.emphasis ? ' eevenkoto-stat--emphasis' : '';
  return `eevenkoto-stat eevenkoto-stat--${shape} eevenkoto-stat--${size}${emphasis}`;
};
