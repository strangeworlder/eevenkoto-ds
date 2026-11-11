import type { IconName } from '../../tokens/icons';
import type { BadgeIntent, BadgeVariant } from '../atoms/badge';

export type NoticeIntent = BadgeIntent;
export type NoticeVariant = BadgeVariant;
export type NoticeRole = 'status' | 'alert' | 'note' | 'region';

export interface NoticeProps {
  /** Feedback intent (Tier 2). Default: neutral */
  intent?: NoticeIntent;
  /** Surface recipe. Default: subtle */
  variant?: NoticeVariant;
  /** Visible title in `__title`. Optional. */
  title?: string;
  /** Body copy in `__body`. Optional when using framework slots or `bodyHtml`. */
  body?: string;
  /**
   * Trusted pre-rendered HTML for `__body` (e.g. inline cross-references or
   * Markdown output). Takes precedence over `body`.
   */
  bodyHtml?: string;
  /**
   * Leading decorative icon name, or `false` to omit the icon.
   * Defaults automatically from `intent` (`info`, `check`, `warning`, `star`).
   */
  icon?: IconName | false;
  /**
   * ARIA role. Defaults to `'alert'` for `'critical'` and `'caution'` intents,
   * and `'status'` otherwise.
   */
  role?: NoticeRole;
}

export type NoticeClassNameProps = Pick<NoticeProps, 'intent' | 'variant'>;

export const noticeClassNames = (props: NoticeClassNameProps = {}): string => {
  const intent = props.intent ?? 'neutral';
  const variant = props.variant ?? 'subtle';
  return [
    'eevenkoto-notice',
    `eevenkoto-notice--${variant}`,
    `eevenkoto-notice--${intent}`,
  ].join(' ');
};

/** Default icon associated with each Notice feedback intent. */
export const defaultNoticeIcon = (intent: NoticeIntent = 'neutral'): IconName => {
  switch (intent) {
    case 'success':
      return 'check';
    case 'caution':
    case 'critical':
      return 'warning';
    case 'admin':
      return 'star';
    case 'info':
    default:
      return 'info';
  }
};

/** Resolve Notice ARIA role, defaulting `critical` and `caution` to `'alert'`. */
export const resolveNoticeRole = (
  intent: NoticeIntent = 'neutral',
  explicitRole?: NoticeRole,
): NoticeRole => {
  if (explicitRole) return explicitRole;
  if (intent === 'critical' || intent === 'caution') return 'alert';
  return 'status';
};
