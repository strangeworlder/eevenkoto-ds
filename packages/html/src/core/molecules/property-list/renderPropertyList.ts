import {
  propertyListClassNames,
  type PropertyItem,
  type PropertyListProps,
} from '@eevenkoto/core';
import { renderProperty } from '../../atoms/property/renderProperty';
import listTemplate from './PropertyList.html';

export type { PropertyItem, PropertyListProps };

export const renderPropertyList = (args: PropertyListProps): string => {
  const content = args.items.map((item) => renderProperty(item)).join('');
  return listTemplate
    .replace('{{className}}', propertyListClassNames())
    .replace('{{content}}', content);
};
