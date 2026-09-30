import type { RadioProps } from '../atoms/radio';

export type RadioGroupLayout = 'stack' | 'grid';
export type RadioGroupColumns = 2 | 3;

export interface RadioGroupOptionProps extends Omit<RadioProps, 'name'> {}

export interface RadioGroupProps {
  /** Form name attribute applied to all radio options in the group. */
  name: string;
  /** Legend / group label for fieldset. */
  label: string;
  /** Visually hides the legend (still accessible to assistive technologies). */
  legendVisuallyHidden?: boolean;
  /** Currently selected value (controlled). */
  value?: string;
  /** Default selected value (uncontrolled). */
  defaultValue?: string;
  /** Layout direction: 'stack' (vertical list) or 'grid'. Default: 'stack'. */
  layout?: RadioGroupLayout;
  /** Number of columns when layout is 'grid'. Default: 2. */
  columns?: RadioGroupColumns;
  /** Shared variant for all options ('default', 'card', or 'tile'). */
  variant?: RadioProps['variant'];
  /** Optional hint message. */
  hint?: string;
  /** Error message below the group. */
  error?: string;
  /** Optional badge text displayed in group header. */
  badge?: string;
  /** Intent of the badge. Default: 'neutral'. */
  badgeIntent?: 'neutral' | 'critical';
  /** List of options when rendered declaratively. */
  options?: RadioGroupOptionProps[];
}

export type RadioGroupClassNameProps = Pick<RadioGroupProps, 'layout' | 'columns'>;

export const radioGroupClassNames = (props: RadioGroupClassNameProps = {}): string => {
  const layout = props.layout ?? 'stack';
  const colClass = props.columns ? `eevenkoto-radio-group--grid-${props.columns}` : '';
  return [
    'eevenkoto-radio-group',
    `eevenkoto-radio-group--${layout}`,
    layout === 'grid' && colClass ? colClass : '',
  ]
    .filter(Boolean)
    .join(' ');
};

export const radioGroupLegendClassNames = (visuallyHidden = false): string =>
  visuallyHidden
    ? 'eevenkoto-radio-group__legend eevenkoto-u-visually-hidden'
    : 'eevenkoto-radio-group__legend';

export const radioGroupHeaderClassNames = (): string => 'eevenkoto-radio-group__header';

export const radioGroupListClassNames = (): string => 'eevenkoto-radio-group__list';

export const radioGroupMessageClassNames = (error = false): string =>
  error
    ? 'eevenkoto-radio-group__message eevenkoto-radio-group__message--error'
    : 'eevenkoto-radio-group__message';
