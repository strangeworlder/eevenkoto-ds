import {
  accountMenuClassNames,
  type AccountMenuProps as CoreAccountMenuProps,
} from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import { renderAvatar } from '../../atoms/avatar/renderAvatar';
import { renderBadge } from '../../atoms/badge/renderBadge';
import { renderIcon } from '../../atoms/icon/renderIcon';
import { renderLinkButton } from '../../atoms/link-button/renderLinkButton';
import { renderPopover } from '../../atoms/popover/renderPopover';
import { renderMenu } from '../../molecules/menu/renderMenu';
import template from './AccountMenu.html';

export type AccountMenuProps = CoreAccountMenuProps & {
  /** Trusted HTML rendered at the bottom of the popover (e.g. dev tools). */
  footer?: string;
};

export const renderAccountMenu = (args: AccountMenuProps): string => {
  const className = accountMenuClassNames(args);
  const idAttr = args.id ? ` id="${escapeHtml(args.id)}"` : '';

  if (!args.authenticated) {
    return template
      .replace('{{idAttr}}', idAttr)
      .replace('{{className}}', className)
      .replace('{{content}}', () =>
        renderLinkButton({
          href: args.loginHref ?? '#login',
          label: args.loginLabel ?? 'Sign in',
          variant: 'secondary',
          icon: 'user',
          fullWidth: true,
        }),
      );
  }

  const userName = args.userName ?? '';
  const tier = (variant: 'subtle' | 'solid') =>
    args.tierLabel
      ? renderBadge({
          label: args.tierLabel,
          size: 'sm',
          variant,
          shape: 'pill',
          intent: args.tierIntent ?? 'neutral',
        })
      : '';
  const popoverId = args.id ? `${args.id}-popover` : undefined;
  const controls = popoverId ? ` aria-controls="${escapeHtml(popoverId)}"` : '';

  const trigger = `<button type="button" class="eevenkoto-account-menu__trigger" aria-haspopup="true" aria-expanded="${args.open ? 'true' : 'false'}"${controls}>${renderAvatar({
    name: userName,
    src: args.avatarSrc,
    size: 'sm',
  })}<span class="eevenkoto-account-menu__identity"><span class="eevenkoto-account-menu__name">${escapeHtml(userName)}</span>${tier('subtle')}</span>${renderIcon({
    name: 'chevron-down',
    size: 'sm',
    className: 'eevenkoto-account-menu__chevron',
  })}</button>`;

  const summary = `<div class="eevenkoto-account-menu__summary"><span>${escapeHtml(userName)}</span>${
    args.userEmail ? `<span class="eevenkoto-account-menu__email">${escapeHtml(args.userEmail)}</span>` : ''
  }${tier('solid')}</div>`;
  const menu = args.entries?.length
    ? renderMenu({
        label: args.menuLabel ?? 'Account menu',
        entries: args.entries,
        embedded: true,
        size: 'sm',
      })
    : '';
  const footer = args.footer ? `<div class="eevenkoto-account-menu__footer">${args.footer}</div>` : '';

  let popover = renderPopover({
    placement: 'bottom-start',
    matchTriggerWidth: true,
    role: 'dialog',
    label: args.popoverLabel ?? 'Account',
    content: `${summary}${menu}${footer}`,
  });
  if (popoverId) popover = popover.replace(/^<div /, `<div id="${escapeHtml(popoverId)}" `);
  if (!args.open) popover = popover.replace(/^<div /, '<div hidden ');

  return template
    .replace('{{idAttr}}', idAttr)
    .replace('{{className}}', className)
    .replace('{{content}}', () => `${trigger}${popover}`);
};
