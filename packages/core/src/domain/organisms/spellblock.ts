import type { HeadingLevel } from '../../core/atoms/heading';
import type { PropertyItem } from '../../core/atoms/property';
import type { StatblockFeatureProps } from '../molecules/statblockFeature';

/** Heading levels allowed for the spell name (embed-safe). */
export type SpellblockNameLevel = Extract<HeadingLevel, 1 | 2>;

export interface SpellblockProps {
  /** Spell name. */
  name: string;
  /**
   * Semantic heading level for `name`. Default `1` for a dedicated entry page.
   * Use `2` when the host document already owns an H1.
   */
  nameLevel?: SpellblockNameLevel;
  /** Italic level / school line on the title plate. Ritual tags belong here. */
  typeLine?: string;
  /** Optional catalog rail (classes / lists that grant the spell). */
  classes?: PropertyItem[];
  /** Casting time, range, components, duration — the boxed stat band. */
  properties: PropertyItem[];
  /**
   * Effect prose, one entry per paragraph.
   * HTML renderer sanitizes a small inline allowlist per paragraph.
   */
  paragraphs?: string[];
  /** Scaling entries (higher-level slots, cantrip upgrade) — H3 run-ins. */
  features?: StatblockFeatureProps[];
  /** Compact card for deck grids. Default `false`. */
  deck?: boolean;
  /** BCP 47 tag on the article; enables `hyphens: auto` for long compounds. */
  lang?: string;
}

export type SpellblockClassNameProps = Pick<SpellblockProps, 'deck'>;

export const spellblockClassNames = (props: SpellblockClassNameProps = {}): string =>
  ['eevenkoto-spellblock', props.deck ? 'eevenkoto-spellblock--deck' : '']
    .filter(Boolean)
    .join(' ');
