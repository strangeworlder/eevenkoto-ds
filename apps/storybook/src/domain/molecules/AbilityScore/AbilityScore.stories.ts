// apps/storybook/src/domain/molecules/AbilityScore/AbilityScore.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/stat.css';
import '@eevenkoto/css/ability-score.css';
import { renderAbilityScore, type AbilityScoreProps } from '@eevenkoto/html';

const meta: Meta<AbilityScoreProps> = {
  title: 'Domain/Molecules/AbilityScore',
  parameters: {
    docs: {
      description: {
        component:
          'AbilityScore is one ability column (label + score / modifier / save Stats). For the sandwich panel, see AbilityScoreGroup.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    labelId: { control: 'text', description: 'Optional explicit `id` on `<figcaption>` (wired to `<dl aria-labelledby>`).' },
    score: { control: 'text' },
    modifier: { control: 'text' },
    save: { control: 'text' },
    scoreLabel: { control: 'text', description: 'Visually hidden `<dt>` term for score.', table: { defaultValue: { summary: 'Score' } } },
    modifierLabel: { control: 'text', description: 'Visually hidden `<dt>` term for modifier.', table: { defaultValue: { summary: 'Modifier' } } },
    saveLabel: { control: 'text', description: 'Visually hidden `<dt>` term for saving throw.', table: { defaultValue: { summary: 'Save' } } },
    saveProficient: {
      control: 'boolean',
      description: 'Bright accent on the save shield when proficient.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    proficientLabel: {
      control: 'text',
      description: 'AT suffix when saveProficient is true.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'proficient' },
      },
    },
  },
  render: (args) => renderAbilityScore(args),
};

export default meta;
type Story = StoryObj<AbilityScoreProps>;

export const Default: Story = {
  args: {
    label: 'Karisma',
    score: '16',
    modifier: '+3',
    save: '+5',
    saveProficient: true,
    proficientLabel: 'pätevä',
    scoreLabel: 'Arvo',
    modifierLabel: 'Muuttuja',
    saveLabel: 'Pelastus',
  },
};

export const NotProficient: Story = {
  name: 'Not proficient',
  args: {
    label: 'Ketteryys',
    score: '12',
    modifier: '+1',
    save: '+1',
    scoreLabel: 'Arvo',
    modifierLabel: 'Muuttuja',
    saveLabel: 'Pelastus',
  },
};
