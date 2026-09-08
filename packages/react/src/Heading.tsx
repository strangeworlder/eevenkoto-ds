import { headingClassNames, type HeadingLevel, type HeadingProps } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement } from 'react';

export type { HeadingProps, HeadingLevel };

export type HeadingComponentProps = Omit<HTMLAttributes<HTMLHeadingElement>, 'children'> &
  HeadingProps;

const headingTags = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
} as const;

export const Heading = ({
  level,
  text,
  tone,
  runIn,
  className,
  ...rest
}: HeadingComponentProps): ReactElement => {
  const Tag = headingTags[level];
  const classes = [headingClassNames({ level, tone, runIn }), className].filter(Boolean).join(' ');
  return (
    <Tag className={classes} {...rest}>
      {text}
    </Tag>
  );
};
