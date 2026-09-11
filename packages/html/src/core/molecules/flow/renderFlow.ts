import { flowClassNames, type FlowDensity, type FlowProps as FlowCoreProps } from '@eevenkoto/core';
import template from './Flow.html';

export type { FlowDensity };

/** HTML renderer props: Flow props plus string content (slots are framework-only). */
export interface FlowProps extends FlowCoreProps {
  content: string;
}

export const renderFlow = (args: FlowProps): string => {
  const className = flowClassNames(args);
  return template.replace('{{className}}', className).replace('{{content}}', args.content);
};
