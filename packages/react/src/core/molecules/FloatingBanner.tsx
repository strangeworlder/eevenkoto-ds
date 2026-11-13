import {
  floatingBannerActionsClassNames,
  floatingBannerBodyClassNames,
  floatingBannerClassNames,
  type FloatingBannerProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { Button } from '../atoms/Button';

export type { FloatingBannerProps };

export type FloatingBannerComponentProps = Omit<HTMLAttributes<HTMLElement>, 'children'> &
  FloatingBannerProps & {
    /** Body content; takes precedence over `bodyHtml` and `body`. */
    children?: ReactNode;
    /** Replaces the built-in confirm button. */
    actions?: ReactNode;
    onConfirm?: () => void;
  };

export const FloatingBanner = ({
  id,
  open,
  placement,
  ariaLabel,
  body,
  bodyHtml,
  secondaryLink,
  confirmLabel,
  confirmId,
  children,
  actions,
  onConfirm,
  className,
  ...rest
}: FloatingBannerComponentProps): ReactElement => {
  const classes = [floatingBannerClassNames({ open, placement }), className]
    .filter(Boolean)
    .join(' ');
  const link = secondaryLink ? (
    <>
      {' '}
      <a href={secondaryLink.href}>{secondaryLink.label}</a>
    </>
  ) : null;

  return (
    <aside id={id} className={classes} aria-label={ariaLabel} {...rest}>
      <div className={floatingBannerBodyClassNames()}>
        {children !== undefined ? (
          children
        ) : bodyHtml !== undefined ? (
          <span dangerouslySetInnerHTML={{ __html: bodyHtml }} />
        ) : (
          body
        )}
        {link}
      </div>
      <div className={floatingBannerActionsClassNames()}>
        {actions ??
          (confirmLabel ? (
            <Button label={confirmLabel} size="sm" id={confirmId} onClick={onConfirm} />
          ) : null)}
      </div>
    </aside>
  );
};
