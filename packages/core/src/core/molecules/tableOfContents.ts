export type TableOfContentsVariant = 'auto' | 'rail' | 'collapsible';

export interface TableOfContentsItem {
  id: string;
  href: string;
  label: string;
  current?: boolean;
}

export interface TableOfContentsGroup {
  id?: string;
  label?: string;
  items: TableOfContentsItem[];
}

export interface TableOfContentsProps {
  /** Optional DOM element `id` on `<nav>`. */
  id?: string;
  /** Accessible landmark name (`aria-label`). Default: `'Table of contents'`. */
  label?: string;
  /** Grouped jump-link sections. */
  groups: TableOfContentsGroup[];
  /**
   * Presentation mode:
   * - `'rail'`: vertical outline list for wide side rails
   * - `'collapsible'`: compact sticky/inline `<details>` disclosure dropdown for single-column views
   * - `'auto'` (default): collapsible disclosure on narrow containers/viewports and vertical rail on wide layouts
   */
  variant?: TableOfContentsVariant;
  /** Summary label for the collapsible disclosure trigger. Default: `'On this page'`. */
  toggleLabel?: string;
  /** Start open when rendered in collapsible mode. Default: `false`. */
  open?: boolean;
}

export type TableOfContentsClassNameProps = Pick<TableOfContentsProps, 'variant'>;

export const tableOfContentsClassNames = (props: TableOfContentsClassNameProps = {}): string => {
  const variant = props.variant ?? 'auto';
  return variant === 'auto' ? 'eevenkoto-toc' : `eevenkoto-toc eevenkoto-toc--${variant}`;
};
