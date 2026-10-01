import {
  abilityNameClassNames,
  abbreviateAbility,
  type AbilityNameProps,
} from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import template from './AbilityName.html';

export type { AbilityNameProps };

export const renderAbilityName = (args: AbilityNameProps = {}): string => {
  const fullText = args.name || args.children || '';
  const shortText = args.short || (fullText ? abbreviateAbility(fullText) : '');
  const ariaLabel = fullText;

  return template
    .replace('{{className}}', abilityNameClassNames(args))
    .replace('{{ariaLabel}}', escapeHtml(ariaLabel))
    .replace('{{fullText}}', escapeHtml(fullText))
    .replace('{{shortText}}', escapeHtml(shortText));
};
