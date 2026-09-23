import {
  entityRefClassNames,
  inlineRefLabelClassNames,
  inlineRefLockClassNames,
  inlineRefLockIconClassNames,
  type EntityRefKind,
  type EntityRefProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement } from 'react';
import { Icon } from '../../core/atoms/Icon';

export type { EntityRefProps, EntityRefKind };

export type EntityRefComponentProps = Omit<HTMLAttributes<HTMLElement>, 'children'> &
  EntityRefProps;

const LockMark = ({ label }: { label: string }): ReactElement => (
  <span className={inlineRefLockClassNames()}>
    <Icon name="lock" className={inlineRefLockIconClassNames()} />
    <span className="eevenkoto-visually-hidden">{label}</span>
  </span>
);

export const EntityRef = ({
  kind,
  name,
  href,
  unlinked,
  locked,
  lockedLabel = 'Locked',
  className,
  ...rest
}: EntityRefComponentProps): ReactElement => {
  const classes = [entityRefClassNames({ kind, unlinked, locked }), className]
    .filter(Boolean)
    .join(' ');
  const inner = (
    <>
      <span className={inlineRefLabelClassNames()}>{name}</span>
      {locked ? <LockMark label={lockedLabel} /> : null}
    </>
  );

  if (!unlinked && href) {
    return (
      <a className={classes} href={href} {...rest}>
        {inner}
      </a>
    );
  }

  return (
    <span className={classes} {...rest}>
      {inner}
    </span>
  );
};
