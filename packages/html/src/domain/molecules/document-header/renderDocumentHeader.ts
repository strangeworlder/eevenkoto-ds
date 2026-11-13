import { documentHeaderClassNames, type DocumentHeaderProps } from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import { renderBadge } from '../../../core/atoms/badge/renderBadge';
import { renderSegmentedControl } from '../../../core/molecules/segmented-control/renderSegmentedControl';
import template from './DocumentHeader.html';

export type DocumentHeaderRenderProps = DocumentHeaderProps & {
  /** Trusted heading markup (e.g. an `<h1>`). */
  heading?: string;
};

export type { DocumentHeaderProps };

export const renderDocumentHeader = (args: DocumentHeaderRenderProps): string => {
  const badge = args.readinessLabel
    ? renderBadge({
        label: args.readinessLabel,
        intent: args.readinessIntent ?? 'neutral',
        dot: true,
        shape: 'pill',
      })
    : '';
  const toggle =
    args.showLicenseToggle && args.licenseOptions?.length
      ? `<div class="eevenkoto-document-header__license-toggle">${renderSegmentedControl({
          label: args.licenseLabel ?? 'License',
          options: args.licenseOptions,
          selectedId: args.selectedLicense ?? 'proprietary',
          mode: 'radios',
          name: `${args.id ?? 'document-header'}-license`,
          size: 'sm',
        })}</div>`
      : '';
  const meta =
    badge || toggle ? `<div class="eevenkoto-document-header__meta">${badge}${toggle}</div>` : '';
  const idAttr = args.id ? ` id="${escapeHtml(args.id)}"` : '';
  return template
    .replace('{{idAttr}}', idAttr)
    .replace('{{className}}', documentHeaderClassNames(args))
    .replace('{{heading}}', () => args.heading ?? '')
    .replace('{{meta}}', () => meta);
};
