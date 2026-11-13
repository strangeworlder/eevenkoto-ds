import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/content-gate.css';
import { renderContentGate } from '@eevenkoto/html';

const base = {
  readinessLabel: 'Ennakko',
  readinessIntent: 'caution',
  lockLabel: 'Lukittu',
  title: 'Tämä sisältö on lukittu',
  description: 'Ennakkoversiot ovat Kannattajille.',
  currentTierLabel: 'Seuraaja',
  currentTierPrefix: 'Nykytilasi:',
  requiredTierLabel: 'Kannattaja',
  requiredTierPrefix: 'Vaadittu rooli:',
  actions: '<a class="eevenkoto-link-button" href="#join">Liity Kannattajaksi</a>',
} as Parameters<typeof renderContentGate>[0];

const meta: Meta<Parameters<typeof renderContentGate>[0]> = {
  title: 'Domain/Organisms/ContentGate',
  parameters: { docs: { description: { component: "Full-page gate shown when the reader's tier cannot open a document: readiness Badge + lock, heading, copy, current-vs-required tier pill, actions, live status line and an optional dev footer." } } },
  args: base,
  render: (args) => renderContentGate(args),
};

export default meta;
type Story = StoryObj<Parameters<typeof renderContentGate>[0]>;

export const Default: Story = {};

export const WithStatus: Story = { args: { statusMessage: 'Tarkistetaan tilausta…' } };

export const WithDevFooter: Story = { args: { footer: '<small>Dev: vaihda rooli</small>' } };
