import {
  headingClassNames,
  paragraphClassNames,
  captionClassNames,
  statblockClassNames,
  type StatblockNameLevel,
  type StatblockProps,
  type StatblockSectionTitleLevel,
} from '@eevenkoto/core';
import { renderPropertyList } from '../../../core/molecules/property-list/renderPropertyList';
import { renderAbilityScoreGroup } from '../ability-score-group/renderAbilityScoreGroup';
import { renderStatblockSection } from '../../molecules/statblock-section/renderStatblockSection';
import { escapeHtml, sanitizeInlineHtml } from '../../../utils/html';
import template from './Statblock.html';

export type { StatblockProps, StatblockNameLevel };

export const renderStatblock = (args: StatblockProps): string => {
  const nameLevel: StatblockNameLevel =
    args.nameLevel === 3 ? 3 : args.nameLevel === 2 ? 2 : 1;
  const defaultSectionTitleLevel = (nameLevel + 1) as StatblockSectionTitleLevel;
  const headingIdAttr = args.headingId ? ` id="${escapeHtml(args.headingId)}"` : '';
  const nameMarkup = args.nameHtml ? sanitizeInlineHtml(args.nameHtml) : escapeHtml(args.name);
  const parts: string[] = [];

  parts.push(
    `<h${nameLevel}${headingIdAttr} class="${headingClassNames({ level: nameLevel })}">${nameMarkup}</h${nameLevel}>`,
  );

  if (args.flavorHtml) {
    parts.push(`<p class="${paragraphClassNames({ size: 'md' })}">${args.flavorHtml}</p>`);
  } else if (args.flavor) {
    parts.push(
      `<p class="${paragraphClassNames({ size: 'md' })}">${escapeHtml(args.flavor)}</p>`,
    );
  }

  if (args.typeLineHtml) {
    parts.push(
      `<p class="${captionClassNames()} eevenkoto-statblock__type">${args.typeLineHtml}</p>`,
    );
  } else if (args.typeLine) {
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
    parts.push(
      renderStatblockSection({
        ...section,
        titleLevel: section.titleLevel ?? defaultSectionTitleLevel,
      }),
    );
  }

  if (args.bodyHtml) {
    parts.push(args.bodyHtml);
  }

  return template
    .replace('{{className}}', statblockClassNames())
    .replace('{{idAttr}}', args.id ? ` id="${escapeHtml(args.id)}"` : '')
    .replace('{{content}}', parts.join(''));
};
