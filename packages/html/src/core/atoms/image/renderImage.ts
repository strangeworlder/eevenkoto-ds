import { imageClassNames, type ImageProps } from '@eevenkoto/core';
import { escapeHtml, sanitizeInlineHtml } from '../../../utils/html';
import template from './Image.html';

export type { ImageProps };

export const renderImage = (args: ImageProps): string => {
  const className = imageClassNames(args);
  const src = escapeHtml(args.src);
  const alt = escapeHtml(args.alt);

  const imgAttrsList: string[] = [];
  if (args.width !== undefined) imgAttrsList.push(`width="${escapeHtml(String(args.width))}"`);
  if (args.height !== undefined) imgAttrsList.push(`height="${escapeHtml(String(args.height))}"`);
  imgAttrsList.push(`loading="${args.loading ?? 'lazy'}"`);
  imgAttrsList.push(`decoding="${args.decoding ?? 'async'}"`);
  if (args.fetchPriority && args.fetchPriority !== 'auto') {
    imgAttrsList.push(`fetchpriority="${args.fetchPriority}"`);
  }
  if (args.srcSet) imgAttrsList.push(`srcset="${escapeHtml(args.srcSet)}"`);
  if (args.sizes) imgAttrsList.push(`sizes="${escapeHtml(args.sizes)}"`);

  const figureStyles: string[] = [];
  if (args.aspectRatio) {
    figureStyles.push(`--eevenkoto-image-aspect-ratio: ${args.aspectRatio}`);
  }
  if (args.fit) {
    figureStyles.push(`--eevenkoto-image-object-fit: ${args.fit}`);
  }

  const figureAttrs = figureStyles.length > 0 ? ` style="${figureStyles.join('; ')}"` : '';
  const imgAttrs = imgAttrsList.length > 0 ? ` ${imgAttrsList.join(' ')}` : '';
  const caption = args.caption
    ? `<figcaption class="eevenkoto-image__caption eevenkoto-caption">${sanitizeInlineHtml(args.caption)}</figcaption>`
    : '';

  return template
    .replace('{{className}}', className)
    .replace('{{figureAttrs}}', figureAttrs)
    .replace('{{src}}', src)
    .replace('{{alt}}', alt)
    .replace('{{imgAttrs}}', imgAttrs)
    .replace('{{caption}}', caption);
};
