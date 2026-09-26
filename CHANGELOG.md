# Changelog

All notable changes to the `@eevenkoto/*` packages are documented here.

Published package version is **0.9.0**.

## 0.9.0

### Changed

- Package versions **0.9.0**
- **Card** — semantic markup: host is `<article>` wrapping native `<header>` / flow / `<footer>`, and `title` renders a real heading (`titleLevel`, default 2) whose look is remapped on the card. `href` no longer swaps the host to `<a>`; it wraps the sections in an inner link so `header` / `footer` stay scoped to the card. `__header` / `__body` / `__footer` remain optional aliases
- **TooltipCard** — same pass for `<header>` / `<footer>` + real heading (`titleLevel`, default 2). The body stays `.eevenkoto-tooltip-card__body` because it is the scroll region
- **Menu** — host is `<nav>` wrapping nested `<ul>` / `<li>` / `<a>` (or `<button>` only as an in-page escape hatch). Hand-authored links need no item BEM; current page is `aria-current="page"`. Nested branches are native `<details>` / `<summary>` with a CSS disclosure triangle (no Icon). The lock glyph tracks item ink (`currentColor`) through selected and disabled
- **Table** — bare `caption` / `tr` / `th` / `td` under `.eevenkoto-table` get the recipe. Only non-default kinds stay opt-in (`--index`, `--numeric`). `tableCellClassNames({ inTable: true })` omits the base class for text cells
- **TableShell** — sticky index stripe follows the Table host’s default row stripe, including tables that never set `--stripe-row`

### Removed

- **TooltipCard `scrollBody`** — the body now caps itself at `--eevenkoto-tooltip-card-body-max-block-size` and scrolls, so the panel never pushes its footer out. This drops the Scroll composition (`eevenkoto-scroll eevenkoto-scroll--y` merged onto `__body`, which also required a separate `@eevenkoto/css/scroll.css` import to work at all); `tooltipCardBodyClassNames()` now takes no argument
- **`tableCaptionClassNames()`** — a caption is only valid inside a table, so the host styles an unclassed `<caption>`

### Fixed

- **Catalog** / **Menu** — name and label truncation clips on the inline axis only, so global `text-box: trim-both` no longer shears descenders

## 0.8.1

### Added

- **Chip** (Core atom) — interactive filter or role control (`selected`, sm/md/lg). Host alone is unselected + md. Renders as `<button>` or `<a href>`. New `@eevenkoto/css/chip.css`
- **StatusDot** (Core atom) — unlabeled readiness pip; same `intent` set as Badge. Host alone is neutral. New `@eevenkoto/css/status-dot.css`
- **Catalog** (Core molecule) — dense index grid of linked CatalogTiles (optional StatusDot + name + lock). New `@eevenkoto/css/catalog.css`
- **InlineRef `unlinked`** — known term with no destination (`<span>`, italic + dotted underline). **`locked`** — trailing lock glyph, may combine with `href` (`lockedLabel`, default Locked)
- **Menu `embedded`** — transparent flush surface for a sunken sidebar. Items gain `locked` / `lockedLabel` and a trailing `status` StatusDot
- **EntityRef** kinds **`class`** and **`creature`**. EntityRef now extends InlineRef, so `unlinked` and `locked` apply
- Icon glyph **`menu`**. Button’s icon subset adds `lock`, `menu`, and `search`
- Foundations **Class entry recipe** — class / background / species pages composed from PropertyList, TableShell, EntityRef, and StatblockFeature (no Classblock)

### Changed

- Package versions **0.8.1**
- **`menuItemClassNames`** — argument is `{ selected, locked }` (was a `selected` boolean)
- **Print** — `html` / `body` print background is transparent (0.8.0 painted the canvas color onto the sheet)

### Fixed

- **Storybook** — Vite no longer pre-bundles the workspace packages, so `npm run build` exports show up without a stale optimize-deps cache

## 0.8.0

### Added

- **Print columns** — `@media print` restyles the same document into two snaking columns. Outermost Prose sets `columns: 2` / `column-fill: auto`; nested Prose does not open a second column context. No print route and no `eevenkoto-print-*` class. Foundations/Print columns
- **`@page`** — A4, 18mm margin, with `print-color-adjust: exact` on `html` / `body`

### Changed

- Package versions **0.8.0**
- **Print defaults** on existing hosts: direct-child `h1` / `h2` of Prose span both columns; Statblock, Spellblock, Card, and Notice use `break-inside: avoid`; TableShell and AbilityScoreGroup span and avoid a split; Scroll becomes `overflow: visible`; Menu, Popover, and TooltipCard are `display: none`

## 0.7.0

### Added

- **Spellblock** (Domain organism) — 5.5e spell entry as a banded parchment card: title plate closed by the gold accent rule, boxed casting-property band (two-column quadrant from `34rem` of card width), effect prose, and scaling run-ins on a faint footer band. Reuses StatblockFeature for scaling; new `@eevenkoto/css/spellblock.css`
- **Spellblock `deck` variant** — compact card for spell grids; `container-type: inline-size` so bands track the card, plus explicit long-compound handling (`overflow-wrap`, `hyphens: auto` via the new `lang` prop, stacked property labels without the CSS colon)

### Changed

