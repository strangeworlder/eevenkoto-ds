import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/progress-bar.css';
import { renderProgressBar, type ProgressBarProps } from '@eevenkoto/html';

const meta: Meta<ProgressBarProps> = {
  title: 'Core/Atoms/ProgressBar',
  parameters: {
    docs: {
      description: {
        component:
          'Thin progress indicator. Indeterminate by default (page navigation), determinate when `value` is set. `fixed` pins it to the top of the viewport.',
      },
    },
  },
  argTypes: {
    active: { control: 'boolean', description: 'Visible and busy.', table: { defaultValue: { summary: 'false' } } },
    tone: {
      control: 'select',
      options: ['primary', 'accent'],
      description: 'Fill color intent.',
      table: { type: { summary: "'primary' | 'accent'" }, defaultValue: { summary: 'primary' } },
    },
    fixed: { control: 'boolean', description: 'Pin to the viewport top.', table: { defaultValue: { summary: 'false' } } },
    value: { control: { type: 'range', min: 0, max: 100 }, description: 'Determinate percentage (0–100).' },
    label: { control: 'text', description: 'Accessible name.', table: { defaultValue: { summary: 'Loading' } } },
  },
  args: { active: true, tone: 'primary', label: 'Loading' },
  render: (args) => renderProgressBar(args),
};

export default meta;
type Story = StoryObj<ProgressBarProps>;

export const Indeterminate: Story = {};

export const Determinate: Story = { args: { value: 60, label: 'Uploading' } };

export const AccentTone: Story = { args: { tone: 'accent' } };

export const FixedTopBar: Story = {
  args: { fixed: true },
  parameters: { docs: { story: { inline: false, iframeHeight: 80 } } },
};
