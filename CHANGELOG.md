# Changelog

All notable changes to the `@eevenkoto/*` packages are documented here.

Published package version is **0.7.0**.

## Unreleased

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
