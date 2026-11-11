import { describe, expect, it } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import {
  ICON_NAMES,
  iconPaths,
  badgeClassNames,
  buttonClassNames,
  catalogClassNames,
  chipClassNames,
  entityRefClassNames,
  fieldClassNames,
  headingClassNames,
  imageClassNames,
  inputClassNames,
  inlineRefClassNames,
  linkButtonClassNames,
  menuClassNames,
  noticeClassNames,
  popoverClassNames,
  segmentedControlClassNames,
  spellblockClassNames,
  statblockClassNames,
  statusDotClassNames,
  tableCellClassNames,
  tableColClassNames,
  equipmentBlockClassNames,
  equipmentWorkshopClassNames,
  workshopClassNames,
  abilityNameClassNames,
  checkboxClassNames,
  checkboxGroupClassNames,
  checkboxGroupLegendClassNames,
  radioClassNames,
  radioGroupClassNames,
  radioGroupLegendClassNames,
  selectClassNames,
  stepperClassNames,
  toastClassNames,
  type EntityRefKind,
} from '@eevenkoto/core';
import {
  sanitizeInlineHtml,
  renderBadge,
  renderButton,
  renderCard,
  renderCatalog,
  renderChip,
  renderEntityRef,
  renderField,
  renderHeading,
  renderImage,
  renderInput,
  renderInlineRef,
  renderLinkButton,
  renderMenu,
  renderNotice,
  renderPopover,
  renderProperty,
  renderPropertyList,
  renderSegmentedControl,
  renderSpellblock,
  renderStatblock,
  renderStatblockFeature,
  renderStatblockSection,
  renderStatusDot,
  renderTable,
  renderTableCell,
  renderEquipmentBlock,
  renderEquipmentWorkshop,
  renderWorkshop,
  renderAbilityName,
  renderCheckbox,
  renderCheckboxGroup,
  renderRadio,
  renderRadioGroup,
  renderSelect,
  renderStepper,
  renderToast,
} from '@eevenkoto/html';
import {
  Badge,
  Button,
  Card,
  Catalog,
  Chip,
  EntityRef,
  Field,
  Heading,
  Image,
  Input,
  LinkButton,
  Menu,
  Notice,
  Popover,
  Property,
  PropertyList,
  SegmentedControl,
  Spellblock,
  Statblock,
  StatblockFeature,
  StatblockSection,
  StatusDot,
  Table,
  EquipmentBlock,
  EquipmentWorkshop,
  Workshop,
  AbilityName,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Select,
  Stepper,
  Toast,
} from '@eevenkoto/react';
import {
  Badge as VueBadge,
  Button as VueButton,
  Card as VueCard,
  Catalog as VueCatalog,
  Chip as VueChip,
  EntityRef as VueEntityRef,
  Field as VueField,
  Heading as VueHeading,
  Image as VueImage,
  Input as VueInput,
  LinkButton as VueLinkButton,
  Menu as VueMenu,
  Notice as VueNotice,
  Popover as VuePopover,
  Property as VueProperty,
  PropertyList as VuePropertyList,
  SegmentedControl as VueSegmentedControl,
  Spellblock as VueSpellblock,
  Statblock as VueStatblock,
  StatblockFeature as VueStatblockFeature,
  StatblockSection as VueStatblockSection,
  StatusDot as VueStatusDot,
  Table as VueTable,
  EquipmentBlock as VueEquipmentBlock,
  EquipmentWorkshop as VueEquipmentWorkshop,
  Workshop as VueWorkshop,
  AbilityName as VueAbilityName,
  Checkbox as VueCheckbox,
  CheckboxGroup as VueCheckboxGroup,
  Radio as VueRadio,
  RadioGroup as VueRadioGroup,
  Select as VueSelect,
  Stepper as VueStepper,
  Toast as VueToast,
} from '@eevenkoto/vue';

const hostClass = (className: string) => className.split(/\s+/)[0];

