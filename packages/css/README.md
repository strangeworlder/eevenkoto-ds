# @eevenkoto/css

Framework-free tokens, base styles, and component CSS for the Eevenkoto design system.

Source sheets live under `core/` and `domain/` (Atoms / Molecules / Organisms). Public import paths stay flat (`@eevenkoto/css/button.css`, …).

## Install

```bash
npm install @eevenkoto/css
```

## Usage

Import the base stylesheet once, then the CSS for each component you use:

```ts
import '@eevenkoto/css/styles.css';
import '@eevenkoto/css/button.css';
```

Import one sheet per component (flat paths). **Core:** `button`, `link-button`, `badge`, `status-dot`, `swatch`, `chip`, `heading`, `paragraph`, `list` (covers `List` + `ListItem`), `caption`, `frame`, `image`, `scroll`, `table-cell`, `icon`, `popover`, `inline-ref`, `avatar`, `input`, `checkbox`, `radio`, `select`, `toast`, `divider`, `progress-bar`, `property` (covers `Property` + `PropertyList`), `stat`, `flow`, `notice`, `field`, `checkbox-group`, `radio-group`, `stepper`, `segmented-control`, `card`, `tooltip-card`, `menu`, `catalog` (covers `Catalog` + `CatalogTile`), `prose`, `table`, `floating-banner`, `disclosure`, `chip-group`, `table-of-contents`, `section-header`, `table-shell`, `workshop`, `tier-card`, `account-menu`. **Domain:** `ability-name`, `entity-ref`, `ability-score` (covers `AbilityScore` + `AbilityScoreGroup`), `statblock-feature`, `statblock-section`, `statblock`, `spellblock`, `equipment-block`, `equipment-workshop`, `license-bar`, `document-header`, `content-table`, `entity-preview`, `read-aloud-box`, `npc-card`, `npc-card-grid`, `map-frame`, `content-gate`. Composed organisms such as `Statblock`, `Spellblock`, and `EquipmentBlock` import their atom/molecule companion sheets explicitly (for example `heading.css`, `caption.css`, `badge.css`, `chip.css`, `list.css`, `notice.css`, `button.css`, and `ability-name.css` for `EquipmentBlock`; see each component’s Storybook **Framework packages** section).

`styles.css` pulls Inter/Outfit from Google Fonts.

Also available:

- `@eevenkoto/css/tokens.css` — Tier 2 semantics + single-tier metrics (+ Tier 1 primitives)
- `@eevenkoto/css/primitive-tokens.css` — Tier 1 only (**never import in apps**; internal mapping layer)

## Theming & dark mode

Set `data-theme="light"` (default) or `data-theme="dark"` on `<html>` (or `<body>`), or `data-surface-mode="dark"` on a local dark container. All Tier 2 color roles (`surface-*`, `content-*`, `boundary-*`, `depth-*`, `control-*`, `feedback-*`, `form-input-*`, `link-*`) remap automatically — do not maintain manual dark-mode overrides for individual semantic tokens.

## Consume / never

**Consume** Tier 2 semantic colors (`--eevenkoto-color-surface-*`, `content-*`, `content-accent` / `content-accent-strong`, `boundary-*`, `depth-*` including `depth-scrim`, `control-*`, `feedback-*`, `form-input-*` including `form-input-placeholder`, `link-*`) and single-tier metrics (`--eevenkoto-space-*`, `--eevenkoto-font-size-heading-*` / `body-*` / `control-*` / `caption`, `--eevenkoto-font-weight-regular` / `semibold` / `bold`, `--eevenkoto-line-height-tight` / `snug` / `body`, `--eevenkoto-radius-*`, `--eevenkoto-line-width-*`, `--eevenkoto-duration-1`…`4`, `--eevenkoto-ease-standard` / `ease-in-out`, `--eevenkoto-z-base`…`toast`).

**Customize components** via public `--eevenkoto-<component>-*` variables only (for example `--eevenkoto-button-bg`, `--eevenkoto-card-bg`, `--eevenkoto-prose-link-color`). Bare `<a href>` inside `.eevenkoto-prose` are styled automatically with `link-*` tokens; inside `feedback-*` containers (`Notice`), links default to `currentColor` with an explicit underline for contrast safety.

**Never** reference hue primitives (`--eevenkoto-color-turquoise-*`, `parchment-*`, `obsidian-*`, `gold-*`, `green-*`, `orange-*`, `crimson-*`, `purple-*`), rem ladder steps (`--eevenkoto-font-size-xs`…`3xl`), private `--_eevenkoto-*` bridges, `opacity` for disabled UI, global/container `text-box-trim`, raw `z-index` numbers outside `--eevenkoto-z-*`, or raw `oklch()` / hex in app or component stylesheets.

For agents & site upgrades: feed Storybook `http://localhost:6006/llms.txt` or `/llms-full.txt` (generated via `npm run generate:llms`), and see `docs/migration-0.12-frontend-gap-resolution.md` and `docs/migration-token-architecture-and-a11y.md` when upgrading a consuming site. Contributors editing this package: see root `AGENTS.md`.

## Markup

This package is CSS only. Apply the documented BEM classes yourself, or use `@eevenkoto/html`, `@eevenkoto/react`, `@eevenkoto/vue`, or `@eevenkoto/astro` to assemble them.

```html
<button type="button" class="eevenkoto-button eevenkoto-button--primary">
  Save
</button>
```

**Button vs LinkButton:** `button.css` is for `<button>` actions. Navigation CTAs and standalone action links (`primary` / `secondary` / `ghost`) that go to a URL use `@eevenkoto/css/link-button.css` on `<a class="eevenkoto-link-button">` — do not restyle Button as a link. In-prose references use InlineRef / EntityRef.

## Related

- `@eevenkoto/core` — shared prop types and className helpers
- `@eevenkoto/html` — vanilla HTML string renderers
- `@eevenkoto/react` / `@eevenkoto/vue` / `@eevenkoto/astro` — thin framework wrappers
