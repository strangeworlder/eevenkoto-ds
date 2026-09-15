export type SegmentedControlTone = 'primary' | 'secondary';
export type SegmentedControlSize = 'sm' | 'md';
/**
 * `radios` — in-page exclusive choice (native radios; works without JS via `:checked`).
 * `links` — navigate between alternate documents (e.g. Full text ↔ Short SRD).
 */
export type SegmentedControlMode = 'radios' | 'links';

export interface SegmentedControlOption {
  /** Stable option id (radio `value` / React key). */
  id: string;
  /** Visible label. */
  label: string;
  /** Required when `mode` is `links`. */
  href?: string;
  /** When true, option is non-interactive. */
  disabled?: boolean;
  /**
   * Selected fill tone for this option.
   * Falls back to the host `tone` (default primary).
   */
  tone?: SegmentedControlTone;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  /**
   * Markup mode. Default: `radios` (no-JS in-page selection).
   * Use `links` when options navigate to alternate page URLs.
   */
  mode?: SegmentedControlMode;
  /**
   * Selected option id.
   * - `radios`: sets the initial `checked` radio only (selection then follows the browser;
   *   do not paint `--selected` — that would stick after a native change).
   * - `links`: marks that option with `aria-current="page"` + `--selected`.
   */
  selectedId?: string;
  /** Shared `name` for the radio group. Required for `radios`. */
  name?: string;
  /** Default option tone when an option omits `tone`. Default: primary */
  tone?: SegmentedControlTone;
  /** Shared control size ladder. Default: md */
  size?: SegmentedControlSize;
  /** Accessible name (fieldset legend / nav aria-label). */
  label?: string;
}

export type SegmentedControlClassNameProps = Pick<SegmentedControlProps, 'size' | 'mode'>;

export const segmentedControlClassNames = (
  props: SegmentedControlClassNameProps = {},
): string => {
  const size = props.size ?? 'md';
  const mode = props.mode ?? 'radios';
  return [
    'eevenkoto-segmented-control',
    `eevenkoto-segmented-control--${size}`,
    `eevenkoto-segmented-control--${mode}`,
  ].join(' ');
};

export type SegmentedControlOptionClassNameProps = {
  /** Option tone (selected fill). Default: primary */
  tone?: SegmentedControlTone;
  /**
   * When true, emit `--selected` (links mode only).
   * Radios must rely on `:checked` alone so the previous option clears without JS.
   */
  selected?: boolean;
};

export const segmentedControlOptionClassNames = (
  props: SegmentedControlOptionClassNameProps = {},
): string => {
  const tone = props.tone ?? 'primary';
  const parts = [
    'eevenkoto-segmented-control__option',
    `eevenkoto-segmented-control__option--${tone}`,
  ];
  if (props.selected) {
    parts.push('eevenkoto-segmented-control__option--selected');
  }
  return parts.join(' ');
};

/** Resolve an option’s tone against the host default. */
export const resolveSegmentedControlOptionTone = (
  optionTone: SegmentedControlTone | undefined,
  hostTone: SegmentedControlTone | undefined,
): SegmentedControlTone => optionTone ?? hostTone ?? 'primary';
