// apps/storybook/src/StatblockFeature/StatblockFeature.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/heading.css';
import '@eevenkoto/css/paragraph.css';
import '@eevenkoto/css/statblock-feature.css';
import { renderStatblockFeature, type StatblockFeatureProps } from '@eevenkoto/html';

const meta: Meta<StatblockFeatureProps> = {
  title: 'Domain/Molecules/StatblockFeature',
  parameters: {
    docs: {
      description: {
        component:
          'StatblockFeature is a named action / trait / reaction: H3 run-in + Paragraph, with micro (H6) visual weight.',
      },
    },
  },
  argTypes: {
    name: { control: 'text' },
    level: {
      control: 'select',
      options: [2, 3, 4, 5, 6],
      table: { defaultValue: { summary: '3' } },
    },
    description: { control: 'text' },
    descriptionHtml: {
      control: 'text',
      description: 'Trusted pre-rendered inline HTML (takes precedence over description).',
    },
  },
  render: (args) => renderStatblockFeature(args),
};

export default meta;
type Story = StoryObj<StatblockFeatureProps>;

export const Default: Story = {
  args: {
    name: 'Kalpa',
    description:
      '<em>Lähitaisteluhyökkäys:</em> +3, ulottuvuus 2 m. <em>Osuma:</em> 5 (1n8 + 1) iskuvahinkoa.',
  },
};