describe('HTML matches Core class strings', () => {
  it('Button', () => {
    const classes = buttonClassNames({ variant: 'primary', size: 'md' });
    expect(renderButton({ label: 'Save' })).toContain(classes);
  });

  it('Badge', () => {
    const classes = badgeClassNames();
    expect(renderBadge({ label: 'Ready' })).toContain(classes);
  });

  it('Heading', () => {
    const classes = headingClassNames({ level: 2 });
    expect(renderHeading({ level: 2, text: 'Title' })).toContain(classes);
  });

  it('Input', () => {
    const classes = inputClassNames({ search: true });
    expect(renderInput({ search: true, ariaLabel: 'Search' })).toContain(classes);
  });

  it('Field', () => {
    expect(renderField({ label: 'Email', control: '<input />' })).toContain(fieldClassNames());
  });

  it('Menu', () => {
    const html = renderMenu({
      label: 'Worldbook',
      entries: [
        {
          kind: 'group',
          id: 'species',
          label: 'Lajit',
          expanded: true,
          children: [{ id: 'home', kind: 'item', label: 'Home', href: '#home', selected: true }],
        },
      ],
    });
    expect(html).toContain(menuClassNames());
    expect(html).toContain('<nav');
    expect(html).toContain('<ul>');
    expect(html).toContain('<details');
    expect(html).toContain('aria-current="page"');
    expect(html).toContain('href="#home"');
  });

  it('Menu size and leading icons', () => {
    const html = renderMenu({
      label: 'Account',
      size: 'sm',
      entries: [
        {
          kind: 'group',
          id: 'adventurer',
          label: 'Adventurer',
          icon: 'dice',
          expanded: true,
          children: [{ id: 'profile', label: 'Profile', href: '#profile', icon: 'user' }],
        },
      ],
    });
    expect(html).toContain(menuClassNames({ size: 'sm' }));
    expect(html).toContain('eevenkoto-menu--sm');
    expect(html).toContain('eevenkoto-menu__icon');
    expect(html).toContain('eevenkoto-icon');
  });

  it('StatusDot', () => {
    expect(renderStatusDot({ label: 'Ready' })).toContain(statusDotClassNames());
  });

  it('Chip', () => {
    expect(renderChip({ label: 'Seuraaja', selected: true })).toContain(
      chipClassNames({ selected: true }),
    );
  });

  it('Catalog', () => {
    expect(
      renderCatalog({ tiles: [{ name: 'Aavevalo', href: '#aavevalo' }] }),
    ).toContain(catalogClassNames());
  });

  it('InlineRef locked', () => {
    const markup = renderInlineRef({ name: 'mystikko', href: '#m', locked: true });
    expect(markup).toContain(inlineRefClassNames({ locked: true }));
    expect(markup).toContain('eevenkoto-inline-ref__lock');
  });

  it('Popover', () => {
    const classes = popoverClassNames({ placement: 'top' });
    expect(renderPopover({ content: 'Hi', placement: 'top', arrow: true })).toContain(classes);
  });

  it('Statblock', () => {
    const markup = renderStatblock({
      name: 'Aatelinen',
      abilities: [],
      vitals: [],
      details: [],
    });
    expect(markup).toContain(hostClass(statblockClassNames()));
  });

  it('Spellblock', () => {
    const markup = renderSpellblock({ name: 'Aavevalo', properties: [] });
    expect(markup).toContain(hostClass(spellblockClassNames()));
  });

  it('Spellblock deck', () => {
    const markup = renderSpellblock({ name: 'Aavevalo', properties: [], deck: true });
    expect(markup).toContain(spellblockClassNames({ deck: true }));
  });

  it('EquipmentBlock', () => {
    const markup = renderEquipmentBlock({ name: 'Miekka' });
    expect(markup).toContain(equipmentBlockClassNames());
  });

  it('AbilityName', () => {
    const markup = renderAbilityName({ name: 'Voimakkuus' });
    expect(markup).toContain(abilityNameClassNames());
    expect(markup).not.toContain('aria-label=');
    expect(markup).toContain('eevenkoto-ability-name__full">Voimakkuus</span>');
    expect(markup).toContain('eevenkoto-ability-name__short" aria-hidden="true">VOI</span>');
  });

  it('EquipmentBlock with 3-box enhanced stats', () => {
    const markup = renderEquipmentBlock({
      name: 'Miekka',
      stats: [
        { label: 'Vahinko', value: '1n8', subValue: 'viilto', emphasis: true },
        { label: 'Omin.', abilities: ['Voimakkuus', 'Ketteryys'] },
        {
          label: 'Ulottuvuus & heitto',
          subItems: [
            { label: 'Ulottuvuus', value: '2 m' },
            { label: 'Heitto', value: '4/10 m' },
          ],
        },
      ],
    });
    expect(markup).toContain('eevenkoto-equipment-block__stat-item--emphasis');
    expect(markup).toContain('eevenkoto-equipment-block__stat-subvalue');
    expect(markup).toContain('viilto');
    expect(markup).toContain('eevenkoto-ability-name');
    expect(markup).toContain('VOI');
    expect(markup).toContain('KET');
    expect(markup).toContain('eevenkoto-equipment-block__stat-item--split');
    expect(markup).toContain('Ulottuvuus');
    expect(markup).toContain('Heitto');
  });

  it('EquipmentWorkshop', () => {
    const markup = renderEquipmentWorkshop({
      header: '<h1>Verstas</h1>',
      controls: '<form>Ohjaimet</form>',
      preview: '<aside>Esikatselu</aside>',
    });
    expect(markup).toContain(equipmentWorkshopClassNames());
    expect(markup).toContain('class="eevenkoto-equipment-workshop__header"');
    expect(markup).toContain('class="eevenkoto-equipment-workshop__controls"');
    expect(markup).toContain('class="eevenkoto-equipment-workshop__preview"');
    expect(markup).toContain('<h1>Verstas</h1>');
    expect(markup).toContain('Ohjaimet');
    expect(markup).toContain('Esikatselu');
  });

  it('Image default block', () => {
    const markup = renderImage({ src: '/img.png', alt: 'Test image' });
    expect(markup).toContain(imageClassNames());
    expect(markup).toContain('<figure class="eevenkoto-image"');
    expect(markup).toContain('src="/img.png"');
    expect(markup).toContain('alt="Test image"');
    expect(markup).toContain('loading="lazy"');
    expect(markup).toContain('decoding="async"');
  });

  it('Image layout and framed modifiers', () => {
    const markup = renderImage({
      src: '/img.png',
      alt: 'Test',
      layout: 'float-right',
      framed: true,
      caption: 'A caption',
    });
    expect(markup).toContain(imageClassNames({ layout: 'float-right', framed: true }));
    expect(markup).toContain('eevenkoto-image--float-right');
    expect(markup).toContain('eevenkoto-image--framed');
    expect(markup).toContain('<figcaption class="eevenkoto-image__caption eevenkoto-caption">A caption</figcaption>');
  });

  it('Image float-left modifier', () => {
    const markup = renderImage({ src: '/img.png', alt: 'Test', layout: 'float-left' });
    expect(markup).toContain(imageClassNames({ layout: 'float-left' }));
    expect(markup).toContain('eevenkoto-image--float-left');
  });

  it('Checkbox', () => {
    const markup = renderCheckbox({ label: 'Accept terms', checked: true });
    expect(markup).toContain(checkboxClassNames());
    expect(markup).toContain('type="checkbox"');
    expect(markup).toContain('checked');
    expect(markup).toContain('Accept terms');
  });

  it('Checkbox card variant', () => {
    const markup = renderCheckbox({ label: 'Option', variant: 'card' });
    expect(markup).toContain(checkboxClassNames({ variant: 'card' }));
    expect(markup).toContain('eevenkoto-checkbox--card');
  });

  it('Radio', () => {
    const markup = renderRadio({ name: 'choice', value: 'opt1', label: 'Option 1', checked: true });
    expect(markup).toContain(radioClassNames());
    expect(markup).toContain('type="radio"');
    expect(markup).toContain('value="opt1"');
    expect(markup).toContain('Option 1');
  });

  it('Radio tile variant', () => {
    const markup = renderRadio({ name: 'choice', value: 'opt2', label: 'Option 2', variant: 'tile' });
    expect(markup).toContain(radioClassNames({ variant: 'tile' }));
    expect(markup).toContain('eevenkoto-radio--tile');
  });

  it('Select', () => {
    const markup = renderSelect({
      ariaLabel: 'Choices',
      options: [
        { value: '1', label: 'One' },
        { value: '2', label: 'Two' },
      ],
      value: '2',
    });
    expect(markup).toContain(selectClassNames());
    expect(markup).toContain('<select');
    expect(markup).toContain('value="1"');
    expect(markup).toContain('value="2"');
  });

  it('CheckboxGroup', () => {
    const markup = renderCheckboxGroup({
      label: 'Permissions',
      badge: '2 / 3',
      items: [
        { label: 'Read', checked: true },
        { label: 'Write', checked: false },
      ],
    });
    expect(markup).toContain(checkboxGroupClassNames());
    expect(markup).toContain('<fieldset');
    expect(markup).toContain('<legend');
    expect(markup).toContain('Permissions');
    expect(markup).toContain('2 / 3');
  });

  it('RadioGroup', () => {
    const markup = renderRadioGroup({
      name: 'status',
      label: 'Status',
      value: 'active',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
      ],
    });
    expect(markup).toContain(radioGroupClassNames());
    expect(markup).toContain('<fieldset');
    expect(markup).toContain('<legend');
    expect(markup).toContain('Status');
    expect(markup).toContain('Active');
  });

  it('Stepper', () => {
    const markup = renderStepper({
      name: 'quantity',
      label: 'Quantity',
      value: 3,
      min: 0,
      max: 10,
    });
    expect(markup).toContain(stepperClassNames());
    expect(markup).toContain('class="eevenkoto-stepper__value"');
    expect(markup).toContain('>3<');
    expect(markup).toContain('Quantity');
  });

  it('Toast', () => {
    const markup = renderToast({
      text: 'Saved',
      intent: 'success',
      placement: 'fixed-bottom-right',
    });
    expect(markup).toContain(
      toastClassNames({ intent: 'success', placement: 'fixed-bottom-right' }),
    );
    expect(markup).toContain('role="status"');
    expect(markup).toContain('aria-live="polite"');
    expect(markup).toContain('Saved');
  });
});

