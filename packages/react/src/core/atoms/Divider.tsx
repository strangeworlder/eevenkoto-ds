import { dividerClassNames, type DividerProps } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement } from 'react';

export type { DividerProps };

export type DividerComponentProps = Omit<HTMLAttributes<HTMLHRElement>, 'children'> & DividerProps;

export const Divider = ({
  spacing,
  variant,
  className,
  ...rest
}: DividerComponentProps): ReactElement => {
  const classes = [dividerClassNames({ spacing, variant }), className].filter(Boolean).join(' ');
  return <hr className={classes} {...rest} />;
};
