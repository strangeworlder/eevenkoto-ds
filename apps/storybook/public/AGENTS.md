# AGENTS.md — contributing to Eevenkoto

Operating rules for agents and humans editing **this repository**. For installing and using published packages, feed Storybook’s [`/llms.txt`](http://localhost:6006/llms.txt) / [`/llms-full.txt`](http://localhost:6006/llms-full.txt) (generated from package READMEs, foundations MDX, and a short per-component index). Same files are written to the repo root by `npm run generate:llms`.

**Product scope:** Eevenkoto is a **TTRPG content design system with growing core chrome**, not a full app kit. Dialog, Pager, Tabs, and AppShell / Sidebar are out of scope. Some Tier 2 roles (modals, destructive controls) are **token-only**. Core includes portable feedback, form, page, and generator chrome (Toast, Input, Select, Checkbox, Radio, CheckboxGroup, RadioGroup, Stepper, SegmentedControl, Disclosure, ChipGroup, ProgressBar, FloatingBanner, TableOfContents, SectionHeader, TierCard, AccountMenu, Workshop, Swatch, Divider). See root `README.md` and Storybook **Foundations/Decisions**.

## Aesthetic & form language

Eevenkoto’s visual identity draws from **1920s clubs, jazz, speakeasies, and letterpress print** — avoid generic rounded SaaS boxes and `9999px` status pills when designing or restyling chrome:

- **Interactive controls & tactical plates** (`Button`, `LinkButton`, `EquipmentBlock`, `AbilityScoreGroup`): concave scooped corners (`corner-shape: scoop`) and tactile brass/turquoise/parchment contrast.
- **Non-interactive feedback & status print** (`Notice`, `Badge`): sharp-cornered (`border-radius: 0`) **Playbill / Stamp** framing — heavy horizontal ink rules (Oxford double rules on `Notice`; `2px` block rules + `1px` inline hairlines + `◆` diamond stub on `Badge`), hairline column dividers, `Outfit` (`--eevenkoto-font-serif`) display labels, and `--eevenkoto-color-content-accent` (warm bronze on parchment, club brass in dark mode) on `neutral`.
- **Keep domain siblings coherent**: Components sharing a Tier 2 domain (`Notice` + `Badge` in `feedback-*`, `Button` + `LinkButton` in `control-*`) share visual DNA. When restyling one, audit its domain siblings; when removing/changing a prop in `@eevenkoto/core`, grep both literal call sites and spread forwards (e.g. `TierCard` forwarding `BadgeProps`) and preserve bare-host fallbacks (e.g. `EquipmentBlock` rendering `.eevenkoto-badge` / `.eevenkoto-notice` without inner BEM wrappers).

## Repo map

| Path | Role |
| --- | --- |
| `packages/css` | Tokens, base styles, Core/Domain component CSS (appearance SoT) |
| `packages/core` | Shared prop types + `*ClassNames()` helpers (no DOM) |
| `packages/html` | Canonical vanilla `render*` markup |
| `packages/react` / `packages/vue` / `packages/astro` | Thin wrappers over the same classes |
| `apps/storybook` | Docs and live catalogs |

## Source of truth (when authoring)

1. **CSS** defines appearance (`packages/css`).
2. **Core** defines the public prop contract and BEM class assembly.
3. **HTML** is the reference markup (Storybook canvases).
4. **React / Vue / Astro** only map props → the same class strings and elements.

## Tokens

| Tier | File | Who consumes it |
| --- | --- | --- |
| 1 — Primitives | `packages/css/tokens/primitive-tokens.css` | Tier 2 only |
| 2 — Semantics | `packages/css/tokens/tokens.css` | Layouts, utilities, Tier 3 bridges |
| 2 — Icon glyphs | `packages/core/src/tokens/icons.ts` | Icon, Button, any chrome that draws a named glyph |
| 3 — Components | `packages/css/core/**`, `packages/css/domain/**` | Host component only |

**Hard rules**

- Component and app stylesheets consume **Tier 2** (`--eevenkoto-color-surface-*`, `content-*`, `control-*`, …) and metric aliases (`--eevenkoto-font-size-heading-*`, `--eevenkoto-space-*`, …).
- Never reference Tier 1 hue primitives (`--eevenkoto-color-turquoise-*`, `parchment-*`, `gold-*`, …) or the rem ladder (`--eevenkoto-font-size-xs`…`3xl`) from component CSS.
- Missing intent → add a Tier 2 token in `tokens.css`. New pigment → Tier 1 only after design review.
- No raw `oklch()` / hex / rgb in component sheets. Do not use `opacity` for disabled UI — use opaque `*-disabled` semantic tuples.
- Font weights, line heights, space, radius, line-width, duration, ease, and z-index (`--eevenkoto-z-*`) are single-tier scales in `tokens.css` (no primitive layer). Use `var(--eevenkoto-z-*)` (or local `-1`…`3` offsets inside an isolated stacking context) instead of raw `z-index` numbers (`eevenkoto/z-index-token`).
- **Icon paths** are single-tier data tokens in `@eevenkoto/core` (`ICON_NAMES` / `iconPaths`). Do not embed SVG path strings in components; Button uses `BUTTON_ICON_NAMES` (subset) and composes the Icon atom.
- **Links on `feedback-*` surfaces** (Notice, Toast): `--eevenkoto-color-link-*` is only contrast-audited on neutral `surface-*` tokens. Inside `feedback-*` containers, default links (and `--eevenkoto-prose-link-*` overrides) to `currentColor` with an explicit underline.
- **Framed `feedback-*` `--solid` rules**: `--eevenkoto-color-feedback-*-solid-border` is `transparent` in `tokens.css`. Components whose identity depends on architectural ink rules (`Notice`, `Badge`) must derive `--solid` rule colors from `*-solid-background` / `color-mix(in oklch, *-solid-text …, …)` rather than `*-solid-border`.
Stylelint / CI guards described in Storybook Color Tokens docs run via `npm run lint:css` and `npm run ci`; also run `npm run test:storybook` (Chromium + axe + `play` geometry/interaction checks) whenever changing CSS, markup, or tokens.

## Tier 3 component pattern

Copy [`packages/css/core/atoms/button.css`](./packages/css/core/atoms/button.css) (also [`badge.css`](./packages/css/core/atoms/badge.css)):

1. Declare private bridges once on the host: `--_eevenkoto-<component>-*` with fallback `var(--eevenkoto-<component>-*, var(--eevenkoto-color-…))`.
2. Properties read **only** the private `--_*` variables.
3. Variants and states set the **public** `--eevenkoto-*` API — never reassign `--_*` on modifiers.

Deep dive: `apps/storybook/src/foundations/color-tokens-tier3-component-scoping.mdx`.

## Minimum-class defaults

The **host class alone** must render the documented default (Button primary+md, Badge subtle+neutral, Table row stripe, Heading level from tag, etc.). Modifier classes are opt-in; default aliases (`--primary`, `--md`) may exist for helpers but must not be required for appearance.

- Full rules + checklist: `apps/storybook/src/foundations/minimum-class-defaults.mdx` (Storybook **Foundations/Minimum-class defaults**)
- Bare `h1`–`h6` / `p` / `ul` / `ol` / `li` / `hr` / `blockquote` / `dl` / `a`: only under `.eevenkoto-prose`; compose with `.eevenkoto-flow` for rhythm
- Heading tag maps use `:where(hN).eevenkoto-heading` so `--M` still overrides; List ordered maps use `:where(ol).eevenkoto-list`

## Rhythm & Prose scoping

- **No global or container `text-box-trim`**: Never set `text-box` / `text-box-trim` on `*`, `html`, `body`, `.eevenkoto-prose`, or `.eevenkoto-flow` (`eevenkoto/no-global-text-box-trim`). It strips block-edge leading while leaving wrapped lines untrimmed (inverting proximity) and clips Finnish uppercase diacritics (`Ä`/`Ö`) at scrollport edges. Restrict `text-box-trim` to single-line leaf controls (`Button`, `LinkButton`).
- **Outer rhythm uses `margin-block-start` or `gap`**: Stack helpers (`Flow`, `Field`, …) must space siblings with `margin-block-start` or flex/grid `gap` — never `padding-block-start`, which lands inside child borders/backgrounds or gets overridden by component `padding`.
- **Scope `.eevenkoto-prose` bare tags away from DS classes**: Bare-tag selectors (`h1`–`h6`, `p`, `ul`, `ol`, `li`, `hr`, `blockquote`, `dl`) under `.eevenkoto-prose` must exclude `[class^="eevenkoto-"], [class*=" eevenkoto-"]` inside `:where(...)` so Prose typography never bleeds into nested DS components.
- **Line-height pairing**: Multi-line headings (`H1`–`H3`), `Notice` titles, and `TableOfContents` items use `--eevenkoto-line-height-snug` (`1.25`) so intra-item wrapped lines stay tighter than inter-item gaps; running copy uses `--eevenkoto-line-height-body` (`1.5`).
- **Aside / callout typography stays subordinate**: Supporting callouts (`Notice`) step down to `--eevenkoto-font-size-body-sm` (propagating to nested `Paragraph` / `List` defaults) and differentiate their titles from body copy via typeface (`--eevenkoto-font-serif`), weight, and tracking — never by a larger `font-size` than the callout’s own body text or surrounding prose.

## Where to look

- Live token catalog: `apps/storybook/src/tokens/`
- Color architecture (authors): `apps/storybook/src/foundations/color-tokens-*.mdx`
- Minimum-class / host defaults: `apps/storybook/src/foundations/minimum-class-defaults.mdx`
- Package narrative: `apps/storybook/src/foundations/packages.mdx`

Source folders follow **Core vs Domain** and **Atoms / Molecules / Organisms**. Decide that hierarchy before adding files under `packages/*/core|domain`.

## Vocabulary

Canonical names live in Storybook **Foundations/Glossary** (`apps/storybook/src/foundations/glossary.mdx`). Highlights:

- English APIs; locale strings as **data** (override AT defaults when the UI is localized).
- Statblock footer PropertyList is **`details`** (not `traits` — that word collides with feature “traits”).
- Visible strings: `label` (chrome / definition term), `text` (typography), `name` (entity), `title` (section).
- Types: core/html `*Props`; React `*ComponentProps`; Astro/Vue `*Props`. Do not add `*Args` aliases.
- Files: TS camelCase, CSS/HTML kebab-case (`primitive-tokens.css`), React/Vue/Astro/Storybook PascalCase.

## Agent feed-in files

`llms.txt` / `llms-full.txt` are **generated** from package READMEs, foundations MDX, and a short Why/When/API index per component (`npm run generate:llms`). Storybook serves them at `/llms.txt` and `/llms-full.txt` (and copies `AGENTS.md` to `/AGENTS.md`). Do not hand-edit the generated files — change the MDX/README sources and regenerate (also runs automatically before `storybook` / `build-storybook`).
