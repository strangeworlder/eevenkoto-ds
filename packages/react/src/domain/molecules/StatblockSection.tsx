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
  description?: ReactNode;
  descriptionHtml?: string;
  level?: 2 | 3 | 6;
};

export type StatblockSectionComponentProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  title: string;
  titleLevel?: 2 | 3;
  bodyHtml?: string;
  features?: StatblockSectionFeatureNode[] | StatblockFeatureProps[];
  children?: ReactNode;
};

export type { StatblockSectionProps };

export const StatblockSection = ({
  title,
  titleLevel = 2,
  bodyHtml,
  features,
  children,
  className,
  ...rest
}: StatblockSectionComponentProps): ReactElement => {
  const classes = [statblockSectionClassNames(), className].filter(Boolean).join(' ');
  const TitleTag = titleLevel === 3 ? 'h3' : 'h2';
  return (
    <section className={classes} {...rest}>
      <TitleTag className={headingClassNames({ level: 2 })}>{title}</TitleTag>
      {bodyHtml ? <div dangerouslySetInnerHTML={{ __html: bodyHtml }} /> : null}
      {features?.map((feature) => (
        <StatblockFeature
          key={feature.name}
          name={feature.name}
          description={feature.description}
          descriptionHtml={feature.descriptionHtml}
          level={feature.level}
        />
      ))}
      {children}
    </section>
  );
};
