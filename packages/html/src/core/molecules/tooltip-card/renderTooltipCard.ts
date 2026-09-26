import {
  tooltipCardBodyClassNames,
  tooltipCardClassNames,
  type TooltipCardProps as TooltipCardCoreProps,
  type TooltipCardTitleLevel,
} from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import template from './TooltipCard.html';

export type TooltipCardProps = TooltipCardCoreProps & {
  /** Header HTML. Replaces `title` when both are set. */
  header?: string;
  /** Body HTML, appended after `body`. */
  content?: string;
  /** Footer HTML. */
  footer?: string;
};

export type { TooltipCardTitleLevel };

export const renderTooltipCard = (args: TooltipCardProps): string => {
  let header = '';
  if (args.header) {
    header = `<header>${args.header}</header>`;
  } else if (args.title) {
    const level: TooltipCardTitleLevel = args.titleLevel === 3 ? 3 : 2;
    header = `<header><h${level}>${escapeHtml(args.title)}</h${level}></header>`;
  }

  const bodyInner = `${args.body ? `<p>${escapeHtml(args.body)}</p>` : ''}${args.content ?? ''}`;
  const body = bodyInner
    ? `<div class="${tooltipCardBodyClassNames()}">${bodyInner}</div>`
    : '';

  const footer = args.footer ? `<footer>${args.footer}</footer>` : '';

  return template
    .replace('{{className}}', tooltipCardClassNames())
    .replace('{{content}}', `${header}${body}${footer}`);
};
