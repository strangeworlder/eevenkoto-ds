import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/section-header.css';
import '@eevenkoto/css/link-button.css';
import { renderLinkButton, renderSectionHeader, type SectionHeaderProps } from '@eevenkoto/html';

const meta: Meta<SectionHeaderProps> = {
  title: 'Core/Molecules/SectionHeader',
  parameters: {
    docs: {
      description: {
        component:
          'Editorial and hero header lockup: eyebrow, optional logo, heading, lead copy, actions and a reassurance note.',
      },
    },
  },
  argTypes: {
    id: { control: 'text', description: 'Optional `<header id>`.' },
    eyebrow: { control: 'text' },
    title: { control: 'text' },
    titleHtml: { control: 'text', description: 'Trusted inline HTML for heading.' },
    titleLevel: { control: 'select', options: [1, 2, 3], table: { defaultValue: { summary: '2' } } },
    logo: { control: 'object', description: 'Optional `{ src, alt, width?, height? }` logo.' },
    lead: { control: 'text' },
    leadHtml: { control: 'text', description: 'Trusted inline HTML for lead paragraph.' },
    align: { control: 'select', options: ['start', 'center'], table: { defaultValue: { summary: 'start' } } },
    actions: { control: 'text', description: 'CTA buttons/links HTML.' },
    note: { control: 'object', description: 'Optional `{ icon?, text }` reassurance note.' },
  },
  args: {
    eyebrow: 'Seikkailu',
    title: 'Aavevalon arvoitus',
    lead: 'Neljän hengen seikkailu ensimmäisen tason hahmoille.',
  },
  render: (args) => renderSectionHeader(args),
};

export default meta;
type Story = StoryObj<SectionHeaderProps>;

export const EditorialStart: Story = {};

export const CenteredHeroWithLogoAndActions: Story = {
  name: 'Centered hero with logo and actions',
  render: (args) =>
    renderSectionHeader({
      ...args,
      align: 'center',
      titleLevel: 1,
      logo: { src: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2248%22 height=%2248%22/%3E', alt: 'Eevenkoto', width: 48, height: 48 },
      actions: `${renderLinkButton({ href: '#start', label: 'Aloita' })}${renderLinkButton({ href: '#more', label: 'Lisää', variant: 'secondary' })}`,
      note: { icon: 'lock', text: 'Ei vaadi kirjautumista.' },
    }),
};
