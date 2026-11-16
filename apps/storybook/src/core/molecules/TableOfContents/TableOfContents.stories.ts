import type { Meta, StoryObj } from '@storybook/html-vite';
import { expect } from 'storybook/test';
import '@eevenkoto/css/table-of-contents.css';
import { renderTableOfContents, type TableOfContentsProps } from '@eevenkoto/html';

const groups: TableOfContentsProps['groups'] = [
  {
    label: 'Perusteet',
    items: [
      { id: 'intro', href: '#intro', label: 'Johdanto', current: true },
      { id: 'rules', href: '#rules', label: 'Säännöt' },
    ],
  },
  {
    label: 'Lisätiedot',
    items: [{ id: 'appendix', href: '#appendix', label: 'Liite' }],
  },
];

const meta: Meta<TableOfContentsProps> = {
  title: 'Core/Molecules/TableOfContents',
  parameters: {
    docs: {
      description: {
        component:
          'Semantic outline navigation. `rail` is a vertical list; `collapsible` is a sticky `<details>` disclosure; `auto` switches between them at `64rem`. Links carry `data-toc-target` for host scrollspy scripts.',
      },
    },
  },
  argTypes: {
    id: { control: 'text', description: 'Optional `<nav id>`.' },
    variant: {
      control: 'select',
      options: ['auto', 'rail', 'collapsible'],
      table: { type: { summary: "'auto' | 'rail' | 'collapsible'" }, defaultValue: { summary: 'auto' } },
    },
    label: { control: 'text' },
    toggleLabel: { control: 'text' },
    open: { control: 'boolean' },
    groups: { control: 'object', description: 'Outline groups (`TableOfContentsGroup[]`).' },
  },
  args: { groups, label: 'Sivun sisältö', toggleLabel: 'Tällä sivulla' },
  render: (args) => renderTableOfContents(args),
};

export default meta;
type Story = StoryObj<TableOfContentsProps>;

export const Rail: Story = { args: { variant: 'rail' } };

export const NarrowRailWrapped: Story = {
  name: 'Narrow rail (wrapped + scrollable)',
  render: () => `
    <div data-toc-scroll-wrap style="max-width: 13.5rem; max-height: 28rem; overflow-y: auto; padding-inline-end: var(--eevenkoto-space-2);">
      ${renderTableOfContents({
        variant: 'rail',
        label: 'Sivun sisältö',
        toggleLabel: 'Tällä sivulla',
        groups: [
          {
            label: 'Osiot',
            items: [
              { id: 'bg', href: '#bg', label: 'Taustatarina ja Hakan juoni' },
              { id: 'hooks', href: '#hooks', label: 'Pelaajahahmojen sitouttaminen' },
              { id: 'start', href: '#start', label: 'Seikkailun aloitus' },
              { id: 'timeline', href: '#timeline', label: 'Pelipäivän aikajana' },
              { id: 'gallery', href: '#gallery', label: 'Hahmogalleria', current: true },
              { id: 'scenes', href: '#scenes', label: 'Näyttämöt' },
              { id: 'escalations', href: '#escalations', label: 'Eskalaatiot' },
              { id: 'ending', href: '#ending', label: 'Seikkailun lopetus' },
              { id: 'appendices', href: '#appendices', label: 'Liitteet' },
              { id: 'abilities', href: '#abilities', label: 'Kykylistaukset' },
            ],
          },
          {
            label: 'Vastustajat',
            items: [
              { id: 'haka', href: '#haka', label: 'Haka' },
              { id: 'kannukset', href: '#kannukset', label: 'Kannukset' },
              { id: 'kirvestikka', href: '#kirvestikka', label: 'Hakan lemmikki: Kirvestikka' },
              { id: 'brask', href: '#brask', label: 'Kahden käärmeen Brask' },
            ],
          },
        ],
      })}
    </div>
  `,
  play: async ({ canvasElement }) => {
    const scrollWrap = canvasElement.querySelector<HTMLElement>('[data-toc-scroll-wrap]');
    const heading = canvasElement.querySelector<HTMLElement>('.eevenkoto-toc__heading');
    const links = canvasElement.querySelectorAll<HTMLElement>('.eevenkoto-toc__link');

    expect(scrollWrap).not.toBeNull();
    expect(heading).not.toBeNull();
    expect(links.length).toBeGreaterThanOrEqual(2);

    const scrollWrapRect = scrollWrap!.getBoundingClientRect();
    const headingRect = heading!.getBoundingClientRect();
    const textBoxTrim = getComputedStyle(heading!).getPropertyValue('text-box-trim');

    expect(headingRect.top).toBeGreaterThanOrEqual(scrollWrapRect.top);
    expect(headingRect.height).toBeGreaterThanOrEqual(14);
    expect(['none', ''].includes(textBoxTrim)).toBe(true);

    const firstLink = links[0];
    const secondLink = links[1];

    const getLineRects = (el: HTMLElement): DOMRect[] => {
      const range = document.createRange();
      range.selectNodeContents(el);
      return Array.from(range.getClientRects());
    };

    const firstLines = getLineRects(firstLink);
    const secondLines = getLineRects(secondLink);

    expect(firstLines.length).toBeGreaterThanOrEqual(2);
    expect(secondLines.length).toBeGreaterThanOrEqual(1);

    const intraLineStep = firstLines[1].top - firstLines[0].top;
    const interItemLineStep = secondLines[0].top - firstLines[firstLines.length - 1].top;
    const itemBoxGap = secondLink.getBoundingClientRect().top - firstLink.getBoundingClientRect().bottom;

    expect(interItemLineStep).toBeGreaterThan(intraLineStep + 10);
    expect(itemBoxGap).toBeGreaterThanOrEqual(3.5);
  },
};

export const Collapsible: Story = { args: { variant: 'collapsible', open: true } };

export const AutoResponsive: Story = { args: { variant: 'auto' } };
