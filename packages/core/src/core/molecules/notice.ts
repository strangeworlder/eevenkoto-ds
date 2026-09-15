import type { BadgeIntent, BadgeVariant } from '../atoms/badge';

export type NoticeIntent = BadgeIntent;
export type NoticeVariant = BadgeVariant;

export interface NoticeProps {
  /** Feedback intent (Tier 2). Default: neutral */
  intent?: NoticeIntent;
  /** Surface recipe. Default: subtle */
  variant?: NoticeVariant;
  /** Visible title in `__title`. Optional. */
  title?: string;
  /** Body copy in `__body`. Optional when using framework slots. */
  body?: string;
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
