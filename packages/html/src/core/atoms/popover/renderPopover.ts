import { popoverClassNames, type PopoverProps as PopoverCoreProps } from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import template from './Popover.html';

export type PopoverProps = PopoverCoreProps & {
  /** Panel contents HTML. */
  content: string;
  /** ARIA role. Apps own focus management for `dialog`. */
  role?: 'dialog' | 'tooltip' | 'note' | 'group';
};

export const renderPopover = (args: PopoverProps): string => {
  const roleAttr = args.role ? ` role="${args.role}"` : '';
  const labelAttr = args.label ? ` aria-label="${escapeHtml(args.label)}"` : '';
  const openAttr = args.fixed && args.open ? ' data-open="true"' : '';
  const arrow = args.arrow ? '<span class="eevenkoto-popover__arrow"></span>' : '';

  return template
    .replace('{{className}}', popoverClassNames(args))
    .replace('{{roleAttr}}', roleAttr)
    .replace('{{labelAttr}}', labelAttr)
    .replace('{{openAttr}}', openAttr)
    .replace('{{content}}', `${args.content}${arrow}`);
};
