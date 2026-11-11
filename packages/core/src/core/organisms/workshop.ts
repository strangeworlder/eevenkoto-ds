export interface WorkshopProps {
  /** Optional custom id for the root workshop element. */
  id?: string;
  /** Optional custom id suffix (`workshop${idSuffix}`) when `id` is omitted. */
  idSuffix?: string;
  /**Accessible landmark label when rendered as `<section>`. */
  label?: string;
  /** Optional CSS length/track override for `--eevenkoto-workshop-controls-width` (e.g. `'22rem'` or `'minmax(0, 1fr)'`). */
  controlsWidth?: string;
  /** Header bar content (mode switch, title, preset selector). */
  header?: string;
  /** Controls column content (or default slot/children in frameworks). */
  controls?: string;
  /** Sticky preview column content (statblock, spellblock, equipment block, encounter summary, etc.). */
  preview?: string;
}

export const workshopClassNames = (): string => 'eevenkoto-workshop';

export const workshopHeaderClassNames = (): string => 'eevenkoto-workshop__header';

export const workshopBodyClassNames = (): string => 'eevenkoto-workshop__body';

export const workshopControlsClassNames = (): string => 'eevenkoto-workshop__controls';

export const workshopPreviewClassNames = (): string => 'eevenkoto-workshop__preview';

export const workshopControlGroupClassNames = (): string =>
  'eevenkoto-workshop__control-group';

export const workshopGroupHeaderClassNames = (): string =>
  'eevenkoto-workshop__group-header';

export const workshopGroupLabelClassNames = (): string =>
  'eevenkoto-workshop__group-label';

export const workshopGroupHintClassNames = (): string =>
  'eevenkoto-workshop__group-hint';
