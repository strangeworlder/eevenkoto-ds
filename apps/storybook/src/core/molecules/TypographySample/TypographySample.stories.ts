// apps/storybook/src/core/molecules/TypographySample/TypographySample.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/flow.css';
import '@eevenkoto/css/heading.css';
import '@eevenkoto/css/paragraph.css';
import '@eevenkoto/css/list.css';
import '@eevenkoto/css/caption.css';
import '@eevenkoto/css/field.css';
import '@eevenkoto/css/input.css';
import '@eevenkoto/css/checkbox.css';
import '@eevenkoto/css/checkbox-group.css';
import '@eevenkoto/css/radio.css';
import '@eevenkoto/css/radio-group.css';
import '@eevenkoto/css/badge.css';
import './typography-sample.css';
import {
  renderCaption,
  renderCheckbox,
  renderCheckboxGroup,
  renderField,
  renderFlow,
  renderHeading,
  renderInput,
  renderList,
  renderParagraph,
  renderRadioGroup,
} from '@eevenkoto/html';

const renderSample = (): string => {
  const lede = renderFlow({
    content: [
      renderParagraph({
        size: 'lg',
        text: 'A composed specimen of Heading, Paragraph, List, Caption, and Form Controls — the multi-axis hierarchy in a reading flow, not a token grid.',
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
      renderList({
        items: [
          { text: 'Keep markers honest with real ul / ol markup.' },
          { text: 'Size lists from the same body roles as Paragraph.' },
          { text: 'Let Flow own vertical gaps between blocks.' },
        ],
      }),
      renderHeading({ level: 4, text: 'Subsections near body size' }),
      renderParagraph({
        size: 'sm',
        text: 'H4 sits close to body size in warm parchment, so hierarchy continues through family and weight rather than another large jump.',
      }),
      renderList({
        variant: 'ordered',
        size: 'sm',
        items: [
          { text: 'Survey the ridge before descending.' },
          { text: 'Mark the latch once the circuit clears.' },
          { text: 'Log the reading in the field book.' },
        ],
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

  const forms = renderFlow({
    content: [
      renderHeading({ level: 2, text: 'Form controls in document rhythm' }),
      renderParagraph({
        text: 'Inputs, checkboxes, and radio buttons adhere to the same type scales and spacing cadence as running text. Form labels, descriptive captions, and control sizing harmonize with the surrounding document.',
      }),
      renderField({
        id: 'expedition-lead',
        label: 'Expedition lead name',
        hint: 'Logged in the canyon registry under archive protocol 4.',
        control: renderInput({
          id: 'expedition-lead',
          value: 'Archivist Sula',
          placeholder: 'Full name and title',
        }),
      }),
      renderCheckboxGroup({
        label: 'Field checklist & protocols',
        badge: '2 / 3 vahvistettu',
        badgeIntent: 'neutral',
        hint: 'Review safety criteria before descending below the mist line.',
        items: [
          {
            id: 'chk-harness',
            label: 'Anchor harness inspected',
            description: 'Double-checked load-bearing carabiners and piton integrity.',
            variant: 'card',
            checked: true,
          },
          {
            id: 'chk-beacon',
            label: 'Aether beacon synchronized',
            description: 'Transmitting telemetry to the canyon rim outpost.',
            variant: 'card',
            checked: true,
          },
          {
            id: 'chk-rations',
            label: 'Emergency rations sealed',
            description: 'Three-day iron rations packed in waterproof casing.',
            variant: 'card',
            checked: false,
          },
        ],
      }),
      renderRadioGroup({
        name: 'descent-route',
        label: 'Descent route',
        value: 'chimney',
        variant: 'card',
        hint: 'Choose traversal route according to current canyon weather conditions.',
        options: [
          {
            value: 'ridge',
            label: 'North Ridge (windward)',
            description: 'Wide footpath (4 h descent). Exposed to updrafts.',
          },
          {
            value: 'chimney',
            label: 'Chimney Chute (sheltered)',
            description: 'Rope-assisted vertical descent (45 min). Protected from wind.',
          },
        ],
      }),
      renderCheckbox({
        id: 'confirm-terms',
        label: 'Acknowledge canyon survey regulations and environmental preservation pact',
        checked: true,
      }),
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
          forms,
        ].join(''),
      })}
    </article>
  `;
};

const meta: Meta = {
  title: 'Core/Molecules/Typography sample',
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    docs: {
      description: {
        component:
          'Reading-flow specimen composing Flow, Heading, Paragraph, List, Caption, and Form Controls (Input, Checkbox, Radio) under the multi-axis type hierarchy.',
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
