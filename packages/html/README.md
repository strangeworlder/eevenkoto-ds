# @eevenkoto/html

Canonical vanilla API for Eevenkoto: HTML templates + `render*` functions that return markup strings. Source lives under `core/` and `domain/` (Atoms / Molecules / Organisms); the package barrel keeps a stable public API.

## Install

```bash
npm install @eevenkoto/css @eevenkoto/html
```

## Usage

CSS is not injected for you — import it explicitly:

```ts
import '@eevenkoto/css/styles.css';
import '@eevenkoto/css/button.css';
import { renderButton } from '@eevenkoto/html';

document.body.innerHTML = renderButton({
  variant: 'primary',
  label: 'Save',
});
```

`@eevenkoto/css` is an **optional peer** — import it in the host or markup is unstyled.

**Core atoms:** `renderAvatar`, `renderBadge`, `renderButton`, `renderCaption`, `renderCheckbox`, `renderChip`, `renderDivider`, `renderFrame`, `renderHeading`, `renderIcon`, `renderImage`, `renderInlineRef`, `renderInput`, `renderLinkButton`, `renderListItem`, `renderParagraph`, `renderPopover`, `renderProgressBar`, `renderProperty`, `renderRadio`, `renderScroll`, `renderSelect`, `renderStat`, `renderStatusDot`, `renderSwatch`, `renderTableCell`, `renderToast`.

**Core molecules:** `renderCard`, `renderCatalog`, `renderCatalogTile`, `renderCheckboxGroup`, `renderChipGroup`, `renderDisclosure`, `renderField`, `renderFloatingBanner`, `renderFlow`, `renderList`, `renderMenu`, `renderNotice`, `renderPropertyList`, `renderProse`, `renderRadioGroup`, `renderSectionHeader`, `renderSegmentedControl`, `renderStepper`, `renderTable`, `renderTableOfContents`, `renderTooltipCard`.

**Core organisms:** `renderAccountMenu`, `renderTableShell`, `renderTierCard`, `renderWorkshop`.

**Domain:** `renderAbilityName`, `renderEntityRef`, `renderAbilityScore`, `renderAbilityScoreGroup`, `renderContentTable`, `renderDocumentHeader`, `renderEntityPreview`, `renderLicenseBar`, `renderMapFrame`, `renderNpcCard`, `renderNpcCardGrid`, `renderReadAloudBox`, `renderStatblockFeature`, `renderStatblockSection`, `renderStatblock`, `renderSpellblock`, `renderEquipmentBlock`, `renderEquipmentWorkshop`, `renderContentGate`.

**HTML utilities:** `escapeHtml`, `sanitizeInlineHtml`, `slugifyId`.

`renderFlow` / `renderProse` / `renderFrame` / `renderScroll` take a `content` string (concatenate child HTML yourself). React/Vue/Astro use children / slots instead. `renderEquipmentBlock` (like `renderStatblock` and `renderSpellblock`) composes companion stylesheets alongside `@eevenkoto/css/equipment-block.css` (`heading.css`, plus `caption.css`, `badge.css`, `chip.css`, `list.css`, `notice.css`, `button.css`, and `ability-name.css` for the sections you render).

Class names and prop types come from `@eevenkoto/core`.

**Button vs LinkButton:** `renderButton` is for in-page actions (`<button>`). Prominent “go to URL” CTAs and standalone action links (`primary` / `secondary` / `ghost`) use `renderLinkButton` (`<a href>`). Do not pass `href` into Button. Terms in running text use `renderInlineRef` / `renderEntityRef`. Same-site pages with a real URL still use LinkButton.

## Related

- `@eevenkoto/css` — styles (consume / never rules and theming live there)
- `@eevenkoto/core` — shared contract
- `@eevenkoto/react` / `@eevenkoto/vue` / `@eevenkoto/astro` — framework wrappers over the same classes
- Repo `CHANGELOG.md`, `docs/migration-0.13-playbill-chrome-and-icons.md`, `docs/migration-0.12-frontend-gap-resolution.md`, and `docs/migration-token-architecture-and-a11y.md` — upgrade & token migration checklists for consuming sites

For agents: feed Storybook `/llms.txt` or `/llms-full.txt` (generated via `npm run generate:llms`).