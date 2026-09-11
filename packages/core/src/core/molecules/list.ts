import type { ListItemProps } from '../atoms/listItem';

export type ListVariant = 'unordered' | 'ordered';
export type ListSize = 'sm' | 'md' | 'lg';
export type ListTone = 'primary' | 'secondary';

export interface ListProps {
  items: ListItemProps[];
  variant?: ListVariant;
  size?: ListSize;
  tone?: ListTone;
}

export type ListClassNameProps = Pick<ListProps, 'variant' | 'size' | 'tone'>;

export const listClassNames = (props: ListClassNameProps = {}): string => {
  const variant = props.variant ?? 'unordered';
  const size = props.size ?? 'md';
  const tone = props.tone ?? 'primary';
  return `eevenkoto-list eevenkoto-list--${variant} eevenkoto-list--${size} eevenkoto-list--${tone}`;
};
