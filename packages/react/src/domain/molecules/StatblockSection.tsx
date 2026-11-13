import {
  headingClassNames,
  statblockSectionClassNames,
  type StatblockFeatureLevel,
  type StatblockFeatureProps,
  type StatblockSectionProps,
  type StatblockSectionTitleLevel,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { StatblockFeature } from './StatblockFeature';

export type StatblockSectionFeatureNode = {
  name: string;
  description?: ReactNode;
  descriptionHtml?: string;
  level?: StatblockFeatureLevel;
};

export type StatblockSectionComponentProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  title: string;
  titleLevel?: StatblockSectionTitleLevel;
  bodyHtml?: string;
  features?: StatblockSectionFeatureNode[] | StatblockFeatureProps[];
  children?: ReactNode;
};

export type { StatblockSectionProps, StatblockSectionTitleLevel };

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
  const tagLevel: StatblockSectionTitleLevel =
    titleLevel === 4 ? 4 : titleLevel === 3 ? 3 : 2;
  const TitleTag = tagLevel === 4 ? 'h4' : tagLevel === 3 ? 'h3' : 'h2';
  const defaultFeatureLevel = (tagLevel + 1) as StatblockFeatureLevel;

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
          level={feature.level ?? defaultFeatureLevel}
        />
      ))}
      {children}
    </section>
  );
};
