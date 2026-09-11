import type { PropertyItem } from '../atoms/property';

export interface PropertyListProps {
  items: PropertyItem[];
}

export const propertyListClassNames = (): string => 'eevenkoto-property-list';
