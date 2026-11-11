import {
  workshopBodyClassNames,
  workshopClassNames,
  workshopControlsClassNames,
  workshopHeaderClassNames,
  workshopPreviewClassNames,
  type WorkshopProps,
} from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import template from './Workshop.html';

export type { WorkshopProps };

export const renderWorkshop = (props: WorkshopProps = {}): string => {
  const {
    header = '',
    controls = '',
    preview = '',
    id,
    idSuffix = '',
    label,
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

  const headerHtml = header
    ? `<div class="${workshopHeaderClassNames()}">${header}</div>`
    : '';

  const bodyHtml =
    `<div class="${workshopBodyClassNames()}">` +
    `<div class="${workshopControlsClassNames()}">${controls}</div>` +
    (preview ? `<div class="${workshopPreviewClassNames()}">${preview}</div>` : '') +
    `</div>`;

  return template
    .replace('{{className}}', workshopClassNames())
    .replace('{{attrs}}', attrs)
    .replace('{{content}}', `${headerHtml}${bodyHtml}`);
};
