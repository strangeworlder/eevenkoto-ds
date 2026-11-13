import { progressBarClassNames, progressBarFillClassNames, type ProgressBarProps } from '@eevenkoto/core';
import type { CSSProperties, HTMLAttributes, ReactElement } from 'react';

export type { ProgressBarProps };

export type ProgressBarComponentProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  ProgressBarProps;

export const ProgressBar = ({
  id,
  active,
  tone,
  fixed,
  label = 'Loading',
  value,
  className,
  style,
  ...rest
}: ProgressBarComponentProps): ReactElement => {
  const determinate = typeof value === 'number' && Number.isFinite(value);
  const clamped = determinate ? Math.min(100, Math.max(0, value as number)) : undefined;
  const classes = [progressBarClassNames({ active, tone, fixed }), className]
    .filter(Boolean)
    .join(' ');
  const mergedStyle =
    clamped !== undefined
      ? ({ '--eevenkoto-progress-bar-scale': clamped / 100, ...style } as CSSProperties)
      : style;

  return (
    <div
      id={id}
      className={classes}
      role="progressbar"
      aria-label={label}
      aria-busy={active ? true : undefined}
      aria-hidden={active ? undefined : true}
      aria-valuemin={clamped !== undefined ? 0 : undefined}
      aria-valuemax={clamped !== undefined ? 100 : undefined}
      aria-valuenow={clamped}
      style={mergedStyle}
      {...rest}
    >
      <div className={progressBarFillClassNames()} />
    </div>
  );
};
