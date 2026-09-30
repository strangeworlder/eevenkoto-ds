import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/image.css';
import '@eevenkoto/css/caption.css';
import '@eevenkoto/css/paragraph.css';
import '@eevenkoto/css/heading.css';
import '@eevenkoto/css/flow.css';
import '@eevenkoto/css/prose.css';
import { renderImage, type ImageProps } from '@eevenkoto/html';

/** Inline SVG illustration so Storybook canvas requires no network requests. */
const bannerIllustration =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450' width='800' height='450'%3E%3Cdefs%3E%3ClinearGradient id='sky' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%233a4d46'/%3E%3Cstop offset='100%25' stop-color='%231f2b27'/%3E%3C/linearGradient%3E%3ClinearGradient id='gold' x1='0%25' y1='0%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%23c89b53'/%3E%3Cstop offset='100%25' stop-color='%23dfbe7f'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='450' fill='url(%23sky)'/%3E%3Ccircle cx='400' cy='200' r='110' fill='none' stroke='url(%23gold)' stroke-width='4' stroke-dasharray='6 6' opacity='0.7'/%3E%3Cpolygon points='400,105 425,185 505,185 440,230 465,305 400,260 335,305 360,230 295,185 375,185' fill='%23c89b53' opacity='0.9'/%3E%3Ctext x='400' y='380' text-anchor='middle' fill='%23e6d9c4' font-family='sans-serif' font-size='22' letter-spacing='3'%3EEEVENKOTO ARCHIVE%3C/text%3E%3C/svg%3E";

const spotIllustration =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' width='400' height='400'%3E%3Cdefs%3E%3CradialGradient id='spot' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' stop-color='%23506860'/%3E%3Cstop offset='100%25' stop-color='%2322302a'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='400' height='400' rx='16' fill='url(%23spot)'/%3E%3Ccircle cx='200' cy='200' r='120' fill='none' stroke='%23c89b53' stroke-width='3' stroke-dasharray='8 4'/%3E%3Cpath d='M200 110 L250 250 L150 250 Z' fill='%23dfbe7f' opacity='0.85'/%3E%3Ccircle cx='200' cy='200' r='25' fill='%2322302a' stroke='%23c89b53' stroke-width='2'/%3E%3Ctext x='200' y='330' text-anchor='middle' fill='%23e6d9c4' font-family='sans-serif' font-size='16' letter-spacing='2'%3EARTIFACT%3C/text%3E%3C/svg%3E";

const sampleParagraph1 =
  'Muinaiset arkistot kertovat ajasta, jolloin Pohjolan rajamailla liikkuneet tutkimusmatkaajat kirjasivat muistiin laaksojen salaisuuksia. Kartoittajat havaitsivat, että vanhat kivipaadet heijastivat tähtitaivaan kiertokulkua hämmästyttävällä tarkkuudella. Jokainen kaiverrus kantaa mukanaan vuosisatojen viisautta ja varoituksia unohdetuista voimista.';

const sampleParagraph2 =
  'Kun syysmyrskyt saapuvat tunturien yli, kivien välinen laakso täyttyy vaimeasta huminasta. Paikalliset suojelijat pitävät huolta siitä, etteivät vaeltajat eksy kielletyille polulle ennen kuin talvipäivänseisaus on ohitettu turvallisesti.';

const meta: Meta<ImageProps> = {
  title: 'Core/Atoms/Image',
  parameters: {
    docs: {
      description: {
        component:
          'Responsive editorial media element. Host alone is a full paragraph-wide block. Modifiers provide text-wrapping spot art (float-left, float-right) with container-responsive collapse.',
      },
    },
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'Source URL of the image.',
      table: { type: { summary: 'string' } },
    },
    alt: {
      control: 'text',
      description: 'Accessible description (empty string if decorative).',
      table: { type: { summary: 'string' } },
    },
    caption: {
      control: 'text',
      description: 'Optional figcaption text.',
      table: { type: { summary: 'string' } },
    },
    layout: {
      control: 'select',
      options: ['block', 'float-left', 'float-right'],
      description: 'Layout presentation and text-wrap float mode.',
      table: {
        type: { summary: "'block' | 'float-left' | 'float-right'" },
        defaultValue: { summary: 'block' },
      },
    },
    framed: {
      control: 'boolean',
      description: 'Bordered boundary frame matching Eevenkoto boundary tokens.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    width: {
      control: 'text',
      description: 'Intrinsic width attribute (prevents CLS).',
      table: { type: { summary: 'number | string' } },
    },
    height: {
      control: 'text',
      description: 'Intrinsic height attribute (prevents CLS).',
      table: { type: { summary: 'number | string' } },
    },
    aspectRatio: {
      control: 'text',
      description: 'CSS aspect ratio string (e.g. 16/9, 4/3, 1/1).',
      table: { type: { summary: 'string' } },
    },
    fit: {
      control: 'select',
      options: ['cover', 'contain', 'fill', 'scale-down', 'none'],
      description: 'Object-fit mode for the image media.',
      table: {
        type: { summary: "'cover' | 'contain' | 'fill' | 'scale-down' | 'none'" },
        defaultValue: { summary: 'cover' },
      },
    },
    loading: {
      control: 'select',
      options: ['lazy', 'eager'],
      description: 'Native browser loading strategy.',
      table: {
        type: { summary: "'lazy' | 'eager'" },
        defaultValue: { summary: 'lazy' },
      },
    },
    decoding: {
      control: 'select',
      options: ['async', 'sync', 'auto'],
      description: 'Image decoding strategy.',
      table: {
        type: { summary: "'async' | 'sync' | 'auto'" },
        defaultValue: { summary: 'async' },
      },
    },
  },
  args: {
    src: bannerIllustration,
    alt: 'Muinaisten tähtikarttojen arkisto',
    layout: 'block',
    framed: false,
    width: 800,
    height: 450,
    aspectRatio: '16/9',
  },
  render: (args) => renderImage(args),
};

