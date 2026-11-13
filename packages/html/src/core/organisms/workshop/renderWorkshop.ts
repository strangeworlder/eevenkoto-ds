import {
  workshopBodyClassNames,
  workshopClassNames,
  workshopControlsClassNames,
  workshopFooterClassNames,
  workshopHeaderClassNames,
  workshopPreviewClassNames,
  workshopToolbarClassNames,
  type WorkshopProps,
  type WorkshopTitleLevel,
} from '@eevenkoto/core';
import { renderIcon } from '../../atoms/icon/renderIcon';
import { escapeHtml } from '../../../utils/html';
import template from './Workshop.html';

export type { WorkshopProps };

export const renderWorkshop = (props: WorkshopProps = {}): string => {
  const {
    header = '',
    controls = '',
    toolbar = '',
    preview = '',
    footer = '',
    id,
    idSuffix = '',
    label,
    layout,
    sticky,
    icon,
    title,
    titleLevel,
    subtitle,
    controlsWidth,
  } = props;

  const resolvedId = id ?? (idSuffix ? `workshop${idSuffix}` : undefined);
  const attrs = [
    resolvedId ? ` id="${escapeHtml(resolvedId)}"` : '',
    label ? ` role="region" aria-label="${escapeHtml(label)}"` : '',
    controlsWidth
      ? ` style="--eevenkoto-workshop-controls-width: ${escapeHtml(controlsWidth)}"`
      : '',
  ].join('');

  const hasTitleGroup = Boolean(icon || title || subtitle);
  const resolvedTitleLevel: WorkshopTitleLevel = titleLevel === 3 ? 3 : 2;
  const titleGroupHtml = hasTitleGroup
    ? `<div class="eevenkoto-workshop__title-group">` +
      (icon ? `<span class="eevenkoto-workshop__icon-badge">${renderIcon({ name: icon })}</span>` : '') +
      (title
        ? `<h${resolvedTitleLevel} class="eevenkoto-workshop__title">${escapeHtml(title)}</h${resolvedTitleLevel}>`
        : '') +
      (subtitle ? `<p class="eevenkoto-workshop__subtitle">${escapeHtml(subtitle)}</p>` : '') +
      `</div>`
    : '';

  const headerInner = `${titleGroupHtml}${header}`;
  const headerHtml = headerInner
    ? `<div class="${workshopHeaderClassNames()}">${headerInner}</div>`
    : '';

  const toolbarHtml = toolbar
    ? `<div class="${workshopToolbarClassNames()}">${toolbar}</div>`
    : '';
  const previewHtml =
    toolbar || preview
      ? `<div class="${workshopPreviewClassNames()}">${toolbarHtml}${preview}</div>`
      : '';

  const bodyHtml =
    `<div class="${workshopBodyClassNames()}">` +
    `<div class="${workshopControlsClassNames()}">${controls}</div>` +
    previewHtml +
    `</div>`;

  const footerHtml = footer
    ? `<div class="${workshopFooterClassNames()}">${footer}</div>`
    : '';

  return template
    .replace('{{className}}', workshopClassNames({ layout, sticky }))
    .replace('{{attrs}}', attrs)
    .replace('{{content}}', `${headerHtml}${bodyHtml}${footerHtml}`);
};
