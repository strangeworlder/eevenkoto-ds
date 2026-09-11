// src/tokens/Tokens.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import './tokens.stories.css';

type Token = {
  name: string;
  variable: string;
};

const turquoiseColors: Token[] = [
  { name: 'State', variable: '--eevenkoto-color-turquoise-state' },
  { name: 'State hover', variable: '--eevenkoto-color-turquoise-state-hover' },
  { name: 'Border subtle', variable: '--eevenkoto-color-turquoise-border-subtle' },
  { name: 'Primary', variable: '--eevenkoto-color-turquoise-primary' },
  { name: 'Primary hover', variable: '--eevenkoto-color-turquoise-primary-hover' },
  { name: 'Text', variable: '--eevenkoto-color-turquoise-text' },
  { name: 'Tint cool', variable: '--eevenkoto-color-turquoise-tint-cool' },
  { name: 'Tint deep', variable: '--eevenkoto-color-turquoise-tint-deep' },
  { name: 'Tint disabled', variable: '--eevenkoto-color-turquoise-tint-disabled' },
  { name: 'Tint disabled deep', variable: '--eevenkoto-color-turquoise-tint-disabled-deep' },
  { name: 'Shadow', variable: '--eevenkoto-color-turquoise-shadow' },
  { name: 'Text shadow', variable: '--eevenkoto-color-turquoise-text-shadow' },
];

const parchmentColors: Token[] = [
  { name: 'Background', variable: '--eevenkoto-color-parchment-background' },
  { name: 'Background subtle', variable: '--eevenkoto-color-parchment-background-subtle' },
  { name: 'Background element', variable: '--eevenkoto-color-parchment-background-element' },
  { name: 'Border', variable: '--eevenkoto-color-parchment-border' },
  { name: 'Primary', variable: '--eevenkoto-color-parchment-primary' },
  { name: 'Text', variable: '--eevenkoto-color-parchment-text' },
  { name: 'Text muted', variable: '--eevenkoto-color-parchment-text-muted' },
  { name: 'Tint disabled', variable: '--eevenkoto-color-parchment-tint-disabled' },
  { name: 'Tint disabled deep', variable: '--eevenkoto-color-parchment-tint-disabled-deep' },
];

const goldColors: Token[] = [
  { name: 'Primary', variable: '--eevenkoto-color-gold-primary' },
  { name: 'Primary strong', variable: '--eevenkoto-color-gold-primary-strong' },
  { name: 'State', variable: '--eevenkoto-color-gold-state' },
];

const greenColors: Token[] = [
  { name: 'State (placeholder)', variable: '--eevenkoto-color-green-state' },
  { name: 'Text (placeholder)', variable: '--eevenkoto-color-green-text' },
];

const orangeColors: Token[] = [
  { name: 'State (placeholder)', variable: '--eevenkoto-color-orange-state' },
  { name: 'Text (placeholder)', variable: '--eevenkoto-color-orange-text' },
];

const crimsonColors: Token[] = [
  { name: 'State (placeholder)', variable: '--eevenkoto-color-crimson-state' },
  { name: 'Text (placeholder)', variable: '--eevenkoto-color-crimson-text' },
];

const purpleColors: Token[] = [
  { name: 'State (placeholder)', variable: '--eevenkoto-color-purple-state' },
  { name: 'Text (placeholder)', variable: '--eevenkoto-color-purple-text' },
];

