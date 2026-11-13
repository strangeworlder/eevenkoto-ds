import {
  floatingBannerActionsClassNames,
  floatingBannerBodyClassNames,
  floatingBannerClassNames,
  type FloatingBannerProps as CoreFloatingBannerProps,
} from '@eevenkoto/core';
import { escapeHtml, sanitizeInlineHtml } from '../../../utils/html';
import { renderButton } from '../../atoms/button/renderButton';
import template from './FloatingBanner.html';

export type FloatingBannerProps = CoreFloatingBannerProps & {
  /** Trusted HTML replacing the built-in confirm button. */
  actions?: string;
};

export const renderFloatingBanner = (args: FloatingBannerProps): string => {
  const text = args.bodyHtml !== undefined ? sanitizeInlineHtml(args.bodyHtml) : escapeHtml(args.body ?? '');
  const link = args.secondaryLink
    ? ` <a href="${escapeHtml(args.secondaryLink.href)}">${escapeHtml(args.secondaryLink.label)}</a>`
    : '';

  let actions = args.actions ?? '';
  if (!args.actions && args.confirmLabel) {
    actions = renderButton({ label: args.confirmLabel, size: 'sm' });
    if (args.confirmId) {
      actions = actions.replace('<button ', `<button id="${escapeHtml(args.confirmId)}" `);
    }
  }

  return template
    .replace('{{idAttr}}', args.id ? ` id="${escapeHtml(args.id)}"` : '')
    .replace('{{className}}', floatingBannerClassNames(args))
    .replace('{{ariaLabel}}', escapeHtml(args.ariaLabel))
    .replace('{{bodyClassName}}', floatingBannerBodyClassNames())
    .replace('{{body}}', () => `${text}${link}`)
    .replace('{{actionsClassName}}', floatingBannerActionsClassNames())
    .replace('{{actions}}', () => actions);
};
