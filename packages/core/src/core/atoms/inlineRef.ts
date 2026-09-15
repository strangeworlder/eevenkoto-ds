export interface InlineRefProps {
  /** Visible reference name. */
  name: string;
  /** When set, the reference renders as a link. */
  href?: string;
}

export type InlineRefClassNameProps = Record<string, never>;

export const inlineRefClassNames = (): string => 'eevenkoto-inline-ref';

export const inlineRefLabelClassNames = (): string => 'eevenkoto-inline-ref__label';
