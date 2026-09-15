import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/tooltip-card.css';
import '@eevenkoto/css/scroll.css';
import '@eevenkoto/css/popover.css';
import '@eevenkoto/css/inline-ref.css';
import { renderInlineRef, renderPopover, renderTooltipCard, type TooltipCardProps } from '@eevenkoto/html';

const longBody =
  'You touch a creature and stir its natural healing ability. The target regains hit points equal to 1d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs. Starting at 3rd level, the healing increases by 1d8 for each slot level above 1st. Patrons also see the optional variant used at this table.';

const meta: Meta<TooltipCardProps> = {
  title: 'Core/Molecules/TooltipCard',
  parameters: {
    docs: {
      description: {
        component:
          'Header / body / footer on a popover-like surface. Standalone it is an elevated card; nested in Popover it drops its own chrome and fills the panel. Long copy composes Scroll on the body.',
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Header text.' },
    body: { control: 'text', description: 'Body copy.' },
    footer: { control: 'text', description: 'Footer HTML.' },
    scrollBody: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
  },
  render: (args) => renderTooltipCard(args),
};

export default meta;
type Story = StoryObj<TooltipCardProps>;

export const Default: Story = {
  args: {
    title: 'Cure Wounds',
    body: 'A creature you touch regains hit points equal to 1d8 + your spellcasting ability modifier.',
    footer: '1st-level evocation · Touch',
  },
};

export const ScrollingBody: Story = {
  args: {
    title: 'Cure Wounds',
    body: longBody,
    footer: '1st-level evocation · Touch',
    scrollBody: true,
  },
};

export const InsidePopover: Story = {
  render: () =>
    `<span style="position: relative; display: inline; margin-inline: 6rem; margin-block: 5rem;">
      ${renderInlineRef({ name: 'Cure Wounds', href: '#cure-wounds' })}
      ${renderPopover({
        placement: 'bottom',
        arrow: true,
        role: 'note',
        content: renderTooltipCard({
          title: 'Cure Wounds',
          body: 'A creature you touch regains hit points equal to 1d8 + your spellcasting ability modifier.',
          footer: '<a href="#cure-wounds">Avaa sivu →</a>',
        }),
      })}
    </span>`,
};
