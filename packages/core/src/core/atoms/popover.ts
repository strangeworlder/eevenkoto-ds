export type PopoverPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'right';

export interface PopoverProps {
  /** Side/edge of the positioned parent the panel sits on. Default: bottom. Ignored when `fixed`. */
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
  /** Stretch minimum inline size to match the positioned trigger (`min-inline-size: 100%`). Ignored when `fixed`. */
  matchTriggerWidth?: boolean;
  /** Accessible name for the panel. */
  label?: string;
}

export type PopoverClassNameProps = Pick<
  PopoverProps,
  'placement' | 'fixed' | 'open' | 'matchTriggerWidth'
>;

export const popoverClassNames = (props: PopoverClassNameProps = {}): string => {
  const placement = props.placement ?? 'bottom';
  const parts = ['eevenkoto-popover'];
  if (props.fixed) {
    parts.push('eevenkoto-popover--fixed');
    if (props.open) parts.push('eevenkoto-popover--open');
  } else {
    parts.push(`eevenkoto-popover--${placement}`);
    if (props.matchTriggerWidth) {
      parts.push('eevenkoto-popover--match-trigger-width');
    }
  }
  return parts.join(' ');
};
