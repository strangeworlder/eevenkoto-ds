import {
  abilityNameClassNames,
  abbreviateAbility,
  type AbilityNameProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement } from 'react';

export type { AbilityNameProps };

export type AbilityNameComponentProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> &
  AbilityNameProps & {
    children?: string;
  };

export const AbilityName = ({
  name,
  children,
  short,
  variant,
  className,
  ...rest
}: AbilityNameComponentProps): ReactElement => {
  const fullText = name || children || '';
  const shortText = short || (fullText ? abbreviateAbility(fullText) : '');
  const hostClasses = [abilityNameClassNames({ variant }), className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={hostClasses} aria-label={fullText} {...rest}>
      <span className="eevenkoto-ability-name__full">{fullText}</span>
      <span className="eevenkoto-ability-name__short" aria-hidden="true">
        {shortText}
      </span>
    </span>
  );
};
