import {
  headingClassNames,
  paragraphClassNames,
  captionClassNames,
  statblockClassNames,
  type PropertyItem,
  type AbilityScoreProps,
  type StatblockFeatureLevel,
  type StatblockNameLevel,
  type StatblockSectionProps,
  type StatblockSectionTitleLevel,
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
  level?: StatblockFeatureLevel;
};

export type StatblockSectionNode = {
  title: string;
  titleLevel?: StatblockSectionTitleLevel;
  bodyHtml?: string;
  features?: StatblockFeatureNode[];
};

export type StatblockComponentProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  headingId?: string;
  name: string;
  nameHtml?: string;
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
  id,
  headingId,
  name,
  nameHtml,
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
  const level: StatblockNameLevel =
    nameLevel === 3 ? 3 : nameLevel === 2 ? 2 : 1;
  const NameTag = level === 3 ? 'h3' : level === 2 ? 'h2' : 'h1';
  const defaultSectionTitleLevel = (level + 1) as StatblockSectionTitleLevel;

  return (
    <article id={id} className={classes} {...rest}>
      {nameHtml ? (
        <NameTag
          id={headingId}
          className={headingClassNames({ level })}
          dangerouslySetInnerHTML={{ __html: nameHtml }}
        />
      ) : (
        <NameTag id={headingId} className={headingClassNames({ level })}>
          {name}
        </NameTag>
      )}
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
          titleLevel={section.titleLevel ?? defaultSectionTitleLevel}
          bodyHtml={section.bodyHtml}
          features={section.features}
        />
      ))}
      {bodyHtml ? <div dangerouslySetInnerHTML={{ __html: bodyHtml }} /> : null}
    </article>
  );
};
