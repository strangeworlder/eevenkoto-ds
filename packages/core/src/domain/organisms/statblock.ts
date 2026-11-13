import type { AbilityScoreProps } from '../molecules/abilityScore';
import type { HeadingLevel } from '../../core/atoms/heading';
import type { PropertyItem } from '../../core/atoms/property';
import type { StatblockSectionProps } from '../molecules/statblockSection';

/** Heading levels allowed for the creature name (embed-safe). */
export type StatblockNameLevel = Extract<HeadingLevel, 1 | 2 | 3>;

export interface StatblockProps {
  /** Optional anchor `id` applied to the outer `<article>`. */
  id?: string;
  /** Optional anchor `id` applied to the creature name heading. */
  headingId?: string;
  /** Creature / entity name. */
  name: string;
  /** Trusted inline HTML for the creature name heading (sanitized in HTML renderer). Takes precedence over `name`. */
  nameHtml?: string;
  /**
   * Semantic heading level for `name`. Default `1` for a dedicated entry page.
   * Use `2` or `3` when embedded inside a host document outline.
   */
  nameLevel?: StatblockNameLevel;
  /** Optional flavor paragraph. */
  flavor?: string;
  /** Trusted pre-rendered inline HTML for the flavor paragraph. Takes precedence over `flavor`. */
  flavorHtml?: string;
  /** Optional italic type line (size / type). */
  typeLine?: string;
  /** Trusted pre-rendered inline HTML for the type line. Takes precedence over `typeLine`. */
  typeLineHtml?: string;
  /** Combat vitals — rendered in the ability group header slot. */
  vitals: PropertyItem[];
  /** Ability columns. */
  abilities: AbilityScoreProps[];
  /** Skills, senses, languages, CR — ability group footer rail. */
  details: PropertyItem[];
  /** Named sections (Actions, Reactions, …). */
  sections?: StatblockSectionProps[];
  /** Trusted pre-rendered HTML appended after the ability sandwich / sections. */
  bodyHtml?: string;
}

export const statblockClassNames = (): string => 'eevenkoto-statblock';
