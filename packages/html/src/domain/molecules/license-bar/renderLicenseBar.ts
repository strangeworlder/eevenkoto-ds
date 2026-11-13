import { licenseBarClassNames, type LicenseBarProps } from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import template from './LicenseBar.html';

export type { LicenseBarProps };

export const renderLicenseBar = (args: LicenseBarProps): string => {
  const active = args.activeLicense ?? 'proprietary';
  const separator = escapeHtml(args.separator ?? ' · ');
  const entries = args.entries
    .map((entry) => {
      const links = entry.links
        .map((link) =>
          link.href
            ? `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`
            : `<span>${escapeHtml(link.label)}</span>`,
        )
        .join(separator);
      const isActive = entry.license === active;
      const cls = `eevenkoto-license-bar__entry${isActive ? ' eevenkoto-license-bar__entry--active' : ''}`;
      return `<span class="${cls}" data-content-license="${entry.license}"${isActive ? '' : ' hidden'}>${links}</span>`;
    })
    .join('');
  const idAttr = args.id ? ` id="${escapeHtml(args.id)}"` : '';
  return template
    .replace('{{idAttr}}', idAttr)
    .replace('{{className}}', licenseBarClassNames(args))
    .replace('{{ariaLabel}}', escapeHtml(args.ariaLabel ?? 'License'))
    .replace('{{content}}', () => entries);
};
