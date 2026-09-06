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
];

const parchmentColors: Token[] = [
  { name: 'Background', variable: '--eevenkoto-color-parchment-background' },
  { name: 'Background element', variable: '--eevenkoto-color-parchment-background-element' },
  { name: 'Border', variable: '--eevenkoto-color-parchment-border' },
  { name: 'Primary', variable: '--eevenkoto-color-parchment-primary' },
  { name: 'Text', variable: '--eevenkoto-color-parchment-text' },
  { name: 'Text muted', variable: '--eevenkoto-color-parchment-text-muted' },
];

const goldColors: Token[] = [
  { name: 'Primary', variable: '--eevenkoto-color-gold-primary' },
  { name: 'State', variable: '--eevenkoto-color-gold-state' },
];

const actionColors: Token[] = [
  { name: 'Action', variable: '--eevenkoto-color-action' },
  { name: 'Action hover', variable: '--eevenkoto-color-action-hover' },
  { name: 'Action border', variable: '--eevenkoto-color-action-border' },
  { name: 'Action icon', variable: '--eevenkoto-color-action-icon' },
  { name: 'Action text', variable: '--eevenkoto-color-action-text' },
  { name: 'Action tint cool', variable: '--eevenkoto-color-action-tint-cool' },
  { name: 'Action tint deep', variable: '--eevenkoto-color-action-tint-deep' },
  { name: 'Action secondary', variable: '--eevenkoto-color-action-secondary' },
  { name: 'Action secondary hover', variable: '--eevenkoto-color-action-secondary-hover' },
  { name: 'Action secondary border', variable: '--eevenkoto-color-action-secondary-border' },
  { name: 'Action secondary icon', variable: '--eevenkoto-color-action-secondary-icon' },
  { name: 'Action secondary text', variable: '--eevenkoto-color-action-secondary-text' },
  { name: 'Action secondary tint', variable: '--eevenkoto-color-action-secondary-tint' },
  { name: 'Action ghost', variable: '--eevenkoto-color-action-ghost' },
  { name: 'Action ghost hover', variable: '--eevenkoto-color-action-ghost-hover' },
  { name: 'Action ghost border', variable: '--eevenkoto-color-action-ghost-border' },
  { name: 'Action ghost icon', variable: '--eevenkoto-color-action-ghost-icon' },
  { name: 'Action ghost text', variable: '--eevenkoto-color-action-ghost-text' },
];

const semanticColors: Token[] = [
  { name: 'Background', variable: '--eevenkoto-color-bg' },
  { name: 'Surface', variable: '--eevenkoto-color-surface' },
  { name: 'Text', variable: '--eevenkoto-color-text' },
  { name: 'Text muted', variable: '--eevenkoto-color-text-muted' },
  { name: 'Border', variable: '--eevenkoto-color-border' },
  { name: 'Focus ring', variable: '--eevenkoto-color-focus-ring' },
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
  { name: 'Action border', variable: '--eevenkoto-border-width-action' },
  { name: 'Action secondary border', variable: '--eevenkoto-border-width-action-secondary' },
  { name: 'Action ghost border', variable: '--eevenkoto-border-width-action-ghost' },
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

const renderColors = (): string => `
  <div class="eevenkoto-tokens">
    <section class="eevenkoto-tokens__section">
      <h2 class="eevenkoto-tokens__heading">Colors</h2>
      <p class="eevenkoto-tokens__intro">Tier 1 primitives (primitivetokens.css) and Tier 2 semantic tokens (tokens.css). Only existing primitives are listed — no completist ramps.</p>
    </section>
    ${renderColorGroup('Turquoise (Tier 1)', turquoiseColors)}
    ${renderColorGroup('Parchment (Tier 1)', parchmentColors)}
    ${renderColorGroup('Gold (Tier 1)', goldColors)}
    ${renderColorGroup('Action (Tier 2)', actionColors)}
    ${renderColorGroup('Semantic (Tier 2)', semanticColors)}
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
      <p class="eevenkoto-tokens__intro">Border and stroke widths, including action aliases.</p>
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
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
};

export default meta;
type Story = StoryObj;

export const Colors: Story = {
  name: 'Colors',
  render: () => renderColors(),
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
