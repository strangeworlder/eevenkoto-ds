// apps/storybook/src/components/StatblockSection/StatblockSection.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/heading.css';
import '@eevenkoto/css/paragraph.css';
import '@eevenkoto/css/statblock-feature.css';
import '@eevenkoto/css/statblock-section.css';
import { renderStatblockSection, type StatblockSectionProps } from '@eevenkoto/html';

const meta: Meta<StatblockSectionProps> = {
  title: 'Components/StatblockSection',
  parameters: {
    docs: {
      description: {
        component:
          'StatblockSection is an H2 title plus stacked StatblockFeature entries. Visual weight: meso H3 for the title.',
      },
    },
  },
  render: (args) => renderStatblockSection(args),
};

export default meta;
type Story = StoryObj<StatblockSectionProps>;

export const Default: Story = {
  args: {
    title: 'Toiminnot',
    features: [
      {
        name: 'Kalpa',
        description:
          '<em>Lähitaisteluhyökkäys:</em> +3, ulottuvuus 2 m. <em>Osuma:</em> 5 (1n8 + 1) iskuvahinkoa.',
      },
      {
        name: 'Kaksintaistelupistooli',
        description:
          '<em>Kantamahyökkäys:</em> +3, kantama 20/60 m. <em>Osuma:</em> 4 (1n6 + 1) iskuvahinkoa.',
      },
    ],
  },
};

export const Reactions: Story = {
  args: {
    title: 'Reaktiot',
    features: [
      {
        name: 'Torjunta',
        description:
          '<em>Laukaisin:</em> Aateliseen osutaan lähitaisteluhyökkäysheitolla hänen ollessa aseistettu. <em>Vastaus:</em> Aatelinen lisää 2 puolustukseensa kyseistä hyökkäystä vastaan.',
      },
    ],
  },
};
