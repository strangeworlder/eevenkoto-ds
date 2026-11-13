export type CaptionTone = 'primary' | 'secondary' | 'accent';
export type CaptionVariant = 'default' | 'eyebrow';

export interface CaptionProps {
  text: string;
  tone?: CaptionTone;
  /** Typographic treatment. `'eyebrow'` renders tracked uppercase kicker text. Default: `'default'`. */
  variant?: CaptionVariant;
}

export type CaptionClassNameProps = Pick<CaptionProps, 'tone' | 'variant'>;

export const captionClassNames = (props: CaptionClassNameProps = {}): string => {
  const tone = props.tone ?? 'secondary';
  const variantClass = props.variant === 'eyebrow' ? ' eevenkoto-caption--eyebrow' : '';
  return `eevenkoto-caption eevenkoto-caption--${tone}${variantClass}`;
};
