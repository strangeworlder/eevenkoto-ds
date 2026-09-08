import {
  buttonClassNames,
  buttonIconPaths,
  resolveButtonIconPosition,
  type ButtonIconName,
  type ButtonProps,
} from '@eevenkoto/core';
import template from './Button.html';

/** @deprecated Prefer ButtonProps from @eevenkoto/core */
export type ButtonArgs = ButtonProps;
export type { ButtonIconName, ButtonProps };

const renderIcon = (name: ButtonIconName): string =>
  `
  <svg class="eevenkoto-button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="${buttonIconPaths[name]}"/>
  </svg>
`.trim();

export const renderButton = (args: ButtonProps): string => {
  const iconPosition = resolveButtonIconPosition(args);
  const className = buttonClassNames(args);

  let content = args.label;
  let ariaLabel = '';

  if (args.icon && iconPosition) {
    const iconMarkup = renderIcon(args.icon);

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
