import { headingClassNames, type HeadingProps } from '@eevenkoto/core';
import template from './Heading.html';

export type { HeadingProps };

export const renderHeading = (args: HeadingProps): string => {
  const className = headingClassNames(args);
  return template
    .replaceAll('{{level}}', String(args.level))
    .replace('{{className}}', className)
    .replace('{{text}}', args.text);
};
