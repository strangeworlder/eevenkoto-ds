// apps/storybook/src/primitives/TypographySample/TypographySample.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/flow.css';
import '@eevenkoto/css/heading.css';
import '@eevenkoto/css/paragraph.css';
import '@eevenkoto/css/caption.css';
import './typography-sample.css';
import { renderCaption, renderFlow, renderHeading, renderParagraph } from '@eevenkoto/html';

const renderSample = (): string => {
  const lede = renderFlow({
    content: [
      renderParagraph({
        size: 'lg',
        text: 'A composed specimen of Heading, Paragraph, and Caption — the multi-axis hierarchy in a reading flow, not a token grid.',
      }),
      renderCaption({ text: 'Specimen · Foundations / Typography sample' }),
    ].join(''),
  });

  const macro = renderFlow({
    content: [
      renderHeading({ level: 2, text: 'Macro divisions hold the page' }),
      renderParagraph({
        text: 'H1 and H2 take the size jump and structural rules. Warm parchment ink on H2 marks major divisions without competing with the page title.',
      }),
      renderParagraph({
        tone: 'secondary',
        text: 'Secondary paragraphs sit quieter when the section needs supporting context rather than a second voice of equal weight.',
      }),
    ].join(''),
  });

  const meso = renderFlow({
    content: [
      renderHeading({ level: 3, text: 'Meso sections stay weight-led' }),
      renderParagraph({
        text: 'H3 relies on serif weight against body copy. No tint bands — shading every level turns the page into stripes.',
      }),
      renderHeading({ level: 4, text: 'Subsections near body size' }),
      renderParagraph({
        size: 'sm',
        text: 'H4 sits close to body size in warm parchment, so hierarchy continues through family and weight rather than another large jump.',
      }),
    ].join(''),
  });

  const micro = renderFlow({
    content: [
      renderHeading({ level: 5, text: 'Cluster label' }),
      renderParagraph({
        text: 'H5 sits one step above body size. Small caps, tracking, and a sunken padded band make the cluster readable without undercutting paragraph type.',
      }),
      renderHeading({
        level: 6,
        text: 'Safety protocol',
        runIn: true,
      }),
      renderParagraph({
        text: 'Always inspect the valve before engaging the primary circuit. Run-in H6 keeps the lowest label attached to its sentence.',
      }),
      renderCaption({ text: 'Updated for the multi-axis heading model.' }),
    ].join(''),
  });

  return `
    <article class="eevenkoto-typography-sample">
      ${renderFlow({
        content: [
          renderHeading({ level: 1, text: 'Field notes from the canyon' }),
          lede,
          macro,
          meso,
          micro,
        ].join(''),
      })}
    </article>
  `;
};

const meta: Meta = {
  title: 'Primitives/Typography sample',
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    docs: {
      description: {
        component:
          'Reading-flow specimen composing Flow, Heading, Paragraph, and Caption under the multi-axis type hierarchy.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Document: Story = {
  name: 'Document',
  render: () => renderSample(),
};
