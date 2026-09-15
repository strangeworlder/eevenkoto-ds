import { avatarClassNames, type AvatarProps } from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';
import { Icon } from './Icon';

export type { AvatarProps };

export const Avatar = defineComponent({
  name: 'EevenkotoAvatar',
  props: {
    name: { type: String, required: true },
    src: { type: String, default: undefined },
    size: { type: String as PropType<AvatarProps['size']>, default: undefined },
  },
  setup(props) {
    const className = computed(() => avatarClassNames({ size: props.size }));

    return () => {
      const child = props.src
        ? h('img', {
            class: 'eevenkoto-avatar__image',
            src: props.src,
            alt: props.name,
          })
        : h('span', { class: 'eevenkoto-avatar__placeholder', 'aria-hidden': 'true' }, [
            h(Icon, { name: 'user', size: props.size ?? 'md' }),
          ]);

      return h(
        'span',
        {
          class: className.value,
          role: props.src ? undefined : 'img',
          'aria-label': props.src ? undefined : props.name,
        },
        [child],
      );
    };
  },
});
