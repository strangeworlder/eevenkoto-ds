import {
  abilityScoreClassNames,
  abilityScoreGroupClassNames,
  type AbilityScoreGroupProps,
  type AbilityScoreProps,
} from '@eevenkoto/core';
import { renderStat } from '../stat/renderStat';
import scoreTemplate from './AbilityScore.html';
import groupTemplate from './AbilityScoreGroup.html';

export type { AbilityScoreProps, AbilityScoreGroupProps };

const renderStatSlot = (
  role: 'score' | 'modifier' | 'save',
  term: string,
  value: string,
  shape: 'disk' | 'arch' | 'shield',
  size: 'sm' | 'lg',
  emphasis?: boolean,
): string => {
  const chip = renderStat({ value, shape, size, emphasis });
  return `<div class="eevenkoto-ability-score__stat eevenkoto-ability-score__stat--${role}">
  <dt class="eevenkoto-ability-score__stat-label">${term}</dt>
  <dd class="eevenkoto-ability-score__stat-value">${chip}</dd>
</div>`;
};

export const renderAbilityScore = (args: AbilityScoreProps): string => {
  const scoreLabel = args.scoreLabel ?? 'Score';
  const modifierLabel = args.modifierLabel ?? 'Modifier';
  const saveProficient = Boolean(args.saveProficient);
  const saveLabel = args.saveLabel ?? 'Save';
  const saveTerm = saveProficient ? `${saveLabel} (proficient)` : saveLabel;

  const stats = [
    renderStatSlot('modifier', modifierLabel, args.modifier, 'arch', 'lg'),
    renderStatSlot('score', scoreLabel, args.score, 'disk', 'sm'),
    renderStatSlot('save', saveTerm, args.save, 'shield', 'sm', saveProficient),
  ].join('');

  return scoreTemplate
    .replace('{{className}}', abilityScoreClassNames({ saveProficient }))
    .replace('{{label}}', args.label)
    .replace('{{stats}}', stats);
};

export interface AbilityScoreGroupArgs extends AbilityScoreGroupProps {
  /** Optional HTML for the inset header rail (typically a PropertyList). */
  header?: string;
  /** Optional HTML for the inset footer rail (typically a PropertyList). */
  footer?: string;
}

export const renderAbilityScoreGroup = (args: AbilityScoreGroupArgs): string => {
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
