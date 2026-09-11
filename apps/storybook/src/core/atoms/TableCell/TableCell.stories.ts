import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/table-cell.css';
import '@eevenkoto/css/table.css';
import { renderTableCell, type TableCellProps } from '@eevenkoto/html';

const meta: Meta<TableCellProps> = {
  title: 'Core/Atoms/TableCell',
  parameters: {
    docs: {
      description: {
        component: 'Table cell atom with index, numeric, and text kinds.',
      },
    },
  },
  argTypes: {
    text: { control: 'text', table: { type: { summary: 'string' } } },
    kind: {
      control: 'select',
      options: ['index', 'numeric', 'text'],
      table: {
        type: { summary: "'index' | 'numeric' | 'text'" },
        defaultValue: { summary: 'text' },
      },
    },
    header: { control: 'boolean' },
    angled: { control: 'boolean' },
    scope: {
      control: 'select',
      options: ['col', 'row', undefined],
    },
  },
  args: {
    text: '12',
    kind: 'numeric',
    header: false,
  },
  render: (args) =>
    `<table style="border-collapse:collapse"><tbody><tr>${renderTableCell(args)}</tr></tbody></table>`,
};

export default meta;
type Story = StoryObj<TableCellProps>;

export const Default: Story = {};

export const Index: Story = {
  args: { text: '3', kind: 'index' },
};

export const Text: Story = {
  args: { text: 'Extra Attack', kind: 'text' },
};

export const NumericHeader: Story = {
  args: {
    text: 'Known spells',
    kind: 'numeric',
    header: true,
    scope: 'col',
    angled: true,
    tabIndex: 0,
  },
  render: (args) =>
    `<table class="eevenkoto-table eevenkoto-table--numeric" style="border-collapse:collapse"><thead><tr>${renderTableCell(args)}</tr></thead></table>`,
};
