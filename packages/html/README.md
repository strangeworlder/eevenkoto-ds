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

**Core atoms:** `renderButton`, `renderLinkButton`, `renderBadge`, `renderHeading`, `renderParagraph`, `renderListItem`, `renderCaption`, `renderFrame`, `renderScroll`, `renderIcon`, `renderPopover`, `renderInlineRef`, `renderAvatar`, `renderInput`, `renderTableCell`, `renderProperty`, `renderStat`.

**Core molecules / organism:** `renderFlow`, `renderNotice`, `renderField`, `renderSegmentedControl`, `renderCard`, `renderTooltipCard`, `renderMenu`, `renderProse`, `renderList`, `renderPropertyList`, `renderTable`, `renderTableShell`.

**Domain:** `renderEntityRef`, `renderAbilityScore`, `renderAbilityScoreGroup`, `renderStatblockFeature`, `renderStatblockSection`, `renderStatblock`, `renderSpellblock`.

`renderFlow` / `renderProse` / `renderFrame` / `renderScroll` take a `content` string (concatenate child HTML yourself). React/Vue use children / slots instead.

Class names and prop types come from `@eevenkoto/core`.

**Button vs LinkButton:** `renderButton` is for in-page actions (`<button>`). Prominent “go to URL” CTAs use `renderLinkButton` (`<a href>`). Do not pass `href` into Button. Terms in running text use `renderInlineRef`. Same-site pages with a real URL still use LinkButton.

## Related

- `@eevenkoto/css` — styles (consume / never rules live there)
- `@eevenkoto/core` — shared contract
- `@eevenkoto/react` / `@eevenkoto/vue` — framework wrappers over the same classes

For agents: feed Storybook `/llms.txt` or `/llms-full.txt` (generated via `npm run generate:llms`).