export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingTone = 'primary' | 'secondary';

/** Levels that support run-in (inline into the following Paragraph). */
export const HEADING_RUN_IN_LEVELS = [3, 6] as const;
export type HeadingRunInLevel = (typeof HEADING_RUN_IN_LEVELS)[number];

export interface HeadingProps {
  level: HeadingLevel;
  text: string;
  tone?: HeadingTone;
  /**
   * Levels 3 and 6: flow the heading into the following Paragraph
   * (`.eevenkoto-heading--run-in` + sibling `.eevenkoto-paragraph`).
   */
  runIn?: boolean;
}

export type HeadingClassNameProps = Pick<HeadingProps, 'level' | 'tone' | 'runIn'>;

const isRunInLevel = (level: HeadingLevel): level is HeadingRunInLevel =>
  (HEADING_RUN_IN_LEVELS as readonly HeadingLevel[]).includes(level);

export const headingClassNames = (props: HeadingClassNameProps): string => {
  const tone = props.tone ?? 'primary';
  const runInClass = props.runIn && isRunInLevel(props.level) ? ' eevenkoto-heading--run-in' : '';
  return `eevenkoto-heading eevenkoto-heading--${props.level} eevenkoto-heading--${tone}${runInClass}`;
};
