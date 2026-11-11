import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/ability-name.css';
import '@eevenkoto/css/badge.css';
import '@eevenkoto/css/button.css';
import '@eevenkoto/css/checkbox.css';
import '@eevenkoto/css/checkbox-group.css';
import '@eevenkoto/css/chip.css';
import '@eevenkoto/css/entity-ref.css';
import '@eevenkoto/css/equipment-block.css';
import '@eevenkoto/css/field.css';
import '@eevenkoto/css/flow.css';
import '@eevenkoto/css/heading.css';
import '@eevenkoto/css/icon.css';
import '@eevenkoto/css/inline-ref.css';
import '@eevenkoto/css/input.css';
import '@eevenkoto/css/link-button.css';
import '@eevenkoto/css/notice.css';
import '@eevenkoto/css/prose.css';
import '@eevenkoto/css/radio.css';
import '@eevenkoto/css/radio-group.css';
import '@eevenkoto/css/segmented-control.css';
import '@eevenkoto/css/select.css';
import '@eevenkoto/css/stat.css';
import '@eevenkoto/css/status-dot.css';
import '@eevenkoto/css/toast.css';
import {
  renderBadge,
  renderButton,
  renderCheckbox,
  renderChip,
  renderEntityRef,
  renderEquipmentBlock,
  renderField,
  renderHeading,
  renderInlineRef,
  renderInput,
  renderLinkButton,
  renderNotice,
  renderProse,
  renderRadio,
  renderSegmentedControl,
  renderSelect,
  renderStat,
  renderStatusDot,
  renderToast,
} from '@eevenkoto/html';

const intents = ['neutral', 'info', 'success', 'caution', 'critical', 'admin'] as const;
const entityKinds = [
  'item',
  'condition',
  'mechanic',
  'classFeature',
  'class',
  'creature',
  'spell',
] as const;

