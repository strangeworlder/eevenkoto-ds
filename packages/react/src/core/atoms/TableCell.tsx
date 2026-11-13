import {
  tableCellClassNames,
  type TableCellKind,
  type TableCellProps,
  type TableCellScope,
  type TableElementAttributes,
} from '@eevenkoto/core';
import type { ReactElement, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from 'react';

export type { TableCellKind, TableCellProps, TableCellScope, TableElementAttributes };

const SAFE_ATTR_NAME_RE = /^[a-zA-Z_:][a-zA-Z0-9_.:-]*$/;

export const normalizeTableAttributes = (
  attrs?: TableElementAttributes,
  omitClass = false,
): Record<string, string | number | boolean> | undefined => {
  if (!attrs) return undefined;
  const out: Record<string, string | number | boolean> = {};
  let hasAny = false;
  for (const [name, value] of Object.entries(attrs)) {
    if (value === undefined || value === false) continue;
    if (omitClass && (name === 'class' || name === 'className')) continue;
    if (!SAFE_ATTR_NAME_RE.test(name) || /^on/i.test(name)) continue;
    out[name] = value === true && name.startsWith('data-') ? '' : value;
    hasAny = true;
  }
  return hasAny ? out : undefined;
};

type Shared = {
  kind?: TableCellKind;
  text?: string;
  html?: string;
  scope?: TableCellScope;
  colSpan?: number;
  rowSpan?: number;
  angled?: boolean;
  /** Cell sits inside a `.eevenkoto-table` host, which already styles bare `th` / `td`. */
  inTable?: boolean;
  attributes?: TableElementAttributes;
  children?: ReactNode;
  className?: string;
};

export type TableCellComponentProps =
  | (Shared &
      Omit<ThHTMLAttributes<HTMLTableCellElement>, 'scope' | 'colSpan' | 'rowSpan'> & {
        header: true;
      })
  | (Shared &
      Omit<TdHTMLAttributes<HTMLTableCellElement>, 'scope' | 'colSpan' | 'rowSpan'> & {
        header?: false;
      });

export const TableCell = ({
  kind = 'text',
  text,
  html,
  header = false,
  scope,
  colSpan,
  rowSpan,
  angled = false,
  inTable = false,
  attributes,
  children,
  className,
  ...rest
}: TableCellComponentProps): ReactElement => {
  const attrClass = typeof attributes?.class === 'string' ? attributes.class.trim() : '';
  const classes =
    [tableCellClassNames({ kind, inTable }), className, attrClass].filter(Boolean).join(' ') ||
    undefined;
  const extraAttrs = normalizeTableAttributes(attributes, true);
  const wrapHeadLabel = angled && header && kind === 'numeric';

  const hasChildren = children !== undefined;
  const Tag = header ? 'th' : 'td';
  const cellProps = {
    className: classes,
    scope,
    colSpan,
    rowSpan,
    ...extraAttrs,
    ...rest,
  };

  if (!hasChildren && html !== undefined) {
    if (wrapHeadLabel) {
      return (
        <Tag {...(cellProps as ThHTMLAttributes<HTMLTableCellElement>)}>
          <span
            className="eevenkoto-table-cell__head-label"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Tag>
      );
    }
    return (
      <Tag
        {...(cellProps as TdHTMLAttributes<HTMLTableCellElement>)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  const rawContent = hasChildren ? children : (text ?? '');
  const content = wrapHeadLabel ? (
    <span className="eevenkoto-table-cell__head-label">{rawContent}</span>
  ) : (
    rawContent
  );

  return <Tag {...(cellProps as TdHTMLAttributes<HTMLTableCellElement>)}>{content}</Tag>;
};
