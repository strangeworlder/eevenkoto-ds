import {
  toastClassNames,
  defaultToastIcon,
  resolveToastAria,
  type ToastProps,
} from '@eevenkoto/core';
import { renderIcon } from '../icon/renderIcon';
import { escapeHtml } from '../../../utils/html';
import template from './Toast.html';

export type { ToastProps };

export const renderToast = (args: ToastProps = {}): string => {
  const className = toastClassNames(args);
  const { role, ariaLive } = resolveToastAria(args.intent);

  const iconName = args.icon ?? defaultToastIcon(args.intent);
  const iconMarkup = iconName
    ? `<span class="eevenkoto-toast__icon" aria-hidden="true">${renderIcon({ name: iconName })}</span>`
    : '';

  const textMarkup = args.text
    ? `<span class="eevenkoto-toast__text">${escapeHtml(args.text)}</span>`
    : '';

  const content = `${iconMarkup}${textMarkup}`;

  return template
    .replace('{{className}}', className)
    .replace('{{role}}', role)
    .replace('{{ariaLive}}', ariaLive)
    .replace('{{content}}', content);
};
