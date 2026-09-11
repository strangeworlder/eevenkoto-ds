import {
  headingClassNames,
  paragraphClassNames,
  captionClassNames,
  statblockClassNames,
  type PropertyItem,
  type AbilityScoreProps,
  type StatblockNameLevel,
  type StatblockSectionProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { AbilityScoreGroup } from './AbilityScoreGroup';
import { PropertyList } from '../../core/molecules/PropertyList';
import { StatblockSection } from '../molecules/StatblockSection';

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
  nameLevel?: StatblockNameLevel;
  flavor?: string;
  typeLine?: string;
  vitals: PropertyItem[];
  abilities: AbilityScoreProps[];
  details: PropertyItem[];
  sections?: StatblockSectionNode[] | StatblockSectionProps[];
};

export const Statblock = ({
  name,
  nameLevel = 1,
  flavor,
  typeLine,
  vitals,
  abilities,
  details,
  sections,
  className,
  ...rest
}: StatblockComponentProps): ReactElement => {
  const classes = [statblockClassNames(), className].filter(Boolean).join(' ');
  const level: StatblockNameLevel = nameLevel === 2 ? 2 : 1;
  const NameTag = level === 2 ? 'h2' : 'h1';

  return (
    <article className={classes} {...rest}>
      <NameTag className={headingClassNames({ level })}>{name}</NameTag>
      {flavor ? <p className={paragraphClassNames({ size: 'md' })}>{flavor}</p> : null}
      {typeLine ? (
        <p className={`${captionClassNames()} eevenkoto-statblock__type`}>{typeLine}</p>
      ) : null}
      <AbilityScoreGroup
        abilities={abilities}
        header={<PropertyList items={vitals} />}
        footer={<PropertyList items={details} />}
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
