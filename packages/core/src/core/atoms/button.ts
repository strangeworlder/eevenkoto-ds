export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
/** Shared size ladder across controls and type primitives: sm | md | lg */
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonIconName = 'star' | 'check' | 'arrow' | 'plus';
export type ButtonIconPosition = 'left' | 'right' | 'only';

export interface ButtonProps {
  /** Default: primary (host class alone is also primary in CSS) */
  variant?: ButtonVariant;
  label: string;
  /** Default: md */
  size?: ButtonSize;
  disabled?: boolean;
  /** Which placeholder icon to render. */
  icon?: ButtonIconName;
  /** Where the icon sits relative to the label. Defaults to left when icon is set. */
  iconPosition?: ButtonIconPosition;
}

/** Props that affect Button BEM class names (excludes label/disabled content). */
export type ButtonClassNameProps = Pick<ButtonProps, 'variant' | 'size' | 'icon' | 'iconPosition'>;

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
  return `eevenkoto-button eevenkoto-button--${variant} eevenkoto-button--${size}${iconClass}`;
};