describe('React className matches Core', () => {
  it('Button', () => {
    const html = renderToStaticMarkup(createElement(Button, { label: 'Save' }));
    expect(html).toContain(buttonClassNames({ variant: 'primary', size: 'md' }));
  });

  it('Badge', () => {
    const html = renderToStaticMarkup(createElement(Badge, { label: 'Ready' }));
    expect(html).toContain(badgeClassNames());
  });

  it('Field', () => {
    const html = renderToStaticMarkup(
      createElement(Field, { label: 'Email' }, createElement(Input, { id: 'email' })),
    );
    expect(html).toContain(fieldClassNames());
  });

  it('Input', () => {
    const html = renderToStaticMarkup(createElement(Input, { ariaLabel: 'Name' }));
    expect(html).toContain(inputClassNames());
  });

  it('Menu', () => {
    const html = renderToStaticMarkup(
      createElement(Menu, {
        label: 'Worldbook',
        entries: [
          {
            kind: 'group',
            id: 'species',
            label: 'Lajit',
            expanded: true,
            children: [{ id: 'home', kind: 'item', label: 'Home', href: '#home', selected: true }],
          },
        ],
      }),
    );
    expect(html).toContain(menuClassNames());
    expect(html).toContain('<nav');
    expect(html).toContain('<ul>');
    expect(html).toContain('<details');
    expect(html).toContain('aria-current="page"');
  });

  it('Menu size and leading icons', () => {
    const html = renderToStaticMarkup(
      createElement(Menu, {
        label: 'Account',
        size: 'sm',
        entries: [
          {
            kind: 'group',
            id: 'adventurer',
            label: 'Adventurer',
            icon: 'dice',
            expanded: true,
            children: [{ id: 'profile', label: 'Profile', href: '#profile', icon: 'user' }],
          },
        ],
      }),
    );
    expect(html).toContain(menuClassNames({ size: 'sm' }));
    expect(html).toContain('eevenkoto-menu--sm');
    expect(html).toContain('eevenkoto-menu__icon');
    expect(html).toContain('eevenkoto-icon');
  });

  it('StatusDot', () => {
    const html = renderToStaticMarkup(createElement(StatusDot, { label: 'Ready' }));
    expect(html).toContain(statusDotClassNames());
  });

  it('Chip', () => {
    const html = renderToStaticMarkup(createElement(Chip, { label: 'Seuraaja', selected: true }));
    expect(html).toContain(chipClassNames({ selected: true }));
  });

  it('Catalog', () => {
    const html = renderToStaticMarkup(
      createElement(Catalog, { tiles: [{ name: 'Aavevalo', href: '#aavevalo' }] }),
    );
    expect(html).toContain(catalogClassNames());
  });

  it('Popover', () => {
    const html = renderToStaticMarkup(
      createElement(Popover, { placement: 'top', arrow: true }, 'Hi'),
    );
    expect(html).toContain(popoverClassNames({ placement: 'top' }));
  });

  it('Heading', () => {
    const html = renderToStaticMarkup(createElement(Heading, { level: 2, text: 'Title' }));
    expect(html).toContain(headingClassNames({ level: 2 }));
  });

  it('Statblock', () => {
    const html = renderToStaticMarkup(
      createElement(Statblock, { name: 'Aatelinen', abilities: [], vitals: [], details: [] }),
    );
    expect(html).toContain(hostClass(statblockClassNames()));
  });

  it('Spellblock', () => {
    const html = renderToStaticMarkup(
      createElement(Spellblock, { name: 'Aavevalo', properties: [] }),
    );
    expect(html).toContain(hostClass(spellblockClassNames()));
  });

  it('EquipmentBlock', () => {
    const html = renderToStaticMarkup(
      createElement(EquipmentBlock, { name: 'Miekka' }),
    );
    expect(html).toContain(equipmentBlockClassNames());
  });

  it('AbilityName', () => {
    const html = renderToStaticMarkup(
      createElement(AbilityName, { name: 'Voimakkuus' }),
    );
    expect(html).toContain(abilityNameClassNames());
    expect(html).not.toContain('aria-label=');
    expect(html).toContain('VOI');
  });

  it('EquipmentBlock with 3-box enhanced stats (React)', () => {
    const html = renderToStaticMarkup(
      createElement(EquipmentBlock, {
        name: 'Miekka',
        stats: [
          { label: 'Vahinko', value: '1n8', subValue: 'viilto', emphasis: true },
          { label: 'Omin.', abilities: ['Voimakkuus', 'Ketteryys'] },
          {
            label: 'Ulottuvuus & heitto',
            subItems: [
              { label: 'Ulottuvuus', value: '2 m' },
              { label: 'Heitto', value: '4/10 m' },
            ],
          },
        ],
      }),
    );
    expect(html).toContain('eevenkoto-equipment-block__stat-item--emphasis');
    expect(html).toContain('eevenkoto-equipment-block__stat-subvalue');
    expect(html).toContain('viilto');
    expect(html).toContain('eevenkoto-ability-name');
    expect(html).toContain('VOI');
    expect(html).toContain('KET');
    expect(html).toContain('eevenkoto-equipment-block__stat-item--split');
  });

  it('EquipmentWorkshop', () => {
    const html = renderToStaticMarkup(
      createElement(
        EquipmentWorkshop,
        {
          header: createElement('h1', null, 'Verstas'),
          preview: createElement('aside', null, 'Esikatselu'),
        },
        createElement('form', null, 'Ohjaimet'),
      ),
    );
    expect(html).toContain(equipmentWorkshopClassNames());
    expect(html).toContain('class="eevenkoto-equipment-workshop__header"');
    expect(html).toContain('class="eevenkoto-equipment-workshop__controls"');
    expect(html).toContain('class="eevenkoto-equipment-workshop__preview"');
    expect(html).toContain('<h1>Verstas</h1>');
    expect(html).toContain('Ohjaimet');
    expect(html).toContain('Esikatselu');
  });

  it('Image', () => {
    const html = renderToStaticMarkup(
      createElement(Image, {
        src: '/img.png',
        alt: 'Test',
        layout: 'float-left',
        framed: true,
        caption: 'A caption',
      }),
    );
    expect(html).toContain(imageClassNames({ layout: 'float-left', framed: true }));
    expect(html).toContain('eevenkoto-image--float-left');
    expect(html).toContain('eevenkoto-image--framed');
    expect(html).toContain('<figcaption class="eevenkoto-image__caption eevenkoto-caption">A caption</figcaption>');
  });

  it('Checkbox', () => {
    const html = renderToStaticMarkup(
      createElement(Checkbox, { label: 'Accept terms', checked: true, onChange: () => {} }),
    );
    expect(html).toContain(checkboxClassNames());
    expect(html).toContain('type="checkbox"');
    expect(html).toContain('checked');
    expect(html).toContain('Accept terms');
  });

  it('Checkbox card variant', () => {
    const html = renderToStaticMarkup(
      createElement(Checkbox, { label: 'Option', variant: 'card', onChange: () => {} }),
    );
    expect(html).toContain(checkboxClassNames({ variant: 'card' }));
    expect(html).toContain('eevenkoto-checkbox--card');
  });

  it('Radio', () => {
    const html = renderToStaticMarkup(
      createElement(Radio, {
        name: 'choice',
        value: 'opt1',
        label: 'Option 1',
        checked: true,
        onChange: () => {},
      }),
    );
    expect(html).toContain(radioClassNames());
    expect(html).toContain('type="radio"');
    expect(html).toContain('value="opt1"');
    expect(html).toContain('Option 1');
  });

  it('Radio tile variant', () => {
    const html = renderToStaticMarkup(
      createElement(Radio, {
        name: 'choice',
        value: 'opt2',
        label: 'Option 2',
        variant: 'tile',
        onChange: () => {},
      }),
    );
    expect(html).toContain(radioClassNames({ variant: 'tile' }));
    expect(html).toContain('eevenkoto-radio--tile');
  });

  it('Select', () => {
    const html = renderToStaticMarkup(
      createElement(Select, {
        ariaLabel: 'Choices',
        options: [
          { value: '1', label: 'One' },
          { value: '2', label: 'Two' },
        ],
        value: '2',
        onChange: () => {},
      }),
    );
    expect(html).toContain(selectClassNames());
    expect(html).toContain('<select');
    expect(html).toContain('value="1"');
    expect(html).toContain('value="2"');
  });

  it('CheckboxGroup', () => {
    const html = renderToStaticMarkup(
      createElement(CheckboxGroup, {
        label: 'Permissions',
        badge: '2 / 3',
        items: [
          { label: 'Read', checked: true, onChange: () => {} },
          { label: 'Write', checked: false, onChange: () => {} },
        ],
      }),
    );
    expect(html).toContain(checkboxGroupClassNames());
    expect(html).toContain('<fieldset');
    expect(html).toContain('<legend');
    expect(html).toContain('Permissions');
    expect(html).toContain('2 / 3');
  });

  it('RadioGroup', () => {
    const html = renderToStaticMarkup(
      createElement(RadioGroup, {
        name: 'status',
        label: 'Status',
        value: 'active',
        options: [
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ],
      }),
    );
    expect(html).toContain(radioGroupClassNames());
    expect(html).toContain('<fieldset');
    expect(html).toContain('<legend');
    expect(html).toContain('Status');
    expect(html).toContain('Active');
  });

  it('Stepper', () => {
    const html = renderToStaticMarkup(
      createElement(Stepper, {
        name: 'quantity',
        label: 'Quantity',
        value: 3,
        min: 0,
        max: 10,
      }),
    );
    expect(html).toContain(stepperClassNames());
    expect(html).toContain('class="eevenkoto-stepper__value"');
    expect(html).toContain('>3<');
    expect(html).toContain('Quantity');
  });

  it('Toast', () => {
    const html = renderToStaticMarkup(
      createElement(Toast, {
        text: 'Saved',
        intent: 'critical',
        placement: 'fixed-bottom-center',
      }),
    );
    expect(html).toContain(
      toastClassNames({ intent: 'critical', placement: 'fixed-bottom-center' }),
    );
    expect(html).toContain('role="alert"');
    expect(html).toContain('aria-live="assertive"');
    expect(html).toContain('Saved');
  });
});

