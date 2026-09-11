import {
  tableShellClassNames,
  tableShellFooterClassNames,
  type ScrollAxis,
} from '@eevenkoto/core';
import { renderFrame } from '../../atoms/frame/renderFrame';
import { renderScroll } from '../../atoms/scroll/renderScroll';
import template from './TableShell.html';

export interface TableShellProps {
  /** Pre-rendered table HTML (from renderTable). */
  table: string;
  /** Wrap in Frame atom. Defaults to true. */
  frame?: boolean;
  /** Wrap table in Scroll atom. Defaults to true. */
  scroll?: boolean;
  scrollAxis?: ScrollAxis;
  /** Optional footer chrome (future Pager). */
  footer?: string;
}

export const renderTableShell = (args: TableShellProps): string => {
  const useFrame = args.frame !== false;
  const useScroll = args.scroll !== false;

  let inner = args.table;
  if (useScroll) {
    inner = renderScroll({ content: inner, axis: args.scrollAxis ?? 'x' });
  }
  if (useFrame) {
    inner = renderFrame({ content: inner });
  }

  const footer = args.footer
    ? `<div class="${tableShellFooterClassNames()}">${args.footer}</div>`
    : '';

  const content = `${inner}${footer}`;
  return template.replace('{{className}}', tableShellClassNames()).replace('{{content}}', content);
};
