export interface InlineRefProps {
  /** Visible reference name. */
  name: string;
  /** When set, the reference renders as a link. Ignored when `unlinked` is true. */
  href?: string;
  /**
   * Known term without a destination. Always a `<span>`: italic + dotted
   * underline, not a link. Replaces product `.unlinked-term`.
   */
  unlinked?: boolean;
  /**
   * Trailing lock glyph (gated destination). May combine with `href`.
   * Replaces product `.tooltip-ref-locked`.
   */
  locked?: boolean;
  /**
   * Accessible name for the lock mark. Default: `Locked`.
   * Override when the surrounding UI is localized.
   */
  lockedLabel?: string;
}

export type InlineRefClassNameProps = Pick<InlineRefProps, 'unlinked' | 'locked'>;

export const inlineRefClassNames = (props: InlineRefClassNameProps = {}): string =>
  [
    'eevenkoto-inline-ref',
    props.unlinked ? 'eevenkoto-inline-ref--unlinked' : '',
    props.locked ? 'eevenkoto-inline-ref--locked' : '',
  ]
    .filter(Boolean)
    .join(' ');

export const inlineRefLabelClassNames = (): string => 'eevenkoto-inline-ref__label';

export const inlineRefLockClassNames = (): string => 'eevenkoto-inline-ref__lock';

export const inlineRefLockIconClassNames = (): string => 'eevenkoto-inline-ref__lock-icon';
