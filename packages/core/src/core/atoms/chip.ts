export type ChipSize = 'sm' | 'md' | 'lg';

export interface ChipProps {
  /** Visible label. */
  label: string;
  /** Selected (pressed) state. Default: false (host = unselected). */
  selected?: boolean;
  /** Shared sm | md | lg ladder. Default: md */
  size?: ChipSize;
  /** When set, the chip renders as a link. */
  href?: string;
  disabled?: boolean;
}

export type ChipClassNameProps = Pick<ChipProps, 'selected' | 'size'>;

export const chipClassNames = (props: ChipClassNameProps = {}): string => {
  const size = props.size ?? 'md';
  return [
    'eevenkoto-chip',
    `eevenkoto-chip--${size}`,
    props.selected ? 'eevenkoto-chip--selected' : '',
  ]
    .filter(Boolean)
    .join(' ');
};
