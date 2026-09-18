# Eevenkoto design system

Eevenkoto is a **TTRPG content design system with growing core chrome**. It is not a full application UI kit: Dialog, Select, Toast, Tabs, breadcrumbs, and app-shell patterns are **not shipped**. Some Tier 2 color roles (form checkboxes, toasts, modals) exist as **tokens only** so future components can land without renaming semantics.

Packages: `@eevenkoto/css` (appearance) → `@eevenkoto/core` (props + BEM classes) → `@eevenkoto/html` (reference markup) → `@eevenkoto/react` / `@eevenkoto/vue` (thin wrappers). CSS is an **optional peer** of the bindings — import `@eevenkoto/css` yourself or markup is unstyled.

## Install

```bash
npm install @eevenkoto/css @eevenkoto/html
# or @eevenkoto/react / @eevenkoto/vue
```

```ts
import '@eevenkoto/css/styles.css';
import '@eevenkoto/css/button.css';
```

`styles.css` loads Inter and Outfit from Google Fonts. Self-host or override `font-family` if you cannot use that CDN.

## Docs

- Storybook: `npm run storybook` → [http://localhost:6006](http://localhost:6006)
- Agent feed-in: [`llms.txt`](./llms.txt) / [`llms-full.txt`](./llms-full.txt) (regenerate with `npm run generate:llms`)
- Contributors: [`AGENTS.md`](./AGENTS.md)

## Shipped vs not

| Status | Surfaces |
| --- | --- |
| **Shipped** | Typography, Flow/Prose/Frame/Scroll, Button/LinkButton/Icon, Badge/Notice, Field+Input, Menu, Popover+TooltipCard, Card, table stack, Stat/Property/List, Avatar/InlineRef, Domain statblock stack |
| **Token-only** | Checkbox/radio/switch, toast/banner fills, modal surface roles, breadcrumbs-as-link tokens |
| **Not planned here** | Dialog, Select, Toast, Pager, Tabs, date pickers, app chrome |

## Scripts

| Command | Role |
| --- | --- |
| `npm run build` | Build core → html → react → vue |
| `npm run storybook` | Generate llms + Storybook |
| `npm run generate:llms` | Refresh `llms.txt` / `llms-full.txt` |
| `npm run lint:css` | Token / Tier 3 Stylelint |
| `npm run contrast` | Dual-canvas WCAG contrast |
| `npm run test` | Binding contract tests |
| `npm run ci` | build + lint + contrast + test + llms |