export default meta;
type Story = StoryObj<ImageProps>;

export const Default: Story = {};

export const WithCaption: Story = {
  name: 'With caption',
  args: {
    caption: 'Kuva 1: Tähtikarttojen arkistomerkki Pohjolan laaksosta.',
  },
};

export const Framed: Story = {
  name: 'Framed',
  args: {
    caption: 'Reunustettu arkistokuva laaksokartasta.',
    framed: true,
  },
};

export const FloatRight: Story = {
  name: 'Float right (text wrap)',
  render: () => `
<div class="eevenkoto-prose eevenkoto-flow" style="max-width: 54rem;">
  <h2 class="eevenkoto-heading">Tähtikarttojen salaisuus</h2>
  ${renderImage({
    src: spotIllustration,
    alt: 'Muinaisesine',
    caption: 'Kuva 2: Löydetty taikariipus.',
    layout: 'float-right',
    framed: true,
    width: 400,
    height: 400,
    aspectRatio: '1/1',
  })}
  <p class="eevenkoto-paragraph">${sampleParagraph1}</p>
  <p class="eevenkoto-paragraph">${sampleParagraph2}</p>
</div>`,
};

export const FloatLeft: Story = {
  name: 'Float left (text wrap)',
  render: () => `
<div class="eevenkoto-prose eevenkoto-flow" style="max-width: 54rem;">
  <h2 class="eevenkoto-heading">Laakson suojelijat</h2>
  ${renderImage({
    src: spotIllustration,
    alt: 'Muinaisesine',
    caption: 'Kuva 3: Suojelijan sinetti.',
    layout: 'float-left',
    framed: true,
    width: 400,
    height: 400,
    aspectRatio: '1/1',
  })}
  <p class="eevenkoto-paragraph">${sampleParagraph1}</p>
  <p class="eevenkoto-paragraph">${sampleParagraph2}</p>
</div>`,
};

export const AspectRatios: Story = {
  name: 'Common aspect ratios',
  render: () => `
<div class="eevenkoto-flow" style="max-width: 50rem;">
  <div>
    <p class="eevenkoto-caption" style="margin-block-end: var(--eevenkoto-space-1);">16:9 (Landscape / Scene banner)</p>
    ${renderImage({
      src: bannerIllustration,
      alt: '16:9 banner',
      aspectRatio: '16/9',
      width: 800,
      height: 450,
      framed: true,
    })}
  </div>
  <div>
    <p class="eevenkoto-caption" style="margin-block-end: var(--eevenkoto-space-1);">4:3 (Classic book plate)</p>
    ${renderImage({
      src: bannerIllustration,
      alt: '4:3 plate',
      aspectRatio: '4/3',
      width: 800,
      height: 600,
      framed: true,
    })}
  </div>
  <div>
    <p class="eevenkoto-caption" style="margin-block-end: var(--eevenkoto-space-1);">1:1 (Square spot art / Icon)</p>
    <div style="max-width: 20rem;">
      ${renderImage({
        src: spotIllustration,
        alt: '1:1 square',
        aspectRatio: '1/1',
        width: 400,
        height: 400,
        framed: true,
      })}
    </div>
  </div>
</div>`,
};

export const ContainerCollapse: Story = {
  name: 'Container query collapse',
  render: () => `
<div style="border: 1px dashed var(--eevenkoto-color-boundary-strong); padding: var(--eevenkoto-space-4); resize: horizontal; overflow: auto; min-width: 24rem; max-width: 60rem; width: 30rem;">
  <p class="eevenkoto-caption" style="margin-block-end: var(--eevenkoto-space-3);">Vedä oikeasta alakulmasta leveyden muuttamiseksi. Kun säiliön leveys alittaa 32rem, kuvan kellutus purkautuu automaattisesti täydeksi leveydeksi.</p>
  <div class="eevenkoto-prose eevenkoto-flow">
    ${renderImage({
      src: spotIllustration,
      alt: 'Sinetöity artefakti',
      caption: 'Kellutus purkautuu kapeassa säiliössä.',
      layout: 'float-right',
      framed: true,
      width: 400,
      height: 400,
    })}
    <p class="eevenkoto-paragraph">${sampleParagraph1}</p>
  </div>
</div>`,
};
