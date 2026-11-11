import type { ButtonIconName } from '../../tokens/icons';

export type { ButtonIconName };

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
/** Shared size ladder across controls and type primitives: sm | md | lg */
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonIconPosition = 'left' | 'right' | 'only';

export interface ButtonProps {
  /** Default: primary (host class alone is also primary in CSS) */
  variant?: ButtonVariant;
  label: string;
  /** Default: md */
  size?: ButtonSize;
  disabled?: boolean;
  /** Glyph from token subset `BUTTON_ICON_NAMES`. */
  icon?: ButtonIconName;
  /** Where the icon sits relative to the label. Defaults to left when icon is set. */
  iconPosition?: ButtonIconPosition;
  /** Stretch button to fill its container width (`inline-size: 100%`). */
  fullWidth?: boolean;
}

/** Props that affect Button BEM class names (excludes label/disabled content). */
export type ButtonClassNameProps = Pick<
  ButtonProps,
  'variant' | 'size' | 'icon' | 'iconPosition' | 'fullWidth'
>;

export const resolveButtonIconPosition = (
  props: Pick<ButtonProps, 'icon' | 'iconPosition'>,
): ButtonIconPosition | undefined => {
  if (!props.icon) return props.iconPosition;
  return props.iconPosition ?? 'left';
};

export const buttonClassNames = (props: ButtonClassNameProps = {}): string => {
  const variant = props.variant ?? 'primary';
  const size = props.size ?? 'md';
  const iconPosition = resolveButtonIconPosition(props);
  const iconClass = iconPosition ? ` eevenkoto-button--icon-${iconPosition}` : '';
  const widthClass = props.fullWidth ? ' eevenkoto-button--full-width' : '';
  return `eevenkoto-button eevenkoto-button--${variant} eevenkoto-button--${size}${iconClass}${widthClass}`;
};
