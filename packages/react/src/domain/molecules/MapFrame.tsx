import { mapFrameClassNames, type MapFrameProps } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';

export type { MapFrameProps };

export type MapFrameComponentProps = Omit<HTMLAttributes<HTMLElement>, 'title' | 'children'> &
  MapFrameProps & {
    /** Inline SVG / media node. Takes precedence over `svgHtml` and `src`. */
    children?: ReactNode;
  };

export const MapFrame = ({
  id,
  title,
  scale,
  svgHtml,
  src,
  alt,
  caption,
  captionHtml,
  className,
  children,
  ...rest
}: MapFrameComponentProps): ReactElement => {
  const classes = [mapFrameClassNames(), className].filter(Boolean).join(' ');
  const hasChildren = children !== undefined && children !== null && children !== false;
  const hasCaption = captionHtml !== undefined ? Boolean(captionHtml) : Boolean(caption);

  return (
    <figure id={id} className={classes} {...rest}>
      {title || scale ? (
        <div className="eevenkoto-map-frame__header">
          {title ? <span className="eevenkoto-map-frame__title">{title}</span> : null}
          {scale ? <span className="eevenkoto-map-frame__scale">{scale}</span> : null}
        </div>
      ) : null}
      {hasChildren ? (
        <div className="eevenkoto-map-frame__viewport">{children}</div>
      ) : svgHtml !== undefined ? (
        <div className="eevenkoto-map-frame__viewport" dangerouslySetInnerHTML={{ __html: svgHtml }} />
      ) : (
        <div className="eevenkoto-map-frame__viewport">
          {src ? <img src={src} alt={alt ?? ''} /> : null}
        </div>
      )}
      {hasCaption ? (
        captionHtml !== undefined ? (
          <figcaption
            className="eevenkoto-map-frame__caption"
            dangerouslySetInnerHTML={{ __html: captionHtml }}
          />
        ) : (
          <figcaption className="eevenkoto-map-frame__caption">{caption}</figcaption>
        )
      ) : null}
    </figure>
  );
};