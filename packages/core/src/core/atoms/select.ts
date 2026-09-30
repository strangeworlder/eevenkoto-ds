export type SelectSize = 'sm' | 'md';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}

export interface SelectProps {
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  /** Default: md */
  size?: SelectSize;
  disabled?: boolean;
  /** Fails validation — sets the invalid recipe and aria-invalid. Pair with error text via Field. */
  invalid?: boolean;
  /** Optional placeholder text shown as an unselected/disabled initial option. */
  placeholder?: string;
  /** Accessible label when no visible Field label is present. */
  ariaLabel?: string;
  /** Space-separated element ids described by this control. */
  describedBy?: string;
  /** Flat list of options. */
  options?: SelectOption[];
  /** Grouped options with <optgroup>. */
  groups?: SelectOptionGroup[];
}

export type SelectClassNameProps = Pick<SelectProps, 'size' | 'invalid' | 'disabled'>;

export const selectClassNames = (props: SelectClassNameProps = {}): string => {
  const size = props.size ?? 'md';
  return [
    'eevenkoto-select',
    `eevenkoto-select--${size}`,
    props.invalid ? 'eevenkoto-select--invalid' : '',
    props.disabled ? 'eevenkoto-select--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');
};

export const selectFieldClassNames = (): string => 'eevenkoto-select__field';

export const selectIconClassNames = (): string => 'eevenkoto-select__icon';
