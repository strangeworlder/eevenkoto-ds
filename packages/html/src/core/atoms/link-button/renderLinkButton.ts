import {
  linkButtonClassNames,
  resolveLinkButtonIconPosition,
  resolveLinkButtonRel,
  type ButtonIconName,
  type LinkButtonProps,
} from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import { renderIcon } from '../icon/renderIcon';
import template from './LinkButton.html';

export type { ButtonIconName, LinkButtonProps };

export const renderLinkButton = (args: LinkButtonProps): string => {
  const iconPosition = resolveLinkButtonIconPosition(args);
  const className = linkButtonClassNames(args);

  let content = escapeHtml(args.label);

  if (args.icon && iconPosition) {
    const iconMarkup = renderIcon({ name: args.icon });
    if (iconPosition === 'left') {
      content = `${iconMarkup}${content}`;
    } else {
      content = `${content}${iconMarkup}`;
    }
  }

  const resolvedRel = resolveLinkButtonRel(args);
  const hrefAttr = args.disabled ? '' : ` href="${escapeHtml(args.href)}"`;
  const targetAttr =
    !args.disabled && args.target ? ` target="${escapeHtml(args.target)}"` : '';
  const relAttr = !args.disabled && resolvedRel ? ` rel="${escapeHtml(resolvedRel)}"` : '';
  const disabledAttr = args.disabled ? ' aria-disabled="true"' : '';
  const tabIndexAttr = args.disabled ? ' tabindex="-1"' : '';

  return template
    .replace('{{className}}', className)
    .replace('{{href}}', hrefAttr)
    .replace('{{content}}', content)
    .replace('{{target}}', targetAttr)
    .replace('{{rel}}', relAttr)
    .replace('{{disabled}}', disabledAttr)
    .replace('{{tabIndex}}', tabIndexAttr);
};
