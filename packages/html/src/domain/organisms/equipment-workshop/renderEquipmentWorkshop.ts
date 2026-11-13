import {
  equipmentWorkshopClassNames,
  workshopBodyClassNames,
  workshopControlsClassNames,
  workshopFooterClassNames,
  workshopHeaderClassNames,
  workshopPreviewClassNames,
  workshopToolbarClassNames,
  type EquipmentWorkshopProps,
} from '@eevenkoto/core';
import template from './EquipmentWorkshop.html';

export type { EquipmentWorkshopProps };

export const renderEquipmentWorkshop = (props: EquipmentWorkshopProps = {}): string => {
  const {
    header = '',
    controls = '',
    toolbar = '',
    preview = '',
    footer = '',
    idSuffix = '',
    layout,
    sticky,
  } = props;

  const headerHtml = header
    ? `<div class="${workshopHeaderClassNames()} eevenkoto-equipment-workshop__header">${header}</div>`
    : '';

  const toolbarHtml = toolbar
    ? `<div class="${workshopToolbarClassNames()} eevenkoto-equipment-workshop__toolbar">${toolbar}</div>`
    : '';
  const previewHtml =
    toolbar || preview
      ? `<div class="${workshopPreviewClassNames()} eevenkoto-equipment-workshop__preview">${toolbarHtml}${preview}</div>`
      : '';

  const bodyHtml =
    `<div class="${workshopBodyClassNames()} eevenkoto-equipment-workshop__body">` +
    `<div class="${workshopControlsClassNames()} eevenkoto-equipment-workshop__controls">${controls}</div>` +
    previewHtml +
    `</div>`;

  const footerHtml = footer
    ? `<div class="${workshopFooterClassNames()} eevenkoto-equipment-workshop__footer">${footer}</div>`
    : '';

  return template
    .replace('{{className}}', equipmentWorkshopClassNames({ layout, sticky }))
    .replace('{{idAttr}}', idSuffix ? ` id="equipment-workshop${idSuffix}"` : '')
    .replace('{{content}}', `${headerHtml}${bodyHtml}${footerHtml}`);
};