async function vueHtml(component: unknown, props: Record<string, unknown>, slots?: { default: () => unknown }) {
  const app = createSSRApp({
    render: () => h(component as never, props, slots),
  });
  return renderToString(app);
}

describe('Vue class matches Core (priority subset)', () => {
  it('Button', async () => {
    const html = await vueHtml(VueButton, { label: 'Save' });
    expect(html).toContain(buttonClassNames({ variant: 'primary', size: 'md' }));
  });

  it('Badge', async () => {
    const html = await vueHtml(VueBadge, { label: 'Ready' });
    expect(html).toContain(badgeClassNames());
  });

  it('Field', async () => {
    const html = await vueHtml(VueField, { label: 'Email' }, { default: () => h(VueInput, { id: 'email' }) });
    expect(html).toContain(fieldClassNames());
  });

  it('Input', async () => {
    const html = await vueHtml(VueInput, { ariaLabel: 'Name' });
    expect(html).toContain(inputClassNames());
  });

  it('Menu', async () => {
    const html = await vueHtml(VueMenu, {
      label: 'Worldbook',
      entries: [
        {
          kind: 'group',
          id: 'species',
          label: 'Lajit',
          expanded: true,
          children: [{ id: 'home', kind: 'item', label: 'Home', href: '#home', selected: true }],
        },
      ],
    });
    expect(html).toContain(menuClassNames());
    expect(html).toContain('<nav');
    expect(html).toContain('<ul>');
    expect(html).toContain('<details');
    expect(html).toContain('aria-current="page"');
  });

  it('Menu size and leading icons', async () => {
    const html = await vueHtml(VueMenu, {
      label: 'Account',
      size: 'sm',
      entries: [
        {
          kind: 'group',
          id: 'adventurer',
          label: 'Adventurer',
          icon: 'dice',
          expanded: true,
          children: [{ id: 'profile', label: 'Profile', href: '#profile', icon: 'user' }],
        },
      ],
    });
    expect(html).toContain(menuClassNames({ size: 'sm' }));
    expect(html).toContain('eevenkoto-menu--sm');
    expect(html).toContain('eevenkoto-menu__icon');
    expect(html).toContain('eevenkoto-icon');
  });

  it('StatusDot', async () => {
    const html = await vueHtml(VueStatusDot, { label: 'Ready' });
    expect(html).toContain(statusDotClassNames());
  });

  it('Chip', async () => {
    const html = await vueHtml(VueChip, { label: 'Seuraaja', selected: true });
    expect(html).toContain(chipClassNames({ selected: true }));
  });

  it('Catalog', async () => {
    const html = await vueHtml(VueCatalog, { tiles: [{ name: 'Aavevalo', href: '#aavevalo' }] });
    expect(html).toContain(catalogClassNames());
  });

  it('Popover', async () => {
    const html = await vueHtml(
      VuePopover,
      { placement: 'top', arrow: true },
      { default: () => 'Hi' },
    );
    expect(html).toContain(popoverClassNames({ placement: 'top' }));
  });

  it('Heading', async () => {
    const html = await vueHtml(VueHeading, { level: 2, text: 'Title' });
    expect(html).toContain(headingClassNames({ level: 2 }));
  });

  it('Statblock', async () => {
    const html = await vueHtml(VueStatblock, { name: 'Aatelinen', abilities: [], vitals: [], details: [] });
    expect(html).toContain(hostClass(statblockClassNames()));
  });

  it('Spellblock', async () => {
    const html = await vueHtml(VueSpellblock, { name: 'Aavevalo', properties: [] });
    expect(html).toContain(hostClass(spellblockClassNames()));
  });

  it('EquipmentBlock', async () => {
    const html = await vueHtml(VueEquipmentBlock, { name: 'Miekka' });
    expect(html).toContain(equipmentBlockClassNames());
  });

  it('AbilityName', async () => {
    const html = await vueHtml(VueAbilityName, { name: 'Voimakkuus' });
    expect(html).toContain(abilityNameClassNames());
    expect(html).not.toContain('aria-label=');
    expect(html).toContain('VOI');
  });

  it('EquipmentBlock with 3-box enhanced stats (Vue)', async () => {
    const html = await vueHtml(VueEquipmentBlock, {
      name: 'Miekka',
      stats: [
        { label: 'Vahinko', value: '1n8', subValue: 'viilto', emphasis: true },
        { label: 'Omin.', abilities: ['Voimakkuus', 'Ketteryys'] },
        {
          label: 'Ulottuvuus & heitto',
          subItems: [
            { label: 'Ulottuvuus', value: '2 m' },
            { label: 'Heitto', value: '4/10 m' },
          ],
        },
      ],
    });
    expect(html).toContain('eevenkoto-equipment-block__stat-item--emphasis');
    expect(html).toContain('eevenkoto-equipment-block__stat-subvalue');
    expect(html).toContain('viilto');
    expect(html).toContain('eevenkoto-ability-name');
    expect(html).toContain('VOI');
    expect(html).toContain('KET');
    expect(html).toContain('eevenkoto-equipment-block__stat-item--split');
  });

  it('EquipmentWorkshop', async () => {
    const html = await vueHtml(
      VueEquipmentWorkshop,
      {},
      {
        header: () => h('h1', 'Verstas'),
        controls: () => h('form', 'Ohjaimet'),
        preview: () => h('aside', 'Esikatselu'),
      },
    );
    expect(html).toContain(equipmentWorkshopClassNames());
    expect(html).toContain('class="eevenkoto-equipment-workshop__header"');
    expect(html).toContain('class="eevenkoto-equipment-workshop__controls"');
    expect(html).toContain('class="eevenkoto-equipment-workshop__preview"');
    expect(html).toContain('<h1>Verstas</h1>');
    expect(html).toContain('Ohjaimet');
    expect(html).toContain('Esikatselu');
  });

  it('Image', async () => {
    const html = await vueHtml(VueImage, {
      src: '/img.png',
      alt: 'Test',
      layout: 'float-right',
      framed: true,
      caption: 'A caption',
    });
    expect(html).toContain(imageClassNames({ layout: 'float-right', framed: true }));
    expect(html).toContain('eevenkoto-image--float-right');
    expect(html).toContain('eevenkoto-image--framed');
    expect(html).toContain('<figcaption class="eevenkoto-image__caption eevenkoto-caption">A caption</figcaption>');
  });

  it('Checkbox', async () => {
    const html = await vueHtml(VueCheckbox, { label: 'Accept terms', checked: true });
    expect(html).toContain(checkboxClassNames());
    expect(html).toContain('type="checkbox"');
    expect(html).toContain('checked');
    expect(html).toContain('Accept terms');
  });

  it('Checkbox card variant', async () => {
    const html = await vueHtml(VueCheckbox, { label: 'Option', variant: 'card' });
    expect(html).toContain(checkboxClassNames({ variant: 'card' }));
    expect(html).toContain('eevenkoto-checkbox--card');
  });

  it('Radio', async () => {
    const html = await vueHtml(VueRadio, { name: 'choice', value: 'opt1', label: 'Option 1', checked: true });
    expect(html).toContain(radioClassNames());
    expect(html).toContain('type="radio"');
    expect(html).toContain('value="opt1"');
    expect(html).toContain('Option 1');
  });

  it('Radio tile variant', async () => {
    const html = await vueHtml(VueRadio, { name: 'choice', value: 'opt2', label: 'Option 2', variant: 'tile' });
    expect(html).toContain(radioClassNames({ variant: 'tile' }));
    expect(html).toContain('eevenkoto-radio--tile');
  });

  it('Select', async () => {
    const html = await vueHtml(VueSelect, {
      ariaLabel: 'Choices',
      options: [
        { value: '1', label: 'One' },
        { value: '2', label: 'Two' },
      ],
      value: '2',
    });
    expect(html).toContain(selectClassNames());
    expect(html).toContain('<select');
    expect(html).toContain('value="1"');
    expect(html).toContain('value="2"');
  });

  it('CheckboxGroup', async () => {
    const html = await vueHtml(VueCheckboxGroup, {
      label: 'Permissions',
      badge: '2 / 3',
      items: [
        { label: 'Read', checked: true },
        { label: 'Write', checked: false },
      ],
    });
    expect(html).toContain(checkboxGroupClassNames());
    expect(html).toContain('<fieldset');
    expect(html).toContain('<legend');
    expect(html).toContain('Permissions');
    expect(html).toContain('2 / 3');
  });

  it('RadioGroup', async () => {
    const html = await vueHtml(VueRadioGroup, {
      name: 'status',
      label: 'Status',
      value: 'active',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
      ],
    });
    expect(html).toContain(radioGroupClassNames());
    expect(html).toContain('<fieldset');
    expect(html).toContain('<legend');
    expect(html).toContain('Status');
    expect(html).toContain('Active');
  });

  it('Stepper', async () => {
    const html = await vueHtml(VueStepper, {
      name: 'quantity',
      label: 'Quantity',
      value: 3,
      min: 0,
      max: 10,
    });
    expect(html).toContain(stepperClassNames());
    expect(html).toContain('class="eevenkoto-stepper__value"');
    expect(html).toContain('>3<');
    expect(html).toContain('Quantity');
  });

  it('Toast', async () => {
    const html = await vueHtml(VueToast, {
      text: 'Saved',
      intent: 'info',
      placement: 'inline',
    });
    expect(html).toContain(
      toastClassNames({ intent: 'info', placement: 'inline' }),
    );
    expect(html).toContain('role="status"');
    expect(html).toContain('aria-live="polite"');
    expect(html).toContain('Saved');
  });
});

