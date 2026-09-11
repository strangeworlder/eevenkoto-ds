import { abilityScoreClassNames, type AbilityScoreProps } from '@eevenkoto/core';
import { renderStat } from '../../../core/atoms/stat/renderStat';
import { escapeHtml, slugifyId } from '../../../utils/html';
import scoreTemplate from './AbilityScore.html';

export type { AbilityScoreProps };

const renderStatSlot = (
  role: 'score' | 'modifier' | 'save',
  label: string,
  value: string,
  shape: 'disk' | 'arch' | 'shield',
  size: 'sm' | 'lg',
  emphasis?: boolean,
): string => {
  const chip = renderStat({ value, shape, size, emphasis });
  return `<div class="eevenkoto-ability-score__stat eevenkoto-ability-score__stat--${role}">
  <dt class="eevenkoto-ability-score__stat-label">${escapeHtml(label)}</dt>
  <dd class="eevenkoto-ability-score__stat-value">${chip}</dd>
</div>`;
};

export const renderAbilityScore = (args: AbilityScoreProps): string => {
  const scoreLabel = args.scoreLabel ?? 'Score';
  const modifierLabel = args.modifierLabel ?? 'Modifier';
  const saveProficient = Boolean(args.saveProficient);
  const saveLabel = args.saveLabel ?? 'Save';
  const proficientLabel = args.proficientLabel ?? 'proficient';
  const saveTerm = saveProficient ? `${saveLabel} (${proficientLabel})` : saveLabel;
  const labelId = args.labelId ?? `eevenkoto-ability-${slugifyId(args.label)}`;

  const stats = [
    renderStatSlot('modifier', modifierLabel, args.modifier, 'arch', 'lg'),
    renderStatSlot('score', scoreLabel, args.score, 'disk', 'sm'),
    renderStatSlot('save', saveTerm, args.save, 'shield', 'sm', saveProficient),
  ].join('');

  return scoreTemplate
    .replace('{{className}}', abilityScoreClassNames({ saveProficient }))
    .replace(/\{\{labelId\}\}/g, escapeHtml(labelId))
    .replace('{{label}}', escapeHtml(args.label))
    .replace('{{stats}}', stats);
};
