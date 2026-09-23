import {
  inlineRefClassNames,
  type InlineRefClassNameProps,
  type InlineRefProps,
} from '../../core/atoms/inlineRef';

/** Closed set of referenced entity kinds. */
export type EntityRefKind =
  | 'condition'
  | 'mechanic'
  | 'classFeature'
  | 'class'
  | 'spell'
  | 'item'
  | 'creature';

export interface EntityRefProps extends InlineRefProps {
  /** Entity kind (closed set). Default: item */
  kind?: EntityRefKind;
}

export type EntityRefClassNameProps = Pick<EntityRefProps, 'kind'> & InlineRefClassNameProps;

/** Kind → BEM modifier (kebab-case). */
export const ENTITY_REF_MODIFIERS: Record<EntityRefKind, string> = {
  condition: 'condition',
  mechanic: 'mechanic',
  classFeature: 'class-feature',
  class: 'class',
  spell: 'spell',
  item: 'item',
  creature: 'creature',
};

/**
 * Domain host on top of Core InlineRef chrome.
 * Always includes `eevenkoto-inline-ref` so shared pad/hover/underline apply.
 */
export const entityRefClassNames = (props: EntityRefClassNameProps = {}): string => {
  const kind = props.kind ?? 'item';
  return [
    inlineRefClassNames(props),
    'eevenkoto-entity-ref',
    `eevenkoto-entity-ref--${ENTITY_REF_MODIFIERS[kind]}`,
  ].join(' ');
};
