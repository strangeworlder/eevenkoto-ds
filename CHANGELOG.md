# Changelog

All notable changes to the `@eevenkoto/*` packages are documented here.

Published package version is **0.12.0**.

## 0.12.0

> **Consuming site upgrade instructions:** See [`docs/migration-0.12-frontend-gap-resolution.md`](docs/migration-0.12-frontend-gap-resolution.md) for the item-by-item mapping from the frontend gap analysis to the shipped components, props and recipes.

Resolves the frontend team's gap analysis (23 custom elements + 12 local overrides) from DS first principles. Everything ships across `@eevenkoto/{css,core,html,react,vue,astro}` with Storybook docs; `*Html` string, plain-text and slot/children inputs stay in parity.

### Added

- **Core:** `Swatch`, `Divider` (also styles bare `hr` in Prose), `ProgressBar`, `FloatingBanner`, `Disclosure`, `ChipGroup`, `TableOfContents`, `SectionHeader`, `TierCard`, `AccountMenu`.
- **Domain:** `LicenseBar`, `DocumentHeader`, `ContentTable`, `EntityPreview`, `ReadAloudBox`, `NpcCard`, `NpcCardGrid`, `MapFrame`, `ContentGate`.
- **Tokens:** `--eevenkoto-z-*` stacking scale and `--eevenkoto-color-depth-scrim`.
- **`ContentLicense` (`'proprietary' | 'open'`)** type shared by `LicenseBar` and `DocumentHeader`; `[data-content-license="open"]` recolours H1 underlines.
- **Docs:** Foundations **Composition recipes** (account status banner, readiness legend grid, adventure meta card, highlight tile, version comparison preview, swatch picker tray).

### Changed (backwards compatible)

- `Heading`: run-in levels 2–6.
- `Caption`: `variant="eyebrow"`, `tone="accent"`.
- `Chip`: `icon`, `swatchColor`.
- `Property` / `PropertyList`: `meta`, `layout` (`inline | divided | grid | cards`), `columns`.
- `List` / `ListItem`: `html`, `status`, `variant="checklist"`.
- `Menu`: `tone="destructive"` items.
- `Notice`: `statusText` live line; nested copy inherits notice colour.
- `Field`: `orientation`, `action`.
- `TooltipCard`: `flush`, `bodyHtml`.
- `Card`: `surface`, `accent`, `current`, `layout="split"`, `elevated`, `interactive`, `titleHtml`, `headerActions`, `actions`.
- `Table` / `TableCell`: `html`, `colSpan`, `rowSpan`, `scope`, `attributes`, row objects.
- `Workshop`: `layout="inline"`, `sticky`, `icon`/`title`/`subtitle`, `toolbar`, `footer`; container-query collapse. `EquipmentWorkshop` now composes Workshop (duplicate layout CSS removed; both class sets are emitted).
- `Statblock` / `StatblockSection` / `Spellblock`: `nameLevel`, `id`, `headingId`, `nameHtml`, contiguous heading outlines.

### Not shipped

- **AppShell / Sidebar** remain out of scope (host-app behavior). Use the shipped parts and `--eevenkoto-z-*` tokens inside your own shell.
- `StatusBanner`, `ReadinessGrid`, `AdventureMetaCard`, `VersionComparisonPreview`, `HighlightTile`, `AttributeBox`, `GeneratorCard`, `WorkshopToolbar` are covered by upgrades + recipes, not new components.

### Fixed

- Wave 2 `tier-card.css` imported a non-existent `list.css` path.
- `AccountMenu` signed-out `LinkButton` now shows the `user` icon (`'user'` added to `BUTTON_ICON_NAMES`); Vue `AccountMenu` forwards Menu `select` events.
- Astro `Badge` renders `dot` (previously leaked as an HTML attribute); Astro `DocumentHeader`, `EntityPreview` and `ContentGate` compose it instead of hand-built badge markup.
- `EntityPreview` `bodyHtml` is wrapped in a layout-transparent `.eevenkoto-entity-preview__html` in every binding (HTML previously inserted it raw).
- New `eevenkoto/z-index-token` Stylelint rule: component sheets must use `var(--eevenkoto-z-*)` or a local offset between -1 and 3. `AbilityScoreGroup` now uses 1–3 inside `isolation: isolate`.
- Wave 3 HTML renderers use `.html` templates like the rest of `@eevenkoto/html`.
- `Workshop` / `EquipmentWorkshop` `footer` renders a `div.eevenkoto-workshop__footer`, not `<footer>`: the hosts are non-sectioning `div`s, so `<footer>` became a page-level `contentinfo` landmark (axe `landmark-contentinfo-is-top-level`).

