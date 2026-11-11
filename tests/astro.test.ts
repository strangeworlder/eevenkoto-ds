import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { transform } from '@astrojs/compiler';
import { describe, expect, it } from 'vitest';
import * as ReactExports from '@eevenkoto/react';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const astroPkgDir = join(rootDir, 'packages/astro');
const astroSrcDir = join(astroPkgDir, 'src');

function collectAstroFiles(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      collectAstroFiles(full, acc);
    } else if (entry.name.endsWith('.astro')) {
      acc.push(full);
    }
  }
  return acc.sort();
}

describe('@eevenkoto/astro package parity and compiler verification', () => {
  const astroFiles = collectAstroFiles(astroSrcDir);
  const indexJs = readFileSync(join(astroSrcDir, 'index.js'), 'utf8');
  const indexDts = readFileSync(join(astroSrcDir, 'index.d.ts'), 'utf8');

  it('ships all 52 public components matching @eevenkoto/react', () => {
    const reactComponentNames = Object.keys(ReactExports).sort();
    const exportedMatches = [...indexJs.matchAll(/export\s+\{\s*default\s+as\s+(\w+)\s*\}\s+from\s+'([^']+)';/g)];
    const astroExportedNames = exportedMatches.map((m) => m[1]).sort();

    expect(astroExportedNames).toEqual(reactComponentNames);
    expect(astroExportedNames.length).toBe(52);

    for (const [, name, relTarget] of exportedMatches) {
      const targetPath = resolve(astroSrcDir, relTarget);
      expect(existsSync(targetPath), `Missing Astro file for ${name}: ${relTarget}`).toBe(true);
      expect(
        indexDts,
        `Missing TypeScript declaration in index.d.ts for ${name}`,
      ).toMatch(new RegExp(`export\\s+declare\\s+const\\s+${name}\\b`));
    }
  });

  it('compiles every .astro file cleanly with @astrojs/compiler (zero errors or warnings)', async () => {
    expect(astroFiles.length).toBeGreaterThanOrEqual(52);

    for (const file of astroFiles) {
      const rel = relative(rootDir, file).replace(/\\/g, '/');
      const source = readFileSync(file, 'utf8');

      // Every Astro component must consume @eevenkoto/core for class/prop parity
      expect(source, `${rel} must import from @eevenkoto/core`).toContain('@eevenkoto/core');

      const result = await transform(source, {
        filename: rel,
        sourcemap: false,
      });

      const errors = result.diagnostics.filter((d) => d.severity === 1 || d.severity === 2);
      expect(errors, `Compiler diagnostics in ${rel}: ${JSON.stringify(errors)}`).toEqual([]);
      expect(result.code.length, `Empty compiled output for ${rel}`).toBeGreaterThan(0);
    }
  });

  it('ensures every .html template in packages/html has no leading comment or trailing newline', () => {
    function collectHtmlFiles(dir: string, acc: string[] = []): string[] {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) collectHtmlFiles(full, acc);
        else if (entry.name.endsWith('.html')) acc.push(full);
      }
      return acc;
    }

    const htmlFiles = collectHtmlFiles(join(rootDir, 'packages/html/src'));
    expect(htmlFiles.length).toBeGreaterThan(30);

    for (const file of htmlFiles) {
      const rel = relative(rootDir, file).replace(/\\/g, '/');
      const content = readFileSync(file, 'utf8');
      expect(content.startsWith('<!--'), `${rel} starts with HTML comment`).toBe(false);
      expect(content.endsWith('\n'), `${rel} ends with trailing newline`).toBe(false);
    }
  });
});
