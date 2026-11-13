import type { PropertyItem } from '../../core/atoms/property';

export type NpcCardNameLevel = 2 | 3 | 4;

export interface NpcCardProps {
  /** Optional DOM element `id`. */
  id?: string;
  /** NPC name. */
  name: string;
  /** Trusted inline HTML for the name. Takes precedence over `name`. */
  nameHtml?: string;
  /** Semantic heading level. Default: `3`. */
  nameLevel?: NpcCardNameLevel;
  /** Role / epithet below the name. */
  role?: string;
  /** Trusted inline HTML for the role. Takes precedence over `role`. */
  roleHtml?: string;
  /** Facts rendered as a divided PropertyList (`details`, never `traits`). */
  details?: PropertyItem[];
  /** Plain text description. */
  body?: string;
  /** Trusted HTML description. Takes precedence over `body`. */
  bodyHtml?: string;
}

export const npcCardClassNames = (): string => 'eevenkoto-npc-card';
