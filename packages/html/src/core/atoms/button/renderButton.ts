import {
  buttonClassNames,
  resolveButtonIconPosition,
  type ButtonIconName,
  type ButtonProps,
} from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import { renderIcon } from '../icon/renderIcon';
import template from './Button.html';

export type { ButtonIconName, ButtonProps };

export const renderButton = (args: ButtonProps): string => {
  const iconPosition = resolveButtonIconPosition(args);
  const className = buttonClassNames(args);
  const safeLabel = escapeHtml(args.label);

  let content = safeLabel;
  let ariaLabel = '';

  if (args.icon && iconPosition) {
    // Same glyph path as Icon — Button CSS sizes it to 1em via .eevenkoto-button .eevenkoto-icon
    const iconMarkup = renderIcon({ name: args.icon });

    if (iconPosition === 'left') {
      content = `${iconMarkup}${safeLabel}`;
    } else if (iconPosition === 'right') {
      content = `${safeLabel}${iconMarkup}`;
    } else if (iconPosition === 'only') {
      content = iconMarkup;
      ariaLabel = ` aria-label="${safeLabel}"`;
    }
  }

  return template
    .replace('{{className}}', className)
    .replace('{{content}}', content)
    .replace('{{ariaLabel}}', ariaLabel)
    .replace('{{disabled}}', args.disabled ? ' disabled' : '');
};
