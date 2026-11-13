// apps/storybook/src/core/molecules/List/List.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/list.css';
import { renderList, type ListProps } from '@eevenkoto/html';

const sampleItems = [
  { text: 'Inspect the valve before engaging the primary circuit.' },
  { text: 'Record pressure readings at each checkpoint.' },
  { text: 'Signal the canyon team when the latch clears.' },
];

const meta: Meta<ListProps> = {
  title: 'Core/Molecules/List',
  parameters: {
    docs: {
      description: {
        component:
          'List is a content list (`ul` / `ol`) of ListItem rows (`li`). Prefer PropertyList for definitional label→value metadata.',
      },
    },
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of `{ text, html, status }` items.',
      table: { type: { summary: 'ListItemProps[]' } },
    },
    variant: {
      control: 'select',
      options: ['unordered', 'ordered', 'checklist'],
      description: 'Maps to `ul` (disc), `ol` (decimal), or `ul` checklist with status icons.',
      table: {
        type: { summary: "'unordered' | 'ordered' | 'checklist'" },
        defaultValue: { summary: 'unordered' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Maps to `--eevenkoto-font-size-body-*`.',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' },
      },
    },
    tone: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Content color tone.',
      table: {
        type: { summary: "'primary' | 'secondary'" },
        defaultValue: { summary: 'primary' },
      },
    },
  },
  args: {
    items: sampleItems,
    variant: 'unordered',
    size: 'md',
    tone: 'primary',
  },
  render: (args) => renderList(args),
};

export default meta;
type Story = StoryObj<ListProps>;

export const Default: Story = {};

export const Ordered: Story = {
  args: { variant: 'ordered' },
};

export const Checklist: Story = {
  args: {
    variant: 'checklist',
    items: [
      { text: 'Full SRD spell and monster reference', status: 'included' },
      { text: 'Early access to patron worldbook chapters', status: 'accent' },
      { text: 'Offline campaign archive export', status: 'excluded' },
    ],
  },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Secondary: Story = {
  args: { tone: 'secondary' },
};

export const SizeComparison: Story = {
  render: () =>
    `<div>${renderList({
      size: 'sm',
      items: [{ text: 'Small body — compact supporting lists.' }],
    })}${renderList({
      size: 'md',
      items: [{ text: 'Medium body — default reading size.' }],
    })}${renderList({
      size: 'lg',
      items: [{ text: 'Large body — matches document body scale.' }],
    })}</div>`,
};
