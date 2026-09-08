import { headingClassNames, type HeadingProps } from '@eevenkoto/core';
import template from './Heading.html';

/** @deprecated Prefer HeadingProps from @eevenkoto/core */
export type HeadingArgs = HeadingProps;
export type { HeadingProps };

export const renderHeading = (args: HeadingProps): string => {
  const className = headingClassNames(args);
  return template
    .replaceAll('{{level}}', String(args.level))
    .replace('{{className}}', className)
    .replace('{{text}}', args.text);
};
