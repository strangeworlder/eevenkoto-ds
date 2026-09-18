import type { ButtonIconName } from '../../tokens/icons';

export type { ButtonIconName };

export type LinkButtonVariant = 'primary' | 'secondary';
/** Shared size ladder across controls and type primitives: sm | md | lg */
export type LinkButtonSize = 'sm' | 'md' | 'lg';
export type LinkButtonIconPosition = 'left' | 'right';

export interface LinkButtonProps {
  /** Destination URL. Always renders as `<a>`. */
  href: string;
  /** Default: primary (host class alone is also primary in CSS) */
  variant?: LinkButtonVariant;
  label: string;
  /** Default: md */
  size?: LinkButtonSize;
  /**
   * Inert CTA without `href`, with `aria-disabled` (anchors have no `disabled`).
   * Prefer omitting the control instead.
   */
  disabled?: boolean;
  /** Glyph from token subset `BUTTON_ICON_NAMES`. */
  icon?: ButtonIconName;
  /** Where the icon sits relative to the label. Defaults to right when icon is set. */
  iconPosition?: LinkButtonIconPosition;
  target?: string;
  /** `_blank` automatically adds `noopener noreferrer`. */
  rel?: string;
}

/** Props that affect LinkButton BEM class names (excludes href/label/disabled). */
export type LinkButtonClassNameProps = Pick<
  LinkButtonProps,
  'variant' | 'size' | 'icon' | 'iconPosition'
>;

export const resolveLinkButtonIconPosition = (
  props: Pick<LinkButtonProps, 'icon' | 'iconPosition'>,
): LinkButtonIconPosition | undefined => {
  if (!props.icon) return props.iconPosition;
  return props.iconPosition ?? 'right';
};

/** Ensure new-tab links cannot access the opener or leak the referrer. */
export const resolveLinkButtonRel = (
  props: Pick<LinkButtonProps, 'target' | 'rel'>,
): string | undefined => {
  if (props.target !== '_blank') return props.rel;

  const values = new Set(props.rel?.split(/\s+/).filter(Boolean) ?? []);
  values.add('noopener');
  values.add('noreferrer');
  return [...values].join(' ');
};

export const linkButtonClassNames = (props: LinkButtonClassNameProps = {}): string => {
  const variant = props.variant ?? 'primary';
  const size = props.size ?? 'md';
  const iconPosition = resolveLinkButtonIconPosition(props);
  const iconClasses = [
    iconPosition ? `eevenkoto-link-button--icon-${iconPosition}` : '',
    props.icon === 'arrow' ? 'eevenkoto-link-button--icon-arrow' : '',
  ]
    .filter(Boolean)
    .join(' ');
  return `eevenkoto-link-button eevenkoto-link-button--${variant} eevenkoto-link-button--${size}${iconClasses ? ` ${iconClasses}` : ''}`;
};
