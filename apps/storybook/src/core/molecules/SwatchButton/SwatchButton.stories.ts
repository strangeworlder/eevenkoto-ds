import type { Meta, StoryObj } from '@storybook/html-vite';
import { expect } from 'storybook/test';
import '@eevenkoto/css/swatch-button.css';
import '@eevenkoto/css/panel.css';
import { renderPanel, renderSwatchButton, type SwatchButtonProps } from '@eevenkoto/html';

const meta: Meta<SwatchButtonProps> = {
  title: 'Core/Molecules/SwatchButton',
  parameters: {
    docs: {
      description: {
        component:
          'Interactive color-role selector button (`<button type="button">`) with full-bleed swatch background color (`--eevenkoto-swatch-button-color`), automatic `contrast-color()` foreground contrast, concave scooped corners (`corner-shape: scoop`), role label, shade name, state hint, and engraved chevron icon.',
      },
    },
  },
  argTypes: {
    id: { control: 'text' },
    color: { control: 'color' },
    roleLabel: { control: 'text' },
    label: { control: 'text' },
    hint: { control: 'text' },
    expanded: { control: 'boolean' },
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
    controls: { control: 'text' },
  },
  args: {
    color: '#2c5e4f',
    roleLabel: '60 % Pääväri',
    label: 'Sammaleenvihreä',
    hint: 'Vaihda sävy',
    expanded: false,
  },
  render: (args) => renderSwatchButton(args),
};

export default meta;
type Story = StoryObj<SwatchButtonProps>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const btn = canvasElement.querySelector<HTMLButtonElement>('.eevenkoto-swatch-button');
    expect(btn).not.toBeNull();
    expect(btn?.getAttribute('aria-expanded')).toBe('false');
    expect(btn?.querySelector('.eevenkoto-swatch')).toBeNull();
    expect(btn?.querySelector('.eevenkoto-swatch-button__chevron')).not.toBeNull();
    expect(btn?.style.getPropertyValue('--eevenkoto-swatch-button-color')).toBe('#2c5e4f');
  },
};

export const Expanded: Story = {
  args: {
    color: '#8c3b2b',
    roleLabel: '30 % Korostusväri',
    label: 'Poltettu sienna',
    hint: 'Sulje valitsin',
    expanded: true,
  },
  play: async ({ canvasElement }) => {
    const btn = canvasElement.querySelector<HTMLButtonElement>('.eevenkoto-swatch-button');
    expect(btn?.getAttribute('aria-expanded')).toBe('true');
    expect(btn?.classList.contains('eevenkoto-swatch-button--active')).toBe(true);
  },
};

export const WithControlledPanel: Story = {
  name: 'With controlled Panel',
  render: () =>
    `<div style="display:flex;flex-direction:column;gap:var(--eevenkoto-space-3)">` +
    renderSwatchButton({
      color: '#8c3b2b',
      roleLabel: '30 % Korostusväri',
      label: 'Poltettu sienna',
      hint: 'Sulje valitsin',
      expanded: true,
      controls: 'swatch-picker-tray',
    }) +
    renderPanel({
      id: 'swatch-picker-tray',
      label: 'Korostusvärin sävyt',
      surface: 'sunken',
      title: 'Poltettu sienna',
      body: 'Esimerkkitarjotin ohjattuna SwatchButtonin aria-controls-tunnisteella.',
    }) +
    `</div>`,
};

export const Disabled: Story = {
  args: {
    color: '#9aa0a6',
    roleLabel: '10 % Tehoste',
    label: 'Lukittu sävy',
    hint: 'Ei muokattavissa',
    disabled: true,
  },
};

export const RoleRow: Story = {
  name: 'Palette role row',
  render: () =>
    `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:var(--eevenkoto-space-3)">` +
    renderSwatchButton({
      color: '#2c5e4f',
      roleLabel: '60 % Pääväri',
      label: 'Sammaleenvihreä',
      hint: 'Vaihda',
      expanded: false,
    }) +
    renderSwatchButton({
      color: '#8c3b2b',
      roleLabel: '30 % Tukiväri',
      label: 'Poltettu sienna',
      hint: 'Sulje',
      expanded: true,
    }) +
    renderSwatchButton({
      color: '#e8e0cf',
      roleLabel: '10 % Tehoste',
      label: 'Luonnonpellava',
      hint: 'Vaihda',
      expanded: false,
    }) +
    `</div>`,
};
