export interface PropertyItem {
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
}

export interface PropertyProps extends PropertyItem {}

export const propertyClassNames = (): string => 'eevenkoto-property';
export const propertyMetaClassNames = (): string => 'eevenkoto-property__meta';
