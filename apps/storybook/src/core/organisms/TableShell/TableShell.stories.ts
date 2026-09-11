import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/frame.css';
import '@eevenkoto/css/scroll.css';
import '@eevenkoto/css/caption.css';
import '@eevenkoto/css/table-cell.css';
import '@eevenkoto/css/table.css';
import '@eevenkoto/css/table-shell.css';
import {
  renderTable,
  renderTableShell,
  type TableShellProps,
} from '@eevenkoto/html';

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

const tableHtml = renderTable({
  variant: 'numeric',
  stripe: 'row',
  caption: 'Class progression in a shell',
  columns: numericColumns,
  rows: numericRows,
});

type ShellStoryProps = TableShellProps & { constrain?: boolean };

const meta: Meta<ShellStoryProps> = {
  title: 'Core/Organisms/TableShell',
  parameters: {
    docs: {
      description: {
        component:
          'Core organism composing Frame + Scroll + Table, with a footer slot for a future Pager.',
      },
    },
  },
  argTypes: {
    frame: { control: 'boolean' },
    scroll: { control: 'boolean' },
    scrollAxis: {
      control: 'select',
      options: ['x', 'y', 'both'],
    },
    footer: { control: 'text' },
  },
  args: {
    table: tableHtml,
    frame: true,
    scroll: true,
    scrollAxis: 'x',
    footer: '',
    constrain: true,
  },
  render: (args) => {
    const { constrain, ...shell } = args;
    const html = renderTableShell(shell);
    return constrain
      ? `<div style="max-width:28rem">${html}</div>`
      : html;
  },
};

export default meta;
type Story = StoryObj<ShellStoryProps>;

export const Default: Story = {};

export const WithPagerPlaceholder: Story = {
  args: {
    footer:
      '<p class="eevenkoto-caption eevenkoto-caption--secondary" style="margin:0">Pager slot — put Pager here when it ships.</p>',
    constrain: false,
  },
};

export const WithoutFrame: Story = {
  args: {
    frame: false,
    constrain: true,
  },
};
