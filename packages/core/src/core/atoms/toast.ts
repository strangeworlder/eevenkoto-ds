import type { IconName } from '../../tokens/icons';
import type { BadgeIntent } from './badge';

export type ToastIntent = BadgeIntent;
export type ToastVariant = 'subtle' | 'solid';
export type ToastPlacement = 'fixed-bottom-right' | 'fixed-bottom-center' | 'inline';

export interface ToastProps {
  /** Visible notification text. */
  text?: string;
  /** Feedback intent (Tier 2). Default: neutral */
  intent?: ToastIntent;
  /** Surface recipe (subtle raised surface or solid colored fill). Default: subtle */
  variant?: ToastVariant;
  /** Optional icon glyph token, or `false` to omit the icon. Default: inferred from intent. */
  icon?: IconName | false;
  /** When false, emits --hidden modifier (controlling fade/slide exit). Default: true */
  visible?: boolean;
  /** Alias for `visible: false`. When true, emits --hidden modifier. */
  hidden?: boolean;
  /** Placement mode: inline (default), fixed-bottom-right, fixed-bottom-center. */
  placement?: ToastPlacement;
}

export type ToastClassNameProps = Pick<
  ToastProps,
  'intent' | 'variant' | 'placement' | 'visible' | 'hidden'
>;

export const toastClassNames = (props: ToastClassNameProps = {}): string => {
  const intent = props.intent ?? 'neutral';
  const variant = props.variant ?? 'subtle';
  const placement = props.placement ?? 'inline';
  const isVisible = !props.hidden && props.visible !== false;

  return [
    'eevenkoto-toast',
    `eevenkoto-toast--${variant}`,
    `eevenkoto-toast--${intent}`,
    placement !== 'inline' ? `eevenkoto-toast--${placement}` : '',
    !isVisible ? 'eevenkoto-toast--hidden' : 'eevenkoto-toast--visible',
  ]
    .filter(Boolean)
    .join(' ');
};

/** Default icon associated with each feedback intent */
export const defaultToastIcon = (intent: ToastIntent = 'neutral'): IconName => {
  switch (intent) {
    case 'success':
      return 'check';
    case 'info':
      return 'info';
    case 'admin':
      return 'star';
    case 'caution':
    case 'critical':
      return 'warning';
    default:
      return 'check';
  }
};

/** Accessible role and live region politeness */
export const resolveToastAria = (
  intent: ToastIntent = 'neutral',
): { role: 'status' | 'alert'; ariaLive: 'polite' | 'assertive' } => {
  if (intent === 'critical') {
    return { role: 'alert', ariaLive: 'assertive' };
  }
  return { role: 'status', ariaLive: 'polite' };
};
