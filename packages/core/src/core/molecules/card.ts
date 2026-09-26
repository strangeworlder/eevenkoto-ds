export type CardTitleLevel = 2 | 3;

export interface CardProps {
  /** Raises the surface with a depth shadow. Default: false */
  elevated?: boolean;
  /** Hover / focus affordance for clickable cards. Default: false */
  interactive?: boolean;
  /** Visible title in `<header>`. Optional. */
  title?: string;
  /** Heading level for `title`. Default: 2 (teaser, not a page entry). */
  titleLevel?: CardTitleLevel;
  /** Body copy as a `<p>`. Optional when using framework slots. */
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
