# @eevenkoto/vue

Thin Vue wrappers around Eevenkoto’s BEM classes. Styling comes from `@eevenkoto/css`; class assembly from `@eevenkoto/core`.

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
import '@eevenkoto/css/heading.css';
import '@eevenkoto/css/paragraph.css';
import { Button, Flow, Heading, Paragraph } from '@eevenkoto/vue';
</script>

<template>
  <Flow>
    <Heading :level="2" text="Section title" />
    <Paragraph text="Body copy." />
    <Button variant="primary" label="Save" />
  </Flow>
</template>
```

Components: `Button`, `Heading`, `Paragraph`, `Caption`, `Flow`.

`Flow` uses the default slot (not a `content` string like `@eevenkoto/html`).

## Related

- `@eevenkoto/css` — styles (required for appearance)
- `@eevenkoto/html` — reference vanilla renderers
- `@eevenkoto/react` — React equivalents
