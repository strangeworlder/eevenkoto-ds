import { iconClassNames, iconPaths, type IconName, type IconProps } from '@eevenkoto/core';
import type { ReactElement, SVGAttributes } from 'react';

export type { IconProps, IconName };

export type IconComponentProps = Omit<SVGAttributes<SVGSVGElement>, 'children'> & IconProps;

export const Icon = ({
  name,
  size,
  label,
  className,
  ...rest
}: IconComponentProps): ReactElement => {
  const classes = [iconClassNames({ size }), className].filter(Boolean).join(' ');

  return (
    <svg
      className={classes}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      focusable="false"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...rest}
    >
      <path d={iconPaths[name]} />
    </svg>
  );
};
