export type TableCellKind = 'index' | 'numeric' | 'text';

export interface TableCellClassNameProps {
  /** Column role. Defaults to `text`. */
  kind?: TableCellKind;
}

export interface TableCellProps extends TableCellClassNameProps {
  /** Cell copy (product / locale data). */
  text: string;
  /** Render as header cell. */
  header?: boolean;
  /** `scope` when `header` is true. */
  scope?: 'col' | 'row';
  /** Wrap header label for angled numeric heads (numeric + header). */
  angled?: boolean;
}

export const tableCellClassNames = (props: TableCellClassNameProps = {}): string => {
  const kind = props.kind ?? 'text';
  return `eevenkoto-table-cell eevenkoto-table-cell--${kind}`;
};

export const tableColClassNames = (props: TableCellClassNameProps = {}): string => {
  const kind = props.kind ?? 'text';
  return `eevenkoto-table__col eevenkoto-table__col--${kind}`;
};
