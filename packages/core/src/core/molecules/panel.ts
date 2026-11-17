export type PanelSurface = 'sunken' | 'subtle' | 'raised';
export type PanelDensity = 'default' | 'compact';
export type PanelTitleLevel = 2 | 3 | 4;

export interface PanelProps {
  /** Optional DOM element `id` on host `<div>` / `<section>`. */
  id?: string;
  /** Accessible landmark label; when set, renders `<section role="region" aria-label={label}>`. */
  label?: string;
  /** Surface fill tier. Default: `'sunken'`. */
  surface?: PanelSurface;
  /** Padding/spacing density. Default: `'default'`. */
  density?: PanelDensity;
  /** Optional header title. */
  title?: string;
  /** Heading level for `title`. Default: `3`. */
  titleLevel?: PanelTitleLevel;
  /** Hides the panel (`hidden` attribute). Default: `false`. */
  hidden?: boolean;
  /** Plain-text body copy. */
  body?: string;
  /** Trusted pre-rendered HTML body copy. */
  bodyHtml?: string;
}

export type PanelClassNameProps = Pick<PanelProps, 'surface' | 'density'>;

export const panelClassNames = (props: PanelClassNameProps = {}): string => {
  const surface = props.surface ?? 'sunken';
  const density = props.density ?? 'default';
  return [
    'eevenkoto-panel',
    surface !== 'sunken' ? `eevenkoto-panel--surface-${surface}` : '',
    density === 'compact' ? 'eevenkoto-panel--compact' : '',
  ]
    .filter(Boolean)
    .join(' ');
};

export const panelHeaderClassNames = (): string => 'eevenkoto-panel__header';
export const panelHeaderLeadClassNames = (): string => 'eevenkoto-panel__header-lead';
export const panelTitleClassNames = (): string => 'eevenkoto-panel__title';
export const panelHeaderActionsClassNames = (): string => 'eevenkoto-panel__header-actions';
export const panelBodyClassNames = (): string => 'eevenkoto-panel__body eevenkoto-prose';
