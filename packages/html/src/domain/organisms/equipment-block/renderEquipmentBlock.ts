import {
  headingClassNames,
  captionClassNames,
  badgeClassNames,
  chipClassNames,
  buttonClassNames,
  noticeClassNames,
  equipmentBlockClassNames,
  type EquipmentBlockNameLevel,
  type EquipmentBlockProps,
} from '@eevenkoto/core';
import { escapeHtml, sanitizeInlineHtml } from '../../../utils/html';
import { renderAbilityName } from '../../atoms/ability-name/renderAbilityName';
import template from './EquipmentBlock.html';

export type { EquipmentBlockProps, EquipmentBlockNameLevel };

export const renderEquipmentBlock = (args: EquipmentBlockProps): string => {
  const nameLevel: EquipmentBlockNameLevel = args.nameLevel === 2 ? 2 : 1;
  const parts: string[] = [];

  // Plate
  const plateChildren: string[] = [];
  const headingGroup: string[] = [
    `<h${nameLevel} class="${headingClassNames({ level: nameLevel })}">${escapeHtml(args.name)}</h${nameLevel}>`,
  ];
  if (args.category) {
    headingGroup.push(
      `<p class="${captionClassNames()} eevenkoto-equipment-block__category">${escapeHtml(args.category)}</p>`,
    );
  }
  plateChildren.push(
    `<div class="eevenkoto-equipment-block__heading-group">${headingGroup.join('')}</div>`,
  );

  if (args.price) {
    plateChildren.push(
      `<div class="eevenkoto-equipment-block__price"><span class="${badgeClassNames({ variant: 'solid', intent: 'neutral' })}">${escapeHtml(args.price)}</span></div>`,
    );
  }

  parts.push(`<div class="eevenkoto-equipment-block__plate">${plateChildren.join('')}</div>`);

  // Stats band
  if (args.stats?.length) {
    const statItems = args.stats
      .map((st) => {
        const itemClasses = ['eevenkoto-equipment-block__stat-item'];
        if (st.emphasis) {
          itemClasses.push('eevenkoto-equipment-block__stat-item--emphasis');
        }
        if (st.subItems?.length) {
          itemClasses.push('eevenkoto-equipment-block__stat-item--split');
          const subItemMarkup = st.subItems
            .map(
              (sub) =>
                `<div class="eevenkoto-equipment-block__stat-subitem">` +
                `<span class="eevenkoto-equipment-block__stat-label">${escapeHtml(sub.label)}</span>` +
                `<strong class="eevenkoto-equipment-block__stat-value">${escapeHtml(sub.value)}</strong>` +
                `</div>`,
            )
            .join('');
          return `<div class="${itemClasses.join(' ')}">${subItemMarkup}</div>`;
        }

        let valueContent = '';
        if (st.abilities?.length) {
          valueContent = st.abilities
            .map((ab) => renderAbilityName({ name: ab }))
            .join(' tai ');
        } else if (st.label?.toLowerCase().startsWith('omin') && st.value) {
          if (st.value.includes(' tai ')) {
            valueContent = st.value
              .split(' tai ')
              .map((ab) => renderAbilityName({ name: ab.trim() }))
              .join(' tai ');
          } else {
            valueContent = renderAbilityName({ name: st.value.trim() });
          }
        } else {
          valueContent = escapeHtml(st.value || '');
        }

        const subValueMarkup = st.subValue
          ? `<span class="eevenkoto-equipment-block__stat-subvalue">${escapeHtml(st.subValue)}</span>`
          : '';

        return (
          `<div class="${itemClasses.join(' ')}">` +
          `<span class="eevenkoto-equipment-block__stat-label">${escapeHtml(st.label || '')}</span>` +
          `<strong class="eevenkoto-equipment-block__stat-value">${valueContent}</strong>` +
          subValueMarkup +
          `</div>`
        );
      })
      .join('');
    parts.push(`<div class="eevenkoto-equipment-block__stats">${statItems}</div>`);
  }

  // Kesto breakdown
  if (args.kesto) {
    const k = args.kesto;
    const title = k.title || 'Vahingon kesto';
    const tags: string[] = [
      `<span class="eevenkoto-equipment-block__kesto-tag">${escapeHtml(k.labels?.base || 'Perus')}: <strong>${k.base}</strong></span>`,
    ];
    if (k.bludgeoning !== undefined) {
      tags.push(
        `<span class="eevenkoto-equipment-block__kesto-tag">${escapeHtml(k.labels?.bludgeoning || 'Murskaus')}: <strong>${k.bludgeoning}</strong></span>`,
      );
    }
    if (k.slashing !== undefined) {
      tags.push(
        `<span class="eevenkoto-equipment-block__kesto-tag">${escapeHtml(k.labels?.slashing || 'Viilto')}: <strong>${k.slashing}</strong></span>`,
      );
    }
    if (k.piercing !== undefined) {
      tags.push(
        `<span class="eevenkoto-equipment-block__kesto-tag">${escapeHtml(k.labels?.piercing || 'Pisto')}: <strong>${k.piercing}</strong></span>`,
      );
    }
    parts.push(
      `<div class="eevenkoto-equipment-block__kesto">` +
        `<span class="eevenkoto-equipment-block__kesto-title">${escapeHtml(title)}</span>` +
        `<div class="eevenkoto-equipment-block__kesto-tags">${tags.join('')}</div>` +
        `</div>`,
    );
  }

  // Traits section
  const traitsTitle = args.traitsTitle || 'Valitut piirteet';
  let traitsContent = '';
  if (args.traits?.length) {
    traitsContent = args.traits
      .map((tr) => `<span class="${chipClassNames()}">${escapeHtml(tr)}</span>`)
      .join('');
  } else {
    traitsContent = `<span class="eevenkoto-equipment-block__empty-traits">${escapeHtml(args.emptyTraitsText || 'Ei erikoispiirteitä')}</span>`;
  }
  parts.push(
    `<div class="eevenkoto-equipment-block__section">` +
      `<h4 class="eevenkoto-equipment-block__section-title">${escapeHtml(traitsTitle)}</h4>` +
      `<div class="eevenkoto-equipment-block__traits">${traitsContent}</div>` +
      `</div>`,
  );

  // Notes section
  if (args.notes?.length) {
    const notesTitle = args.notesTitle || 'Säännöt & vaikutukset';
    const notesList = args.notes
      .map((n) => `<li>${sanitizeInlineHtml(n)}</li>`)
      .join('');
    parts.push(
      `<div class="eevenkoto-equipment-block__section">` +
        `<h4 class="eevenkoto-equipment-block__section-title">${escapeHtml(notesTitle)}</h4>` +
        `<ul class="eevenkoto-list eevenkoto-equipment-block__notes">${notesList}</ul>` +
        `</div>`,
    );
  }

  // Validation Warnings
  if (args.warnings?.length) {
    const warnHtml = args.warnings.map((w) => escapeHtml(w)).join('<br />');
    parts.push(
      `<div class="eevenkoto-equipment-block__notice">` +
        `<div class="${noticeClassNames({ intent: 'caution' })}" role="alert">${warnHtml}</div>` +
        `</div>`,
    );
  }

  // Footer / Action button
  if (args.showCopyButton) {
    const copyLabel = args.copyLabel || 'Kopioi hahmolomakkeelle';
    const copyData = args.copyText ? ` data-copy-text="${escapeHtml(args.copyText)}"` : '';
    parts.push(
      `<div class="eevenkoto-equipment-block__footer">` +
        `<button type="button" class="${buttonClassNames({ variant: 'primary', size: 'md' })} eevenkoto-equipment-block__copy-btn"${copyData}>${escapeHtml(copyLabel)}</button>` +
        `</div>`,
    );
  }

  return template
    .replace('{{className}}', equipmentBlockClassNames())
    .replace('{{content}}', parts.join(''));
};
