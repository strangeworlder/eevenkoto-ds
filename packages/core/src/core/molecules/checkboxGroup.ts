import type { CheckboxProps } from '../atoms/checkbox';

export type CheckboxGroupLayout = 'stack' | 'grid';
export type CheckboxGroupColumns = 2 | 3;

export interface CheckboxGroupItemProps extends CheckboxProps {}

export interface CheckboxGroupProps {
  /** Legend / group label for fieldset. */
  label: string;
  /** Visually hides the legend (still accessible to assistive technologies). */
  legendVisuallyHidden?: boolean;
  /** Shared name for child checkboxes when applicable. */
  name?: string;
  /** Layout direction: 'stack' (vertical list) or 'grid'. Default: 'stack'. */
  layout?: CheckboxGroupLayout;
  /** Number of columns when layout is 'grid'. Default: 2. */
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
  const layout = props.layout ?? 'stack';
  const colClass = props.columns ? `eevenkoto-checkbox-group--grid-${props.columns}` : '';
  return [
    'eevenkoto-checkbox-group',
    `eevenkoto-checkbox-group--${layout}`,
    layout === 'grid' && colClass ? colClass : '',
  ]
    .filter(Boolean)
    .join(' ');
};

export const checkboxGroupLegendClassNames = (visuallyHidden = false): string =>
  visuallyHidden
    ? 'eevenkoto-checkbox-group__legend eevenkoto-u-visually-hidden'
    : 'eevenkoto-checkbox-group__legend';

export const checkboxGroupHeaderClassNames = (): string => 'eevenkoto-checkbox-group__header';

export const checkboxGroupListClassNames = (): string => 'eevenkoto-checkbox-group__list';

export const checkboxGroupMessageClassNames = (error = false): string =>
  error
    ? 'eevenkoto-checkbox-group__message eevenkoto-checkbox-group__message--error'
    : 'eevenkoto-checkbox-group__message';
