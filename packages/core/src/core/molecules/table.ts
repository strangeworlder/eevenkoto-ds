import type { TableCellKind } from '../atoms/tableCell';

export type TableVariant = 'default' | 'numeric' | 'pair';
export type TableStripe = 'row' | 'column' | 'none';

export interface TableColumn {
  key: string;
  /** Visible header label (locale / product data). */
  header: string;
  kind?: TableCellKind;
}

export interface TableClassNameProps {
  variant?: TableVariant;
  /** Alternating band. Defaults to `row`. */
  stripe?: TableStripe;
}

export interface TableProps extends TableClassNameProps {
  caption?: string;
  columns: TableColumn[];
  /** Row cells aligned to `columns` order. */
  rows: string[][];
}

export const tableClassNames = (props: TableClassNameProps = {}): string => {
  const variant = props.variant ?? 'default';
  const stripe = props.stripe ?? 'row';
  /* --default is a no-op alias; row stripe is the CSS host default. */
  const variantClass = variant === 'default' ? '' : ` eevenkoto-table--${variant}`;
  const stripeClass =
    stripe === 'row' ? '' : ` eevenkoto-table--stripe-${stripe}`;
  return `eevenkoto-table${variantClass}${stripeClass}`;
};

export const tableCaptionClassNames = (): string => 'eevenkoto-table__caption';
