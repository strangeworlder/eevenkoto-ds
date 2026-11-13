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

  const primaryBody = args.bodyHtml
    ? args.bodyHtml
    : args.body
      ? `<p>${escapeHtml(args.body)}</p>`
      : '';
  const bodyInner = args.content
    ? args.body && !args.bodyHtml
      ? `${primaryBody}${args.content}`
      : args.content
    : primaryBody;
  const body = bodyInner
    ? `<div class="${tooltipCardBodyClassNames()}" tabindex="0">${bodyInner}</div>`
    : '';

  const footer = args.footer ? `<footer>${args.footer}</footer>` : '';

  return template
    .replace('{{className}}', tooltipCardClassNames({ flush: args.flush }))
    .replace('{{content}}', `${header}${body}${footer}`);
};
