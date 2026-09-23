import {
  catalogClassNames,
  catalogTileClassNames,
  type CatalogProps,
  type CatalogTileProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement } from 'react';
import { Icon } from '../atoms/Icon';
import { StatusDot } from '../atoms/StatusDot';

export type { CatalogProps, CatalogTileProps };

export type CatalogTileComponentProps = Omit<
  HTMLAttributes<HTMLAnchorElement>,
  'children' | 'href'
> &
  CatalogTileProps;

export const CatalogTile = ({
  name,
  href,
  status,
  statusLabel = 'Ready',
  locked,
  lockedLabel = 'Locked',
  className,
  ...rest
}: CatalogTileComponentProps): ReactElement => {
  const classes = [catalogTileClassNames({ locked }), className].filter(Boolean).join(' ');

  return (
    <a className={classes} href={href} {...rest}>
      {status ? <StatusDot intent={status} label={statusLabel} /> : null}
      <span className="eevenkoto-catalog-tile__name">{name}</span>
      {locked ? (
        <span className="eevenkoto-catalog-tile__lock">
          <Icon name="lock" />
          <span className="eevenkoto-visually-hidden">{lockedLabel}</span>
        </span>
      ) : null}
    </a>
  );
};

export type CatalogComponentProps = Omit<HTMLAttributes<HTMLUListElement>, 'children'> &
  CatalogProps;

export const Catalog = ({
  tiles,
  label,
  className,
  ...rest
}: CatalogComponentProps): ReactElement => {
  const classes = [catalogClassNames(), className].filter(Boolean).join(' ');

  return (
    <ul className={classes} aria-label={label} {...rest}>
      {tiles.map((tile) => (
        <li key={tile.href + tile.name}>
          <CatalogTile {...tile} />
        </li>
      ))}
    </ul>
  );
};
