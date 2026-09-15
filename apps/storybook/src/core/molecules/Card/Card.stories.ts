import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/card.css';
import { renderCard, type CardProps } from '@eevenkoto/html';

const meta: Meta<CardProps> = {
  title: 'Core/Molecules/Card',
  parameters: {
    docs: {
      description: {
        component:
          'Sectioned surface container: `__header`, `__body`, `__footer`. Frame stays the thin bordered box; Card owns section rhythm, dividers, and elevation.',
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Header text.' },
    body: { control: 'text', description: 'Body copy.' },
    footer: { control: 'text', description: 'Footer HTML.' },
    elevated: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    interactive: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    href: { control: 'text', description: 'Renders the card as a link.' },
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
    body: 'Interactive cards render as a link or button and gain hover, focus, and disabled affordances.',
    interactive: true,
    href: '#item',
  },
};

export const BodyOnly: Story = {
  args: {
    body: 'Sections are opt-in — a card with only a body is still a valid card.',
  },
};
