import type {
  TableCellKind,
  TableCellScope,
  TableElementAttributes,
} from '../atoms/tableCell';

export type TableVariant = 'default' | 'numeric' | 'pair';
export type TableStripe = 'row' | 'column' | 'none';

export interface TableColumn {
  key: string;
  /** Visible header label (locale / product data). */
  header: string;
  kind?: TableCellKind;
}

export interface TableCellObject {
  text?: string;
  html?: string;
  kind?: TableCellKind;
  colSpan?: number;
  rowSpan?: number;
  header?: boolean;
  scope?: TableCellScope;
  attributes?: TableElementAttributes;
}

export type TableCellInput = string | TableCellObject;

export interface TableRowObject {
  attributes?: TableElementAttributes;
  cells: TableCellInput[];
}

export type TableRowInput = TableCellInput[] | TableRowObject;

export interface TableClassNameProps {
  variant?: TableVariant;
  /** Alternating band. Defaults to `row`. */
  stripe?: TableStripe;
}

export interface TableProps extends TableClassNameProps {
  caption?: string;
  columns: TableColumn[];
  /** Row cells aligned to `columns` order (accepts plain `string[][]` or structured cells/rows). */
  rows: TableRowInput[];
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
