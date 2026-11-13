import { documentHeaderClassNames, type DocumentHeaderProps } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { Badge } from '../../core/atoms/Badge';
import { SegmentedControl } from '../../core/molecules/SegmentedControl';

export type { DocumentHeaderProps };

export type DocumentHeaderComponentProps = Omit<HTMLAttributes<HTMLElement>, 'children' | 'onChange'> &
  DocumentHeaderProps & {
    /** Heading content (e.g. an `<h1>`). */
    children?: ReactNode;
    /** Fired when the license toggle changes. */
    onLicenseChange?: (id: string) => void;
  };

export const DocumentHeader = ({
  id,
  showLicenseToggle,
  selectedLicense,
  licenseOptions,
  licenseLabel = 'License',
  readinessLabel,
  readinessIntent,
  onLicenseChange,
  className,
  children,
  ...rest
}: DocumentHeaderComponentProps): ReactElement => {
  const classes = [documentHeaderClassNames({ selectedLicense }), className].filter(Boolean).join(' ');
  const hasToggle = Boolean(showLicenseToggle && licenseOptions?.length);
  const hasMeta = Boolean(readinessLabel) || hasToggle;

  return (
    <header id={id} className={classes} {...rest}>
      <div className="eevenkoto-document-header__title">{children}</div>
      {hasMeta ? (
        <div className="eevenkoto-document-header__meta">
          {readinessLabel ? (
            <Badge label={readinessLabel} intent={readinessIntent ?? 'neutral'} dot shape="pill" />
          ) : null}
          {hasToggle ? (
            <div className="eevenkoto-document-header__license-toggle">
              <SegmentedControl
                label={licenseLabel}
                options={licenseOptions ?? []}
                selectedId={selectedLicense ?? 'proprietary'}
                mode="radios"
                name={`${id ?? 'document-header'}-license`}
                size="sm"
                onChange={onLicenseChange}
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </header>
  );
};