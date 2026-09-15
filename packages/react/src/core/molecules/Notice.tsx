import { noticeClassNames, type NoticeProps } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';

export type { NoticeProps };

export type NoticeComponentProps = Omit<HTMLAttributes<HTMLElement>, 'title' | 'children'> &
  NoticeProps & {
    icon?: ReactNode;
    actions?: ReactNode;
    children?: ReactNode;
    /** ARIA role. Default: status */
    role?: 'status' | 'alert' | 'note' | 'region';
  };

export const Notice = ({
  intent,
  variant,
  title,
  body,
  icon,
  actions,
  children,
  className,
  role = 'status',
  ...rest
}: NoticeComponentProps): ReactElement => {
  const classes = [noticeClassNames({ intent, variant }), className].filter(Boolean).join(' ');

  return (
    <aside className={classes} role={role} {...rest}>
      {icon ? (
        <span className="eevenkoto-notice__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <div className="eevenkoto-notice__content">
        {title ? <p className="eevenkoto-notice__title">{title}</p> : null}
        {body ? <p className="eevenkoto-notice__body">{body}</p> : null}
        {children}
        {actions ? <div className="eevenkoto-notice__actions">{actions}</div> : null}
      </div>
    </aside>
  );
};
