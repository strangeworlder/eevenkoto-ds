export type ContentLicense = 'proprietary' | 'open';

export interface LicenseBarLink {
  label: string;
  href: string;
}

export interface LicenseBarEntry {
  license: ContentLicense;
  links: LicenseBarLink[];
}

export type LicenseBarPlacement = 'edge' | 'inline';

export interface LicenseBarProps {
  /** Optional DOM element `id`. */
  id?: string;
  /** Which entry is shown. Default: `'proprietary'`. */
  activeLicense?: ContentLicense;
  /** `edge` pins a vertical stripe to the right viewport edge; `inline` renders a horizontal strip. Default: `'edge'`. */
  placement?: LicenseBarPlacement;
  /** One entry per license; the active one is rendered. */
  entries: LicenseBarEntry[];
  /** Text between links. Default: `' · '`. */
  separator?: string;
  /** Accessible landmark name. Default: `'License'`. */
  ariaLabel?: string;
}

export type LicenseBarClassNameProps = Pick<LicenseBarProps, 'activeLicense' | 'placement'>;

export const licenseBarClassNames = (props: LicenseBarClassNameProps = {}): string => {
  const license = props.activeLicense ?? 'proprietary';
  const placement = props.placement ?? 'edge';
  return [
    'eevenkoto-license-bar',
    license === 'open' ? 'eevenkoto-license-bar--open' : '',
    placement === 'inline' ? 'eevenkoto-license-bar--inline' : '',
  ]
    .filter(Boolean)
    .join(' ');
};
