import {
  swatchButtonChevronClassNames,
  swatchButtonClassNames,
  swatchButtonContentClassNames,
  swatchButtonHintClassNames,
  swatchButtonLabelClassNames,
  swatchButtonRoleClassNames,
  type SwatchButtonProps,
} from '@eevenkoto/core';
import type { ButtonHTMLAttributes, CSSProperties, ReactElement } from 'react';
import { Icon } from '../atoms/Icon';

export type { SwatchButtonProps };

export type SwatchButtonComponentProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'color'
> &
  SwatchButtonProps;

export const SwatchButton = ({
  id,
  color,
  roleLabel,
  label,
  hint,
  expanded,
  active,
  disabled,
  controls,
  className,
  style,
  ...rest
}: SwatchButtonComponentProps): ReactElement => {
  const classes = [swatchButtonClassNames({ active, expanded }), className]
    .filter(Boolean)
    .join(' ');
  const mergedStyle = {
    '--eevenkoto-swatch-button-color': color,
    ...style,
  } as CSSProperties;

  return (
    <button
      id={id}
      type="button"
      className={classes}
      style={mergedStyle}
      aria-expanded={expanded !== undefined ? expanded : undefined}
      aria-controls={controls}
      disabled={disabled}
      {...rest}
    >
      <span className={swatchButtonContentClassNames()}>
        {roleLabel ? <span className={swatchButtonRoleClassNames()}>{roleLabel}</span> : null}
        <span className={swatchButtonLabelClassNames()}>{label}</span>
        {hint ? <span className={swatchButtonHintClassNames()}>{hint}</span> : null}
      </span>
      <Icon name="chevron-down" size="sm" className={swatchButtonChevronClassNames()} />
    </button>
  );
};
