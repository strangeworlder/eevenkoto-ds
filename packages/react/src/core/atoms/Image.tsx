import { imageClassNames, type ImageProps } from '@eevenkoto/core';
import type { CSSProperties, HTMLAttributes, ReactElement, ReactNode } from 'react';

export type { ImageProps };

export type ImageComponentProps = Omit<HTMLAttributes<HTMLElement>, 'children'> &
  ImageProps & {
    caption?: ReactNode;
  };

export const Image = ({
  src,
  alt,
  caption,
  layout,
  framed,
  width,
  height,
  aspectRatio,
  fit,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  srcSet,
  sizes,
  className,
  style,
  ...rest
}: ImageComponentProps): ReactElement => {
  const classes = [imageClassNames({ layout, framed }), className].filter(Boolean).join(' ');

  const customStyle: CSSProperties = {
    ...style,
    ...(aspectRatio ? ({ '--eevenkoto-image-aspect-ratio': aspectRatio } as CSSProperties) : {}),
    ...(fit ? ({ '--eevenkoto-image-object-fit': fit } as CSSProperties) : {}),
  };

  return (
    <figure className={classes} style={customStyle} {...rest}>
      <img
        className="eevenkoto-image__media"
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        srcSet={srcSet}
        sizes={sizes}
      />
      {caption != null && (
        <figcaption className="eevenkoto-image__caption eevenkoto-caption">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
