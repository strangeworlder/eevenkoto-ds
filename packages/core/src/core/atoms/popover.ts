export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverProps {
  /** Side of the positioned parent the panel sits on. Default: bottom. Ignored when `fixed`. */
  placement?: PopoverPlacement;
  /** Renders the `__arrow` pointer. Default: false */
  arrow?: boolean;
  /**
   * Portal / JS-positioned overlay (`position: fixed`).
   * App sets `top` / `left`; toggle open with `open` or `data-open="true"`.
   */
  fixed?: boolean;
  /** Visible open state for `fixed` panels. Default: false */
  open?: boolean;
  /** Accessible name for the panel. */
  label?: string;
}

export type PopoverClassNameProps = Pick<PopoverProps, 'placement' | 'fixed' | 'open'>;

export const popoverClassNames = (props: PopoverClassNameProps = {}): string => {
  const placement = props.placement ?? 'bottom';
  const parts = ['eevenkoto-popover'];
  if (props.fixed) {
    parts.push('eevenkoto-popover--fixed');
    if (props.open) parts.push('eevenkoto-popover--open');
  } else {
    parts.push(`eevenkoto-popover--${placement}`);
  }
  return parts.join(' ');
};
