import { captionClassNames, type CaptionProps } from '@eevenkoto/core';
import template from './Caption.html';

/** @deprecated Prefer CaptionProps from @eevenkoto/core */
export type CaptionArgs = CaptionProps;
export type { CaptionProps };

export const renderCaption = (args: CaptionProps): string => {
  const className = captionClassNames(args);
  return template.replace('{{className}}', className).replace('{{text}}', args.text);
};
