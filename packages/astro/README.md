# `@eevenkoto/astro`

Official **Astro** component wrappers for the Eevenkoto design system (`^4.0.0 || ^5.0.0 || ^6.0.0`), mirroring `@eevenkoto/core` and `@eevenkoto/html` 1:1 with native Astro `<slot />` composition.

Pair with **`@eevenkoto/css`** — components ship **zero bundled CSS**.

## Install

```bash
npm install @eevenkoto/astro @eevenkoto/css
```

## Usage

Import `@eevenkoto/css/styles.css` plus the component stylesheets you need in your Astro layout or page, then import components from `@eevenkoto/astro`:

```astro
---
import '@eevenkoto/css/styles.css';
import '@eevenkoto/css/card.css';
import '@eevenkoto/css/button.css';
import '@eevenkoto/css/icon.css';
import { Card, Button } from '@eevenkoto/astro';
---

<Card title="Aavevalo">
  <p>Luo haalea lyhty pimeään käytävään.</p>
  <Button slot="footer" variant="secondary" icon="copy" label="Kopioi" />
</Card>
```

### Named slots & pre-rendered inline HTML

Components accept both native Astro slots (`default`, `header`, `footer`, `icon`, `badge`, `actions`, `meta`, `controls`, `preview`) and sanitized `*Html` props (`bodyHtml`, `descriptionHtml`, `valueHtml`, `paragraphsHtml`, `flavorHtml`, `typeLineHtml`) for Markdown/rehype build pipelines that pre-render `EntityRef` / `InlineRef` links.

### Recursive `<Menu>` & `attributes`

`<Menu>` supports arbitrary-depth `MenuGroupEntry` nesting via `<Astro.self />` and forwards `attributes?: Record<string, string | boolean | undefined>` (`data-*`, `aria-*`, etc.) onto rendered menu controls and `<details>` branches for client-side tree filtering.
