# @eevenkoto/react

Thin React wrappers around Eevenkoto’s BEM classes. Styling comes from `@eevenkoto/css`; class assembly from `@eevenkoto/core`.

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
import '@eevenkoto/css/heading.css';
import '@eevenkoto/css/paragraph.css';
import { Button, Flow, Heading, Paragraph } from '@eevenkoto/react';

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

Components: `Button`, `Heading`, `Paragraph`, `Caption`, `Flow`.

`Flow` uses `children` (not a `content` string like `@eevenkoto/html`).

## Related

- `@eevenkoto/css` — styles (required for appearance)
- `@eevenkoto/html` — reference vanilla renderers
- `@eevenkoto/vue` — Vue equivalents
