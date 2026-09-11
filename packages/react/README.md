# @eevenkoto/react

Thin React wrappers around Eevenkoto’s BEM classes. Source lives under `core/` and `domain/` (Atoms / Molecules / Organisms); the package barrel keeps a stable public API. Styling comes from `@eevenkoto/css`; class assembly from `@eevenkoto/core`.

## Install

```bash
npm install @eevenkoto/css @eevenkoto/react react
```

Peer: `react` ^18 or ^19.

## Usage

```tsx
import '@eevenkoto/css/styles.css';
import '@eevenkoto/css/button.css';
import '@eevenkoto/css/flow.css';
import '@eevenkoto/css/prose.css';
import '@eevenkoto/css/heading.css';
import '@eevenkoto/css/paragraph.css';
import { Button, Flow, Heading, Paragraph, Prose } from '@eevenkoto/react';

export function Example() {
  return (
    <Flow>
      <Heading level={2} text="Section title" />
      <Paragraph text="Body copy." />
      <Button variant="primary" label="Save" />
    </Flow>
  );
}
```

Components: `Button`, `Heading`, `Paragraph`, `Caption`, `Flow`, `Prose`.

`Flow` / `Prose` use `children` (not a `content` string like `@eevenkoto/html`). For bare-tag reading content, compose both hosts: `<Prose className="eevenkoto-flow">…</Prose>`.

## Related

- `@eevenkoto/css` — styles (required for appearance; consume / never rules live there)
- `@eevenkoto/html` — reference vanilla renderers
- `@eevenkoto/vue` — Vue equivalents

For agents: feed Storybook `/llms.txt` or `/llms-full.txt` (generated via `npm run generate:llms`).