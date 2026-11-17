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

`@eevenkoto/css` is an **optional peer** — import each component sheet (for example `@eevenkoto/css/badge.css`) or the UI is unstyled. Live Storybook docs under **Framework packages** show HTML, React, Vue, and Astro usage across published components.

### Core

- Atoms: `Avatar`, `Badge`, `Button`, `Caption`, `Checkbox`, `Chip`, `Divider`, `Frame`, `Heading`, `Icon`, `Image`, `InlineRef`, `Input`, `LinkButton`, `ListItem`, `Paragraph`, `Popover`, `ProgressBar`, `Property`, `Radio`, `Scroll`, `Select`, `Stat`, `StatusDot`, `Swatch`, `TableCell`, `Toast`
- Molecules: `Card`, `Catalog`, `CatalogTile`, `CheckboxGroup`, `ChipGroup`, `Disclosure`, `Field`, `FloatingBanner`, `Flow`, `List`, `Menu`, `Notice`, `PropertyList`, `Prose`, `RadioGroup`, `SectionHeader`, `SegmentedControl`, `Stepper`, `Table`, `TableOfContents`, `TooltipCard`
- Organisms: `AccountMenu`, `TableShell`, `TierCard`, `Workshop`

`Button` = in-page action. `LinkButton` = prominent URL CTA or standalone action link (`primary` / `secondary` / `ghost`; `href` required; import `@eevenkoto/css/link-button.css`). Never put `href` on `Button`. Inline terms use `InlineRef` / `EntityRef`.

### Domain

- Atoms: `AbilityName`, `EntityRef`
- Molecules: `AbilityScore`, `ContentTable`, `DocumentHeader`, `EntityPreview`, `LicenseBar`, `MapFrame`, `NpcCard`, `ReadAloudBox`, `StatblockFeature`, `StatblockSection`
- Organisms: `AbilityScoreGroup`, `ContentGate`, `EquipmentBlock`, `EquipmentWorkshop`, `NpcCardGrid`, `Spellblock`, `Statblock`

`Flow` / `Prose` / `Frame` / `Scroll` / `TableShell` use `children` (not a `content` string like `@eevenkoto/html`). For bare-tag reading content, compose both hosts: `<Prose className="eevenkoto-flow">…</Prose>`. `EquipmentBlock` (like `Statblock` and `Spellblock`) composes companion stylesheets alongside `@eevenkoto/css/equipment-block.css` (`heading.css`, plus `caption.css`, `badge.css`, `chip.css`, `list.css`, `notice.css`, `button.css`, and `ability-name.css` for the sections you render).

## Related

- `@eevenkoto/css` — styles (required for appearance; consume / never rules and theming live there)
- `@eevenkoto/html` — reference vanilla renderers
- `@eevenkoto/vue` / `@eevenkoto/astro` — Vue and Astro equivalents
- Repo `CHANGELOG.md`, `docs/migration-0.13-playbill-chrome-and-icons.md`, `docs/migration-0.12-frontend-gap-resolution.md`, and `docs/migration-token-architecture-and-a11y.md` — upgrade & token migration checklists for consuming sites

For agents: feed Storybook `/llms.txt` or `/llms-full.txt` (generated via `npm run generate:llms`).
