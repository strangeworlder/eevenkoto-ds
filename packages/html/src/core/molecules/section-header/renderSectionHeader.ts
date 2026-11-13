import {
  captionClassNames,
  headingClassNames,
  paragraphClassNames,
  sectionHeaderClassNames,
  type SectionHeaderProps as CoreSectionHeaderProps,
} from '@eevenkoto/core';
import { escapeHtml, sanitizeInlineHtml } from '../../../utils/html';
import { renderIcon } from '../../atoms/icon/renderIcon';
import template from './SectionHeader.html';

export type SectionHeaderProps = CoreSectionHeaderProps & {
  /** Trusted HTML for the actions row (buttons / links). */
  actions?: string;
};

const dim = (value: number | string | undefined, attr: string): string =>
  value === undefined ? '' : ` ${attr}="${escapeHtml(String(value))}"`;

export const renderSectionHeader = (args: SectionHeaderProps): string => {
  const level = args.titleLevel ?? 2;
  const parts: string[] = [];

  if (args.eyebrow) {
    parts.push(
      `<p class="${captionClassNames({ tone: 'accent', variant: 'eyebrow' })}">${escapeHtml(args.eyebrow)}</p>`,
    );
  }
  if (args.logo) {
    parts.push(
      `<img class="eevenkoto-section-header__logo" src="${escapeHtml(args.logo.src)}" alt="${escapeHtml(args.logo.alt)}"${dim(args.logo.width, 'width')}${dim(args.logo.height, 'height')} />`,
    );
  }
  const titleInner =
    args.titleHtml !== undefined ? sanitizeInlineHtml(args.titleHtml) : escapeHtml(args.title ?? '');
  if (titleInner) {
    parts.push(`<h${level} class="${headingClassNames({ level })}">${titleInner}</h${level}>`);
  }
  const leadInner =
    args.leadHtml !== undefined ? sanitizeInlineHtml(args.leadHtml) : escapeHtml(args.lead ?? '');
  if (leadInner) {
    parts.push(
      `<p class="${paragraphClassNames({ size: 'lg', tone: 'secondary' })} eevenkoto-section-header__lead">${leadInner}</p>`,
    );
  }
  if (args.actions) {
    parts.push(`<div class="eevenkoto-section-header__actions">${args.actions}</div>`);
  }
  if (args.note && (args.note.text || args.note.html)) {
    const noteText =
      args.note.html !== undefined ? sanitizeInlineHtml(args.note.html) : escapeHtml(args.note.text ?? '');
    const icon = args.note.icon ? renderIcon({ name: args.note.icon, size: 'sm' }) : '';
    parts.push(
      `<p class="eevenkoto-section-header__note ${captionClassNames({ tone: 'secondary' })}">${icon}<span>${noteText}</span></p>`,
    );
  }

  return template
    .replace('{{idAttr}}', args.id ? ` id="${escapeHtml(args.id)}"` : '')
    .replace('{{className}}', sectionHeaderClassNames(args))
    .replace('{{content}}', () => parts.join(''));
};
