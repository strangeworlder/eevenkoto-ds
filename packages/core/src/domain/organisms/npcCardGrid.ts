import type { NpcCardProps } from '../molecules/npcCard';

export interface NpcCardGridProps {
  /** Optional DOM element `id`. */
  id?: string;
  /** Column count on wide containers. Default: `2`. */
  columns?: 1 | 2;
  /** Cards to render. */
  cards?: NpcCardProps[];
}

export const npcCardGridClassNames = (props: Pick<NpcCardGridProps, 'columns'> = {}): string =>
  props.columns === 1
    ? 'eevenkoto-npc-card-grid eevenkoto-npc-card-grid--1'
    : 'eevenkoto-npc-card-grid';
