// apps/storybook/src/domain/organisms/AbilityScoreGroup/AbilityScoreGroup.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/stat.css';
import '@eevenkoto/css/ability-score.css';
import '@eevenkoto/css/property.css';
import {
  renderAbilityScoreGroup,
  renderPropertyList,
  type AbilityScoreGroupProps,
  type AbilityScoreProps,
} from '@eevenkoto/html';

const sampleAbilities: AbilityScoreProps[] = [
  {
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
    proficientLabel: 'pätevä',
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

const meta: Meta<AbilityScoreGroupProps> = {
  title: 'Domain/Organisms/AbilityScoreGroup',
  parameters: {
    docs: {
      description: {
        component:
          'AbilityScoreGroup is the sandwich organism: optional PropertyList rails + a responsive AbilityScore grid.',
      },
    },
  },
  render: (args) => renderAbilityScoreGroup(args),
};

export default meta;
type Story = StoryObj<AbilityScoreGroupProps>;

export const Default: Story = {
  name: 'With vitals and details',
  args: {
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
  },
};

export const GridOnly: Story = {
  name: 'Grid only',
  args: {
    abilities: sampleAbilities,
  },
};
