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
  description?: ReactNode;
  descriptionHtml?: string;
};

export type SpellblockComponentProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  name: string;
  nameLevel?: SpellblockNameLevel;
  typeLine?: string;
  typeLineHtml?: string;
  classes?: PropertyItemNode[] | PropertyItem[];
  properties: PropertyItemNode[] | PropertyItem[];
  paragraphs?: ReactNode[];
  paragraphsHtml?: string[];
  bodyHtml?: string;
  features?: SpellblockFeatureNode[] | StatblockFeatureProps[];
  deck?: boolean;
};

export const Spellblock = ({
  name,
  nameLevel = 1,
  typeLine,
  typeLineHtml,
  classes,
  properties,
  paragraphs,
  paragraphsHtml,
  bodyHtml,
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
  const hasBody = Boolean(paragraphsHtml?.length || paragraphs?.length || bodyHtml);

  return (
    <article className={hostClasses} {...rest}>
      <div className="eevenkoto-spellblock__plate">
        <NameTag className={headingClassNames({ level })}>{name}</NameTag>
        {typeLineHtml ? (
          <p
            className={`${captionClassNames()} eevenkoto-spellblock__type`}
            dangerouslySetInnerHTML={{ __html: typeLineHtml }}
          />
        ) : typeLine ? (
          <p className={`${captionClassNames()} eevenkoto-spellblock__type`}>{typeLine}</p>
        ) : null}
        {classes?.length ? <PropertyList items={classes} /> : null}
      </div>
      {properties.length ? (
        <div className="eevenkoto-spellblock__stats">
          <PropertyList items={properties} />
        </div>
      ) : null}
      {hasBody ? (
        <div className="eevenkoto-spellblock__body">
          {paragraphsHtml?.length
            ? paragraphsHtml.map((html, index) => (
                <p
                  key={index}
                  className={paragraphClassNames({ size: 'md' })}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ))
            : paragraphs?.map((text, index) => (
                <p key={index} className={paragraphClassNames({ size: 'md' })}>
                  {text}
                </p>
              ))}
          {bodyHtml ? <div dangerouslySetInnerHTML={{ __html: bodyHtml }} /> : null}
        </div>
      ) : null}
      {features?.length ? (
        <div className="eevenkoto-spellblock__footer">
          {features.map((feature) => (
            <StatblockFeature
              key={feature.name}
              name={feature.name}
              description={feature.description}
              descriptionHtml={feature.descriptionHtml}
              level={featureLevel}
            />
          ))}
        </div>
      ) : null}
    </article>
  );
};
