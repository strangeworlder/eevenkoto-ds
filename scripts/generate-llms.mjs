/**
 * Generate llms.txt + llms-full.txt from package READMEs and Storybook foundations MDX.
 * Writes to apps/storybook/public/ (served at /llms.txt) and repo root (workspace feed-in).
 *
 * Do not hand-edit the outputs — change the sources and re-run.
 */
import {
  mkdirSync,
  readFileSync,
  writeFileSync,
  copyFileSync,
  existsSync,
  readdirSync,
} from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicDir = join(root, 'apps/storybook/public');

const USE_SOURCES = [
  { title: '@eevenkoto/css', path: 'packages/css/README.md', kind: 'md' },
  { title: '@eevenkoto/react', path: 'packages/react/README.md', kind: 'md' },
  { title: '@eevenkoto/vue', path: 'packages/vue/README.md', kind: 'md' },
  { title: '@eevenkoto/html', path: 'packages/html/README.md', kind: 'md' },
  { title: '@eevenkoto/core', path: 'packages/core/README.md', kind: 'md' },
  { title: 'Packages', path: 'apps/storybook/src/foundations/packages.mdx', kind: 'mdx' },
  { title: 'Tokens', path: 'apps/storybook/src/tokens/Tokens.mdx', kind: 'mdx' },
  { title: 'Typography', path: 'apps/storybook/src/foundations/typography.mdx', kind: 'mdx' },
];

const AUTHOR_SOURCES = [
  {
    title: 'Color architecture',
    path: 'apps/storybook/src/foundations/color-tokens-architecture.mdx',
    kind: 'mdx',
  },
  {
    title: 'Tier 1 — Primitives',
    path: 'apps/storybook/src/foundations/color-tokens-tier1-primitives.mdx',
    kind: 'mdx',
  },
  {
    title: 'Tier 2 — Semantics',
    path: 'apps/storybook/src/foundations/color-tokens-tier2-semantics.mdx',
    kind: 'mdx',
  },
  {
    title: 'Tier 3 — Component scoping',
    path: 'apps/storybook/src/foundations/color-tokens-tier3-component-scoping.mdx',
    kind: 'mdx',
  },
  {
    title: 'Component taxonomy',
    path: 'apps/storybook/src/foundations/component-taxonomy.mdx',
    kind: 'mdx',
  },
  {
    title: 'Glossary',
    path: 'apps/storybook/src/foundations/glossary.mdx',
    kind: 'mdx',
  },
  {
    title: 'Authoring composed components',
    path: 'apps/storybook/src/foundations/authoring-composed-components.mdx',
    kind: 'mdx',
  },
  {
    title: 'Minimum-class defaults',
    path: 'apps/storybook/src/foundations/minimum-class-defaults.mdx',
    kind: 'mdx',
  },
  {
    title: 'Decisions',
    path: 'apps/storybook/src/foundations/decisions.mdx',
    kind: 'mdx',
  },
  {
    title: 'Print columns',
    path: 'apps/storybook/src/foundations/print-columns.mdx',
    kind: 'mdx',
  },
];

const SKIP_COMPONENT_MDX = new Set(['TypographySample.mdx']);

