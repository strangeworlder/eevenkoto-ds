import {
  fieldClassNames,
  fieldControlClassNames,
  fieldControlGroupClassNames,
  fieldLabelClassNames,
  fieldMessageClassNames,
  resolveFieldMessageId,
  type FieldOrientation,
  type FieldProps as FieldCoreProps,
} from '@eevenkoto/core';
import { escapeHtml, slugifyId } from '../../../utils/html';
import template from './Field.html';

export type { FieldOrientation };

export type FieldProps = FieldCoreProps & {
  /** Control markup (typically `renderInput(...)`). */
  control: string;
  /** Optional inline trailing action markup (typically `renderButton(...)`). */
  action?: string;
};

export const renderField = (args: FieldProps): string => {
  const htmlFor = args.htmlFor ?? slugifyId(args.label);
  const messageId = resolveFieldMessageId({ htmlFor, messageId: args.messageId });
  const hasError = Boolean(args.error);
  const messageText = hasError ? args.error : args.hint;

  const label = `<label class="${fieldLabelClassNames()}" for="${escapeHtml(htmlFor)}">${escapeHtml(args.label)}</label>`;
  const controlInner = args.action
    ? `<div class="${fieldControlGroupClassNames()}">${args.control}${args.action}</div>`
    : args.control;
  const control = `<div class="${fieldControlClassNames()}">${controlInner}</div>`;

  const message =
    messageText && messageId
      ? `<p class="${fieldMessageClassNames(hasError)}" id="${escapeHtml(messageId)}">${escapeHtml(messageText)}</p>`
      : '';

  return template
    .replace('{{className}}', fieldClassNames({ orientation: args.orientation }))
    .replace('{{content}}', `${label}${control}${message}`);
};
