import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/content-gate.css';
import '@eevenkoto/css/link-button.css';
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
  parameters: {
    docs: {
      description: {
        component:
          "Full-page gate shown when the reader's tier cannot open a document: readiness Badge + lock, heading, copy, current-vs-required tier comparison strip, actions, live status line and an optional dev footer.",
      },
    },
  },
  argTypes: {
    id: { control: 'text', description: 'Optional `<section id>`.' },
    readinessLabel: { control: 'text', description: 'Readiness Badge label.' },
    readinessIntent: {
      control: 'select',
      options: ['neutral', 'info', 'success', 'caution', 'critical', 'admin'],
    },
    lockLabel: { control: 'text', description: 'Accessible label for the lock icon.' },
    title: { control: 'text', description: 'Gate heading text.' },
    titleLevel: {
      control: 'inline-radio',
      options: [1, 2, 3],
      table: { defaultValue: { summary: '2' } },
    },
    description: { control: 'text', description: 'Plain-text explanation copy.' },
    descriptionHtml: { control: 'text', description: 'Trusted HTML explanation copy.' },
    currentTierLabel: { control: 'text', description: 'Current reader tier name.' },
    currentTierPrefix: { control: 'text', description: 'Prefix before `currentTierLabel`.' },
    requiredTierLabel: { control: 'text', description: 'Required tier name.' },
    requiredTierPrefix: { control: 'text', description: 'Prefix before `requiredTierLabel`.' },
    actions: { control: 'text', description: 'CTA HTML inside `.eevenkoto-content-gate__actions`.' },
    statusMessage: { control: 'text', description: 'Live status message (`role="status"`).' },
    footer: { control: 'text', description: 'Optional developer/preview footer HTML.' },
  },
  args: base,
  render: (args) => renderContentGate(args),
};

export default meta;
type Story = StoryObj<Parameters<typeof renderContentGate>[0]>;

export const Default: Story = {};

export const WithStatus: Story = { args: { statusMessage: 'Tarkistetaan tilausta…' } };

export const WithDevFooter: Story = { args: { footer: '<small>Dev: vaihda rooli</small>' } };
