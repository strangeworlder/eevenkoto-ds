import {
  headingClassNames,
  paragraphClassNames,
  captionClassNames,
  statblockClassNames,
  type StatblockNameLevel,
  type StatblockProps,
} from '@eevenkoto/core';
import { renderPropertyList } from '../../../core/molecules/property-list/renderPropertyList';
import { renderAbilityScoreGroup } from '../ability-score-group/renderAbilityScoreGroup';
import { renderStatblockSection } from '../../molecules/statblock-section/renderStatblockSection';
import { escapeHtml } from '../../../utils/html';
import template from './Statblock.html';

export type { StatblockProps, StatblockNameLevel };

export const renderStatblock = (args: StatblockProps): string => {
  const nameLevel: StatblockNameLevel = args.nameLevel === 2 ? 2 : 1;
  const parts: string[] = [];

  parts.push(
    `<h${nameLevel} class="${headingClassNames({ level: nameLevel })}">${escapeHtml(args.name)}</h${nameLevel}>`,
  );

  if (args.flavor) {
    parts.push(
      `<p class="${paragraphClassNames({ size: 'md' })}">${escapeHtml(args.flavor)}</p>`,
    );
  }

  if (args.typeLine) {
    parts.push(
      `<p class="${captionClassNames()} eevenkoto-statblock__type">${escapeHtml(args.typeLine)}</p>`,
    );
  }

  parts.push(
    renderAbilityScoreGroup({
      abilities: args.abilities,
      header: renderPropertyList({ items: args.vitals }),
      footer: renderPropertyList({ items: args.details }),
    }),
  );

  for (const section of args.sections ?? []) {
    parts.push(renderStatblockSection(section));
  }

  return template
    .replace('{{className}}', statblockClassNames())
    .replace('{{content}}', parts.join(''));
};
