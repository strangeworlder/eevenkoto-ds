export type ProgressBarTone = 'primary' | 'accent';

export interface ProgressBarProps {
  /** Optional DOM element `id`. */
  id?: string;
  /** Whether the progress indicator is active/visible. Default: `false`. */
  active?: boolean;
  /** Color intent (`'primary'` = turquoise, `'accent'` = gold). Default: `'primary'`. */
  tone?: ProgressBarTone;
  /** Pin as a `0.3rem` top-viewport bar at `--eevenkoto-z-toast`. Default: `false`. */
  fixed?: boolean;
  /** Accessible name for `role="progressbar"`. Default: `'Loading'`. */
  label?: string;
  /** Determinate percentage (`0`–`100`). Omit for indeterminate navigation progress. */
  value?: number;
}

export type ProgressBarClassNameProps = Pick<ProgressBarProps, 'active' | 'tone' | 'fixed'>;

export const progressBarClassNames = (props: ProgressBarClassNameProps = {}): string => {
  const tone = props.tone ?? 'primary';
  return [
    'eevenkoto-progress-bar',
    tone === 'accent' ? 'eevenkoto-progress-bar--accent' : '',
    props.fixed ? 'eevenkoto-progress-bar--fixed' : '',
    props.active ? 'eevenkoto-progress-bar--active' : '',
  ]
    .filter(Boolean)
    .join(' ');
};

export const progressBarFillClassNames = (): string => 'eevenkoto-progress-bar__fill';
