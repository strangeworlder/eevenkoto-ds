export type FloatingBannerPlacement = 'bottom-center' | 'bottom-right';

export interface FloatingBannerLink {
  label: string;
  href: string;
}

export interface FloatingBannerProps {
  /** Optional DOM element `id`. */
  id?: string;
  /** Whether the floating banner is visible. Default: `false`. */
  open?: boolean;
  /** Viewport anchor placement. Default: `'bottom-center'`. */
  placement?: FloatingBannerPlacement;
  /** Accessible landmark name (`aria-label`). */
  ariaLabel: string;
  /** Plain-text body copy. Optional when `bodyHtml` or framework slot is set. */
  body?: string;
  /** Trusted inline/block HTML for body copy. Takes precedence over `body`. */
  bodyHtml?: string;
  /** Optional inline policy/details link appended after body copy. */
  secondaryLink?: FloatingBannerLink;
  /** Primary confirm/dismiss button label (used when custom `actions` slot/prop is omitted). */
  confirmLabel?: string;
  /** Optional `id` on the built-in confirm button for client event wiring. */
  confirmId?: string;
}

export type FloatingBannerClassNameProps = Pick<FloatingBannerProps, 'open' | 'placement'>;

export const floatingBannerClassNames = (props: FloatingBannerClassNameProps = {}): string => {
  const placement = props.placement ?? 'bottom-center';
  return [
    'eevenkoto-floating-banner',
    placement === 'bottom-right' ? 'eevenkoto-floating-banner--bottom-right' : '',
    props.open ? 'eevenkoto-floating-banner--open' : '',
  ]
    .filter(Boolean)
    .join(' ');
};

export const floatingBannerBodyClassNames = (): string => 'eevenkoto-floating-banner__body';
export const floatingBannerActionsClassNames = (): string => 'eevenkoto-floating-banner__actions';
