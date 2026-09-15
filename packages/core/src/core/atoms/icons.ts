import type { IconName } from '../../tokens/icons';

export type { IconName } from '../../tokens/icons';

/** Shared size ladder for Icon. */
export type IconSize = 'sm' | 'md' | 'lg';

export interface IconProps {
  /** Glyph from token inventory (`ICON_NAMES` / `iconPaths`). */
  name: IconName;
  /** Default: md */
  size?: IconSize;
  /** Accessible name. Omit for decorative icons (rendered `aria-hidden`). */
  label?: string;
}

export type IconClassNameProps = Pick<IconProps, 'size'>;

export const iconClassNames = (props: IconClassNameProps = {}): string => {
  const size = props.size ?? 'md';
  return `eevenkoto-icon eevenkoto-icon--${size}`;
};
