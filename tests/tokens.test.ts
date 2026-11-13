import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { iconPaths } from '@eevenkoto/core';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const primitiveTokensPath = join(repoRoot, 'packages/css/tokens/primitive-tokens.css');
const semanticTokensPath = join(repoRoot, 'packages/css/tokens/tokens.css');
const tokensStoriesPath = join(repoRoot, 'apps/storybook/src/tokens/Tokens.stories.ts');

function stripCssComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

function collectDeclaredTokens(css: string): Set<string> {
  const out = new Set<string>();
  const clean = stripCssComments(css);
  const re = /(--eevenkoto-[a-z0-9-]+)\s*:/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(clean)) !== null) {
    out.add(match[1]);
  }
  return out;
}

function walkCssFiles(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walkCssFiles(full, acc);
    else if (entry.isFile() && entry.name.endsWith('.css')) acc.push(full);
  }
  return acc;
}

describe('Design token architecture & catalog parity', () => {
  const primitiveCss = readFileSync(primitiveTokensPath, 'utf8');
  const semanticCss = readFileSync(semanticTokensPath, 'utf8');
  const storiesTs = readFileSync(tokensStoriesPath, 'utf8');

  const primitiveTokens = collectDeclaredTokens(primitiveCss);
  const tier2Tokens = collectDeclaredTokens(semanticCss);

  it('keeps Tier 1 and Tier 2 token declarations disjoint', () => {
    const overlap = [...primitiveTokens].filter((token) => tier2Tokens.has(token));
    expect(overlap).toEqual([]);
  });

  it('catalogs 100% of Tier 1 and Tier 2 CSS tokens in Tokens.stories.ts with zero stale entries', () => {
    const allCssTokens = new Set([...primitiveTokens, ...tier2Tokens]);
    const catalogedTokens = new Set<string>();
    const re = /variable:\s*'(--eevenkoto-[a-z0-9-]+)'/g;
    let match: RegExpExecArray | null;
    while ((match = re.exec(storiesTs)) !== null) {
      catalogedTokens.add(match[1]);
    }

    const missingFromStorybook = [...allCssTokens].filter((t) => !catalogedTokens.has(t)).sort();
    const staleInStorybook = [...catalogedTokens].filter((t) => !allCssTokens.has(t)).sort();

    expect(missingFromStorybook).toEqual([]);
    expect(staleInStorybook).toEqual([]);
  });

  it('has zero orphaned Tier 1 primitives unused by tokens.css', () => {
    const cleanSemantic = stripCssComments(semanticCss);
    const referencedInSemantic = new Set<string>();
    const varRe = /var\(\s*(--eevenkoto-[a-z0-9-]+)\s*[,)]/gi;
    let match: RegExpExecArray | null;
    while ((match = varRe.exec(cleanSemantic)) !== null) {
      referencedInSemantic.add(match[1]);
    }
    const unusedPrimitives = [...primitiveTokens]
      .filter((token) => !referencedInSemantic.has(token))
      .sort();
    expect(unusedPrimitives).toEqual([]);
  });

  it('keeps dark theme and scoped [data-surface-mode="dark"] selectors paired in tokens.css', () => {
    expect(semanticCss).toMatch(/\[data-theme="dark"\]\s*,\s*\[data-surface-mode="dark"\]/);
  });

  it('keeps CSS pseudo-element chevron masks byte-for-byte synced with @eevenkoto/core iconPaths', () => {
    const expectedRight = `url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='${iconPaths['chevron-right']}'/%3E%3C/svg%3E")`;
    const expectedDown = `url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='${iconPaths['chevron-down']}'/%3E%3C/svg%3E")`;

    expect(semanticCss).toContain(`--eevenkoto-icon-mask-chevron-right: ${expectedRight};`);
    expect(semanticCss).toContain(`--eevenkoto-icon-mask-chevron-down: ${expectedDown};`);
  });

  it('has zero leaked Tier 1 primitives or undefined global tokens across component and Storybook CSS', () => {
    const globalNamespace =
      /^--eevenkoto-(?:color|space|radius|font|line|duration|ease|transition|icon-mask|z)-/;
    const cssFiles = [
      ...walkCssFiles(join(repoRoot, 'packages/css')).filter(
        (f) => f !== primitiveTokensPath && f !== semanticTokensPath,
      ),
      ...walkCssFiles(join(repoRoot, 'apps/storybook/src')),
    ];

    const violations: string[] = [];
    for (const file of cssFiles) {
      const clean = stripCssComments(readFileSync(file, 'utf8'));
      const re = /--eevenkoto-[a-z0-9-]+/g;
      let match: RegExpExecArray | null;
      while ((match = re.exec(clean)) !== null) {
        const token = match[0];
        if (primitiveTokens.has(token)) {
          violations.push(`${file}: leaked Tier 1 primitive ${token}`);
        } else if (globalNamespace.test(token) && !tier2Tokens.has(token)) {
          violations.push(`${file}: undefined Tier 2 token ${token}`);
        }
      }
    }

    expect(violations).toEqual([]);
  });
});
