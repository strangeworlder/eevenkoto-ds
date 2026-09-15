import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/entity-ref.css';
import '@eevenkoto/css/flow.css';
import { renderEntityRef, type EntityRefProps } from '@eevenkoto/html';

const samples: { kind: NonNullable<EntityRefProps['kind']>; name: string }[] = [
  { kind: 'condition', name: 'Frightened' },
  { kind: 'mechanic', name: 'Advantage' },
  { kind: 'classFeature', name: 'Sneak Attack' },
  { kind: 'spell', name: 'Cure Wounds' },
  { kind: 'item', name: 'Cloak of Elvenkind' },
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
      options: ['condition', 'mechanic', 'classFeature', 'spell', 'item'],
      table: { defaultValue: { summary: 'item' } },
    },
    href: { control: 'text', description: 'When set, renders as a link.' },
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

export const InBodyCopy: Story = {
  name: 'In body copy',
  render: () =>
    `<p>On a failed save the target is ${renderEntityRef({
      kind: 'condition',
      name: 'Frightened',
      href: '#frightened',
    })} until the end of its next turn, and attacks against it have ${renderEntityRef({
      kind: 'mechanic',
      name: 'Advantage',
      href: '#advantage',
    })}. Spend a use of ${renderEntityRef({
      kind: 'classFeature',
      name: 'Sneak Attack',
      href: '#sneak-attack',
    })} or cast ${renderEntityRef({
      kind: 'spell',
      name: 'Cure Wounds',
      href: '#cure-wounds',
    })} while wearing the ${renderEntityRef({
      kind: 'item',
      name: 'Cloak of Elvenkind',
      href: '#cloak',
    })}.</p>`,
};
