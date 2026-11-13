import {
  listItemClassNames,
  type IconName,
  type ListItemProps,
  type ListItemStatus,
} from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import { renderIcon } from '../icon/renderIcon';
import template from './ListItem.html';

export type { ListItemProps, ListItemStatus };

const statusIconName = (status: ListItemStatus): IconName => {
  if (status === 'accent') return 'star';
  if (status === 'excluded') return 'close';
  return 'check';
};

export const renderListItem = (args: ListItemProps): string => {
  const body = args.html ?? escapeHtml(args.text ?? '');
  if (!args.status) {
    return template.replace('{{text}}', body);
  }

  const icon = renderIcon({
    name: statusIconName(args.status),
    size: 'sm',
    className: 'eevenkoto-list__icon',
  });
  const srPrefix =
    args.status === 'excluded'
      ? '<span class="eevenkoto-visually-hidden">Excluded: </span>'
      : '';

  return `<li class="${listItemClassNames(args.status)}">${icon}${srPrefix}<span class="eevenkoto-list__item-text">${body}</span></li>`;
};
