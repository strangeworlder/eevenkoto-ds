import {
  catalogClassNames,
  catalogTileClassNames,
  type CatalogProps,
  type CatalogTileProps,
} from '@eevenkoto/core';
import { renderIcon } from '../../atoms/icon/renderIcon';
import { renderStatusDot } from '../../atoms/status-dot/renderStatusDot';
import { escapeHtml } from '../../../utils/html';
import template from './Catalog.html';
import tileTemplate from './CatalogTile.html';

export type { CatalogProps, CatalogTileProps };

export const renderCatalogTile = (args: CatalogTileProps): string => {
  const status = args.status
    ? renderStatusDot({
        intent: args.status,
        label: args.statusLabel ?? 'Ready',
      })
    : '';
  const lock = args.locked
    ? `<span class="eevenkoto-catalog-tile__lock">${renderIcon({ name: 'lock' })}<span class="eevenkoto-visually-hidden">${escapeHtml(args.lockedLabel ?? 'Locked')}</span></span>`
    : '';
  const name = `<span class="eevenkoto-catalog-tile__name">${escapeHtml(args.name)}</span>`;

  return tileTemplate
    .replace('{{className}}', catalogTileClassNames(args))
    .replace('{{href}}', escapeHtml(args.href))
    .replace('{{content}}', `${status}${name}${lock}`);
};

export const renderCatalog = (args: CatalogProps): string => {
  const labelAttr = args.label ? ` aria-label="${escapeHtml(args.label)}"` : '';
  const tiles = args.tiles
    .map((tile) => `<li>${renderCatalogTile(tile)}</li>`)
    .join('');

  return template
    .replace('{{className}}', catalogClassNames())
    .replace('{{labelAttr}}', labelAttr)
    .replace('{{content}}', tiles);
};
