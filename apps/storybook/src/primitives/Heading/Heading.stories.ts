// apps/storybook/src/primitives/Heading/Heading.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/heading.css';
import '@eevenkoto/css/paragraph.css';
import { renderHeading, renderParagraph, type HeadingArgs } from '@eevenkoto/html';

const meta: Meta<HeadingArgs> = {
  title: 'Primitives/Heading',
  parameters: {
    docs: {
      description: {
        component:
          'Heading uses multi-axis hierarchy (size, weight, case, posture, rules) across six semantic levels.',
      },
    },
  },
  argTypes: {
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: 'Semantic heading level (`h1`–`h6`) within the macro / meso / micro system.',
      table: {
        type: { summary: '1 | 2 | 3 | 4 | 5 | 6' },
        defaultValue: { summary: '2' },
      },
    },
    text: {
      control: 'text',
      description: 'Heading copy.',
      table: { type: { summary: 'string' } },
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
    runIn: {
      control: 'boolean',
      description: 'Level 6 only: run the heading into the following Paragraph.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    level: 2,
    text: 'Section title',
    tone: 'primary',
    runIn: false,
  },
  render: (args) => renderHeading(args),
};

export default meta;
type Story = StoryObj<HeadingArgs>;

export const Default: Story = {};

export const Level1: Story = {
  args: { level: 1, text: 'Page title' },
};

export const Level3: Story = {
  args: { level: 3, text: 'Subsection' },
};

export const Secondary: Story = {
  args: { level: 2, text: 'Secondary tone', tone: 'secondary' },
};

export const AllLevels: Story = {
  render: () =>
    [1, 2, 3, 4, 5, 6]
      .map((level) =>
        renderHeading({
          level: level as 1 | 2 | 3 | 4 | 5 | 6,
          text: `Heading level ${level}`,
        }),
      )
      .join(''),
};

export const MicroCluster: Story = {
  name: 'Micro (H5 + H6)',
  render: () =>
    `${renderHeading({ level: 5, text: 'Cluster label' })}${renderParagraph({
      text: 'H5 sits one step above body size. Small caps, tracking, and a sunken padded band make the cluster readable without undercutting paragraph type.',
    })}${renderHeading({ level: 6, text: 'Inline marker' })}${renderParagraph({
      text: 'Standalone H6 stays bold italic at body size when it is not run in.',
    })}`,
};

export const RunIn: Story = {
  name: 'H6 run-in',
  render: () =>
    `${renderHeading({
      level: 6,
      text: 'Safety protocol',
      runIn: true,
    })}${renderParagraph({
      text: 'Always inspect the valve before engaging the primary circuit.',
    })}`,
};
