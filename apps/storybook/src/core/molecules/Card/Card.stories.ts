import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/card.css';
import { renderCard, type CardProps } from '@eevenkoto/html';

const meta: Meta<CardProps> = {
  title: 'Core/Molecules/Card',
  parameters: {
    docs: {
      description: {
        component:
          'Self-contained content surface: `article` + native `header` / flow / `footer`. Frame stays the thin bordered box; Card owns section rhythm, dividers, and elevation.',
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Header heading text.' },
    titleLevel: {
      control: { type: 'inline-radio' },
      options: [2, 3],
      description: 'Heading level for `title`. Default 2.',
    },
    body: { control: 'text', description: 'Body copy.' },
    footer: { control: 'text', description: 'Footer HTML.' },
    elevated: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    interactive: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    href: { control: 'text', description: 'Wraps the card contents in an inner link.' },
  },
  render: (args) => renderCard(args),
};

export default meta;
type Story = StoryObj<CardProps>;

export const Default: Story = {
  args: {
    title: 'Cloak of Elvenkind',
    body: 'While you wear this cloak with its hood up, Wisdom (Perception) checks made to see you have disadvantage.',
    footer: 'Wondrous item, uncommon',
  },
};

export const Elevated: Story = {
  args: {
    title: 'Cloak of Elvenkind',
    body: 'Raised above the page for overlays and pinned summaries.',
    footer: 'Wondrous item, uncommon',
    elevated: true,
  },
};

export const Interactive: Story = {
  args: {
    title: 'Open the item entry',
    body: 'Interactive cards keep the article host and wrap sections in a link, with hover, focus, and disabled affordances.',
    interactive: true,
    href: '#item',
  },
};

export const BodyOnly: Story = {
  args: {
    body: 'Sections are opt-in — a card with only a body is still a valid card.',
  },
};
