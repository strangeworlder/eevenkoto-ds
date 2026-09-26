export type TableCellKind = 'index' | 'numeric' | 'text';

export interface TableCellKindProps {
  /** Column role. Defaults to `text`. */
  kind?: TableCellKind;
}

export interface TableCellClassNameProps extends TableCellKindProps {
  /** Cell sits inside a `.eevenkoto-table` host, which already styles bare `th` / `td`. */
  inTable?: boolean;
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
  /* Under a Table host the base class and the --text default are both redundant. */
  if (props.inTable) {
    return kind === 'text' ? '' : `eevenkoto-table-cell--${kind}`;
  }
  return `eevenkoto-table-cell eevenkoto-table-cell--${kind}`;
};

/* A col is only valid inside a table, and auto width is the browser default. */
export const tableColClassNames = (props: TableCellKindProps = {}): string => {
  const kind = props.kind ?? 'text';
  return kind === 'text' ? '' : `eevenkoto-table__col--${kind}`;
};
