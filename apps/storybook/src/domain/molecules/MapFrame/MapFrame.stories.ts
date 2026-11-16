import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/map-frame.css';
import { renderMapFrame } from '@eevenkoto/html';

const base = { title: 'Luolaston kellari', scale: '1 ruutu = 5 jalkaa', svgHtml: '<svg viewBox="0 0 120 60" width="240" height="120" role="img" aria-label="Kartta"><rect x="4" y="4" width="112" height="52" fill="none" stroke="currentColor" stroke-width="2"/></svg>', caption: 'Kellarin pohjapiirros.' } as Parameters<typeof renderMapFrame>[0];

const meta: Meta<Parameters<typeof renderMapFrame>[0]> = {
  title: 'Domain/Molecules/MapFrame',
  parameters: { docs: { description: { component: "Figure wrapper for an inline SVG or image map with title, scale and caption." } } },
  argTypes: {
    id: { control: 'text', description: 'Optional `<figure id>`.' },
    title: { control: 'text', description: 'Map header title.' },
    scale: { control: 'text', description: 'Map scale note (e.g. `1 ruutu = 5 jalkaa`).' },
    svgHtml: { control: 'text', description: 'Trusted inline `<svg>` markup.' },
    src: { control: 'text', description: 'Image URL when not using `svgHtml`.' },
    alt: { control: 'text', description: 'Image `alt` text.' },
    caption: { control: 'text', description: 'Plain-text `<figcaption>`.' },
    captionHtml: { control: 'text', description: 'Trusted inline HTML `<figcaption>`.' },
  },
  args: base,
  render: (args) => renderMapFrame(args),
};

export default meta;
type Story = StoryObj<Parameters<typeof renderMapFrame>[0]>;

export const Default: Story = {};

export const ImageSource: Story = { args: { svgHtml: undefined, src: 'https://placehold.co/320x160', alt: 'Kartta' } };
