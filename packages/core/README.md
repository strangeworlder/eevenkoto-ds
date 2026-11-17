# @eevenkoto/core

Shared prop types and pure className helpers for Eevenkoto. No DOM, no templates, no CSS.

Source modules live under `core/` and `domain/` (Atoms / Molecules / Organisms). The package root barrel keeps a stable public API.

Most apps use this indirectly through `@eevenkoto/html`, `@eevenkoto/react`, `@eevenkoto/vue`, or `@eevenkoto/astro`.

## Install

```bash
npm install @eevenkoto/core
```

## Usage

```ts
import { buttonClassNames, type ButtonProps } from '@eevenkoto/core';

const className = buttonClassNames({
  variant: 'primary',
  size: 'sm',
  icon: 'star',
});
// "eevenkoto-button eevenkoto-button--primary eevenkoto-button--sm eevenkoto-button--icon-left"
```

Helpers include `buttonClassNames`, `linkButtonClassNames`, `badgeClassNames`, `statusDotClassNames`, `swatchClassNames`, `chipClassNames`, `chipGroupClassNames`, `dividerClassNames`, `progressBarClassNames`, `headingClassNames`, `iconClassNames`, `imageClassNames`, `inputClassNames`, `selectClassNames`, `checkboxClassNames`, `radioClassNames`, `stepperClassNames`, `toastClassNames`, `fieldClassNames`, `disclosureClassNames`, `floatingBannerClassNames`, `tableOfContentsClassNames`, `sectionHeaderClassNames`, `menuClassNames`, `catalogClassNames`, `popoverClassNames`, `noticeClassNames`, `cardClassNames`, `tierCardClassNames`, `accountMenuClassNames`, `workshopClassNames`, plus Domain helpers (`abilityNameClassNames`, `entityRefClassNames`, `abilityScoreClassNames`, `statblockClassNames`, `spellblockClassNames`, `equipmentBlockClassNames`, `equipmentWorkshopClassNames`, `licenseBarClassNames`, `documentHeaderClassNames`, `contentTableClassNames`, `entityPreviewClassNames`, `readAloudBoxClassNames`, `npcCardClassNames`, `npcCardGridClassNames`, `mapFrameClassNames`, `contentGateClassNames`, …) and `ICON_NAMES` / `BUTTON_ICON_NAMES` / `iconPaths`. Full export list: `src/index.ts`.

Pair with `@eevenkoto/css` for styling.

**Button vs LinkButton:** in-page actions → `buttonClassNames` / Button. Prominent “go to URL” CTAs → `linkButtonClassNames` / LinkButton (`<a>`, never `href` on Button). Terms in copy → InlineRef / EntityRef. Chooser: Storybook Glossary.

## Related

- `@eevenkoto/css` — tokens and component styles (consume / never rules live there)
- `@eevenkoto/html` / `@eevenkoto/react` / `@eevenkoto/vue` / `@eevenkoto/astro` — markup bindings
- Repo `CHANGELOG.md`, `docs/migration-0.14-calling-card-surfaces.md`, `docs/migration-0.13-playbill-chrome-and-icons.md`, `docs/migration-0.12-frontend-gap-resolution.md`, and `docs/migration-token-architecture-and-a11y.md` — upgrade & token migration checklists for consuming sites

For agents: feed Storybook `/llms.txt` or `/llms-full.txt` (generated via `npm run generate:llms`).