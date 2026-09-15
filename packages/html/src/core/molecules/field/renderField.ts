import {
  fieldClassNames,
  fieldControlClassNames,
  fieldLabelClassNames,
  fieldMessageClassNames,
  resolveFieldMessageId,
  type FieldProps as FieldCoreProps,
} from '@eevenkoto/core';
import { escapeHtml, slugifyId } from '../../../utils/html';
import template from './Field.html';

export type FieldProps = FieldCoreProps & {
  /** Control markup (typically `renderInput(...)`). */
  control: string;
};

export const renderField = (args: FieldProps): string => {
  const htmlFor = args.htmlFor ?? slugifyId(args.label);
  const messageId = resolveFieldMessageId({ htmlFor, messageId: args.messageId });
  const hasError = Boolean(args.error);
  const messageText = hasError ? args.error : args.hint;

  const label = `<label class="${fieldLabelClassNames()}" for="${escapeHtml(htmlFor)}">${escapeHtml(args.label)}</label>`;
  const control = `<div class="${fieldControlClassNames()}">${args.control}</div>`;

  const message =
    messageText && messageId
      ? `<p class="${fieldMessageClassNames(hasError)}" id="${escapeHtml(messageId)}">${escapeHtml(messageText)}</p>`
      : '';

  return template
    .replace('{{className}}', fieldClassNames())
    .replace('{{content}}', `${label}${control}${message}`);
};
