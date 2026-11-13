import {
  captionClassNames,
  type CaptionProps,
  type CaptionTone,
  type CaptionVariant,
} from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import template from './Caption.html';

export type { CaptionProps, CaptionTone, CaptionVariant };

export const renderCaption = (args: CaptionProps): string => {
  const className = captionClassNames(args);
  return template.replace('{{className}}', className).replace('{{text}}', escapeHtml(args.text));
};
