import { licenseBarClassNames, type LicenseBarProps } from '@eevenkoto/core';
import { Fragment, type HTMLAttributes, type ReactElement } from 'react';

export type { LicenseBarProps };

export type LicenseBarComponentProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & LicenseBarProps;

export const LicenseBar = ({
  id,
  activeLicense,
  placement,
  entries,
  separator = ' · ',
  ariaLabel = 'License',
  className,
  ...rest
}: LicenseBarComponentProps): ReactElement => {
  const active = activeLicense ?? 'proprietary';
  const classes = [licenseBarClassNames({ activeLicense, placement }), className]
    .filter(Boolean)
    .join(' ');

  return (
    <aside id={id} className={classes} aria-label={ariaLabel} {...rest}>
      {entries.map((entry) => {
        const isActive = entry.license === active;
        return (
          <span
            key={entry.license}
            className={`eevenkoto-license-bar__entry${isActive ? ' eevenkoto-license-bar__entry--active' : ''}`}
            data-content-license={entry.license}
            hidden={!isActive}
          >
            {entry.links.map((link, index) => (
              <Fragment key={`${link.label}-${index}`}>
                {index > 0 ? separator : null}
                {link.href ? <a href={link.href}>{link.label}</a> : <span>{link.label}</span>}
              </Fragment>
            ))}
          </span>
        );
      })}
    </aside>
  );
};