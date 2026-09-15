import {
  inlineRefClassNames,
  inlineRefLabelClassNames,
  type InlineRefProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement } from 'react';

export type { InlineRefProps };

export type InlineRefComponentProps = Omit<HTMLAttributes<HTMLElement>, 'children'> &
  InlineRefProps;

export const InlineRef = ({
  name,
  href,
  className,
  ...rest
}: InlineRefComponentProps): ReactElement => {
  const classes = [inlineRefClassNames(), className].filter(Boolean).join(' ');
  const label = <span className={inlineRefLabelClassNames()}>{name}</span>;

  if (href) {
    return (
      <a className={classes} href={href} {...rest}>
        {label}
      </a>
    );
  }

  return (
    <span className={classes} {...rest}>
      {label}
    </span>
  );
};
