import { avatarClassNames, type AvatarProps } from '@eevenkoto/core';
import { renderIcon } from '../icon/renderIcon';
import { escapeHtml } from '../../../utils/html';
import template from './Avatar.html';

export type { AvatarProps };

export const renderAvatar = (args: AvatarProps): string => {
  const name = escapeHtml(args.name);
  const size = args.size ?? 'md';

  const content = args.src
    ? `<img class="eevenkoto-avatar__image" src="${escapeHtml(args.src)}" alt="${name}" />`
    : `<span class="eevenkoto-avatar__placeholder" aria-hidden="true">${renderIcon({
        name: 'user',
        size,
      })}</span>`;

  const ariaAttrs = args.src ? '' : ` role="img" aria-label="${name}"`;

  return template
    .replace('{{className}}', avatarClassNames(args))
    .replace('{{ariaAttrs}}', ariaAttrs)
    .replace('{{content}}', content);
};
