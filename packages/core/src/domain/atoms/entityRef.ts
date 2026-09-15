/** Closed set of referenced entity kinds. */
export type EntityRefKind = 'condition' | 'mechanic' | 'classFeature' | 'spell' | 'item';

export interface EntityRefProps {
  /** Entity kind (closed set). Default: item */
  kind?: EntityRefKind;
  /** Visible entity name. */
  name: string;
  /** When set, the reference renders as a link. */
  href?: string;
}

export type EntityRefClassNameProps = Pick<EntityRefProps, 'kind'>;

/** Kind → BEM modifier (kebab-case). */
export const ENTITY_REF_MODIFIERS: Record<EntityRefKind, string> = {
  condition: 'condition',
  mechanic: 'mechanic',
  classFeature: 'class-feature',
  spell: 'spell',
  item: 'item',
};

/**
 * Domain host on top of Core InlineRef chrome.
 * Always includes `eevenkoto-inline-ref` so shared pad/hover/underline apply.
 */
export const entityRefClassNames = (props: EntityRefClassNameProps = {}): string => {
  const kind = props.kind ?? 'item';
  return `eevenkoto-inline-ref eevenkoto-entity-ref eevenkoto-entity-ref--${ENTITY_REF_MODIFIERS[kind]}`;
};
