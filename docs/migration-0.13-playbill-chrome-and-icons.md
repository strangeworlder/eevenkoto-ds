# Migrating from 0.12.1 to 0.13.0 — Playbill Notice, Stamp Badge & Engraved Icons

Upgrade guide for consuming sites bumping `@eevenkoto/*` from **`^0.12.1`** to **`^0.13.0`**. Version `0.13.0` removes the pill/rounded `Badge` shape API in favor of a single 1920s Playbill Stamp silhouette, redesigns `Notice` with open-sided Oxford double rules and subordinate `body-sm` typography plus updated default intent icons, and replaces all 23 existing icons with a 46-glyph 1920s engraved `fill="currentColor"` icon catalog.

## Quick Upgrade Checklist

Bump all installed `@eevenkoto/*` packages together in lockstep (`0.12.1` → `^0.13.0`), then run through these 6 checks in your consuming site:

1. **Remove `BadgeShape`, `shape` props, and `.eevenkoto-badge--pill` / `.eevenkoto-badge--rounded`** (including transitive `TierCard` `badge={{ ... }}` objects; see [Section 1](#1-breaking-changes-badge-playbill-stamp--shape-removal)).
2. **Audit non-interactive `Badge` vs interactive `Chip`**: any `0.12.1` pill badge used as a toggle, filter, or button should move to `Chip` / `ChipGroup` ([Section 1.2](#12-removed-css-modifiers--interactive-chip-audit)).
3. **Review `Badge` custom CSS overrides**: `.eevenkoto-badge` now uses `border-block` (`2px` top/bottom) and `--eevenkoto-badge-inline-border-color` / `--eevenkoto-badge-inline-border-width` (`1px` sides + `dot` divider), `Outfit` bold typography, and a rotated diamond `dot` ([Section 1.3](#13-visual-structural--token-updates-on-badge)).
4. **Check `Notice` intent icons, layout overrides, and subordinate scale**: `defaultNoticeIcon` changed on `neutral` (`'info'` → `'section'`) and `admin` (`'star'` → `'monogram'`), font size stepped down from `body-md` (`1.6rem`) to `body-sm` (`1.4rem`), and `.eevenkoto-notice` uses `padding-block` as the Oxford rule air gap ([Section 2](#2-behavioral--visual-changes-notice-playbill-framing-default-icons--typography)).
5. **Audit existing icon usages & `sword` → `revolver` alias**: all 23 prior icons were redrawn as filled `16×16` woodcut silhouettes, 23 new icons were added (`46` total), and legacy `'sword'` now shares its path with `'revolver'` (use `'blades'` or `'swords'` for edged weapons; see [Section 3](#3-icon-system-overhaul-1920s-engraved-glyphs--23-new-icons)).
6. **Delete stale `.eevenkoto-notice` / `.eevenkoto-badge` / `.eevenkoto-icon` CSS patches** (such as `stroke` rules on `.eevenkoto-icon`, `border-radius` overrides on `.eevenkoto-badge`, or padding/border hacks on `.eevenkoto-notice`).

Run this search across your site's `src/` directory before building:

```bash
grep -rnE "BadgeShape|\bshape\s*[:=]|eevenkoto-badge--(pill|rounded)|defaultNoticeIcon|(icon|name)\s*[:=]\s*['\"]sword['\"]" src/
```

---

## 1. Breaking Changes: `Badge` Playbill Stamp & `shape` Removal

`Badge` was redesigned from a rounded/pill SaaS lozenge into a 1920s Playbill Stamp framed by sharp `0px` corners, `2px` (`--eevenkoto-line-width-md`) top/bottom rules, `1px` (`--eevenkoto-line-width-sm`) side hairlines, `Outfit` bold lettering, and warm bronze/brass `neutral` accents.

### 1.1 Removed TypeScript & Prop APIs

The following exports and props are **removed** in `0.13.0`:

| Package | Removed API | Migration action |
| --- | --- | --- |
| `@eevenkoto/core` | `BadgeShape` type; `BadgeProps.shape`; `BadgeClassNameProps.shape` | Delete `BadgeShape` imports and remove `shape` from props passed to `badgeClassNames()`. |
| `@eevenkoto/html` | `shape` option in `renderBadge()` | Remove `shape: 'pill'` / `shape: 'rounded'`. |
| `@eevenkoto/react` | `shape` prop on `<Badge />` | Remove `shape="pill"` / `shape="rounded"`. |
| `@eevenkoto/vue` | `shape` prop on `<Badge />` | Remove `shape="pill"` / `shape="rounded"`. |
| `@eevenkoto/astro` | `shape` prop on `<Badge />` | Remove `shape="pill"` / `shape="rounded"`. |
| Transitive `BadgeProps` forwards | `TierCardProps.badge` (`TierCard`), `badge` on `Checkbox`, `Radio`, `CheckboxGroup`, `RadioGroup`, or site wrappers | Remove `shape` from every forwarded `badge={{ ... }}` object (such as `TierCard` recommendation/tier pills). |

TypeScript (`tsc` / Astro check / `vue-tsc`) flags remaining `BadgeShape` imports and `shape` props at compile time (`TS2322`, `TS2353`, `TS2305`), while the `grep` above catches raw HTML templates or test assertions.

**Before (0.12.1):**

```tsx
import '@eevenkoto/css/styles.css';
import '@eevenkoto/css/badge.css';
import '@eevenkoto/css/tier-card.css';
import '@eevenkoto/css/list.css';
import '@eevenkoto/css/link-button.css';
import type { BadgeShape } from '@eevenkoto/core';
import { Badge, TierCard } from '@eevenkoto/react';

const badgeShape: BadgeShape = 'pill';

export function UpgradeExamples() {
  return (
    <>
      <Badge label="Ready" intent="success" shape={badgeShape} dot />
      <TierCard
        name="Patron"
        price="5 €"
        badge={{ label: 'Popular', intent: 'info', shape: 'pill' }}
        features={[]}
      />
    </>
  );
}
```

**After (0.13.0):**

```tsx
import '@eevenkoto/css/styles.css';
import '@eevenkoto/css/badge.css';
import '@eevenkoto/css/tier-card.css';
import '@eevenkoto/css/list.css';
import '@eevenkoto/css/link-button.css';
import { Badge, TierCard } from '@eevenkoto/react';

export function UpgradeExamples() {
  return (
    <>
      <Badge label="Ready" intent="success" dot />
      <TierCard
        name="Patron"
        price="5 €"
        badge={{ label: 'Popular', intent: 'info' }}
        features={[]}
      />
    </>
  );
}
```

### 1.2 Removed CSS Modifiers & Interactive `Chip` Audit

- **`.eevenkoto-badge--pill` and `.eevenkoto-badge--rounded` have been deleted** from `@eevenkoto/css/badge.css`.
- If you hand-wrote HTML markup (`class="eevenkoto-badge eevenkoto-badge--pill"`), remove the `--pill` / `--rounded` class. The host `.eevenkoto-badge` alone renders the default `subtle` + `neutral` + `md` Playbill Stamp.
- **Check component semantics:** `Badge` belongs to the `feedback` Tier 2 domain and is strictly **non-interactive** metadata/status print. If any `0.12.1` pill badge on your site was clickable (acting as a filter, tag selector, or dismissible control), migrate it to `Chip` / `ChipGroup` (`@eevenkoto/css/chip.css`, `control` domain) rather than adding pointer/hover styles to `.eevenkoto-badge`.

### 1.3 Visual, Structural & Token Updates on `Badge`

- **Two-weight Stamp border (`--eevenkoto-badge-border-*` vs `--eevenkoto-badge-inline-border-*`):**
  - Top and bottom rules use `border-block` (`--eevenkoto-badge-border-width`: `--eevenkoto-line-width-md`, `0.2rem`; `--eevenkoto-badge-border-color`: `--eevenkoto-color-content-accent` on `neutral`).
  - Left and right edges use `border-inline` (`--eevenkoto-badge-inline-border-width`: `--eevenkoto-line-width-sm`, `0.1rem`; `--eevenkoto-badge-inline-border-color`: `--eevenkoto-color-feedback-neutral-border` on subtle/outline `neutral`).
  - **Override pitfall:** If your site customized `--eevenkoto-badge-border-color` or `--eevenkoto-badge-border-width` in `0.12.1`, those variables now control only the top/bottom `2px` rules. Also set `--eevenkoto-badge-inline-border-color` / `--eevenkoto-badge-inline-border-width` if you want custom side hairlines and `dot` stub divider color/width to match.
- **Diamond stub indicator (`dot`):** `.eevenkoto-badge__dot` is now a full-height left stub separated from `__label` by a `1px` inline-end hairline divider, displaying a 45°-rotated `◆` square diamond (`::before`, `--eevenkoto-badge-dot-size` defaults to `0.42em` on `md`, `0.4em` on `sm`, `0.45em` on `lg`).
- **Display typeface & sharp corners:** `Badge` now sets `font-family: var(--_eevenkoto-badge-font-family)` (`--eevenkoto-font-serif`, Outfit), `font-weight: var(--eevenkoto-font-weight-bold)`, `letter-spacing: var(--eevenkoto-badge-tracking)` (`0.015em`), `text-transform: none` (sentence case), and `--eevenkoto-badge-radius: 0`. Remove any local site overrides adding `border-radius`, `text-transform: uppercase`, or font-family patches onto `.eevenkoto-badge`.

New and updated public Tier 3 tokens in `@eevenkoto/css/badge.css`:

| Token | Status in 0.13.0 | Host default |
| --- | --- | --- |
| `--eevenkoto-badge-border-color` | Updated role (`neutral` subtle/outline, block rules) | `--eevenkoto-color-content-accent` |
| `--eevenkoto-badge-border-width` | Updated default (top & bottom rules) | `--eevenkoto-line-width-md` |
| `--eevenkoto-badge-inline-border-color` | **Added** (left/right hairlines & `dot` divider) | `--eevenkoto-color-feedback-neutral-border` |
| `--eevenkoto-badge-inline-border-width` | **Added** (left/right hairlines & `dot` divider width) | `--eevenkoto-line-width-sm` |
| `--eevenkoto-badge-dot-color` | Updated (`neutral` subtle/outline diamond pip) | `--eevenkoto-color-content-accent` |
| `--eevenkoto-badge-dot-size` | Updated (`0.42em` `md`, `0.4em` `sm`, `0.45em` `lg`) | `0.42em` |
| `--eevenkoto-badge-font-family` | **Added** (display label face) | `--eevenkoto-font-serif` (`Outfit`) |
| `--eevenkoto-badge-tracking` | **Added** (label letter-spacing) | `0.015em` |
| `--eevenkoto-badge-radius` | Updated default (sharp Stamp corners) | `0` |

---

## 2. Behavioral & Visual Changes: `Notice` Playbill Framing, Default Icons & Typography

`Notice` shares the 1920s Playbill design language with `Badge`, reimagined as a broadsheet/playbill band rather than a rounded box.

### 2.1 Updated Default Intent Icons (`defaultNoticeIcon`)

`defaultNoticeIcon(intent)` in `@eevenkoto/core` changed for `neutral` and `admin`:

| `intent` | `0.12.1` default icon | `0.13.0` default icon | Change? |
| --- | --- | --- | --- |
| `'neutral'` (default) | `'info'` | **`'section'`** (`§` plaque) | **Changed** |
| `'admin'` | `'star'` | **`'monogram'`** | **Changed** |
| `'info'` | `'info'` | `'info'` | Unchanged (new engraved artwork) |
| `'success'` | `'check'` | `'check'` | Unchanged (new engraved artwork) |
| `'caution'` | `'warning'` | `'warning'` | Unchanged (new engraved artwork) |
| `'critical'` | `'warning'` | `'warning'` | Unchanged (new engraved artwork) |

**Site actions:**

- If your design or tests expect `'info'` on a `neutral` notice or `'star'` on an `admin` notice, pass `icon="info"` or `icon="star"` explicitly (or update tests asserting `defaultNoticeIcon('neutral') === 'section'` and `defaultNoticeIcon('admin') === 'monogram'`).
- Pass `icon={false}` (or `icon: false` in HTML) to omit `.eevenkoto-notice__icon` cleanly; the grid collapses to `1fr` automatically.
- Whenever `Notice` renders an icon (the default), import `@eevenkoto/css/icon.css` alongside `@eevenkoto/css/notice.css`:

```tsx
import '@eevenkoto/css/styles.css';
import '@eevenkoto/css/notice.css';
import '@eevenkoto/css/icon.css';
import { Notice } from '@eevenkoto/react';

export function NoticeUpgradeExample() {
  return (
    <>
      <Notice title="Editor's note" body="Default neutral now renders the section (§) vignette." />
      <Notice intent="neutral" icon="info" title="Tip" body="Explicit icon keeps 'info'." />
    </>
  );
}
```

### 2.2 Playbill / Oxford Double-Rule Geometry & Local CSS Cleanup

- **Open-sided Oxford double rules:** `.eevenkoto-notice` has `border-radius: 0`, open inline sides (`border-inline: 0`), a `3px` (`--eevenkoto-line-width-lg`) outer top/bottom border, a `3px` transparent air gap created via `padding-block: var(--_eevenkoto-notice-rule-gap)` + `background-clip: content-box`, and a `1px` (`--eevenkoto-line-width-sm`) inner hairline drawn by `::before`.
- **Vignette icon column:** `.eevenkoto-notice__icon` is a vertically centered full-height column separated from `.eevenkoto-notice__content` by a `1px` inline-end hairline divider, with icons scaled to `--eevenkoto-notice-icon-size: 2em` (`2.8rem` at the `body-sm` font scale).
- **Bare host fallback preserved:** Markup without `.eevenkoto-notice__content` (such as inline warnings inside `EquipmentBlock`) automatically falls back cleanly without breaking background clipping.
- **Override pitfall:** Delete any site stylesheet rule setting `padding`, `padding-block`, `border`, `border-left`, or `border-radius` directly on `.eevenkoto-notice`, or vertical alignment offsets on `.eevenkoto-notice__icon`. Because host `padding-block` renders the Oxford rule air gap, overwriting `padding` on `.eevenkoto-notice` collapses or corrupts the double-rule gap; adjust inner spacing through `--eevenkoto-notice-pad-block`, `--eevenkoto-notice-padding`, and `--eevenkoto-notice-gap` instead.

### 2.3 Subordinate Callout Typography

- **Secondary callout scale (`body-sm`, `1.4rem`):** `--eevenkoto-notice-font-size` stepped down from `--eevenkoto-font-size-body-md` (`1.6rem`) to `--eevenkoto-font-size-body-sm` (`1.4rem`), so notice copy sits clearly subordinate to surrounding prose.
- **Propagated atom scale:** Inside `.eevenkoto-notice`, default `Paragraph` and `List` atoms (without explicit `--sm` / `--lg` modifiers) inherit `--eevenkoto-notice-font-size` (`1.4rem`) and `currentColor` automatically.
- **Title hierarchy via face & weight, not larger size:** `.eevenkoto-notice__title` uses `font-family: var(--_eevenkoto-notice-title-font-family)` (`--eevenkoto-font-serif`, Outfit), `font-weight-bold`, `0.015em` tracking, `--eevenkoto-line-height-snug` (`1.25`), and `font-size: inherit` (`1.4rem`). Do not override `.eevenkoto-notice__title` with a larger `font-size`.
- **Neutral accent:** `neutral` subtle/outline notices highlight their outer Oxford rules and vignette icon with `--eevenkoto-color-content-accent` (warm bronze in light mode, club brass in dark mode).

New and updated public Tier 3 tokens in `@eevenkoto/css/notice.css`:

| Token | Status in 0.13.0 | Host default |
| --- | --- | --- |
| `--eevenkoto-notice-border-color` | Updated (`neutral` subtle/outline outer rule) | `--eevenkoto-color-content-accent` |
| `--eevenkoto-notice-border-width` | Updated default (outer Oxford rule width) | `--eevenkoto-line-width-lg` (`0.3rem`) |
| `--eevenkoto-notice-inner-border-color` | **Added** (inner Oxford hairline & vignette divider) | `--eevenkoto-color-feedback-neutral-border` |
| `--eevenkoto-notice-inner-border-width` | **Added** (inner hairline & divider width) | `--eevenkoto-line-width-sm` (`0.1rem`) |
| `--eevenkoto-notice-rule-gap` | **Added** (transparent gap between outer & inner rules) | `--eevenkoto-line-width-lg` (`0.3rem`) |
| `--eevenkoto-notice-icon` | Updated (`neutral` subtle/outline vignette icon) | `--eevenkoto-color-content-accent` |
| `--eevenkoto-notice-icon-size` | **Added** (vignette glyph box size) | `2em` |
| `--eevenkoto-notice-radius` | Updated default (sharp Playbill corners) | `0` |
| `--eevenkoto-notice-pad-block` | **Added** (top/bottom padding inside inner hairlines) | `--eevenkoto-space-3` (`1.2rem`) |
| `--eevenkoto-notice-title-font-family` | **Added** (title face) | `--eevenkoto-font-serif` (`Outfit`) |
| `--eevenkoto-notice-title-tracking` | **Added** (title letter-spacing) | `0.015em` |
| `--eevenkoto-notice-font-size` | Updated default (notice scale for title + body) | `--eevenkoto-font-size-body-sm` (`1.4rem`) |

---

## 3. Icon System Overhaul: 1920s Engraved Glyphs & 23 New Icons

All existing icons in `@eevenkoto/core` (`packages/core/src/tokens/icons.ts`) were redrawn in Eevenkoto's 1920s engraved / Art Deco woodcut style on a `16×16` `viewBox` (`fill="currentColor"`), and 23 new glyphs were added.

### 3.1 Critical Stumble Guards for Existing Sites

1. **Breaking visual alias — `'sword'` now renders `'revolver'`:**
   In `iconPaths`, five legacy names alias newer canonical glyphs (`iconPaths.sword === iconPaths.revolver`, `iconPaths.swords === iconPaths.blades`, `iconPaths.arrow === iconPaths['arrow-right']`, `iconPaths.close === iconPaths.x`, `iconPaths.refresh === iconPaths.reroll`).
   - Because `'sword'` now draws a **revolver**, audit any fantasy/melee UI (weapons, attack buttons, combat equipment slots) that previously used `icon="sword"` or `<Icon name="sword" />` and switch edged-weapon call sites to **`'blades'`** or **`'swords'`** (or adopt **`'revolver'`** explicitly for 1920s firearms).
2. **All paths are filled silhouettes (`fill="currentColor"`) — never apply CSS `stroke`:**
   Previously (until `0.11`), icons were `24×24` stroke outlines. In `0.13.0`, every path in `iconPaths` uses fine interior negative-space cutouts filled via `fill="currentColor"`. Check your site CSS for rules adding `stroke: currentColor` or `stroke-width` onto `.eevenkoto-icon` or `.eevenkoto-icon path` — CSS strokes thicken outlines and plug engraved interior facets.
3. **Respect minimum icon size (`sm` = `--eevenkoto-space-3` / `1.2rem`):**
   Avoid overriding `--eevenkoto-icon-size` below `--eevenkoto-space-3` (`1.2rem`); fine woodcut facet lines require at least `12px` to stay legible.

### 3.2 Complete Inventory of the 23 New Icons (`46` `ICON_NAMES`, `42` `BUTTON_ICON_NAMES`)

| Category | New names in `0.13.0` | In `BUTTON_ICON_NAMES`? | Notes |
| --- | --- | --- | --- |
| **Directional arrows** | `arrow-left`, `arrow-right` | Yes (`42` total) | `arrow` is an exact path alias of `arrow-right`. |
| **Directional chevrons** | `chevron-left`, `chevron-up` | **No** (use `<Icon />` only) | Together with `chevron-down` and `chevron-right`, the 4 chevrons are excluded from `BUTTON_ICON_NAMES`. |
| **1920s club, TTRPG & editorial** | `blades`, `cocktail`, `fabric`, `flashlight`, `monogram`, `neon-sign`, `newspaper`, `pin`, `pocket-watch`, `revolver`, `saxophone`, `section`, `teacup`, `typewriter` | Yes | `blades` === `swords`; `revolver` === `sword`; `section` and `monogram` power the new `Notice` defaults. |
| **UI & utility chrome** | `download`, `link`, `login`, `minus`, `x` | Yes | `x` === `close`; `reroll` === `refresh`. |

### 3.3 `LinkButton` Arrow Hook & CSS Mask Sync

- **`LinkButton` (`@eevenkoto/core`):** `linkButtonClassNames()` now emits `eevenkoto-link-button--icon-arrow` whenever `icon` is `'arrow'`, `'arrow-right'`, or `'arrow-left'`, automatically applying `:dir(rtl)` horizontal glyph mirroring (`transform: scaleX(-1)`). Previously only `'arrow'` triggered this hook.

```ts
import '@eevenkoto/css/styles.css';
import '@eevenkoto/css/link-button.css';
import '@eevenkoto/css/icon.css';
import { renderLinkButton } from '@eevenkoto/html';

// Emits .eevenkoto-link-button--icon-arrow in 0.13.0 for RTL glyph mirroring
const ctaHtml = renderLinkButton({
  href: '/catalog',
  label: 'Back to catalog',
  variant: 'ghost',
  icon: 'arrow-left',
  iconPosition: 'left',
});
```

- **CSS disclosure masks (`@eevenkoto/css/tokens.css`):** `--eevenkoto-icon-mask-chevron-right` and `--eevenkoto-icon-mask-chevron-down` (used by `Menu` `<details>` markers and any site CSS `mask-image` indicators) were updated to match the engraved `chevron-right` and `chevron-down` `iconPaths`. No action is needed beyond bumping `@eevenkoto/css`.

---

## 4. Internal Organism Updates

Consuming-site usage of these composed organisms updates automatically when packages are bumped (no API changes except `TierCardProps.badge` dropping `shape`):

- `AccountMenu`, `DocumentHeader`, `ContentGate`, and `TierCard` (HTML, React, Vue, and Astro) now compose `Badge` with the default 1920s Playbill Stamp silhouette instead of passing `shape="pill"`.
