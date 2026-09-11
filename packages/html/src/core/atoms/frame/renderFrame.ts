import { frameClassNames } from '@eevenkoto/core';
import template from './Frame.html';

export interface FrameProps {
  content: string;
}

export const renderFrame = (args: FrameProps): string =>
  template.replace('{{className}}', frameClassNames()).replace('{{content}}', args.content);