const renderSpecimen = (prefix: string): string => {
  const subtleBadges = intents
    .map((intent) => renderBadge({ label: `${intent} subtle`, intent, variant: 'subtle', dot: true }))
    .join(' ');
  const solidBadges = intents
    .map((intent) => renderBadge({ label: `${intent} solid`, intent, variant: 'solid', dot: true }))
    .join(' ');
  const outlineBadges = intents
    .map((intent) => renderBadge({ label: `${intent} outline`, intent, variant: 'outline', dot: true }))
    .join(' ');
  const statusDots = intents
    .map((intent) => renderStatusDot({ label: `${intent} status`, intent }))
    .join(' ');
  const notices = intents
    .map((intent) =>
      renderNotice({
        title: `${intent} notice`,
        body: `Computed contrast check for ${intent} subtle notice.`,
        intent,
        variant: 'subtle',
      }),
    )
    .join('');
  const subtleToasts = intents
    .map((intent) =>
      renderToast({
        text: `${intent} subtle toast`,
        intent,
        variant: 'subtle',
      }),
    )
    .join('');
  const solidToasts = intents
    .map((intent) =>
      renderToast({
        text: `${intent} solid toast`,
        intent,
        variant: 'solid',
      }),
    )
    .join('');
  const refs = entityKinds
    .map((kind) => renderEntityRef({ name: kind, kind, href: `#${prefix}-${kind}` }))
    .join(' ');

  return `<div class="eevenkoto-flow">
    ${renderHeading({ level: 1, text: 'Heading 1 — Chapter' })}
    ${renderHeading({ level: 2, text: 'Heading 2 — Section' })}
    ${renderHeading({ level: 3, text: 'Heading 3 — Subsection' })}
    ${renderHeading({ level: 4, text: 'Heading 4 — Sub-subsection' })}
    ${renderHeading({ level: 5, text: 'Heading 5 — Statblock band' })}
    ${renderHeading({ level: 6, text: 'Heading 6 — Feature lead' })}
    ${renderProse({
      content: `<p>Editorial prose with an <a href="#${prefix}-prose-link">inline bare link</a> on canvas.</p>`,
    })}
    <p>
      ${renderButton({ label: 'Primary' })}
      ${renderButton({ label: 'Secondary', variant: 'secondary' })}
      ${renderButton({ label: 'Ghost', variant: 'ghost' })}
      ${renderLinkButton({ href: `#${prefix}-play`, label: 'Start playing' })}
    </p>
    <p>${subtleBadges}</p>
    <p>${solidBadges}</p>
    <p>${outlineBadges}</p>
    <p>${statusDots}</p>
    ${notices}
    <div class="eevenkoto-flow">${subtleToasts}${solidToasts}</div>
    <p>
      ${renderChip({ label: 'Unselected' })}
      ${renderChip({ label: 'Selected', selected: true })}
      ${renderChip({ label: 'Link chip', href: `#${prefix}-player` })}
    </p>
    ${renderSegmentedControl({
      label: 'Primary segmented mode',
      name: `${prefix}-seg-primary`,
      tone: 'primary',
      selectedId: 'full',
      options: [
        { id: 'full', label: 'Full rules' },
        { id: 'short', label: 'Quick reference' },
      ],
    })}
    ${renderSegmentedControl({
      label: 'Secondary segmented mode',
      name: `${prefix}-seg-secondary`,
      tone: 'secondary',
      selectedId: 'armor',
      options: [
        { id: 'weapon', label: 'Aseet' },
        { id: 'armor', label: 'Haarniskat' },
      ],
    })}
    ${renderField({
      label: 'Search spells',
      htmlFor: `${prefix}-search`,
      hint: 'Filter by school or level.',
      messageId: `${prefix}-search-hint`,
      control: renderInput({
        id: `${prefix}-search`,
        search: true,
        placeholder: 'Search catalog…',
        describedBy: `${prefix}-search-hint`,
      }),
    })}
    ${renderField({
      label: 'Email',
      htmlFor: `${prefix}-email`,
      error: 'Enter an email address that includes @.',
      messageId: `${prefix}-email-message`,
      control: renderInput({
        id: `${prefix}-email`,
        type: 'email',
        value: 'not-an-email',
        invalid: true,
        describedBy: `${prefix}-email-message`,
      }),
    })}
    ${renderField({
      label: 'Ancestry',
      htmlFor: `${prefix}-ancestry`,
      control: renderSelect({
        id: `${prefix}-ancestry`,
        placeholder: 'Choose ancestry…',
        options: [
          { value: 'human', label: 'Ihminen' },
          { value: 'elf', label: 'Haltia' },
        ],
      }),
    })}
    ${renderField({
      label: 'Invalid select',
      htmlFor: `${prefix}-select-invalid`,
      error: 'Selection required.',
      messageId: `${prefix}-select-invalid-msg`,
      control: renderSelect({
        id: `${prefix}-select-invalid`,
        invalid: true,
        describedBy: `${prefix}-select-invalid-msg`,
        options: [{ value: 'none', label: 'Unselected' }],
      }),
    })}
    <div class="eevenkoto-flow">
      ${renderCheckbox({ id: `${prefix}-cb-default`, label: 'Proficient in Athletics', checked: true })}
      ${renderCheckbox({
        id: `${prefix}-cb-card`,
        label: 'Ritual caster',
        description: 'Cast prepared ritual spells without expending slots.',
        variant: 'card',
        checked: true,
      })}
      ${renderCheckbox({
        id: `${prefix}-cb-invalid`,
        label: 'Accept guild charter',
        invalid: true,
      })}
    </div>
    <div class="eevenkoto-flow">
      ${renderRadio({
        id: `${prefix}-rb-default`,
        name: `${prefix}-rb-group-1`,
        value: 'standard',
        label: 'Standard array',
        checked: true,
      })}
      ${renderRadio({
        id: `${prefix}-rb-card`,
        name: `${prefix}-rb-group-2`,
        value: 'point-buy',
        label: 'Point buy',
        description: 'Distribute 27 points across six abilities.',
        variant: 'card',
        checked: true,
      })}
      ${renderRadio({
        id: `${prefix}-rb-tile`,
        name: `${prefix}-rb-group-3`,
        value: 'rolled',
        label: '4d6 drop lowest',
        variant: 'tile',
        checked: true,
      })}
      ${renderRadio({
        id: `${prefix}-rb-invalid`,
        name: `${prefix}-rb-group-4`,
        value: 'invalid',
        label: 'Unconfirmed origin',
        invalid: true,
      })}
    </div>
    <p>${renderInlineRef({ name: 'Paralyzed', href: `#${prefix}-paralyzed` })} ${refs}</p>
    <div style="padding: var(--eevenkoto-space-3); background: var(--eevenkoto-color-surface-sunken); border-radius: var(--eevenkoto-radius-md);">
      <p style="margin: 0;">On sunken well: ${refs}</p>
    </div>
    <p>
      ${renderStat({ value: '16', shape: 'disk', size: 'sm' })}
      ${renderStat({ value: '+3', shape: 'arch', size: 'lg' })}
      ${renderStat({ value: '+5', shape: 'shield', size: 'sm', emphasis: true })}
    </p>
    ${renderEquipmentBlock({
      name: 'Pitkämiekka',
      category: 'Lähitaisteluase',
      price: '15 kr',
      stats: [
        { label: 'Vahinko', value: '1n8', subValue: 'viilto', emphasis: true },
        { label: 'Ominaisuus', abilities: ['Voimakkuus'] },
        { label: 'Paino', value: '1,5 kg' },
      ],
    })}
  </div>`;
};

const meta: Meta = {
  title: 'Foundations/Contrast specimen',
  parameters: {
    docs: {
      description: {
        component:
          'Comprehensive light and dark theme specimen audited in a real Chromium browser via axe-core.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const LightChrome: Story = {
  globals: { theme: 'light' },
  render: () => renderSpecimen('light'),
};

export const DarkChrome: Story = {
  globals: { theme: 'dark' },
  render: () => renderSpecimen('dark'),
};
