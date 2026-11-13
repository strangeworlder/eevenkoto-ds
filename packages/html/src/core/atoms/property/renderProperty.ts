import {
  propertyClassNames,
  propertyMetaClassNames,
  type PropertyItem,
  type PropertyProps,
} from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import propertyTemplate from './Property.html';

export type { PropertyItem, PropertyProps };

export const renderProperty = (args: PropertyProps): string => {
  const valueMarkup = args.valueHtml ?? escapeHtml(args.value ?? '');
  const metaLines = (Array.isArray(args.meta) ? args.meta : args.meta ? [args.meta] : []).filter(
    Boolean,
  );
  const metaMarkup = metaLines
    .map((line) => `<span class="${propertyMetaClassNames()}">${escapeHtml(line)}</span>`)
    .join('');

  return propertyTemplate
    .replace('{{className}}', propertyClassNames())
    .replace('{{label}}', escapeHtml(args.label))
    .replace('{{value}}', `${valueMarkup}${metaMarkup}`);
};
