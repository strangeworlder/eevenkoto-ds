import { iconClassNames, iconPaths, type IconProps } from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import template from './Icon.html';

export type { IconProps };

export type RenderIconProps = IconProps & {
  /** Extra classes (e.g. Button slot: omit size ladder via CSS override). */
  className?: string;
};

export const renderIcon = (args: RenderIconProps): string => {
  const ariaAttrs = args.label
    ? ` role="img" aria-label="${escapeHtml(args.label)}"`
    : ' aria-hidden="true"';
  const className = [iconClassNames(args), args.className].filter(Boolean).join(' ');

  return template
    .replace('{{className}}', className)
    .replace('{{ariaAttrs}}', ariaAttrs)
    .replace('{{path}}', iconPaths[args.name]);
};
