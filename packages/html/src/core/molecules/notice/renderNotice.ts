import { noticeClassNames, type NoticeProps as NoticeCoreProps } from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import template from './Notice.html';

export type NoticeProps = NoticeCoreProps & {
  /** Optional icon HTML (decorative). */
  icon?: string;
  /** Optional actions HTML (buttons/links). */
  actions?: string;
  /** ARIA role. Default: status */
  role?: 'status' | 'alert' | 'note' | 'region';
};

export const renderNotice = (args: NoticeProps): string => {
  const className = noticeClassNames(args);
  const role = args.role ?? 'status';
  const roleAttr = ` role="${role}"`;

  const icon = args.icon
    ? `<span class="eevenkoto-notice__icon" aria-hidden="true">${args.icon}</span>`
    : '';

  const title = args.title
    ? `<p class="eevenkoto-notice__title">${escapeHtml(args.title)}</p>`
    : '';
  const body = args.body
    ? `<p class="eevenkoto-notice__body">${escapeHtml(args.body)}</p>`
    : '';
  const actions = args.actions
    ? `<div class="eevenkoto-notice__actions">${args.actions}</div>`
    : '';

  const contentInner = `${title}${body}${actions}`;
  const content = `${icon}<div class="eevenkoto-notice__content">${contentInner}</div>`;

  return template
    .replace('{{className}}', className)
    .replace('{{roleAttr}}', roleAttr)
    .replace('{{content}}', content);
};
