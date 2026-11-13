import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/license-bar.css';
import { renderLicenseBar } from '@eevenkoto/html';

const entries: Parameters<typeof renderLicenseBar>[0]['entries'] = [
  { license: 'proprietary', links: [{ label: '© Petri Leinonen 2024–2026', href: '#copyright' }, { label: 'Tietosuoja', href: '#privacy' }] },
  { license: 'open', links: [{ label: 'SRD (CC-BY 4.0)', href: '#license' }, { label: 'Tietosuoja', href: '#privacy' }] },
];

const base = { entries, placement: 'inline' } as Parameters<typeof renderLicenseBar>[0];

const meta: Meta<Parameters<typeof renderLicenseBar>[0]> = {
  title: 'Domain/Molecules/LicenseBar',
  parameters: { docs: { description: { component: "Legal-license strip. `edge` placement is a fixed vertical stripe on the inline-end viewport edge; `inline` renders a plain row. Only the entry for `activeLicense` is visible." } } },
  args: base,
  render: (args) => renderLicenseBar(args),
};

export default meta;
type Story = StoryObj<Parameters<typeof renderLicenseBar>[0]>;

export const Proprietary: Story = {};

export const Open: Story = { args: { activeLicense: 'open' } };

export const EdgeStripe: Story = {
  args: { placement: 'edge' },
  render: (args) => `<div style="position: relative; block-size: 14rem; transform: translateZ(0); overflow: hidden;">${renderLicenseBar(args).replace('<aside ', '<aside style="position: absolute;" ')}</div>`,
};
