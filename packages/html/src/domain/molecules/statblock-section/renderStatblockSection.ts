import {
  headingClassNames,
  statblockSectionClassNames,
  type StatblockFeatureLevel,
  type StatblockSectionProps,
  type StatblockSectionTitleLevel,
} from '@eevenkoto/core';
import { renderStatblockFeature } from '../statblock-feature/renderStatblockFeature';
import { escapeHtml } from '../../../utils/html';
import template from './StatblockSection.html';

export type { StatblockSectionProps, StatblockSectionTitleLevel };

export const renderStatblockSection = (args: StatblockSectionProps): string => {
  const tagLevel: StatblockSectionTitleLevel =
    args.titleLevel === 4 ? 4 : args.titleLevel === 3 ? 3 : 2;
  const defaultFeatureLevel = (tagLevel + 1) as StatblockFeatureLevel;
  const title = `<h${tagLevel} class="${headingClassNames({ level: 2 })}">${escapeHtml(args.title)}</h${tagLevel}>`;
  const intro = args.bodyHtml ?? '';
  const features = (args.features ?? [])
    .map((feature) =>
      renderStatblockFeature({
        ...feature,
        level: feature.level ?? defaultFeatureLevel,
      }),
    )
    .join('');

  return template
    .replace('{{className}}', statblockSectionClassNames())
    .replace('{{content}}', `${title}${intro}${features}`);
};
