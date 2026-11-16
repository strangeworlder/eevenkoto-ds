import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/document-header.css';
import { renderDocumentHeader } from '@eevenkoto/html';

const base = {
  heading: '<h1 class="eevenkoto-heading">Velhon käsikirja</h1>',
  readinessLabel: 'Valmis',
  readinessIntent: 'success',
  showLicenseToggle: true,
  selectedLicense: 'proprietary',
  licenseOptions: [{ id: 'proprietary', label: 'Teksti' }, { id: 'open', label: 'SRD' }],
} as Parameters<typeof renderDocumentHeader>[0];

const meta: Meta<Parameters<typeof renderDocumentHeader>[0]> = {
  title: 'Domain/Molecules/DocumentHeader',
  parameters: { docs: { description: { component: "Page-title row: heading, readiness Badge and an optional content-license toggle. Under `selectedLicense=\"open\"` (or any `[data-content-license=\"open\"]` ancestor) the H1 underline turns primary." } } },
  argTypes: {
    id: { control: 'text', description: 'Optional `<header id>`.' },
    heading: { control: 'text', description: 'Pre-rendered heading HTML (HTML renderer).' },
    readinessLabel: { control: 'text', description: 'Optional readiness Badge label.' },
    readinessIntent: {
      control: 'select',
      options: ['neutral', 'info', 'success', 'caution', 'critical', 'admin'],
      table: { defaultValue: { summary: 'neutral' } },
    },
    showLicenseToggle: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    selectedLicense: {
      control: 'inline-radio',
      options: ['proprietary', 'open'],
      table: { defaultValue: { summary: 'proprietary' } },
    },
    licenseOptions: {
      control: 'object',
      description: 'Options forwarded to the license `SegmentedControl`.',
    },
    licenseLabel: {
      control: 'text',
      description: 'Accessible label for the license toggle.',
    },
  },
  args: base,
  render: (args) => renderDocumentHeader(args),
};

export default meta;
type Story = StoryObj<Parameters<typeof renderDocumentHeader>[0]>;

export const Default: Story = {};

export const OpenLicense: Story = { args: { selectedLicense: 'open' } };

export const HeadingOnly: Story = { args: { readinessLabel: undefined, showLicenseToggle: false } };
