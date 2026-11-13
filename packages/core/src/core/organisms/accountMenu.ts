import type { BadgeIntent } from '../atoms/badge';
import type { MenuEntry } from '../molecules/menu';

export interface AccountMenuProps {
  /** Optional DOM element `id` on the root container. */
  id?: string;
  /** Signed-in state. When `false`, renders a full-width secondary login LinkButton. */
  authenticated: boolean;
  /** Destination URL for unauthenticated login button. Default: `'#login'`. */
  loginHref?: string;
  /** Label for unauthenticated login button. Default: `'Sign in'`. */
  loginLabel?: string;
  /** Signed-in display name. */
  userName?: string;
  /** Optional email address shown in the popover summary (omitted when empty). */
  userEmail?: string;
  /** Optional avatar image URL. */
  avatarSrc?: string;
  /** Optional membership/role tier label rendered as a Badge. */
  tierLabel?: string;
  /** Feedback intent for the tier Badge. Default: `'neutral'`. */
  tierIntent?: BadgeIntent;
  /** Accessible label for the embedded navigation `<Menu>`. Default: `'Account menu'`. */
  menuLabel?: string;
  /** Accessible label for the `<Popover>` region. Default: `'Account'`. */
  popoverLabel?: string;
  /** Menu entries rendered inside the popover (supports `tone: 'destructive'` for sign-out). */
  entries?: MenuEntry[];
  /** Whether the account popover is expanded. Default: `false`. */
  open?: boolean;
}

export type AccountMenuClassNameProps = Pick<AccountMenuProps, 'authenticated' | 'open'>;

export const accountMenuClassNames = (props: AccountMenuClassNameProps): string =>
  [
    'eevenkoto-account-menu',
    !props.authenticated ? 'eevenkoto-account-menu--unauthenticated' : '',
    props.open ? 'eevenkoto-account-menu--open' : '',
  ]
    .filter(Boolean)
    .join(' ');
