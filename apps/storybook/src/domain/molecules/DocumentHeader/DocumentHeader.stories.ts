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
  args: base,
  render: (args) => renderDocumentHeader(args),
};

export default meta;
type Story = StoryObj<Parameters<typeof renderDocumentHeader>[0]>;

export const Default: Story = {};

export const OpenLicense: Story = { args: { selectedLicense: 'open' } };

export const HeadingOnly: Story = { args: { readinessLabel: undefined, showLicenseToggle: false } };
