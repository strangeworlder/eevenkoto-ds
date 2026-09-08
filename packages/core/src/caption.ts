export type CaptionTone = 'primary' | 'secondary';

export interface CaptionProps {
  text: string;
  tone?: CaptionTone;
}

export type CaptionClassNameProps = Pick<CaptionProps, 'tone'>;

export const captionClassNames = (props: CaptionClassNameProps = {}): string => {
  const tone = props.tone ?? 'secondary';
  return `eevenkoto-caption eevenkoto-caption--${tone}`;
};
