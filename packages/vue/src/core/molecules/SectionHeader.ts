import {
  captionClassNames,
  headingClassNames,
  paragraphClassNames,
  sectionHeaderClassNames,
  type SectionHeaderProps,
} from '@eevenkoto/core';
import { defineComponent, h, type PropType, type VNodeChild } from 'vue';
import { Icon } from '../atoms/Icon';

export type { SectionHeaderProps };

export const SectionHeader = defineComponent({
  name: 'EevenkotoSectionHeader',
  props: {
    id: { type: String, default: undefined },
    eyebrow: { type: String, default: undefined },
    title: { type: String, default: undefined },
    titleHtml: { type: String, default: undefined },
    titleLevel: { type: Number as PropType<SectionHeaderProps['titleLevel']>, default: 2 },
    logo: { type: Object as PropType<SectionHeaderProps['logo']>, default: undefined },
    lead: { type: String, default: undefined },
    leadHtml: { type: String, default: undefined },
    align: { type: String as PropType<SectionHeaderProps['align']>, default: undefined },
    note: { type: Object as PropType<SectionHeaderProps['note']>, default: undefined },
  },
  setup(props, { slots }) {
    return () => {
      const level = props.titleLevel ?? 2;
      const leadClass = `${paragraphClassNames({ size: 'lg', tone: 'secondary' })} eevenkoto-section-header__lead`;
      const children: VNodeChild[] = [];

      if (props.eyebrow) {
        children.push(
          h('p', { class: captionClassNames({ tone: 'accent', variant: 'eyebrow' }) }, props.eyebrow),
        );
      }
      if (props.logo) {
        children.push(
          h('img', {
            class: 'eevenkoto-section-header__logo',
            src: props.logo.src,
            alt: props.logo.alt,
            width: props.logo.width,
            height: props.logo.height,
          }),
        );
      }
      if (props.titleHtml !== undefined) {
        children.push(
          h(`h${level}`, { class: headingClassNames({ level }), innerHTML: props.titleHtml }),
        );
      } else if (props.title) {
        children.push(h(`h${level}`, { class: headingClassNames({ level }) }, props.title));
      }
      if (props.leadHtml !== undefined) {
        children.push(h('p', { class: leadClass, innerHTML: props.leadHtml }));
      } else if (props.lead) {
        children.push(h('p', { class: leadClass }, props.lead));
      }
      if (slots.actions) {
        children.push(h('div', { class: 'eevenkoto-section-header__actions' }, slots.actions()));
      }
      if (props.note && (props.note.text || props.note.html)) {
        children.push(
          h('p', { class: `eevenkoto-section-header__note ${captionClassNames({ tone: 'secondary' })}` }, [
            props.note.icon ? h(Icon, { name: props.note.icon, size: 'sm' }) : null,
            props.note.html !== undefined
              ? h('span', { innerHTML: props.note.html })
              : h('span', props.note.text),
          ]),
        );
      }

      return h('header', { id: props.id, class: sectionHeaderClassNames({ align: props.align }) }, children);
    };
  },
});
