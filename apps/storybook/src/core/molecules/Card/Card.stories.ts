import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/card.css';
import '@eevenkoto/css/button.css';
import '@eevenkoto/css/badge.css';
import { renderBadge, renderButton, renderCard, type CardProps } from '@eevenkoto/html';

const meta: Meta<CardProps> = {
  title: 'Core/Molecules/Card',
  parameters: {
    docs: {
      description: {
        component:
          'Self-contained content surface: `article` + native `header` / flow / `footer`, with surface tiers, accent edges, current-selection ring, header actions, and split banner layout.',
      },
    },
  },
  argTypes: {
    surface: {
      control: 'select',
      options: ['raised', 'subtle', 'sunken'],
      table: {
        type: { summary: "'raised' | 'subtle' | 'sunken'" },
        defaultValue: { summary: 'raised' },
      },
    },
    accent: {
      control: 'select',
      options: ['none', 'top', 'start', 'outline'],
      table: {
        type: { summary: "'none' | 'top' | 'start' | 'outline'" },
        defaultValue: { summary: 'none' },
      },
    },
    current: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    layout: {
      control: 'inline-radio',
      options: ['stack', 'split'],
      table: {
        type: { summary: "'stack' | 'split'" },
        defaultValue: { summary: 'stack' },
      },
    },
    title: { control: 'text', description: 'Header heading text.' },
    titleHtml: { control: 'text', description: 'Trusted inline HTML for header heading.' },
    titleLevel: {
      control: { type: 'inline-radio' },
      options: [2, 3],
      description: 'Heading level for `title`. Default 2.',
    },
    headerActions: { control: 'text', description: 'Trailing actions HTML inside `<header>`.' },
    body: { control: 'text', description: 'Body copy.' },
    actions: { control: 'text', description: 'Card actions HTML.' },
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

export const Surfaces: Story = {
  render: () =>
    `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:var(--eevenkoto-space-4)">` +
    renderCard({
      surface: 'raised',
      title: 'Raised (default)',
      body: 'Standard parchment / obsidian surface for standalone item and feature cards.',
    }) +
    renderCard({
      surface: 'subtle',
      title: 'Subtle',
      body: 'Quiet secondary fill for grouped sidebars, reference summaries, and callout tiles.',
    }) +
    renderCard({
      surface: 'sunken',
      title: 'Sunken',
      body: 'Recessed well surface for nested slots, empty placeholders, or inset panels.',
    }) +
    `</div>`,
};

export const Accents: Story = {
  render: () =>
    `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:var(--eevenkoto-space-4)">` +
    renderCard({
      accent: 'none',
      title: 'None (default)',
      body: 'Hairline subtle boundary.',
    }) +
    renderCard({
      accent: 'top',
      title: 'Top accent',
      body: 'Thick top rule for tier cards and featured compendium blocks.',
    }) +
    renderCard({
      accent: 'start',
      title: 'Start accent',
      body: 'Inline-start bar for lore callouts and subscription banners.',
    }) +
    renderCard({
      accent: 'outline',
      title: 'Outline accent',
      body: 'Strong gold frame around emphasized or featured options.',
    }) +
    `</div>`,
};

export const SplitBanner: Story = {
  args: {
    layout: 'split',
    surface: 'subtle',
    accent: 'start',
    title: 'Unlock full compendium access',
    body: 'Read every creature statblock, spell, and workshop export with an active supporter tier.',
    actions: renderButton({ label: 'Compare tiers', variant: 'primary' }),
  },
};

export const CurrentState: Story = {
  render: () =>
    `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:var(--eevenkoto-space-4);padding:var(--eevenkoto-space-1)">` +
    renderCard({
      title: 'Wanderer',
      headerActions: renderBadge({ label: 'Current plan', intent: 'info' }),
      body: 'Core rulebook rules, character origins, and public SRD creatures.',
      current: true,
    }) +
    renderCard({
      title: 'Chronicler',
      body: 'Full worldbook lore, encounters, and unlimited workshop exports.',
      actions: renderButton({ label: 'Switch plan', variant: 'secondary', size: 'sm' }),
    }) +
    `</div>`,
};

export const HeaderActions: Story = {
  args: {
    titleHtml: 'Ring of <em>Spell Storing</em>',
    headerActions:
      renderBadge({ label: 'Rare', intent: 'info' }) +
      renderButton({ label: 'Copy', variant: 'ghost', size: 'sm', icon: 'copy' }),
    body: 'This ring stores spells cast into it, holding them until the attuned wearer uses them.',
    footer: 'Requires attunement',
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
