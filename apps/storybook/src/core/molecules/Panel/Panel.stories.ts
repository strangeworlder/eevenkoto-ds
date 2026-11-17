import type { Meta, StoryObj } from '@storybook/html-vite';
import { expect } from 'storybook/test';
import '@eevenkoto/css/panel.css';
import '@eevenkoto/css/button.css';
import '@eevenkoto/css/swatch.css';
import '@eevenkoto/css/chip-group.css';
import {
  renderButton,
  renderChipGroup,
  renderPanel,
  renderSwatch,
  type PanelProps,
} from '@eevenkoto/html';

const meta: Meta<PanelProps> = {
  title: 'Core/Molecules/Panel',
  parameters: {
    docs: {
      description: {
        component:
          'Lightweight inset surface container (`sunken`, `subtle`, `raised`) with optional header lead, title, and trailing actions. Designed for nesting inside `Card`, `Disclosure`, or `Workshop` without doubling Calling Card passe-partout frames.',
      },
    },
  },
  argTypes: {
    id: { control: 'text' },
    label: { control: 'text' },
    surface: {
      control: 'select',
      options: ['sunken', 'subtle', 'raised'],
      table: { defaultValue: { summary: 'sunken' } },
    },
    density: {
      control: 'select',
      options: ['default', 'compact'],
      table: { defaultValue: { summary: 'default' } },
    },
    title: { control: 'text' },
    titleLevel: { control: 'inline-radio', options: [2, 3, 4] },
    hidden: { control: 'boolean' },
    body: { control: 'text' },
    bodyHtml: { control: 'text' },
    headerLead: { control: 'text' },
    headerActions: { control: 'text' },
    content: { control: 'text' },
  },
  args: {
    surface: 'sunken',
    title: 'Valitse sävy',
    body: 'Kevyt upotettu säilö lomake- ja proosakäyttöön.',
  },
  render: (args) => renderPanel(args),
};

export default meta;
type Story = StoryObj<PanelProps>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const panel = canvasElement.querySelector<HTMLElement>('.eevenkoto-panel');
    expect(panel).not.toBeNull();
    const style = getComputedStyle(panel!);
    expect(style.borderRadius).toBe('0px');
  },
};

export const SwatchPickerTray: Story = {
  name: 'Swatch picker tray',
  render: () =>
    renderPanel({
      id: 'picker-tray',
      label: 'Päävärin valitsin',
      surface: 'sunken',
      title: '60 % Pääväri: Sammaleenvihreä',
      headerLead: renderSwatch({ color: '#2c5e4f', size: 'md' }),
      headerActions:
        renderButton({ label: 'Arvo sävy', variant: 'ghost', size: 'sm', icon: 'reroll' }) +
        renderButton({ label: 'Sulje', variant: 'secondary', size: 'sm' }),
      content: renderChipGroup({
        label: 'Metsän sävyt',
        mode: 'single',
        options: [
          { value: 'moss', label: 'Sammaleenvihreä', swatchColor: '#2c5e4f', selected: true },
          { value: 'pine', label: 'Männynhavu', swatchColor: '#1f4439' },
          { value: 'sage', label: 'Salvia', swatchColor: '#6d8b74' },
        ],
      }),
    }),
};

export const ProseBoxInsideDisclosure: Story = {
  name: 'Raised prose panel',
  args: {
    surface: 'raised',
    density: 'compact',
    title: undefined,
    bodyHtml:
      '<p>Pitkät korostamattomat proosakappaleet pysyvät selkeinä erotettuina apusäilössä ilman raskasta Calling Card -kaksoiskehystä.</p>',
  },
};
