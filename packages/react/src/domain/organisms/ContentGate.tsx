import { contentGateClassNames, headingClassNames, type ContentGateProps } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { Badge } from '../../core/atoms/Badge';
import { Icon } from '../../core/atoms/Icon';

export type { ContentGateProps };

export type ContentGateComponentProps = Omit<HTMLAttributes<HTMLElement>, 'title' | 'children'> &
  ContentGateProps & {
    /** Custom description content. Takes precedence over `descriptionHtml` and `description`. */
    children?: ReactNode;
    /** Action buttons / links. */
    actions?: ReactNode;
    /** Developer-only footer (e.g. tier switcher). */
    footer?: ReactNode;
  };

export const ContentGate = ({
  id,
  readinessLabel,
  readinessIntent,
  lockLabel,
  title,
  titleLevel = 2,
  description,
  descriptionHtml,
  currentTierLabel,
  currentTierPrefix,
  requiredTierLabel,
  requiredTierPrefix,
  statusMessage,
  actions,
  footer,
  className,
  children,
  ...rest
}: ContentGateComponentProps): ReactElement => {
  const classes = [contentGateClassNames(), className].filter(Boolean).join(' ');
  const Title = `h${titleLevel}` as 'h1' | 'h2' | 'h3';
  const hasChildren = children !== undefined && children !== null && children !== false;
  const descClass = 'eevenkoto-content-gate__description eevenkoto-prose';

  return (
    <section id={id} className={classes} {...rest}>
      <div className="eevenkoto-content-gate__status-row">
        <Badge label={readinessLabel} intent={readinessIntent} dot shape="pill" />
        <span className="eevenkoto-content-gate__lock">
          <Icon name="lock" size="md" label={lockLabel} />
        </span>
      </div>
      <Title className={`${headingClassNames({ level: titleLevel })} eevenkoto-content-gate__title`}>
        {title}
      </Title>
      {hasChildren ? (
        <div className={descClass}>{children}</div>
      ) : descriptionHtml !== undefined ? (
        <div className={descClass} dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
      ) : description ? (
        <div className={descClass}>
          <p>{description}</p>
        </div>
      ) : null}
      <p className="eevenkoto-content-gate__comparison">
        <span>
          {currentTierPrefix ? `${currentTierPrefix} ` : null}
          <strong>{currentTierLabel}</strong>
        </span>
        <span>
          {requiredTierPrefix ? `${requiredTierPrefix} ` : null}
          <strong>{requiredTierLabel}</strong>
        </span>
      </p>
      {actions ? <div className="eevenkoto-content-gate__actions">{actions}</div> : null}
      <p
        className="eevenkoto-content-gate__feedback"
        role="status"
        aria-live="polite"
        hidden={!statusMessage}
      >
        {statusMessage}
      </p>
      {footer ? <footer className="eevenkoto-content-gate__footer">{footer}</footer> : null}
    </section>
  );
};