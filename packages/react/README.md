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

`@eevenkoto/css` is an **optional peer** — import each component sheet (for example `@eevenkoto/css/badge.css`) or the UI is unstyled. Live Storybook docs under **Framework packages** show HTML, React, and Vue for every published component.

### Core

- Atoms: `Avatar`, `Badge`, `Button`, `Caption`, `Frame`, `Heading`, `Icon`, `InlineRef`, `Input`, `LinkButton`, `ListItem`, `Paragraph`, `Popover`, `Property`, `Scroll`, `Stat`, `TableCell`
- Molecules: `Card`, `Field`, `Flow`, `List`, `Menu`, `Notice`, `Prose`, `PropertyList`, `SegmentedControl`, `Table`, `TooltipCard`
- Organisms: `TableShell`

`Button` = in-page action. `LinkButton` = prominent URL CTA (`href` required; import `@eevenkoto/css/link-button.css`). Never put `href` on `Button`. Inline terms use `InlineRef`.

### Domain

- Atoms: `EntityRef`
- Molecules: `AbilityScore`, `StatblockFeature`, `StatblockSection`
- Organisms: `AbilityScoreGroup`, `Statblock`, `Spellblock`

`Flow` / `Prose` / `Frame` / `Scroll` / `TableShell` use `children` (not a `content` string like `@eevenkoto/html`). For bare-tag reading content, compose both hosts: `<Prose className="eevenkoto-flow">…</Prose>`.

## Related

- `@eevenkoto/css` — styles (required for appearance; consume / never rules live there)
- `@eevenkoto/html` — reference vanilla renderers
- `@eevenkoto/vue` — Vue equivalents

For agents: feed Storybook `/llms.txt` or `/llms-full.txt` (generated via `npm run generate:llms`).