describe('Table cells rely on the host instead of the cell base class', () => {
  const columns = [
    { key: 'level', header: 'Level', kind: 'index' as const },
    { key: 'feature', header: 'Feature' },
  ];
  const rows = [['1', 'Spellcasting']];
  const caption = 'Class progression';
  const indexClass = tableCellClassNames({ kind: 'index', inTable: true });
  /* Base classes without a modifier suffix — the parts Table no longer emits. */
  const baseClass = /eevenkoto-table(-cell|__col)(?!--|__)/;

  const expectHostScopedCells = (markup: string) => {
    expect(markup).toContain('<td>Spellcasting</td>');
    expect(markup).toContain(`<td class="${indexClass}">1</td>`);
    expect(markup).toContain(`<caption>${caption}</caption>`);
    expect(markup).toContain(`class="${tableColClassNames({ kind: 'index' })}"`);
    expect(markup).not.toMatch(baseClass);
  };

  it('HTML', () => {
    expectHostScopedCells(renderTable({ caption, columns, rows }));
  });

  it('React', () => {
    expectHostScopedCells(renderToStaticMarkup(createElement(Table, { caption, columns, rows })));
  });

  it('Vue', async () => {
    expectHostScopedCells(await vueHtml(VueTable, { caption, columns, rows }));
  });

  it('standalone TableCell keeps the atom class', () => {
    expect(renderTableCell({ text: 'Spellcasting' })).toContain(
      `class="${tableCellClassNames()}"`,
    );
  });
});

describe('Spellblock heading outline never skips a level', () => {
  const spell = {
    name: 'Aavevalo',
    properties: [],
    features: [{ name: 'Taikakonstin voimistuminen', description: 'Vahinko kasvaa piireittäin.' }],
  };
  const runIn = (level: 2 | 3) => `<h${level} class="${headingClassNames({ level, runIn: true })}"`;

  it('HTML: H1 name → H2 scaling', () => {
    const markup = renderSpellblock(spell);
    expect(markup).toContain('<h1');
    expect(markup).toContain(runIn(2));
    expect(markup).not.toContain('<h3');
  });

  it('HTML: nameLevel 2 pushes scaling to H3', () => {
    const markup = renderSpellblock({ ...spell, nameLevel: 2 });
    expect(markup).toContain(runIn(3));
  });

  it('React: H1 name → H2 scaling', () => {
    const html = renderToStaticMarkup(createElement(Spellblock, spell));
    expect(html).toContain(runIn(2));
    expect(html).not.toContain('<h3');
  });

  it('Vue: H1 name → H2 scaling', async () => {
    const html = await vueHtml(VueSpellblock, spell);
    expect(html).toContain(runIn(2));
    expect(html).not.toContain('<h3');
  });
});

