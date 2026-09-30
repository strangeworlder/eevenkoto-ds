export type ImageLayout = 'block' | 'float-left' | 'float-right';
export type ImageFit = 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';

export interface ImageProps {
  /** Source URL of the image. */
  src: string;
  /** Accessible text describing the image. Provide an empty string ("") if purely decorative. */
  alt: string;
  /** Optional caption text displayed beneath the image. */
  caption?: string;
  /**
   * Layout presentation:
   * - `block`: full paragraph-wide block (default)
   * - `float-left`: spot art floated left with wrapping text
   * - `float-right`: spot art floated right with wrapping text
   */
  layout?: ImageLayout;
  /** When true, renders a bordered frame around the image matching Eevenkoto boundary tokens. */
  framed?: boolean;
  /** Intrinsic width in pixels or CSS units (prevents CLS). */
  width?: number | string;
  /** Intrinsic height in pixels or CSS units (prevents CLS). */
  height?: number | string;
  /** Aspect ratio string (e.g. '16/9', '4/3', '1/1'). */
  aspectRatio?: string;
  /** Image object-fit mode (default: 'cover'). */
  fit?: ImageFit;
  /** Loading strategy (default: 'lazy'). Use 'eager' for above-the-fold heroes. */
  loading?: 'lazy' | 'eager';
  /** Image decoding mode (default: 'async'). */
  decoding?: 'async' | 'sync' | 'auto';
  /** Priority hint for browser resource scheduling (default: 'auto'). */
  fetchPriority?: 'high' | 'low' | 'auto';
  /** Responsive image source set. */
  srcSet?: string;
  /** Responsive sizes condition string. */
  sizes?: string;
}

export type ImageClassNameProps = Pick<ImageProps, 'layout' | 'framed'>;

export const imageClassNames = (props: ImageClassNameProps = {}): string => {
  const classes = ['eevenkoto-image'];
  if (props.layout && props.layout !== 'block') {
    classes.push(`eevenkoto-image--${props.layout}`);
  }
  if (props.framed) {
    classes.push('eevenkoto-image--framed');
  }
  return classes.join(' ');
};
