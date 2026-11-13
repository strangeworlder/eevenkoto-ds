import {
  chipGroupClassNames,
  chipGroupLegendClassNames,
  chipGroupListClassNames,
  type ChipGroupProps,
} from '@eevenkoto/core';
import type { FieldsetHTMLAttributes, ReactElement } from 'react';
import { Chip } from '../atoms/Chip';

export type { ChipGroupProps };

export type ChipGroupComponentProps = Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'children'> &
  ChipGroupProps & {
    onSelect?: (value: string) => void;
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
  className,
  ...rest
}: ChipGroupComponentProps): ReactElement => {
  const classes = [chipGroupClassNames(), className].filter(Boolean).join(' ');

  return (
    <fieldset
      id={id}
      hidden={hidden || undefined}
      className={classes}
      data-selection-mode={mode}
      {...rest}
    >
      <legend className={chipGroupLegendClassNames(hideLegend)}>{label}</legend>
      <div className={chipGroupListClassNames()}>
        {options.map((opt) => (
          <Chip
            key={opt.value}
            label={opt.label}
            selected={opt.selected}
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
        ))}
      </div>
    </fieldset>
  );
};
