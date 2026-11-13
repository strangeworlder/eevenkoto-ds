export type FieldOrientation = 'vertical' | 'horizontal';

export interface FieldProps {
  /** Visible label text (required for accessible forms). */
  label: string;
  /**
   * Control id for `<label for>`. When omitted, derived from `label` via slug
   * in HTML; React/Vue should pass an explicit `htmlFor` / `id`.
   */
  htmlFor?: string;
  /** Label/control axis. `'horizontal'` aligns label inline with control for toolbars. Default: `'vertical'`. */
  orientation?: FieldOrientation;
  /** Optional hint below the control (muted). Ignored when `error` is set. */
  hint?: string;
  /** Error text below the control. Implies invalid association for the control. */
  error?: string;
  /**
   * Id for the hint/error message element. Defaults to `${htmlFor}-message`
   * when htmlFor is known.
   */
  messageId?: string;
}

export type FieldClassNameProps = Pick<FieldProps, 'error' | 'hint' | 'orientation'>;

export const fieldClassNames = (props: Pick<FieldProps, 'orientation'> = {}): string =>
  props.orientation === 'horizontal'
    ? 'eevenkoto-field eevenkoto-field--horizontal'
    : 'eevenkoto-field';

export const fieldLabelClassNames = (): string => 'eevenkoto-field__label';

export const fieldControlClassNames = (): string => 'eevenkoto-field__control';

export const fieldControlGroupClassNames = (): string => 'eevenkoto-field__control-group';

export const fieldMessageClassNames = (error = false): string =>
  error
    ? 'eevenkoto-field__message eevenkoto-field__message--error'
    : 'eevenkoto-field__message';

/** Resolve message element id for aria-describedby. */
export const resolveFieldMessageId = (
  props: Pick<FieldProps, 'htmlFor' | 'messageId'>,
): string | undefined => {
  if (props.messageId) return props.messageId;
  if (props.htmlFor) return `${props.htmlFor}-message`;
  return undefined;
};
