# Migrating to 0.12.0 — frontend gap resolution

Maps every item of the frontend briefing ("Frontend-to-Design-System Briefing", baseline `^0.11.0`) to what `@eevenkoto/* ^0.12.0` ships. The DS took the *needs* from the briefing and decided shape, naming and layer itself; visual specifics in the briefing (colors, pixel values) were not adopted verbatim.

## Naming differences to know up front

| Briefing | DS 0.12 |
| --- | --- |
| `'teksti' \| 'srd'` | `ContentLicense = 'proprietary' \| 'open'` (map in your app) |
| `tone: 'accent' \| 'primary'` | same, on `ProgressBar` |
| `PatronGate`, `UserAccountMenu`, `PageLoadingBar`, `ConsentBanner` | `ContentGate`, `AccountMenu`, `ProgressBar`, `FloatingBanner` |
| `devFooter` / `devRole` slots | generic `footer` slot |
| `intent: 'critical'` on menu entries | `tone: 'destructive'` (existing `Menu` tone vocabulary) |
| NPC `traits` | `details` |

## Item mapping

| Item | Resolution |
| --- | --- |
| 1.1 AppShell / Sidebar | **Not shipped.** Host-app behavior. Use `--eevenkoto-z-*` and `--eevenkoto-color-depth-scrim` for stacking and the drawer scrim; `ProgressBar`, `AccountMenu`, `TableOfContents` slot into your shell. |
| 1.2 PageLoadingBar | `ProgressBar` (`active`, `tone`, `fixed`, `value`) |
| 1.3 LicenseBar | Domain `LicenseBar` (`entries`, `activeLicense`, `placement`, `separator`) |
| 1.4 UserAccountMenu | `AccountMenu` (+ `Menu` `tone="destructive"`, `footer` slot) |
| 1.5 ConsentBanner | `FloatingBanner` (`placement`, `bodyHtml`, `confirmLabel`/`confirmId`, `secondaryLink`) |
| 2.1 PatronGate | Domain `ContentGate` (`statusMessage` live line, `actions`, `footer`) |
| 2.2 TierCard + checklist | `TierCard`; `List variant="checklist"` with `ListItemProps.status` / `html` |
| 2.3 StatusBanner | Recipe: `Card layout="split"` + `titleHtml` + `headerActions` + `actions` |
| 2.4 ReadinessGrid | Recipe: sunken `Card` tiles + `StatusDot` |
| 2.5 SectionHeader | `SectionHeader` (+ `Caption variant="eyebrow" tone="accent"`) |
| 3.1a DocumentHeader | Domain `DocumentHeader`; `[data-content-license="open"]` heading accent |
| 3.1b VersionComparisonPreview | Recipe (`SegmentedControl` + sunken `Card`) |
| 3.2 AdventureMetaCard | Recipe: `Card accent="top"` + `PropertyList layout="grid" columns={4}` |
| 3.3 QuickJumpBar | `TableOfContents` (`rail` / `collapsible` / `auto`, `data-toc-target` for scrollspy) |
| 3.4 ReadAloudBox | Domain `ReadAloudBox` |
| 3.5 NpcCard / NpcCardGrid | Domain `NpcCard`, `NpcCardGrid` (`details: PropertyItem[]`) |
| 3.6 SchematicMap | Domain `MapFrame` (`svgHtml` / `src`, `scale`, `captionHtml`) |
| 3.7 Divider | `Divider` (and bare `hr` in `.eevenkoto-prose`) |
| 4.1 GeneratorCard | `Workshop layout="inline"` with `icon`/`title`/`subtitle`/`toolbar`/`footer` |
| 4.2 ChipGroup | `ChipGroup` (opaque disabled state — **no strikethrough**) |
| 4.3 Color swatch card / tray | `Swatch`, `Chip swatchColor`, tray recipe (`Disclosure` + `ChipGroup`) |
| 4.4 Disclosure | `Disclosure` (`variant`, `summaryLead`, `summaryMeta`, `emphasized`) |
| 4.5 HighlightTile / AttributeBox | `Card accent="start"` + `PropertyList layout="cards"` with `meta` |
| 4.6 WorkshopToolbar | `Workshop` `toolbar` |
| 5.x Overrides (12) | Folded into upgrades: `Menu` (destructive), `Table`/`ContentTable` (rich cells, `colSpan`, row attributes, locked rows), `PropertyList` (`meta`, layouts), `Caption` (eyebrow/accent), `Chip` (icon/swatch), `TooltipCard`/`EntityPreview` (`flush`, `bodyHtml`), `Notice` (`statusText`, inherited colour), `Card`, `Field` (horizontal, `action`), `Workshop`, `Statblock`/`StatblockSection`/`Spellblock` (`nameLevel`, ids, outline) |

## Upgrade steps

1. Bump all `@eevenkoto/*` packages to `^0.12.0` together (they are version-locked).
2. Import component sheets you use, e.g. `import '@eevenkoto/css/tier-card.css'`.
3. Replace local components with the DS ones per the table; delete local CSS that duplicated them (progress bar, copyright bar, consent banner, gate card, tier cards, disclosure, chip groups, etc.).
4. Map `teksti`/`srd` to `proprietary`/`open` at your app boundary.
5. Keep client behavior in the app: sidebar/drawer, scrollspy (update `aria-current="location"` on `[data-toc-target]`), consent persistence, tier checks, and swatch selection state.
6. Prose renderers (`eevenkoto_teksti/build.js`, workshop preview renderers) can keep emitting HTML strings: every prose-bearing component accepts `*Html` via `@eevenkoto/html` (`renderX`), and `sanitizeInlineHtml` is applied where inline HTML is accepted.

## Breaking-change notes

None intended. `EquipmentWorkshop` now emits both `eevenkoto-workshop__*` and `eevenkoto-equipment-workshop__*` element classes; selectors targeting the old classes still match. The plain-cell markup contract of `Table` (no `eevenkoto-table-cell` base class under `.eevenkoto-table`) is unchanged.
