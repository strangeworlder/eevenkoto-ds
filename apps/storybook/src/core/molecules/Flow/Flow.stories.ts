// apps/storybook/src/core/molecules/Flow/Flow.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/flow.css';
import '@eevenkoto/css/heading.css';
import '@eevenkoto/css/paragraph.css';
import '@eevenkoto/css/caption.css';
import {
  renderCaption,
  renderFlow,
  renderHeading,
  renderParagraph,
  type FlowProps,
} from '@eevenkoto/html';

const sampleContent = (): string =>
  [
    renderHeading({ level: 2, text: 'Flow owns the gaps' }),
    renderParagraph({
      text: 'Children keep their type styles. Block margins are neutralized so Heading, Paragraph, and Caption no longer stack competing space.',
    }),
    renderParagraph({
      tone: 'secondary',
      text: 'Paragraph-to-paragraph rhythm uses a dedicated flow gap.',
    }),
    renderHeading({ level: 4, text: 'Next cluster' }),
    renderParagraph({ text: 'Content → heading opens more air than heading → content.' }),
    renderCaption({ text: 'Caption sits close to the block it annotates.' }),
  ].join('');

const meta: Meta<FlowProps> = {
  title: 'Core/Molecules/Flow',
  parameters: {
    docs: {
      description: {
        component:
          'Flow stacks primitives with controlled vertical rhythm. Prefer Flow over ad-hoc margins when composing type.',
      },
    },
  },
  argTypes: {
    density: {
      control: 'select',
      options: [undefined, 'tight', 'loose'],
      description: 'Optional density preset for the stack gaps.',
      table: {
        type: { summary: "'tight' | 'loose'" },
        defaultValue: { summary: '—' },
      },
    },
    content: { table: { disable: true } },
  },
  args: {
    content: sampleContent(),
  },
  render: (args) => renderFlow(args),
};

export default meta;
type Story = StoryObj<FlowProps>;

export const Default: Story = {};

export const Tight: Story = {
  args: { density: 'tight' },
};

export const Loose: Story = {
  args: { density: 'loose' },
};
