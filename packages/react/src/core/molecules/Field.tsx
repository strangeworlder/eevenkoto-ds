import {
  fieldClassNames,
  fieldControlClassNames,
  fieldLabelClassNames,
  fieldMessageClassNames,
  resolveFieldMessageId,
  type FieldProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';

export type { FieldProps };

export type FieldComponentProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  FieldProps & {
    /** The control (typically `<Input id={htmlFor} … />`). */
    children: ReactNode;
    className?: string;
  };

export const Field = ({
  label,
  htmlFor,
  hint,
  error,
  messageId,
  children,
  className,
  ...rest
}: FieldComponentProps): ReactElement => {
  const classes = [fieldClassNames(), className].filter(Boolean).join(' ');
  const resolvedMessageId = resolveFieldMessageId({ htmlFor, messageId });
  const hasError = Boolean(error);
  const messageText = hasError ? error : hint;

  return (
    <div className={classes} {...rest}>
      <label className={fieldLabelClassNames()} htmlFor={htmlFor}>
        {label}
      </label>
      <div className={fieldControlClassNames()}>{children}</div>
      {messageText && resolvedMessageId ? (
        <p className={fieldMessageClassNames(hasError)} id={resolvedMessageId}>
          {messageText}
        </p>
      ) : null}
    </div>
  );
};
