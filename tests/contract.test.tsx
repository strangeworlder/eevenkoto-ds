import { describe, expect, it } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import {
  badgeClassNames,
  buttonClassNames,
  catalogClassNames,
  chipClassNames,
  fieldClassNames,
  headingClassNames,
  imageClassNames,
  inputClassNames,
  inlineRefClassNames,
  menuClassNames,
  popoverClassNames,
  spellblockClassNames,
  statblockClassNames,
  statusDotClassNames,
  tableCellClassNames,
  tableColClassNames,
  equipmentBlockClassNames,
  equipmentWorkshopClassNames,
  checkboxClassNames,
  checkboxGroupClassNames,
  radioClassNames,
  radioGroupClassNames,
  selectClassNames,
  stepperClassNames,
} from '@eevenkoto/core';
import {
  renderBadge,
  renderButton,
  renderCatalog,
  renderChip,
  renderField,
  renderHeading,
  renderImage,
  renderInput,
  renderInlineRef,
  renderMenu,
  renderPopover,
  renderSpellblock,
  renderStatblock,
  renderStatusDot,
  renderTable,
  renderTableCell,
  renderEquipmentBlock,
  renderEquipmentWorkshop,
  renderCheckbox,
  renderCheckboxGroup,
  renderRadio,
  renderRadioGroup,
  renderSelect,
  renderStepper,
} from '@eevenkoto/html';
import {
  Badge,
  Button,
  Catalog,
  Chip,
  Field,
  Heading,
  Image,
  Input,
  Menu,
  Popover,
  Spellblock,
  Statblock,
  StatusDot,
  Table,
  EquipmentBlock,
  EquipmentWorkshop,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Select,
  Stepper,
} from '@eevenkoto/react';
import {
  Badge as VueBadge,
  Button as VueButton,
  Catalog as VueCatalog,
  Chip as VueChip,
  Field as VueField,
  Heading as VueHeading,
  Image as VueImage,
  Input as VueInput,
  Menu as VueMenu,
  Popover as VuePopover,
  Spellblock as VueSpellblock,
  Statblock as VueStatblock,
  StatusDot as VueStatusDot,
  Table as VueTable,
  EquipmentBlock as VueEquipmentBlock,
  EquipmentWorkshop as VueEquipmentWorkshop,
  Checkbox as VueCheckbox,
  CheckboxGroup as VueCheckboxGroup,
  Radio as VueRadio,
  RadioGroup as VueRadioGroup,
  Select as VueSelect,
  Stepper as VueStepper,
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

  it('EquipmentWorkshop', () => {
    const markup = renderEquipmentWorkshop();
    expect(markup).toContain(equipmentWorkshopClassNames());
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

  it('EquipmentWorkshop', () => {
    const html = renderToStaticMarkup(
      createElement(EquipmentWorkshop),
    );
    expect(html).toContain(equipmentWorkshopClassNames());
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

  it('EquipmentWorkshop', async () => {
    const html = await vueHtml(VueEquipmentWorkshop);
    expect(html).toContain(equipmentWorkshopClassNames());
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
