import type { CheckboxProps } from '../atoms/checkbox';

export type CheckboxGroupLayout = 'stack' | 'grid';
export type CheckboxGroupColumns = 2 | 3;

export interface CheckboxGroupItemProps extends CheckboxProps {}

export interface CheckboxGroupProps {
  /** Legend / group label for fieldset. */
  label: string;
  /** Visually hides the legend (still accessible to assistive technologies). */
  legendVisuallyHidden?: boolean;
  /** Alias for `legendVisuallyHidden`. */
  hideLegend?: boolean;
  /** Shared name for child checkboxes when applicable. */
  name?: string;
  /** Layout direction: 'stack' (vertical list) or 'grid'. Default: 'stack' (or 'grid' when `columns` is set). */
  layout?: CheckboxGroupLayout;
  /** Number of columns when layout is 'grid' (infers `layout: 'grid'` when set). Default: 2. */
  columns?: CheckboxGroupColumns;
  /** Optional secondary hint below the legend or group. */
  hint?: string;
  /** Error message below the group. */
  error?: string;
  /** Optional badge text displayed in group header (e.g. "2 / 3 käytetty"). */
  badge?: string;
  /** Intent of the badge. Default: 'neutral'. */
  badgeIntent?: 'neutral' | 'critical';
  /** List of items when rendered declaratively. */
  items?: CheckboxGroupItemProps[];
}

export type CheckboxGroupClassNameProps = Pick<CheckboxGroupProps, 'layout' | 'columns'>;

export const checkboxGroupClassNames = (props: CheckboxGroupClassNameProps = {}): string => {
  const layout = props.layout ?? (props.columns ? 'grid' : 'stack');
  const colClass = layout === 'grid' ? `eevenkoto-checkbox-group--grid-${props.columns ?? 2}` : '';
  return ['eevenkoto-checkbox-group', `eevenkoto-checkbox-group--${layout}`, colClass]
    .filter(Boolean)
    .join(' ');
};

export const checkboxGroupLegendClassNames = (visuallyHidden = false): string =>
  visuallyHidden
    ? 'eevenkoto-checkbox-group__legend eevenkoto-visually-hidden'
    : 'eevenkoto-checkbox-group__legend';

export const checkboxGroupHeaderClassNames = (): string => 'eevenkoto-checkbox-group__header';

export const checkboxGroupListClassNames = (): string => 'eevenkoto-checkbox-group__list';

export const checkboxGroupMessageClassNames = (error = false): string =>
  error
    ? 'eevenkoto-checkbox-group__message eevenkoto-checkbox-group__message--error'
    : 'eevenkoto-checkbox-group__message';
