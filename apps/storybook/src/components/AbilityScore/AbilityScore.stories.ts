// apps/storybook/src/components/AbilityScore/AbilityScore.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/stat.css';
import '@eevenkoto/css/ability-score.css';
import '@eevenkoto/css/property.css';
import {
  renderAbilityScore,
  renderAbilityScoreGroup,
  renderPropertyList,
  type AbilityScoreProps,
  type AbilityScoreGroupArgs,
} from '@eevenkoto/html';

const sampleAbilities: AbilityScoreProps[] = [
  {
    label: 'Karisma',
    score: '16',
    modifier: '+3',
    save: '+5',
    saveProficient: true,
    scoreLabel: 'Arvo',
    modifierLabel: 'Muuttuja',
    saveLabel: 'Pelastus',
  },
  {
    label: 'Ketteryys',
    score: '12',
    modifier: '+1',
    save: '+1',
    scoreLabel: 'Arvo',
    modifierLabel: 'Muuttuja',
    saveLabel: 'Pelastus',
  },
  {
    label: 'Sitkeys',
    score: '11',
    modifier: '+0',
    save: '+0',
    scoreLabel: 'Arvo',
    modifierLabel: 'Muuttuja',
    saveLabel: 'Pelastus',
  },
  {
    label: 'Viisaus',
    score: '14',
    modifier: '+2',
    save: '+4',
    saveProficient: true,
    scoreLabel: 'Arvo',
    modifierLabel: 'Muuttuja',
    saveLabel: 'Pelastus',
  },
  {
    label: 'Voimakkuus',
    score: '11',
    modifier: '+0',
    save: '+0',
    scoreLabel: 'Arvo',
    modifierLabel: 'Muuttuja',
    saveLabel: 'Pelastus',
  },
  {
    label: 'Älykkyys',
    score: '12',
    modifier: '+1',
    save: '+1',
    scoreLabel: 'Arvo',
    modifierLabel: 'Muuttuja',
    saveLabel: 'Pelastus',
  },
];

const meta: Meta<AbilityScoreProps> = {
  title: 'Components/AbilityScore',
  parameters: {
    docs: {
      description: {
        component:
          'AbilityScore is one ability column. AbilityScoreGroup is the sandwich panel (optional PropertyList rails + responsive grid).',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    score: { control: 'text' },
    modifier: { control: 'text' },
    save: { control: 'text' },
    saveProficient: {
      control: 'boolean',
      description: 'Bright accent on the save shield when proficient.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  render: (args) => renderAbilityScore(args),
};

export default meta;
type Story = StoryObj<AbilityScoreProps>;
type GroupStory = StoryObj<AbilityScoreGroupArgs>;

export const Default: Story = {
  args: sampleAbilities[0],
};

export const Group: GroupStory = {
  name: 'Ability score group',
  render: () =>
    renderAbilityScoreGroup({
      abilities: sampleAbilities,
      header: renderPropertyList({
        items: [
          { label: 'Puolustus', value: '15' },
          { label: 'Aloite', value: '+1 (11)' },
          { label: 'Osumapisteet', value: '9 (2n8)' },
          { label: 'Nopeus', value: '12 m' },
        ],
      }),
      footer: renderPropertyList({
        items: [
          { label: 'Taidot', value: 'huijaus +5, suostuttelu +5, oivallus +4' },
          { label: 'Varusteet', value: 'kalpa, rintahaarniska' },
          { label: 'Aistit', value: 'vakiotarkkaavaisuus 12' },
          { label: 'Kielet', value: 'yleiskieli sekä kaksi muuta kieltä' },
          { label: 'Haastearvo', value: '1/8 (KOP 25; PB +2)' },
        ],
      }),
    }),
};
