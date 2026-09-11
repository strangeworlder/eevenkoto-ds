import { proseClassNames } from '@eevenkoto/core';
import template from './Prose.html';

/** HTML renderer props: string content (slots are framework-only). */
export interface ProseProps {
  content: string;
}

export const renderProse = (args: ProseProps): string => {
  const className = proseClassNames();
  return template.replace('{{className}}', className).replace('{{content}}', args.content);
};
