import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/map-frame.css';
import { renderMapFrame } from '@eevenkoto/html';

const base = { title: 'Luolaston kellari', scale: '1 ruutu = 5 jalkaa', svgHtml: '<svg viewBox="0 0 120 60" width="240" height="120" role="img" aria-label="Kartta"><rect x="4" y="4" width="112" height="52" fill="none" stroke="currentColor" stroke-width="2"/></svg>', caption: 'Kellarin pohjapiirros.' } as Parameters<typeof renderMapFrame>[0];

const meta: Meta<Parameters<typeof renderMapFrame>[0]> = {
  title: 'Domain/Molecules/MapFrame',
  parameters: { docs: { description: { component: "Figure wrapper for an inline SVG or image map with title, scale and caption." } } },
  args: base,
  render: (args) => renderMapFrame(args),
};

export default meta;
type Story = StoryObj<Parameters<typeof renderMapFrame>[0]>;

export const Default: Story = {};

export const ImageSource: Story = { args: { svgHtml: undefined, src: 'https://placehold.co/320x160', alt: 'Kartta' } };
