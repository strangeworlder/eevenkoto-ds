import { captionClassNames, type CaptionProps } from '@eevenkoto/core';
import template from './Caption.html';

export type { CaptionProps };

export const renderCaption = (args: CaptionProps): string => {
  const className = captionClassNames(args);
  return template.replace('{{className}}', className).replace('{{text}}', args.text);
};
