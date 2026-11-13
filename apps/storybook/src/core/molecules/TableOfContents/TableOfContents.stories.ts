import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/table-of-contents.css';
import { renderTableOfContents, type TableOfContentsProps } from '@eevenkoto/html';

const groups: TableOfContentsProps['groups'] = [
  {
    label: 'Perusteet',
    items: [
      { id: 'intro', href: '#intro', label: 'Johdanto', current: true },
      { id: 'rules', href: '#rules', label: 'Säännöt' },
    ],
  },
  {
    label: 'Lisätiedot',
    items: [{ id: 'appendix', href: '#appendix', label: 'Liite' }],
  },
];

const meta: Meta<TableOfContentsProps> = {
  title: 'Core/Molecules/TableOfContents',
  parameters: {
    docs: {
      description: {
        component:
          'Semantic outline navigation. `rail` is a vertical list; `collapsible` is a sticky `<details>` disclosure; `auto` switches between them at `64rem`. Links carry `data-toc-target` for host scrollspy scripts.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['auto', 'rail', 'collapsible'],
      table: { type: { summary: "'auto' | 'rail' | 'collapsible'" }, defaultValue: { summary: 'auto' } },
    },
    label: { control: 'text' },
    toggleLabel: { control: 'text' },
    open: { control: 'boolean' },
  },
  args: { groups, label: 'Sivun sisältö', toggleLabel: 'Tällä sivulla' },
  render: (args) => renderTableOfContents(args),
};

export default meta;
type Story = StoryObj<TableOfContentsProps>;

export const Rail: Story = { args: { variant: 'rail' } };

export const Collapsible: Story = { args: { variant: 'collapsible', open: true } };

export const AutoResponsive: Story = { args: { variant: 'auto' } };
