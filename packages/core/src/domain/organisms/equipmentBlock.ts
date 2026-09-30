import type { HeadingLevel } from '../../core/atoms/heading';

/** Heading levels allowed for the equipment name (embed-safe). */
export type EquipmentBlockNameLevel = Extract<HeadingLevel, 1 | 2>;

export interface EquipmentStatItem {
  label: string;
  value: string;
}

export interface EquipmentKestoBreakdown {
  base: number;
  bludgeoning?: number; // murskaus
  slashing?: number;    // viilto
  piercing?: number;    // pisto
  title?: string;
  labels?: {
    base?: string;
    bludgeoning?: string;
    slashing?: string;
    piercing?: string;
  };
}

export interface EquipmentBlockProps {
  /** Equipment item name. */
  name: string;
  /** Semantic heading level for `name`. Default `1`. Use `2` when embedded in a page with an H1. */
  nameLevel?: EquipmentBlockNameLevel;
  /** Category or type line (e.g. "Sota-ase · Lähitaistelu" or "Keskiraskas panssari"). */
  category?: string;
  /** Price display string (e.g. "10 kr" or "20 hr"). */
  price?: string;
  /** Primary metric boxes (Damage, Ability, Reach/Range, Usage, Defense, etc.). */
  stats?: EquipmentStatItem[];
  /** Optional damage reduction / kesto breakdown (common for armor). */
  kesto?: EquipmentKestoBreakdown;
  /** Trait names or chips. */
  traits?: string[];
  /** Fallback message when `traits` is empty. Default "Ei erikoispiirteitä". */
  emptyTraitsText?: string;
  /** Section heading for traits. Default "Valitut piirteet". */
  traitsTitle?: string;
  /** Section heading for rules notes. Default "Säännöt & vaikutukset". */
  notesTitle?: string;
  /** List of rules notes, special effects, and restrictions. */
  notes?: string[];
  /** Validation warnings or rule violation notices. */
  warnings?: string[];
  /** Text to copy to clipboard when the copy button is pressed. */
  copyText?: string;
  /** Label for copy button. Default "Kopioi hahmolomakkeelle". */
  copyLabel?: string;
  /** Whether to show the copy action button. Default false. */
  showCopyButton?: boolean;
}

export const equipmentBlockClassNames = (): string => 'eevenkoto-equipment-block';
