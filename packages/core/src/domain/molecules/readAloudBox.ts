export interface ReadAloudBoxProps {
  /** Optional DOM element `id`. */
  id?: string;
  /** Accessible label for the aside (e.g. `'Read aloud'`). */
  label?: string;
  /** Decorative ornament glyph. `false` hides it. Default: `'❖'`. */
  ornament?: string | false;
  /** Plain text read-aloud copy. */
  body?: string;
  /** Trusted inline/block HTML. Takes precedence over `body`. */
  bodyHtml?: string;
}

export const readAloudBoxClassNames = (): string => 'eevenkoto-read-aloud-box';
export const readAloudBoxOrnamentClassNames = (): string => 'eevenkoto-read-aloud-box__ornament';
export const readAloudBoxBodyClassNames = (): string =>
  'eevenkoto-read-aloud-box__body eevenkoto-prose';
