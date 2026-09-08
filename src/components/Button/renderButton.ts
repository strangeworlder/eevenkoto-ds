// src/components/Button/renderButton.ts
import template from './Button.html?raw';

/** Placeholder icon names until a shared icon library exists. */
export type ButtonIconName = 'star' | 'check' | 'arrow' | 'plus';

export interface ButtonArgs {
  variant: 'primary' | 'secondary' | 'ghost';
  label: string;
  size?: 'small' | 'large';
  disabled?: boolean;
  /** Which placeholder icon to render. */
  icon?: ButtonIconName;
  /** Where the icon sits relative to the label. Defaults to left when icon is set. */
  iconPosition?: 'left' | 'right' | 'only';
}

const iconPaths: Record<ButtonIconName, string> = {
  star: 'M8 1.5a.75.75 0 0 1 .67.41l1.52 3.08 3.4.5a.75.75 0 0 1 .42 1.28l-2.46 2.4.58 3.39a.75.75 0 0 1-1.09.79L8 12.27l-3.04 1.6a.75.75 0 0 1-1.09-.79l.58-3.39-2.46-2.4a.75.75 0 0 1 .42-1.28l3.4-.5L7.33 1.91A.75.75 0 0 1 8 1.5Z',
  check:
    'M12.207 4.793a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L7 8.586l3.793-3.793a1 1 0 0 1 1.414 0Z',
  arrow:
    'M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L11.44 8.75H2.75a.75.75 0 0 1 0-1.5h8.69L8.22 4.03a.75.75 0 0 1 0-1.06Z',
  plus: 'M8 3a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 0 1.5h-3.5v3.5a.75.75 0 0 1-1.5 0v-3.5h-3.5a.75.75 0 0 1 0-1.5h3.5v-3.5A.75.75 0 0 1 8 3Z',
};

const renderIcon = (name: ButtonIconName): string =>
  `
  <svg class="eevenkoto-button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="${iconPaths[name]}"/>
  </svg>
`.trim();

export const renderButton = (args: ButtonArgs): string => {
  const sizeClass = args.size ? ` eevenkoto-button--${args.size}` : '';
  const iconPosition = args.icon ? (args.iconPosition ?? 'left') : args.iconPosition;
  const iconClass = iconPosition ? ` eevenkoto-button--icon-${iconPosition}` : '';

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
    .replace('{{variant}}', args.variant)
    .replace('{{sizeClass}}', sizeClass)
    .replace('{{iconClass}}', iconClass)
    .replace('{{content}}', content)
    .replace('{{ariaLabel}}', ariaLabel)
    .replace('{{disabled}}', args.disabled ? ' disabled' : '');
};
