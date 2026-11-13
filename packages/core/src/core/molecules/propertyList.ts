import type { PropertyItem } from '../atoms/property';

export type PropertyListLayout = 'inline' | 'divided' | 'grid' | 'cards';
export type PropertyListColumns = 2 | 3 | 4;

export interface PropertyListProps {
  items: PropertyItem[];
  /** Visual arrangement of definition pairs. Default: `'inline'` (`Label: Value`). */
  layout?: PropertyListLayout;
  /** Explicit column count when `layout` is `'grid'` (default `4`) or `'cards'` (default `2`). */
  columns?: PropertyListColumns;
}

export type PropertyListClassNameProps = Pick<PropertyListProps, 'layout' | 'columns'>;

export const propertyListClassNames = (props: PropertyListClassNameProps = {}): string => {
  const layout = props.layout ?? 'inline';
  const defaultCols = layout === 'grid' ? 4 : layout === 'cards' ? 2 : undefined;
  const cols = props.columns ?? defaultCols;
  return [
    'eevenkoto-property-list',
    layout !== 'inline' ? `eevenkoto-property-list--${layout}` : '',
    (layout === 'grid' || layout === 'cards') && cols
      ? `eevenkoto-property-list--cols-${cols}`
      : '',
  ]
    .filter(Boolean)
    .join(' ');
};
