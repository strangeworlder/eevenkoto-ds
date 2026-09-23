import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/menu.css';
import '@eevenkoto/css/icon.css';
import '@eevenkoto/css/popover.css';
import '@eevenkoto/css/button.css';
import { renderMenu, renderPopover, type MenuProps } from '@eevenkoto/html';

const accountEntries: MenuProps['entries'] = [
  { kind: 'header', label: 'Account' },
  { id: 'profile', label: 'Profile' },
  { id: 'library', label: 'My library', selected: true },
  { kind: 'separator' },
  { id: 'billing', label: 'Billing', disabled: true },
  { id: 'sign-out', label: 'Sign out' },
];

/** Nested sidebar pattern from eevenko.to (Pelaajahahmot → Lajit → leaves). */
const worldbookEntries: MenuProps['entries'] = [
  {
    kind: 'group',
    id: 'intro',
    label: 'Johdanto',
    children: [
      { id: 'welcome', label: 'Tervetuloa', href: '#welcome' },
      { id: 'how-to', label: 'Miten tätä luetaan', href: '#how-to' },
    ],
  },
  {
    kind: 'group',
    id: 'characters',
    label: 'Pelaajahahmot',
    expanded: true,
    children: [
      { id: 'creation', label: 'Hahmonluonti', href: '#creation' },
      {
        kind: 'group',
        id: 'species',
        label: 'Lajit',
        expanded: true,
        children: [
          { id: 'species-index', label: 'Lajit', href: '#species' },
          { id: 'human', label: 'Ihminen', href: '#human', selected: true, status: 'success', statusLabel: 'Valmis' },
          { id: 'catfolk', label: 'Kissalainen', href: '#catfolk', status: 'success', statusLabel: 'Valmis' },
          { id: 'troll', label: 'Peikko', href: '#troll', status: 'caution', statusLabel: 'Vedos' },
        ],
      },
      {
        kind: 'group',
        id: 'classes',
        label: 'Luokat',
        children: [
          { id: 'barbarian', label: 'Hurjapää', href: '#barbarian', status: 'success', statusLabel: 'Valmis' },
          { id: 'rogue', label: 'Lurjus', href: '#rogue', locked: true, lockedLabel: 'Lukittu', status: 'caution', statusLabel: 'Vedos' },
          { id: 'bard', label: 'Sensaatio', href: '#bard', status: 'success', statusLabel: 'Valmis' },
        ],
      },
    ],
  },
  {
    kind: 'group',
    id: 'rules',
    label: 'Säännöt',
    children: [
      { id: 'combat', label: 'Taistelu', href: '#combat' },
      { id: 'rest', label: 'Lepo', href: '#rest' },
    ],
  },
];

const meta: Meta<MenuProps> = {
  title: 'Core/Molecules/Menu',
  parameters: {
    docs: {
      description: {
        component:
          'Vertical action or navigation list: flat items plus nested `group` branches (<details>). Import icon.css when groups are present.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Accessible name for the group.' },
    embedded: { control: 'boolean', description: 'Flush transparent surface for a sidebar.' },
  },
  render: (args) => renderMenu(args),
};

export default meta;
type Story = StoryObj<MenuProps>;

export const Default: Story = {
  args: {
    label: 'Account',
    entries: accountEntries,
  },
};

export const NestedNav: Story = {
  name: 'Nested nav',
  args: {
    label: 'Worldbook',
    entries: worldbookEntries,
  },
};

export const EmbeddedSidebar: Story = {
  name: 'Embedded sidebar',
  args: {
    label: 'Sivustonavigaatio',
    embedded: true,
    entries: worldbookEntries,
  },
};

export const ItemsOnly: Story = {
  args: {
    label: 'View',
    entries: [
      { id: 'text', label: 'Text' },
      { id: 'srd', label: 'SRD' },
      { id: 'raw', label: 'Raw markup' },
    ],
  },
};

export const Links: Story = {
  args: {
    label: 'Sections',
    entries: [
      { kind: 'header', label: 'Sections' },
      { id: 'spells', label: 'Spells', href: '#spells' },
      { id: 'items', label: 'Items', href: '#items' },
      { id: 'monsters', label: 'Monsters', href: '#monsters' },
    ],
  },
};

export const InsidePopover: Story = {
  render: () =>
    `<span style="position: relative; display: inline-block; margin: 6rem 8rem;">
      <button type="button" class="eevenkoto-button eevenkoto-button--secondary eevenkoto-button--sm">Account</button>
      ${renderPopover({
        placement: 'bottom',
        role: 'group',
        content: renderMenu({ label: 'Account', entries: accountEntries }),
      })}
    </span>`,
};
