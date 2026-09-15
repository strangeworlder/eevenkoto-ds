export interface CardProps {
  /** Raises the surface with a depth shadow. Default: false */
  elevated?: boolean;
  /** Hover / focus affordance for clickable cards. Default: false */
  interactive?: boolean;
  /** Visible section title in `__header`. Optional. */
  title?: string;
  /** Body copy in `__body`. Optional when using framework slots. */
  body?: string;
}

export type CardClassNameProps = Pick<CardProps, 'elevated' | 'interactive'>;

export const cardClassNames = (props: CardClassNameProps = {}): string =>
  [
    'eevenkoto-card',
    props.elevated ? 'eevenkoto-card--elevated' : '',
    props.interactive ? 'eevenkoto-card--interactive' : '',
  ]
    .filter(Boolean)
    .join(' ');
