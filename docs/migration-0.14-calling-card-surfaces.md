# Migrating from 0.13.0 to 0.14.0 — Letterpress Calling Card Surfaces

Upgrade guide for consuming sites bumping `@eevenkoto/*` from **`^0.13.0`** to **`^0.14.0`**. Version `0.14.0` replaces `Card`'s generic rounded box and directional edge bars (`CardAccent` / `accent`) with the **1920s Letterpress Calling Card** silhouette (`0px` outer trim, `4px` paper margin, concave-scooped inner passe-partout, and non-directional `featured` brass / `current` club-turquoise frames), and brings `TierCard`, `NpcCard`, `ContentGate`, and `TooltipCard` onto the same Calling Card DNA.

## Quick Upgrade Checklist

Bump all installed `@eevenkoto/*` packages together in lockstep (`0.13.0` → `^0.14.0`), then run through these 5 checks in your consuming site:

1. **Remove `CardAccent`, `accent` props, and `.eevenkoto-card--accent-top` / `.eevenkoto-card--accent-start` / `.eevenkoto-card--accent-outline`**: move emphasized cards to `featured` (`.eevenkoto-card--featured`) or neutral `surface="subtle"` ([Section 1](#1-breaking-changes-cardaccent--accent-removal-and-featured)).
2. **Audit `Card` `--current` overrides**: `.eevenkoto-card--current` now uses club-turquoise passe-partout rules instead of a permanent outer focus ring, reserving the dual-halo ring for `:focus-visible` ([Section 1.2](#12-removed-css-modifiers--custom-properties)).
3. **Audit `Card` / `NpcCard` / `ContentGate` / `TooltipCard` CSS overrides**: all four card-family hosts now use `--eevenkoto-*-radius` (`0`), `--eevenkoto-*-frame-gap` (`space-1`), `--eevenkoto-*-inner-border-*`, and `--eevenkoto-*-inner-radius` (`radius-sm` under `@supports (corner-shape: scoop)`). Remove any local `border-radius` or `--eevenkoto-card-accent-*` / `--eevenkoto-card-ring-*` / `--eevenkoto-content-gate-accent*` CSS overrides ([Section 2](#2-visual--token-updates-across-the-card-family)).
4. **Check `ContentGate` tier comparison strip**: `.eevenkoto-content-gate__comparison` is now a `0px` Stamp strip with `2px` top/bottom rules and an inline hairline divider instead of a `9999px` pill.
5. **Check `TooltipCard` inside `Popover`**: when `.eevenkoto-tooltip-card` is a direct child of `.eevenkoto-popover`, Popover automatically snaps to `0px` Calling Card trim (`boundary-strong`) while `TooltipCard` retains its inner passe-partout.

Run this search across your site's `src/` directory before building:

```bash
grep -rnE "CardAccent|\baccent\s*[:=]|eevenkoto-card--accent-|--eevenkoto-card-(accent|ring)-|--eevenkoto-content-gate-(accent)" src/
```

---

## 1. Breaking Changes: `CardAccent` / `accent` Removal & `featured`

`Card` drops directional SaaS callout bars (`accent="top"`, `accent="start"`, `accent="outline"`) in favor of symmetric Letterpress Calling Card framing, using a single `featured?: boolean` prop (matching `TierCard`) for gilded brass emphasis.

### 1.1 Removed TypeScript & Prop APIs

| Package | Removed API | Migration action |
| --- | --- | --- |
| `@eevenkoto/core` | `CardAccent` type; `CardProps.accent`; `CardClassNameProps.accent` | Delete `CardAccent` imports; pass `featured?: boolean` for brass emphasis or omit `accent`. |
| `@eevenkoto/html` | `CardAccent` re-export; `accent` option in `renderCard()` | Replace `accent: 'outline'` / `'top'` with `featured: true` (or omit for neutral `surface="subtle"`). |
| `@eevenkoto/react` | `CardAccent` re-export; `accent` prop on `<Card />` | Replace `accent="outline"` / `"top"` with `featured` (or omit for neutral cards). |
| `@eevenkoto/vue` | `CardAccent` re-export; `accent` prop on `<Card />` | Replace `accent="outline"` / `"top"` with `:featured="true"` (or omit for neutral cards). |
| `@eevenkoto/astro` | `accent` prop on `<Card />` | Replace `accent="outline"` / `"top"` with `featured` (or omit for neutral cards). |

**Before (0.13.0):**

```tsx
import '@eevenkoto/css/styles.css';
import '@eevenkoto/css/card.css';
import type { CardAccent } from '@eevenkoto/core';
import { Card } from '@eevenkoto/react';

const accent: CardAccent = 'top';

export function UpgradeExample() {
  return (
    <>
      <Card accent={accent} surface="subtle" title="Adventure Info">
        Levels 3–5 · 4 hours
      </Card>
      <Card accent="start" surface="subtle">
        Highlighted attribute callout
      </Card>
    </>
  );
}
```

**After (0.14.0):**

```tsx
import '@eevenkoto/css/styles.css';
import '@eevenkoto/css/card.css';
import { Card } from '@eevenkoto/react';

export function UpgradeExample() {
  return (
    <>
      <Card featured surface="subtle" title="Adventure Info">
        Levels 3–5 · 4 hours
      </Card>
      <Card surface="subtle">
        Highlighted attribute callout
      </Card>
    </>
  );
}
```

### 1.2 Removed CSS Modifiers & Custom Properties

- **`.eevenkoto-card--accent-top`, `.eevenkoto-card--accent-start`, and `.eevenkoto-card--accent-outline` have been deleted** from `@eevenkoto/css/card.css`. Use `.eevenkoto-card--featured` for gilded brass passe-partout emphasis or `.eevenkoto-card--current` for active club-turquoise selection.
- **Removed CSS custom properties on `Card`**: `--eevenkoto-card-accent-*` (`top` and `start` edge tokens) and `--eevenkoto-card-ring-*` (permanent `current` ring tokens) have been removed. Use `--eevenkoto-card-border-*`, `--eevenkoto-card-inner-border-*`, `--eevenkoto-card-frame-gap`, and `--eevenkoto-card-divider-*`.
- **Removed CSS custom property on `ContentGate`**: `--eevenkoto-content-gate-accent*` (top accent bar) has been removed; `ContentGate` now uses neutral Calling Card passe-partout framing via `--eevenkoto-content-gate-border-*`, `--eevenkoto-content-gate-inner-border-*`, and `--eevenkoto-content-gate-frame-gap`.

---

## 2. Visual & Token Updates Across the Card Family

All four card-family surfaces now share the 1920s Letterpress Calling Card geometry:

- **Outer cardstock trim (`border-radius: 0`)**: `1px` (`--eevenkoto-line-width-sm`) `--eevenkoto-color-boundary-strong` by default; `2px` (`--eevenkoto-line-width-md`) brass (`content-accent-strong`) on `Card --featured` and club turquoise (`feedback-info-icon`) on `Card --current`.
- **Inner passe-partout (`::before`)**: inset by `--eevenkoto-*-frame-gap` (`space-1`, `4px`), `1px` `--eevenkoto-color-boundary-subtle`, with `4px` concave corner scallops (`radius-sm` + `corner-shape: scoop`) where supported and crisp `0px` corners otherwise.
- **Header & footer compartments**: `Card`, `NpcCard`, `ContentGate`, and `TooltipCard` align section dividers cleanly inside the inner passe-partout; `Card`, `NpcCard`, and `TooltipCard` titles use `Outfit` bold (`700`) with `0.015em` letter-spacing.
- **Crisp cardstock shadows**: `Card --elevated`, `Card --interactive:hover`, `ContentGate`, standalone `TooltipCard`, and `Popover:has(> .eevenkoto-tooltip-card)` use a tight `0.2rem 0.2rem 0` cardstock offset paired with a soft `0.3rem 0.6rem` (or `0.2rem 0.4rem` on `Card`) penumbra.

### New & Updated Public CSS Override Tokens

| Component | Key new / updated public tokens | Host default |
| --- | --- | --- |
| `Card` | `--eevenkoto-card-border-color` / `--eevenkoto-card-inner-border-color` / `--eevenkoto-card-inner-border-width` / `--eevenkoto-card-frame-gap` / `--eevenkoto-card-radius` / `--eevenkoto-card-inner-radius` / `--eevenkoto-card-title-weight` / `--eevenkoto-card-title-tracking` | `boundary-strong` / `boundary-subtle` / `line-width-sm` / `space-1` / `0` / `radius-sm` / `font-weight-bold` / `0.015em` |
| `NpcCard` | `--eevenkoto-npc-card-border-color` / `--eevenkoto-npc-card-inner-border-color` / `--eevenkoto-npc-card-inner-border-width` / `--eevenkoto-npc-card-frame-gap` / `--eevenkoto-npc-card-radius` / `--eevenkoto-npc-card-inner-radius` / `--eevenkoto-npc-card-pad-block` / `--eevenkoto-npc-card-pad-inline` | `boundary-strong` / `boundary-subtle` / `line-width-sm` / `space-1` / `0` / `radius-sm` / `space-3` / `space-4` |
| `ContentGate` | `--eevenkoto-content-gate-border-color` / `--eevenkoto-content-gate-border-width` / `--eevenkoto-content-gate-inner-border-color` / `--eevenkoto-content-gate-inner-border-width` / `--eevenkoto-content-gate-frame-gap` / `--eevenkoto-content-gate-radius` / `--eevenkoto-content-gate-inner-radius` | `boundary-strong` / `line-width-sm` / `boundary-subtle` / `line-width-sm` / `space-1` / `0` / `radius-sm` |
| `TooltipCard` | `--eevenkoto-tooltip-card-border-color` / `--eevenkoto-tooltip-card-inner-border-color` / `--eevenkoto-tooltip-card-inner-border-width` / `--eevenkoto-tooltip-card-frame-gap` / `--eevenkoto-tooltip-card-radius` / `--eevenkoto-tooltip-card-inner-radius` | `boundary-strong` / `boundary-subtle` / `line-width-sm` / `space-1` / `0` / `radius-sm` |