## 0.11.0

> **Consuming site upgrade instructions:** See [`docs/migration-token-architecture-and-a11y.md`](docs/migration-token-architecture-and-a11y.md#8-upgrading-to-0110-astro-package-ergonomics--0101-bug-fixes) for the step-by-step rollout checklist and which local CSS workarounds and `.astro` wrappers can now be removed.

### Added

- **Official `@eevenkoto/astro` package (`packages/astro`)**:
  - Ships all **52 Core & Domain components** as native `.astro` wrappers mirroring `@eevenkoto/core` and `@eevenkoto/html` 1:1 with Astro slot support (`header`, `footer`, `controls`, `preview`, `badge`, `actions`, `icon`, and default slots), recursive `<Menu>`, tight inline markup on inline atoms (`Button`, `LinkButton`, `Badge`, `Chip`, `InlineRef`, `EntityRef`, `AbilityName`, `Stat`), and TypeScript declarations (`index.d.ts`).
- **Expanded `ICON_NAMES` (`@eevenkoto/core`)**:
  - Added `close`, `copy`, `refresh`, `reroll`, `logout`, `mail`, `info`, and `warning` to `ICON_NAMES`, `BUTTON_ICON_NAMES`, and `iconPaths` (23 canonical 24×24 stroke glyphs total).
- **`LinkButton` `'ghost'` variant**:
  - Added `'ghost'` to `LinkButtonVariant` across `@eevenkoto/css` (`link-button.css`), `@eevenkoto/core`, `@eevenkoto/html`, `@eevenkoto/react`, `@eevenkoto/vue`, and `@eevenkoto/astro`, matching `Button` parity.
- **Core `Workshop` organism (`@eevenkoto/css/workshop.css`)**:
  - Generalized 2-column generator/builder chassis (`.eevenkoto-workshop`, `--eevenkoto-workshop-controls-width` defaulting to `minmax(0, 1.35fr)`, sticky `1fr` preview column, control-group styling) across CSS, Core, HTML (`renderWorkshop`), React (`<Workshop />`), Vue (`<Workshop />`), and Astro (`<Workshop />`). Domain `EquipmentWorkshop` remains 100% backwards-compatible.
- **Expanded `EntityRefKind` (`@eevenkoto/core`, `@eevenkoto/css/entity-ref.css`)**:
  - Added `'species' | 'culture' | 'background' | 'feat' | 'ability'` (12 entity kinds total), all verified against WCAG AA across light and dark modes on all 4 surfaces.
- **Rich inline & block `*Html` slots + expanded `sanitizeInlineHtml` (`@eevenkoto/html`)**:
  - `sanitizeInlineHtml` now preserves DS `EntityRef` and `InlineRef` output (`<a href="...">`, `<span class="...">`, `data-*`, and `.eevenkoto-icon` `<svg><path /></svg>`) while stripping unsafe URL schemes (`javascript:`), event handlers, and unknown tags.
  - Added opt-in `*Html` props across Core, HTML, React, Vue, and Astro: `Property` / `PropertyList` (`valueHtml`), `Card` (`bodyHtml`), `Notice` (`bodyHtml`), `StatblockFeature` (`descriptionHtml`), `StatblockSection` (`bodyHtml`), `Statblock` (`flavorHtml`, `typeLineHtml`, `bodyHtml`), and `Spellblock` (`typeLineHtml`, `paragraphsHtml`, `bodyHtml`).
- **Component & layout ergonomics**:
  - **`Popover`**: Added edge placements `'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'`, `matchTriggerWidth?: boolean` (`.eevenkoto-popover--match-trigger-width`), default `z-index: 100`, and placed `.eevenkoto-popover--fixed` after placement modifiers so `position: fixed` is never overridden.
  - **`fullWidth` prop**: Added `fullWidth?: boolean` (`--full-width`) to `Button`, `LinkButton`, `Input`, `Select`, and `SegmentedControl`, and updated `field.css` so `.eevenkoto-field__control > .eevenkoto-select` stretches to `100%` alongside `.eevenkoto-input`.
  - **`Menu` recursion & `attributes`**: Added `attributes?: MenuAttributes` (`Record<string, string | boolean | undefined>`) on menu items, groups, headers, and separators across Core, HTML, React, Vue, and Astro, plus single-line Markdown-safe `<details>` rendering in `renderMenu`.
  - **`Notice` icon & ARIA parity with `Toast`**: `Notice` now accepts `icon?: IconName | false` (defaulting automatically from `intent`: `info` → `'info'`, `success` → `'check'`, `caution`/`critical` → `'warning'`) and defaults `role="alert"` on both `critical` and `caution` intents (`role="status"` otherwise).
  - **Print polish (`inline-ref.css`)**: `.eevenkoto-inline-ref__lock` is hidden in `@media print` so printed statblocks and rule sheets omit paywall lock icons.

### Fixed

- **Invalid 3-value `margin-block` shorthands (`@eevenkoto/css`)**:
  - Fixed 3-value `margin-block` declarations (invalid at computed-value time in CSS Logical Properties) to valid 2-value `block-start block-end` shorthands across `heading.css`, `paragraph.css`, `caption.css`, `list.css`, and `statblock-section.css`.
- **`Heading` tag-inference specificity order (`heading.css`)**:
  - Moved `:where(h1..h6).eevenkoto-heading` and `.eevenkoto-prose :where(h1..h6)` rules *before* explicit `.eevenkoto-heading--1..6` modifiers (and explicitly reset `--eevenkoto-heading-padding: 0; --eevenkoto-heading-border-block-end: none;` on `--3..--6`) so `<h3 class="eevenkoto-heading eevenkoto-heading--2">` and `<h2 class="eevenkoto-heading eevenkoto-heading--3">` both work as documented.
- **`CheckboxGroup` & `RadioGroup` visually-hidden legend, orphan header gap, and grid inference**:
  - Fixed `checkboxGroupLegendClassNames(true)` and `radioGroupLegendClassNames(true)` to emit `.eevenkoto-visually-hidden` (instead of stale `.eevenkoto-u-visually-hidden`).
  - Added `hideLegend?: boolean` alias alongside `legendVisuallyHidden`, omitted the `.eevenkoto-{checkbox,radio}-group__header` wrapper when the legend is hidden and no `badge` is present (plus `:has(> .eevenkoto-visually-hidden:only-child)` CSS guard), and inferred `layout: 'grid'` automatically whenever `columns > 1`.
- **Component CSS / HTML mismatches**:
  - `renderCheckbox` and `renderRadio` now render `badge` strings via `renderBadge({ label, size: 'sm' })` (matching `checkbox.css` / `radio.css` and React/Vue).
  - `Select` (`renderSelect`, React, Vue, Astro) now renders top-level `options` and `<optgroup>` `groups` together instead of mutually exclusively.
  - `Toast` (`toast.css`) sets `display: none` on `.eevenkoto-toast--inline.eevenkoto-toast--hidden` so hidden inline toasts reserve zero layout height.
  - Added organism child margin resets in `statblock.css` (`> .eevenkoto-heading--2`), `spellblock.css` (`> .eevenkoto-list` and `li > .eevenkoto-paragraph`), and `card.css` (`header .eevenkoto-caption`).
  - Compiler-friendly `@eevenkoto/html` templates: stripped leading `<!-- ... -->` comments and trailing newlines from all `.html` templates so `render*` outputs embed cleanly in Markdown and Astro `set:html`.
  - Fixed stale `--eevenkoto-font-size-ui-*` mentions in `@eevenkoto/css/README.md` and `docs/migration-token-architecture-and-a11y.md` (`font-size-control-*` and `font-size-caption`).

## 0.10.0

> **Consuming site upgrade instructions:** See [`docs/migration-token-architecture-and-a11y.md`](docs/migration-token-architecture-and-a11y.md) for the step-by-step checklist, token search-and-replace table, and component selector/prop updates.

### Added

- **Tier 2 semantic tokens (`@eevenkoto/css/tokens.css`)**:
  - `--eevenkoto-color-form-input-placeholder` — dedicated WCAG AA placeholder ink (`>= 5.79:1` in light and dark modes), wired automatically into `Input` and `Select`.
  - `--eevenkoto-icon-mask-chevron-right` and `--eevenkoto-icon-mask-chevron-down` — canonical CSS mask-image disclosure tokens (consumed by `Menu`).
- **Editorial bare links in `Prose` (`@eevenkoto/css/prose.css`)**:
  - `.eevenkoto-prose :where(a:not([class]))` now styles unclassed inline hyperlinks with `--eevenkoto-color-link-default`, `link-hover`, privacy-safe `:visited:not(:hover)` (`link-visited`), `link-underline`, and dual-halo `:focus-visible` focus rings.
- **CI guardrails & token parity tests**:
  - Expanded `stylelint-eevenkoto` with dynamic Tier 1/2 CSS inventory loading, `eevenkoto/no-unknown-tokens`, `eevenkoto/constrain-tier2-color-mix`, `eevenkoto/private-bridge-hygiene`, disabled `opacity` guard, and Storybook CSS linting.
  - Added `tests/tokens.test.ts` enforcing 100% Tier 1/2 Storybook catalog parity and expanded `contrast-specimen.stories.ts` to full light/dark browser `axe-core` verification.

### Changed

- **Three-tier token boundary cleanup**:
  - Moved `--eevenkoto-font-weight-{regular,semibold,bold}` from `primitive-tokens.css` into `tokens.css` as single-tier metrics so 100% of `primitive-tokens.css` is strictly internal to Tier 2.
  - Replaced all 8 cross-hue `color-mix()` expressions in `tokens.css` with named functional Tier 1 stops in `primitive-tokens.css` (leaving only same-hue `transparent` alpha ramps in Tier 2).
- **Invalid form input tuple (`form-input-*-invalid`)**:
  - Restored `--eevenkoto-color-form-input-background-invalid` + `--eevenkoto-color-form-input-text-invalid` to a subtle crimson wash with high-contrast dark/light ink (`8.72:1` light, `17.57:1` dark) instead of an inverted solid crimson fill.
- **Tier 3 private bridge hygiene**:
  - Refactored state-suffixed private `--_*` variables and modifier `--_*` reassignments into stateless host bridges + public `--eevenkoto-<component>-*` overrides across `Checkbox`, `Radio`, `Field`, `CheckboxGroup`, `RadioGroup`, `List`, and `EquipmentWorkshop`.
- **`EquipmentBlock` heading outline (`h4` → `h2` / `h3`)**:
  - Section titles (`.eevenkoto-equipment-block__section-title`) now derive their heading tag from `nameLevel` (`<h1>` → `<h2>` by default; `<h2>` → `<h3>` when `nameLevel: 2`) across HTML, React, and Vue so document outlines never skip heading levels.
- **`AbilityName` inline accessibility**:
  - Removed ARIA-prohibited `aria-label` from generic `<span class="eevenkoto-ability-name">`; collapsed full ability names now stay in the accessibility tree via visually-hidden CSS clipping in `ability-name.css` and `equipment-block.css`.
- **`Stepper` group & disabled semantics**:
  - Root `.eevenkoto-stepper` now emits `role="group"` (and `aria-disabled="true"` when `disabled`) across HTML, React, and Vue.

### Fixed

- **Phantom/misnamed token references** across `select.css`, `toast.css`, `checkbox.css`, `radio.css`, `heading.css`, `equipment-block.css`, and `equipment-workshop.css` (`duration-fast` → `duration-2`, `easing-standard` → `ease-standard`, `font-weight-medium` → `font-weight-semibold`, `space-xs`/`sm`/`md` → numeric `space-*`, `radius-base` → `radius-md`, removed `font-variant-caps` custom property).
- **WCAG AA contrast across light & dark modes**:
  - `content-tertiary` nudged to clear `4.85:1` on `surface-sunken`.
  - `Heading` (H2/H4/H6) and `StatblockFeature` switched to `content-accent` (`5.77:1`).
  - `EntityRef` `--spell` switched to `feedback-info-text` (`6.99:1`+ on all surfaces).
  - `SegmentedControl` `--secondary` dark-mode contrast fixed (`17.29:1`) and base public token clobbering removed.
  - Completed `[data-theme="dark"], [data-surface-mode="dark"]` remaps for `content-disabled`, `control-primary-background-hover`/`-active`, `control-destructive-*`, `feedback-info-icon`, and separated `link-default` / `link-hover` / `link-visited` / `link-underline`.
- **`Button` & `LinkButton` custom `--eevenkoto-button-bg` overrides** now apply to both `background-color` and P3 gradient endpoints via private bridges.
- **Minimum-class host defaults** aligned in `stat.css` (`disk` + `md`), `badge.css` (`0.4em` dot), and `status-dot.css` (`surface-canvas` ring).

## 0.9.5

### Added

- **AbilityName** (Domain atom) — dynamic TTRPG ability/attribute abbreviation atom.
  - Automatically renders the full ability title (`Voimakkuus`, `Ketteryys`, `Mieli`, `Karisma`, `Käsityö`, `Sisu` jne.) when container space permits, and responsively collapses to a standardized 3-letter uppercase abbreviation (`VOI`, `KET`, `MIE`, `KAR`, `KÄS`, `SIS`) via container queries (`@container (max-width: 9rem)`) or explicit abbreviation prop.
  - Composable for multi-ability attributes (e.g. `<AbilityName>Voimakkuus</AbilityName> tai <AbilityName>Ketteryys</AbilityName>`).
  - Implements Tier 3 private bridge scoping (`--_eevenkoto-ability-name-*`), font-variant uppercase styling, and clean typographic alignment.
  - Available across all layers: `@eevenkoto/css/ability-name.css`, `@eevenkoto/core` (`AbilityNameProps`, `abbreviateAbility()`, `abilityNameClassNames()`), `@eevenkoto/html` (`renderAbilityName`), `@eevenkoto/react` (`<AbilityName />`), and `@eevenkoto/vue` (`<AbilityName />`).

### Changed

- **EquipmentBlock stat row redesign (Arvorivin uudistus)**:
  - **3-column stat grid**: Replaced the 4-box layout with a focused, streamlined 3-box presentation for both weapons and armor.
  - **Visual stat emphasis (`emphasis?: boolean`)**: Highlights primary combat metrics (`Puolustus` on armor, `Vahinko` on weapons) using subtle theme tinting, prominent border highlight, and enlarged heading typography. Container query layout spans emphasized stat across the full top row on medium-width cards.
  - **Secondary sub-value (`subValue?: string`)**: Supports displaying secondary metadata under the primary stat value (e.g., damage type `"Viiltävä"` below damage die `"1n8"` in smaller, muted type).
  - **Split sub-items (`subItems?: EquipmentStatSubItem[]`)**: Displays paired metrics within a single stat box sharing a 2-column sub-grid with mini-headers (e.g., `Ulottuvuus` and `Heitto` grouped in weapons, or single `Kantama` for ranged weapons).
  - **Label & schema cleanup**:
    - Armor: Shortened label `"Nopeusvaikutus"` -> `"Nopeus"`. Removed `"Kilpi"` (Shield) box.
    - Weapon: Shortened label `"Ominaisuus"` -> `"Omin."`. Removed `"Käyttö"` (Hands) box.
    - Added structured `abilities: string[]` and `abilityMode?: 'auto' | 'full' | 'short'` to `EquipmentStatItem` for automatic `AbilityName` composition.
  - **Responsive container query**: Modernized container query breakpoints (`@container (min-width: 32rem)` -> 3-col grid, `@container (min-width: 20rem)` -> 2-col with emphasized item spanning 2 columns, base -> 1-col stack).
  - **Migration guide**: Katso yksityiskohtaiset migraatio-ohjeet tiedostosta [`docs/migration-equipment-block-stat-row.md`](docs/migration-equipment-block-stat-row.md).

## 0.9.4

### Fixed

- **SegmentedControl HTML renderer**:
  - `renderSegmentedControl` handles options with `id` and `value` aliases defensively, preventing `TypeError` if options omit an explicit `id`.
- **Storybook workspace linking**:
  - Cleaned up stale nested `@eevenkoto` dependencies in `apps/storybook`, ensuring full alignment with local workspace exports.

## 0.9.3

### Added

- **Toast** (Core atom) — transient floating feedback notification atom.
  - Implements Tier 3 private bridge scoping (`--_eevenkoto-toast-*`), subtle and solid variants, 6 semantic feedback intents (`neutral`, `info`, `success`, `caution`, `critical`, `admin`), placement modifiers (`inline`, `fixed-bottom-right`, `fixed-bottom-center`), and entry/exit motion transitions.
  - Accessible semantics: automatically resolves `role="status"` and `aria-live="polite"` (or `role="alert"` and `aria-live="assertive"` for critical alerts).
  - Available across all layers: `@eevenkoto/css/toast.css`, `@eevenkoto/core`, `@eevenkoto/html` (`renderToast`), `@eevenkoto/react` (`<Toast />`), and `@eevenkoto/vue` (`<Toast />`).

### Changed

- **EquipmentWorkshop chassis refactor (Architectural Separation of Concerns)**:
  - Pelkistettiin `EquipmentWorkshop` puhtaaksi esitys- ja layout-rungoksi (chassis). Design System tarjoaa responsiivisen 2-palstaisen asettelun, ohjainten ryhmittelytyylit ja sticky esikatselupalkin, mutta **ei** enää kovakoodattua pelimekaniikkaa tai sisäistä sovellustilaa.
  - `EquipmentWorkshop` ottaa vastaan puhtaat slotit / propositiot (`header`, `controls`, `preview`) HTML:ssä, Reactissa ja Vuoessa.
  - **Pelimekaaniset laskentakaavat siirretty pois Design System -paketeista:** `calculateWeapon`, `calculateArmor`, `stepDice`, `DICE_LADDER`, `WEAPON_PRESETS`, `ARMOR_PRESETS` ja satunnaisnimigeneraattorit on poistettu `@eevenkoto/core`-paketista. Kuluttajasovellukset omistavat jatkossa omat sääntönsä ja tilanhallintansa.
  - **Migraatio-ohjeistus:** Katso yksityiskohtaiset ohjeet ja täydellinen sääntömoottorin referenssikoodi tiedostosta [`docs/migration-equipment-workshop-chassis.md`](docs/migration-equipment-workshop-chassis.md) sekä Storybookin dokumentaatiosta ([`EquipmentWorkshop`](http://localhost:6006/?path=/docs/domain-organisms-equipmentworkshop--docs)).
  - Työkalun referenssitoteutus säilyy Storybookissa (`apps/storybook/src/domain/organisms/EquipmentWorkshop/equipmentRules.ts`).

## 0.9.2

### Added

- **Form controls (Core chrome)** — native form controls and compound fieldsets for interactive sheets and character/equipment builders:
  - **Input** (Core atom) — single-line text input with leading/trailing icon slots, focus outline, invalid/disabled states, size variants (`sm`, `md`), and semantic `form-input-*` tokens. New `@eevenkoto/css/input.css`.
  - **Select** (Core atom) — single-choice dropdown menu with chevron indicator, custom option/optgroup rendering, container alignment, and robust padding. New `@eevenkoto/css/select.css`.
  - **Checkbox** (Core atom) — native checkbox wrapped with custom themed square checkmark indicator and opt-in card/tile variants (`variant="card"` / `variant="tile"`). New `@eevenkoto/css/checkbox.css`.
  - **Radio** (Core atom) — native radio wrapped with custom themed circular indicator and opt-in card/tile variants. New `@eevenkoto/css/radio.css`.
  - **CheckboxGroup** (Core molecule) — fieldset container for multiple checkboxes with accessible legend, optional badge count, helper message, and layout options (vertical stack, 2/3/4-column responsive grid). New `@eevenkoto/css/checkbox-group.css`.
  - **RadioGroup** (Core molecule) — fieldset container for mutually exclusive choices with accessible legend, optional badge, helper message, and stack/grid layout. New `@eevenkoto/css/radio-group.css`.
  - **Stepper** (Core molecule) — integer stepper control with increment/decrement buttons, label, and contextual description. New `@eevenkoto/css/stepper.css`.
- **Icon tokens** — canonical glyph data tokens in `@eevenkoto/core` (`tokens/icons.ts`):
  - Added `swords`, `sword`, `shield`, and `dice` to `ICON_NAMES`, `BUTTON_ICON_NAMES`, and `iconPaths`.
- **SegmentedControl icons** — `SegmentedControlOption` accepts an optional `icon?: IconName` across Core, HTML, React, Vue, and CSS.
- **Image** (Core atom) — responsive editorial media element. Host alone is full paragraph-wide block (`<figure class="eevenkoto-image">`). Modifiers support text-wrapping spot art (`layout="float-left"` / `layout="float-right"`) with container-responsive collapse (`@container (max-width: 32rem)`). Implements layout shift prevention with intrinsic `width` / `height` / `aspectRatio`, native `loading="lazy"` and `decoding="async"`, accessible `<figcaption>` with Eevenkoto caption typography, opt-in TTRPG boundary framing (`framed`), dark-mode comfort dimming, and vertical rhythm integration in `.eevenkoto-flow`. New `@eevenkoto/css/image.css`.
- **EquipmentBlock** (Domain organism) — standardized TTRPG equipment presentation card analogous to `Statblock` and `Spellblock`. Renders item header plate, price badge, container-query responsive stat columns, damage kesto breakdown (base, bludgeoning, slashing, piercing), trait chips, rules/effects note list, validation warnings, and optional clipboard export button. New `@eevenkoto/css/equipment-block.css`.
- **EquipmentWorkshop** (Domain organism) — interactive "Varusteverstas" craft organism replacing consumer-side Frankenstein implementations. Separates rules engine calculations and presets into pure `@eevenkoto/core` logic (`calculateWeapon`, `calculateArmor`), offers accessible form controls (presets, radio cards, steppers, checkboxes), live reactive `EquipmentBlock` preview, and one-click markdown clipboard export. Available as vanilla HTML/JS (`renderEquipmentWorkshop`, `autoInitEquipmentWorkshops`), React (`<EquipmentWorkshop />`), and Vue (`<EquipmentWorkshop />`). New `@eevenkoto/css/equipment-workshop.css`.

### Changed

- **Package versions** — bumped to **0.9.2** across all published packages (`@eevenkoto/css`, `@eevenkoto/core`, `@eevenkoto/html`, `@eevenkoto/react`, `@eevenkoto/vue`).
- **TypographySample** — expanded to showcase native inputs, selects, checkboxes, and radio buttons alongside heading, body, and caption typography.
- **Flow & Prose container queries** — `.eevenkoto-flow` and `.eevenkoto-prose` declare `container-type: inline-size` so nested images and components respond to container widths rather than viewports.
- **TooltipCard body** — carries `eevenkoto-prose` (and `tooltip-card.css` imports `prose.css`) so bare `p` / `ul` / `ol` / `li` in a preview get type styles without a page-level Prose wrapper.

### Fixed

- **Select padding** — fixed custom property resolution by replacing accidental non-scale space tokens with `--_eevenkoto-select-pad-inline-end` and explicit `padding-block` / `padding-inline-start`, restoring proper 12px text inset and vertical breathing room.
- **Select icon ballooning** — constrained `.eevenkoto-select__icon` dimensions to prevent raw SVGs from expanding when stylesheets load asynchronously.
- **Token consistency** — audited space tokens across all component stylesheets, eliminating references to non-scale custom properties (`--eevenkoto-space-5`, `--eevenkoto-space-1-5`).

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
