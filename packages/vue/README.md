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

`@eevenkoto/css` is an **optional peer** — import each component sheet (for example `@eevenkoto/css/badge.css`) or the UI is unstyled. Live Storybook docs under **Framework packages** show HTML, React, and Vue for every published component.

### Core

- Atoms: `Avatar`, `Badge`, `Button`, `Caption`, `Checkbox`, `Chip`, `Frame`, `Heading`, `Icon`, `Image`, `InlineRef`, `Input`, `LinkButton`, `ListItem`, `Paragraph`, `Popover`, `Property`, `Radio`, `Scroll`, `Select`, `Stat`, `StatusDot`, `TableCell`, `Toast`
- Molecules: `Card`, `Catalog`, `CatalogTile`, `CheckboxGroup`, `Field`, `Flow`, `List`, `Menu`, `Notice`, `Prose`, `PropertyList`, `RadioGroup`, `SegmentedControl`, `Stepper`, `Table`, `TooltipCard`
- Organisms: `TableShell`

`Button` = in-page action. `LinkButton` = prominent URL CTA (`href` required; import `@eevenkoto/css/link-button.css`). Never put `href` on `Button`. Inline terms use `InlineRef`.

### Domain

- Atoms: `AbilityName`, `EntityRef`
- Molecules: `AbilityScore`, `StatblockFeature`, `StatblockSection`
- Organisms: `AbilityScoreGroup`, `EquipmentBlock`, `EquipmentWorkshop`, `Spellblock`, `Statblock`

`Flow` / `Prose` / `Frame` / `Scroll` / `TableShell` use the default slot (not a `content` string like `@eevenkoto/html`). `AbilityScoreGroup` / `TableShell` also expose named slots (`header` / `footer`). Compose Prose with Flow for bare-tag reading content. When `EquipmentBlock` renders `abilities` (or you render `AbilityName` directly), also import `@eevenkoto/css/ability-name.css`. CamelCase props become kebab-case in templates (`typeLine` → `type-line`).

## Related

- `@eevenkoto/css` — styles (required for appearance; consume / never rules and theming live there)
- `@eevenkoto/html` — reference vanilla renderers
- `@eevenkoto/react` — React equivalents
- Repo `CHANGELOG.md` and `docs/migration-token-architecture-and-a11y.md` — upgrade & token migration checklist for consuming sites

For agents: feed Storybook `/llms.txt` or `/llms-full.txt` (generated via `npm run generate:llms`).
