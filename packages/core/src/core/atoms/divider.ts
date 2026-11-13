export type DividerSpacing = 'sm' | 'md' | 'lg';
export type DividerVariant = 'solid' | 'dashed';

export interface DividerProps {
  /** Vertical block margin around the rule. Default: `'lg'` (`space-6`). */
  spacing?: DividerSpacing;
  /** Stroke style. Default: `'solid'`. */
  variant?: DividerVariant;
}

export type DividerClassNameProps = Pick<DividerProps, 'spacing' | 'variant'>;

export const dividerClassNames = (props: DividerClassNameProps = {}): string => {
  const spacing = props.spacing ?? 'lg';
  const variant = props.variant ?? 'solid';
  return [
    'eevenkoto-divider',
    spacing !== 'lg' ? `eevenkoto-divider--spacing-${spacing}` : '',
    variant !== 'solid' ? `eevenkoto-divider--${variant}` : '',
  ]
    .filter(Boolean)
    .join(' ');
};
