import type { Meta, StoryObj } from '@storybook/html-vite';
import { expect } from 'storybook/test';
import '@eevenkoto/css/card.css';
import '@eevenkoto/css/button.css';
import '@eevenkoto/css/icon.css';
import '@eevenkoto/css/badge.css';
import { renderBadge, renderButton, renderCard, type CardProps } from '@eevenkoto/html';

const meta: Meta<CardProps> = {
  title: 'Core/Molecules/Card',
  parameters: {
    docs: {
      description: {
        component:
          '1920s Letterpress Calling Card: `article` + native `header` / flow / `footer` with 0px outer cardstock trim, 4px paper margin, concave-scooped inner passe-partout, surface tiers, gilded brass `featured` and club-turquoise `current` frames, header actions, and split banner layout.',
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
    featured: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
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
    titleSize: {
      control: 'inline-radio',
      options: ['md', 'lg'],
      description: 'Header heading size (`md` = heading-4, `lg` = heading-2).',
    },
    eyebrow: { control: 'text', description: 'Optional uppercase eyebrow above title in `<header>`.' },
    id: { control: 'text', description: 'Optional `<article id>`.' },
    className: { control: 'text', description: 'Additional CSS class names on `<article>`.' },
    attributes: { control: 'object', description: 'Optional HTML attributes on `<article>`.' },
    header: { control: 'text', description: 'Custom `<header>` inner HTML (HTML renderer).' },
    headerActions: { control: 'text', description: 'Trailing actions HTML inside `<header>`.' },
    body: { control: 'text', description: 'Body copy.' },
    bodyHtml: { control: 'text', description: 'Trusted pre-rendered HTML body copy.' },
    content: {
      control: 'text',
      description: 'Pre-rendered main body HTML (`children` / default slot in framework wrappers).',
    },
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
  play: async ({ canvasElement }) => {
    const card = canvasElement.querySelector<HTMLElement>('.eevenkoto-card');
    const header = card?.querySelector<HTMLElement>('header');
    const footer = card?.querySelector<HTMLElement>('footer');
    expect(card).not.toBeNull();
    expect(header).not.toBeNull();
    expect(footer).not.toBeNull();

    const cardStyle = getComputedStyle(card!);
    const headerStyle = getComputedStyle(header!);
    const footerStyle = getComputedStyle(footer!);

    expect(cardStyle.borderRadius).toBe('0px');
    expect(parseFloat(cardStyle.paddingTop)).toBeGreaterThanOrEqual(4);
    expect(parseFloat(cardStyle.paddingLeft)).toBeGreaterThanOrEqual(4);
    expect(parseFloat(cardStyle.borderTopWidth)).toBe(1);
    expect(parseFloat(headerStyle.borderBottomWidth)).toBe(1);
    expect(parseFloat(footerStyle.borderTopWidth)).toBe(1);
    expect(parseFloat(headerStyle.fontWeight)).toBeGreaterThanOrEqual(700);
  },
};

export const Surfaces: Story = {
  render: () =>
    `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:var(--eevenkoto-space-4)">` +
    renderCard({
      surface: 'raised',
      title: 'Raised (default)',
      body: 'Standard parchment / obsidian calling card for standalone item and feature entries.',
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

export const Featured: Story = {
  render: () =>
    `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:var(--eevenkoto-space-4)">` +
    renderCard({
      title: 'Standard',
      body: '1px strong outer trim and subtle inner passe-partout.',
    }) +
    renderCard({
      featured: true,
      title: 'Featured',
      body: '2px gilded brass outer trim with matching brass inner passe-partout and dividers.',
    }) +
    renderCard({
      current: true,
      title: 'Current',
      body: '2px club-turquoise outer trim with turquoise inner passe-partout.',
    }) +
    renderCard({
      featured: true,
      current: true,
      title: 'Featured & current',
      body: 'Club-turquoise outer trim paired with a gilded brass inner passe-partout.',
    }) +
    `</div>`,
  play: async ({ canvasElement }) => {
    const cards = canvasElement.querySelectorAll<HTMLElement>('.eevenkoto-card');
    expect(cards.length).toBe(4);
    const standardStyle = getComputedStyle(cards[0]);
    const featuredStyle = getComputedStyle(cards[1]);
    const currentStyle = getComputedStyle(cards[2]);
    const bothStyle = getComputedStyle(cards[3]);

    expect(standardStyle.borderRadius).toBe('0px');
    expect(parseFloat(standardStyle.borderTopWidth)).toBe(1);
    expect(parseFloat(featuredStyle.borderTopWidth)).toBe(2);
    expect(parseFloat(currentStyle.borderTopWidth)).toBe(2);
    expect(parseFloat(bothStyle.borderTopWidth)).toBe(2);
  },
};

export const SplitBanner: Story = {
  args: {
    layout: 'split',
    surface: 'subtle',
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
    body: 'Raised above the page with a crisp cardstock shadow for overlays and pinned summaries.',
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
    body: 'Sections are opt-in — a card with only a body is still a valid calling card.',
  },
};

export const EyebrowAndLargeTitle: Story = {
  name: 'Eyebrow and large result title',
  args: {
    eyebrow: 'Kulttuurinimi · Erentar',
    title: 'Aurelia Korvenheimo',
    titleSize: 'lg',
    headerActions:
      renderBadge({ label: 'Yläluokka', intent: 'info' }) +
      renderButton({ label: 'Kopioi nimi', variant: 'ghost', size: 'sm', icon: 'copy' }),
    body: 'Syntymänimi kulkee suvun hopeisessa sinettirekisterissä.',
  },
};
