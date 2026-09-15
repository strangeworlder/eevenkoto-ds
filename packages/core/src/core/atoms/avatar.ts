/** Shared size ladder across controls and type primitives: sm | md | lg */
export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps {
  /** Accessible name (img `alt`, or `aria-label` on the placeholder). */
  name: string;
  /** Portrait URL. When omitted, the parchment user placeholder renders. */
  src?: string;
  /** Default: md */
  size?: AvatarSize;
}

export type AvatarClassNameProps = Pick<AvatarProps, 'size'>;

export const avatarClassNames = (props: AvatarClassNameProps = {}): string => {
  const size = props.size ?? 'md';
  return `eevenkoto-avatar eevenkoto-avatar--${size}`;
};
