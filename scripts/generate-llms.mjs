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
  { title: '@eevenkoto/astro', path: 'packages/astro/README.md', kind: 'md' },
  { title: '@eevenkoto/html', path: 'packages/html/README.md', kind: 'md' },
  { title: '@eevenkoto/core', path: 'packages/core/README.md', kind: 'md' },
  { title: 'Packages', path: 'apps/storybook/src/foundations/packages.mdx', kind: 'mdx' },
  { title: 'Tokens', path: 'apps/storybook/src/tokens/Tokens.mdx', kind: 'mdx' },
  { title: 'Typography', path: 'apps/storybook/src/foundations/typography.mdx', kind: 'mdx' },
  {
    title: 'Upgrading & Consumer Migration Guide',
    path: 'docs/migration-token-architecture-and-a11y.md',
    kind: 'md',
  },
  {
    title: 'Migrating to 0.12 — Frontend Gap Resolution',
    path: 'docs/migration-0.12-frontend-gap-resolution.md',
    kind: 'md',
  },
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
  {
    title: 'Class entry recipe',
    path: 'apps/storybook/src/foundations/class-entry-recipe.mdx',
    kind: 'mdx',
  },
  {
    title: 'Composition recipes',
    path: 'apps/storybook/src/foundations/composition-recipes.mdx',
    kind: 'mdx',
  },
];

const SKIP_COMPONENT_MDX = new Set(['TypographySample.mdx']);

