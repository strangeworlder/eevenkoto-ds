import { listClassNames, type ListProps } from '@eevenkoto/core';
import { renderListItem } from '../../atoms/list-item/renderListItem';
import listTemplate from './List.html';

export type { ListProps };

export const renderList = (args: ListProps): string => {
  const variant = args.variant ?? 'unordered';
  const tag = variant === 'ordered' ? 'ol' : 'ul';
  const content = args.items.map((item) => renderListItem(item)).join('');
  return listTemplate
    .replaceAll('{{tag}}', tag)
    .replace('{{className}}', listClassNames(args))
    .replace('{{content}}', content);
};
