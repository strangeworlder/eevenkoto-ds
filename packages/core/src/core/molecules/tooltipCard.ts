export interface TooltipCardProps {
  /** Visible section title in `__header`. Optional. */
  title?: string;
  /** Body copy in `__body`. Optional when using framework slots. */
  body?: string;
  /** Composes Scroll on `__body` so long copy stays inside the surface. */
  scrollBody?: boolean;
}

export const tooltipCardClassNames = (): string => 'eevenkoto-tooltip-card';

export const tooltipCardBodyClassNames = (scroll = false): string =>
  scroll
    ? 'eevenkoto-tooltip-card__body eevenkoto-scroll eevenkoto-scroll--y'
    : 'eevenkoto-tooltip-card__body';
