import { accountMenuClassNames, popoverClassNames, type AccountMenuProps } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { Avatar } from '../atoms/Avatar';
import { Badge } from '../atoms/Badge';
import { Icon } from '../atoms/Icon';
import { LinkButton } from '../atoms/LinkButton';
import { Menu } from '../molecules/Menu';

export type { AccountMenuProps };

export type AccountMenuComponentProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  AccountMenuProps & {
    /** Rendered at the bottom of the popover (e.g. dev tools). */
    footer?: ReactNode;
    onToggle?: (open: boolean) => void;
    onSelectEntry?: (id: string) => void;
  };

export const AccountMenu = ({
  id,
  authenticated,
  loginHref = '#login',
  loginLabel = 'Sign in',
  userName = '',
  userEmail,
  avatarSrc,
  tierLabel,
  tierIntent = 'neutral',
  menuLabel = 'Account menu',
  popoverLabel = 'Account',
  entries,
  open,
  footer,
  onToggle,
  onSelectEntry,
  className,
  ...rest
}: AccountMenuComponentProps): ReactElement => {
  const classes = [accountMenuClassNames({ authenticated, open }), className]
    .filter(Boolean)
    .join(' ');

  if (!authenticated) {
    return (
      <div id={id} className={classes} {...rest}>
        <LinkButton href={loginHref} label={loginLabel} variant="secondary" icon="user" fullWidth />
      </div>
    );
  }

  const popoverId = id ? `${id}-popover` : undefined;

  return (
    <div id={id} className={classes} {...rest}>
      <button
        type="button"
        className="eevenkoto-account-menu__trigger"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : 'false'}
        aria-controls={popoverId}
        onClick={onToggle ? () => onToggle(!open) : undefined}
      >
        <Avatar name={userName} src={avatarSrc} size="sm" />
        <span className="eevenkoto-account-menu__identity">
          <span className="eevenkoto-account-menu__name">{userName}</span>
          {tierLabel ? (
            <Badge label={tierLabel} size="sm" variant="subtle" shape="pill" intent={tierIntent} />
          ) : null}
        </span>
        <Icon name="chevron-down" size="sm" className="eevenkoto-account-menu__chevron" />
      </button>
      <div
        id={popoverId}
        className={popoverClassNames({ placement: 'bottom-start', matchTriggerWidth: true })}
        role="dialog"
        aria-label={popoverLabel}
        hidden={open ? undefined : true}
      >
        <div className="eevenkoto-account-menu__summary">
          <span>{userName}</span>
          {userEmail ? <span className="eevenkoto-account-menu__email">{userEmail}</span> : null}
          {tierLabel ? (
            <Badge label={tierLabel} size="sm" variant="solid" shape="pill" intent={tierIntent} />
          ) : null}
        </div>
        {entries?.length ? (
          <Menu label={menuLabel} entries={entries} embedded size="sm" onSelect={onSelectEntry as never} />
        ) : null}
        {footer ? <div className="eevenkoto-account-menu__footer">{footer}</div> : null}
      </div>
    </div>
  );
};
