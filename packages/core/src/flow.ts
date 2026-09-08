export type FlowDensity = 'tight' | 'loose';

export interface FlowProps {
  density?: FlowDensity;
}

export const flowClassNames = (props: FlowProps = {}): string => {
  const densityClass = props.density ? ` eevenkoto-flow--${props.density}` : '';
  return `eevenkoto-flow${densityClass}`;
};
