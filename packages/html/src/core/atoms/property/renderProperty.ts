import {
  propertyClassNames,
  type PropertyItem,
  type PropertyProps,
} from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import propertyTemplate from './Property.html';

export type { PropertyItem, PropertyProps };

export const renderProperty = (args: PropertyProps): string => {
  const valueMarkup = args.valueHtml ?? escapeHtml(args.value ?? '');
  return propertyTemplate
    .replace('{{className}}', propertyClassNames())
    .replace('{{label}}', escapeHtml(args.label))
    .replace('{{value}}', valueMarkup);
};
