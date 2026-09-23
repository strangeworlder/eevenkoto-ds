import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/entity-ref.css';
import '@eevenkoto/css/flow.css';
import { renderEntityRef, type EntityRefProps } from '@eevenkoto/html';

const samples: { kind: NonNullable<EntityRefProps['kind']>; name: string }[] = [
  { kind: 'condition', name: 'Frightened' },
  { kind: 'mechanic', name: 'Advantage' },
  { kind: 'classFeature', name: 'Hurma' },
  { kind: 'class', name: 'Hurjapää' },
  { kind: 'spell', name: 'Aavevalo' },
  { kind: 'item', name: 'Cloak of Elvenkind' },
  { kind: 'creature', name: 'Haukka' },
];

const meta: Meta<EntityRefProps> = {
  title: 'Domain/Atoms/EntityRef',
  parameters: {
    docs: {
      description: {
        component:
          'Inline reference to a rules entity. Specializes Core InlineRef with closed kinds. Kind ink at rest; chip fill/border on hover.',
      },
    },
  },
  argTypes: {
    name: { control: 'text', description: 'Visible entity name.' },
    kind: {
      control: 'select',
      options: ['condition', 'mechanic', 'classFeature', 'class', 'spell', 'item', 'creature'],
      table: { defaultValue: { summary: 'item' } },
    },
    href: { control: 'text', description: 'When set, renders as a link (ignored if unlinked).' },
    unlinked: { control: 'boolean' },
    locked: { control: 'boolean' },
    lockedLabel: { control: 'text' },
  },
  render: (args) => renderEntityRef(args),
};

export default meta;
type Story = StoryObj<EntityRefProps>;

export const Default: Story = {
  args: {
    kind: 'condition',
    name: 'Frightened',
    href: '#frightened',
  },
};

export const Kinds: Story = {
  name: 'Kinds',
  render: () =>
    `<div class="eevenkoto-flow">${samples
      .map(
        (sample) =>
          `<p>${renderEntityRef({ ...sample, href: `#${sample.kind}` })} <code>${sample.kind}</code></p>`,
      )
      .join('')}</div>`,
};

export const Links: Story = {
  name: 'Links',
  render: () =>
    `<p>${samples
      .map((sample) => renderEntityRef({ ...sample, href: '#entity' }))
      .join(' ')}</p>`,
};

export const PlainTags: Story = {
  name: 'Plain tags (no href)',
  render: () =>
    `<p>${samples.map((sample) => renderEntityRef(sample)).join(' ')}</p>`,
};

export const LockedClass: Story = {
  name: 'Locked class (Aavevalo)',
  args: {
    kind: 'class',
    name: 'mystikko',
    href: '/pelaajahahmot/luokat/mystikko',
    locked: true,
    lockedLabel: 'Lukittu',
  },
};

export const Creature: Story = {
  name: 'Creature (Haukka)',
  args: {
    kind: 'creature',
    name: 'Haukka',
    href: '/pelinjohtajalle/vastustajat/haukka',
  },
};

export const InBodyCopy: Story = {
  name: 'In body copy',
  render: () =>
    `<p>${renderEntityRef({
      kind: 'spell',
      name: 'Aavevalo',
      href: '#aavevalo',
    })} lists ${renderEntityRef({
      kind: 'class',
      name: 'mystikko',
      href: '#mystikko',
      locked: true,
      lockedLabel: 'Lukittu',
    })} and ${renderEntityRef({
      kind: 'class',
      name: 'sensaatio',
      href: '#sensaatio',
    })}. A ${renderEntityRef({
      kind: 'creature',
      name: 'Haukka',
      href: '#haukka',
    })} uses ${renderEntityRef({
      kind: 'classFeature',
      name: 'Kynnet',
      href: '#kynnet',
    })}. Gear stays ${renderEntityRef({
      kind: 'item',
      name: 'tikari',
      href: '#tikari',
    })} — do not add a varuste kind.</p>`,
};
