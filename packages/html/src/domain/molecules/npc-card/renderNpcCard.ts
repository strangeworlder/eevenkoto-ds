import { npcCardClassNames, type NpcCardProps } from '@eevenkoto/core';
import { escapeHtml, sanitizeInlineHtml } from '../../../utils/html';
import { renderPropertyList } from '../../../core/molecules/property-list/renderPropertyList';
import template from './NpcCard.html';

export type { NpcCardProps };

export const renderNpcCard = (args: NpcCardProps): string => {
  const level = args.nameLevel ?? 3;
  const name = args.nameHtml !== undefined ? sanitizeInlineHtml(args.nameHtml) : escapeHtml(args.name);
  const role =
    args.roleHtml !== undefined ? sanitizeInlineHtml(args.roleHtml) : escapeHtml(args.role ?? '');
  const header = `<header class="eevenkoto-npc-card__header"><h${level} class="eevenkoto-npc-card__name">${name}</h${level}>${
    role ? `<p class="eevenkoto-npc-card__role">${role}</p>` : ''
  }</header>`;
  const details = args.details?.length
    ? renderPropertyList({ layout: 'divided', items: args.details })
    : '';
  const bodyInner =
    args.bodyHtml !== undefined
      ? sanitizeInlineHtml(args.bodyHtml)
      : args.body
        ? `<p>${escapeHtml(args.body)}</p>`
        : '';
  const body = bodyInner
    ? `<div class="eevenkoto-npc-card__body eevenkoto-prose">${bodyInner}</div>`
    : '';
  const idAttr = args.id ? ` id="${escapeHtml(args.id)}"` : '';
  return template
    .replace('{{idAttr}}', idAttr)
    .replace('{{className}}', npcCardClassNames())
    .replace('{{content}}', () => `${header}${details}${body}`);
};
