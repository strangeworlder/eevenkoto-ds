# @eevenkoto/core

Shared prop types and pure className helpers for Eevenkoto. No DOM, no templates, no CSS.

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
  size: 'small',
  icon: 'star',
});
// "eevenkoto-button eevenkoto-button--primary eevenkoto-button--small eevenkoto-button--icon-left"
```

Helpers: `buttonClassNames`, `headingClassNames`, `paragraphClassNames`, `captionClassNames`, `flowClassNames`.

Pair with `@eevenkoto/css` for styling.

## Related

- `@eevenkoto/css` — tokens and component styles
- `@eevenkoto/html` / `@eevenkoto/react` / `@eevenkoto/vue` — markup bindings
