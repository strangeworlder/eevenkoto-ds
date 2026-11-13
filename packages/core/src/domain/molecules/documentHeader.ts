import type { BadgeIntent } from '../../core/atoms/badge';
import type { SegmentedControlOption } from '../../core/molecules/segmentedControl';
import type { ContentLicense } from './licenseBar';

export interface DocumentHeaderProps {
  /** Optional DOM element `id` on `<header>`. */
  id?: string;
  /** Show a segmented control to switch between license editions. Default: `false`. */
  showLicenseToggle?: boolean;
  /** Which license edition the document belongs to. Default: `'proprietary'`. */
  selectedLicense?: ContentLicense;
  /** Options for the license toggle (links to alternate editions). */
  licenseOptions?: SegmentedControlOption[];
  /** Accessible name for the toggle. */
  licenseLabel?: string;
  /** Optional readiness badge label. */
  readinessLabel?: string;
  /** Intent for the readiness badge. Default: `'neutral'`. */
  readinessIntent?: BadgeIntent;
}

export type DocumentHeaderClassNameProps = Pick<DocumentHeaderProps, 'selectedLicense'>;

export const documentHeaderClassNames = (props: DocumentHeaderClassNameProps = {}): string =>
  props.selectedLicense === 'open'
    ? 'eevenkoto-document-header eevenkoto-document-header--open'
    : 'eevenkoto-document-header';
