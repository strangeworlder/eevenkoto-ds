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

const fontSizes: Token[] = [
  { name: 'Small', variable: '--eevenkoto-font-size-sm' },
  { name: 'Medium', variable: '--eevenkoto-font-size-md' },
  { name: 'Large', variable: '--eevenkoto-font-size-lg' },
  { name: 'XL', variable: '--eevenkoto-font-size-xl' },
  { name: '2XL', variable: '--eevenkoto-font-size-2xl' },
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
    ${renderColorGroup('Surface / content / boundary / depth', semanticColors)}
  </div>
`;

const renderPrimitives = (): string => `
  <div class="eevenkoto-tokens">
    <section class="eevenkoto-tokens__section">
      <h2 class="eevenkoto-tokens__heading">Primitives</h2>
      <p class="eevenkoto-tokens__intro">Tier 1 pigments from primitivetokens.css — mapped only inside tokens.css. Do not reference these from component stylesheets.</p>
    </section>
    ${renderColorGroup('Turquoise', turquoiseColors)}
    ${renderColorGroup('Parchment', parchmentColors)}
    ${renderColorGroup('Gold', goldColors)}
  </div>
`;

const renderTypography = (): string => `
  <div class="eevenkoto-tokens">
    <section class="eevenkoto-tokens__section">
      <h2 class="eevenkoto-tokens__heading">Typography</h2>
      <p class="eevenkoto-tokens__intro">Font families, sizes, and line heights.</p>
    </section>
    <section class="eevenkoto-tokens__section">
      <h3 class="eevenkoto-tokens__subheading">Font families</h3>
      <div class="eevenkoto-tokens__stack">
        ${fontFamilies
          .map(
            (token) => `
              <div class="eevenkoto-tokens__type-row">
                <p class="eevenkoto-tokens__type-sample" style="font-family: var(${token.variable}); font-size: var(--eevenkoto-font-size-xl);">
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
      <h3 class="eevenkoto-tokens__subheading">Font sizes</h3>
      <div class="eevenkoto-tokens__stack">
        ${fontSizes
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
      <h3 class="eevenkoto-tokens__subheading">Line heights</h3>
      <div class="eevenkoto-tokens__stack">
        ${lineHeights
          .map(
            (token) => `
              <div class="eevenkoto-tokens__type-row">
                <p class="eevenkoto-tokens__type-sample" style="font-size: var(--eevenkoto-font-size-lg); line-height: var(${token.variable}); max-width: 36rem;">
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
