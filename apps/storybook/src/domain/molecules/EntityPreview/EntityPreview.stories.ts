import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/entity-preview.css';
import '@eevenkoto/css/link-button.css';
import { renderEntityPreview } from '@eevenkoto/html';

const base = { title: 'Tulipallo', kind: 'spell', badge: { label: 'Loitsu', intent: 'info' }, body: 'Räjähtävä pallo tulta.', footerLink: { href: '#spell', label: 'Avaa sivu' } } as Parameters<typeof renderEntityPreview>[0];

const meta: Meta<Parameters<typeof renderEntityPreview>[0]> = {
  title: 'Domain/Molecules/EntityPreview',
  parameters: { docs: { description: { component: "TooltipCard specialised for referenced entities: optional kind badge, body, truncated note and footer link. A Statblock/Spellblock in the body renders flush." } } },
  argTypes: {
    title: { control: 'text', description: 'Entity heading text.' },
    titleLevel: {
      control: 'inline-radio',
      options: [2, 3],
      table: { defaultValue: { summary: '2' } },
    },
    kind: {
      control: 'select',
      options: [
        'condition',
        'mechanic',
        'ability',
        'classFeature',
        'feat',
        'class',
        'species',
        'culture',
        'background',
        'spell',
        'item',
        'creature',
      ],
      description: 'Sets `data-entity-kind` on the preview card.',
    },
    badge: { control: 'object', description: 'Optional `BadgeProps` inside `.eevenkoto-entity-preview__meta`.' },
    body: { control: 'text', description: 'Plain-text body copy.' },
    bodyHtml: { control: 'text', description: 'Trusted pre-rendered HTML body.' },
    content: { control: 'text', description: 'Pre-rendered body HTML (`children` / default slot in framework wrappers).' },
    truncatedLabel: { control: 'text', description: 'Optional note shown when preview copy was truncated.' },
    footerLink: { control: 'object', description: 'Optional footer `LinkButtonProps`.' },
    flush: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
  },
  args: base,
  render: (args) => renderEntityPreview(args),
};

export default meta;
type Story = StoryObj<Parameters<typeof renderEntityPreview>[0]>;

export const Default: Story = {};

export const Truncated: Story = { args: { truncatedLabel: 'Sisältö lyhennetty', flush: true } };
