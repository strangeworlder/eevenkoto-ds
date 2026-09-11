# AGENTS.md — contributing to Eevenkoto

Operating rules for agents and humans editing **this repository**. For installing and using published packages, feed Storybook’s [`/llms.txt`](http://localhost:6006/llms.txt) / [`/llms-full.txt`](http://localhost:6006/llms-full.txt) (generated from foundations MDX + package READMEs). Same files are written to the repo root by `npm run generate:llms`.

## Repo map

| Path | Role |
| --- | --- |
| `packages/css` | Tokens, base styles, Core/Domain component CSS (appearance SoT) |
| `packages/core` | Shared prop types + `*ClassNames()` helpers (no DOM) |
| `packages/html` | Canonical vanilla `render*` markup |
| `packages/react` / `packages/vue` | Thin wrappers over the same classes |
| `apps/storybook` | Docs and live catalogs |

## Source of truth (when authoring)

1. **CSS** defines appearance (`packages/css`).
2. **Core** defines the public prop contract and BEM class assembly.
3. **HTML** is the reference markup (Storybook canvases).
4. **React / Vue** only map props → the same class strings and elements.

## Tokens

| Tier | File | Who consumes it |
| --- | --- | --- |
| 1 — Primitives | `packages/css/tokens/primitive-tokens.css` | Tier 2 only |
| 2 — Semantics | `packages/css/tokens/tokens.css` | Layouts, utilities, Tier 3 bridges |
| 3 — Components | `packages/css/core/**`, `packages/css/domain/**` | Host component only |

**Hard rules**

- Component and app stylesheets consume **Tier 2** (`--eevenkoto-color-surface-*`, `content-*`, `control-*`, …) and metric aliases (`--eevenkoto-font-size-heading-*`, `--eevenkoto-space-*`, …).
- Never reference Tier 1 hue primitives (`--eevenkoto-color-turquoise-*`, `parchment-*`, `gold-*`, …) or the rem ladder (`--eevenkoto-font-size-xs`…`3xl`) from component CSS.
- Missing intent → add a Tier 2 token in `tokens.css`. New pigment → Tier 1 only after design review.
- No raw `oklch()` / hex / rgb in component sheets. Do not use `opacity` for disabled UI — use opaque `*-disabled` semantic tuples.
- Space, radius, and line-width are single-tier scales in `tokens.css` (no primitive layer).

Stylelint / CI guards described in Storybook Color Tokens docs are **planned, not enforced yet**. Follow the rules anyway.

## Tier 3 component pattern

Copy [`packages/css/core/atoms/button.css`](./packages/css/core/atoms/button.css) (also [`badge.css`](./packages/css/core/atoms/badge.css)):

1. Declare private bridges once on the host: `--_eevenkoto-<component>-*` with fallback `var(--eevenkoto-<component>-*, var(--eevenkoto-color-…))`.
2. Properties read **only** the private `--_*` variables.
3. Variants and states set the **public** `--eevenkoto-*` API — never reassign `--_*` on modifiers.

Deep dive: `apps/storybook/src/foundations/color-tokens-tier3-component-scoping.mdx`.

## Minimum-class defaults

The **host class alone** must render the documented default (Button primary+md, Badge subtle+neutral, Table row stripe, Heading level from tag, etc.). Modifier classes are opt-in; default aliases (`--primary`, `--md`) may exist for helpers but must not be required for appearance.

- Full rules + checklist: `apps/storybook/src/foundations/minimum-class-defaults.mdx` (Storybook **Foundations/Minimum-class defaults**)
- Bare `h1`–`h6` / `p` / `ul` / `ol` / `li`: only under `.eevenkoto-prose`; compose with `.eevenkoto-flow` for rhythm
- Heading tag maps use `:where(hN).eevenkoto-heading` so `--M` still overrides; List ordered maps use `:where(ol).eevenkoto-list`

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
- Types: core/html `*Props`; React `*ComponentProps`. Do not add `*Args` aliases.
- Files: TS camelCase, CSS/HTML kebab-case (`primitive-tokens.css`), React/Vue/Storybook PascalCase.

## Agent feed-in files

`llms.txt` / `llms-full.txt` are **generated** from package READMEs + foundations MDX (`npm run generate:llms`). Storybook serves them at `/llms.txt` and `/llms-full.txt` (and copies `AGENTS.md` to `/AGENTS.md`). Do not hand-edit the generated files — change the MDX/README sources and regenerate (also runs automatically before `storybook` / `build-storybook`).
