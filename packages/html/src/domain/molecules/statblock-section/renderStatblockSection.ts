import {
  headingClassNames,
  statblockSectionClassNames,
  type StatblockSectionProps,
} from '@eevenkoto/core';
import { renderStatblockFeature } from '../statblock-feature/renderStatblockFeature';
import { escapeHtml } from '../../../utils/html';
import template from './StatblockSection.html';

export type { StatblockSectionProps };

export const renderStatblockSection = (args: StatblockSectionProps): string => {
  const title = `<h2 class="${headingClassNames({ level: 2 })}">${escapeHtml(args.title)}</h2>`;
  const features = args.features.map((feature) => renderStatblockFeature(feature)).join('');

  return template
    .replace('{{className}}', statblockSectionClassNames())
    .replace('{{content}}', `${title}${features}`);
};
