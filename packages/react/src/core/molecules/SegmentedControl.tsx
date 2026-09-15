import {
  resolveSegmentedControlOptionTone,
  segmentedControlClassNames,
  segmentedControlOptionClassNames,
  type SegmentedControlProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement } from 'react';

export type { SegmentedControlProps };

export type SegmentedControlComponentProps = Omit<
  HTMLAttributes<HTMLElement>,
  'children' | 'onChange'
> &
  SegmentedControlProps & {
    /** Fired when a radio option is chosen (radios mode only). */
    onChange?: (id: string) => void;
  };

export const SegmentedControl = ({
  options,
  selectedId,
  mode = 'radios',
  name = 'eevenkoto-segmented',
  tone,
  size,
  label,
  className,
  onChange,
  ...rest
}: SegmentedControlComponentProps): ReactElement => {
  const classes = [segmentedControlClassNames({ size, mode }), className]
    .filter(Boolean)
    .join(' ');

  if (mode === 'links') {
    return (
      <nav className={classes} aria-label={label} {...rest}>
        {options.map((option) => {
          const selected = option.id === selectedId;
          const optionTone = resolveSegmentedControlOptionTone(option.tone, tone);
          return (
            <a
              key={option.id}
              className={segmentedControlOptionClassNames({
                tone: optionTone,
                selected,
              })}
              href={option.href ?? '#'}
              aria-current={selected ? 'page' : undefined}
              aria-disabled={option.disabled || undefined}
              tabIndex={option.disabled ? -1 : undefined}
              onClick={option.disabled ? (event) => event.preventDefault() : undefined}
            >
              <span className="eevenkoto-segmented-control__label">{option.label}</span>
            </a>
          );
        })}
      </nav>
    );
  }

  return (
    <fieldset className={classes} {...rest}>
      {label ? <legend className="eevenkoto-visually-hidden">{label}</legend> : null}
      {options.map((option) => {
        const selected = option.id === selectedId;
        const optionTone = resolveSegmentedControlOptionTone(option.tone, tone);
        const inputId = `${name}-${option.id}`;
        return (
          <label
            key={option.id}
            className={segmentedControlOptionClassNames({
              tone: optionTone,
              selected: false,
            })}
            htmlFor={inputId}
          >
            <input
              className="eevenkoto-segmented-control__input"
              type="radio"
              id={inputId}
              name={name}
              value={option.id}
              defaultChecked={selected}
              disabled={option.disabled}
              onChange={() => onChange?.(option.id)}
            />
            <span className="eevenkoto-segmented-control__label">{option.label}</span>
          </label>
        );
      })}
    </fieldset>
  );
};
