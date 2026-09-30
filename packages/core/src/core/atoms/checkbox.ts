export type CheckboxSize = 'sm' | 'md';
export type CheckboxVariant = 'default' | 'card';

export interface CheckboxProps {
  /** Field id (wire to a visible label / input). */
  id?: string;
  name?: string;
  value?: string;
  /** Primary label text. */
  label: string;
  /** Optional secondary description text below label. */
  description?: string;
  /** Optional badge text or tag displayed beside label. */
  badge?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  /**
   * Visual presentation style.
   * - `default`: standard inline/block checkbox row
   * - `card`: selectable card container with border, hover, and checked highlight
   */
  variant?: CheckboxVariant;
  /** Convenience boolean alias for `variant: 'card'`. */
  card?: boolean;
  /** Fails validation — sets the invalid recipe and aria-invalid. */
  invalid?: boolean;
  /** Default: md */
  size?: CheckboxSize;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export type CheckboxClassNameProps = Pick<
  CheckboxProps,
  'variant' | 'card' | 'size' | 'invalid' | 'disabled'
>;

export const checkboxClassNames = (props: CheckboxClassNameProps = {}): string => {
  const size = props.size ?? 'md';
  const isCard = props.variant === 'card' || Boolean(props.card);
  return [
    'eevenkoto-checkbox',
    `eevenkoto-checkbox--${size}`,
    isCard ? 'eevenkoto-checkbox--card' : '',
    props.invalid ? 'eevenkoto-checkbox--invalid' : '',
    props.disabled ? 'eevenkoto-checkbox--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');
};

export const checkboxControlClassNames = (): string => 'eevenkoto-checkbox__control';
export const checkboxContentClassNames = (): string => 'eevenkoto-checkbox__content';
export const checkboxTitleClassNames = (): string => 'eevenkoto-checkbox__title';
export const checkboxDescriptionClassNames = (): string => 'eevenkoto-checkbox__description';
export const checkboxBadgeClassNames = (): string => 'eevenkoto-checkbox__badge';
