export interface PropertyItem {
  /** Definition term for `dt` (colon is rendered by CSS). Product copy stays in the app. */
  label: string;
  /** Plain-text value shown in `dd`. Optional when `valueHtml` is set. */
  value?: string;
  /**
   * Trusted pre-rendered inline HTML for `dd` (e.g. `renderInlineRef`, `renderEntityRef`,
   * `<em>`/`<strong>` from a Markdown compiler). Takes precedence over `value`.
   */
  valueHtml?: string;
}

export interface PropertyProps extends PropertyItem {}

export const propertyClassNames = (): string => 'eevenkoto-property';
