import { accountMenuClassNames, popoverClassNames, type AccountMenuProps } from '@eevenkoto/core';
import { defineComponent, h, type PropType } from 'vue';
import { Avatar } from '../atoms/Avatar';
import { Badge } from '../atoms/Badge';
import { Icon } from '../atoms/Icon';
import { LinkButton } from '../atoms/LinkButton';
import { Menu } from '../molecules/Menu';

export type { AccountMenuProps };

export const AccountMenu = defineComponent({
  name: 'EevenkotoAccountMenu',
  props: {
    id: { type: String, default: undefined },
    authenticated: { type: Boolean, required: true },
    loginHref: { type: String, default: '#login' },
    loginLabel: { type: String, default: 'Sign in' },
    userName: { type: String, default: '' },
    userEmail: { type: String, default: undefined },
    avatarSrc: { type: String, default: undefined },
    tierLabel: { type: String, default: undefined },
    tierIntent: { type: String as PropType<AccountMenuProps['tierIntent']>, default: 'neutral' },
    menuLabel: { type: String, default: 'Account menu' },
    popoverLabel: { type: String, default: 'Account' },
    entries: { type: Array as PropType<AccountMenuProps['entries']>, default: undefined },
    open: { type: Boolean, default: false },
  },
  emits: ['toggle', 'select'],
  setup(props, { slots, emit }) {
    return () => {
      const className = accountMenuClassNames({ authenticated: props.authenticated, open: props.open });

      if (!props.authenticated) {
        return h('div', { id: props.id, class: className }, [
          h(LinkButton, {
            href: props.loginHref,
            label: props.loginLabel,
            variant: 'secondary',
            icon: 'user',
            fullWidth: true,
          }),
        ]);
      }

      const popoverId = props.id ? `${props.id}-popover` : undefined;
      const badge = (variant: 'subtle' | 'solid') =>
        props.tierLabel
          ? h(Badge, {
              label: props.tierLabel,
              size: 'sm',
              variant,
              shape: 'pill',
              intent: props.tierIntent,
            })
          : null;

      return h('div', { id: props.id, class: className }, [
        h(
          'button',
          {
            type: 'button',
            class: 'eevenkoto-account-menu__trigger',
            'aria-haspopup': 'true',
            'aria-expanded': props.open ? 'true' : 'false',
            'aria-controls': popoverId,
            onClick: () => emit('toggle', !props.open),
          },
          [
            h(Avatar, { name: props.userName, src: props.avatarSrc, size: 'sm' }),
            h('span', { class: 'eevenkoto-account-menu__identity' }, [
              h('span', { class: 'eevenkoto-account-menu__name' }, props.userName),
              badge('subtle'),
            ]),
            h(Icon, { name: 'chevron-down', size: 'sm', class: 'eevenkoto-account-menu__chevron' }),
          ],
        ),
        h(
          'div',
          {
            id: popoverId,
            class: popoverClassNames({ placement: 'bottom-start', matchTriggerWidth: true }),
            role: 'dialog',
            'aria-label': props.popoverLabel,
            hidden: props.open ? undefined : true,
          },
          [
            h('div', { class: 'eevenkoto-account-menu__summary' }, [
              h('span', props.userName),
              props.userEmail
                ? h('span', { class: 'eevenkoto-account-menu__email' }, props.userEmail)
                : null,
              badge('solid'),
            ]),
            props.entries?.length
              ? h(Menu, {
                  label: props.menuLabel,
                  entries: props.entries,
                  embedded: true,
                  size: 'sm',
                  onSelect: (entryId: string) => emit('select', entryId),
                })
              : null,
            slots.footer ? h('div', { class: 'eevenkoto-account-menu__footer' }, slots.footer()) : null,
          ],
        ),
      ]);
    };
  },
});
