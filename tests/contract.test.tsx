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
  inputClassNames,
  inlineRefClassNames,
  menuClassNames,
  popoverClassNames,
  spellblockClassNames,
  statblockClassNames,
  statusDotClassNames,
  tableCellClassNames,
  tableColClassNames,
} from '@eevenkoto/core';
import {
  renderBadge,
  renderButton,
  renderCatalog,
  renderChip,
  renderField,
  renderHeading,
  renderInput,
  renderInlineRef,
  renderMenu,
  renderPopover,
  renderSpellblock,
  renderStatblock,
  renderStatusDot,
  renderTable,
  renderTableCell,
} from '@eevenkoto/html';
import {
  Badge,
  Button,
  Catalog,
  Chip,
  Field,
  Heading,
  Input,
  Menu,
  Popover,
  Spellblock,
  Statblock,
  StatusDot,
  Table,
} from '@eevenkoto/react';
import {
  Badge as VueBadge,
  Button as VueButton,
  Catalog as VueCatalog,
  Chip as VueChip,
  Field as VueField,
  Heading as VueHeading,
  Input as VueInput,
  Menu as VueMenu,
  Popover as VuePopover,
  Spellblock as VueSpellblock,
  Statblock as VueStatblock,
  StatusDot as VueStatusDot,
  Table as VueTable,
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
