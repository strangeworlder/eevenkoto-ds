export type TooltipCardTitleLevel = 2 | 3;

export interface TooltipCardProps {
  /** Visible title in `<header>`. Optional. */
  title?: string;
  /** Heading level for `title`. Default: 2 (preview panel, not a page entry). */
  titleLevel?: TooltipCardTitleLevel;
  /** Body copy in `__body`. Optional when using framework slots or `bodyHtml`. */
  body?: string;
  /** Trusted pre-rendered HTML for `__body`. Takes precedence over `body`. */
  bodyHtml?: string;
  /** Removes body padding for embedded full-bleed blocks. Default: `false`. */
  flush?: boolean;
}

export type TooltipCardClassNameProps = Pick<TooltipCardProps, 'flush'>;

export const tooltipCardClassNames = (props: TooltipCardClassNameProps = {}): string =>
  ['eevenkoto-tooltip-card', props.flush ? 'eevenkoto-tooltip-card--flush' : '']
    .filter(Boolean)
    .join(' ');

/**
 * The body caps itself at `--eevenkoto-tooltip-card-body-max-block-size` and scrolls.
 * `eevenkoto-prose` is required: bare `p` / `ul` / `ol` / `li` only get type styles under Prose.
 */
export const tooltipCardBodyClassNames = (): string =>
  'eevenkoto-tooltip-card__body eevenkoto-prose';
