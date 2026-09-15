import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/popover.css';
import '@eevenkoto/css/inline-ref.css';
import '@eevenkoto/css/tooltip-card.css';
import { renderInlineRef, renderPopover, renderTooltipCard, type PopoverProps } from '@eevenkoto/html';

/**
 * Docs harness: Popover is trigger-agnostic. Core demos use InlineRef links
 * (Domain EntityRef specializes InlineRef with kinds in product).
 */
const anchored = (panel: string, name = 'Paralyzed'): string =>
  `<span style="position: relative; display: inline; margin-inline: 6rem; margin-block: 5rem;">
    ${renderInlineRef({ name, href: `#${name.toLowerCase().replaceAll(' ', '-')}` })}
    ${panel}
  </span>`;

const meta: Meta<PopoverProps> = {
  title: 'Core/Atoms/Popover',
  parameters: {
    docs: {
      description: {
        component:
          'Raised floating panel (CSS only). Apps own visibility, focus, and collision. Core demos use InlineRef triggers; Domain EntityRef adds kinds in product.',
      },
    },
  },
  argTypes: {
    content: { control: 'text', description: 'Panel contents (HTML).' },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      table: { defaultValue: { summary: 'bottom' } },
    },
    arrow: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    fixed: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    open: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    label: { control: 'text' },
    role: {
      control: 'select',
      options: [undefined, 'dialog', 'tooltip', 'note', 'group'],
    },
  },
  render: (args) => anchored(renderPopover(args)),
};

export default meta;
type Story = StoryObj<PopoverProps>;

export const Default: Story = {
  args: {
    content: 'A paralyzed creature is incapacitated and can’t move or speak.',
    placement: 'bottom',
    arrow: true,
    label: 'Paralyzed',
    role: 'note',
  },
};

export const Placements: Story = {
  name: 'Placements',
  render: () =>
    (['top', 'bottom', 'left', 'right'] as const)
      .map((placement) =>
        anchored(
          renderPopover({
            content: `Placement: ${placement}`,
            placement,
            arrow: true,
          }),
          placement,
        ),
      )
      .join(''),
};

export const WithoutArrow: Story = {
  name: 'Without arrow',
  args: {
    content: 'Panels without an arrow read as detached surfaces.',
    placement: 'bottom',
  },
};

export const WithTooltipCard: Story = {
  name: 'With TooltipCard',
  render: () =>
    anchored(
      renderPopover({
        placement: 'bottom',
        arrow: true,
        role: 'note',
        label: 'Cure Wounds',
        content: renderTooltipCard({
          title: 'Cure Wounds',
          body: 'A creature you touch regains hit points equal to 1d8 + your spellcasting ability modifier.',
          footer: '<a href="#cure-wounds">Avaa sivu →</a>',
        }),
      }),
      'Cure Wounds',
    ),
};

/** Portal recipe: fixed panel + InlineRef link. */
export const FixedOnLink: Story = {
  name: 'Fixed on a link',
  render: () => {
    const card = renderTooltipCard({
      title: 'Paralyzed',
      body: 'A paralyzed creature is incapacitated and can’t move or speak.',
      footer: '<a href="#paralyzed">Avaa sivu →</a>',
    });
    const panel = renderPopover({
      content: card,
      fixed: true,
      open: true,
      arrow: false,
      label: 'Paralyzed',
      role: 'tooltip',
    });
    return `<p style="max-inline-size: 36rem; margin: 2rem;">
      In product, hover/focus
      ${renderInlineRef({ name: 'Paralyzed', href: '#paralyzed' })}
      opens a portaled
      <code>eevenkoto-popover--fixed</code> panel; the app sets <code>top</code>/<code>left</code>.
      Domain EntityRef can replace InlineRef when kind colors matter.
    </p>
    <div style="position: relative; min-block-size: 12rem;">
      ${panel.replace(
        'class="eevenkoto-popover eevenkoto-popover--fixed eevenkoto-popover--open"',
        'class="eevenkoto-popover eevenkoto-popover--fixed eevenkoto-popover--open" style="top: 6rem; left: 2rem;"',
      )}
    </div>`;
  },
};
