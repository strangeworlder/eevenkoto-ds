import type { BadgeIntent } from '../atoms/badge';

export interface CatalogTileProps {
  /** Visible entity or page name. */
  name: string;
  /** Destination URL. */
  href: string;
  /** Leading readiness pip. */
  status?: BadgeIntent;
  /** Accessible name for the leading pip. Default: Ready */
  statusLabel?: string;
  /** Trailing lock (gated). */
  locked?: boolean;
  /** Accessible lock name. Default: Locked */
  lockedLabel?: string;
}

export type CatalogTileClassNameProps = Pick<CatalogTileProps, 'locked'>;

export const catalogTileClassNames = (props: CatalogTileClassNameProps = {}): string =>
  ['eevenkoto-catalog-tile', props.locked ? 'eevenkoto-catalog-tile--locked' : '']
    .filter(Boolean)
    .join(' ');

export interface CatalogProps {
  tiles: CatalogTileProps[];
  /** Accessible name for the grid. */
  label?: string;
}

export const catalogClassNames = (): string => 'eevenkoto-catalog';
