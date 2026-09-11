import type { AbilityScoreProps } from '../molecules/abilityScore';
import type { HeadingLevel } from '../../core/atoms/heading';
import type { PropertyItem } from '../../core/atoms/property';
import type { StatblockSectionProps } from '../molecules/statblockSection';

/** Heading levels allowed for the creature name (embed-safe). */
export type StatblockNameLevel = Extract<HeadingLevel, 1 | 2>;

export interface StatblockProps {
  /** Creature / entity name. */
  name: string;
  /**
   * Semantic heading level for `name`. Default `1` for a dedicated entry page.
   * Use `2` when the host document already owns an H1.
   */
  nameLevel?: StatblockNameLevel;
  /** Optional flavor paragraph. */
  flavor?: string;
  /** Optional italic type line (size / type). */
  typeLine?: string;
  /** Combat vitals — rendered in the ability group header slot. */
  vitals: PropertyItem[];
  /** Ability columns. */
  abilities: AbilityScoreProps[];
  /** Skills, senses, languages, CR — ability group footer rail. */
  details: PropertyItem[];
  /** Named sections (Actions, Reactions, …). */
  sections?: StatblockSectionProps[];
}

export const statblockClassNames = (): string => 'eevenkoto-statblock';
