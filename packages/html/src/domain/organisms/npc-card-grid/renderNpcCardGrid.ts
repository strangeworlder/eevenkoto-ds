import { npcCardGridClassNames, type NpcCardGridProps } from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import { renderNpcCard } from '../../molecules/npc-card/renderNpcCard';
import template from './NpcCardGrid.html';

export type { NpcCardGridProps };

export const renderNpcCardGrid = (args: NpcCardGridProps): string => {
  const idAttr = args.id ? ` id="${escapeHtml(args.id)}"` : '';
  const cards = (args.cards ?? []).map((card) => renderNpcCard(card)).join('');
  return template
    .replace('{{idAttr}}', idAttr)
    .replace('{{className}}', npcCardGridClassNames(args))
    .replace('{{content}}', () => cards);
};
