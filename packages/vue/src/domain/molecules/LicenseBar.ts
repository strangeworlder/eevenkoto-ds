import { licenseBarClassNames, type LicenseBarProps } from '@eevenkoto/core';
import { defineComponent, h, type PropType, type VNodeChild } from 'vue';

export type { LicenseBarProps };

export const LicenseBar = defineComponent({
  name: 'EevenkotoLicenseBar',
  props: {
    id: { type: String, default: undefined },
    activeLicense: { type: String as PropType<LicenseBarProps['activeLicense']>, default: undefined },
    placement: { type: String as PropType<LicenseBarProps['placement']>, default: undefined },
    entries: { type: Array as PropType<LicenseBarProps['entries']>, required: true },
    separator: { type: String, default: ' · ' },
    ariaLabel: { type: String, default: 'License' },
  },
  setup(props) {
    return () => {
      const active = props.activeLicense ?? 'proprietary';
      return h(
        'aside',
        {
          id: props.id,
          class: licenseBarClassNames({
            activeLicense: props.activeLicense,
            placement: props.placement,
          }),
          'aria-label': props.ariaLabel,
        },
        props.entries.map((entry) => {
          const isActive = entry.license === active;
          const children: VNodeChild[] = [];
          entry.links.forEach((link, index) => {
            if (index > 0) children.push(props.separator);
            children.push(
              link.href ? h('a', { href: link.href }, link.label) : h('span', null, link.label),
            );
          });
          return h(
            'span',
            {
              key: entry.license,
              class: `eevenkoto-license-bar__entry${isActive ? ' eevenkoto-license-bar__entry--active' : ''}`,
              'data-content-license': entry.license,
              hidden: !isActive,
            },
            children,
          );
        }),
      );
    };
  },
});