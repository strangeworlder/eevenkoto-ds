# Eevenkoto design system

Eevenkoto is a **TTRPG content design system with growing core chrome**. It is not a full application UI kit: Dialog, Tabs, breadcrumbs, and **AppShell / Sidebar** are **not shipped** (portable page chrome such as ProgressBar, FloatingBanner, AccountMenu, TableOfContents and LicenseBar is). Some Tier 2 color roles (modals, destructive controls) exist as **tokens only** so future or app-local patterns can consume stable semantics.

Packages: `@eevenkoto/css` (appearance) → `@eevenkoto/core` (props + BEM classes) → `@eevenkoto/html` (reference markup) → `@eevenkoto/react` / `@eevenkoto/vue` / `@eevenkoto/astro` (thin wrappers). CSS is an **optional peer** of the bindings — import `@eevenkoto/css` yourself or markup is unstyled.

## Install

```bash
npm install @eevenkoto/css @eevenkoto/html
# or @eevenkoto/react / @eevenkoto/vue / @eevenkoto/astro
```

```ts
import '@eevenkoto/css/styles.css';
import '@eevenkoto/css/button.css';
```

`styles.css` loads Inter and Outfit from Google Fonts. Self-host or override `font-family` if you cannot use that CDN.

## Docs

- Storybook: `npm run storybook` → [http://localhost:6006](http://localhost:6006)
- Release notes: [`CHANGELOG.md`](./CHANGELOG.md)
- Consuming-site upgrade guides: [`docs/migration-0.14-calling-card-surfaces.md`](./docs/migration-0.14-calling-card-surfaces.md), [`docs/migration-0.13-playbill-chrome-and-icons.md`](./docs/migration-0.13-playbill-chrome-and-icons.md), [`docs/migration-0.12-frontend-gap-resolution.md`](./docs/migration-0.12-frontend-gap-resolution.md), and [`docs/migration-token-architecture-and-a11y.md`](./docs/migration-token-architecture-and-a11y.md)
- Agent feed-in: [`llms.txt`](./llms.txt) / [`llms-full.txt`](./llms-full.txt) (regenerate with `npm run generate:llms`)
- Contributors: [`AGENTS.md`](./AGENTS.md)

## Shipped vs not

| Status | Surfaces |
| --- | --- |
| **Shipped** | Typography, Flow/Prose/Frame/Scroll/Image, Button/LinkButton/Icon, Badge/StatusDot/Chip/Notice/Toast, Field+Input/Select/Checkbox/Radio, CheckboxGroup/RadioGroup/Stepper/SegmentedControl, Menu, Catalog, Popover+TooltipCard, Card, table stack, Workshop, Stat/Property/PropertyList/List, Avatar/InlineRef, Domain AbilityName + EntityRef + statblock/spellblock + equipment/workshop stack |
| **Updated in 0.14** | 1920s Letterpress Calling Card overhaul across `Card` (`featured` replaces `CardAccent` / `accent`), `TierCard`, `NpcCard`, `ContentGate`, and `TooltipCard` (see [`docs/migration-0.14-calling-card-surfaces.md`](./docs/migration-0.14-calling-card-surfaces.md)) |
| **Updated in 0.13** | 1920s Playbill `Notice` & Stamp `Badge` (removed `Badge` `shape`), plus 46-glyph engraved `Icon` catalog & directional `LinkButton` arrow hooks (see [`docs/migration-0.13-playbill-chrome-and-icons.md`](./docs/migration-0.13-playbill-chrome-and-icons.md)) |
| **Shipped in 0.12** | Swatch, Divider, ProgressBar, FloatingBanner, Disclosure, ChipGroup, TableOfContents, SectionHeader, TierCard, AccountMenu; Domain LicenseBar, DocumentHeader, ContentTable, EntityPreview, ReadAloudBox, NpcCard, NpcCardGrid, MapFrame, ContentGate (see [`docs/migration-0.12-frontend-gap-resolution.md`](./docs/migration-0.12-frontend-gap-resolution.md)) |
| **Token-only** | Modal surface roles, destructive control tuples |
| **Not planned here** | Dialog, Pager, Tabs, date pickers, AppShell / Sidebar |

## Scripts

| Command | Role |
| --- | --- |
| `npm run build` | Build core → html → react → vue |
| `npm run storybook` | Generate llms + Storybook |
| `npm run build-storybook` | Build packages + static Storybook |
| `npm run generate:llms` | Refresh `llms.txt` / `llms-full.txt` |
| `npm run lint:css` | Token / Tier 3 / rhythm Stylelint |
| `npm run contrast` | Dual-canvas WCAG contrast |
| `npm run test` | Binding contract, Astro, token parity, and spacing tests |
| `npm run test:storybook` | Headless Chromium Storybook + `axe-core` + `play` tests |
| `npm run ci` | build + lint + contrast + test + llms |
