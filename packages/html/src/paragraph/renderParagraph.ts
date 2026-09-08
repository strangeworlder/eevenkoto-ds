import { paragraphClassNames, type ParagraphProps } from '@eevenkoto/core';
import template from './Paragraph.html';

/** @deprecated Prefer ParagraphProps from @eevenkoto/core */
export type ParagraphArgs = ParagraphProps;
export type { ParagraphProps };

export const renderParagraph = (args: ParagraphProps): string => {
  const className = paragraphClassNames(args);
  return template.replace('{{className}}', className).replace('{{text}}', args.text);
};
