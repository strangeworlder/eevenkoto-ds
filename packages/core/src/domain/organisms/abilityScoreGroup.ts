import type { AbilityScoreProps } from '../molecules/abilityScore';

export interface AbilityScoreGroupProps {
  abilities: AbilityScoreProps[];
}

export const abilityScoreGroupClassNames = (): string => 'eevenkoto-ability-score-group';
