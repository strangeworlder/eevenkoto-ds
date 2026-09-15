import {
  entityRefClassNames,
  inlineRefLabelClassNames,
  type EntityRefKind,
  type EntityRefProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement } from 'react';

export type { EntityRefProps, EntityRefKind };

export type EntityRefComponentProps = Omit<HTMLAttributes<HTMLElement>, 'children'> &
  EntityRefProps;

export const EntityRef = ({
  kind,
  name,
  href,
  className,
  ...rest
}: EntityRefComponentProps): ReactElement => {
  const classes = [entityRefClassNames({ kind }), className].filter(Boolean).join(' ');
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
