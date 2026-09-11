import {
  headingClassNames,
  paragraphClassNames,
  statblockFeatureClassNames,
  type StatblockFeatureProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';

export type StatblockFeatureComponentProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  name: string;
  description: ReactNode;
};

export type { StatblockFeatureProps };

export const StatblockFeature = ({
  name,
  description,
  className,
  ...rest
}: StatblockFeatureComponentProps): ReactElement => {
  const classes = [statblockFeatureClassNames(), className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      <h3 className={headingClassNames({ level: 3, runIn: true })}>{name}</h3>
      <p className={paragraphClassNames({ size: 'md' })}>{description}</p>
    </div>
  );
};
