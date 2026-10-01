// apps/storybook/src/domain/organisms/EquipmentBlock/EquipmentBlock.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/heading.css';
import '@eevenkoto/css/caption.css';
import '@eevenkoto/css/badge.css';
import '@eevenkoto/css/chip.css';
import '@eevenkoto/css/button.css';
import '@eevenkoto/css/icon.css';
import '@eevenkoto/css/notice.css';
import '@eevenkoto/css/ability-name.css';
import '@eevenkoto/css/equipment-block.css';
import { renderEquipmentBlock, type EquipmentBlockProps } from '@eevenkoto/html';

const miekka: EquipmentBlockProps = {
  name: 'Miekka',
  nameLevel: 1,
  category: 'Sota-ase · Lähitaistelu',
  price: '20 kr',
  stats: [
    { label: 'Vahinko', value: '1n8', subValue: 'viilto', emphasis: true },
    { label: 'Omin.', abilities: ['Voimakkuus'] },
    {
      label: 'Ulottuvuus & heitto',
      subItems: [
        { label: 'Ulottuvuus', value: '2 m' },
        { label: 'Heitto', value: '4/10 m' },
      ],
    },
  ],
  traits: ['Viiltävä', 'Tarkka'],
  notes: [
    '<em>Kriittinen osuma:</em> Noppa heitetään maksimivahingon päälle kerran.',
    'Tasapainoinen teräsase, soveltuu yhteen käteen.',
  ],
  copyText: '**Miekka** (Sota-ase, lähitaistelu)\n• Vahinko: 1n8 (viilto)\n• Hinta: 20 kr',
  showCopyButton: true,
};

const kalpa: EquipmentBlockProps = {
  name: 'Kalpa',
  nameLevel: 1,
  category: 'Sota-ase · Lähitaistelu',
  price: '25 kr',
  stats: [
    { label: 'Vahinko', value: '1n8', subValue: 'pisto', emphasis: true },
    { label: 'Omin.', abilities: ['Voimakkuus', 'Ketteryys'] },
    {
      label: 'Ulottuvuus & heitto',
      subItems: [
        { label: 'Ulottuvuus', value: '2 m' },
        { label: 'Heitto', value: '6/16 m' },
      ],
    },
  ],
  traits: ['Tarkkuus', 'Kevyt', 'Pistävä'],
  notes: [
    'Monipuolinen pistomiekka. Käyttää joko Voimakkuutta tai Ketteryyttä (lyhenee tilarajoitteissa muotoon VOI tai KET).',
  ],
  copyText: '**Kalpa** (Sota-ase, lähitaistelu)\n• Vahinko: 1n8 (pisto)\n• Ominaisuus: Voimakkuus tai Ketteryys\n• Hinta: 25 kr',
  showCopyButton: true,
};

const kivaari: EquipmentBlockProps = {
  name: 'Kivääri',
  nameLevel: 1,
  category: 'Sota-ase · Kantama-ase',
  price: '35 kr',
  stats: [
    { label: 'Vahinko', value: '1n10', subValue: 'pisto', emphasis: true },
    { label: 'Omin.', abilities: ['Ketteryys'] },
    { label: 'Kantama', value: '30/90 m' },
  ],
  traits: ['Pistävä', 'Raskas'],
  notes: ['Pitkän kantaman ase. Vaatii kaksi kättä.'],
  copyText: '**Kivääri** (Sota-ase, kantama-ase)\n• Vahinko: 1n10 (pisto)\n• Kantama: 30/90 m\n• Hinta: 35 kr',
  showCopyButton: true,
};

const levyhaarniska: EquipmentBlockProps = {
  name: 'Ritarin levyhaarniska',
  nameLevel: 1,
  category: 'Raskas panssari',
  price: '400 kr',
  stats: [
    { label: 'Puolustus (PL)', value: '15', emphasis: true },
    { label: 'Nopeus', value: '−4 m nopeus' },
    { label: 'Hiipiminen', value: 'Haitta' },
  ],
  kesto: {
    title: 'Vahingon kesto',
    base: 3,
    bludgeoning: 4,
    slashing: 4,
    piercing: 4,
    labels: {
      base: 'Perus',
      bludgeoning: 'Murskaus',
      slashing: 'Viilto',
      piercing: 'Pisto',
    },
  },
  traits: ['Iskunvaimennus (1x)', 'Leikkauskestävyys (1x)', 'Pistosuojaus (1x)', 'Tukiranka'],
  notes: [
    'Etu voimakkuuspelastusheittoihin ja vastustettuihin voimakkuusheittoihin.',
    'Haitta kiipeämiseen ja uimiseen.',
  ],
  copyText: '**Ritarin levyhaarniska** (Raskas panssari)\n• PL: 15\n• Kesto: perus 3 (murskaus 4, viilto 4, pisto 4)',
  showCopyButton: true,
};

const meta: Meta<EquipmentBlockProps> = {
  title: 'Domain/Organisms/EquipmentBlock',
  parameters: {
    docs: {
      description: {
        component:
          'EquipmentBlock is the presentation card for weapons, armor, and gear. Analogous to Statblock and Spellblock, it displays equipment stats in a responsive 3-box band, damage kesto breakdown, traits chips, notes, and an optional copy-to-clipboard action.',
      },
    },
  },
  render: (args) => renderEquipmentBlock(args),
};

export default meta;
type Story = StoryObj<EquipmentBlockProps>;

export const Default: Story = {
  args: miekka,
};

export const Weapon: Story = {
  name: 'Ase (Miekka)',
  args: miekka,
};

export const MultiAbilityWeapon: Story = {
  name: 'Ase (Useampi ominaisuus / Kalpa)',
  args: kalpa,
};

export const RangedWeapon: Story = {
  name: 'Ase (Kantama-ase / Kivääri)',
  args: kivaari,
};

export const Armor: Story = {
  name: 'Haarniska (Levyhaarniska)',
  args: levyhaarniska,
};

export const EmbedNameLevel: Story = {
  name: 'Embed (nameLevel 2)',
  args: {
    ...miekka,
    nameLevel: 2,
  },
};
