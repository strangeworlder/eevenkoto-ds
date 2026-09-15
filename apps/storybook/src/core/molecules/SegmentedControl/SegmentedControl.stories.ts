import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/styles.css';
import '@eevenkoto/css/segmented-control.css';
import { renderSegmentedControl, type SegmentedControlProps } from '@eevenkoto/html';

const radioOptions = [
  { id: 'text', label: 'Text', tone: 'primary' as const },
  { id: 'srd', label: 'SRD', tone: 'secondary' as const },
];

const linkOptions = [
  { id: 'text', label: 'Text', href: '/docs/example', tone: 'primary' as const },
  { id: 'srd', label: 'SRD', href: '/docs/example/srd', tone: 'secondary' as const },
];

const meta: Meta<SegmentedControlProps> = {
  title: 'Core/Molecules/SegmentedControl',
  parameters: {
    docs: {
      description: {
        component:
          'Exclusive option group with two no-JS modes: native radios (in-page) and links (alternate page versions). Each option can use its own control tone when selected.',
      },
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['radios', 'links'],
      description: 'radios = in-page; links = navigate between documents.',
      table: {
        type: { summary: "'radios' | 'links'" },
        defaultValue: { summary: 'radios' },
      },
    },
    tone: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Default option tone when an option omits its own tone.',
      table: {
        type: { summary: "'primary' | 'secondary'" },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      table: {
        type: { summary: "'sm' | 'md'" },
        defaultValue: { summary: 'md' },
      },
    },
    label: {
      control: 'text',
      description: 'Accessible name (fieldset legend / nav aria-label).',
    },
    name: {
      control: 'text',
      description: 'Shared radio name (radios mode).',
    },
    selectedId: {
      control: 'text',
      description: 'Initial checked radio or aria-current link.',
    },
  },
  render: (args) => renderSegmentedControl(args),
};

export default meta;
type Story = StoryObj<SegmentedControlProps>;

/** Default = radios (in-page, no JS). Per-option tones. */
export const Default: Story = {
  args: {
    mode: 'radios',
    options: radioOptions,
    selectedId: 'text',
    name: 'doc-version',
    size: 'md',
    label: 'Document version',
  },
};

export const Links: Story = {
  name: 'Links (page versions)',
  args: {
    mode: 'links',
    options: linkOptions,
    selectedId: 'text',
    label: 'Document version',
  },
};

export const SameTone: Story = {
  name: 'Same tone (host default)',
  args: {
    mode: 'radios',
    options: [
      { id: 'text', label: 'Text' },
      { id: 'srd', label: 'SRD' },
    ],
    selectedId: 'srd',
    name: 'doc-version-same',
    tone: 'secondary',
    label: 'Document version',
  },
};

export const Sizes: Story = {
  render: () =>
    `<div class="eevenkoto-flow">${(['sm', 'md'] as const)
      .map((size) =>
        renderSegmentedControl({
          mode: 'radios',
          options: radioOptions,
          selectedId: 'text',
          name: `doc-version-${size}`,
          size,
          label: `Size ${size}`,
        }),
      )
      .join('')}</div>`,
};

export const Modes: Story = {
  render: () =>
    `<div class="eevenkoto-flow">
      <p><strong>Radios</strong> (in-page — click SRD; Text selection clears)</p>
      ${renderSegmentedControl({
        mode: 'radios',
        options: radioOptions,
        selectedId: 'text',
        name: 'doc-version-modes-radio',
        label: 'In-page version',
      })}
      <p><strong>Links</strong> (alternate URLs)</p>
      ${renderSegmentedControl({
        mode: 'links',
        options: linkOptions,
        selectedId: 'srd',
        label: 'Page version',
      })}
    </div>`,
};
