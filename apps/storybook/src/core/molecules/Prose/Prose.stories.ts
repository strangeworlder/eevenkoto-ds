// apps/storybook/src/core/molecules/Prose/Prose.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/prose.css';
import '@eevenkoto/css/flow.css';
import '@eevenkoto/css/heading.css';
import '@eevenkoto/css/paragraph.css';
import { flowClassNames, proseClassNames } from '@eevenkoto/core';
import { renderProse, type ProseProps } from '@eevenkoto/html';

const bareReadingContent = (): string =>
  [
    '<h1>Prose styles bare tags</h1>',
    '<p>Inside <code>eevenkoto-prose</code>, headings and paragraphs pick up the same defaults as the classed primitives — without BEM classes on each element.</p>',
    '<h2>Section break</h2>',
    '<p>Compose with Flow for pair-aware vertical rhythm.</p>',
    '<h3>Meso heading</h3>',
    '<p>H3 through H6 follow the multi-axis hierarchy.</p>',
    '<h4>Sans meso</h4>',
    '<p>Another paragraph for stack rhythm.</p>',
    '<h5>Micro band</h5>',
    '<p>H5 keeps the sunken label band.</p>',
    '<h6>Micro italic</h6>',
    '<p>Closing body copy under H6.</p>',
  ].join('');

const withOverrideContent = (): string =>
  [
    '<h1 class="eevenkoto-heading eevenkoto-heading--3">Semantic H1, visual H3</h1>',
    '<p>Tag inference yields to an explicit <code>--3</code> modifier on the host class.</p>',
    '<h2>Normal H2</h2>',
    '<p>Bare tags still resolve from the element name.</p>',
  ].join('');

const meta: Meta<ProseProps> = {
  title: 'Core/Molecules/Prose',
  parameters: {
    docs: {
      description: {
        component:
          'Prose scopes bare h1–h6 and p to default Heading/Paragraph styles. Compose with Flow for rhythm.',
      },
    },
  },
  argTypes: {
    content: { table: { disable: true } },
  },
  args: {
    content: bareReadingContent(),
  },
  render: (args) => renderProse(args),
};

export default meta;
type Story = StoryObj<ProseProps>;

export const Default: Story = {};

export const WithFlow: Story = {
  name: 'With Flow',
  render: (args) => {
    const classes = [proseClassNames(), flowClassNames()].join(' ');
    return `<div class="${classes}">${args.content}</div>`;
  },
};

export const LevelOverride: Story = {
  name: 'Level override',
  args: {
    content: withOverrideContent(),
  },
  render: (args) => {
    const classes = [proseClassNames(), flowClassNames()].join(' ');
    return `<div class="${classes}">${args.content}</div>`;
  },
};
