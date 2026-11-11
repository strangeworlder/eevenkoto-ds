import {
  ICON_NAMES,
  defaultNoticeIcon,
  noticeClassNames,
  resolveNoticeRole,
  type IconName,
  type NoticeProps,
  type NoticeRole,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { Icon } from '../atoms/Icon';

export type { NoticeProps, NoticeRole };

export type NoticeComponentProps = Omit<HTMLAttributes<HTMLElement>, 'title' | 'children' | 'role'> &
  Omit<NoticeProps, 'icon'> & {
    icon?: IconName | ReactNode | false;
    actions?: ReactNode;
    children?: ReactNode;
  };

const BLOCK_TAG_RE = /^\s*<(?:p|ul|ol|div|dl|blockquote|table|figure|section|h[1-6])\b/i;

export const Notice = ({
  intent,
  variant,
  title,
  body,
  bodyHtml,
  icon,
  actions,
  children,
  className,
  role,
  ...rest
}: NoticeComponentProps): ReactElement => {
  const classes = [noticeClassNames({ intent, variant }), className].filter(Boolean).join(' ');
  const resolvedRole = resolveNoticeRole(intent, role);

  let iconNode: ReactNode = null;
  if (icon === false) {
    iconNode = null;
  } else if (icon === undefined) {
    iconNode = <Icon name={defaultNoticeIcon(intent)} />;
  } else if (typeof icon === 'string' && (ICON_NAMES as readonly string[]).includes(icon)) {
    iconNode = <Icon name={icon as IconName} />;
  } else {
    iconNode = icon;
  }

  return (
    <div className={classes} role={resolvedRole} {...rest}>
      {iconNode ? (
        <span className="eevenkoto-notice__icon" aria-hidden="true">
          {iconNode}
        </span>
      ) : null}
      <div className="eevenkoto-notice__content">
        {title ? <p className="eevenkoto-notice__title">{title}</p> : null}
        {bodyHtml ? (
          BLOCK_TAG_RE.test(bodyHtml) ? (
            <div className="eevenkoto-notice__body" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
          ) : (
            <p className="eevenkoto-notice__body" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
          )
        ) : body ? (
          <p className="eevenkoto-notice__body">{body}</p>
        ) : null}
        {children}
        {actions ? <div className="eevenkoto-notice__actions">{actions}</div> : null}
      </div>
    </div>
  );
};