function mdxToMarkdown(source) {
  let s = source;
  s = s.replace(/^import\s[\s\S]*?;\s*$/gm, '');
  s = s.replace(/^export\s+const\s+\w+\s*=\s*\([\s\S]*?\n\);\s*$/gm, '');
  s = s.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
  s = s.replace(/<[A-Z][\w.]*(?:\s[^>]*)?\/>/g, '');
  s = s.replace(/<([A-Z][\w.]*)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/g, (_m, _tag, inner) =>
    inner
      .replace(/<\/?[A-Za-z][^>]*>/g, '')
      .replace(/\{['`]([\s\S]*?)['`]\}/g, '$1')
      .replace(/\{[^{}]+\}/g, ''),
  );
  s = s.replace(/\(\?path=\/docs\/([^)]+)\)/g, '(/?path=/docs/$1)');
  s = s.replace(/`src\/tokens\//g, '`packages/css/tokens/');
  s = s.replace(/\n{3,}/g, '\n\n').trim();
  return s;
}

function loadSection({ title, path: relPath, kind }) {
  const abs = join(root, relPath);
  if (!existsSync(abs)) {
    console.warn(`skip missing source: ${relPath}`);
    return null;
  }
  const raw = readFileSync(abs, 'utf8');
  const body = kind === 'mdx' ? mdxToMarkdown(raw) : raw.trim();
  return [`## ${title}`, '', `_Source: \`${relPath}\`_`, '', body].join('\n');
}

function walkMdx(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    if (name.isDirectory()) walkMdx(p, acc);
    else if (name.name.endsWith('.mdx')) acc.push(p);
  }
  return acc;
}

function firstMarkdownSection(md, heading) {
  const re = new RegExp(`^## ${heading}\\s*$`, 'im');
  const start = md.search(re);
  if (start < 0) return '';
  const after = md.slice(start).replace(/^##[^\n]*\n+/, '');
  const next = after.search(/^##\s/m);
  const body = (next < 0 ? after : after.slice(0, next)).trim();
  const para = body.split(/\n\n/)[0]?.replace(/\n/g, ' ').replace(/<[^>]+>/g, '').trim();
  return para || '';
}

function firstTable(md) {
  const start = md.indexOf('|');
  if (start < 0) return '';
  const chunk = md.slice(start);
  const lines = [];
  for (const line of chunk.split('\n')) {
    if (!line.startsWith('|')) break;
    lines.push(line);
    if (lines.length >= 12) break;
  }
  return lines.join('\n');
}

function storybookDocsPath(absPath) {
  const rel = relative(join(root, 'apps/storybook/src'), absPath).replace(/\\/g, '/');
  const parts = rel.split('/');
  const file = parts.pop();
  const slug = parts
    .concat(file.replace(/\.mdx$/, ''))
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-');
  return `/?path=/docs/${slug}--docs`;
}

function extractComponentIndex() {
  const dirs = [
    join(root, 'apps/storybook/src/core'),
    join(root, 'apps/storybook/src/domain'),
  ];
  const files = dirs.flatMap((d) => walkMdx(d)).filter((p) => !SKIP_COMPONENT_MDX.has(p.split(/[/\\]/).pop()));
  files.sort();
  const entries = [];
  for (const abs of files) {
    const rel = relative(root, abs);
    const raw = readFileSync(abs, 'utf8');
    const md = mdxToMarkdown(raw);
    const title = (md.match(/^#\s+(.+)$/m) || [])[1]?.trim() || rel;
    const why = firstMarkdownSection(md, 'Why to use');
    const when = firstMarkdownSection(md, 'When to use');
    const apiIdx = md.search(/^## API reference/im);
    const apiChunk = apiIdx >= 0 ? md.slice(apiIdx, apiIdx + 2500) : '';
    const table = firstTable(apiChunk);
    const docs = storybookDocsPath(abs);
    const bits = [`### ${title}`, '', `_Source: \`${rel}\` · [Storybook](${docs})_`, ''];
    if (why) bits.push(`**Why:** ${why}`, '');
    if (when) bits.push(`**When:** ${when}`, '');
    if (table) bits.push(table, '');
    entries.push(bits.join('\n'));
  }
  return entries.join('\n');
}

function existingSources(list) {
  return list.filter((s) => existsSync(join(root, s.path)));
}

function buildLlmsFull() {
  const generated = new Date().toISOString().slice(0, 10);
  const use = existingSources(USE_SOURCES);
  const author = existingSources(AUTHOR_SOURCES);
  const sourceList = [...use, ...author].map((s) => `- \`${s.path}\``).join('\n');

  const parts = [
    '# Eevenkoto Design System',
    '',
    `> Generated by \`scripts/generate-llms.mjs\` on ${generated}. Do not edit by hand — update the sources and run \`npm run generate:llms\`.`,
    '',
    'When Storybook is running, this file is also served at `/llms-full.txt`.',
    '',
    '## Sources',
    '',
    sourceList,
    '',
    '# Using the system',
    '',
    'Install packages, import CSS, prefer framework components, consume Tier 2 tokens only.',
    '',
    ...use.map(loadSection).filter(Boolean),
    '',
    '# Authoring foundations',
    '',
    'For day-to-day contributor rules see `/AGENTS.md` (or repo-root `AGENTS.md`). Deep color architecture follows.',
    '',
    ...author.map(loadSection).filter(Boolean),
    '',
    '# Component index',
    '',
    'Short Why/When plus the first API table from each Storybook MDX. Full docs stay in Storybook.',
    '',
    extractComponentIndex(),
    '',
  ];

  return parts.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

function buildLlmsTxt() {
  const generated = new Date().toISOString().slice(0, 10);
  return `# Eevenkoto Design System

> Framework-free tokens and components (CSS → core → html/react/vue). Feed this file to an agent as a starting map. Generated ${generated} — do not edit by hand (\`npm run generate:llms\`).

## Using the system

- [llms-full.txt](/llms-full.txt): generated one-shot body (package READMEs + Tokens + Typography + Packages)
- [@eevenkoto/css README](/?path=/docs/foundations-packages--docs): install narrative also in Packages docs
- [Tokens catalog](/?path=/docs/foundations-tokens--docs): live swatches in Storybook
- [Typography](/?path=/docs/foundations-typography--docs): semantic type roles

## Authoring in this repo

- [AGENTS.md](/AGENTS.md): contributor operating rules
- [llms-full.txt — Authoring foundations](/llms-full.txt): Color Tokens MDX + taxonomy (same generated file, second half)
- [Color architecture](/?path=/docs/foundations-color-tokens-architecture--docs): three-tier model
- [Tier 3 component scoping](/?path=/docs/foundations-color-tokens-tier-3-component-scoping--docs): private bridges
- [Packages](/?path=/docs/foundations-packages--docs): package roles and source-of-truth order

## Optional

- [Tier 1 — Primitives](/?path=/docs/foundations-color-tokens-tier-1-primitives--docs)
- [Tier 2 — Semantics](/?path=/docs/foundations-color-tokens-tier-2-semantics--docs)
- [Component taxonomy](/?path=/docs/foundations-component-taxonomy--docs)
- [Authoring composed components](/?path=/docs/foundations-authoring-composed-components--docs)
- [Minimum-class defaults](/?path=/docs/foundations-minimum-class-defaults--docs)
- [Decisions](/?path=/docs/foundations-decisions--docs): product scope, token-only controls
- [llms-full.txt — Component index](/llms-full.txt): Why/When + API tables per component
`;
}

function writeBoth(name, contents) {
  mkdirSync(publicDir, { recursive: true });
  const publicPath = join(publicDir, name);
  const rootPath = join(root, name);
  writeFileSync(publicPath, contents, 'utf8');
  writeFileSync(rootPath, contents, 'utf8');
  console.log(`wrote ${relative(root, publicPath)}`);
  console.log(`wrote ${relative(root, rootPath)}`);
}

const llmsFull = buildLlmsFull();
const llmsTxt = buildLlmsTxt();
writeBoth('llms-full.txt', llmsFull);
writeBoth('llms.txt', llmsTxt);

copyFileSync(join(root, 'AGENTS.md'), join(publicDir, 'AGENTS.md'));
console.log(`wrote ${relative(root, join(publicDir, 'AGENTS.md'))}`);
