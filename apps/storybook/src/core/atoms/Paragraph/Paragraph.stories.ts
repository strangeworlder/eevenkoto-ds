// apps/storybook/src/core/atoms/Paragraph/Paragraph.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/paragraph.css';
import { renderParagraph, type ParagraphProps } from '@eevenkoto/html';

const sample =
  'Typography keeps product UI consistent. Prefer semantic body sizes so themes can remap roles without renaming the rem ladder.';

const meta: Meta<ParagraphProps> = {
  title: 'Core/Atoms/Paragraph',
  parameters: {
    docs: {
      description: {
        component: 'Paragraph styles body copy with semantic size and tone.',
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Paragraph copy.',
      table: { type: { summary: 'string' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Maps to `--eevenkoto-font-size-body-*`.',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' },
      },
    },
    tone: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Content color tone.',
      table: {
        type: { summary: "'primary' | 'secondary'" },
        defaultValue: { summary: 'primary' },
      },
    },
  },
  args: {
    text: sample,
    size: 'md',
    tone: 'primary',
  },
  render: (args) => renderParagraph(args),
};

export default meta;
type Story = StoryObj<ParagraphProps>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Secondary: Story = {
  args: { tone: 'secondary' },
};

export const SizeComparison: Story = {
  render: () =>
    `<div>${renderParagraph({
      size: 'sm',
      text: 'Small body — compact supporting paragraphs.',
    })}${renderParagraph({
      size: 'md',
      text: 'Medium body — default reading size.',
    })}${renderParagraph({
      size: 'lg',
      text: 'Large body — matches document body scale.',
    })}</div>`,
};
