import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/content-table.css';
import '@eevenkoto/css/icon.css';
import { renderContentTable } from '@eevenkoto/html';

const base = {
  columns: [{ key: 'name', header: 'Nimi' }, { key: 'status', header: 'Tila' }],
  rows: [
    { readiness: 'success', cells: ['Tulipallo', 'Valmis'] },
    { readiness: 'caution', cells: ['Salamaniskä', 'Ennakko'] },
    { kind: 'locked', notice: { intent: 'info', title: 'Lukittu', body: 'Vaatii Kannattajan roolin.' } },
  ],
} as Parameters<typeof renderContentTable>[0];

const meta: Meta<Parameters<typeof renderContentTable>[0]> = {
  title: 'Domain/Molecules/ContentTable',
  parameters: { docs: { description: { component: "Table with per-row `readiness` and spanning `locked` rows that carry a Notice. Builds on Table, so columns, variants and stripes work the same." } } },
  argTypes: {
    columns: { control: 'object', description: 'Column definitions (`TableColumn[]`).' },
    rows: { control: 'object', description: 'Content or locked rows (`ContentTableRow[]`).' },
    caption: { control: 'text', description: 'Optional accessible `<caption>`.' },
    variant: {
      control: 'select',
      options: ['default', 'numeric', 'pair'],
      table: { defaultValue: { summary: 'default' } },
    },
    stripe: {
      control: 'select',
      options: ['row', 'column', 'none'],
      table: { defaultValue: { summary: 'row' } },
    },
  },
  args: base,
  render: (args) => renderContentTable(args),
};

export default meta;
type Story = StoryObj<Parameters<typeof renderContentTable>[0]>;

export const Default: Story = {};

export const LockedOnly: Story = { args: { rows: [{ kind: 'locked', notice: { intent: 'caution', title: 'Lukittu' } }] } };
