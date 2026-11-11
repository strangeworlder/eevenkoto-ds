import {
  toastClassNames,
  defaultToastIcon,
  resolveToastAria,
  type ToastProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { Icon } from './Icon';

export type { ToastProps };

export type ToastComponentProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  ToastProps & {
    children?: ReactNode;
  };

export const Toast = ({
  text,
  intent,
  variant,
  icon,
  visible = true,
  hidden,
  placement,
  className,
  children,
  role: userRole,
  'aria-live': userAriaLive,
  ...rest
}: ToastComponentProps): ReactElement => {
  const classes = [
    toastClassNames({ intent, variant, visible, hidden, placement }),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const defaultAria = resolveToastAria(intent);
  const iconName = icon === false ? null : (icon ?? defaultToastIcon(intent));

  return (
    <div
      className={classes}
      role={userRole ?? defaultAria.role}
      aria-live={userAriaLive ?? defaultAria.ariaLive}
      hidden={hidden}
      {...rest}
    >
      {iconName ? (
        <span className="eevenkoto-toast__icon" aria-hidden="true">
          <Icon name={iconName} />
        </span>
      ) : null}
      {children ? (
        <span className="eevenkoto-toast__text">{children}</span>
      ) : text ? (
        <span className="eevenkoto-toast__text">{text}</span>
      ) : null}
    </div>
  );
};
