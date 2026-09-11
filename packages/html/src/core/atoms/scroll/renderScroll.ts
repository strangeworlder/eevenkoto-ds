import { scrollClassNames, type ScrollProps as ScrollCoreProps } from '@eevenkoto/core';
import template from './Scroll.html';

/** HTML renderer props: Scroll props plus string content (slots are framework-only). */
export interface ScrollProps extends ScrollCoreProps {
  content: string;
}

export const renderScroll = (args: ScrollProps): string => {
  const className = scrollClassNames(args);
  return template.replace('{{className}}', className).replace('{{content}}', args.content);
};
