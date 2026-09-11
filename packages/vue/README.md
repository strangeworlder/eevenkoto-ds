# @eevenkoto/vue

Thin Vue wrappers around Eevenkoto’s BEM classes. Source lives under `core/` and `domain/` (Atoms / Molecules / Organisms); the package barrel keeps a stable public API. Styling comes from `@eevenkoto/css`; class assembly from `@eevenkoto/core`.

## Install

```bash
npm install @eevenkoto/css @eevenkoto/vue vue
```

Peer: `vue` ^3.5.

## Usage

```vue
<script setup lang="ts">
import '@eevenkoto/css/styles.css';
import '@eevenkoto/css/button.css';
import '@eevenkoto/css/flow.css';
import '@eevenkoto/css/prose.css';
import '@eevenkoto/css/heading.css';
import '@eevenkoto/css/paragraph.css';
import { Button, Flow, Heading, Paragraph, Prose } from '@eevenkoto/vue';
</script>

<template>
  <Flow>
    <Heading :level="2" text="Section title" />
    <Paragraph text="Body copy." />
    <Button variant="primary" label="Save" />
  </Flow>
</template>
```

Import each component’s CSS from `@eevenkoto/css` (for example `@eevenkoto/css/badge.css`). Live Storybook docs under **Framework packages** show HTML, React, and Vue for every published component.

### Core

- Atoms: `Badge`, `Button`, `Caption`, `Frame`, `Heading`, `Paragraph`, `ListItem`, `Property`, `Scroll`, `Stat`, `TableCell`
- Molecules: `Flow`, `Prose`, `List`, `PropertyList`, `Table`
- Organisms: `TableShell`

### Domain

- Molecules: `AbilityScore`, `StatblockFeature`, `StatblockSection`
- Organisms: `AbilityScoreGroup`, `Statblock`

`Flow` / `Prose` / `Frame` / `Scroll` / `TableShell` use the default slot (not a `content` string like `@eevenkoto/html`). `AbilityScoreGroup` / `TableShell` also expose named slots (`header` / `footer`). Compose Prose with Flow for bare-tag reading content. CamelCase props become kebab-case in templates (`typeLine` → `type-line`).

## Related

- `@eevenkoto/css` — styles (required for appearance; consume / never rules live there)
- `@eevenkoto/html` — reference vanilla renderers
- `@eevenkoto/react` — React equivalents

For agents: feed Storybook `/llms.txt` or `/llms-full.txt` (generated via `npm run generate:llms`).
