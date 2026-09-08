/**
 * Shared docs callout helpers for Storybook MDX.
 *
 * Prefer defining callouts in MDX (see Button.mdx) when possible — importing
 * TSX into MDX can break the JSX runtime under Storybook’s HTML Vite builder.
 * This module remains for reuse from stories or future React docs pages.
 */
import { createElement, type ReactNode } from 'react';

type CalloutProps = {
  children: ReactNode;
  caption?: string;
  label?: string;
};

function Callout({
  variant,
  label,
  caption,
  children,
}: CalloutProps & { variant: 'do' | 'dont' | 'danger' }) {
  return createElement(
    'aside',
    { className: `eevenkoto-docs-callout eevenkoto-docs-callout--${variant}` },
    createElement('strong', { className: 'eevenkoto-docs-callout__label' }, label),
    createElement('div', { className: 'eevenkoto-docs-callout__body' }, children),
    caption
      ? createElement('p', { className: 'eevenkoto-docs-callout__caption' }, caption)
      : null,
  );
}

/** Positive guidance callout for component docs. */
export function Do({ children, caption, label = 'Do' }: CalloutProps) {
  return createElement(Callout, { variant: 'do', label, caption }, children);
}

/** Negative guidance callout for component docs. */
export function Dont({ children, caption, label = "Don't" }: CalloutProps) {
  return createElement(Callout, { variant: 'dont', label, caption }, children);
}

/** Warning / danger callout (e.g. anti-patterns around API misuse). */
export function Danger({ children, caption, label = 'Danger' }: CalloutProps) {
  return createElement(Callout, { variant: 'danger', label, caption }, children);
}

type DoDontProps = {
  do: ReactNode;
  dont: ReactNode;
  doCaption?: string;
  dontCaption?: string;
};

/** Side-by-side Do / Don't pair. */
export function DoDont({ do: doContent, dont: dontContent, doCaption, dontCaption }: DoDontProps) {
  return createElement(
    'div',
    { className: 'eevenkoto-docs-dodont' },
    createElement(Do, { caption: doCaption }, doContent),
    createElement(Dont, { caption: dontCaption }, dontContent),
  );
}
