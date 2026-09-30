export type RadioSize = 'sm' | 'md';
export type RadioVariant = 'default' | 'card' | 'tile';

export interface RadioProps {
  id?: string;
  name?: string;
  value: string;
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
   * - `default`: standard inline/block radio row
   * - `card`: selectable card container with radio control visible
   * - `tile`: selection tile card with radio control hidden and prominent text
   */
  variant?: RadioVariant;
  /** Convenience boolean alias for `variant: 'card'`. */
  card?: boolean;
  /** Fails validation — sets the invalid recipe and aria-invalid. */
  invalid?: boolean;
  /** Default: md */
  size?: RadioSize;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export type RadioClassNameProps = Pick<
  RadioProps,
  'variant' | 'card' | 'size' | 'invalid' | 'disabled'
>;

export const radioClassNames = (props: RadioClassNameProps = {}): string => {
  const size = props.size ?? 'md';
  const effectiveVariant = props.variant ?? (props.card ? 'card' : 'default');
  return [
    'eevenkoto-radio',
    `eevenkoto-radio--${size}`,
    effectiveVariant !== 'default' ? `eevenkoto-radio--${effectiveVariant}` : '',
    props.invalid ? 'eevenkoto-radio--invalid' : '',
    props.disabled ? 'eevenkoto-radio--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');
};

export const radioControlClassNames = (): string => 'eevenkoto-radio__control';
export const radioContentClassNames = (): string => 'eevenkoto-radio__content';
export const radioTitleClassNames = (): string => 'eevenkoto-radio__title';
export const radioDescriptionClassNames = (): string => 'eevenkoto-radio__description';
export const radioBadgeClassNames = (): string => 'eevenkoto-radio__badge';
