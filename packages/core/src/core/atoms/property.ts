export type PropertySpan = 'auto' | 'full';

export interface PropertyItem {
  /** Optional DOM element `id` on `.eevenkoto-property`. */
  id?: string;
  /** Definition term for `dt` (colon is rendered by CSS in inline/divided layouts). Product copy stays in the app. */
  label: string;
  /** Plain-text value shown in `dd`. Optional when `valueHtml` is set. */
  value?: string;
  /**
   * Trusted pre-rendered inline HTML for `dd` (e.g. `renderInlineRef`, `renderEntityRef`,
   * `<em>`/`<strong>` from a Markdown compiler). Takes precedence over `value`.
   */
  valueHtml?: string;
  /** Optional secondary metadata line(s) stacked below `value` (used in `grid` and `cards` layouts). */
  meta?: string | string[];
  /** Emphasizes the property with symmetrical brass letterpress rules (replaces legacy left-bar callouts). Default: `false`. */
  emphasized?: boolean;
  /** Column span inside multi-column `grid` or `cards` `PropertyList`. Default: `'auto'`. */
  span?: PropertySpan;
  /** Hides the property row (`hidden` attribute). Default: `false`. */
  hidden?: boolean;
}

export interface PropertyProps extends PropertyItem {}

export type PropertyClassNameProps = Pick<PropertyProps, 'emphasized' | 'span'>;

export const propertyClassNames = (props: PropertyClassNameProps = {}): string =>
  [
    'eevenkoto-property',
    props.emphasized ? 'eevenkoto-property--emphasized' : '',
    props.span === 'full' ? 'eevenkoto-property--span-full' : '',
  ]
    .filter(Boolean)
    .join(' ');
export const propertyMetaClassNames = (): string => 'eevenkoto-property__meta';
