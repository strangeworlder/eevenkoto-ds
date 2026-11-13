import {
  cardClassNames,
  tierCardClassNames,
  type TierCardProps as CoreTierCardProps,
} from '@eevenkoto/core';
import { escapeHtml, sanitizeInlineHtml } from '../../../utils/html';
import { renderBadge } from '../../atoms/badge/renderBadge';
import { renderLinkButton } from '../../atoms/link-button/renderLinkButton';
import { renderList } from '../../molecules/list/renderList';
import template from './TierCard.html';

export type TierCardProps = CoreTierCardProps & {
  /** Trusted HTML replacing the built-in CTA. */
  footer?: string;
};

export const renderTierCard = (args: TierCardProps): string => {
  const level = args.nameLevel ?? 2;
  const className = `${cardClassNames({
    elevated: true,
    accent: args.featured ? 'outline' : 'none',
    current: args.current,
  })} ${tierCardClassNames(args)}`;

  const badge = args.badge ? renderBadge({ ...args.badge, shape: args.badge.shape ?? 'pill' }) : '';
  const header = `<header class="eevenkoto-tier-card__header"><h${level} class="eevenkoto-tier-card__name">${escapeHtml(args.name)}</h${level}>${badge}</header>`;
  const pricing = `<div class="eevenkoto-tier-card__pricing"><span class="eevenkoto-tier-card__price">${escapeHtml(args.price)}</span>${
    args.period ? `<span class="eevenkoto-tier-card__period">${escapeHtml(args.period)}</span>` : ''
  }</div>`;
  const descriptionInner =
    args.descriptionHtml !== undefined
      ? sanitizeInlineHtml(args.descriptionHtml)
      : escapeHtml(args.description ?? '');
  const description = descriptionInner
    ? `<p class="eevenkoto-tier-card__description">${descriptionInner}</p>`
    : '';
  const features = `<div class="eevenkoto-tier-card__features">${renderList({ variant: 'checklist', size: 'sm', items: args.features })}</div>`;
  const footerInner = args.footer ?? (args.cta ? renderLinkButton({ ...args.cta, fullWidth: true }) : '');
  const footer = footerInner ? `<footer class="eevenkoto-tier-card__footer">${footerInner}</footer>` : '';

  return template
    .replace('{{idAttr}}', args.id ? ` id="${escapeHtml(args.id)}"` : '')
    .replace('{{className}}', className)
    .replace('{{content}}', () => `${header}${pricing}${description}${features}${footer}`);
};
