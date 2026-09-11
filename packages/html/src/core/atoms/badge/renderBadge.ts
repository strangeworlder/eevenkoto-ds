import { badgeClassNames, type BadgeProps } from '@eevenkoto/core';
import template from './Badge.html';

export type { BadgeProps };

export const renderBadge = (args: BadgeProps): string => {
  const className = badgeClassNames(args);
  const dot = args.dot
    ? '<span class="eevenkoto-badge__dot" aria-hidden="true"></span>'
    : '';
  const label = `<span class="eevenkoto-badge__label">${args.label}</span>`;
  const content = `${dot}${label}`;

  return template.replace('{{className}}', className).replace('{{content}}', content);
};
