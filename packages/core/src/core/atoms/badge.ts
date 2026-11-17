export type BadgeVariant = 'subtle' | 'solid' | 'outline';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeIntent =
  | 'neutral'
  | 'info'
  | 'success'
  | 'caution'
  | 'critical'
  | 'admin';

export interface BadgeProps {
  label: string;
  /** Surface recipe. Default: subtle */
  variant?: BadgeVariant;
  /** Feedback intent (Tier 2). Default: neutral */
  intent?: BadgeIntent;
  /** Shared sm | md | lg ladder. Default: md */
  size?: BadgeSize;
  /** Status dot before the label. Default: false */
  dot?: boolean;
}

export type BadgeClassNameProps = Pick<
  BadgeProps,
  'variant' | 'intent' | 'size'
>;

export const badgeClassNames = (props: BadgeClassNameProps = {}): string => {
  const variant = props.variant ?? 'subtle';
  const intent = props.intent ?? 'neutral';
  const size = props.size ?? 'md';
  return [
    'eevenkoto-badge',
    `eevenkoto-badge--${variant}`,
    `eevenkoto-badge--${intent}`,
    `eevenkoto-badge--${size}`,
  ].join(' ');
};
