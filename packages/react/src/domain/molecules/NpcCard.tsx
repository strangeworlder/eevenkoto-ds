import { npcCardClassNames, type NpcCardProps } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { PropertyList } from '../../core/molecules/PropertyList';

export type { NpcCardProps };

export type NpcCardComponentProps = Omit<HTMLAttributes<HTMLElement>, 'children'> &
  NpcCardProps & {
    children?: ReactNode;
  };

export const NpcCard = ({
  id,
  name,
  nameHtml,
  nameLevel = 3,
  role,
  roleHtml,
  details,
  body,
  bodyHtml,
  className,
  children,
  ...rest
}: NpcCardComponentProps): ReactElement => {
  const Name = `h${nameLevel}` as 'h2' | 'h3' | 'h4';
  const classes = [npcCardClassNames(), className].filter(Boolean).join(' ');
  const hasChildren = children !== undefined && children !== null && children !== false;
  const hasRole = roleHtml !== undefined ? Boolean(roleHtml) : Boolean(role);

  return (
    <article id={id} className={classes} {...rest}>
      <header className="eevenkoto-npc-card__header">
        {nameHtml !== undefined ? (
          <Name className="eevenkoto-npc-card__name" dangerouslySetInnerHTML={{ __html: nameHtml }} />
        ) : (
          <Name className="eevenkoto-npc-card__name">{name}</Name>
        )}
        {hasRole ? (
          roleHtml !== undefined ? (
            <p className="eevenkoto-npc-card__role" dangerouslySetInnerHTML={{ __html: roleHtml }} />
          ) : (
            <p className="eevenkoto-npc-card__role">{role}</p>
          )
        ) : null}
      </header>
      {details?.length ? <PropertyList layout="divided" items={details} /> : null}
      {hasChildren ? (
        <div className="eevenkoto-npc-card__body eevenkoto-prose">{children}</div>
      ) : bodyHtml !== undefined ? (
        <div
          className="eevenkoto-npc-card__body eevenkoto-prose"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      ) : body ? (
        <div className="eevenkoto-npc-card__body eevenkoto-prose">
          <p>{body}</p>
        </div>
      ) : null}
    </article>
  );
};