import {
  abilityScoreGroupClassNames,
  type AbilityScoreGroupProps as AbilityScoreGroupCoreProps,
} from '@eevenkoto/core';
import { renderAbilityScore } from '../../molecules/ability-score/renderAbilityScore';
import groupTemplate from './AbilityScoreGroup.html';

export interface AbilityScoreGroupProps extends AbilityScoreGroupCoreProps {
  /** Optional HTML for the inset header rail (typically a PropertyList). */
  header?: string;
  /** Optional HTML for the inset footer rail (typically a PropertyList). */
  footer?: string;
}

export const renderAbilityScoreGroup = (args: AbilityScoreGroupProps): string => {
  const header = args.header
    ? `<div class="eevenkoto-ability-score-group__header">${args.header}</div>`
    : '';
  const footer = args.footer
    ? `<div class="eevenkoto-ability-score-group__footer">${args.footer}</div>`
    : '';
  const grid = `<div class="eevenkoto-ability-score-group__grid">${args.abilities
    .map((ability) => renderAbilityScore(ability))
    .join('')}</div>`;

  return groupTemplate
    .replace('{{className}}', abilityScoreGroupClassNames())
    .replace('{{content}}', `${header}${grid}${footer}`);
};