const feedbackColors: Token[] = [
  { name: 'Neutral background', variable: '--eevenkoto-color-feedback-neutral-background' },
  { name: 'Neutral text', variable: '--eevenkoto-color-feedback-neutral-text' },
  { name: 'Neutral border', variable: '--eevenkoto-color-feedback-neutral-border' },
  { name: 'Neutral icon', variable: '--eevenkoto-color-feedback-neutral-icon' },
  { name: 'Neutral solid background', variable: '--eevenkoto-color-feedback-neutral-solid-background' },
  { name: 'Neutral solid text', variable: '--eevenkoto-color-feedback-neutral-solid-text' },
  { name: 'Info background', variable: '--eevenkoto-color-feedback-info-background' },
  { name: 'Info text', variable: '--eevenkoto-color-feedback-info-text' },
  { name: 'Info border', variable: '--eevenkoto-color-feedback-info-border' },
  { name: 'Info icon', variable: '--eevenkoto-color-feedback-info-icon' },
  { name: 'Info solid background', variable: '--eevenkoto-color-feedback-info-solid-background' },
  { name: 'Info solid text', variable: '--eevenkoto-color-feedback-info-solid-text' },
  { name: 'Success background', variable: '--eevenkoto-color-feedback-success-background' },
  { name: 'Success text', variable: '--eevenkoto-color-feedback-success-text' },
  { name: 'Success border', variable: '--eevenkoto-color-feedback-success-border' },
  { name: 'Success icon', variable: '--eevenkoto-color-feedback-success-icon' },
  { name: 'Success solid background', variable: '--eevenkoto-color-feedback-success-solid-background' },
  { name: 'Success solid text', variable: '--eevenkoto-color-feedback-success-solid-text' },
  { name: 'Caution background', variable: '--eevenkoto-color-feedback-caution-background' },
  { name: 'Caution text', variable: '--eevenkoto-color-feedback-caution-text' },
  { name: 'Caution border', variable: '--eevenkoto-color-feedback-caution-border' },
  { name: 'Caution icon', variable: '--eevenkoto-color-feedback-caution-icon' },
  { name: 'Caution solid background', variable: '--eevenkoto-color-feedback-caution-solid-background' },
  { name: 'Caution solid text', variable: '--eevenkoto-color-feedback-caution-solid-text' },
  { name: 'Critical background', variable: '--eevenkoto-color-feedback-critical-background' },
  { name: 'Critical text', variable: '--eevenkoto-color-feedback-critical-text' },
  { name: 'Critical border', variable: '--eevenkoto-color-feedback-critical-border' },
  { name: 'Critical icon', variable: '--eevenkoto-color-feedback-critical-icon' },
  { name: 'Critical solid background', variable: '--eevenkoto-color-feedback-critical-solid-background' },
  { name: 'Critical solid text', variable: '--eevenkoto-color-feedback-critical-solid-text' },
  { name: 'Admin background', variable: '--eevenkoto-color-feedback-admin-background' },
  { name: 'Admin text', variable: '--eevenkoto-color-feedback-admin-text' },
  { name: 'Admin border', variable: '--eevenkoto-color-feedback-admin-border' },
  { name: 'Admin icon', variable: '--eevenkoto-color-feedback-admin-icon' },
  { name: 'Admin solid background', variable: '--eevenkoto-color-feedback-admin-solid-background' },
  { name: 'Admin solid text', variable: '--eevenkoto-color-feedback-admin-solid-text' },
];

const controlColors: Token[] = [
  { name: 'Primary background', variable: '--eevenkoto-color-control-primary-background' },
  { name: 'Primary background hover', variable: '--eevenkoto-color-control-primary-background-hover' },
  { name: 'Primary background active', variable: '--eevenkoto-color-control-primary-background-active' },
  { name: 'Primary text', variable: '--eevenkoto-color-control-primary-text' },
  { name: 'Primary border', variable: '--eevenkoto-color-control-primary-border' },
  { name: 'Primary icon', variable: '--eevenkoto-color-control-primary-icon' },
  { name: 'Primary tint cool', variable: '--eevenkoto-color-control-primary-tint-cool' },
  { name: 'Primary tint deep', variable: '--eevenkoto-color-control-primary-tint-deep' },
  { name: 'Primary background disabled', variable: '--eevenkoto-color-control-primary-background-disabled' },
  { name: 'Primary text disabled', variable: '--eevenkoto-color-control-primary-text-disabled' },
  { name: 'Primary border disabled', variable: '--eevenkoto-color-control-primary-border-disabled' },
  { name: 'Primary icon disabled', variable: '--eevenkoto-color-control-primary-icon-disabled' },
  { name: 'Secondary background', variable: '--eevenkoto-color-control-secondary-background' },
  { name: 'Secondary background hover', variable: '--eevenkoto-color-control-secondary-background-hover' },
  { name: 'Secondary text', variable: '--eevenkoto-color-control-secondary-text' },
  { name: 'Secondary border', variable: '--eevenkoto-color-control-secondary-border' },
  { name: 'Secondary icon', variable: '--eevenkoto-color-control-secondary-icon' },
  { name: 'Secondary tint', variable: '--eevenkoto-color-control-secondary-tint' },
  { name: 'Secondary background disabled', variable: '--eevenkoto-color-control-secondary-background-disabled' },
  { name: 'Secondary text disabled', variable: '--eevenkoto-color-control-secondary-text-disabled' },
  { name: 'Secondary border disabled', variable: '--eevenkoto-color-control-secondary-border-disabled' },
  { name: 'Secondary icon disabled', variable: '--eevenkoto-color-control-secondary-icon-disabled' },
  { name: 'Ghost background', variable: '--eevenkoto-color-control-ghost-background' },
  { name: 'Ghost background hover', variable: '--eevenkoto-color-control-ghost-background-hover' },
  { name: 'Ghost text', variable: '--eevenkoto-color-control-ghost-text' },
  { name: 'Ghost border', variable: '--eevenkoto-color-control-ghost-border' },
  { name: 'Ghost icon', variable: '--eevenkoto-color-control-ghost-icon' },
  { name: 'Ghost background disabled', variable: '--eevenkoto-color-control-ghost-background-disabled' },
  { name: 'Ghost text disabled', variable: '--eevenkoto-color-control-ghost-text-disabled' },
  { name: 'Ghost border disabled', variable: '--eevenkoto-color-control-ghost-border-disabled' },
  { name: 'Ghost icon disabled', variable: '--eevenkoto-color-control-ghost-icon-disabled' },
];

