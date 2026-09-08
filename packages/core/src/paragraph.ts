export type ParagraphSize = 'sm' | 'md' | 'lg';
export type ParagraphTone = 'primary' | 'secondary';

export interface ParagraphProps {
  text: string;
  size?: ParagraphSize;
  tone?: ParagraphTone;
}

export type ParagraphClassNameProps = Pick<ParagraphProps, 'size' | 'tone'>;

export const paragraphClassNames = (props: ParagraphClassNameProps = {}): string => {
  const size = props.size ?? 'md';
  const tone = props.tone ?? 'primary';
  return `eevenkoto-paragraph eevenkoto-paragraph--${size} eevenkoto-paragraph--${tone}`;
};
