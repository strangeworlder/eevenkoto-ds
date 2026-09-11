import type { ListItemProps } from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import template from './ListItem.html';

export type { ListItemProps };

export const renderListItem = (args: ListItemProps): string => {
  return template.replace('{{text}}', escapeHtml(args.text));
};