- Package versions **0.7.0**
- **Property / PropertyList (React)** — `value` widened to `ReactNode` so definition rows can nest EntityRef and inline emphasis; string values are unchanged
- **Heading** — `runIn` now supports level **2** as well as 3 and 6, for entries that have no section heading to sit under. A run-in H2 drops the macro H2 bottom rule and padding
- **StatblockFeature** — new optional `level` (`2 | 3 | 6`, default `3`); the visual remap is keyed on `.eevenkoto-heading--run-in` instead of `--3`, so the name looks identical at any level. Statblock is unchanged

### Fixed

- **Spellblock** — scaling run-ins were H3 under an H1 spell name, skipping a level. They now render one level below the name (H2 by default, H3 when `nameLevel: 2`)

## 0.6.0

### Added

- Root README and Foundations/Decisions: product scope (TTRPG content DS, token-only vs shipped)
- Stylelint `stylelint-eevenkoto` rules, contrast audit, Vitest html/react/vue contract tests, GitHub Actions CI
- Dark theme + `data-surface-mode="dark"` remaps (obsidian primitives); Storybook theme toolbar
- Chromatic workflow (opt-in via `CHROMATIC_PROJECT_TOKEN`)
- Property atom Storybook page
- Component Why/When index in `llms-full.txt`

### Changed

- Package versions **0.6.0**

## 0.5.0

### Added

- **LinkButton** (Core atom) — CTA `<a>` with Button’s control recipe, inline-end scoop, and forward translate (not a Button with `href`)
- **InlineRef** (Core atom) — product-agnostic inline reference chrome (`name`, optional `href`); Popover/TooltipCard Core demos use it
- **TooltipCard** (Core molecule) — header / scrollable body / footer chrome for entity tooltips
- **EntityRef** (Domain atom) — specializes InlineRef with closed kinds: `condition`, `mechanic`, `classFeature`, `spell`, `item`
- **Menu** (Core molecule) — entries API with header / separator / item (+ selected) and nested `group` branches (`<details>`) for multi-level nav
- **Avatar** (Core atom) — circular portrait: image or parchment `user` placeholder (sm/md/lg); no initials / status ring
- **Input** (Core atom) — form tokens; search recipe; invalid / disabled; `describedBy` for hint/error association
- **Field** (Core molecule) — visible label + control slot + hint/error (WCAG basics: no placeholder-as-name, no color-only errors)
- Tier 2 **motion** metrics — `--eevenkoto-duration-1`…`4` (50–200ms) and `--eevenkoto-ease-standard` / `--eevenkoto-ease-in-out` (Button’s stagger as the ladder)
- **Icon glyph tokens** — `ICON_NAMES` / `iconPaths` / `BUTTON_ICON_NAMES` in `@eevenkoto/core` `tokens/icons` (catalog under Foundations/Tokens)

### Changed

- **SegmentedControl** — `mode: 'radios' | 'links'` for no-JS in-page radios vs alternate-page links (`aria-current`); removed button/`aria-pressed` markup
- **Popover** — `fixed` + `open` (portal recipe for JS tooltips); Core docs/stories use InlineRef triggers (Domain EntityRef optional in product); open motion uses duration/ease tokens
- **EntityRef** — specializes Core InlineRef (shared chrome + kind bridge remaps); rest state transparent fill/border; kind chip on hover / `:focus-visible`
- **TooltipCard** docs — Why/When + vs Card / InlineRef / EntityRef / Popover; Core stories no longer import EntityRef
- **Button** — hover/press transitions consume duration/ease tokens (same timings as before); composes Icon atom; `icon` restricted to `BUTTON_ICON_NAMES`
- **Icon** — chrome only (size / `currentColor`); no longer owns the glyph inventory
- **Input** — accessible name prop is `ariaLabel` (not `label`); docs/stories are chrome-only — form rows live on Field
- **Field** / **Input** docs — explicit Field vs Input decision tables; glossary clarifies the split
- **Caption** — default ink uses new Tier 2 `content-tertiary` (Tier 1 `parchment-text-subtle`); quieter than Paragraph secondary
- **Caption** / **Paragraph** / Typography docs — Caption vs Paragraph decision tables
- **Avatar** — parchment surface placeholder (not turquoise); initials API removed; placeholder uses Icon `user`
- **Form input** — rest fill uses new Tier 1 `parchment-background-bright` (near-white) so Input separates from Card / canvas
- **Input** docs/stories — prefer Field + visible label; invalid only demonstrated with error text

## 0.4.0

### Added

- Tier 2 **`link`**, **`form`**, and **`control-destructive`** tokens
- **Popover** (Core atom) — raised surface with placement + optional arrow (CSS-only)
- **Icon** (Core atom) + shared glyph paths (later moved to `tokens/icons` in 0.5.0)
- **Card** (Core molecule) — slotted surface with `--elevated` / `--interactive`

## 0.3.0

### Added

- **Notice** (Core molecule) — feedback callout (intent × variant, same set as Badge)
- **SegmentedControl** (Core molecule) — exclusive option group on control primary / secondary (later refined to radios/links in 0.5.0)

## 0.2.0

Baseline published packages (typography, Badge, Button, Frame, table stack, Statblock domain).
