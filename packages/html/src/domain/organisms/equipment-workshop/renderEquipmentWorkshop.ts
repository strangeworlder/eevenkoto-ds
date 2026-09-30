import { equipmentWorkshopClassNames, type EquipmentWorkshopProps } from '@eevenkoto/core';
import template from './EquipmentWorkshop.html';

export type { EquipmentWorkshopProps };

export const renderEquipmentWorkshop = (props: EquipmentWorkshopProps = {}): string => {
  const { header = '', controls = '', preview = '', idSuffix = '' } = props;

  const headerHtml = header
    ? `<div class="eevenkoto-equipment-workshop__header">${header}</div>`
    : '';

  const bodyHtml =
    `<div class="eevenkoto-equipment-workshop__body">` +
    `<div class="eevenkoto-equipment-workshop__controls">${controls}</div>` +
    (preview ? `<div class="eevenkoto-equipment-workshop__preview">${preview}</div>` : '') +
    `</div>`;

  return template
    .replace('{{className}}', equipmentWorkshopClassNames())
    .replace('{{idAttr}}', idSuffix ? ` id="equipment-workshop${idSuffix}"` : '')
    .replace('{{content}}', `${headerHtml}${bodyHtml}`);
};
