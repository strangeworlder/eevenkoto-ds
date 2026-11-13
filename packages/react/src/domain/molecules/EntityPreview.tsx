import { entityPreviewClassNames, type EntityPreviewProps } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { Badge } from '../../core/atoms/Badge';
import { LinkButton } from '../../core/atoms/LinkButton';

export type { EntityPreviewProps };

export type EntityPreviewComponentProps = Omit<HTMLAttributes<HTMLElement>, 'title' | 'children'> &
  EntityPreviewProps & {
    /** Extra body content (e.g. a Statblock). */
    children?: ReactNode;
  };

export const EntityPreview = ({
  title,
  titleLevel,
  body,
  bodyHtml,
  flush,
  kind,
  badge,
  truncatedLabel,
  footerLink,
  className,
  children,
  ...rest
}: EntityPreviewComponentProps): ReactElement => {
  const Title = (titleLevel === 3 ? 'h3' : 'h2') as 'h2' | 'h3';
  const classes = [entityPreviewClassNames({ flush }), className].filter(Boolean).join(' ');
  const hasChildren = children !== undefined && children !== null && children !== false;
  const hasBody = Boolean(badge || bodyHtml || body || hasChildren || truncatedLabel);

  return (
    <div className={classes} data-entity-kind={kind} {...rest}>
      {title ? (
        <header>
          <Title>{title}</Title>
        </header>
      ) : null}
      {hasBody ? (
        <div className="eevenkoto-tooltip-card__body eevenkoto-prose" tabIndex={0}>
          {badge ? (
            <div className="eevenkoto-entity-preview__meta">
              <Badge {...badge} />
            </div>
          ) : null}
          {bodyHtml !== undefined ? (
            <div className="eevenkoto-entity-preview__html" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
          ) : body ? (
            <p>{body}</p>
          ) : null}
          {children}
          {truncatedLabel ? (
            <p className="eevenkoto-entity-preview__truncated">{truncatedLabel}</p>
          ) : null}
        </div>
      ) : null}
      {footerLink ? (
        <footer>
          <LinkButton {...footerLink} />
        </footer>
      ) : null}
    </div>
  );
};