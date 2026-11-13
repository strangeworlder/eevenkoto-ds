import type { HeadingLevel } from '../../core/atoms/heading';
import type { PropertyItem } from '../../core/atoms/property';
import type { StatblockFeatureProps } from '../molecules/statblockFeature';

/** Heading levels allowed for the spell name (embed-safe). */
export type SpellblockNameLevel = Extract<HeadingLevel, 1 | 2 | 3>;

export interface SpellblockProps {
  /** Optional anchor `id` applied to the outer `<article>`. */
  id?: string;
  /** Optional anchor `id` applied to the spell name heading. */
  headingId?: string;
  /** Spell name. */
  name: string;
  /** Trusted inline HTML for the spell name heading (sanitized in HTML renderer). Takes precedence over `name`. */
  nameHtml?: string;
  /**
   * Semantic heading level for `name`. Default `1` for a dedicated entry page.
   * Use `2` or `3` when embedded inside a host document outline.
   */
  nameLevel?: SpellblockNameLevel;
  /** Italic level / school line on the title plate. Ritual tags belong here. */
  typeLine?: string;
  /** Trusted pre-rendered inline HTML for the type line. Takes precedence over `typeLine`. */
  typeLineHtml?: string;
  /** Optional catalog rail (classes / lists that grant the spell). */
  classes?: PropertyItem[];
  /** Casting time, range, components, duration — the boxed stat band. */
  properties: PropertyItem[];
  /**
   * Effect prose, one entry per paragraph.
   * HTML renderer sanitizes a safe inline allowlist per paragraph.
   */
  paragraphs?: string[];
  /** Trusted pre-rendered inline HTML paragraphs (one `<p>` per entry). */
  paragraphsHtml?: string[];
  /** Trusted pre-rendered block HTML for `__body` (e.g. compiled Markdown with `<p>`, `<ul>`, tables). */
  bodyHtml?: string;
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
