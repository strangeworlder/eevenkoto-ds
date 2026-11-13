import {
  fieldClassNames,
  fieldControlClassNames,
  fieldControlGroupClassNames,
  fieldLabelClassNames,
  fieldMessageClassNames,
  resolveFieldMessageId,
  type FieldOrientation,
  type FieldProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';

export type { FieldOrientation, FieldProps };

export type FieldComponentProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  FieldProps & {
    /** The control (typically `<Input id={htmlFor} … />`). */
    children: ReactNode;
    /** Optional inline trailing action (typically `<Button … />`). */
    action?: ReactNode;
    className?: string;
  };

export const Field = ({
  label,
  htmlFor,
  orientation,
  hint,
  error,
  messageId,
  action,
  children,
  className,
  ...rest
}: FieldComponentProps): ReactElement => {
  const classes = [fieldClassNames({ orientation }), className].filter(Boolean).join(' ');
  const resolvedMessageId = resolveFieldMessageId({ htmlFor, messageId });
  const hasError = Boolean(error);
  const messageText = hasError ? error : hint;
  const hasAction = action !== undefined && action !== null && action !== false;

  return (
    <div className={classes} {...rest}>
      <label className={fieldLabelClassNames()} htmlFor={htmlFor}>
        {label}
      </label>
      <div className={fieldControlClassNames()}>
        {hasAction ? (
          <div className={fieldControlGroupClassNames()}>
            {children}
            {action}
          </div>
        ) : (
          children
        )}
      </div>
      {messageText && resolvedMessageId ? (
        <p className={fieldMessageClassNames(hasError)} id={resolvedMessageId}>
          {messageText}
        </p>
      ) : null}
    </div>
  );
};
