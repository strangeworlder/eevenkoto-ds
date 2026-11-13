import {
  propertyListClassNames,
  type PropertyItem,
  type PropertyListColumns,
  type PropertyListLayout,
  type PropertyListProps,
} from '@eevenkoto/core';
import { renderProperty } from '../../atoms/property/renderProperty';
import listTemplate from './PropertyList.html';

export type { PropertyItem, PropertyListColumns, PropertyListLayout, PropertyListProps };

export const renderPropertyList = (args: PropertyListProps): string => {
  const content = args.items.map((item) => renderProperty(item)).join('');
  return listTemplate
    .replace('{{className}}', propertyListClassNames(args))
    .replace('{{content}}', content);
};
