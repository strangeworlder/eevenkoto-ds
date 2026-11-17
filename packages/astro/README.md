# `@eevenkoto/astro`

Official **Astro** component wrappers for the Eevenkoto design system (`^4.0.0 || ^5.0.0 || ^6.0.0 || ^7.0.0`), mirroring `@eevenkoto/core` and `@eevenkoto/html` 1:1 with native Astro `<slot />` composition.

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

Components accept both native Astro slots (`default`, `header`, `headerActions`, `footer`, `icon`, `badge`, `action`, `actions`, `caption`, `summaryLead`, `summaryMeta`, `controls`, `toolbar`, `preview`) and sanitized `*Html` props (`nameHtml`, `titleHtml`, `leadHtml`, `roleHtml`, `captionHtml`, `bodyHtml`, `descriptionHtml`, `valueHtml`, `paragraphsHtml`, `flavorHtml`, `typeLineHtml`, `svgHtml`) for Markdown/rehype build pipelines that pre-render `EntityRef` / `InlineRef` links.

### Recursive `<Menu>` & `attributes`

`<Menu>` supports arbitrary-depth `MenuGroupEntry` nesting via `<Astro.self />` and forwards `attributes?: Record<string, string | boolean | undefined>` (`data-*`, `aria-*`, etc.) onto rendered menu controls and `<details>` branches for client-side tree filtering.

### Core

- Atoms: `Avatar`, `Badge`, `Button`, `Caption`, `Checkbox`, `Chip`, `Divider`, `Frame`, `Heading`, `Icon`, `Image`, `InlineRef`, `Input`, `LinkButton`, `ListItem`, `Paragraph`, `Popover`, `ProgressBar`, `Property`, `Radio`, `Scroll`, `Select`, `Stat`, `StatusDot`, `Swatch`, `TableCell`, `Toast`
- Molecules: `Card`, `Catalog`, `CatalogTile`, `CheckboxGroup`, `ChipGroup`, `Disclosure`, `Field`, `FloatingBanner`, `Flow`, `List`, `Menu`, `Notice`, `PropertyList`, `Prose`, `RadioGroup`, `SectionHeader`, `SegmentedControl`, `Stepper`, `Table`, `TableOfContents`, `TooltipCard`
- Organisms: `AccountMenu`, `TableShell`, `TierCard`, `Workshop`

### Domain

- Atoms: `AbilityName`, `EntityRef`
- Molecules: `AbilityScore`, `ContentTable`, `DocumentHeader`, `EntityPreview`, `LicenseBar`, `MapFrame`, `NpcCard`, `ReadAloudBox`, `StatblockFeature`, `StatblockSection`
- Organisms: `AbilityScoreGroup`, `ContentGate`, `EquipmentBlock`, `EquipmentWorkshop`, `NpcCardGrid`, `Spellblock`, `Statblock`

`EquipmentBlock` (like `Statblock` and `Spellblock`) composes companion stylesheets that are imported explicitly alongside `@eevenkoto/css/equipment-block.css` (`heading.css`, plus `caption.css`, `badge.css`, `chip.css`, `list.css`, `notice.css`, `button.css`, and `ability-name.css` for the sections you render).

## Related

- `@eevenkoto/css` — styles (required for appearance; consume / never rules and theming live there)
- `@eevenkoto/core` — shared prop types and className helpers
- `@eevenkoto/html` / `@eevenkoto/react` / `@eevenkoto/vue` — vanilla, React, and Vue equivalents
- Repo `CHANGELOG.md`, `docs/migration-0.14-calling-card-surfaces.md`, `docs/migration-0.13-playbill-chrome-and-icons.md`, `docs/migration-0.12-frontend-gap-resolution.md`, and `docs/migration-token-architecture-and-a11y.md` — upgrade & token migration checklists for consuming sites

For agents: feed Storybook `/llms.txt` or `/llms-full.txt` (generated via `npm run generate:llms`).
