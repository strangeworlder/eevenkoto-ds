# Migration & Consumer Upgrade Guide: Token Architecture, Contrast & Accessibility Overhaul

This guide explains what changed in the post-`0.9.5` token, contrast, Tier 3 scoping, and accessibility overhaul, and gives a step-by-step checklist for updating any site or application that consumes `@eevenkoto/css`, `@eevenkoto/core`, `@eevenkoto/html`, `@eevenkoto/react`, or `@eevenkoto/vue`.

---

## Quick Upgrade Checklist (Run in Consuming Site)

Work through these 7 checks when bumping `@eevenkoto/*` in the consuming site:

1. **Search site CSS for Tier 1 primitive leaks, raw colors, and `opacity` disabled hacks** (see [Section 1](#1-audit-site-css-for-banned-tokens--raw-literals)).
2. **Replace any nonexistent legacy token names** copied from older CSS (see [Section 2](#2-replace-removed--phantom-token-names)).
3. **Adopt new & updated Tier 2 tokens** (`--eevenkoto-color-form-input-placeholder`, `--eevenkoto-color-content-accent`, single-tier `--eevenkoto-font-weight-*`, subtle wash invalid inputs; see [Section 3](#3-new--updated-tier-2-tokens-to-adopt)).
4. **Delete obsolete site workarounds** for dark-mode tokens and `.eevenkoto-prose a` inline links (see [Section 4](#4-remove-obsolete-site-workarounds-dark-mode--prose-links)).
5. **Verify component CSS customization uses public `--eevenkoto-<component>-*` hooks only** — never private `--_eevenkoto-*` bridges (see [Section 5](#5-component-customization-rules-public-vs-private-variables)).
6. **Confirm per-component CSS imports** include `@eevenkoto/css/ability-name.css` and all form/feedback sheets used on the site (see [Section 6](#6-verify-per-component-css-imports)).
7. **Update component props, heading levels, and test selectors** for `EquipmentBlock`, `AbilityName`, `Stepper`, and `Select` (see [Section 7](#7-component-markup-prop--selector-changes)).

---

## 1. Audit Site CSS for Banned Tokens & Raw Literals

Consuming sites must **only** import `@eevenkoto/css/styles.css` (or `@eevenkoto/css/tokens.css`) and consume **Tier 2 semantic tokens** and metrics. Never import `@eevenkoto/css/primitive-tokens.css` in app code.

Run this search across the consuming site's `.css`, `.scss`, `.tsx`, `.vue`, and `.astro` files:

```bash
grep -rnE "primitive-tokens\.css|--eevenkoto-color-(turquoise|parchment|obsidian|gold|green|orange|crimson|purple)-|--eevenkoto-font-size-(2xs|xs|sm|md|lg|xl|2xl|3xl)\b|--_eevenkoto-" src/
```

Every match in site code should be replaced:

| Never use in site CSS | Use instead (Tier 2 semantic token) |
| --- | --- |
| `@eevenkoto/css/primitive-tokens.css` | `@eevenkoto/css/styles.css` (or `@eevenkoto/css/tokens.css`) |
| `--eevenkoto-color-parchment-*` / `obsidian-*` | `--eevenkoto-color-surface-{canvas,subtle,sunken,raised}`, `--eevenkoto-color-content-{primary,secondary,tertiary,disabled}`, `--eevenkoto-color-boundary-{subtle,strong}` |
| `--eevenkoto-color-turquoise-*` | `--eevenkoto-color-control-primary-*`, `--eevenkoto-color-link-*`, `--eevenkoto-color-boundary-focus-outer` |
| `--eevenkoto-color-gold-*` | `--eevenkoto-color-content-accent` (for text `< 24px` / `< 18.66px` bold) or decorative borders only |
| `--eevenkoto-color-{green,orange,crimson,purple}-*` | `--eevenkoto-color-feedback-{success,caution,critical,admin,info,neutral}-*`, `--eevenkoto-color-control-destructive-*`, `--eevenkoto-color-form-input-*-invalid` |
| `--eevenkoto-font-size-{xs..3xl}` | `--eevenkoto-font-size-heading-{1..6}`, `body-{lg,md,sm}`, `ui-{md,sm,xs}`, `control-{sm,md,lg}` |
| `opacity: 0.5` on disabled controls | Component `disabled` prop, or opaque `--eevenkoto-color-control-*-disabled` / `form-input-*-disabled` / `content-disabled` tokens |

---

## 2. Replace Removed / Phantom Token Names

Several component stylesheets previously referenced unshipped token names that silently fell back or resolved to `initial`. If the consuming site copied any of these names into its own CSS, replace them:

```bash
grep -rnE "--eevenkoto-(duration-fast|easing-standard|font-weight-medium|space-(xs|sm|md|lg)|radius-base|font-variant-caps)" src/
```

| Broken / Nonexistent Name | Canonical Replacement |
| --- | --- |
| `--eevenkoto-duration-fast` | `--eevenkoto-duration-2` (`150ms`; scale is `duration-1` `50ms` … `duration-4` `200ms`) |
| `--eevenkoto-easing-standard` | `--eevenkoto-ease-standard` (or `--eevenkoto-ease-in-out`) |
| `--eevenkoto-font-weight-medium` | `--eevenkoto-font-weight-semibold` (`600`; weights are `regular` `400`, `semibold` `600`, `bold` `700`) |
| `--eevenkoto-space-xs` / `-sm` / `-md` | Numeric scale: `--eevenkoto-space-0-5` (`0.2rem`), `--eevenkoto-space-1` (`0.4rem`), `--eevenkoto-space-2` (`0.8rem`), `--eevenkoto-space-3` (`1.2rem`), `--eevenkoto-space-4` (`1.6rem`), etc. |
| `--eevenkoto-radius-base` | `--eevenkoto-radius-md` (scale is `none`, `sm`, `md`, `lg`, `xl`, `full`) |
| `--eevenkoto-font-variant-caps` | Literal CSS `font-variant-caps: all-small-caps` |

---

## 3. New & Updated Tier 2 Tokens to Adopt

- **Input & search placeholders — `--eevenkoto-color-form-input-placeholder`:**
  `Input` and `Select` now consume `--eevenkoto-color-form-input-placeholder` (`>= 5.79:1` contrast in light and dark modes). Use it on any custom `<textarea>` or custom search input `::placeholder` on the site instead of `content-tertiary` or reduced `opacity`.
- **Readable gold accent ink — `--eevenkoto-color-content-accent`:**
  Small gold text (`< 24px` regular / `< 18.66px` bold) must use `--eevenkoto-color-content-accent` (`5.77:1` light, `9.55:1` dark). `Heading` (H2, H4, H6) and `StatblockFeature` now use `content-accent` automatically.
- **Readable `content-tertiary` on sunken wells:**
  `--eevenkoto-color-content-tertiary` (`Caption` default) now clears `4.85:1` even inside `surface-sunken` blocks and tables.
- **High-contrast invalid form fields:**
  `--eevenkoto-color-form-input-background-invalid` and `--eevenkoto-color-form-input-text-invalid` now render a subtle crimson wash with high-contrast dark/light ink (`8.72:1` light, `17.57:1` dark) rather than an inverted solid crimson fill. Always pair `invalid` inputs/selects with visible error copy (`Field` `error` + `messageId` + control `describedBy`) styled with `--eevenkoto-color-form-input-message-invalid`.
- **Single-tier font weights in `tokens.css`:**
  `--eevenkoto-font-weight-regular` (`400`), `--eevenkoto-font-weight-semibold` (`600`), and `--eevenkoto-font-weight-bold` (`700`) are now defined directly in `tokens.css` as single-tier metrics.
- **Canonical disclosure masks (`--eevenkoto-icon-mask-chevron-right` / `chevron-down`):**
  Available in `tokens.css` for CSS `mask-image` disclosure indicators (used by `Menu`). For DOM icons, continue using `@eevenkoto/core` `ICON_NAMES` / `<Icon />`.

---

## 4. Remove Obsolete Site Workarounds (Dark Mode & Prose Links)

1. **Dark mode (`[data-theme="dark"]` / `[data-surface-mode="dark"]`):**
   Set `data-theme="light"` or `data-theme="dark"` on `<html>` (or `data-surface-mode="dark"` on a local dark container). `tokens.css` now remaps **all** Tier 2 tokens in dark mode, including:
   - `--eevenkoto-color-content-disabled`
   - `--eevenkoto-color-control-primary-background-hover` and `-active`
   - `--eevenkoto-color-control-destructive-*`
   - `--eevenkoto-color-feedback-info-icon`
   - `--eevenkoto-color-link-default`, `link-hover`, `link-visited`, and `link-underline`
   - `SegmentedControl` `tone="secondary"` selected segment contrast (`17.29:1`)
   - `EntityRef` `kind="spell"` (`feedback-info-text`, `6.99:1`+ on all surfaces)

   **Action:** Delete any custom `[data-theme="dark"]` CSS patches the site previously maintained for these states.

2. **Bare inline links inside `<Prose>` (`.eevenkoto-prose`):**
   `prose.css` now styles bare `<a:not([class])>` inside `.eevenkoto-prose` with `--eevenkoto-color-link-default`, `link-hover`, `link-visited` (privacy-safe `:visited:not(:hover)`), `link-underline`, and dual-halo `:focus-visible` outlines.
   - Keep using **bare `<a href="...">`** inside `<Prose>` for normal editorial hyperlinks.
   - Use **`InlineRef`** for in-prose rule/glossary references, **`EntityRef`** for typed TTRPG entities (`item`, `condition`, `mechanic`, `classFeature`, `class`, `creature`, `spell`), **`LinkButton`** for prominent URL CTAs, and **`Button`** for `<button>` actions.

   **Action:** Remove custom `.eevenkoto-prose a` link color/underline rules from site stylesheets unless intentionally overriding `--eevenkoto-prose-link-color` / `--eevenkoto-prose-link-hover-color` / `--eevenkoto-prose-link-underline`.

---

## 5. Component Customization Rules (Public vs Private Variables)

- **Only set public `--eevenkoto-<component>-*` custom properties** on a host class or wrapper when customizing a component.
- **Never set or read private `--_eevenkoto-*` variables.** State-suffixed private variables (`--_*-hover`, `--_*-invalid`, `--_*-error`, etc.) in `Checkbox`, `Radio`, `Field`, `CheckboxGroup`, `RadioGroup`, `List`, and `EquipmentWorkshop` were refactored into stateless bridges.
- **`Button` & `LinkButton` custom backgrounds:** `--eevenkoto-button-bg` and `--eevenkoto-link-button-bg` now update both the solid fallback `background-color` and the P3 bevel gradient automatically — if the site previously added `background-image: none` just to make `--eevenkoto-button-bg` visible, you can remove `background-image: none`.
- **`SegmentedControl` `tone="secondary"`:** No longer clobbers host-level `--eevenkoto-segmented-*` overrides on the base selector.

---

## 6. Verify Per-Component CSS Imports

`@eevenkoto/css` does **not** bundle all components into `styles.css`. Import `@eevenkoto/css/styles.css` once at the app root, plus the flat stylesheet for every component rendered on the page:

```ts
// Always once at app entry:
import '@eevenkoto/css/styles.css';

// Import each component sheet your page/route uses:
import '@eevenkoto/css/ability-name.css'; // REQUIRED whenever AbilityName or EquipmentBlock with `abilities` is rendered!
import '@eevenkoto/css/equipment-block.css';
import '@eevenkoto/css/equipment-workshop.css';
import '@eevenkoto/css/input.css';
import '@eevenkoto/css/select.css';
import '@eevenkoto/css/checkbox.css';
import '@eevenkoto/css/checkbox-group.css';
import '@eevenkoto/css/radio.css';
import '@eevenkoto/css/radio-group.css';
import '@eevenkoto/css/stepper.css';
import '@eevenkoto/css/toast.css';
import '@eevenkoto/css/image.css';
```

> **Important for `AbilityName` & `EquipmentBlock`:** When abbreviated (`variant="short"` or inside narrow container queries), `AbilityName` visually hides `.eevenkoto-ability-name__full` via CSS clipping so screen readers still read the full ability name. If `@eevenkoto/css/ability-name.css` is missing on a standalone `AbilityName`, both full and short spans will appear inline.

---

## 7. Component Markup, Prop & Selector Changes

Check these four components in the consuming site (especially if the site writes raw HTML, CSS child tag selectors, or DOM/snapshot tests):

### 7.1 `EquipmentBlock` — Sequential Section Headings (`h2` / `h3` instead of `h4`)

Section titles (`Valitut piirteet`, `Säännöt & vaikutukset`) previously hardcoded `<h4 class="eevenkoto-equipment-block__section-title">`, skipping heading levels (`h1` → `h4`) and failing WCAG / `axe-core` `heading-order`.

- When `nameLevel` is `1` (default, standalone item page): renders `<h1>` item name → `<h2>` section titles.
- When `nameLevel` is `2` (embedded inside a page that already has an `<h1>`, such as a compendium list or `EquipmentWorkshop` page with a page `<h1>`): renders `<h2>` item name → `<h3>` section titles.

**Site actions:**
1. Pass `nameLevel={2}` (or `:name-level="2"` in Vue / `nameLevel: 2` in HTML) whenever `EquipmentBlock` is rendered underneath an existing page `<h1>` (for example inside the site's `EquipmentWorkshop` page if the page header uses `<h1>`).
2. Replace any site CSS or test selector targeting `.eevenkoto-equipment-block h4` with `.eevenkoto-equipment-block__section-title`.

### 7.2 `AbilityName` — Valid Inline Accessibility (No `aria-label` on `<span>`)

WAI-ARIA 1.2 prohibits `aria-label` on generic `<span>` elements (`axe-core` `aria-prohibited-attr`), and `display: none` previously hid `.eevenkoto-ability-name__full` from screen readers when collapsed.

- Root `<span class="eevenkoto-ability-name">` **no longer emits `aria-label`**.
- `.eevenkoto-ability-name__full` stays in the accessibility tree via visually-hidden CSS clipping when collapsed, while `.eevenkoto-ability-name__short` keeps `aria-hidden="true"`.

**Site actions:**
1. Props (`name`, `short`, `variant`) are unchanged across HTML, React, and Vue.
2. If the site hand-renders `.eevenkoto-ability-name` HTML without `@eevenkoto/html` / `react` / `vue`, remove `aria-label` from the outer `<span>`:
   ```html
   <span class="eevenkoto-ability-name">
     <span class="eevenkoto-ability-name__full">Voimakkuus</span>
     <span class="eevenkoto-ability-name__short" aria-hidden="true">VOI</span>
   </span>
   ```
3. Update any test asserting `[aria-label]` on `.eevenkoto-ability-name`.

### 7.3 `Stepper` — WAI-ARIA Group & Disabled Semantics

Root `.eevenkoto-stepper` now renders `role="group"` and, when `disabled` is true, `aria-disabled="true"` across HTML (`renderStepper`), React (`<Stepper />`), and Vue (`<Stepper />`) so assistive technology and `axe-core` recognize the entire composite control as disabled.

**Site action:** No prop changes if using `@eevenkoto/html`, `@eevenkoto/react`, or `@eevenkoto/vue`. If hand-rendering `.eevenkoto-stepper` markup, add `role="group"` (and `aria-disabled="true"` when `--disabled` is active) to the root `<div class="eevenkoto-stepper">`.

### 7.4 `Select` — Grouped Options Prop (`groups`, not `options`)

When rendering `<optgroup>` groups in `Select`, pass them via `groups` (not `options`):

```tsx
// Correct:
<Select
  id="shield"
  groups={[
    {
      label: 'Kevyet suojat',
      options: [{ value: 'buckler', label: 'Pikkukilpi (+1 PL)' }],
    },
  ]}
/>
```

Flat option arrays continue to use `options={[{ value, label }]}`.

### 7.5 Minimum-Class Host Defaults (`Stat`, `Badge`, `StatusDot`)

If the site applies raw BEM classes without `*ClassNames()` helpers:
- `.eevenkoto-stat` alone now renders `disk` + `md` (`4rem`, `border-radius: var(--eevenkoto-radius-full)`), matching `StatProps` defaults. Pass `eevenkoto-stat--sm` or `eevenkoto-stat--arch` / `--shield` when smaller or non-disk shapes are wanted.
- `.eevenkoto-badge` dot indicator defaults to `0.4em` (matching `--md`), and `.eevenkoto-status-dot` ring defaults to `surface-canvas`.
