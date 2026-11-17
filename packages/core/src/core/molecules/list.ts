import type { ListItemProps } from '../atoms/listItem';

export type ListVariant = 'unordered' | 'ordered' | 'checklist';
export type ListSize = 'sm' | 'md' | 'lg';
export type ListTone = 'primary' | 'secondary';
export type ListLayout = 'stack' | 'tiles';
export type ListColumns = 1 | 2 | 3;

export interface ListProps {
  items: ListItemProps[];
  variant?: ListVariant;
  size?: ListSize;
  tone?: ListTone;
  /** Arrangement of list items (`'stack'` default, or `'tiles'` for non-interactive multi-column swatch/text grids). */
  layout?: ListLayout;
  /** Column count when `layout` is `'tiles'`. Default: `2`. */
  columns?: ListColumns;
}

export type ListClassNameProps = Pick<ListProps, 'variant' | 'size' | 'tone' | 'layout' | 'columns'>;

export const listClassNames = (props: ListClassNameProps = {}): string => {
  const variant = props.variant ?? 'unordered';
  const size = props.size ?? 'md';
  const tone = props.tone ?? 'primary';
  const layout = props.layout ?? 'stack';
  const cols = layout === 'tiles' ? (props.columns ?? 2) : undefined;
  return [
    'eevenkoto-list',
    `eevenkoto-list--${variant}`,
    `eevenkoto-list--${size}`,
    `eevenkoto-list--${tone}`,
    layout === 'tiles' ? 'eevenkoto-list--tiles' : '',
    cols ? `eevenkoto-list--cols-${cols}` : '',
  ]
    .filter(Boolean)
    .join(' ');
};
