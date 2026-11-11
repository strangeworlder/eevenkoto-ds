import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/workshop.css';
import '@eevenkoto/css/card.css';
import '@eevenkoto/css/heading.css';
import '@eevenkoto/css/paragraph.css';
import '@eevenkoto/css/field.css';
import '@eevenkoto/css/input.css';
import '@eevenkoto/css/select.css';
import '@eevenkoto/css/stepper.css';
import '@eevenkoto/css/segmented-control.css';
import {
  renderWorkshop,
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
          'Generalized 2-column workbench layout organism (header bar, control groups, and sticky live preview column) shared across interactive generators and builders.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Optional accessible region label.' },
    controlsWidth: {
      control: 'text',
      description: 'CSS Grid track override for `--eevenkoto-workshop-controls-width`.',
    },
    header: { control: 'text' },
    controls: { control: 'text' },
    preview: { control: 'text' },
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
