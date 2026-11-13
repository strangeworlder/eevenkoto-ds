import { mapFrameClassNames, type MapFrameProps } from '@eevenkoto/core';
import { escapeHtml, sanitizeInlineHtml } from '../../../utils/html';
import template from './MapFrame.html';

export type { MapFrameProps };

export const renderMapFrame = (args: MapFrameProps): string => {
  const header =
    args.title || args.scale
      ? `<div class="eevenkoto-map-frame__header">${
          args.title ? `<span class="eevenkoto-map-frame__title">${escapeHtml(args.title)}</span>` : ''
        }${args.scale ? `<span class="eevenkoto-map-frame__scale">${escapeHtml(args.scale)}</span>` : ''}</div>`
      : '';
  const media =
    args.svgHtml !== undefined
      ? args.svgHtml
      : args.src
        ? `<img src="${escapeHtml(args.src)}" alt="${escapeHtml(args.alt ?? '')}" />`
        : '';
  const viewport = `<div class="eevenkoto-map-frame__viewport">${media}</div>`;
  const captionInner =
    args.captionHtml !== undefined ? sanitizeInlineHtml(args.captionHtml) : escapeHtml(args.caption ?? '');
  const caption = captionInner
    ? `<figcaption class="eevenkoto-map-frame__caption">${captionInner}</figcaption>`
    : '';
  const idAttr = args.id ? ` id="${escapeHtml(args.id)}"` : '';
  return template
    .replace('{{idAttr}}', idAttr)
    .replace('{{className}}', mapFrameClassNames())
    .replace('{{content}}', () => `${header}${viewport}${caption}`);
};
