import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/button.css';
import '@eevenkoto/css/stepper.css';
import { renderStepper, type StepperProps } from '@eevenkoto/html';

const meta: Meta<StepperProps> = {
  title: 'Core/Molecules/Stepper',
  parameters: {
    docs: {
      description: {
        component:
          'Compact increment/decrement numeric control with visible title, optional mechanics description, and boundary enforcement.',
      },
    },
  },
  argTypes: {
    name: { control: 'text', description: 'Form field identifier.' },
    label: { control: 'text', description: 'Visible title/label.' },
    description: { control: 'text', description: 'Optional mechanics description.' },
    value: { control: 'number', table: { defaultValue: { summary: '0' } } },
    min: { control: 'number', table: { defaultValue: { summary: '0' } } },
    max: { control: 'number', table: { defaultValue: { summary: '10' } } },
    step: { control: 'number', table: { defaultValue: { summary: '1' } } },
    disabled: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
  },
  render: (args) => renderStepper(args),
};

export default meta;
type Story = StoryObj<StepperProps>;

export const Default: Story = {
  args: {
    name: 'ammunition',
    label: 'Nuolien lukumäärä',
    value: 12,
    min: 0,
    max: 30,
  },
};

export const WithDescription: Story = {
  args: {
    name: 'iskunvaimennus',
    label: 'Iskunvaimennus',
    description: '+1 murskaussuojaan (MS) (+50 % hinta / taso)',
    value: 2,
    min: 0,
    max: 5,
  },
};

export const AtBoundary: Story = {
  args: {
    name: 'vahvistettu',
    label: 'Vahvistettu',
    description: '+1 puolustukseen (PL) (+50 % hinta)',
    value: 0,
    min: 0,
    max: 3,
  },
};

export const Disabled: Story = {
  args: {
    name: 'locked-stepper',
    label: 'Erityinen parannus',
    description: 'Lukittu ominaisuus.',
    value: 0,
    disabled: true,
  },
};