const semanticColors: Token[] = [
  { name: 'Surface canvas', variable: '--eevenkoto-color-surface-canvas' },
  { name: 'Surface subtle', variable: '--eevenkoto-color-surface-subtle' },
  { name: 'Surface sunken', variable: '--eevenkoto-color-surface-sunken' },
  { name: 'Surface raised', variable: '--eevenkoto-color-surface-raised' },
  { name: 'Content primary', variable: '--eevenkoto-color-content-primary' },
  { name: 'Content secondary', variable: '--eevenkoto-color-content-secondary' },
  { name: 'Content disabled', variable: '--eevenkoto-color-content-disabled' },
  { name: 'Boundary subtle', variable: '--eevenkoto-color-boundary-subtle' },
  { name: 'Boundary strong', variable: '--eevenkoto-color-boundary-strong' },
  { name: 'Boundary focus outer', variable: '--eevenkoto-color-boundary-focus-outer' },
  { name: 'Boundary focus inner', variable: '--eevenkoto-color-boundary-focus-inner' },
  { name: 'Depth shadow umbra', variable: '--eevenkoto-color-depth-shadow-umbra' },
  { name: 'Depth shadow penumbra', variable: '--eevenkoto-color-depth-shadow-penumbra' },
  { name: 'Depth shadow control', variable: '--eevenkoto-color-depth-shadow-control' },
  { name: 'Depth shadow control text', variable: '--eevenkoto-color-depth-shadow-control-text' },
];

const fontFamilies: Token[] = [
  { name: 'Sans', variable: '--eevenkoto-font-sans' },
  { name: 'Serif', variable: '--eevenkoto-font-serif' },
];

const fontSizePrimitives: Token[] = [
  { name: 'Small', variable: '--eevenkoto-font-size-sm' },
  { name: 'Medium', variable: '--eevenkoto-font-size-md' },
  { name: 'Large', variable: '--eevenkoto-font-size-lg' },
  { name: 'XL', variable: '--eevenkoto-font-size-xl' },
  { name: '2XL', variable: '--eevenkoto-font-size-2xl' },
  { name: '3XL', variable: '--eevenkoto-font-size-3xl' },
];

const fontSizeSemantics: Token[] = [
  { name: 'Heading 1', variable: '--eevenkoto-font-size-heading-1' },
  { name: 'Heading 2', variable: '--eevenkoto-font-size-heading-2' },
  { name: 'Heading 3', variable: '--eevenkoto-font-size-heading-3' },
  { name: 'Heading 4', variable: '--eevenkoto-font-size-heading-4' },
  { name: 'Heading 5', variable: '--eevenkoto-font-size-heading-5' },
  { name: 'Heading 6', variable: '--eevenkoto-font-size-heading-6' },
  { name: 'Body small', variable: '--eevenkoto-font-size-body-sm' },
  { name: 'Body medium', variable: '--eevenkoto-font-size-body-md' },
  { name: 'Body large', variable: '--eevenkoto-font-size-body-lg' },
  { name: 'Caption', variable: '--eevenkoto-font-size-caption' },
  { name: 'Control small', variable: '--eevenkoto-font-size-control-sm' },
  { name: 'Control medium', variable: '--eevenkoto-font-size-control-md' },
  { name: 'Control large', variable: '--eevenkoto-font-size-control-lg' },
];

const fontWeights: Token[] = [
  { name: 'Regular', variable: '--eevenkoto-font-weight-regular' },
  { name: 'Semibold', variable: '--eevenkoto-font-weight-semibold' },
  { name: 'Bold', variable: '--eevenkoto-font-weight-bold' },
];

