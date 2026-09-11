import {
  headingClassNames,
  paragraphClassNames,
  captionClassNames,
  statblockClassNames,
  type StatblockProps,
} from '@eevenkoto/core';
import { renderPropertyList } from '../property/renderProperty';
import { renderAbilityScoreGroup } from '../ability-score/renderAbilityScore';
import { renderStatblockSection } from '../statblock-section/renderStatblockSection';
import template from './Statblock.html';

export type { StatblockProps };
/** @deprecated Prefer StatblockProps from @eevenkoto/core */
export type StatblockArgs = StatblockProps;

export const renderStatblock = (args: StatblockProps): string => {
  const parts: string[] = [];

  parts.push(
    `<h1 class="${headingClassNames({ level: 1 })}">${args.name}</h1>`,
  );

  if (args.flavor) {
    parts.push(
      `<p class="${paragraphClassNames({ size: 'md' })}">${args.flavor}</p>`,
    );
  }

  if (args.typeLine) {
    parts.push(
      `<p class="${captionClassNames()} eevenkoto-statblock__type">${args.typeLine}</p>`,
    );
  }

  parts.push(
    renderAbilityScoreGroup({
      abilities: args.abilities,
      header: renderPropertyList({ items: args.vitals }),
      footer: renderPropertyList({ items: args.traits }),
    }),
  );

  for (const section of args.sections ?? []) {
    parts.push(renderStatblockSection(section));
  }

  return template
    .replace('{{className}}', statblockClassNames())
    .replace('{{content}}', parts.join(''));
};
