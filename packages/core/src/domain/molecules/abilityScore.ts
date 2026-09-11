export interface AbilityScoreProps {
  /** Ability name shown in the column header (product copy). */
  label: string;
  /**
   * Optional stable id for the label element. Used as `aria-labelledby` on the
   * stats `dl`. When omitted, renderers derive an id from `label` / framework ids.
   */
  labelId?: string;
  /** Base score value. */
  score: string;
  /** Modifier, typically signed (`+3`). */
  modifier: string;
  /** Saving throw bonus, typically signed. */
  save: string;
  /** Visually hidden term for score. Default: `Score` */
  scoreLabel?: string;
  /** Visually hidden term for modifier. Default: `Modifier` */
  modifierLabel?: string;
  /** Visually hidden term for save. Default: `Save` */
  saveLabel?: string;
  /**
   * Creature is proficient in this save — thicker deep-gold border + outline on
   * the shield (not color-only). Default: false
   */
  saveProficient?: boolean;
  /**
   * Suffix in the visually hidden save term when `saveProficient` is true.
   * Default: `proficient`
   */
  proficientLabel?: string;
}

export const abilityScoreClassNames = (props: { saveProficient?: boolean } = {}): string => {
  const proficient = props.saveProficient ? ' eevenkoto-ability-score--save-proficient' : '';
  return `eevenkoto-ability-score${proficient}`;
};
