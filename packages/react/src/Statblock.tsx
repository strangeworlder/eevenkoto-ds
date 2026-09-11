import {
  headingClassNames,
  paragraphClassNames,
  captionClassNames,
  statblockClassNames,
  type PropertyItem,
  type AbilityScoreProps,
  type StatblockSectionProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { AbilityScoreGroup } from './AbilityScoreGroup';
import { PropertyList } from './PropertyList';
import { StatblockSection } from './StatblockSection';

export type StatblockFeatureNode = {
  name: string;
  description: ReactNode;
};

export type StatblockSectionNode = {
  title: string;
  features: StatblockFeatureNode[];
};

export type StatblockComponentProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  name: string;
  flavor?: string;
  typeLine?: string;
  vitals: PropertyItem[];
  abilities: AbilityScoreProps[];
  traits: PropertyItem[];
  sections?: StatblockSectionNode[] | StatblockSectionProps[];
};

export const Statblock = ({
  name,
  flavor,
  typeLine,
  vitals,
  abilities,
  traits,
  sections,
  className,
  ...rest
}: StatblockComponentProps): ReactElement => {
  const classes = [statblockClassNames(), className].filter(Boolean).join(' ');

  return (
    <article className={classes} {...rest}>
      <h1 className={headingClassNames({ level: 1 })}>{name}</h1>
      {flavor ? <p className={paragraphClassNames({ size: 'md' })}>{flavor}</p> : null}
      {typeLine ? (
        <p className={`${captionClassNames()} eevenkoto-statblock__type`}>{typeLine}</p>
      ) : null}
      <AbilityScoreGroup
        abilities={abilities}
        header={<PropertyList items={vitals} />}
        footer={<PropertyList items={traits} />}
      />
      {sections?.map((section) => (
        <StatblockSection
          key={section.title}
          title={section.title}
          features={section.features}
        />
      ))}
    </article>
  );
};
