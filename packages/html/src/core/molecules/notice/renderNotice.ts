import {
  ICON_NAMES,
  defaultNoticeIcon,
  noticeClassNames,
  resolveNoticeRole,
  type IconName,
  type NoticeProps as NoticeCoreProps,
  type NoticeRole,
} from '@eevenkoto/core';
import { renderIcon } from '../../atoms/icon/renderIcon';
import { escapeHtml } from '../../../utils/html';
import template from './Notice.html';

export type NoticeProps = Omit<NoticeCoreProps, 'icon'> & {
  /**
   * Optional icon name (`IconName`), `false` to omit the icon, or legacy raw
   * decorative SVG HTML string. Defaults automatically from `intent`.
   */
  icon?: IconName | false | string;
  /** Optional actions HTML (buttons/links). */
  actions?: string;
};

export type { NoticeRole };

const BLOCK_TAG_RE = /^\s*<(?:p|ul|ol|div|dl|blockquote|table|figure|section|h[1-6])\b/i;

export const renderNotice = (args: NoticeProps): string => {
  const className = noticeClassNames(args);
  const role = resolveNoticeRole(args.intent, args.role);
  const roleAttr = ` role="${role}"`;

  let iconInner = '';
  if (args.icon === false) {
    iconInner = '';
  } else if (typeof args.icon === 'string') {
    if ((ICON_NAMES as readonly string[]).includes(args.icon)) {
      iconInner = renderIcon({ name: args.icon as IconName });
    } else {
      iconInner = args.icon;
    }
  } else {
    iconInner = renderIcon({ name: defaultNoticeIcon(args.intent) });
  }

  const icon = iconInner
    ? `<span class="eevenkoto-notice__icon" aria-hidden="true">${iconInner}</span>`
    : '';

  const title = args.title
    ? `<p class="eevenkoto-notice__title">${escapeHtml(args.title)}</p>`
    : '';
  const body = args.bodyHtml
    ? BLOCK_TAG_RE.test(args.bodyHtml)
      ? `<div class="eevenkoto-notice__body">${args.bodyHtml}</div>`
      : `<p class="eevenkoto-notice__body">${args.bodyHtml}</p>`
    : args.body
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
