# @eevenkoto/html

Canonical vanilla API for Eevenkoto: HTML templates + `render*` functions that return markup strings.

## Install

```bash
npm install @eevenkoto/css @eevenkoto/html
```

## Usage

CSS is not injected for you — import it explicitly:

```ts
import '@eevenkoto/css/styles.css';
import '@eevenkoto/css/button.css';
import { renderButton } from '@eevenkoto/html';

document.body.innerHTML = renderButton({
  variant: 'primary',
  label: 'Save',
});
```

Also exported: `renderHeading`, `renderParagraph`, `renderCaption`, `renderFlow`.

`renderFlow` takes a `content` string (concatenate child HTML yourself). React/Vue use children / slots instead.

Class names and prop types come from `@eevenkoto/core`.

## Related

- `@eevenkoto/css` — styles
- `@eevenkoto/core` — shared contract
- `@eevenkoto/react` / `@eevenkoto/vue` — framework wrappers over the same classes
