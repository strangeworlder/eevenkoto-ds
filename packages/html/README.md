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

**Core atoms:** `renderAvatar`, `renderBadge`, `renderButton`, `renderCaption`, `renderCheckbox`, `renderChip`, `renderFrame`, `renderHeading`, `renderIcon`, `renderImage`, `renderInlineRef`, `renderInput`, `renderLinkButton`, `renderListItem`, `renderParagraph`, `renderPopover`, `renderProperty`, `renderRadio`, `renderScroll`, `renderSelect`, `renderStat`, `renderStatusDot`, `renderTableCell`, `renderToast`.

**Core molecules / organism:** `renderCard`, `renderCatalog`, `renderCatalogTile`, `renderCheckboxGroup`, `renderField`, `renderFlow`, `renderList`, `renderMenu`, `renderNotice`, `renderProse`, `renderPropertyList`, `renderRadioGroup`, `renderSegmentedControl`, `renderStepper`, `renderTable`, `renderTooltipCard`, `renderTableShell`.

**Domain:** `renderAbilityName`, `renderEntityRef`, `renderAbilityScore`, `renderAbilityScoreGroup`, `renderStatblockFeature`, `renderStatblockSection`, `renderStatblock`, `renderSpellblock`, `renderEquipmentBlock`, `renderEquipmentWorkshop`.

`renderFlow` / `renderProse` / `renderFrame` / `renderScroll` take a `content` string (concatenate child HTML yourself). React/Vue use children / slots instead. When `renderEquipmentBlock` renders `abilities` (or you call `renderAbilityName` directly), import `@eevenkoto/css/ability-name.css` alongside `@eevenkoto/css/equipment-block.css`.

Class names and prop types come from `@eevenkoto/core`.

**Button vs LinkButton:** `renderButton` is for in-page actions (`<button>`). Prominent “go to URL” CTAs use `renderLinkButton` (`<a href>`). Do not pass `href` into Button. Terms in running text use `renderInlineRef`. Same-site pages with a real URL still use LinkButton.

## Related

- `@eevenkoto/css` — styles (consume / never rules and theming live there)
- `@eevenkoto/core` — shared contract
- `@eevenkoto/react` / `@eevenkoto/vue` — framework wrappers over the same classes
- Repo `CHANGELOG.md` and `docs/migration-token-architecture-and-a11y.md` — upgrade & token migration checklist for consuming sites

For agents: feed Storybook `/llms.txt` or `/llms-full.txt` (generated via `npm run generate:llms`).