function htmlInlineToMarkdown(fragment) {
  const codeSpans = [];
  const withProtectedCode = fragment
    .replace(/\{\s*['"`]([\s\S]*?)['"`]\s*\}/g, '$1')
    .replace(/<code>([\s\S]*?)<\/code>/gi, (_m, inner) => {
      const decoded = inner
        .replace(/\{\s*['"`]([\s\S]*?)['"`]\s*\}/g, '$1')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .trim();
      const token = `\u0000ICODE_${codeSpans.length}\u0000`;
      codeSpans.push(`\`${decoded}\``);
      return token;
    });

  return withProtectedCode
    .replace(/<a\s+[^>]*href=['"]([^'"]+)['"][^>]*>([\s\S]*?)<\/a>/gi, (_m, href, text) => {
      const cleanText = text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      return `[${cleanText}](${href})`;
    })
    .replace(/<(?:strong|b)>([\s\S]*?)<\/(?:strong|b)>/gi, '**$1**')
    .replace(/<(?:em|i)>([\s\S]*?)<\/(?:em|i)>/gi, '*$1*')
    .replace(/<li>([\s\S]*?)<\/li>/gi, (_m, item) => `${item.trim()} `)
    .replace(/<\/?[A-Za-z][^>]*>/g, '')
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&lsquo;|&rsquo;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/\{[^{}]*\}/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\u0000ICODE_(\d+)\u0000/g, (_m, idx) => codeSpans[Number(idx)])
    .trim();
}

function findBalancedBrace(str, openIdx) {
  let depth = 0;
  let inTag = false;
  let quote = '';
  for (let i = openIdx; i < str.length; i++) {
    const ch = str[i];
    if (quote) {
      if (ch === '\\') i++;
      else if (ch === quote) quote = '';
      continue;
    }
    if (ch === '<' && /[A-Za-z/]/.test(str[i + 1] || '')) {
      inTag = true;
      continue;
    }
    if (inTag && ch === '>') {
      inTag = false;
      continue;
    }
    if (inTag && (ch === '"' || ch === "'" || ch === '`')) {
      quote = ch;
    } else if (ch === '{') {
      depth++;
      // Handle JS string literals inside nested JSX expressions like {'{false}'}
      const nextNonSpace = str.slice(i + 1).match(/^\s*(['"`])/);
      if (nextNonSpace && depth > 1) {
        const q = nextNonSpace[1];
        const qStart = str.indexOf(q, i + 1);
        let qEnd = qStart + 1;
        while (qEnd < str.length) {
          if (str[qEnd] === '\\') qEnd += 2;
          else if (str[qEnd] === q) break;
          else qEnd++;
        }
        if (qEnd < str.length) i = qEnd;
      }
    } else if (ch === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function findJsxTagEnd(str, startIdx) {
  let quote = '';
  for (let i = startIdx + 1; i < str.length; i++) {
    const ch = str[i];
    if (quote) {
      if (ch === '\\') i++;
      else if (ch === quote) quote = '';
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') {
      quote = ch;
    } else if (ch === '{') {
      const closeBrace = findBalancedBrace(str, i);
      if (closeBrace < 0) return -1;
      i = closeBrace;
    } else if (ch === '>') {
      return i;
    }
  }
  return -1;
}

function extractJsxProp(attrs, propName) {
  const re = new RegExp(`\\b${propName}=\\{`);
  const m = re.exec(attrs);
  if (!m) return '';
  const openIdx = m.index + m[0].length - 1;
  const closeIdx = findBalancedBrace(attrs, openIdx);
  if (closeIdx < 0) return '';
  return attrs.slice(openIdx + 1, closeIdx);
}

function stripOrConvertJsxComponents(input) {
  let out = '';
  let i = 0;
  while (i < input.length) {
    if (input[i] === '<' && /[A-Z]/.test(input[i + 1] || '')) {
      const nameMatch = input.slice(i + 1).match(/^([A-Z][\w.]*)/);
      if (nameMatch) {
        const tagName = nameMatch[1];
        const tagEnd = findJsxTagEnd(input, i);
        if (tagEnd > i) {
          const selfClosing = input[tagEnd - 1] === '/';
          const attrs = input.slice(i + 1 + tagName.length, selfClosing ? tagEnd - 1 : tagEnd);
          if (selfClosing) {
            if (tagName === 'DoDont') {
              const doHtml = htmlInlineToMarkdown(extractJsxProp(attrs, 'do'));
              const dontHtml = htmlInlineToMarkdown(extractJsxProp(attrs, 'dont'));
              const parts = [];
              if (doHtml) parts.push(`**Do:** ${doHtml}`);
              if (dontHtml) parts.push(`**Don't:** ${dontHtml}`);
              out += parts.join(' ');
            }
            i = tagEnd + 1;
            continue;
          }
          const closeTag = `</${tagName}>`;
          const closeIdx = input.indexOf(closeTag, tagEnd + 1);
          if (closeIdx >= 0) {
            const inner = input.slice(tagEnd + 1, closeIdx);
            const rendered = htmlInlineToMarkdown(inner);
            const prefix =
              tagName === 'Do'
                ? '**Do:** '
                : tagName === 'Dont'
                  ? "**Don't:** "
                  : tagName === 'Danger'
                    ? '**Danger:** '
                    : '';
            out += rendered ? `${prefix}${rendered}` : '';
            i = closeIdx + closeTag.length;
            continue;
          }
        }
      }
    }
    out += input[i];
    i++;
  }
  return out;
}

function mdxToMarkdown(source) {
  const fences = [];
  let s = source.replace(/^([ \t]*`{3,})[\s\S]*?^[ \t]*\1/gm, (block) => {
    const token = `\u0000FENCE_${fences.length}\u0000`;
    fences.push(block);
    return token;
  });
  s = s.replace(/^import\s[\s\S]*?;\s*(?:\/\/[^\n]*)?$/gm, '');
  s = s.replace(/^export\s+const\s+\w+\s*=\s*\([\s\S]*?\n\);\s*$/gm, '');
  s = s.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');

  const inlineCode = [];
  s = s.replace(/(`+)([^\n]*?)\1/g, (span) => {
    const token = `\u0000CODE_${inlineCode.length}\u0000`;
    inlineCode.push(span);
    return token;
  });

  s = stripOrConvertJsxComponents(s);
  s = s.replace(/\(\?path=\/docs\/([^)]+)\)/g, '(/?path=/docs/$1)');

  s = s.replace(/\u0000CODE_(\d+)\u0000/g, (_m, idx) => inlineCode[Number(idx)]);
  s = s.replace(/`src\/tokens\//g, '`packages/css/tokens/');
  s = s.replace(/\u0000FENCE_(\d+)\u0000/g, (_m, idx) => fences[Number(idx)]);
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
  const rawPara = body.split(/\n\n/)[0] || '';
  const inlineCode = [];
  const protectedPara = rawPara.replace(/(`+)([^\n]*?)\1/g, (span) => {
    const token = `\u0000CODE_${inlineCode.length}\u0000`;
    inlineCode.push(span);
    return token;
  });
  const cleaned = protectedPara
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\u0000CODE_(\d+)\u0000/g, (_m, idx) => inlineCode[Number(idx)])
    .trim();
  return cleaned || '';
}

function extractApiTables(md) {
  const withoutFences = md.replace(/^([ \t]*`{3,})[\s\S]*?^[ \t]*\1/gm, '');
  const blocks = [];
  let pendingHeading = '';
  let skipSubsection = false;
  let currentTable = [];

  const flushTable = () => {
    if (currentTable.length >= 2) {
      blocks.push({ heading: pendingHeading, table: currentTable.join('\n') });
    }
    currentTable = [];
  };

  for (const rawLine of withoutFences.split('\n')) {
    const line = rawLine.trimEnd();
    const h3 = line.match(/^###\s+(.+)$/);
    if (h3) {
      flushTable();
      const label = h3[1].trim();
      skipSubsection = /^(?:CSS classes|Type definitions|Public CSS override tokens)\b/i.test(label);
      pendingHeading = skipSubsection || /story args/i.test(label) ? '' : label;
      continue;
    }
    if (skipSubsection) continue;
    if (line.startsWith('|')) {
      currentTable.push(line);
    } else if (currentTable.length > 0) {
      flushTable();
      pendingHeading = '';
    }
  }
  flushTable();

  if (blocks.length === 0) return '';
  if (blocks.length === 1) return blocks[0].table;
  return blocks
    .map((b) => (b.heading ? `#### ${b.heading}\n\n${b.table}` : b.table))
    .join('\n\n');
}

function sanitizeStoryId(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function storybookDocsPath(absPath, rawMdx = '') {
  const titleMatch = rawMdx.match(/<Meta\s+title=['"]([^'"]+)['"]/);
  if (titleMatch) {
    return `/?path=/docs/${sanitizeStoryId(titleMatch[1])}--docs`;
  }
  const importMatch = rawMdx.match(/import\s+\*\s+as\s+\w+\s+from\s+['"]([^'"]+)['"]/);
  if (importMatch) {
    const storyPath = join(dirname(absPath), `${importMatch[1]}.ts`);
    if (existsSync(storyPath)) {
      const storyRaw = readFileSync(storyPath, 'utf8');
      const metaIdx = storyRaw.indexOf('const meta');
      const chunk = metaIdx >= 0 ? storyRaw.slice(metaIdx) : storyRaw;
      const storyTitle = chunk.match(/title:\s*['"]((?:Core|Domain|Foundations)\/[^'"]+)['"]/);
      if (storyTitle) {
        return `/?path=/docs/${sanitizeStoryId(storyTitle[1])}--docs`;
      }
    }
  }
  const rel = relative(join(root, 'apps/storybook/src'), absPath).replace(/\\/g, '/');
  const parts = rel.split('/');
  const base = parts.pop().replace(/\.mdx$/, '');
  if (parts.length === 0 || parts[parts.length - 1].toLowerCase() !== base.toLowerCase()) {
    parts.push(base);
  }
  return `/?path=/docs/${sanitizeStoryId(parts.join('/'))}--docs`;
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
    const rel = relative(root, abs).replace(/\\/g, '/');
    const raw = readFileSync(abs, 'utf8');
    const md = mdxToMarkdown(raw);
    const title = (md.match(/^#\s+(.+)$/m) || [])[1]?.trim() || rel;
    const why = firstMarkdownSection(md, 'Why to use');
    const when = firstMarkdownSection(md, 'When to use');
    const apiIdx = md.search(/^## API reference/im);
    let apiChunk = '';
    if (apiIdx >= 0) {
      const afterApi = md.slice(apiIdx).replace(/^##[^\n]*\n+/, '');
      const nextH2 = afterApi.search(/^##\s/m);
      apiChunk = nextH2 < 0 ? afterApi : afterApi.slice(0, nextH2);
    }
    const table = extractApiTables(apiChunk);
    const docs = storybookDocsPath(abs, raw);
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

> Framework-free tokens and components (CSS → core → html/react/vue/astro). Feed this file to an agent as a starting map. Generated ${generated} — do not edit by hand (\`npm run generate:llms\`).

## Using the system

- [llms-full.txt](/llms-full.txt): generated one-shot body (package READMEs + Tokens + Typography + Packages + Consumer Migration Guides)
- [@eevenkoto/css README](/?path=/docs/foundations-packages--docs): install narrative, theming, and consume/never rules
- [Tokens catalog](/?path=/docs/foundations-tokens--docs): live swatches, typography, spacing, motion, layering, and icons in Storybook
- [Typography](/?path=/docs/foundations-typography--docs): semantic type roles and line heights
- [Composition recipes](/?path=/docs/foundations-composition-recipes--docs): status banner, readiness legend, adventure meta card, swatch tray, version comparison

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
- [Glossary](/?path=/docs/foundations-glossary--docs)
- [Authoring composed components](/?path=/docs/foundations-authoring-composed-components--docs)
- [Minimum-class defaults](/?path=/docs/foundations-minimum-class-defaults--docs)
- [Print columns](/?path=/docs/foundations-print-columns--docs)
- [Class entry recipe](/?path=/docs/foundations-class-entry-recipe--docs)
- [Decisions](/?path=/docs/foundations-decisions--docs): product scope, vertical rhythm, token-only controls
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
