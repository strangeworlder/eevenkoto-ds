# @eevenkoto/css

Framework-free tokens, base styles, and component CSS for the Eevenkoto design system.

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
import '@eevenkoto/css/caption.css';
import '@eevenkoto/css/flow.css';
```

Also available:

- `@eevenkoto/css/tokens.css` — Tier 2 semantics (+ Tier 1 primitives)
- `@eevenkoto/css/primitivetokens.css` — Tier 1 only

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
