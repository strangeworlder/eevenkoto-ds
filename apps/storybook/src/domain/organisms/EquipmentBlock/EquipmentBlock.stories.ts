// apps/storybook/src/domain/organisms/EquipmentBlock/EquipmentBlock.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/heading.css';
import '@eevenkoto/css/caption.css';
import '@eevenkoto/css/badge.css';
import '@eevenkoto/css/chip.css';
import '@eevenkoto/css/button.css';
import '@eevenkoto/css/icon.css';
import '@eevenkoto/css/notice.css';
import '@eevenkoto/css/equipment-block.css';
import { renderEquipmentBlock, type EquipmentBlockProps } from '@eevenkoto/html';

const miekka: EquipmentBlockProps = {
  name: 'Miekka',
  nameLevel: 1,
  category: 'Sota-ase · Lähitaistelu',
  price: '20 kr',
  stats: [
    { label: 'Vahinko', value: '1n8 viiltovahinko' },
    { label: 'Ominaisuus', value: 'Voimakkuus' },
    { label: 'Ulottuvuus & heitto', value: '2 m (4/10 m)' },
    { label: 'Käyttö', value: '1 käsi' },
  ],
  traits: ['Viiltävä', 'Tarkka'],
  notes: [
    '<em>Kriittinen osuma:</em> Noppa heitetään maksimivahingon päälle kerran.',
    'Tasapainoinen teräsase, soveltuu yhteen käteen.',
  ],
  copyText: '**Miekka** (Sota-ase, lähitaistelu)\n• Vahinko: 1n8 viiltovahinko\n• Hinta: 20 kr',
  showCopyButton: true,
};

const levyhaarniska: EquipmentBlockProps = {
  name: 'Ritarin levyhaarniska',
  nameLevel: 1,
  category: 'Raskas panssari',
  price: '400 kr',
  stats: [
    { label: 'Puolustus (PL)', value: '15' },
    { label: 'Nopeusvaikutus', value: '−4 m nopeus' },
    { label: 'Hiipiminen', value: 'Haitta' },
    { label: 'Kilpi', value: 'Perinteinen (+1 PL)' },
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
          'EquipmentBlock is the presentation card for weapons, armor, and gear. Analogous to Statblock and Spellblock, it displays equipment stats, damage kesto breakdown, traits chips, notes, and an optional copy-to-clipboard action.',
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
