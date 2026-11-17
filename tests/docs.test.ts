import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseAstro } from '@astrojs/compiler';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import * as coreRuntime from '@eevenkoto/core';
import * as htmlRuntime from '@eevenkoto/html';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

function walkFiles(dir: string, exts: string[], acc: string[] = []): string[] {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', 'dist', 'storybook-static', '.git'].includes(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(full, exts, acc);
    else if (exts.some((ext) => entry.name.endsWith(ext))) acc.push(full);
  }
  return acc;
}

function stripCssComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

function sanitizeStoryId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function slugifyHeading(rawHeading: string): string {
  return rawHeading
    .replace(/`([^`]*)`/g, '$1')
    .replace(/<[^>]+>/g, '')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

describe('Documentation, Storybook MDX & LLM feed integrity', () => {
  const docFiles = [
    join(repoRoot, 'README.md'),
    join(repoRoot, 'AGENTS.md'),
    ...walkFiles(join(repoRoot, 'docs'), ['.md']),
    ...walkFiles(join(repoRoot, 'packages'), ['.md']),
    ...walkFiles(join(repoRoot, 'apps/storybook/src'), ['.mdx']),
  ];

  it('references only exported @eevenkoto/css/*.css stylesheets in docs and stories', () => {
    const cssPkg = JSON.parse(
      readFileSync(join(repoRoot, 'packages/css/package.json'), 'utf8'),
    ) as { exports: Record<string, string> };
    const validExports = new Set(
      Object.keys(cssPkg.exports).map((key) => `@eevenkoto/css/${key.replace(/^\.\//, '')}`),
    );

    const violations: string[] = [];
    const scanFiles = [
      ...docFiles,
      ...walkFiles(join(repoRoot, 'apps/storybook/src'), ['.ts', '.tsx']),
    ];
    for (const file of scanFiles) {
      const lines = readFileSync(file, 'utf8').split('\n');
      lines.forEach((line, idx) => {
        for (const match of line.matchAll(/@eevenkoto\/css\/([a-z0-9./_-]+\.css)\b/g)) {
          const spec = match[0];
          if (!validExports.has(spec)) {
            violations.push(`${relative(repoRoot, file)}:${idx + 1}: unknown CSS export "${spec}"`);
          }
        }
      });
    }

    expect(violations).toEqual([]);
  });

  it('references only real Tier 1, Tier 2, and Tier 3 --eevenkoto-* custom properties in docs', () => {
    const allCssVars = new Set<string>();
    for (const file of walkFiles(join(repoRoot, 'packages/css'), ['.css'])) {
      const clean = stripCssComments(readFileSync(file, 'utf8'));
      for (const m of clean.matchAll(/(--_?eevenkoto-[a-z0-9-]+)\s*:/gi)) {
        allCssVars.add(m[1]);
      }
      for (const m of clean.matchAll(/var\(\s*(--_?eevenkoto-[a-z0-9-]+)\s*[,)]/gi)) {
        allCssVars.add(m[1]);
      }
    }

    // Intentional anti-pattern examples in Color Tokens author docs
    const intentionalAntiPatterns = new Set([
      '--eevenkoto-color-content-inverse',
      '--eevenkoto-button-transform',
    ]);

    const violations: string[] = [];
    for (const file of docFiles) {
      const lines = readFileSync(file, 'utf8').split('\n');
      lines.forEach((line, idx) => {
        for (const m of line.matchAll(/--_?eevenkoto-[a-z0-9-]+(?![a-z0-9-*<{])/g)) {
          const token = m[0];
          if (token.endsWith('-') || token === '--eevenkoto-color') continue;
          if (intentionalAntiPatterns.has(token)) continue;
          if (!allCssVars.has(token)) {
            violations.push(`${relative(repoRoot, file)}:${idx + 1}: unknown token "${token}"`);
          }
        }
      });
    }

    expect(violations).toEqual([]);
  });

  it('references only real .eevenkoto-* BEM classes across documentation and MDX', () => {
    const allBemClasses = new Set<string>([
      'eevenkoto-visually-hidden',
      // Default aliases emitted dynamically via template interpolation in @eevenkoto/core
      'eevenkoto-badge--subtle',
      'eevenkoto-checkbox-group--stack',
      'eevenkoto-radio-group--stack',
      'eevenkoto-segmented-control--links',
      'eevenkoto-segmented-control--radios',
    ]);
    for (const file of walkFiles(join(repoRoot, 'packages/css'), ['.css'])) {
      const clean = stripCssComments(readFileSync(file, 'utf8'));
      for (const m of clean.matchAll(/\.(eevenkoto-[a-z0-9_-]+)/gi)) {
        allBemClasses.add(m[1]);
      }
    }
    for (const file of [
      ...walkFiles(join(repoRoot, 'packages/core/src'), ['.ts']),
      ...walkFiles(join(repoRoot, 'packages/html/src'), ['.ts', '.html']),
    ]) {
      const src = readFileSync(file, 'utf8');
      for (const m of src.matchAll(/\b(eevenkoto-[a-z0-9_-]+)\b/g)) {
        if (!m[1].endsWith('-')) allBemClasses.add(m[1]);
      }
    }

    // Historical legacy classes documented solely in migration cleanup notes
    const historicalMigrationAliases = new Set([
      'eevenkoto-u-visually-hidden',
      'eevenkoto-badge--pill',
      'eevenkoto-badge--rounded',
      'eevenkoto-card--accent-top',
      'eevenkoto-card--accent-start',
      'eevenkoto-card--accent-outline',
    ]);

    const violations: string[] = [];
    for (const file of docFiles) {
      const isMigrationDoc = relative(repoRoot, file).replace(/\\/g, '/').startsWith('docs/');
      const lines = readFileSync(file, 'utf8').split('\n');
      lines.forEach((line, idx) => {
        const scrubbed = line
          .replace(/--_?eevenkoto-[a-z0-9-*-]+/g, '')
          .replace(/@eevenkoto\/[a-z0-9-]+/g, '')
          .replace(/eevenkoto-ds/g, '')
          .replace(/eevenkoto-docs-[a-z0-9_-]+/g, '')
          .replace(/stylelint-eevenkoto/g, '');
        for (const m of scrubbed.matchAll(/(?<![-\w])(eevenkoto-[a-z0-9_-]+)(?![-\w*{])/g)) {
          const cls = m[1];
          if (cls.endsWith('-')) continue;
          if (isMigrationDoc && historicalMigrationAliases.has(cls)) continue;
          if (!allBemClasses.has(cls)) {
            violations.push(`${relative(repoRoot, file)}:${idx + 1}: unknown BEM class ".${cls}"`);
          }
        }
      });
    }

    expect(violations).toEqual([]);
  });

  it('resolves every ?path=/docs/<id>#<anchor> link across docs, MDX, and llms feeds', () => {
    const docAnchorsById = new Map<string, Set<string>>();

    for (const mdxPath of walkFiles(join(repoRoot, 'apps/storybook/src'), ['.mdx'])) {
      const raw = readFileSync(mdxPath, 'utf8');
      let title = raw.match(/<Meta\s+title=['"]([^'"]+)['"]/)?.[1];
      if (!title) {
        const importRel = raw.match(/import\s+\*\s+as\s+\w+\s+from\s+['"]([^'"]+)['"]/)?.[1];
        if (importRel) {
          const storyPath = join(dirname(mdxPath), `${importRel}.ts`);
          if (existsSync(storyPath)) {
            const storyRaw = readFileSync(storyPath, 'utf8');
            const metaChunk = storyRaw.slice(Math.max(0, storyRaw.indexOf('const meta')));
            title = metaChunk.match(/title:\s*['"]([^'"]+)['"]/)?.[1];
          }
        }
      }
      if (!title) continue;

      const docId = `${sanitizeStoryId(title)}--docs`;
      const anchors = new Set<string>();
      const noFences = raw.replace(/^([ \t]*`{3,})[\s\S]*?^[ \t]*\1/gm, '');
      for (const m of noFences.matchAll(/^#{1,6}\s+(.+)$/gm)) {
        anchors.add(slugifyHeading(m[1]));
      }
      docAnchorsById.set(docId, anchors);
    }

    // Tokens.stories.ts defines autodocs page foundations-tokens--docs with custom anchor ids
    const tokensStories = readFileSync(
      join(repoRoot, 'apps/storybook/src/tokens/Tokens.stories.ts'),
      'utf8',
    );
    if (!docAnchorsById.has('foundations-tokens--docs')) {
      docAnchorsById.set('foundations-tokens--docs', new Set());
    }
    const tokenAnchors = docAnchorsById.get('foundations-tokens--docs')!;
    for (const m of tokensStories.matchAll(/\bid=["']([a-z0-9-]+)["']/gi)) {
      tokenAnchors.add(m[1]);
    }
    tokenAnchors.add('icons');

    const scanTargets = [
      ...docFiles,
      join(repoRoot, 'llms.txt'),
      join(repoRoot, 'llms-full.txt'),
    ];

    const broken: string[] = [];
    for (const file of scanTargets) {
      const lines = readFileSync(file, 'utf8').split('\n');
      lines.forEach((line, idx) => {
        for (const m of line.matchAll(/\?path=\/docs\/([a-z0-9-]+)(?:#([a-zA-Z0-9_-]+))?/g)) {
          const docId = m[1];
          const hash = m[2];
          const anchors = docAnchorsById.get(docId);
          if (!anchors) {
            broken.push(`${relative(repoRoot, file)}:${idx + 1}: unknown docs id "${docId}"`);
          } else if (hash && !anchors.has(hash)) {
            broken.push(
              `${relative(repoRoot, file)}:${idx + 1}: unknown anchor "#${hash}" on "${docId}"`,
            );
          }
        }
      });
    }

    expect(broken).toEqual([]);
  });

  it('keeps generated llms-full.txt free of JSX callout artifacts, stripped inline code tags, and Windows paths', () => {
    const llmsFull = readFileSync(join(repoRoot, 'llms-full.txt'), 'utf8');
    const publicLlmsFull = readFileSync(
      join(repoRoot, 'apps/storybook/public/llms-full.txt'),
      'utf8',
    );

    expect(llmsFull).toBe(publicLlmsFull);
    expect(llmsFull).not.toMatch(/_Source:\s*`[^`]*\\/);
    expect(llmsFull).not.toMatch(/\}\s+dont=\{/);

    const withoutFencesAndDoubleTickEscapes = llmsFull
      .replace(/^([ \t]*`{3,})[\s\S]*?^[ \t]*\1/gm, '')
      .replace(/``[^\n]*?``/g, '');
    expect([...withoutFencesAndDoubleTickEscapes.matchAll(/(?<!`)``(?!`)/g)]).toEqual([]);

    const componentMdxFiles = [
      ...walkFiles(join(repoRoot, 'apps/storybook/src/core'), ['.mdx']),
      ...walkFiles(join(repoRoot, 'apps/storybook/src/domain'), ['.mdx']),
    ].filter((f) => basename(f) !== 'TypographySample.mdx');

    const compSection = llmsFull.slice(llmsFull.indexOf('# Component index'));
    for (const mdx of componentMdxFiles) {
      const rel = relative(repoRoot, mdx).replace(/\\/g, '/');
      expect(compSection).toContain(`_Source: \`${rel}\``);
    }
    // Dual/multi-table API sections (Catalog + CatalogTile, Menu entry kinds + Menu props) must retain all tables
    expect(compSection).toContain('#### CatalogTile');
    expect(compSection).toContain('| `lockedLabel` |');
    expect(compSection).toContain('| `embedded` |');
  });

  const componentMdxFiles = [
    ...walkFiles(join(repoRoot, 'apps/storybook/src/core'), ['.mdx']),
    ...walkFiles(join(repoRoot, 'apps/storybook/src/domain'), ['.mdx']),
  ].filter((f) => basename(f) !== 'TypographySample.mdx');

  it('documents HTML, React, Vue, and Astro framework packages across all 71 MDX pages and all 73 exported components', () => {
    expect(componentMdxFiles.length).toBe(71);
    const violations: string[] = [];
    const htmlUsed = new Set<string>();
    const reactUsed = new Set<string>();
    const vueUsed = new Set<string>();
    const astroUsed = new Set<string>();

    for (const mdx of componentMdxFiles) {
      const rel = relative(repoRoot, mdx).replace(/\\/g, '/');
      const raw = readFileSync(mdx, 'utf8');

      if (!/<ArgTypes\b/.test(raw)) {
        violations.push(`${rel}: missing <ArgTypes> block`);
      }

      const fwMatch = raw.match(/## Framework packages\r?\n([\s\S]*?)(?=\r?\n##\s+|$)/);
      if (!fwMatch) {
        violations.push(`${rel}: missing "## Framework packages" section`);
        continue;
      }

      const fwBody = fwMatch[1];
      if (!/@eevenkoto\/html['"]/.test(fwBody)) {
        violations.push(`${rel}: Framework packages omits @eevenkoto/html snippet`);
      }
      if (!/@eevenkoto\/react['"]/.test(fwBody)) {
        violations.push(`${rel}: Framework packages omits @eevenkoto/react snippet`);
      }
      if (!/```vue\b[\s\S]*?@eevenkoto\/vue['"][\s\S]*?```/.test(fwBody)) {
        violations.push(`${rel}: Framework packages omits vue snippet importing @eevenkoto/vue`);
      }
      if (!/```astro\b[\s\S]*?@eevenkoto\/astro(?:\/[^'"]+)?['"][\s\S]*?```/.test(fwBody)) {
        violations.push(`${rel}: Framework packages omits astro snippet importing @eevenkoto/astro`);
      }

      for (const m of fwBody.matchAll(/\brender([A-Z]\w+)\b/g)) htmlUsed.add(m[1]);
      for (const m of fwBody.matchAll(/import\s+\{([^}]+)\}\s+from\s+['"]@eevenkoto\/(react|vue|astro)['"]/g)) {
        const targetSet = m[2] === 'react' ? reactUsed : m[2] === 'vue' ? vueUsed : astroUsed;
        for (const rawSpec of m[1].split(',')) {
          const clean = rawSpec.trim().replace(/^type\s+/, '').split(/\s+as\s+/)[0].trim();
          if (/^[A-Z]/.test(clean) && !clean.endsWith('Props') && !clean.endsWith('Column') && !clean.endsWith('Entry')) {
            targetSet.add(clean);
          }
        }
      }
      for (const m of fwBody.matchAll(/from\s+['"]@eevenkoto\/astro\/(\w+)\.astro['"]/g)) {
        astroUsed.add(m[1]);
      }
    }

    const astroIndexJs = readFileSync(join(repoRoot, 'packages/astro/src/index.js'), 'utf8');
    const all73Components = [
      ...astroIndexJs.matchAll(/export\s+\{\s*default\s+as\s+(\w+)\s*\}/g),
    ].map((m) => m[1]);
    expect(all73Components.length).toBe(73);

    for (const comp of all73Components) {
      if (!htmlUsed.has(comp)) violations.push(`Framework packages omit render${comp} (@eevenkoto/html)`);
      if (!reactUsed.has(comp)) violations.push(`Framework packages omit ${comp} (@eevenkoto/react)`);
      if (!vueUsed.has(comp)) violations.push(`Framework packages omit ${comp} (@eevenkoto/vue)`);
      if (!astroUsed.has(comp)) violations.push(`Framework packages omit ${comp} (@eevenkoto/astro)`);
    }

    expect(violations).toEqual([]);
  });

  it('keeps Storybook *.stories.ts argTypes in 100% parity with both @eevenkoto/core *Props and @eevenkoto/html render* props across all 71 stories', () => {
    const coreIndex = join(repoRoot, 'packages/core/src/index.ts');
    const htmlIndex = join(repoRoot, 'packages/html/src/index.ts');
    const prog = ts.createProgram([coreIndex, htmlIndex], {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      strict: true,
      skipLibCheck: true,
    });
    const checker = prog.getTypeChecker();
    const coreSf = prog.getSourceFile(coreIndex)!;
    const coreSym = checker.getSymbolAtLocation(coreSf)!;
    const coreExports = new Map(
      checker.getExportsOfModule(coreSym).map((sym) => [sym.getName(), sym]),
    );
    const htmlSf = prog.getSourceFile(htmlIndex)!;
    const htmlExports = new Map(
      checker.getExportsOfModule(checker.getSymbolAtLocation(htmlSf)!).map((sym) => [sym.getName(), sym]),
    );

    const storyFiles = [
      ...walkFiles(join(repoRoot, 'apps/storybook/src/core'), ['.stories.ts']),
      ...walkFiles(join(repoRoot, 'apps/storybook/src/domain'), ['.stories.ts']),
    ].filter((f) => basename(f) !== 'TypographySample.stories.ts');

    expect(storyFiles.length).toBe(71);
    const violations: string[] = [];

    for (const storyPath of storyFiles) {
      const rel = relative(repoRoot, storyPath).replace(/\\/g, '/');
      const compName = basename(storyPath, '.stories.ts');
      const propsSym = coreExports.get(`${compName}Props`);
      const coreKeys = propsSym
        ? checker
            .getDeclaredTypeOfSymbol(propsSym)
            .getProperties()
            .map((p) => p.getName())
        : [];

      const renderSym = htmlExports.get(`render${compName}`);
      const htmlKeys: string[] = [];
      if (renderSym) {
        const decl = renderSym.valueDeclaration ?? renderSym.declarations?.[0];
        if (decl) {
          const sigs = checker.getTypeOfSymbolAtLocation(renderSym, decl).getCallSignatures();
          if (sigs.length > 0 && sigs[0].parameters.length > 0) {
            const pSym = sigs[0].parameters[0];
            const pType = checker.getNonNullableType(
              checker.getTypeOfSymbolAtLocation(pSym, pSym.valueDeclaration ?? sigs[0].declaration!),
            );
            htmlKeys.push(...pType.getProperties().map((p) => p.getName()));
          }
        }
      }

      const expectedKeys = [...new Set([...coreKeys, ...htmlKeys])];

      const raw = readFileSync(storyPath, 'utf8');
      const sf = ts.createSourceFile(storyPath, raw, ts.ScriptTarget.ES2022, true, ts.ScriptKind.TS);
      const argTypeKeys = new Set<string>();

      const visit = (node: ts.Node) => {
        if (
          ts.isPropertyAssignment(node) &&
          node.name.getText(sf) === 'argTypes' &&
          ts.isObjectLiteralExpression(node.initializer)
        ) {
          for (const prop of node.initializer.properties) {
            if (ts.isPropertyAssignment(prop) || ts.isShorthandPropertyAssignment(prop)) {
              argTypeKeys.add(prop.name.getText(sf).replace(/^['"]|['"]$/g, ''));
            }
          }
        }
        ts.forEachChild(node, visit);
      };
      visit(sf);

      if (expectedKeys.length > 0 && argTypeKeys.size === 0) {
        violations.push(`${rel}: missing argTypes object for ${compName}Props`);
        continue;
      }

      for (const key of expectedKeys) {
        if (!argTypeKeys.has(key)) {
          violations.push(`${rel}: argTypes omits ${compName} prop "${key}"`);
        }
      }
    }

    expect(violations).toEqual([]);
  });

  it('documents 100% of each component stylesheet own Tier 3 public --eevenkoto-<component>-* custom properties in MDX', () => {
    const compToCssAndPrefixes: Record<string, { cssRel: string; prefixes: string[] }> = {
      Property: { cssRel: 'core/atoms/property.css', prefixes: ['--eevenkoto-property-'] },
      PropertyList: {
        cssRel: 'core/atoms/property.css',
        prefixes: ['--eevenkoto-property-', '--eevenkoto-property-list-'],
      },
      AbilityScore: {
        cssRel: 'domain/molecules/ability-score.css',
        prefixes: ['--eevenkoto-ability-score-'],
      },
      AbilityScoreGroup: {
        cssRel: 'domain/molecules/ability-score.css',
        prefixes: ['--eevenkoto-ability-score-group-'],
      },
      TableOfContents: {
        cssRel: 'core/molecules/table-of-contents.css',
        prefixes: ['--eevenkoto-toc-'],
      },
      List: { cssRel: 'core/atoms/list.css', prefixes: ['--eevenkoto-list-'] },
    };

    const toKebab = (name: string) =>
      name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

    const violations: string[] = [];

    for (const mdxPath of componentMdxFiles) {
      const rel = relative(repoRoot, mdxPath).replace(/\\/g, '/');
      const compName = basename(mdxPath, '.mdx');
      const relParts = rel.split('/'); // apps/storybook/src/<layer>/<tier>/<Comp>/<Comp>.mdx
      const layer = relParts[3];
      const tier = relParts[4];
      const kebab = toKebab(compName);

      const mapping = compToCssAndPrefixes[compName] ?? {
        cssRel: `${layer}/${tier}/${kebab}.css`,
        prefixes: [`--eevenkoto-${kebab}-`],
      };

      const cssPath = join(repoRoot, 'packages/css', mapping.cssRel);
      if (!existsSync(cssPath)) {
        violations.push(`${rel}: expected stylesheet missing at packages/css/${mapping.cssRel}`);
        continue;
      }

      const cssClean = stripCssComments(readFileSync(cssPath, 'utf8'));
      const mdxRaw = readFileSync(mdxPath, 'utf8');

      // Public Tier 3 override hooks are read via var(--eevenkoto-<prefix>*, fallback)
      const publicVars = new Set<string>();
      for (const m of cssClean.matchAll(/var\(\s*(--eevenkoto-[a-z0-9-]+)\s*,/gi)) {
        const token = m[1];
        const matchesOwnPrefix = mapping.prefixes.some((prefix) => {
          if (!token.startsWith(prefix)) return false;
          // Exclude --eevenkoto-property-list-* when checking Property alone, and --eevenkoto-ability-score-group-* when checking AbilityScore alone
          if (compName === 'Property' && token.startsWith('--eevenkoto-property-list-')) {
            return false;
          }
          if (compName === 'AbilityScore' && token.startsWith('--eevenkoto-ability-score-group-')) {
            return false;
          }
          return true;
        });
        if (matchesOwnPrefix) publicVars.add(token);
      }

      for (const token of publicVars) {
        if (!mdxRaw.includes(token)) {
          violations.push(`${rel}: omits public CSS override token "${token}"`);
        }
      }

      // Also verify 1-to-1 accuracy of documented default/modifier tokens in ### Public CSS override tokens
      const defaults = new Map<string, Set<string>>();
      const allVals = new Map<string, Set<string>>();
      const addVal = (map: Map<string, Set<string>>, tok: string, val: string) => {
        if (!map.has(tok)) map.set(tok, new Set());
        map.get(tok)!.add(val.replace(/\s+/g, ' ').trim());
      };
      const varRe = /var\(\s*(--eevenkoto-[a-z0-9-]+)\s*,/gi;
      let vm: RegExpExecArray | null;
      while ((vm = varRe.exec(cssClean)) !== null) {
        const tok = vm[1];
        let depth = 1;
        let idx = vm.index + vm[0].length;
        while (idx < cssClean.length && depth > 0) {
          if (cssClean[idx] === '(') depth++;
          else if (cssClean[idx] === ')') depth--;
          idx++;
        }
        const fb = cssClean.slice(vm.index + vm[0].length, idx - 1);
        addVal(defaults, tok, fb);
        addVal(allVals, tok, fb);
      }
      for (const am of cssClean.matchAll(/(--eevenkoto-[a-z0-9-]+)\s*:\s*([^;]+);/gi)) {
        addVal(allVals, am[1], am[2]);
      }

      const tokenSec = mdxRaw.match(
        /### Public CSS override tokens\r?\n([\s\S]*?)(?=\r?\n#{2,3}\s+|$)/,
      )?.[1];
      if (tokenSec) {
        for (const line of tokenSec.split(/\r?\n/)) {
          if (!line.trim().startsWith('|') || line.includes('---')) continue;
          const cells = line
            .split('|')
            .slice(1, -1)
            .map((c) => c.trim());
          const rowTokens = [...cells[0].matchAll(/`(--eevenkoto-[a-z0-9-]+)`/g)].map((m) => m[1]);
          if (rowTokens.length === 0) continue;

          const hostDefaults = rowTokens
            .map((t) => [...(defaults.get(t) ?? [])].join(' | '))
            .join(' || ');
          const allPossible = rowTokens
            .map((t) => [...(allVals.get(t) ?? [])].join(' | '))
            .join(' || ');

          for (const cell of cells.slice(1)) {
            const mentionsModifierOrScale =
              /`--[a-z0-9-]+`|\bwhen\b|\bin\b|\bon\b|\bor\b|\bby\b|\//i.test(cell);
            const targetStr = mentionsModifierOrScale ? allPossible : hostDefaults;
            for (const bm of cell.matchAll(/`([^`]+)`/g)) {
              const ref = bm[1].trim();
              if (ref.startsWith('--') || ref.startsWith('<') || ref.startsWith('.')) continue;
              if (
                /^(?:font|space|radius|line-width|font-size|font-weight|line-height|duration|ease|z|surface|content|boundary|depth|control|feedback|form-input|link)-[a-z0-9*-]+$/.test(
                  ref,
                ) ||
                /^\d+(?:\.\d+)?(?:rem|px|em|%|ch|ms|s)$/.test(ref)
              ) {
                if (ref.includes('*')) {
                  const re = new RegExp(ref.replace(/\*/g, '[a-z0-9-]+'));
                  if (!re.test(allPossible)) {
                    violations.push(
                      `${rel}: Public CSS override token [${rowTokens.join(', ')}] claims \`${ref}\`, CSS has "${allPossible}"`,
                    );
                  }
                } else if (!targetStr.includes(ref)) {
                  violations.push(
                    `${rel}: Public CSS override token [${rowTokens.join(', ')}] claims \`${ref}\`, CSS host default has "${hostDefaults}"`,
                  );
                }
              }
            }
          }
        }
      }
    }

    expect(violations).toEqual([]);
  });

  it('includes host and companion @eevenkoto/css/*.css imports across stories and Framework packages snippets', () => {
    const cssPkg = JSON.parse(
      readFileSync(join(repoRoot, 'packages/css/package.json'), 'utf8'),
    ) as { exports: Record<string, string> };

    const cssExportToFile = new Map<string, string>();
    const cssFileToExport = new Map<string, string>();
    for (const [expKey, relTarget] of Object.entries(cssPkg.exports)) {
      const spec = `@eevenkoto/css/${expKey.replace(/^\.\//, '')}`;
      const full = resolve(repoRoot, 'packages/css', relTarget);
      cssExportToFile.set(spec, full);
      cssFileToExport.set(full, spec);
    }

    const getTransitiveCss = (specs: string[]): Set<string> => {
      const visited = new Set<string>();
      const visit = (spec: string) => {
        if (visited.has(spec)) return;
        visited.add(spec);
        if (spec === '@eevenkoto/css/all.css') {
          for (const k of cssExportToFile.keys()) visited.add(k);
          return;
        }
        const file = cssExportToFile.get(spec);
        if (!file || !existsSync(file)) return;
        const raw = readFileSync(file, 'utf8');
        for (const m of raw.matchAll(/@import\s+(?:url\()?['"]([^'"]+)['"]\)?/g)) {
          const target = resolve(dirname(file), m[1]);
          const childSpec = cssFileToExport.get(target);
          if (childSpec) visit(childSpec);
        }
      };
      for (const s of specs) visit(s);
      return visited;
    };

    const compHostCss: Record<string, string> = {
      Avatar: '@eevenkoto/css/avatar.css',
      Badge: '@eevenkoto/css/badge.css',
      Button: '@eevenkoto/css/button.css',
      Caption: '@eevenkoto/css/caption.css',
      Checkbox: '@eevenkoto/css/checkbox.css',
      Chip: '@eevenkoto/css/chip.css',
      Divider: '@eevenkoto/css/divider.css',
      Frame: '@eevenkoto/css/frame.css',
      Heading: '@eevenkoto/css/heading.css',
      Icon: '@eevenkoto/css/icon.css',
      Image: '@eevenkoto/css/image.css',
      InlineRef: '@eevenkoto/css/inline-ref.css',
      Input: '@eevenkoto/css/input.css',
      LinkButton: '@eevenkoto/css/link-button.css',
      ListItem: '@eevenkoto/css/list.css',
      Paragraph: '@eevenkoto/css/paragraph.css',
      Popover: '@eevenkoto/css/popover.css',
      ProgressBar: '@eevenkoto/css/progress-bar.css',
      Property: '@eevenkoto/css/property.css',
      Radio: '@eevenkoto/css/radio.css',
      Scroll: '@eevenkoto/css/scroll.css',
      Select: '@eevenkoto/css/select.css',
      Stat: '@eevenkoto/css/stat.css',
      StatusDot: '@eevenkoto/css/status-dot.css',
      Swatch: '@eevenkoto/css/swatch.css',
      TableCell: '@eevenkoto/css/table-cell.css',
      Toast: '@eevenkoto/css/toast.css',
      Card: '@eevenkoto/css/card.css',
      Catalog: '@eevenkoto/css/catalog.css',
      CatalogTile: '@eevenkoto/css/catalog.css',
      CheckboxGroup: '@eevenkoto/css/checkbox-group.css',
      ChipGroup: '@eevenkoto/css/chip-group.css',
      Disclosure: '@eevenkoto/css/disclosure.css',
      Field: '@eevenkoto/css/field.css',
      FloatingBanner: '@eevenkoto/css/floating-banner.css',
      Flow: '@eevenkoto/css/flow.css',
      List: '@eevenkoto/css/list.css',
      Menu: '@eevenkoto/css/menu.css',
      Notice: '@eevenkoto/css/notice.css',
      PropertyList: '@eevenkoto/css/property.css',
      Prose: '@eevenkoto/css/prose.css',
      RadioGroup: '@eevenkoto/css/radio-group.css',
      SectionHeader: '@eevenkoto/css/section-header.css',
      SegmentedControl: '@eevenkoto/css/segmented-control.css',
      Stepper: '@eevenkoto/css/stepper.css',
      Table: '@eevenkoto/css/table.css',
      TableOfContents: '@eevenkoto/css/table-of-contents.css',
      TooltipCard: '@eevenkoto/css/tooltip-card.css',
      AccountMenu: '@eevenkoto/css/account-menu.css',
      TableShell: '@eevenkoto/css/table-shell.css',
      TierCard: '@eevenkoto/css/tier-card.css',
      Workshop: '@eevenkoto/css/workshop.css',
      AbilityName: '@eevenkoto/css/ability-name.css',
      EntityRef: '@eevenkoto/css/entity-ref.css',
      AbilityScore: '@eevenkoto/css/ability-score.css',
      ContentTable: '@eevenkoto/css/content-table.css',
      DocumentHeader: '@eevenkoto/css/document-header.css',
      EntityPreview: '@eevenkoto/css/entity-preview.css',
      LicenseBar: '@eevenkoto/css/license-bar.css',
      MapFrame: '@eevenkoto/css/map-frame.css',
      NpcCard: '@eevenkoto/css/npc-card.css',
      ReadAloudBox: '@eevenkoto/css/read-aloud-box.css',
      StatblockFeature: '@eevenkoto/css/statblock-feature.css',
      StatblockSection: '@eevenkoto/css/statblock-section.css',
      AbilityScoreGroup: '@eevenkoto/css/ability-score.css',
      ContentGate: '@eevenkoto/css/content-gate.css',
      EquipmentBlock: '@eevenkoto/css/equipment-block.css',
      EquipmentWorkshop: '@eevenkoto/css/equipment-workshop.css',
      NpcCardGrid: '@eevenkoto/css/npc-card-grid.css',
      Spellblock: '@eevenkoto/css/spellblock.css',
      Statblock: '@eevenkoto/css/statblock.css',
    };

    const mandatoryCompanions: Record<string, string[]> = {
      Select: ['@eevenkoto/css/icon.css'],
      Stepper: ['@eevenkoto/css/button.css'],
      CheckboxGroup: ['@eevenkoto/css/checkbox.css'],
      RadioGroup: ['@eevenkoto/css/radio.css'],
      AbilityScore: ['@eevenkoto/css/stat.css'],
      AbilityScoreGroup: ['@eevenkoto/css/stat.css'],
      StatblockFeature: ['@eevenkoto/css/heading.css', '@eevenkoto/css/paragraph.css'],
      StatblockSection: [
        '@eevenkoto/css/heading.css',
        '@eevenkoto/css/paragraph.css',
        '@eevenkoto/css/statblock-feature.css',
      ],
      EquipmentBlock: ['@eevenkoto/css/heading.css'],
      Spellblock: ['@eevenkoto/css/heading.css', '@eevenkoto/css/property.css'],
      Statblock: ['@eevenkoto/css/heading.css'],
    };

    const checkCssCoverage = (loc: string, code: string, requireCss: boolean): string[] => {
      const found: string[] = [];
      const rawImports = [...code.matchAll(/['"](@eevenkoto\/css\/[^'"]+\.css)['"]/g)].map(
        (m) => m[1],
      );
      if (rawImports.length === 0 && !requireCss) return found;

      const usedComps = new Set<string>();
      for (const m of code.matchAll(
        /import\s+\{([^}]+)\}\s+from\s+['"]@eevenkoto\/(html|react|vue|astro)['"]/g,
      )) {
        const pkg = m[2];
        for (const rawSpec of m[1].split(',')) {
          const spec = rawSpec.trim().replace(/^type\s+/, '').split(/\s+as\s+/)[0].trim();
          if (!spec) continue;
          if (pkg === 'html' && spec.startsWith('render')) {
            const comp = spec.slice(6);
            if (compHostCss[comp]) usedComps.add(comp);
          } else if (compHostCss[spec]) {
            usedComps.add(spec);
          }
        }
      }
      for (const m of code.matchAll(/from\s+['"]@eevenkoto\/astro\/(\w+)\.astro['"]/g)) {
        if (compHostCss[m[1]]) usedComps.add(m[1]);
      }

      if (usedComps.size === 0) return found;
      const covered = getTransitiveCss(rawImports);

      for (const comp of usedComps) {
        if (!covered.has(compHostCss[comp])) {
          found.push(`${loc}: uses ${comp} without importing ${compHostCss[comp]}`);
        }
        for (const companion of mandatoryCompanions[comp] ?? []) {
          if (!covered.has(companion)) {
            found.push(`${loc}: uses ${comp} without mandatory companion ${companion}`);
          }
        }
        if (
          (comp === 'Button' || comp === 'LinkButton') &&
          /\bicon\s*[:=]/.test(code) &&
          !covered.has('@eevenkoto/css/icon.css')
        ) {
          found.push(`${loc}: uses ${comp} with icon without @eevenkoto/css/icon.css`);
        }
        if (
          comp === 'Input' &&
          (/\bicon\s*[:=]/.test(code) || /['"]search['"]/.test(code)) &&
          !covered.has('@eevenkoto/css/icon.css')
        ) {
          found.push(`${loc}: uses Input icon/search without @eevenkoto/css/icon.css`);
        }
        if (
          (comp === 'Notice' || comp === 'Toast') &&
          !/icon\s*[:=]\s*\{?\s*false/.test(code) &&
          !covered.has('@eevenkoto/css/icon.css')
        ) {
          found.push(`${loc}: uses ${comp} (default icon) without @eevenkoto/css/icon.css`);
        }
        if (
          comp === 'Avatar' &&
          !/\bsrc\s*[:=]/.test(code) &&
          !covered.has('@eevenkoto/css/icon.css')
        ) {
          found.push(`${loc}: uses Avatar fallback without @eevenkoto/css/icon.css`);
        }
        if (
          comp === 'SegmentedControl' &&
          /\bicon\s*:/.test(code) &&
          !covered.has('@eevenkoto/css/icon.css')
        ) {
          found.push(`${loc}: uses SegmentedControl option icon without @eevenkoto/css/icon.css`);
        }
        if (
          ['Checkbox', 'Radio', 'CheckboxGroup', 'RadioGroup'].includes(comp) &&
          /\bbadge\s*[:=]/.test(code) &&
          !covered.has('@eevenkoto/css/badge.css')
        ) {
          found.push(`${loc}: uses ${comp} badge without @eevenkoto/css/badge.css`);
        }
        if (
          comp === 'Image' &&
          (/\bcaption\s*[:=]/.test(code) || /#caption|slot=["']caption["']/.test(code)) &&
          !covered.has('@eevenkoto/css/caption.css')
        ) {
          found.push(`${loc}: uses Image caption without @eevenkoto/css/caption.css`);
        }
        if (
          comp === 'EntityPreview' &&
          /\bfooterLink|footer-link/.test(code) &&
          !covered.has('@eevenkoto/css/link-button.css')
        ) {
          found.push(`${loc}: uses EntityPreview footerLink without @eevenkoto/css/link-button.css`);
        }
        if (
          comp === 'ContentGate' &&
          /\bctaHref|cta-href/.test(code) &&
          !covered.has('@eevenkoto/css/link-button.css')
        ) {
          found.push(`${loc}: uses ContentGate ctaHref without @eevenkoto/css/link-button.css`);
        }
        if (
          comp === 'TableShell' &&
          !/\bframe\s*[:=]\s*\{?\s*false/.test(code) &&
          !covered.has('@eevenkoto/css/frame.css')
        ) {
          found.push(`${loc}: uses TableShell frame without @eevenkoto/css/frame.css`);
        }
        if (
          comp === 'TableShell' &&
          !/\bscroll\s*[:=]\s*\{?\s*false/.test(code) &&
          !covered.has('@eevenkoto/css/scroll.css')
        ) {
          found.push(`${loc}: uses TableShell scroll without @eevenkoto/css/scroll.css`);
        }
      }
      return found;
    };

    const violations: string[] = [];

    for (const file of docFiles) {
      if (basename(file) === 'AGENTS.md') continue;
      const rel = relative(repoRoot, file).replace(/\\/g, '/');
      const lines = readFileSync(file, 'utf8').split('\n');
      let h2 = '';
      let inFence = false;
      let marker = '';
      let lang = '';
      let start = 0;
      let buf: string[] = [];

      lines.forEach((line, idx) => {
        if (!inFence) {
          const hm = line.match(/^##\s+(.+)$/);
          if (hm) h2 = hm[1].trim();
          const fm = line.match(/^([ \t]*`{3,})([\w-]*)/);
          if (fm) {
            inFence = true;
            marker = fm[1].trim();
            lang = fm[2].trim().toLowerCase();
            start = idx + 1;
            buf = [];
          }
        } else if (new RegExp(`^[ \\t]*${marker}\\s*$`).test(line)) {
          inFence = false;
          if (['ts', 'tsx', 'js', 'jsx', 'vue', 'astro'].includes(lang)) {
            violations.push(
              ...checkCssCoverage(`${rel}:${start}`, buf.join('\n'), h2 === 'Framework packages'),
            );
          }
        } else {
          buf.push(line);
        }
      });
    }

    const storyFiles = [
      ...walkFiles(join(repoRoot, 'apps/storybook/src/core'), ['.stories.ts']),
      ...walkFiles(join(repoRoot, 'apps/storybook/src/domain'), ['.stories.ts']),
    ].filter((f) => basename(f) !== 'TypographySample.stories.ts');

    const hostBlockToSpec = new Map<string, string>();
    for (const [spec, full] of cssExportToFile) {
      if (
        [
          '@eevenkoto/css/all.css',
          '@eevenkoto/css/styles.css',
          '@eevenkoto/css/tokens.css',
          '@eevenkoto/css/primitive-tokens.css',
        ].includes(spec)
      ) {
        continue;
      }
      const base = basename(full, '.css');
      if (base === 'table-of-contents') hostBlockToSpec.set('eevenkoto-toc', spec);
      else hostBlockToSpec.set(`eevenkoto-${base}`, spec);
    }
    hostBlockToSpec.set('eevenkoto-list-item', '@eevenkoto/css/list.css');
    hostBlockToSpec.set('eevenkoto-property-list', '@eevenkoto/css/property.css');
    hostBlockToSpec.set('eevenkoto-catalog-tile', '@eevenkoto/css/catalog.css');
    hostBlockToSpec.set('eevenkoto-ability-score-group', '@eevenkoto/css/ability-score.css');

    const prevDoc = (globalThis as Record<string, unknown>).document;
    (globalThis as Record<string, unknown>).document = {
      createElement: () => ({
        innerHTML: '',
        querySelector: () => null,
        querySelectorAll: () => [],
        addEventListener: () => {},
      }),
      body: { innerHTML: '' },
    };

    try {
      for (const sf of storyFiles) {
        const rel = relative(repoRoot, sf).replace(/\\/g, '/');
        const raw = readFileSync(sf, 'utf8');
        violations.push(...checkCssCoverage(rel, raw, true));

        // Execute every story render(args) and verify every emitted BEM block class has its CSS sheet imported!
        const cssSpecs = [...raw.matchAll(/['"](@eevenkoto\/css\/[^'"]+\.css)['"]/g)].map(
          (m) => m[1],
        );
        const coveredSpecs = getTransitiveCss(cssSpecs);
        const js = ts.transpileModule(raw, {
          compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
        }).outputText;

        const modExports: Record<string, unknown> = {};
        const customRequire = (mod: string): unknown => {
          if (mod.startsWith('@eevenkoto/css/') || mod.endsWith('.css')) return {};
          if (mod === '@eevenkoto/html') return htmlRuntime;
          if (mod === '@eevenkoto/core') return coreRuntime;
          if (mod === 'storybook/test') {
            return { expect: () => ({}), userEvent: {}, within: () => ({}), fn: () => () => {} };
          }
          if (mod.startsWith('.')) {
            const target = resolve(dirname(sf), `${mod}.ts`);
            if (existsSync(target)) {
              const subJs = ts.transpileModule(readFileSync(target, 'utf8'), {
                compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
              }).outputText;
              const subExp: Record<string, unknown> = {};
              new Function('exports', 'require', subJs)(subExp, customRequire);
              return subExp;
            }
          }
          return {};
        };

        new Function('exports', 'require', js)(modExports, customRequire);
        const meta = (modExports.default ?? {}) as {
          args?: Record<string, unknown>;
          render?: (args: Record<string, unknown>) => unknown;
        };

        for (const [expName, storyVal] of Object.entries(modExports)) {
          if (expName === 'default' || !storyVal || typeof storyVal !== 'object') continue;
          const story = storyVal as {
            args?: Record<string, unknown>;
            render?: (args: Record<string, unknown>) => unknown;
          };
          const renderFn = story.render ?? meta.render;
          if (typeof renderFn !== 'function') continue;
          const out = renderFn({ ...(meta.args ?? {}), ...(story.args ?? {}) });
          if (typeof out === 'string') {
            for (const m of out.matchAll(/\bclass="([^"]+)"/g)) {
              for (const cls of m[1].split(/\s+/)) {
                const needed = hostBlockToSpec.get(cls);
                if (needed && !coveredSpecs.has(needed)) {
                  violations.push(`${rel} (${expName}): renders .${cls} without ${needed}`);
                }
              }
            }
          }
        }
      }
    } finally {
      (globalThis as Record<string, unknown>).document = prevDoc;
    }

    expect(violations).toEqual([]);
  });

  it('verifies fenced TS, TSX, Vue, and Astro code snippets against exported symbols, syntax, props, and slots', async () => {
    const entryFiles = [
      join(repoRoot, 'packages/core/src/index.ts'),
      join(repoRoot, 'packages/html/src/index.ts'),
      join(repoRoot, 'packages/react/src/index.ts'),
      join(repoRoot, 'packages/vue/src/index.ts'),
      join(repoRoot, 'packages/astro/src/index.d.ts'),
    ];

    const prog = ts.createProgram(entryFiles, {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      jsx: ts.JsxEmit.ReactJSX,
      strict: true,
      skipLibCheck: true,
      baseUrl: repoRoot,
      paths: {
        '@eevenkoto/core': ['packages/core/src/index.ts'],
        '@eevenkoto/html': ['packages/html/src/index.ts'],
        '@eevenkoto/react': ['packages/react/src/index.ts'],
        '@eevenkoto/vue': ['packages/vue/src/index.ts'],
        '@eevenkoto/astro': ['packages/astro/src/index.d.ts'],
      },
    });
    const checker = prog.getTypeChecker();

    const getExportsMap = (filePath: string) => {
      const sf = prog.getSourceFile(filePath)!;
      const sym = checker.getSymbolAtLocation(sf)!;
      return new Map(checker.getExportsOfModule(sym).map((e) => [e.getName(), e]));
    };

    const pkgExports: Record<string, Map<string, ts.Symbol>> = {
      '@eevenkoto/core': getExportsMap(entryFiles[0]),
      '@eevenkoto/html': getExportsMap(entryFiles[1]),
      '@eevenkoto/react': getExportsMap(entryFiles[2]),
      '@eevenkoto/vue': getExportsMap(entryFiles[3]),
      '@eevenkoto/astro': getExportsMap(entryFiles[4]),
    };

    const reactPropsMap = new Map<string, Set<string>>();
    for (const [name] of pkgExports['@eevenkoto/react']) {
      if (/^[A-Z]/.test(name) && !name.endsWith('Props')) {
        const propsSym = pkgExports['@eevenkoto/react'].get(`${name}ComponentProps`);
        if (propsSym) {
          const propNames = new Set(
            checker
              .getDeclaredTypeOfSymbol(propsSym)
              .getProperties()
              .map((p) => p.getName()),
          );
          propNames.add('key');
          propNames.add('ref');
          reactPropsMap.set(name, propNames);
        }
      }
    }

    const htmlRenderPropsMap = new Map<string, Set<string>>();
    for (const [name, sym] of pkgExports['@eevenkoto/html']) {
      if (/^render[A-Z]/.test(name)) {
        const decl = sym.valueDeclaration ?? sym.declarations?.[0];
        if (!decl) continue;
        const sigs = checker.getTypeOfSymbolAtLocation(sym, decl).getCallSignatures();
        if (sigs.length > 0 && sigs[0].parameters.length > 0) {
          const pSym = sigs[0].parameters[0];
          const pType = checker.getNonNullableType(
            checker.getTypeOfSymbolAtLocation(pSym, pSym.valueDeclaration ?? sigs[0].declaration!),
          );
          htmlRenderPropsMap.set(name, new Set(pType.getProperties().map((p) => p.getName())));
        }
      }
    }

    const astroCompProps = new Map<string, Set<string>>();
    for (const [name, sym] of pkgExports['@eevenkoto/astro']) {
      if (/^[A-Z]/.test(name) && sym.valueDeclaration) {
        const sigs = checker
          .getTypeOfSymbolAtLocation(sym, sym.valueDeclaration)
          .getCallSignatures();
        if (sigs.length > 0 && sigs[0].parameters.length > 0) {
          const pSym = sigs[0].parameters[0];
          const pType = checker.getTypeOfSymbolAtLocation(
            pSym,
            pSym.valueDeclaration ?? sigs[0].declaration!,
          );
          const props = new Set(pType.getProperties().map((p) => p.getName()));
          astroCompProps.set(name, props);
        }
      }
    }

    const vuePropsMap = new Map<string, Set<string>>();
    const vueSlotsMap = new Map<string, Set<string>>();
    for (const f of walkFiles(join(repoRoot, 'packages/vue/src'), ['.ts'])) {
      if (basename(f) === 'index.ts' || basename(f) === 'slots.ts') continue;
      const raw = readFileSync(f, 'utf8');
      const compMatch = raw.match(/export const (\w+)\s*=\s*defineComponent/);
      if (!compMatch) continue;
      const compName = compMatch[1];
      const propsBlock = raw.match(/props:\s*\{([\s\S]*?)\n\s*\},\s*\n\s*(?:emits:|setup\()/);
      const propNames = new Set(['class', 'style', 'id', 'key', 'ref', 'role', 'tabindex']);
      if (propsBlock) {
        for (const m of propsBlock[1].matchAll(/^\s{4}(\w+)\s*:/gm)) {
          propNames.add(m[1]);
        }
      }
      vuePropsMap.set(compName, propNames);

      const slots = new Set<string>();
      for (const m of raw.matchAll(/slots\.(\w+)/g)) slots.add(m[1]);
      if (raw.includes('renderDefaultSlot')) slots.add('default');
      vueSlotsMap.set(compName, slots);
    }

    const astroSlotsMap = new Map<string, Set<string>>();
    const astroHasRestMap = new Map<string, boolean>();
    for (const f of walkFiles(join(repoRoot, 'packages/astro/src'), ['.astro'])) {
      const compName = basename(f, '.astro');
      const raw = readFileSync(f, 'utf8');
      astroHasRestMap.set(compName, /\.\.\.(?:rest|attrs)\b/.test(raw));
      const slots = new Set<string>();
      for (const m of raw.matchAll(/<slot(?:\s+name=["'](\w+)["'])?/g)) {
        slots.add(m[1] || 'default');
      }
      for (const m of raw.matchAll(/Astro\.slots\.(?:has|render)\(\s*['"](\w+)['"]/g)) {
        slots.add(m[1]);
      }
      astroSlotsMap.set(compName, slots);
    }

    const astroPkg = JSON.parse(
      readFileSync(join(repoRoot, 'packages/astro/package.json'), 'utf8'),
    ) as { exports: Record<string, unknown> };

    const kebabToCamel = (s: string) => s.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());
    const violations: string[] = [];

    for (const file of docFiles) {
      const rel = relative(repoRoot, file).replace(/\\/g, '/');
      const lines = readFileSync(file, 'utf8').split('\n');
      let contextHeader = '';
      let inFence = false;
      let marker = '';
      let lang = '';
      let start = 0;
      let buf: string[] = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!inFence) {
          if (/^(?:#{1,6}\s+|\*\*(?:Ennen|Nyt|Before|After)\b)/.test(line.trim())) {
            contextHeader = line.trim();
          }
          const fm = line.match(/^([ \t]*`{3,})([\w-]*)/);
          if (fm) {
            inFence = true;
            marker = fm[1].trim();
            lang = fm[2].trim().toLowerCase();
            start = i + 1;
            buf = [];
          }
        } else if (new RegExp(`^[ \\t]*${marker}\\s*$`).test(line)) {
          inFence = false;
          const isHistoricalBefore =
            rel.startsWith('docs/migration-') && /\b(?:Ennen|Before)\b/i.test(contextHeader);
          if (isHistoricalBefore) continue;

          const code = buf.join('\n');
          const loc = `${rel}:${start}`;

          if (['ts', 'tsx', 'js', 'jsx', 'vue', 'astro'].includes(lang)) {
            for (const m of code.matchAll(
              /import\s+(?:type\s+)?\{([^}]+)\}\s+from\s+['"](@eevenkoto\/(?:core|html|react|vue|astro))['"]/g,
            )) {
              const exportsMap = pkgExports[m[2]];
              for (const rawSpec of m[1].split(',')) {
                const clean = rawSpec.trim().replace(/^type\s+/, '').split(/\s+as\s+/)[0].trim();
                if (clean && !exportsMap.has(clean)) {
                  violations.push(`${loc}: "${clean}" is not exported by ${m[2]}`);
                }
              }
            }
            for (const m of code.matchAll(/from\s+['"]@eevenkoto\/astro\/([^'"]+)['"]/g)) {
              if (!astroPkg.exports[`./${m[1]}`]) {
                violations.push(`${loc}: "@eevenkoto/astro/${m[1]}" is not an exported subpath`);
              }
            }
          }

          if (lang === 'ts' || lang === 'tsx') {
            const sf = ts.createSourceFile(
              `snippet.${lang}`,
              code,
              ts.ScriptTarget.ES2022,
              true,
              lang === 'tsx' ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
            );
            const parseDiags = (sf as unknown as { parseDiagnostics?: ts.Diagnostic[] })
              .parseDiagnostics;
            if (parseDiags && parseDiags.length > 0) {
              violations.push(
                `${loc} [${lang}]: TS syntax error: ${ts.flattenDiagnosticMessageText(parseDiags[0].messageText, ' ')}`,
              );
            }

            const visit = (node: ts.Node) => {
              if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
                const tag = node.tagName.getText(sf);
                const validProps = reactPropsMap.get(tag);
                if (validProps) {
                  for (const attr of node.attributes.properties) {
                    if (ts.isJsxAttribute(attr)) {
                      const attrName = attr.name.getText(sf);
                      if (attrName.startsWith('data-') || attrName.startsWith('aria-')) continue;
                      if (!validProps.has(attrName)) {
                        violations.push(`${loc} [tsx]: <${tag}> unknown React prop "${attrName}"`);
                      }
                    }
                  }
                }
              }
              if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
                const validProps = htmlRenderPropsMap.get(node.expression.text);
                if (
                  validProps &&
                  node.arguments.length > 0 &&
                  ts.isObjectLiteralExpression(node.arguments[0])
                ) {
                  for (const prop of node.arguments[0].properties) {
                    if (ts.isPropertyAssignment(prop) || ts.isShorthandPropertyAssignment(prop)) {
                      const propName = prop.name.getText(sf);
                      if (!validProps.has(propName)) {
                        violations.push(
                          `${loc} [${lang}]: ${node.expression.text}({...}) unknown HTML prop "${propName}"`,
                        );
                      }
                    }
                  }
                }
              }
              ts.forEachChild(node, visit);
            };
            visit(sf);
          }

          if (lang === 'vue') {
            const scriptMatch = code.match(/<script[^>]*>([\s\S]*?)<\/script>/);
            if (scriptMatch) {
              const sf = ts.createSourceFile(
                'snippet.ts',
                scriptMatch[1],
                ts.ScriptTarget.ES2022,
                true,
                ts.ScriptKind.TS,
              );
              const parseDiags = (sf as unknown as { parseDiagnostics?: ts.Diagnostic[] })
                .parseDiagnostics;
              if (parseDiags && parseDiags.length > 0) {
                violations.push(
                  `${loc} [vue]: <script> syntax error: ${ts.flattenDiagnosticMessageText(parseDiags[0].messageText, ' ')}`,
                );
              }
            }
            const tplMatch = code.match(/<template>([\s\S]*?)<\/template>/);
            if (tplMatch) {
              const res = await parseAstro(tplMatch[1]);
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const walkVue = (node: any, parentComp: string | null = null) => {
                if (!node || typeof node !== 'object') return;
                if (node.type === 'component' && vuePropsMap.has(node.name)) {
                  const validProps = vuePropsMap.get(node.name)!;
                  for (const attr of node.attributes ?? []) {
                    if (attr.type === 'attribute') {
                      let rawAttr = String(attr.name);
                      if (
                        rawAttr.startsWith('@') ||
                        rawAttr.startsWith('v-on:') ||
                        rawAttr === 'v-bind' ||
                        rawAttr === 'v-model' ||
                        rawAttr.startsWith('data-') ||
                        rawAttr.startsWith('aria-')
                      ) {
                        continue;
                      }
                      rawAttr = rawAttr.replace(/^(?::|v-bind:|v-model:)/, '');
                      const camel = kebabToCamel(rawAttr);
                      if (!validProps.has(rawAttr) && !validProps.has(camel)) {
                        violations.push(
                          `${loc} [vue]: <${node.name}> unknown Vue prop "${attr.name}"`,
                        );
                      }
                    }
                  }
                  for (const child of node.children ?? []) walkVue(child, node.name);
                  return;
                }
                if (
                  node.type === 'element' &&
                  node.name === 'template' &&
                  parentComp &&
                  vueSlotsMap.has(parentComp)
                ) {
                  for (const attr of node.attributes ?? []) {
                    const attrName = String(attr.name);
                    if (attrName.startsWith('#') || attrName.startsWith('v-slot:')) {
                      const sName = attrName.replace(/^(?:#|v-slot:)/, '');
                      if (!vueSlotsMap.get(parentComp)!.has(sName)) {
                        violations.push(
                          `${loc} [vue]: <${parentComp}> unknown Vue slot "#${sName}"`,
                        );
                      }
                    }
                  }
                }
                for (const child of node.children ?? []) walkVue(child, parentComp);
              };
              walkVue(res.ast);
            }
          }

          if (lang === 'astro') {
            const fmMatch = code.match(/^---\r?\n([\s\S]*?)\r?\n---/);
            if (fmMatch) {
              const sf = ts.createSourceFile(
                'frontmatter.ts',
                fmMatch[1],
                ts.ScriptTarget.ES2022,
                true,
                ts.ScriptKind.TS,
              );
              const parseDiags = (sf as unknown as { parseDiagnostics?: ts.Diagnostic[] })
                .parseDiagnostics;
              if (parseDiags && parseDiags.length > 0) {
                violations.push(
                  `${loc} [astro]: frontmatter syntax error: ${ts.flattenDiagnosticMessageText(parseDiags[0].messageText, ' ')}`,
                );
              }
            }
            const res = await parseAstro(code);
            const errs = (res.diagnostics ?? []).filter((d) => d.severity === 1);
            if (errs.length > 0) {
              violations.push(`${loc} [astro]: compiler error: ${errs[0].text}`);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const walkAstro = (node: any) => {
              if (!node || typeof node !== 'object') return;
              if (node.type === 'component' && astroCompProps.has(node.name)) {
                const validProps = astroCompProps.get(node.name)!;
                const validSlots = astroSlotsMap.get(node.name) ?? new Set<string>();
                for (const attr of node.attributes ?? []) {
                  if (attr.type === 'attribute') {
                    const name = String(attr.name);
                    const hasRest = astroHasRestMap.get(node.name) ?? false;
                    if (
                      name.startsWith('client:') ||
                      name === 'set:html' ||
                      name === 'set:text' ||
                      name === 'class:list'
                    ) {
                      continue;
                    }
                    if (
                      hasRest &&
                      (name.startsWith('data-') ||
                        name.startsWith('aria-') ||
                        ['id', 'style', 'title'].includes(name))
                    ) {
                      continue;
                    }
                    if (!validProps.has(name)) {
                      violations.push(
                        `${loc} [astro]: <${node.name}> unknown Astro prop "${name}"`,
                      );
                    }
                  }
                }
                for (const child of node.children ?? []) {
                  const slotAttr = (child.attributes ?? []).find(
                    (a: { name: string }) => a.name === 'slot',
                  );
                  if (slotAttr && !validSlots.has(slotAttr.value)) {
                    violations.push(
                      `${loc} [astro]: <${node.name}> unknown Astro slot="${slotAttr.value}"`,
                    );
                  }
                }
              }
              for (const child of node.children ?? []) walkAstro(child);
            };
            walkAstro(res.ast);
          }
        } else {
          buf.push(line);
        }
      }
    }

    expect(violations).toEqual([]);
  }, 30_000);

  it(
    'semantically type-checks all self-contained Framework packages TS, TSX, Vue, and Astro snippets across all 69 MDX pages',
    async () => {
    const kebabToCamel = (s: string) => s.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());
    const virtualFiles = new Map<string, string>();
    const metas: Array<{ vf: string; loc: string; lang: string }> = [];

    for (const mdx of componentMdxFiles) {
      const rel = relative(repoRoot, mdx).replace(/\\/g, '/');
      const lines = readFileSync(mdx, 'utf8').split('\n');
      let h2 = '';
      let inFence = false;
      let marker = '';
      let lang = '';
      let start = 0;
      let buf: string[] = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!inFence) {
          const hm = line.match(/^##\s+(.+)$/);
          if (hm) h2 = hm[1].trim();
          const fm = line.match(/^([ \t]*`{3,})([\w-]*)/);
          if (fm) {
            inFence = true;
            marker = fm[1].trim();
            lang = fm[2].trim().toLowerCase();
            start = i + 1;
            buf = [];
          }
        } else if (new RegExp(`^[ \\t]*${marker}\\s*$`).test(line)) {
          inFence = false;
          if (h2 !== 'Framework packages') continue;
          const code = buf.join('\n');
          const loc = `${rel}:${start}`;

          if (lang === 'ts' || lang === 'tsx') {
            const clean =
              code.replace(/^import\s+['"]@eevenkoto\/css\/[^'"]+['"];?\s*$/gm, '') +
              '\nexport {};\n';
            const vf = resolve(repoRoot, `__fw_ts_${metas.length}.${lang}`);
            virtualFiles.set(vf, clean);
            metas.push({ vf, loc, lang });
          } else if (lang === 'vue') {
            const script = (code.match(/<script[^>]*>([\s\S]*?)<\/script>/)?.[1] ?? '').replace(
              /^import\s+['"]@eevenkoto\/css\/[^'"]+['"];?\s*$/gm,
              '',
            );
            const tpl = code.match(/<template>([\s\S]*?)<\/template>/)?.[1] ?? '';
            const res = await parseAstro(tpl);
            const calls: string[] = [];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const walkTpl = (node: any) => {
              if (!node || typeof node !== 'object') return;
              if (node.type === 'component') {
                const propPairs: string[] = [];
                for (const attr of node.attributes ?? []) {
                  if (attr.type !== 'attribute') continue;
                  const rawName = String(attr.name);
                  if (
                    rawName.startsWith('@') ||
                    rawName.startsWith('v-on:') ||
                    rawName.startsWith('data-') ||
                    rawName.startsWith('aria-') ||
                    rawName === 'class' ||
                    rawName === 'style' ||
                    rawName === 'id' ||
                    rawName === 'v-bind' ||
                    rawName === 'v-model'
                  ) {
                    continue;
                  }
                  if (
                    rawName.startsWith(':') ||
                    rawName.startsWith('v-bind:') ||
                    rawName.startsWith('v-model:')
                  ) {
                    const pName = kebabToCamel(rawName.replace(/^(?::|v-bind:|v-model:)/, ''));
                    const val = attr.value || 'true';
                    propPairs.push(`${JSON.stringify(pName)}: __unref(${val})`);
                  } else {
                    const pName = kebabToCamel(rawName);
                    const val =
                      attr.raw === '' && !attr.value ? 'true' : JSON.stringify(attr.value ?? '');
                    propPairs.push(`${JSON.stringify(pName)}: ${val}`);
                  }
                }
                calls.push(`__checkVue(${node.name}, { ${propPairs.join(', ')} });`);
              }
              for (const c of node.children ?? []) walkTpl(c);
            };
            walkTpl(res.ast);

            const refNames = [
              ...script.matchAll(/\bconst\s+(\w+)\s*=\s*(?:ref|computed)\s*\(/g),
            ].map((m) => m[1]);
            const tplScopeUnwrap = refNames
              .map((n) => `const ${n} = __unref(__script_${n});`)
              .join('\n  ');
            let renamedScript = script;
            for (const n of refNames) {
              renamedScript = renamedScript.replace(
                new RegExp(`\\bconst\\s+${n}\\b`),
                `const __script_${n}`,
              );
            }

            const synth = `import type { Ref, ComputedRef } from 'vue';
declare function __unref<T>(v: T | Ref<T> | ComputedRef<T>): T;
declare function __checkVue<C extends abstract new (...args: any) => any>(comp: C, props: Partial<InstanceType<C>['$props']>): void;
${renamedScript}
(() => {
  ${tplScopeUnwrap}
  ${calls.join('\n  ')}
})();
export {};
`;
            const vf = resolve(repoRoot, `__fw_vue_${metas.length}.ts`);
            virtualFiles.set(vf, synth);
            metas.push({ vf, loc, lang });
          } else if (lang === 'astro') {
            const m = code.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
            if (m) {
              const fmCode = m[1]
                .replace(/^import\s+['"]@eevenkoto\/css\/[^'"]+['"];?\s*$/gm, '')
                .replace(/from\s+['"]@eevenkoto\/astro\/(\w+)\.astro['"]/g, `from '@eevenkoto/astro'`)
                .replace(
                  /import\s+(\w+)\s+from\s+['"]@eevenkoto\/astro['"]/g,
                  'import { $1 } from "@eevenkoto/astro"',
                );
              const tpl = m[2]
                .trim()
                .replace(/\bset:html=\{([^}]+)\}/g, '')
                .replace(/<!--[\s\S]*?-->/g, '');
              const tsx = `${fmCode}\nconst __el = (\n<>\n${tpl}\n</>\n);\nexport {};\n`;
              const vf = resolve(repoRoot, `__fw_astro_${metas.length}.tsx`);
              virtualFiles.set(vf, tsx);
              metas.push({ vf, loc, lang });
            }
          }
        } else {
          buf.push(line);
        }
      }
    }

    const compilerOptions: ts.CompilerOptions = {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      jsx: ts.JsxEmit.ReactJSX,
      strict: true,
      skipLibCheck: true,
      noEmit: true,
      lib: ['lib.es2022.d.ts', 'lib.dom.d.ts'],
      baseUrl: repoRoot,
      paths: {
        '@eevenkoto/core': ['packages/core/src/index.ts'],
        '@eevenkoto/html': ['packages/html/src/index.ts'],
        '@eevenkoto/react': ['packages/react/src/index.ts'],
        '@eevenkoto/vue': ['packages/vue/src/index.ts'],
        '@eevenkoto/astro': ['packages/astro/src/index.d.ts'],
      },
    };

    const defaultHost = ts.createCompilerHost(compilerOptions);
    const host: ts.CompilerHost = {
      ...defaultHost,
      fileExists: (f) => virtualFiles.has(resolve(f)) || defaultHost.fileExists(f),
      readFile: (f) => virtualFiles.get(resolve(f)) ?? defaultHost.readFile(f),
      getSourceFile: (f, lv) => {
        const res = resolve(f);
        if (virtualFiles.has(res)) {
          return ts.createSourceFile(
            f,
            virtualFiles.get(res)!,
            lv,
            true,
            f.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
          );
        }
        return defaultHost.getSourceFile(f, lv);
      },
    };

    const prog = ts.createProgram([...virtualFiles.keys()], compilerOptions, host);
    const violations: string[] = [];

    for (const meta of metas) {
      const sf = prog.getSourceFile(meta.vf)!;
      const diags = [...prog.getSyntacticDiagnostics(sf), ...prog.getSemanticDiagnostics(sf)];
      for (const d of diags) {
        const msg = ts.flattenDiagnosticMessageText(d.messageText, ' ');
        if (
          meta.lang === 'astro' &&
          (msg.includes("Property 'class' does not exist on type 'DetailedHTMLProps") ||
            msg.includes("Property 'slot' does not exist on type 'DetailedHTMLProps") ||
            msg.includes("Property 'for' does not exist on type 'DetailedHTMLProps"))
        ) {
          continue;
        }
        violations.push(`${meta.loc} [${meta.lang}]: TS${d.code}: ${msg}`);
      }
    }

    expect(violations).toEqual([]);
  },
    30_000,
  );

  it('includes an opening ```html code block in the intro section of every published component MDX page', () => {
    const componentMdxFiles = [
      ...walkFiles(join(repoRoot, 'apps/storybook/src/core'), ['.mdx']),
      ...walkFiles(join(repoRoot, 'apps/storybook/src/domain'), ['.mdx']),
    ].filter((f) => basename(f) !== 'TypographySample.mdx');

    const violations: string[] = [];
    for (const mdx of componentMdxFiles) {
      const raw = readFileSync(mdx, 'utf8');
      const rel = relative(repoRoot, mdx).replace(/\\/g, '/');
      const firstH2 = raw.search(/^##\s+/m);
      const intro = firstH2 === -1 ? raw : raw.slice(0, firstH2);
      const htmlMatch = intro.match(/```html\r?\n([\s\S]*?)```/);
      if (!htmlMatch) {
        violations.push(`${rel}: missing opening \`\`\`html block in intro section`);
        continue;
      }
      if (!/\beevenkoto-[a-z0-9-]+/.test(htmlMatch[1])) {
        violations.push(`${rel}: opening \`\`\`html block does not contain an eevenkoto-* class`);
      }
    }

    expect(violations).toEqual([]);
  });
});
