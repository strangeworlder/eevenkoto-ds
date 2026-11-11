import {
  headingClassNames,
  paragraphClassNames,
  statblockFeatureClassNames,
  type StatblockFeatureLevel,
  type StatblockFeatureProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';

export type StatblockFeatureComponentProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  name: string;
  description?: ReactNode;
  descriptionHtml?: string;
  level?: StatblockFeatureLevel;
};

export type { StatblockFeatureProps, StatblockFeatureLevel };

export const StatblockFeature = ({
  name,
  description,
  descriptionHtml,
  level = 3,
  className,
  ...rest
}: StatblockFeatureComponentProps): ReactElement => {
  const classes = [statblockFeatureClassNames(), className].filter(Boolean).join(' ');
  const NameTag = `h${level}` as const;
  return (
    <div className={classes} {...rest}>
      <NameTag className={headingClassNames({ level, runIn: true })}>{name}</NameTag>
      {description === undefined && descriptionHtml !== undefined ? (
        <p
          className={paragraphClassNames({ size: 'md' })}
          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
        />
      ) : (
        <p className={paragraphClassNames({ size: 'md' })}>{description}</p>
      )}
    </div>
  );
};
