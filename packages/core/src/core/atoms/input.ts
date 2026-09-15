export type InputSize = 'sm' | 'md';
export type InputType = 'text' | 'search' | 'email' | 'password' | 'tel' | 'url' | 'number';

export interface InputProps {
  /** Field id (wire to a visible `<label for>` / Field). */
  id?: string;
  name?: string;
  /** Default: text */
  type?: InputType;
  value?: string;
  placeholder?: string;
  /** Default: md */
  size?: InputSize;
  /**
   * `aria-label` when there is **no** visible Field label (e.g. chrome search).
   * Not a Field `label` — do not use this for form rows; wrap with Field instead.
   */
  ariaLabel?: string;
  /**
   * Space-separated element ids described by this control
   * (hint / error message). Maps to `aria-describedby`.
   */
  describedBy?: string;
  disabled?: boolean;
  /** Fails validation — sets the invalid recipe and `aria-invalid`. Pair with error text via Field. */
  invalid?: boolean;
  /** Composes the search recipe (leading icon slot). */
  search?: boolean;
}

export type InputClassNameProps = Pick<InputProps, 'size' | 'invalid' | 'search'>;

export const inputClassNames = (props: InputClassNameProps = {}): string => {
  const size = props.size ?? 'md';
  return [
    'eevenkoto-input',
    `eevenkoto-input--${size}`,
    props.search ? 'eevenkoto-input--search' : '',
    props.invalid ? 'eevenkoto-input--invalid' : '',
  ]
    .filter(Boolean)
    .join(' ');
};

export const inputFieldClassNames = (): string => 'eevenkoto-input__field';
