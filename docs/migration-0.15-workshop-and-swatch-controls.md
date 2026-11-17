# Migrating from 0.14.0 to 0.15.0 — Workshop, SwatchButton & Panel Controls

Upgrade guide for consuming sites bumping `@eevenkoto/*` from **`^0.14.0`** to **`^0.15.0`** (lockstep across all installed `@eevenkoto/*` packages). Maps every item from the consuming site's generator briefing (`EquipmentDesigner`, `StyleWardrobeGenerator`, `CultureNameGenerator`, and `SpeciesAppearanceGenerator`) to modern Eevenkoto DS components, extensions, and `0.14+` aesthetic patterns.

## 1. Triage Summary: New Components vs. Extensions vs. Existing Composition

| Briefing item | Resolution | Modern DS usage |
| --- | --- | --- |
| **2.1 `HighlightTile` / emphasized row** | **Extended `Property` + `PropertyList`** (no new component) | `PropertyList layout="cards"` + `PropertyItem` `emphasized: true` & `span: 'full'`. Uses symmetrical gilded brass top/bottom Stamp rules (`0px` corners), **not** directional left accent bars. |
| **2.2 Single-column & mixed `PropertyList`** | **Extended `PropertyList` + `Property`** | `layout="stacked"` (label above value, no colon), `columns: 1 \| 2 \| 3 \| 4`, `span: 'full'`, `id`, and `hidden`. |
| **2.3a Clickable color-role card** (`swatch-card`) | **New component: `SwatchButton`** (`@eevenkoto/css/swatch-button.css`) | `<button type="button">` control plate with full-bleed color background (`--eevenkoto-swatch-button-color`), `contrast-color()` foreground contrast, `corner-shape: scoop`, `roleLabel`, `label`, `hint`, `expanded` (`aria-expanded`), `controls`, and engraved `chevron-down` `Icon`. |
| **2.3b Swatch picker tray** (`picker-tray`) | **New component: `Panel`** (`@eevenkoto/css/panel.css`) | Lightweight inset `surface="sunken"` container (`role="region"` when `label` is set) with `headerLead`, `title`, and `headerActions` — no heavy Calling Card `::before` passe-partout. |
| **2.3c Static garment swatch item** (`capsule-chip`) | **Extended `List` + `ListItem`** (no new component) | `List layout="tiles"` (`columns: 2 \| 3`) with `ListItem swatchColor`. Renders semantic non-interactive `<li>` rows with wrapping text. |
| **2.4 `Card` header wrap, eyebrow, `result-top-bar`** | **Fixed & extended `Card`** | `card.css` adds `flex-wrap: wrap` on header; `CardProps` adds `eyebrow` and `titleSize: 'md' \| 'lg'`; `renderCard()` adds `id`, `className`, `attributes`. Place `Badge` + copy `Button` in `headerActions` (and/or copy in `Workshop` `toolbar`) instead of floating a bar above the card title. |
| **2.5a Workshop preset bar** (`preset-group`) | **Compose `Field` + `Select` + `Button`** (no new component) | Place `Field orientation="horizontal"` + `Select` + `Button` inside `Workshop` `header` (wrap with `.eevenkoto-workshop__header-controls`). Avoid legacy `.eevenkoto-workshop__preset-select`. |
| **2.5b Breakout width** (`width="wide"`) | **Extended `Workshop`** | `Workshop width="wide"` exposes shell-agnostic `--eevenkoto-workshop-max-width` and `--eevenkoto-workshop-available-width` (no `--sidebar-width` coupling in the DS). |
| **2.5c Workshop sub-components** | **Use existing groups & core helpers** | `RadioGroup` / `CheckboxGroup` own their own headers/badges/hints; use `Field`, `Flow`, and `@eevenkoto/core` helpers (`workshopPanelClassNames`, `workshopControlGroupClassNames`, `workshopStepperGridClassNames`). |
| **2.5d Quick-pick footer list** (`quick-list-section`) | **Extended `ChipGroup`** | `ChipGroup mode="action"` (omits `aria-pressed`) + `headerAction` slot/prop (renders valid `role="group"` + header row for the refresh `Button`). |
| **2.6a Compact `Disclosure`** | **Fixed & extended `Disclosure`** | `disclosure.css` adds `flex-wrap: wrap` on summary; `DisclosureProps` adds `size: 'sm' \| 'md'`. |
| **2.6b Framed prose box** (`ProseBox`) | **Use `Panel`** (`surface="raised"` / `"subtle"`) | Unified with `Panel` — no second prose-box component. |
| **2.7 Client DOM sync helpers** | **New `@eevenkoto/html/dom` subpath** | Tree-shakeable SSR-safe helpers: `showToast`, `hideToast`, `syncChipGroup`, `syncStepper`, `updateChoiceDescription`. |

## 2. Outdated Form-Language Updates

1. **Directional left stripes → symmetrical brass rules:** Replace `border-inline-start` callout stripes with `Property emphasized` (`2px` top/bottom `--eevenkoto-color-content-accent-strong` rules, `0px` corners).
2. **Static pills/chips → semantic `List` tiles:** Do not use `Chip` (`<button>`) or pill `Badge` (`white-space: nowrap`) for static wrapping descriptions; use `List layout="tiles"` + `ListItem swatchColor`.
3. **Unicode `▾`/`▴` → engraved `Icon`:** `SwatchButton` uses Eevenkoto's `16×16` woodcut `chevron-down` glyph and `corner-shape: scoop` control geometry.
4. **Floating top bars in `Card` → Calling Card compartments:** Use `Card` `eyebrow`, `titleSize="lg"`, and `headerActions` so the inner passe-partout divider frames the hero result title cleanly.
5. **AppShell `--sidebar-width` → shell-agnostic `--eevenkoto-workshop-available-width`:** If your app layout has a sidebar, override `--eevenkoto-workshop-available-width` once on your main content shell (`calc(100vw - var(--sidebar-width) - var(--eevenkoto-space-8))`) instead of writing per-generator negative-margin math.
