import type { IconName } from '../../tokens/icons';

export type WorkshopLayout = 'split' | 'inline';
export type WorkshopSticky = 'preview' | 'controls' | 'none';
export type WorkshopTitleLevel = 2 | 3;

export interface WorkshopProps {
  /** Optional custom id for the root workshop element. */
  id?: string;
  /** Optional custom id suffix (`workshop${idSuffix}`) when `id` is omitted. */
  idSuffix?: string;
  /** Accessible landmark label when rendered as `<section>`. */
  label?: string;
  /**
   * Chassis geometry: `'split'` (2-column workbench, default) or `'inline'`
   * (single-column prose-width generator card).
   */
  layout?: WorkshopLayout;
  /**
   * Sticky column behavior. Defaults to `'preview'` in `'split'` layout and
   * `'none'` in `'inline'` layout.
   */
  sticky?: WorkshopSticky;
  /** Optional leading decorative glyph in the structured header lockup (e.g. `'dice'`). */
  icon?: IconName;
  /** Optional structured header title (rendered when `header` slot/prop is omitted or alongside it). */
  title?: string;
  /** Semantic heading level for `title`. Default: `2`. */
  titleLevel?: WorkshopTitleLevel;
  /** Optional muted subtitle below `title`. */
  subtitle?: string;
  /** Optional CSS length/track override for `--eevenkoto-workshop-controls-width` (e.g. `'22rem'` or `'minmax(0, 1fr)'`). */
  controlsWidth?: string;
  /** Header bar content (mode switch, title, preset selector). */
  header?: string;
  /** Controls column content (or default slot/children in frameworks). */
  controls?: string;
  /** Sunken summary/export bar above the preview region. */
  toolbar?: string;
  /** Live preview column/region content (statblock, spellblock, equipment block, rolled output, etc.). */
  preview?: string;
  /** Top-bordered quick-pick or secondary footer tray below body. */
  footer?: string;
}

export type WorkshopClassNameProps = Pick<WorkshopProps, 'layout' | 'sticky'>;

export const workshopClassNames = (props: WorkshopClassNameProps = {}): string => {
  const layout = props.layout ?? 'split';
  const sticky = props.sticky ?? (layout === 'inline' ? 'none' : 'preview');
  return [
    'eevenkoto-workshop',
    layout === 'inline' ? 'eevenkoto-workshop--inline' : '',
    sticky === 'controls' ? 'eevenkoto-workshop--sticky-controls' : '',
    sticky === 'none' && layout === 'split' ? 'eevenkoto-workshop--sticky-none' : '',
    sticky === 'preview' && layout === 'inline' ? 'eevenkoto-workshop--sticky-preview' : '',
  ]
    .filter(Boolean)
    .join(' ');
};

export const workshopHeaderClassNames = (): string => 'eevenkoto-workshop__header';

export const workshopBodyClassNames = (): string => 'eevenkoto-workshop__body';

export const workshopControlsClassNames = (): string => 'eevenkoto-workshop__controls';

export const workshopPreviewClassNames = (): string => 'eevenkoto-workshop__preview';

export const workshopToolbarClassNames = (): string => 'eevenkoto-workshop__toolbar';

export const workshopFooterClassNames = (): string => 'eevenkoto-workshop__footer';

export const workshopControlGroupClassNames = (): string =>
  'eevenkoto-workshop__control-group';

export const workshopGroupHeaderClassNames = (): string =>
  'eevenkoto-workshop__group-header';

export const workshopGroupLabelClassNames = (): string =>
  'eevenkoto-workshop__group-label';

export const workshopGroupHintClassNames = (): string =>
  'eevenkoto-workshop__group-hint';

export const workshopSubgroupTitleClassNames = (): string =>
  'eevenkoto-workshop__subgroup-title';
