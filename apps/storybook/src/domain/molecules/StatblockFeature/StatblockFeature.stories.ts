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
    description: { control: 'text' },
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
