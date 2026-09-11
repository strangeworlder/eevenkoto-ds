export interface AbilityScoreProps {
  /** Ability name shown in the column header (product copy). */
  label: string;
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
   * Creature is proficient in this save — bright accent on the shield.
   * Default: false
   */
  saveProficient?: boolean;
}

export const abilityScoreClassNames = (props: { saveProficient?: boolean } = {}): string => {
  const proficient = props.saveProficient ? ' eevenkoto-ability-score--save-proficient' : '';
  return `eevenkoto-ability-score${proficient}`;
};

export interface AbilityScoreGroupProps {
  abilities: AbilityScoreProps[];
}

export const abilityScoreGroupClassNames = (): string => 'eevenkoto-ability-score-group';
