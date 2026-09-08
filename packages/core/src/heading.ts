export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingTone = 'primary' | 'secondary';

export interface HeadingProps {
  level: HeadingLevel;
  text: string;
  tone?: HeadingTone;
  /**
   * Level 6 only: flow the heading into the following Paragraph
   * (`.eevenkoto-heading--run-in` + sibling `.eevenkoto-paragraph`).
   */
  runIn?: boolean;
}

export type HeadingClassNameProps = Pick<HeadingProps, 'level' | 'tone' | 'runIn'>;

export const headingClassNames = (props: HeadingClassNameProps): string => {
  const tone = props.tone ?? 'primary';
  const runInClass = props.runIn && props.level === 6 ? ' eevenkoto-heading--run-in' : '';
  return `eevenkoto-heading eevenkoto-heading--${props.level} eevenkoto-heading--${tone}${runInClass}`;
};
