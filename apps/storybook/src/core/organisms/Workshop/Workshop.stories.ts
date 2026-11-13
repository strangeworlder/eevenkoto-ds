import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/workshop.css';
import '@eevenkoto/css/button.css';
import '@eevenkoto/css/badge.css';
import '@eevenkoto/css/card.css';
import '@eevenkoto/css/heading.css';
import '@eevenkoto/css/paragraph.css';
import '@eevenkoto/css/caption.css';
import '@eevenkoto/css/field.css';
import '@eevenkoto/css/input.css';
import '@eevenkoto/css/select.css';
import '@eevenkoto/css/stepper.css';
import '@eevenkoto/css/segmented-control.css';
import {
  renderWorkshop,
  renderButton,
  renderBadge,
  renderField,
  renderInput,
  renderSelect,
  renderStepper,
  renderSegmentedControl,
  renderCard,
  type WorkshopProps,
} from '@eevenkoto/html';

const defaultHeader = renderSegmentedControl({
  name: 'workshop-mode',
  label: 'Builder mode',
  selectedId: 'encounter',
  options: [
    { id: 'encounter', label: 'Encounter' },
    { id: 'loot', label: 'Treasure' },
  ],
});

const defaultControls = [
  `<div class="eevenkoto-workshop__control-group">${renderField({
    htmlFor: 'ws-name',
    label: 'Encounter title',
    control: renderInput({ id: 'ws-name', value: 'Bridge over the Mist', fullWidth: true }),
  })}</div>`,
  `<div class="eevenkoto-workshop__control-group">${renderField({
    htmlFor: 'ws-tier',
    label: 'Party tier',
    control: renderSelect({
      id: 'ws-tier',
      fullWidth: true,
      options: [
        { value: '1', label: 'Levels 1–4 (Local)' },
        { value: '2', label: 'Levels 5–10 (Realm)' },
      ],
    }),
  })}</div>`,
  `<div class="eevenkoto-workshop__stepper-grid">${renderStepper({
    name: 'party-size',
    label: 'Adventurers',
    description: 'Active PCs in the scene',
    value: 4,
    min: 1,
    max: 8,
  })}</div>`,
].join('');

const defaultPreview = renderCard({
  header:
    '<h2>Bridge over the Mist</h2><p class="eevenkoto-caption">Moderate encounter · 4 adventurers</p>',
  body: 'XP budget: 1,200 XP. Suggested opposition: 1 Veteran captain and 3 Bandits holding the toll gate.',
});

const meta: Meta<WorkshopProps> = {
  title: 'Core/Organisms/Workshop',
  parameters: {
    docs: {
      description: {
        component:
          'Generalized workbench and generator layout organism (`split` 2-column workbench or `inline` prose-width generator) with structured header lockup, control groups, preview toolbar, live preview region, and footer tray.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Optional accessible region label.' },
    layout: {
      control: 'inline-radio',
      options: ['split', 'inline'],
      description: 'Chassis geometry: 2-column workbench (`split`) or single-column (`inline`).',
    },
    sticky: {
      control: 'inline-radio',
      options: ['preview', 'controls', 'none'],
      description: 'Sticky column behavior.',
    },
    icon: { control: 'text', description: 'Optional leading glyph in structured header lockup.' },
    title: { control: 'text', description: 'Structured header title.' },
    titleLevel: {
      control: 'inline-radio',
      options: [2, 3],
      description: 'Semantic heading level for `title`.',
    },
    subtitle: { control: 'text', description: 'Optional muted subtitle below `title`.' },
    controlsWidth: {
      control: 'text',
      description: 'CSS Grid track override for `--eevenkoto-workshop-controls-width`.',
    },
    header: { control: 'text' },
    controls: { control: 'text' },
    toolbar: { control: 'text' },
    preview: { control: 'text' },
    footer: { control: 'text' },
  },
  args: {
    label: 'Encounter builder',
    header: defaultHeader,
    controls: defaultControls,
    preview: defaultPreview,
  },
  render: (args) => renderWorkshop(args),
};

export default meta;
type Story = StoryObj<WorkshopProps>;

export const Default: Story = {};

export const EqualColumns: Story = {
  args: {
    controlsWidth: 'minmax(0, 1fr)',
  },
};

export const InlineGenerator: Story = {
  args: {
    label: 'Tavern rumor roller',
    layout: 'inline',
    icon: 'dice',
    title: 'Tavern Rumor Generator',
    subtitle: 'Roll a quick hook for the evening watch without leaving the chapter prose.',
    header: renderButton({
      label: 'Reroll d20',
      variant: 'secondary',
      size: 'sm',
      icon: 'reroll',
    }),
    controls: `<div class="eevenkoto-workshop__control-group">${renderField({
      htmlFor: 'rumor-region',
      label: 'Region table',
      control: renderSelect({
        id: 'rumor-region',
        fullWidth: true,
        options: [
          { value: 'fen', label: 'Sunken Fenlands (1d20)' },
          { value: 'spire', label: 'Glass Spire Ward (1d20)' },
        ],
      }),
    })}</div>`,
    preview: renderCard({
      body: '<strong>14 — The Silent Ferryman:</strong> Lanterns were spotted crossing the reedmarsh after midnight, though the barge sank three winters ago.',
    }),
  },
};

export const WithToolbarAndFooter: Story = {
  args: {
    label: 'Encounter workbench with toolbar and footer',
    icon: 'swords',
    title: 'Encounter Workbench',
    subtitle: 'Balance XP budgets and export ready-to-run rosters.',
    header: defaultHeader,
    controls: defaultControls,
    toolbar: `${renderBadge({ label: '1,200 / 1,400 XP · Moderate', intent: 'info' })}${renderButton({
      label: 'Copy roster',
      variant: 'secondary',
      size: 'sm',
      icon: 'copy',
    })}`,
    preview: defaultPreview,
    footer: `<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.8rem"><span class="eevenkoto-workshop__subgroup-title">Quick presets</span><div>${renderButton(
      { label: 'Roadside Ambush', variant: 'ghost', size: 'sm' },
    )} ${renderButton({ label: 'Bridge Toll', variant: 'ghost', size: 'sm' })}</div></div>`,
  },
};
