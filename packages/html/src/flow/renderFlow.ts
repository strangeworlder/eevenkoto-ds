import { flowClassNames, type FlowDensity, type FlowProps } from '@eevenkoto/core';
import template from './Flow.html';

export type { FlowDensity };

/** HTML renderer args: Flow props plus string content (slots are framework-only). */
export interface FlowArgs extends FlowProps {
  content: string;
}

export const renderFlow = (args: FlowArgs): string => {
  const className = flowClassNames(args);
  return template.replace('{{className}}', className).replace('{{content}}', args.content);
};
