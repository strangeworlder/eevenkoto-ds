import {
  cardClassNames,
  tierCardClassNames,
  type TierCardProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { Badge } from '../atoms/Badge';
import { LinkButton } from '../atoms/LinkButton';
import { List } from '../molecules/List';

export type { TierCardProps };

export type TierCardComponentProps = Omit<HTMLAttributes<HTMLElement>, 'children'> &
  TierCardProps & {
    /** Replaces the built-in CTA. */
    footer?: ReactNode;
  };

export const TierCard = ({
  id,
  name,
  nameLevel = 2,
  badge,
  price,
  period,
  description,
  descriptionHtml,
  features,
  featured,
  current,
  cta,
  footer,
  className,
  ...rest
}: TierCardComponentProps): ReactElement => {
  const classes = [
    cardClassNames({ elevated: true, accent: featured ? 'outline' : 'none', current }),
    tierCardClassNames({ featured, current }),
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const Name = `h${nameLevel}` as 'h2' | 'h3';
  const footerNode = footer ?? (cta ? <LinkButton {...cta} fullWidth /> : null);

  return (
    <article id={id} className={classes} {...rest}>
      <header className="eevenkoto-tier-card__header">
        <Name className="eevenkoto-tier-card__name">{name}</Name>
        {badge ? <Badge {...badge} shape={badge.shape ?? 'pill'} /> : null}
      </header>
      <div className="eevenkoto-tier-card__pricing">
        <span className="eevenkoto-tier-card__price">{price}</span>
        {period ? <span className="eevenkoto-tier-card__period">{period}</span> : null}
      </div>
      {descriptionHtml !== undefined ? (
        <p
          className="eevenkoto-tier-card__description"
          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
        />
      ) : description ? (
        <p className="eevenkoto-tier-card__description">{description}</p>
      ) : null}
      <div className="eevenkoto-tier-card__features">
        <List variant="checklist" size="sm" items={features} />
      </div>
      {footerNode ? <footer className="eevenkoto-tier-card__footer">{footerNode}</footer> : null}
    </article>
  );
};