const lineHeights: Token[] = [
  { name: 'Tight', variable: '--eevenkoto-line-height-tight' },
  { name: 'Body', variable: '--eevenkoto-line-height-body' },
];

const spaces: Token[] = [
  { name: 'Space 1', variable: '--eevenkoto-space-1' },
  { name: 'Space 2', variable: '--eevenkoto-space-2' },
  { name: 'Space 3', variable: '--eevenkoto-space-3' },
  { name: 'Space 4', variable: '--eevenkoto-space-4' },
  { name: 'Space 6', variable: '--eevenkoto-space-6' },
  { name: 'Space 8', variable: '--eevenkoto-space-8' },
];

const radii: Token[] = [
  { name: 'Small', variable: '--eevenkoto-radius-sm' },
  { name: 'Medium', variable: '--eevenkoto-radius-md' },
  { name: 'Full (pill)', variable: '--eevenkoto-radius-full' },
];

const lineWidths: Token[] = [
  { name: 'Small', variable: '--eevenkoto-line-width-sm' },
  { name: 'Medium', variable: '--eevenkoto-line-width-md' },
  { name: 'Large', variable: '--eevenkoto-line-width-lg' },
];

const escapeHtml = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const resolveTokenValue = (variable: string): string => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return value || '(unset)';
};

const renderSwatch = (token: Token): string => `
  <div class="eevenkoto-tokens__swatch">
    <div class="eevenkoto-tokens__swatch-chip" aria-hidden="true">
      <div class="eevenkoto-tokens__swatch-chip-fill" style="background: var(${token.variable});"></div>
    </div>
    <div class="eevenkoto-tokens__meta">
      <p class="eevenkoto-tokens__name">${escapeHtml(token.name)}</p>
      <p class="eevenkoto-tokens__value">${escapeHtml(token.variable)}</p>
      <p class="eevenkoto-tokens__value">${escapeHtml(resolveTokenValue(token.variable))}</p>
    </div>
  </div>
`;

const renderColorGroup = (title: string, tokens: Token[]): string => `
  <section class="eevenkoto-tokens__section">
    <h3 class="eevenkoto-tokens__subheading">${escapeHtml(title)}</h3>
    <div class="eevenkoto-tokens__grid">
      ${tokens.map(renderSwatch).join('')}
    </div>
  </section>
`;

const renderSemanticColors = (): string => `
  <div class="eevenkoto-tokens">
    <section class="eevenkoto-tokens__section">
      <h2 class="eevenkoto-tokens__heading">Semantic colors</h2>
      <p class="eevenkoto-tokens__intro">Tier 2 intent tokens from tokens.css — the only color tokens components and layouts should consume.</p>
    </section>
    ${renderColorGroup('Control', controlColors)}
    ${renderColorGroup('Feedback', feedbackColors)}
    ${renderColorGroup('Surface / content / boundary / depth', semanticColors)}
  </div>
`;

const renderPrimitives = (): string => `
  <div class="eevenkoto-tokens">
    <section class="eevenkoto-tokens__section">
      <h2 class="eevenkoto-tokens__heading">Primitives</h2>
      <p class="eevenkoto-tokens__intro">Tier 1 pigments from primitive-tokens.css — mapped only inside tokens.css. Do not reference these from component stylesheets.</p>
    </section>
    ${renderColorGroup('Turquoise', turquoiseColors)}
    ${renderColorGroup('Parchment', parchmentColors)}
    ${renderColorGroup('Gold', goldColors)}
    ${renderColorGroup('Green (placeholder)', greenColors)}
    ${renderColorGroup('Orange (placeholder)', orangeColors)}
    ${renderColorGroup('Crimson (placeholder)', crimsonColors)}
    ${renderColorGroup('Purple (placeholder)', purpleColors)}
  </div>
`;

