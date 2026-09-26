export type TooltipCardTitleLevel = 2 | 3;

export interface TooltipCardProps {
  /** Visible title in `<header>`. Optional. */
  title?: string;
  /** Heading level for `title`. Default: 2 (preview panel, not a page entry). */
  titleLevel?: TooltipCardTitleLevel;
  /** Body copy in `__body`. Optional when using framework slots. */
  body?: string;
}

export const tooltipCardClassNames = (): string => 'eevenkoto-tooltip-card';

/** The body caps itself at `--eevenkoto-tooltip-card-body-max-block-size` and scrolls. */
export const tooltipCardBodyClassNames = (): string => 'eevenkoto-tooltip-card__body';
