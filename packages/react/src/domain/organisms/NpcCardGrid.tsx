import { npcCardGridClassNames, type NpcCardGridProps } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { NpcCard } from '../molecules/NpcCard';

export type { NpcCardGridProps };

export type NpcCardGridComponentProps = Omit<HTMLAttributes<HTMLElement>, 'children'> &
  NpcCardGridProps & {
    /** Custom cards. Rendered after any `cards` data. */
    children?: ReactNode;
  };

export const NpcCardGrid = ({
  id,
  columns,
  cards,
  className,
  children,
  ...rest
}: NpcCardGridComponentProps): ReactElement => {
  const classes = [npcCardGridClassNames({ columns }), className].filter(Boolean).join(' ');

  return (
    <div id={id} className={classes} {...rest}>
      {(cards ?? []).map((card, index) => (
        <NpcCard key={card.id ?? `${card.name}-${index}`} {...card} />
      ))}
      {children}
    </div>
  );
};