import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/ability-name.css';
import '@eevenkoto/css/flow.css';
import { renderAbilityName, type AbilityNameProps } from '@eevenkoto/html';

const abilities = [
  'Voimakkuus',
  'Ketteryys',
  'Sitkeys',
  'Älykkyys',
  'Viisaus',
  'Karisma',
];

const meta: Meta<AbilityNameProps> = {
  title: 'Domain/Atoms/AbilityName',
  parameters: {
    docs: {
      description: {
        component:
          'AbilityName is the domain atom for RPG ability names. It renders the full ability name when space permits, and automatically collapses to a 3-letter ALLCAPS abbreviation (e.g. "VOI", "KET") when cramped. Multiple abilities can be composed together with conjunctions (e.g. `<AbilityName>Voimakkuus</AbilityName> tai <AbilityName>Ketteryys</AbilityName>`).',
      },
    },
  },
  argTypes: {
    name: { control: 'text', description: 'Full ability name.' },
    short: { control: 'text', description: 'Custom 3-letter abbreviation override.' },
    variant: {
      control: 'select',
      options: ['auto', 'full', 'short'],
      description: 'Display variant: auto (responsive), full, or short.',
      table: { defaultValue: { summary: 'auto' } },
    },
  },
  render: (args) => renderAbilityName(args),
};

export default meta;
type Story = StoryObj<AbilityNameProps>;

export const Default: Story = {
  args: {
    name: 'Voimakkuus',
  },
};

export const AllAbilities: Story = {
  name: 'All core abilities',
  render: () =>
    `<div class="eevenkoto-flow">${abilities
      .map(
        (ab) =>
          `<p>${renderAbilityName({ name: ab })} <code>(${renderAbilityName({ name: ab, variant: 'short' })})</code></p>`,
      )
      .join('')}</div>`,
};

export const ComposedMultiple: Story = {
  name: 'Composed multiple abilities (Voimakkuus tai Ketteryys)',
  render: () =>
    `<p>${renderAbilityName({ name: 'Voimakkuus' })} tai ${renderAbilityName({ name: 'Ketteryys' })}</p>`,
};

export const ForcedShort: Story = {
  name: 'Forced short variant',
  render: () =>
    `<p>${renderAbilityName({ name: 'Voimakkuus', variant: 'short' })} tai ${renderAbilityName({ name: 'Ketteryys', variant: 'short' })}</p>`,
};

export const ResponsiveDemo: Story = {
  name: 'Responsive container simulation',
  render: () => `
    <div class="eevenkoto-flow">
      <p><strong>Normaali leveys:</strong></p>
      <div style="border: 1px dashed var(--eevenkoto-color-boundary-strong); padding: 0.5rem; max-width: 300px;">
        ${renderAbilityName({ name: 'Voimakkuus' })} tai ${renderAbilityName({ name: 'Ketteryys' })}
      </div>

      <p><strong>Ahdas tila (lyhenee muotoon VOI tai KET):</strong></p>
      <div style="border: 1px dashed var(--eevenkoto-color-boundary-strong); padding: 0.5rem; max-width: 120px;">
        ${renderAbilityName({ name: 'Voimakkuus', variant: 'short' })} tai ${renderAbilityName({ name: 'Ketteryys', variant: 'short' })}
      </div>
    </div>
  `,
};
