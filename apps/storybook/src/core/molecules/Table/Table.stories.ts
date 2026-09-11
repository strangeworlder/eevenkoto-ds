import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/table-cell.css';
import '@eevenkoto/css/table.css';
import { renderTable, type TableProps } from '@eevenkoto/html';

const defaultColumns = [
  { key: 'name', header: 'Name', kind: 'text' as const },
  { key: 'type', header: 'Type', kind: 'text' as const },
  { key: 'cr', header: 'CR', kind: 'numeric' as const },
];

const defaultRows = [
  ['Wolf', 'Beast', '1/4'],
  ['Owlbear', 'Monstrosity', '3'],
  ['Ancient dragon', 'Dragon', '21'],
];

const numericColumns = [
  { key: 'level', header: 'Level', kind: 'index' as const },
  { key: 'pb', header: 'Proficiency bonus', kind: 'numeric' as const },
  { key: 'cantrips', header: 'Cantrips known', kind: 'numeric' as const },
  { key: 'spells', header: 'Known spells', kind: 'numeric' as const },
  { key: 'slot1', header: '1st-level slots', kind: 'numeric' as const },
  { key: 'slot2', header: '2nd-level slots', kind: 'numeric' as const },
  { key: 'features', header: 'Features', kind: 'text' as const },
];

const numericRows = [
  ['1', '+2', '3', '4', '2', '—', 'Spellcasting, Arcane Recovery'],
  ['2', '+2', '3', '5', '3', '—', 'Font of Magic'],
  ['3', '+2', '3', '6', '4', '2', 'Metamagic'],
  ['4', '+2', '4', '7', '4', '3', 'Ability Score Improvement'],
  ['5', '+3', '4', '8', '4', '3', '—'],
];

const pairColumns = [
  { key: 'roll', header: 'd100', kind: 'index' as const },
  { key: 'result', header: 'Result', kind: 'text' as const },
];

const pairRows = [
  ['01–05', 'A sealed letter arrives from a forgotten ally.'],
  ['06–20', 'Weather turns; travel takes twice as long today.'],
  [
    '21–50',
    'You meet a traveling merchant with uncommon wares and sharper questions.',
  ],
  ['51–85', 'Nothing unusual — the road remains quiet.'],
  ['86–00', 'An omen: the next watch, roll with disadvantage on Wisdom checks.'],
];

const meta: Meta<TableProps> = {
  title: 'Core/Molecules/Table',
  parameters: {
    docs: {
      description: {
        component:
          'Table molecule for default grids, numeric progression charts, and pair/roll tables.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'numeric', 'pair'],
      table: {
        type: { summary: "'default' | 'numeric' | 'pair'" },
        defaultValue: { summary: 'default' },
      },
    },
    stripe: {
      control: 'select',
      options: ['row', 'column', 'none'],
      table: {
        type: { summary: "'row' | 'column' | 'none'" },
        defaultValue: { summary: 'row' },
      },
    },
    caption: { control: 'text' },
  },
  args: {
    variant: 'default',
    stripe: 'row',
    caption: 'Sample creatures',
    columns: defaultColumns,
    rows: defaultRows,
  },
  render: (args) => renderTable(args),
};

export default meta;
type Story = StoryObj<TableProps>;

export const Default: Story = {};

export const NumericProgression: Story = {
  args: {
    variant: 'numeric',
    stripe: 'row',
    caption: 'Class progression (specimen)',
    columns: numericColumns,
    rows: numericRows,
  },
};

export const StripeColumn: Story = {
  args: {
    variant: 'numeric',
    stripe: 'column',
    caption: 'Column stripe specimen',
    columns: numericColumns,
    rows: numericRows,
  },
};

export const PairRoll: Story = {
  args: {
    variant: 'pair',
    stripe: 'row',
    caption: 'Road omens',
    columns: pairColumns,
    rows: pairRows,
  },
};

export const NoStripe: Story = {
  args: {
    stripe: 'none',
    caption: 'Unstriped grid',
    columns: defaultColumns,
    rows: defaultRows,
  },
};