describe('EquipmentBlock heading outline never skips a level', () => {
  const item = {
    name: 'Miekka',
    traits: ['Viiltävä'],
    notes: ['Tasapainoinen teräsase.'],
  };

  it('HTML: H1 name → H2 sections', () => {
    const markup = renderEquipmentBlock(item);
    expect(markup).toContain('<h1');
    expect(markup).toContain('<h2 class="eevenkoto-equipment-block__section-title">');
    expect(markup).not.toContain('<h4');
  });

  it('HTML: nameLevel 2 pushes sections to H3', () => {
    const markup = renderEquipmentBlock({ ...item, nameLevel: 2 });
    expect(markup).toContain('<h2');
    expect(markup).toContain('<h3 class="eevenkoto-equipment-block__section-title">');
    expect(markup).not.toContain('<h4');
  });

  it('React: H1 name → H2 sections', () => {
    const html = renderToStaticMarkup(createElement(EquipmentBlock, item));
    expect(html).toContain('<h2 class="eevenkoto-equipment-block__section-title">');
    expect(html).not.toContain('<h4');
  });

  it('Vue: H1 name → H2 sections', async () => {
    const html = await vueHtml(VueEquipmentBlock, item);
    expect(html).toContain('<h2 class="eevenkoto-equipment-block__section-title">');
    expect(html).not.toContain('<h4');
  });
});

describe('0.10.1 Bug Fixes — Checkbox, Radio, Groups, Select', () => {
  it('visually-hidden legend class uses canonical eevenkoto-visually-hidden', () => {
    expect(checkboxGroupLegendClassNames(true)).toBe(
      'eevenkoto-checkbox-group__legend eevenkoto-visually-hidden',
    );
    expect(radioGroupLegendClassNames(true)).toBe(
      'eevenkoto-radio-group__legend eevenkoto-visually-hidden',
    );
    expect(checkboxGroupLegendClassNames(true)).not.toContain('eevenkoto-u-visually-hidden');
    expect(radioGroupLegendClassNames(true)).not.toContain('eevenkoto-u-visually-hidden');
  });

  it('hideLegend without badge omits __header wrapper across HTML, React, and Vue', async () => {
    const cbHtml = renderCheckboxGroup({
      label: 'Suodattimet',
      hideLegend: true,
      items: [{ label: 'Taika', value: 'magic' }],
    });
    expect(cbHtml).toContain('eevenkoto-visually-hidden');
    expect(cbHtml).not.toContain('eevenkoto-checkbox-group__header');

    const cbReact = renderToStaticMarkup(
      createElement(CheckboxGroup, {
        label: 'Suodattimet',
        hideLegend: true,
        items: [{ label: 'Taika', value: 'magic' }],
      }),
    );
    expect(cbReact).toContain('eevenkoto-visually-hidden');
    expect(cbReact).not.toContain('eevenkoto-checkbox-group__header');

    const rgVue = await vueHtml(VueRadioGroup, {
      name: 'mode',
      label: 'Tila',
      hideLegend: true,
      options: [{ label: 'Ase', value: 'weapon' }],
    });
    expect(rgVue).toContain('eevenkoto-visually-hidden');
    expect(rgVue).not.toContain('eevenkoto-radio-group__header');

    // When badge IS present alongside hideLegend, header wrapper stays for the badge
    const withBadge = renderCheckboxGroup({
      label: 'Suodattimet',
      hideLegend: true,
      badge: '1/3',
      items: [{ label: 'Taika', value: 'magic' }],
    });
    expect(withBadge).toContain('eevenkoto-checkbox-group__header');
    expect(withBadge).toContain('eevenkoto-visually-hidden');
  });

  it('columns > 1 automatically infers grid layout in CheckboxGroup and RadioGroup', () => {
    expect(checkboxGroupClassNames({ columns: 2 })).toContain('eevenkoto-checkbox-group--grid');
    expect(checkboxGroupClassNames({ columns: 2 })).toContain('eevenkoto-checkbox-group--grid-2');
    expect(radioGroupClassNames({ columns: 3 })).toContain('eevenkoto-radio-group--grid');
    expect(radioGroupClassNames({ columns: 3 })).toContain('eevenkoto-radio-group--grid-3');
  });

  it('Checkbox and Radio render badge strings inside Badge atom across HTML, React, and Vue', async () => {
    const cbHtml = renderCheckbox({ label: 'Raskas', badge: '+2 PL' });
    expect(cbHtml).toContain('class="eevenkoto-checkbox__badge"');
    expect(cbHtml).toContain('eevenkoto-badge');

    const rdHtml = renderRadio({ name: 'armor', value: 'heavy', label: 'Raskas', badge: '+2 PL' });
    expect(rdHtml).toContain('class="eevenkoto-radio__badge"');
    expect(rdHtml).toContain('eevenkoto-badge');

    const cbReact = renderToStaticMarkup(
      createElement(Checkbox, { label: 'Raskas', badge: '+2 PL' }),
    );
    expect(cbReact).toContain('eevenkoto-badge');

    const rdVue = await vueHtml(VueRadio, {
      name: 'armor',
      value: 'heavy',
      label: 'Raskas',
      badge: '+2 PL',
    });
    expect(rdVue).toContain('eevenkoto-badge');
  });

  it('Select renders both top-level options and optgroup groups together across HTML, React, and Vue', async () => {
    const props = {
      ariaLabel: 'Suodata',
      options: [{ value: 'all', label: 'Kaikki' }],
      groups: [
        {
          label: 'Lähitaistelu',
          options: [{ value: 'sword', label: 'Pitkämiekka' }],
        },
      ],
    };

    const html = renderSelect(props);
    expect(html).toContain('<option value="all">Kaikki</option>');
    expect(html).toContain('<optgroup label="Lähitaistelu">');
    expect(html).toContain('<option value="sword">Pitkämiekka</option>');

    const react = renderToStaticMarkup(createElement(Select, props));
    expect(react).toContain('value="all"');
    expect(react).toContain('<optgroup label="Lähitaistelu">');

    const vue = await vueHtml(VueSelect, props);
    expect(vue).toContain('value="all"');
    expect(vue).toContain('<optgroup label="Lähitaistelu">');
  });
});

