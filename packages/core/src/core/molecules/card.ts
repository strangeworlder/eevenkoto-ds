export type CardTitleLevel = 2 | 3;
export type CardSurface = 'raised' | 'subtle' | 'sunken';
export type CardAccent = 'none' | 'top' | 'start' | 'outline';
export type CardLayout = 'stack' | 'split';

export interface CardProps {
  /** Surface fill tier. Default: `'raised'`. */
  surface?: CardSurface;
  /** Decorative or structural accent edge/ring. Default: `'none'`. */
  accent?: CardAccent;
  /** Marks the card as the active/selected item with a high-contrast outer ring. Default: `false`. */
  current?: boolean;
  /** Content/actions layout. `'split'` aligns content on start and `actions` on end. Default: `'stack'`. */
  layout?: CardLayout;
  /** Raises the surface with a depth shadow. Default: false */
  elevated?: boolean;
  /** Hover / focus affordance for clickable cards. Default: false */
  interactive?: boolean;
  /** Visible title in `<header>`. Optional. */
  title?: string;
  /** Trusted pre-rendered inline HTML for `<header>` title. Takes precedence over `title`. */
  titleHtml?: string;
  /** Heading level for `title`. Default: 2 (teaser, not a page entry). */
  titleLevel?: CardTitleLevel;
  /** Body copy as a `<p>`. Optional when using framework slots. */
  body?: string;
  /**
   * Trusted pre-rendered HTML for card body copy (e.g. inline cross-references or
   * Markdown output). Wrapped in `<p>` unless it already begins with a block tag.
   */
  bodyHtml?: string;
}

export type CardClassNameProps = Pick<
  CardProps,
  'surface' | 'accent' | 'current' | 'layout' | 'elevated' | 'interactive'
>;

export const cardClassNames = (props: CardClassNameProps = {}): string => {
  const surface = props.surface ?? 'raised';
  const accent = props.accent ?? 'none';
  const layout = props.layout ?? 'stack';
  return [
    'eevenkoto-card',
    surface !== 'raised' ? `eevenkoto-card--surface-${surface}` : '',
    accent !== 'none' ? `eevenkoto-card--accent-${accent}` : '',
    props.current ? 'eevenkoto-card--current' : '',
    layout !== 'stack' ? `eevenkoto-card--${layout}` : '',
    props.elevated ? 'eevenkoto-card--elevated' : '',
    props.interactive ? 'eevenkoto-card--interactive' : '',
  ]
    .filter(Boolean)
    .join(' ');
};

export const cardHeaderActionsClassNames = (): string => 'eevenkoto-card__header-actions';
