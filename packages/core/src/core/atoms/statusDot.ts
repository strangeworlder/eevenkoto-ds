import type { BadgeIntent } from './badge';

export type StatusDotIntent = BadgeIntent;

export interface StatusDotProps {
  /** Feedback intent. Default: neutral (host class alone). */
  intent?: StatusDotIntent;
  /**
   * Accessible name (required for AT — the pip has no visible text).
   * Override when the surrounding UI is localized (`Valmis`, `Vedos`, …).
   */
  label: string;
}

export type StatusDotClassNameProps = Pick<StatusDotProps, 'intent'>;

export const statusDotClassNames = (props: StatusDotClassNameProps = {}): string => {
  const intent = props.intent ?? 'neutral';
  return `eevenkoto-status-dot eevenkoto-status-dot--${intent}`;
};
