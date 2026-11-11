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
import type { PropertyItemNode } from '../../core/atoms/Property';
import { PropertyList } from '../../core/molecules/PropertyList';
import { StatblockSection } from '../molecules/StatblockSection';

export type StatblockFeatureNode = {
  name: string;
  description?: ReactNode;
  descriptionHtml?: string;
};

export type StatblockSectionNode = {
  title: string;
  titleLevel?: 2 | 3;
  bodyHtml?: string;
  features?: StatblockFeatureNode[];
};

export type StatblockComponentProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  name: string;
  nameLevel?: StatblockNameLevel;
  flavor?: string;
  flavorHtml?: string;
  typeLine?: string;
  typeLineHtml?: string;
  vitals: PropertyItemNode[] | PropertyItem[];
  abilities: AbilityScoreProps[];
  details: PropertyItemNode[] | PropertyItem[];
  sections?: StatblockSectionNode[] | StatblockSectionProps[];
  bodyHtml?: string;
};

export const Statblock = ({
  name,
  nameLevel = 1,
  flavor,
  flavorHtml,
  typeLine,
  typeLineHtml,
  vitals,
  abilities,
  details,
  sections,
  bodyHtml,
  className,
  ...rest
}: StatblockComponentProps): ReactElement => {
  const classes = [statblockClassNames(), className].filter(Boolean).join(' ');
  const level: StatblockNameLevel = nameLevel === 2 ? 2 : 1;
  const NameTag = level === 2 ? 'h2' : 'h1';

  return (
    <article className={classes} {...rest}>
      <NameTag className={headingClassNames({ level })}>{name}</NameTag>
      {flavorHtml ? (
        <p
          className={paragraphClassNames({ size: 'md' })}
          dangerouslySetInnerHTML={{ __html: flavorHtml }}
        />
      ) : flavor ? (
        <p className={paragraphClassNames({ size: 'md' })}>{flavor}</p>
      ) : null}
      {typeLineHtml ? (
        <p
          className={`${captionClassNames()} eevenkoto-statblock__type`}
          dangerouslySetInnerHTML={{ __html: typeLineHtml }}
        />
      ) : typeLine ? (
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
          titleLevel={section.titleLevel}
          bodyHtml={section.bodyHtml}
          features={section.features}
        />
      ))}
      {bodyHtml ? <div dangerouslySetInnerHTML={{ __html: bodyHtml }} /> : null}
    </article>
  );
};
