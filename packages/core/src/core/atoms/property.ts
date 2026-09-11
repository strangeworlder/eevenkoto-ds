export interface PropertyItem {
  /** Definition term for `dt` (colon is rendered by CSS). Product copy stays in the app. */
  label: string;
  /** Value shown in `dd`. */
  value: string;
}

export interface PropertyProps extends PropertyItem {}

export const propertyClassNames = (): string => 'eevenkoto-property';
