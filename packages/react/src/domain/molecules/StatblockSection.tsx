import {
  headingClassNames,
  statblockSectionClassNames,
  type StatblockFeatureProps,
  type StatblockSectionProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { StatblockFeature } from './StatblockFeature';

export type StatblockSectionFeatureNode = {
  name: string;
  description: ReactNode;
};

export type StatblockSectionComponentProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  title: string;
  features: StatblockSectionFeatureNode[] | StatblockFeatureProps[];
};

export type { StatblockSectionProps };

export const StatblockSection = ({
  title,
  features,
  className,
  ...rest
}: StatblockSectionComponentProps): ReactElement => {
  const classes = [statblockSectionClassNames(), className].filter(Boolean).join(' ');
  return (
    <section className={classes} {...rest}>
      <h2 className={headingClassNames({ level: 2 })}>{title}</h2>
      {features.map((feature) => (
        <StatblockFeature
          key={feature.name}
          name={feature.name}
          description={feature.description}
        />
      ))}
    </section>
  );
};
