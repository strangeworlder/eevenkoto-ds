import {
  headingClassNames,
  paragraphClassNames,
  captionClassNames,
  spellblockClassNames,
  type SpellblockNameLevel,
  type SpellblockProps,
  type StatblockFeatureLevel,
} from '@eevenkoto/core';
import { renderPropertyList } from '../../../core/molecules/property-list/renderPropertyList';
import { renderStatblockFeature } from '../../molecules/statblock-feature/renderStatblockFeature';
import { escapeHtml, sanitizeInlineHtml } from '../../../utils/html';
import template from './Spellblock.html';

export type { SpellblockProps, SpellblockNameLevel };

export const renderSpellblock = (args: SpellblockProps): string => {
  const nameLevel: SpellblockNameLevel =
    args.nameLevel === 3 ? 3 : args.nameLevel === 2 ? 2 : 1;
  const headingIdAttr = args.headingId ? ` id="${escapeHtml(args.headingId)}"` : '';
  const nameMarkup = args.nameHtml ? sanitizeInlineHtml(args.nameHtml) : escapeHtml(args.name);
  const bands: string[] = [];

  const plate: string[] = [
    `<h${nameLevel}${headingIdAttr} class="${headingClassNames({ level: nameLevel })}">${nameMarkup}</h${nameLevel}>`,
  ];

  if (args.typeLineHtml) {
    plate.push(
      `<p class="${captionClassNames()} eevenkoto-spellblock__type">${args.typeLineHtml}</p>`,
    );
  } else if (args.typeLine) {
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

  const bodyParts: string[] = [];
  if (args.paragraphsHtml?.length) {
    bodyParts.push(
      ...args.paragraphsHtml.map(
        (html) => `<p class="${paragraphClassNames({ size: 'md' })}">${html}</p>`,
      ),
    );
  } else if (args.paragraphs?.length) {
    bodyParts.push(
      ...args.paragraphs.map(
        (text) =>
          `<p class="${paragraphClassNames({ size: 'md' })}">${sanitizeInlineHtml(text)}</p>`,
      ),
    );
  }
  if (args.bodyHtml) {
    bodyParts.push(args.bodyHtml);
  }
  if (bodyParts.length) {
    bands.push(`<div class="eevenkoto-spellblock__body">${bodyParts.join('')}</div>`);
  }

  if (args.features?.length) {
    // Spells have no section H2, so scaling runs in one level below the name.
    const featureLevel: StatblockFeatureLevel =
      nameLevel === 3 ? 4 : nameLevel === 2 ? 3 : 2;
    const features = args.features
      .map((feature) =>
        renderStatblockFeature({
          ...feature,
          level: feature.level ?? featureLevel,
        }),
      )
      .join('');
    bands.push(`<div class="eevenkoto-spellblock__footer">${features}</div>`);
  }

  return template
    .replace('{{className}}', spellblockClassNames({ deck: args.deck }))
    .replace('{{idAttr}}', args.id ? ` id="${escapeHtml(args.id)}"` : '')
    .replace('{{langAttr}}', args.lang ? ` lang="${escapeHtml(args.lang)}"` : '')
    .replace('{{content}}', bands.join(''));
};
