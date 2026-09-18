import {
  headingClassNames,
  paragraphClassNames,
  captionClassNames,
  spellblockClassNames,
  type SpellblockNameLevel,
  type SpellblockProps,
} from '@eevenkoto/core';
import { renderPropertyList } from '../../../core/molecules/property-list/renderPropertyList';
import { renderStatblockFeature } from '../../molecules/statblock-feature/renderStatblockFeature';
import { escapeHtml, sanitizeInlineHtml } from '../../../utils/html';
import template from './Spellblock.html';

export type { SpellblockProps, SpellblockNameLevel };

export const renderSpellblock = (args: SpellblockProps): string => {
  const nameLevel: SpellblockNameLevel = args.nameLevel === 2 ? 2 : 1;
  const bands: string[] = [];

  const plate: string[] = [
    `<h${nameLevel} class="${headingClassNames({ level: nameLevel })}">${escapeHtml(args.name)}</h${nameLevel}>`,
  ];

  if (args.typeLine) {
    plate.push(
      `<p class="${captionClassNames()} eevenkoto-spellblock__type">${escapeHtml(args.typeLine)}</p>`,
    );
  }

  if (args.classes?.length) {
    plate.push(renderPropertyList({ items: args.classes }));
  }

  bands.push(`<div class="eevenkoto-spellblock__plate">${plate.join('')}</div>`);

  if (args.properties.length) {
    bands.push(
      `<div class="eevenkoto-spellblock__stats">${renderPropertyList({
        items: args.properties,
      })}</div>`,
    );
  }

  if (args.paragraphs?.length) {
    const paragraphs = args.paragraphs
      .map(
        (text) =>
          `<p class="${paragraphClassNames({ size: 'md' })}">${sanitizeInlineHtml(text)}</p>`,
      )
      .join('');
    bands.push(`<div class="eevenkoto-spellblock__body">${paragraphs}</div>`);
  }

  if (args.features?.length) {
    // Spells have no section H2, so scaling runs in one level below the name.
    const featureLevel = nameLevel === 2 ? 3 : 2;
    const features = args.features
      .map((feature) => renderStatblockFeature({ ...feature, level: featureLevel }))
      .join('');
    bands.push(`<div class="eevenkoto-spellblock__footer">${features}</div>`);
  }

  return template
    .replace('{{className}}', spellblockClassNames({ deck: args.deck }))
    .replace('{{langAttr}}', args.lang ? ` lang="${escapeHtml(args.lang)}"` : '')
    .replace('{{content}}', bands.join(''));
};
