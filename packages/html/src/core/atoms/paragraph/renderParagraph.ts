import { paragraphClassNames, type ParagraphProps } from '@eevenkoto/core';
import template from './Paragraph.html';

export type { ParagraphProps };

export const renderParagraph = (args: ParagraphProps): string => {
  const className = paragraphClassNames(args);
  return template.replace('{{className}}', className).replace('{{text}}', args.text);
};