const renderTypography = (): string => `
  <div class="eevenkoto-tokens">
    <section class="eevenkoto-tokens__section">
      <h2 class="eevenkoto-tokens__heading">Typography</h2>
      <p class="eevenkoto-tokens__intro">Font families and line heights are Tier 2 metrics. Font sizes follow the same Tier 1 → Tier 2 split as color: rem steps in primitive-tokens.css, semantic roles in tokens.css. Components consume semantic sizes only.</p>
    </section>
    <section class="eevenkoto-tokens__section">
      <h3 class="eevenkoto-tokens__subheading">Font families</h3>
      <div class="eevenkoto-tokens__stack">
        ${fontFamilies
          .map(
            (token) => `
              <div class="eevenkoto-tokens__type-row">
                <p class="eevenkoto-tokens__type-sample" style="font-family: var(${token.variable}); font-size: var(--eevenkoto-font-size-body-lg);">
                  The quick brown fox jumps over the lazy dog
                </p>
                <div class="eevenkoto-tokens__meta">
                  <p class="eevenkoto-tokens__name">${escapeHtml(token.name)}</p>
                  <p class="eevenkoto-tokens__value">${escapeHtml(token.variable)}</p>
                  <p class="eevenkoto-tokens__value">${escapeHtml(resolveTokenValue(token.variable))}</p>
                </div>
              </div>
            `,
          )
          .join('')}
      </div>
    </section>
    <section class="eevenkoto-tokens__section">
      <h3 class="eevenkoto-tokens__subheading">Font sizes — Tier 1 (scale)</h3>
      <p class="eevenkoto-tokens__intro">Raw rem steps from primitive-tokens.css. Do not reference these from component stylesheets.</p>
      <div class="eevenkoto-tokens__stack">
        ${fontSizePrimitives
          .map(
            (token) => `
              <div class="eevenkoto-tokens__type-row">
                <p class="eevenkoto-tokens__type-sample" style="font-size: var(${token.variable}); line-height: var(--eevenkoto-line-height-body);">
                  Aa — ${escapeHtml(token.name)}
                </p>
                <div class="eevenkoto-tokens__meta">
                  <p class="eevenkoto-tokens__name">${escapeHtml(token.name)}</p>
                  <p class="eevenkoto-tokens__value">${escapeHtml(token.variable)}</p>
                  <p class="eevenkoto-tokens__value">${escapeHtml(resolveTokenValue(token.variable))}</p>
                </div>
              </div>
            `,
          )
          .join('')}
      </div>
    </section>
    <section class="eevenkoto-tokens__section">
      <h3 class="eevenkoto-tokens__subheading">Font sizes — Tier 2 (semantic)</h3>
      <p class="eevenkoto-tokens__intro">Role tokens from tokens.css — heading, body, caption, and control. Prefer these in components and layouts.</p>
      <div class="eevenkoto-tokens__stack">
        ${fontSizeSemantics
          .map(
            (token) => `
              <div class="eevenkoto-tokens__type-row">
                <p class="eevenkoto-tokens__type-sample" style="font-size: var(${token.variable}); line-height: var(--eevenkoto-line-height-body);">
                  Aa — ${escapeHtml(token.name)}
                </p>
                <div class="eevenkoto-tokens__meta">
                  <p class="eevenkoto-tokens__name">${escapeHtml(token.name)}</p>
                  <p class="eevenkoto-tokens__value">${escapeHtml(token.variable)}</p>
                  <p class="eevenkoto-tokens__value">${escapeHtml(resolveTokenValue(token.variable))}</p>
                </div>
              </div>
            `,
          )
          .join('')}
      </div>
    </section>
    <section class="eevenkoto-tokens__section">
      <h3 class="eevenkoto-tokens__subheading">Font weights</h3>
      <div class="eevenkoto-tokens__stack">
        ${fontWeights
          .map(
            (token) => `
              <div class="eevenkoto-tokens__type-row">
                <p class="eevenkoto-tokens__type-sample" style="font-size: var(--eevenkoto-font-size-body-lg); font-weight: var(${token.variable});">
                  The quick brown fox — ${escapeHtml(token.name)}
                </p>
                <div class="eevenkoto-tokens__meta">
                  <p class="eevenkoto-tokens__name">${escapeHtml(token.name)}</p>
                  <p class="eevenkoto-tokens__value">${escapeHtml(token.variable)}</p>
                  <p class="eevenkoto-tokens__value">${escapeHtml(resolveTokenValue(token.variable))}</p>
                </div>
              </div>
            `,
          )
          .join('')}
      </div>
    </section>
    <section class="eevenkoto-tokens__section">
      <h3 class="eevenkoto-tokens__subheading">Line heights</h3>
      <div class="eevenkoto-tokens__stack">
        ${lineHeights
          .map(
            (token) => `
              <div class="eevenkoto-tokens__type-row">
                <p class="eevenkoto-tokens__type-sample" style="font-size: var(--eevenkoto-font-size-body-lg); line-height: var(${token.variable}); max-width: 36rem;">
                  Line height shapes how text breathes across multiple lines. This sample shows ${escapeHtml(token.name.toLowerCase())} spacing for body copy and headings.
                </p>
                <div class="eevenkoto-tokens__meta">
                  <p class="eevenkoto-tokens__name">${escapeHtml(token.name)}</p>
                  <p class="eevenkoto-tokens__value">${escapeHtml(token.variable)}</p>
                  <p class="eevenkoto-tokens__value">${escapeHtml(resolveTokenValue(token.variable))}</p>
                </div>
              </div>
            `,
          )
          .join('')}
      </div>
    </section>
  </div>
`;

