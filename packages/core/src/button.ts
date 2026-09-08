export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'small' | 'large';
export type ButtonIconName = 'star' | 'check' | 'arrow' | 'plus';
export type ButtonIconPosition = 'left' | 'right' | 'only';

export interface ButtonProps {
  variant: ButtonVariant;
  label: string;
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

export const buttonClassNames = (props: ButtonClassNameProps): string => {
  const iconPosition = resolveButtonIconPosition(props);
  const sizeClass = props.size ? ` eevenkoto-button--${props.size}` : '';
  const iconClass = iconPosition ? ` eevenkoto-button--icon-${iconPosition}` : '';
  return `eevenkoto-button eevenkoto-button--${props.variant}${sizeClass}${iconClass}`;
};
