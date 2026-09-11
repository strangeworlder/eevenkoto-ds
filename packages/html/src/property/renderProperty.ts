import {
  propertyClassNames,
  propertyListClassNames,
  type PropertyItem,
  type PropertyListProps,
  type PropertyProps,
} from '@eevenkoto/core';
import propertyTemplate from './Property.html';
import listTemplate from './PropertyList.html';

export type { PropertyItem, PropertyListProps, PropertyProps };

export const renderProperty = (args: PropertyProps): string => {
  return propertyTemplate
    .replace('{{className}}', propertyClassNames())
    .replace('{{label}}', args.label)
    .replace('{{value}}', args.value);
};

export const renderPropertyList = (args: PropertyListProps): string => {
  const content = args.items.map((item) => renderProperty(item)).join('');
  return listTemplate
    .replace('{{className}}', propertyListClassNames())
    .replace('{{content}}', content);
};
