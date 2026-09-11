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
import '@eevenkoto/css/heading.css';
import '@eevenkoto/css/paragraph.css';
import '@eevenkoto/css/list.css';
import '@eevenkoto/css/caption.css';
import '@eevenkoto/css/frame.css';
import '@eevenkoto/css/scroll.css';
import '@eevenkoto/css/table-cell.css';
import '@eevenkoto/css/flow.css';
import '@eevenkoto/css/prose.css';
import '@eevenkoto/css/table.css';
import '@eevenkoto/css/table-shell.css';
```

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

## Related

- `@eevenkoto/core` — shared prop types and className helpers
- `@eevenkoto/html` — vanilla HTML string renderers
- `@eevenkoto/react` / `@eevenkoto/vue` — thin framework wrappers
