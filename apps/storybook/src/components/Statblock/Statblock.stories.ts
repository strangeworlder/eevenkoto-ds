// apps/storybook/src/components/Statblock/Statblock.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/heading.css';
import '@eevenkoto/css/paragraph.css';
import '@eevenkoto/css/caption.css';
import '@eevenkoto/css/property.css';
import '@eevenkoto/css/stat.css';
import '@eevenkoto/css/ability-score.css';
import '@eevenkoto/css/statblock-feature.css';
import '@eevenkoto/css/statblock-section.css';
import '@eevenkoto/css/statblock.css';
import { renderStatblock, type StatblockProps } from '@eevenkoto/html';

const aatelinen: StatblockProps = {
  name: 'Aatelinen',
  flavor:
    'Aateliset ovat poliittisesti vaikutusvaltaisia henkilöitä, joiden asema perustuu syntyperään, varallisuuteen tai hovissa hankittuihin suhteisiin. He kantavat kalpaa pikemmin arvomerkin kuin taistelukokemuksen vuoksi, mutta osaavat silti torjua lyönnin tarpeen tullen. Aatelisen todellinen voima on hänen verkostoissaan ja sanoissaan.',
  typeLine: 'Keskikokoinen, suuri tai pieni humanoidi',
  vitals: [
    { label: 'Puolustus', value: '15' },
    { label: 'Aloite', value: '+1 (11)' },
    { label: 'Osumapisteet', value: '9 (2n8)' },
    { label: 'Nopeus', value: '12 m' },
  ],
  abilities: [
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
  ],
  traits: [
    { label: 'Taidot', value: 'huijaus +5, suostuttelu +5, oivallus +4' },
    { label: 'Varusteet', value: 'kalpa, rintahaarniska' },
    { label: 'Aistit', value: 'vakiotarkkaavaisuus 12' },
    { label: 'Kielet', value: 'yleiskieli sekä kaksi muuta kieltä' },
    { label: 'Haastearvo', value: '1/8 (KOP 25; PB +2)' },
  ],
  sections: [
    {
      title: 'Toiminnot',
      features: [
        {
          name: 'Kalpa',
          description:
            '<em>Lähitaisteluhyökkäys:</em> +3, ulottuvuus 2 m. <em>Osuma:</em> 5 (1n8 + 1) iskuvahinkoa.',
        },
        {
          name: 'Kaksintaistelupistooli',
          description:
            '<em>Kantamahyökkäys:</em> +3, kantama 20/60 m. <em>Osuma:</em> 4 (1n6 + 1) iskuvahinkoa.',
        },
      ],
    },
    {
      title: 'Reaktiot',
      features: [
        {
          name: 'Torjunta',
          description:
            '<em>Laukaisin:</em> Aateliseen osutaan lähitaisteluhyökkäysheitolla hänen ollessa aseistettu. <em>Vastaus:</em> Aatelinen lisää 2 puolustukseensa kyseistä hyökkäystä vastaan, mikä saattaa aiheuttaa hyökkäyksen ohimenon.',
        },
      ],
    },
  ],
};

const meta: Meta<StatblockProps> = {
  title: 'Components/Statblock',
  parameters: {
    docs: {
      description: {
        component:
          'Statblock is the creature-entry organism: name, flavor, type line, ability sandwich, and run-in feature sections.',
      },
    },
  },
  render: (args) => renderStatblock(args),
};

export default meta;
type Story = StoryObj<StatblockProps>;

export const Default: Story = {
  args: aatelinen,
};

export const Aatelinen: Story = {
  name: 'Aatelinen (full entry)',
  args: aatelinen,
};
