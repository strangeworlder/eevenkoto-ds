import {
  headingClassNames,
  paragraphClassNames,
  captionClassNames,
  spellblockClassNames,
  type PropertyItem,
  type SpellblockNameLevel,
  type StatblockFeatureLevel,
  type StatblockFeatureProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { PropertyList } from '../../core/molecules/PropertyList';
import type { PropertyItemNode } from '../../core/atoms/Property';
import { StatblockFeature } from '../molecules/StatblockFeature';

export type SpellblockFeatureNode = {
  name: string;
  description: ReactNode;
};

export type SpellblockComponentProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  name: string;
  nameLevel?: SpellblockNameLevel;
  typeLine?: string;
  classes?: PropertyItemNode[] | PropertyItem[];
  properties: PropertyItemNode[] | PropertyItem[];
  paragraphs?: ReactNode[];
  features?: SpellblockFeatureNode[] | StatblockFeatureProps[];
  deck?: boolean;
};

export const Spellblock = ({
  name,
  nameLevel = 1,
  typeLine,
  classes,
  properties,
  paragraphs,
  features,
  deck,
  className,
  ...rest
}: SpellblockComponentProps): ReactElement => {
  const hostClasses = [spellblockClassNames({ deck }), className].filter(Boolean).join(' ');
  const level: SpellblockNameLevel = nameLevel === 2 ? 2 : 1;
  const NameTag = level === 2 ? 'h2' : 'h1';
  // Spells have no section H2, so scaling runs in one level below the name.
  const featureLevel: StatblockFeatureLevel = level === 2 ? 3 : 2;

  return (
    <article className={hostClasses} {...rest}>
      <div className="eevenkoto-spellblock__plate">
        <NameTag className={headingClassNames({ level })}>{name}</NameTag>
        {typeLine ? (
          <p className={`${captionClassNames()} eevenkoto-spellblock__type`}>{typeLine}</p>
        ) : null}
        {classes?.length ? <PropertyList items={classes} /> : null}
      </div>
      {properties.length ? (
        <div className="eevenkoto-spellblock__stats">
          <PropertyList items={properties} />
        </div>
      ) : null}
      {paragraphs?.length ? (
        <div className="eevenkoto-spellblock__body">
          {paragraphs.map((text, index) => (
            <p key={index} className={paragraphClassNames({ size: 'md' })}>
              {text}
            </p>
          ))}
        </div>
      ) : null}
      {features?.length ? (
        <div className="eevenkoto-spellblock__footer">
          {features.map((feature) => (
            <StatblockFeature
              key={feature.name}
              name={feature.name}
              description={feature.description}
              level={featureLevel}
            />
          ))}
        </div>
      ) : null}
    </article>
  );
};
