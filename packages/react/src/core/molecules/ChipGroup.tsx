import {
  chipGroupActionClassNames,
  chipGroupClassNames,
  chipGroupHeaderClassNames,
  chipGroupLegendClassNames,
  chipGroupListClassNames,
  type ChipGroupProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { Chip } from '../atoms/Chip';

export type { ChipGroupProps };

export type ChipGroupComponentProps = Omit<
  HTMLAttributes<HTMLElement>,
  'children' | 'onSelect'
> &
  ChipGroupProps & {
    onSelect?: (value: string) => void;
    /** Optional trailing action in the group header (e.g. a refresh `Button`). */
    headerAction?: ReactNode;
  };

export const ChipGroup = ({
  id,
  label,
  hideLegend,
  mode = 'single',
  size = 'sm',
  hidden,
  options,
  onSelect,
  headerAction,
  className,
  ...rest
}: ChipGroupComponentProps): ReactElement => {
  const classes = [chipGroupClassNames(), className].filter(Boolean).join(' ');
  const chipNodes = options.map((opt) => (
    <Chip
      key={opt.value}
      label={opt.label}
      selected={mode === 'action' ? false : opt.selected}
      disabled={opt.disabled}
      size={size}
      icon={opt.icon}
      swatchColor={opt.swatchColor}
      href={opt.href}
      data-value={opt.value}
      title={opt.title}
      onClick={onSelect ? () => onSelect(opt.value) : undefined}
      {...(opt.attributes as Record<string, string | boolean | undefined>)}
    />
  ));

  if (headerAction != null) {
    const labelId = id ? `${id}-label` : undefined;
    return (
      <div
        id={id}
        hidden={hidden || undefined}
        className={classes}
        role="group"
        aria-labelledby={labelId}
        aria-label={labelId ? undefined : label}
        data-selection-mode={mode}
        {...rest}
      >
        <div className={chipGroupHeaderClassNames()}>
          <span id={labelId} className={chipGroupLegendClassNames(hideLegend)}>
            {label}
          </span>
          <div className={chipGroupActionClassNames()}>{headerAction}</div>
        </div>
        <div className={chipGroupListClassNames()}>{chipNodes}</div>
      </div>
    );
  }

  return (
    <fieldset
      id={id}
      hidden={hidden || undefined}
      className={classes}
      data-selection-mode={mode}
      {...rest}
    >
      <legend className={chipGroupLegendClassNames(hideLegend)}>{label}</legend>
      <div className={chipGroupListClassNames()}>{chipNodes}</div>
    </fieldset>
  );
};