const renderSpacing = (): string => `
  <div class="eevenkoto-tokens">
    <section class="eevenkoto-tokens__section">
      <h2 class="eevenkoto-tokens__heading">Spacing</h2>
      <p class="eevenkoto-tokens__intro">Space scale used for padding, gaps, and layout rhythm.</p>
      <div class="eevenkoto-tokens__stack">
        ${spaces
          .map(
            (token) => `
              <div class="eevenkoto-tokens__space-row">
                <div class="eevenkoto-tokens__meta">
                  <p class="eevenkoto-tokens__name">${escapeHtml(token.name)}</p>
                  <p class="eevenkoto-tokens__value">${escapeHtml(token.variable)}</p>
                  <p class="eevenkoto-tokens__value">${escapeHtml(resolveTokenValue(token.variable))}</p>
                </div>
                <div class="eevenkoto-tokens__space-bar" style="width: var(${token.variable});" aria-hidden="true"></div>
              </div>
            `,
          )
          .join('')}
      </div>
    </section>
  </div>
`;

const renderRadius = (): string => `
  <div class="eevenkoto-tokens">
    <section class="eevenkoto-tokens__section">
      <h2 class="eevenkoto-tokens__heading">Radius</h2>
      <p class="eevenkoto-tokens__intro">Corner radius tokens for controls and surfaces.</p>
      <div class="eevenkoto-tokens__stack">
        ${radii
          .map(
            (token) => `
              <div class="eevenkoto-tokens__radius-row">
                <div class="eevenkoto-tokens__meta">
                  <p class="eevenkoto-tokens__name">${escapeHtml(token.name)}</p>
                  <p class="eevenkoto-tokens__value">${escapeHtml(token.variable)}</p>
                  <p class="eevenkoto-tokens__value">${escapeHtml(resolveTokenValue(token.variable))}</p>
                </div>
                <div class="eevenkoto-tokens__radius-demo" style="border-radius: var(${token.variable});" aria-hidden="true"></div>
              </div>
            `,
          )
          .join('')}
      </div>
    </section>
  </div>
`;

const renderLineWidths = (): string => `
  <div class="eevenkoto-tokens">
    <section class="eevenkoto-tokens__section">
      <h2 class="eevenkoto-tokens__heading">Line widths</h2>
      <p class="eevenkoto-tokens__intro">Border and stroke widths.</p>
      <div class="eevenkoto-tokens__stack">
        ${lineWidths
          .map(
            (token) => `
              <div class="eevenkoto-tokens__line-row">
                <div class="eevenkoto-tokens__meta">
                  <p class="eevenkoto-tokens__name">${escapeHtml(token.name)}</p>
                  <p class="eevenkoto-tokens__value">${escapeHtml(token.variable)}</p>
                  <p class="eevenkoto-tokens__value">${escapeHtml(resolveTokenValue(token.variable))}</p>
                </div>
                <div class="eevenkoto-tokens__line-demo" style="border-top-width: var(${token.variable});" aria-hidden="true"></div>
              </div>
            `,
          )
          .join('')}
      </div>
    </section>
  </div>
`;

const meta: Meta = {
  title: 'Foundations/Tokens',
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    docs: {
      description: {
        component:
          'Consume Tier 2 semantic tokens (and metrics). Primitives are internal pigments mapped only in tokens.css.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const SemanticColors: Story = {
  name: 'Semantic colors',
  render: () => renderSemanticColors(),
};

export const Primitives: Story = {
  name: 'Primitives',
  render: () => renderPrimitives(),
};

export const Typography: Story = {
  name: 'Typography',
  render: () => renderTypography(),
};

export const Spacing: Story = {
  name: 'Spacing',
  render: () => renderSpacing(),
};

export const Radius: Story = {
  name: 'Radius',
  render: () => renderRadius(),
};

export const LineWidths: Story = {
  name: 'Line widths',
  render: () => renderLineWidths(),
};
