# @eevenkoto/css

Framework-free tokens, base styles, and component CSS for the Eevenkoto design system.

Source sheets live under `core/` and `domain/` (Atoms / Molecules / Organisms). Public import paths stay flat (`@eevenkoto/css/button.css`, …).

## Install

```bash
npm install @eevenkoto/css
```

## Usage

Import the base stylesheet once, then the CSS for each component you use:

```ts
import '@eevenkoto/css/styles.css';
import '@eevenkoto/css/button.css';
```

Import one sheet per component (flat paths). **Core:** `button`, `link-button`, `badge`, `heading`, `paragraph`, `list`, `caption`, `frame`, `scroll`, `table-cell`, `icon`, `popover`, `inline-ref`, `avatar`, `input`, `property`, `stat`, `flow`, `notice`, `field`, `segmented-control`, `card`, `tooltip-card`, `menu`, `prose`, `table`, `table-shell`. **Domain:** `entity-ref`, `ability-score`, `statblock-feature`, `statblock-section`, `statblock`, `spellblock`. AbilityScoreGroup has no dedicated sheet (uses ability-score).

`styles.css` pulls Inter/Outfit from Google Fonts.

Also available:

- `@eevenkoto/css/tokens.css` — Tier 2 semantics (+ Tier 1 primitives)
- `@eevenkoto/css/primitive-tokens.css` — Tier 1 only (**do not import in apps**; internal mapping layer)

## Consume / never

**Consume** Tier 2 semantic colors (`--eevenkoto-color-surface-*`, `content-*`, `control-*`, …) and metrics (`--eevenkoto-space-*`, `--eevenkoto-font-size-heading-*` / `body-*` / `control-*`, `--eevenkoto-radius-*`, `--eevenkoto-line-width-*`).

**Never** reference hue primitives (`--eevenkoto-color-turquoise-*`, `parchment-*`, `gold-*`, …), rem ladder steps (`--eevenkoto-font-size-xs`…`3xl`), or raw `oklch()` / hex in app or component stylesheets.

For agents: when Storybook is running, feed `http://localhost:6006/llms.txt` or `/llms-full.txt` (generated from this README and foundations MDX via `npm run generate:llms`). Contributors editing this package: see root `AGENTS.md`.

## Markup

This package is CSS only. Apply the documented BEM classes yourself, or use `@eevenkoto/html`, `@eevenkoto/react`, or `@eevenkoto/vue` to assemble them.

```html
<button type="button" class="eevenkoto-button eevenkoto-button--primary">
  Save
</button>
```

**Button vs LinkButton:** `button.css` is for `<button>` actions. Marketing CTAs that go to a URL use `@eevenkoto/css/link-button.css` on `<a class="eevenkoto-link-button">` — do not restyle Button as a link. In-prose references use InlineRef.

## Related

- `@eevenkoto/core` — shared prop types and className helpers
- `@eevenkoto/html` — vanilla HTML string renderers
- `@eevenkoto/react` / `@eevenkoto/vue` — thin framework wrappers
