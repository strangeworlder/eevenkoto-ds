import { captionClassNames, type CaptionProps } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement } from 'react';

export type { CaptionProps };

export type CaptionComponentProps = Omit<HTMLAttributes<HTMLParagraphElement>, 'children'> &
  CaptionProps;

export const Caption = ({
  text,
  tone,
  className,
  ...rest
}: CaptionComponentProps): ReactElement => {
  const classes = [captionClassNames({ tone }), className].filter(Boolean).join(' ');
  return (
    <p className={classes} {...rest}>
      {text}
    </p>
  );
};
