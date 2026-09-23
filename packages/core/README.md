# @eevenkoto/core

Shared prop types and pure className helpers for Eevenkoto. No DOM, no templates, no CSS.

Source modules live under `core/` and `domain/` (Atoms / Molecules / Organisms). The package root barrel keeps a stable public API.

Most apps use this indirectly through `@eevenkoto/html`, `@eevenkoto/react`, or `@eevenkoto/vue`.

## Install

```bash
npm install @eevenkoto/core
```

## Usage

```ts
import { buttonClassNames, type ButtonProps } from '@eevenkoto/core';

const className = buttonClassNames({
  variant: 'primary',
  size: 'sm',
  icon: 'star',
});
// "eevenkoto-button eevenkoto-button--primary eevenkoto-button--sm eevenkoto-button--icon-left"
```

Helpers include `buttonClassNames`, `linkButtonClassNames`, `badgeClassNames`, `statusDotClassNames`, `chipClassNames`, `headingClassNames`, `iconClassNames`, `inputClassNames`, `fieldClassNames`, `menuClassNames`, `catalogClassNames`, `popoverClassNames`, `noticeClassNames`, `cardClassNames`, plus Domain helpers (`entityRefClassNames`, `abilityScoreClassNames`, `statblockClassNames`, `spellblockClassNames`, …). Full export list: `src/index.ts`.

Pair with `@eevenkoto/css` for styling.

**Button vs LinkButton:** in-page actions → `buttonClassNames` / Button. Prominent “go to URL” CTAs → `linkButtonClassNames` / LinkButton (`<a>`, never `href` on Button). Terms in copy → InlineRef. Chooser: Storybook Glossary.

## Related

- `@eevenkoto/css` — tokens and component styles (consume / never rules live there)
- `@eevenkoto/html` / `@eevenkoto/react` / `@eevenkoto/vue` — markup bindings

For agents: feed Storybook `/llms.txt` or `/llms-full.txt` (generated via `npm run generate:llms`).