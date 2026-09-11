import {
  headingClassNames,
  paragraphClassNames,
  statblockFeatureClassNames,
  type StatblockFeatureProps,
} from '@eevenkoto/core';
import { escapeHtml, sanitizeInlineHtml } from '../../../utils/html';
import template from './StatblockFeature.html';

export type { StatblockFeatureProps };

export const renderStatblockFeature = (args: StatblockFeatureProps): string => {
  const heading = `<h3 class="${headingClassNames({
    level: 3,
    runIn: true,
  })}">${escapeHtml(args.name)}</h3>`;
  const body = `<p class="${paragraphClassNames({ size: 'md' })}">${sanitizeInlineHtml(args.description)}</p>`;

  return template
    .replace('{{className}}', statblockFeatureClassNames())
    .replace('{{content}}', `${heading}${body}`);
};