describe('0.11.0 Features — Icons, LinkButton, EntityRef, Popover, Widths, Menu, Notice, Workshop & Rich HTML', () => {
  it('ICON_NAMES includes all 23 canonical icons with valid SVG path data', () => {
    const expected = [
      'close',
      'copy',
      'refresh',
      'reroll',
      'logout',
      'mail',
      'info',
      'warning',
    ] as const;
    for (const name of expected) {
      expect(ICON_NAMES).toContain(name);
      expect(iconPaths[name].length).toBeGreaterThan(5);
    }
    for (const name of ICON_NAMES) {
      expect(typeof iconPaths[name]).toBe('string');
      expect(iconPaths[name].length).toBeGreaterThan(0);
    }
  });

  it('LinkButton supports ghost variant and fullWidth across Core, HTML, React, and Vue', async () => {
    const classes = linkButtonClassNames({ variant: 'ghost', fullWidth: true });
    expect(classes).toContain('eevenkoto-link-button--ghost');
    expect(classes).toContain('eevenkoto-link-button--full-width');

    const html = renderLinkButton({
      href: '/loitsut',
      label: 'Loitsut',
      variant: 'ghost',
      fullWidth: true,
    });
    expect(html).toContain(classes);

    const react = renderToStaticMarkup(
      createElement(LinkButton, {
        href: '/loitsut',
        label: 'Loitsut',
        variant: 'ghost',
        fullWidth: true,
      }),
    );
    expect(react).toContain(classes);

    const vue = await vueHtml(VueLinkButton, {
      href: '/loitsut',
      label: 'Loitsut',
      variant: 'ghost',
      fullWidth: true,
    });
    expect(vue).toContain(classes);
  });

  it('EntityRef supports all 12 TTRPG entity kinds across Core, HTML, React, and Vue', async () => {
    const kinds: EntityRefKind[] = [
      'item',
      'condition',
      'mechanic',
      'classFeature',
      'class',
      'creature',
      'spell',
      'species',
      'culture',
      'background',
      'feat',
      'ability',
    ];
    for (const kind of kinds) {
      const cls = entityRefClassNames({ kind });
      expect(renderEntityRef({ kind, name: 'Testi', href: '#t' })).toContain(cls);
      expect(
        renderToStaticMarkup(createElement(EntityRef, { kind, name: 'Testi', href: '#t' })),
      ).toContain(cls);
      expect(await vueHtml(VueEntityRef, { kind, name: 'Testi', href: '#t' })).toContain(cls);
    }
  });

  it('compiler-friendly HTML outputs have no leading HTML comments or trailing newlines', () => {
    const samples = [
      renderButton({ label: 'OK' }),
      renderBadge({ label: 'Uusi' }),
      renderHeading({ level: 2, text: 'Otsikko' }),
      renderCard({ title: 'Kortti', body: 'Teksti' }),
      renderNotice({ title: 'Huomio', body: 'Teksti', intent: 'info' }),
      renderMenu({
        label: 'Valikko',
        entries: [
          {
            kind: 'group',
            id: 'g1',
            label: 'Ryhmä',
            expanded: true,
            children: [{ id: 'i1', label: 'Kohta', href: '#i1' }],
          },
        ],
      }),
      renderStatblock({ name: 'Olento', abilities: [], vitals: [], details: [] }),
      renderSpellblock({ name: 'Loitsu', properties: [] }),
      renderWorkshop({ controls: '<form></form>', preview: '<aside></aside>' }),
    ];

    for (const out of samples) {
      expect(out.startsWith('<!--')).toBe(false);
      expect(out.endsWith('\n')).toBe(false);
    }
    // Markdown-safe Menu <details> must not contain blank lines or internal newlines
    expect(
      renderMenu({
        label: 'Valikko',
        entries: [
          {
            kind: 'group',
            id: 'g1',
            label: 'Taso 1',
            children: [
              {
                kind: 'group',
                id: 'g2',
                label: 'Taso 2',
                children: [{ id: 'leaf', label: 'Sivu', href: '/sivu' }],
              },
            ],
          },
        ],
      }),
    ).not.toContain('\n');
  });

  it('sanitizeInlineHtml preserves EntityRef/InlineRef markup while stripping XSS vectors', () => {
    const entity = renderEntityRef({
      kind: 'spell',
      name: 'Tulipallo',
      href: '/loitsut/tulipallo',
      locked: true,
    });
    const clean = sanitizeInlineHtml(`Heittää ${entity} ja <a href="javascript:alert(1)" onclick="evil()">paha</a><script>x()</script>`);
    expect(clean).toContain('href="/loitsut/tulipallo"');
    expect(clean).toContain('eevenkoto-entity-ref--spell');
    expect(clean).toContain('<svg class="eevenkoto-icon');
    expect(clean).not.toContain('javascript:');
    expect(clean).not.toContain('onclick');
    expect(clean).toContain('&lt;script&gt;');
  });

  it('rich *Html props render inline and block markup across Property, Card, Notice, Statblock, and Spellblock', async () => {
    const refMarkup = renderEntityRef({ kind: 'condition', name: 'Sokaistu', href: '/tilat/sokaistu' });

    expect(renderProperty({ label: 'Immuuni', valueHtml: refMarkup })).toContain(refMarkup);
    expect(
      renderPropertyList({ items: [{ label: 'Immuuni', valueHtml: refMarkup }] }),
    ).toContain(refMarkup);
    expect(
      renderToStaticMarkup(createElement(Property, { label: 'Immuuni', valueHtml: refMarkup })),
    ).toContain('eevenkoto-entity-ref--condition');
    expect(await vueHtml(VuePropertyList, { items: [{ label: 'Immuuni', valueHtml: refMarkup }] })).toContain(
      'eevenkoto-entity-ref--condition',
    );

    expect(renderCard({ title: 'Loitsu', bodyHtml: `<p>Aiheuttaa ${refMarkup}.</p>` })).toContain(
      refMarkup,
    );
    expect(
      renderToStaticMarkup(
        createElement(Card, { title: 'Loitsu', bodyHtml: `<p>Aiheuttaa ${refMarkup}.</p>` }),
      ),
    ).toContain('eevenkoto-entity-ref--condition');
    expect(
      await vueHtml(VueCard, { title: 'Loitsu', bodyHtml: `<p>Aiheuttaa ${refMarkup}.</p>` }),
    ).toContain('eevenkoto-entity-ref--condition');

    expect(renderNotice({ intent: 'info', bodyHtml: `Katso ${refMarkup}.` })).toContain(refMarkup);
    expect(
      renderStatblockFeature({ name: 'Hyökkäys', descriptionHtml: `Kohde on ${refMarkup}.` }),
    ).toContain(refMarkup);
    expect(
      renderStatblockSection({
        title: 'Toiminnot',
        bodyHtml: '<p class="eevenkoto-paragraph">Monihyökkäys.</p>',
      }),
    ).toContain('Monihyökkäys.');

    const sb = renderStatblock({
      name: 'Varjo',
      flavorHtml: '<em> Elävä varjo.</em>',
      typeLineHtml: `Keskikokoinen epäkuollut, ${refMarkup}`,
      vitals: [],
      abilities: [],
      details: [],
      bodyHtml: '<div class="custom-lore">Lisätietoja</div>',
    });
    expect(sb).toContain('<em> Elävä varjo.</em>');
    expect(sb).toContain(refMarkup);
    expect(sb).toContain('custom-lore');

    const sp = renderSpellblock({
      name: 'Valonvälähdys',
      typeLineHtml: '<em>1. piirin</em> loitsu',
      properties: [],
      paragraphsHtml: [`Kohde tulee ${refMarkup}.`],
      bodyHtml: '<ul><li>Kesto: 1 kierros</li></ul>',
    });
    expect(sp).toContain('<em>1. piirin</em>');
    expect(sp).toContain(refMarkup);
    expect(sp).toContain('<ul><li>Kesto: 1 kierros</li></ul>');

    expect(
      renderToStaticMarkup(
        createElement(StatblockFeature, { name: 'Hyökkäys', descriptionHtml: refMarkup }),
      ),
    ).toContain('eevenkoto-entity-ref--condition');
    expect(
      await vueHtml(VueStatblockSection, {
        title: 'Toiminnot',
        bodyHtml: '<p>Monihyökkäys</p>',
      }),
    ).toContain('<p>Monihyökkäys</p>');
  });

  it('Popover supports edge alignments and matchTriggerWidth across Core, HTML, React, and Vue', async () => {
    const anchored = popoverClassNames({ placement: 'bottom-end', matchTriggerWidth: true });
    expect(anchored).toContain('eevenkoto-popover--bottom-end');
    expect(anchored).toContain('eevenkoto-popover--match-trigger-width');

    const fixed = popoverClassNames({ fixed: true, open: true });
    expect(fixed).toContain('eevenkoto-popover--fixed');
    expect(fixed).toContain('eevenkoto-popover--open');

    expect(
      renderPopover({ content: 'Valikko', placement: 'bottom-start', matchTriggerWidth: true }),
    ).toContain('eevenkoto-popover--bottom-start eevenkoto-popover--match-trigger-width');

    expect(
      renderToStaticMarkup(
        createElement(Popover, { placement: 'top-end', matchTriggerWidth: true }, 'Valikko'),
      ),
    ).toContain('eevenkoto-popover--top-end eevenkoto-popover--match-trigger-width');

    expect(
      await vueHtml(
        VuePopover,
        { placement: 'top-start', matchTriggerWidth: true },
        { default: () => 'Valikko' },
      ),
    ).toContain('eevenkoto-popover--top-start eevenkoto-popover--match-trigger-width');
  });

  it('fullWidth modifier works on Button, Input, Select, and SegmentedControl across layers', async () => {
    expect(buttonClassNames({ fullWidth: true })).toContain('eevenkoto-button--full-width');
    expect(inputClassNames({ fullWidth: true })).toContain('eevenkoto-input--full-width');
    expect(selectClassNames({ fullWidth: true })).toContain('eevenkoto-select--full-width');
    expect(segmentedControlClassNames({ fullWidth: true })).toContain(
      'eevenkoto-segmented-control--full-width',
    );

    expect(renderButton({ label: 'Tallenna', fullWidth: true })).toContain(
      'eevenkoto-button--full-width',
    );
    expect(renderInput({ ariaLabel: 'Hae', fullWidth: true })).toContain(
      'eevenkoto-input--full-width',
    );
    expect(renderSelect({ ariaLabel: 'Valitse', fullWidth: true, options: [] })).toContain(
      'eevenkoto-select--full-width',
    );
    expect(
      renderSegmentedControl({
        options: [{ id: 'a', label: 'A' }],
        selectedId: 'a',
        fullWidth: true,
      }),
    ).toContain('eevenkoto-segmented-control--full-width');

    expect(
      renderToStaticMarkup(createElement(Input, { ariaLabel: 'Hae', search: true, fullWidth: true })),
    ).toContain('eevenkoto-input--full-width');
    expect(
      await vueHtml(VueSegmentedControl, {
        options: [{ id: 'a', label: 'A' }],
        selectedId: 'a',
        fullWidth: true,
      }),
    ).toContain('eevenkoto-segmented-control--full-width');
  });

  it('Menu supports deep recursive nesting and custom attributes across HTML, React, and Vue', async () => {
    const entries = [
      {
        kind: 'group' as const,
        id: 'lvl1',
        label: 'Maailma',
        expanded: true,
        attributes: { 'data-section': 'world' },
        children: [
          {
            kind: 'group' as const,
            id: 'lvl2',
            label: 'Alueet',
            expanded: true,
            children: [
              {
                kind: 'item' as const,
                id: 'leaf',
                label: 'Pohjola',
                href: '/maailma/pohjola',
                attributes: { 'data-filter-tags': 'north,cold', 'data-pinned': true, 'data-hidden': false },
              },
            ],
          },
        ],
      },
    ];

    const html = renderMenu({ label: 'Navigaatio', entries });
    expect(html).toContain('data-section="world"');
    expect(html).toContain('data-filter-tags="north,cold"');
    expect(html).toContain('data-pinned');
    expect(html).not.toContain('data-hidden');

    const react = renderToStaticMarkup(createElement(Menu, { label: 'Navigaatio', entries }));
    expect(react).toContain('data-section="world"');
    expect(react).toContain('data-filter-tags="north,cold"');
    expect(react).not.toContain('data-hidden');

    const vue = await vueHtml(VueMenu, { label: 'Navigaatio', entries });
    expect(vue).toContain('data-section="world"');
    expect(vue).toContain('data-filter-tags="north,cold"');
    expect(vue).not.toContain('data-hidden');
  });

  it('Notice defaults intent icon and role="alert" on critical/caution, and honors icon={false}', async () => {
    const criticalHtml = renderNotice({ intent: 'critical', title: 'Virhe', body: 'Tallennus epäonnistui.' });
    expect(criticalHtml).toContain(noticeClassNames({ intent: 'critical' }));
    expect(criticalHtml).toContain('role="alert"');
    expect(criticalHtml).toContain('eevenkoto-notice__icon');

    const cautionReact = renderToStaticMarkup(
      createElement(Notice, { intent: 'caution', body: 'Tarkista painoraja.' }),
    );
    expect(cautionReact).toContain('role="alert"');
    expect(cautionReact).toContain('eevenkoto-notice__icon');

    const infoVue = await vueHtml(VueNotice, { intent: 'info', body: 'Vinkki', icon: false });
    expect(infoVue).toContain('role="status"');
    expect(infoVue).not.toContain('eevenkoto-notice__icon');
  });

  it('Core Workshop renders header, controls, sticky preview, region label, and controlsWidth override', async () => {
    const html = renderWorkshop({
      label: 'Olentoverstas',
      controlsWidth: '24rem',
      header: '<h2>Olentoverstas</h2>',
      controls: '<form>Ohjaimet</form>',
      preview: '<aside>Esikatselu</aside>',
    });
    expect(html).toContain(workshopClassNames());
    expect(html).toContain('role="region"');
    expect(html).toContain('aria-label="Olentoverstas"');
    expect(html).toContain('--eevenkoto-workshop-controls-width: 24rem');
    expect(html).toContain('eevenkoto-workshop__preview');

    const react = renderToStaticMarkup(
      createElement(
        Workshop,
        {
          label: 'Loitsuverstas',
          controlsWidth: '22rem',
          preview: createElement('aside', null, 'Esikatselu'),
        },
        createElement('form', null, 'Ohjaimet'),
      ),
    );
    expect(react).toContain(workshopClassNames());
    expect(react).toContain('role="region"');
    expect(react).toContain('--eevenkoto-workshop-controls-width:22rem');

    const vue = await vueHtml(
      VueWorkshop,
      { label: 'Loitsuverstas', controlsWidth: '22rem' },
      { default: () => h('form', 'Ohjaimet') },
    );
    expect(vue).toContain(workshopClassNames());
    expect(vue).toContain('role="region"');
    expect(vue).toContain('--eevenkoto-workshop-controls-width:22rem');
  });
});
