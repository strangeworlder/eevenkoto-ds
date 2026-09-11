import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/frame.css';
import { renderFrame, type FrameProps } from '@eevenkoto/html';

const meta: Meta<FrameProps> = {
  title: 'Core/Atoms/Frame',
  parameters: {
    docs: {
      description: {
        component: 'Portable bordered surface host for charts and contained content.',
      },
    },
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'Inner HTML.',
      table: { type: { summary: 'string' } },
    },
  },
  args: {
    content: '<p style="margin:1.2rem">Framed content</p>',
  },
  render: (args) => renderFrame(args),
};

export default meta;
type Story = StoryObj<FrameProps>;

export const Default: Story = {};
