import {
  inlineRefClassNames,
  inlineRefLabelClassNames,
  inlineRefLockClassNames,
  inlineRefLockIconClassNames,
  type InlineRefProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement } from 'react';
import { Icon } from './Icon';

export type { InlineRefProps };

export type InlineRefComponentProps = Omit<HTMLAttributes<HTMLElement>, 'children'> &
  InlineRefProps;

const LockMark = ({ label }: { label: string }): ReactElement => (
  <span className={inlineRefLockClassNames()}>
    <Icon name="lock" className={inlineRefLockIconClassNames()} />
    <span className="eevenkoto-visually-hidden">{label}</span>
  </span>
);

export const InlineRef = ({
  name,
  href,
  unlinked,
  locked,
  lockedLabel = 'Locked',
  className,
  ...rest
}: InlineRefComponentProps): ReactElement => {
  const classes = [inlineRefClassNames({ unlinked, locked }), className]
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
