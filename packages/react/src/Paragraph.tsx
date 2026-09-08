import { paragraphClassNames, type ParagraphProps } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement } from 'react';

export type { ParagraphProps };

export type ParagraphComponentProps = Omit<HTMLAttributes<HTMLParagraphElement>, 'children'> &
  ParagraphProps;

export const Paragraph = ({
  text,
  size,
  tone,
  className,
  ...rest
}: ParagraphComponentProps): ReactElement => {
  const classes = [paragraphClassNames({ size, tone }), className].filter(Boolean).join(' ');
  return (
    <p className={classes} {...rest}>
      {text}
    </p>
  );
};
