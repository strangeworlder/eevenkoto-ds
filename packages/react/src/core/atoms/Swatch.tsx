import { swatchClassNames, type SwatchProps } from '@eevenkoto/core';
import type { CSSProperties, HTMLAttributes, ReactElement } from 'react';

export type { SwatchProps };

export type SwatchComponentProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'color'> &
  SwatchProps;

export const Swatch = ({
  color,
  size,
  shape,
  label,
  className,
  style,
  ...rest
}: SwatchComponentProps): ReactElement => {
  const classes = [swatchClassNames({ size, shape }), className].filter(Boolean).join(' ');
  const mergedStyle = {
    '--eevenkoto-swatch-color': color,
    ...style,
  } as CSSProperties;

  return (
    <span
      className={classes}
      style={mergedStyle}
      role={label ? 'img' : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      {...rest}
    />
  );
};
