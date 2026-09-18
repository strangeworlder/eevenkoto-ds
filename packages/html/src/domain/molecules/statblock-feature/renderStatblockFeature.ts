import {
  headingClassNames,
  paragraphClassNames,
  statblockFeatureClassNames,
  type StatblockFeatureLevel,
  type StatblockFeatureProps,
} from '@eevenkoto/core';
import { escapeHtml, sanitizeInlineHtml } from '../../../utils/html';
import template from './StatblockFeature.html';

export type { StatblockFeatureProps, StatblockFeatureLevel };

export const renderStatblockFeature = (args: StatblockFeatureProps): string => {
  const level: StatblockFeatureLevel = args.level ?? 3;
  const heading = `<h${level} class="${headingClassNames({
    level,
    runIn: true,
  })}">${escapeHtml(args.name)}</h${level}>`;
  const body = `<p class="${paragraphClassNames({ size: 'md' })}">${sanitizeInlineHtml(args.description)}</p>`;

  return template
    .replace('{{className}}', statblockFeatureClassNames())
    .replace('{{content}}', `${heading}${body}`);
};
