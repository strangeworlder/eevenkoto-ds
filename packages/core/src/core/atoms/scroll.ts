export type ScrollAxis = 'x' | 'y' | 'both';

export interface ScrollClassNameProps {
  /** Overflow axis. Defaults to `x` (wide tables). */
  axis?: ScrollAxis;
}

export interface ScrollProps extends ScrollClassNameProps {}

export const scrollClassNames = (props: ScrollClassNameProps = {}): string => {
  const axis = props.axis ?? 'x';
  return `eevenkoto-scroll eevenkoto-scroll--${axis}`;
};
