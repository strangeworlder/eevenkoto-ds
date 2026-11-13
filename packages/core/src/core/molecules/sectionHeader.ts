import type { IconName } from '../../tokens/icons';

export type SectionHeaderAlign = 'start' | 'center';
export type SectionHeaderTitleLevel = 1 | 2 | 3;

export interface SectionHeaderLogo {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
}

export interface SectionHeaderNote {
  icon?: IconName;
  text?: string;
  html?: string;
}

export interface SectionHeaderProps {
  /** Optional DOM element `id` on `<header>`. */
  id?: string;
  /** Optional uppercase eyebrow kicker above title/logo. */
  eyebrow?: string;
  /** Section or hero heading text. */
  title?: string;
  /** Trusted inline HTML for the heading. Takes precedence over `title`. */
  titleHtml?: string;
  /** Semantic heading level (`1 | 2 | 3`). Default: `2`. */
  titleLevel?: SectionHeaderTitleLevel;
  /** Optional brand/display logo rendered in the header lockup. */
  logo?: SectionHeaderLogo;
  /** Lead paragraph copy below heading. */
  lead?: string;
  /** Trusted inline HTML for the lead paragraph. Takes precedence over `lead`. */
  leadHtml?: string;
  /** Horizontal alignment. Default: `'start'`. */
  align?: SectionHeaderAlign;
  /** Optional secondary reassurance/meta note below actions. */
  note?: SectionHeaderNote;
}

export type SectionHeaderClassNameProps = Pick<SectionHeaderProps, 'align'>;

export const sectionHeaderClassNames = (props: SectionHeaderClassNameProps = {}): string =>
  props.align === 'center'
    ? 'eevenkoto-section-header eevenkoto-section-header--center'
    : 'eevenkoto-section-header';
