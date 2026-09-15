import {
  buttonClassNames,
  resolveButtonIconPosition,
  type ButtonIconName,
  type ButtonProps,
} from '@eevenkoto/core';
import { renderIcon } from '../icon/renderIcon';
import template from './Button.html';

export type { ButtonIconName, ButtonProps };

export const renderButton = (args: ButtonProps): string => {
  const iconPosition = resolveButtonIconPosition(args);
  const className = buttonClassNames(args);

  let content = args.label;
  let ariaLabel = '';

  if (args.icon && iconPosition) {
    // Same glyph path as Icon — Button CSS sizes it to 1em via .eevenkoto-button .eevenkoto-icon
    const iconMarkup = renderIcon({ name: args.icon });

    if (iconPosition === 'left') {
      content = `${iconMarkup}${args.label}`;
    } else if (iconPosition === 'right') {
      content = `${args.label}${iconMarkup}`;
    } else if (iconPosition === 'only') {
      content = iconMarkup;
      ariaLabel = ` aria-label="${args.label}"`;
    }
  }

  return template
    .replace('{{className}}', className)
    .replace('{{content}}', content)
    .replace('{{ariaLabel}}', ariaLabel)
    .replace('{{disabled}}', args.disabled ? ' disabled' : '');
};
