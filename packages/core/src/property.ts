export interface PropertyItem {
  /** Term label (colon is rendered by CSS). Product copy stays in the app. */
  label: string;
  /** Detail text for the term. */
  value: string;
}

export interface PropertyProps extends PropertyItem {}

export interface PropertyListProps {
  items: PropertyItem[];
}

export const propertyClassNames = (): string => 'eevenkoto-property';

export const propertyListClassNames = (): string => 'eevenkoto-property-list';
