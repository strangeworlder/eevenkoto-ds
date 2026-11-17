import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const readCss = (relPath: string): string =>
  readFileSync(join(repoRoot, 'packages/css', relPath), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');

describe('Spacing & vertical rhythm architecture', () => {
  it('defines semantic --eevenkoto-line-height-snug token and omits global text-box trim', () => {
    const tokensCss = readCss('tokens/tokens.css');
    const stylesCss = readCss('styles.css');

    expect(tokensCss).toContain('--eevenkoto-line-height-snug: 1.25;');
    expect(stylesCss).not.toMatch(/\btext-box(?:-trim)?\s*:/i);
  });

  it('uses margin-block-start (never padding-block-start) in Flow so bordered children get outer air', () => {
    const flowCss = readCss('core/molecules/flow.css');

    expect(flowCss).toContain('margin-block-start: var(--_eevenkoto-flow-gap);');
    expect(flowCss).toContain('margin-block-start: var(--_eevenkoto-flow-gap-block);');
    expect(flowCss).toContain('.eevenkoto-flow > * + .eevenkoto-heading');
    expect(flowCss).toContain('.eevenkoto-flow > .eevenkoto-notice + .eevenkoto-notice');
    expect(flowCss).not.toMatch(/padding-block-start\s*:/i);
  });

  it('excludes eevenkoto-* classes from Prose bare-tag rules so nested DS components never bleed', () => {
    const headingCss = readCss('core/atoms/heading.css');
    const paragraphCss = readCss('core/atoms/paragraph.css');
    const listCss = readCss('core/atoms/list.css');
    const dividerCss = readCss('core/atoms/divider.css');
    const proseCss = readCss('core/molecules/prose.css');

    expect(headingCss).toContain(
      '.eevenkoto-prose :where(h1, h2, h3, h4, h5, h6):where(:not([class^="eevenkoto-"], [class*=" eevenkoto-"]))',
    );
    expect(headingCss).toContain('--eevenkoto-line-height-snug');
    expect(paragraphCss).toContain(
      '.eevenkoto-prose :where(p:not([class^="eevenkoto-"], [class*=" eevenkoto-"]))',
    );
    expect(listCss).toContain(
      '.eevenkoto-prose :where(ul, ol):where(:not([class^="eevenkoto-"], [class*=" eevenkoto-"], .eevenkoto-menu *))',
    );
    expect(listCss).toContain('> :where(li)');
    expect(dividerCss).toContain(
      '.eevenkoto-prose :where(hr:not([class^="eevenkoto-"], [class*=" eevenkoto-"], .eevenkoto-menu *))',
    );
    expect(proseCss).toContain('.eevenkoto-prose:not(.eevenkoto-flow)');
  });

  it('gives TableOfContents snug line-height and positive inter-item gap', () => {
    const tocCss = readCss('core/molecules/table-of-contents.css');

    expect(tocCss).toMatch(/\.eevenkoto-toc__list\s*\{[^}]*gap:\s*var\(--eevenkoto-space-1\);/s);
    expect(tocCss).toMatch(
      /\.eevenkoto-toc__link\s*\{[^}]*line-height:\s*var\(--eevenkoto-line-height-snug\);/s,
    );
    expect(tocCss).toMatch(
      /\.eevenkoto-toc__heading\s*\{[^}]*line-height:\s*var\(--eevenkoto-line-height-snug\);/s,
    );
  });

  it('gives Notice Playbill Oxford-rule framing, secondary scale, interior rhythm, and contrast-safe link colors', () => {
    const noticeCss = readCss('core/molecules/notice.css');

    expect(noticeCss).toContain('background-clip: content-box;');
    expect(noticeCss).toContain('border-inline-end:');
    expect(noticeCss).toContain('var(--eevenkoto-font-size-body-sm)');
    expect(noticeCss).toMatch(
      /\.eevenkoto-notice__title\s*\{[^}]*font-size:\s*inherit;[^}]*line-height:\s*var\(--eevenkoto-line-height-snug\);/s,
    );
    expect(noticeCss).toContain('margin-block-start: var(--eevenkoto-space-3);');
    expect(noticeCss).toContain(
      '--_eevenkoto-notice-link-color: var(--eevenkoto-notice-link-color, currentColor);',
    );
    expect(noticeCss).toContain('--eevenkoto-prose-link-visited: currentColor;');
  });
});
