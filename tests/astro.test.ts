import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { transform } from '@astrojs/compiler';
import ts from 'typescript';
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

  it('ships all 73 public components matching @eevenkoto/react', () => {
    const reactComponentNames = Object.keys(ReactExports).sort();
    const exportedMatches = [...indexJs.matchAll(/export\s+\{\s*default\s+as\s+(\w+)\s*\}\s+from\s+'([^']+)';/g)];
    const astroExportedNames = exportedMatches.map((m) => m[1]).sort();

    expect(astroExportedNames).toEqual(reactComponentNames);
    expect(astroExportedNames.length).toBe(73);

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
    expect(astroFiles.length).toBeGreaterThanOrEqual(70);

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

  it('keeps packages/astro/src/index.d.ts in 100% prop parity with every .astro frontmatter Props interface', () => {
    const astroDtsPath = join(astroSrcDir, 'index.d.ts');
    const virtualFiles = new Map<string, string>();
    const compToVFile = new Map<string, string>();

    for (const af of astroFiles) {
      const comp = basename(af, '.astro');
      if (comp.startsWith('_')) continue;
      const raw = readFileSync(af, 'utf8');
      const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
      const cleanFm =
        fm
          .replace(/^import\s+.*\.astro['"];?\s*$/gm, '')
          .split(/const\s*\{[\s\S]*?\}\s*=\s*Astro\.props/)[0] +
        '\nexport type __AstroProps = Props;\n';
      const vf = resolve(dirname(af), `__check_${comp}.ts`);
      virtualFiles.set(vf, cleanFm);
      compToVFile.set(comp, vf);
    }

    const usageCheckVf = resolve(astroSrcDir, '__check_jsx_usage.tsx');
    virtualFiles.set(
      usageCheckVf,
      `import { Frame, Prose, Image, Swatch } from './index';
export const sample = (
  <>
    <Frame class="demo"><p>Inside frame</p></Frame>
    <Prose class="eevenkoto-flow"><p>Inside prose</p></Prose>
    <Image src="/map.png" alt="Map" style="max-inline-size: 20rem" />
    <Swatch color="#335577" style="margin-inline-end: 0.25rem" />
  </>
);`,
    );

    const compilerOptions: ts.CompilerOptions = {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      jsx: ts.JsxEmit.ReactJSX,
      strict: true,
      skipLibCheck: true,
      noEmit: true,
      baseUrl: rootDir,
      paths: {
        '@eevenkoto/core': ['packages/core/src/index.ts'],
        '@eevenkoto/html': ['packages/html/src/index.ts'],
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

    const prog = ts.createProgram(
      [astroDtsPath, usageCheckVf, ...compToVFile.values()],
      compilerOptions,
      host,
    );
    const checker = prog.getTypeChecker();

    const usageSf = prog.getSourceFile(usageCheckVf)!;
    const usageDiags = [
      ...prog.getSyntacticDiagnostics(usageSf),
      ...prog.getSemanticDiagnostics(usageSf),
    ];
    expect(
      usageDiags.map((d) => ts.flattenDiagnosticMessageText(d.messageText, ' ')),
    ).toEqual([]);

    const dtsSf = prog.getSourceFile(astroDtsPath)!;
    const dtsExports = new Map(
      checker.getExportsOfModule(checker.getSymbolAtLocation(dtsSf)!).map((s) => [s.getName(), s]),
    );

    const violations: string[] = [];
    for (const [comp, vf] of compToVFile) {
      const sf = prog.getSourceFile(vf)!;
      const exp = new Map(
        checker.getExportsOfModule(checker.getSymbolAtLocation(sf)!).map((s) => [s.getName(), s]),
      );
      const pSym = exp.get('__AstroProps');
      const fmProps = pSym
        ? new Set(
            checker
              .getDeclaredTypeOfSymbol(pSym)
              .getProperties()
              .map((p) => p.getName()),
          )
        : new Set<string>();

      const dSym = dtsExports.get(comp)!;
      const sigs = checker.getTypeOfSymbolAtLocation(dSym, dSym.valueDeclaration!).getCallSignatures();
      const argSym = sigs[0].parameters[0];
      const dtsType = checker.getTypeOfSymbolAtLocation(
        argSym,
        argSym.valueDeclaration ?? sigs[0].declaration!,
      );
      const dtsProps = new Set(dtsType.getProperties().map((p) => p.getName()));

      for (const prop of fmProps) {
        if (!dtsProps.has(prop)) {
          violations.push(`${comp}: ${comp}.astro declares "${prop}" missing in index.d.ts`);
        }
      }
      for (const prop of dtsProps) {
        if (prop === 'slot' || prop === 'children') continue;
        if (!fmProps.has(prop)) {
          violations.push(`${comp}: index.d.ts declares "${prop}" missing in ${comp}.astro Props`);
        }
      }
    }

    expect(violations).toEqual([]);
  });
});
