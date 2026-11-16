// apps/storybook/src/core/molecules/Prose/Prose.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import { expect } from 'storybook/test';
import '@eevenkoto/css/prose.css';
import '@eevenkoto/css/flow.css';
import { flowClassNames, proseClassNames } from '@eevenkoto/core';
import { renderProse, type ProseProps } from '@eevenkoto/html';

const bareReadingContent = (): string =>
  [
    '<h1>Prose styles bare tags</h1>',
    '<p>Inside <code>eevenkoto-prose</code>, headings, paragraphs, and lists pick up the same defaults as the classed primitives — without BEM classes on each element.</p>',
    '<h2>Section break</h2>',
    '<p>Compose with Flow for pair-aware vertical rhythm.</p>',
    '<ul>',
    '<li>Bare unordered lists match <code>eevenkoto-list</code>.</li>',
    '<li>Markers, gap, and body type come from List.</li>',
    '<li>Nesting keeps a tighter indent.</li>',
    '</ul>',
    '<h3>Meso heading</h3>',
    '<p>H3 through H6 follow the multi-axis hierarchy.</p>',
    '<ol>',
    '<li>Bare ordered lists use decimal markers.</li>',
    '<li>Same size and tone defaults as classed List.</li>',
    '</ol>',
    '<h4>Sans meso</h4>',
    '<p>Another paragraph for stack rhythm.</p>',
    '<h5>Micro band</h5>',
    '<p>H5 keeps the sunken label band.</p>',
    '<h6>Micro italic</h6>',
    '<p>Closing body copy under H6.</p>',
  ].join('');

const withOverrideContent = (): string =>
  [
    '<h1 class="eevenkoto-heading eevenkoto-heading--3">Semantic H1, visual H3</h1>',
    '<p>Tag inference yields to an explicit <code>--3</code> modifier on the host class.</p>',
    '<h2>Normal H2</h2>',
    '<p>Bare tags still resolve from the element name.</p>',
  ].join('');

const meta: Meta<ProseProps> = {
  title: 'Core/Molecules/Prose',
  parameters: {
    docs: {
      description: {
        component:
          'Prose scopes bare h1–h6, p, ul, ol, and li to default Heading/Paragraph/List styles. Compose with Flow for rhythm.',
      },
    },
  },
  argTypes: {
    content: { table: { disable: true } },
  },
  args: {
    content: bareReadingContent(),
  },
  render: (args) => renderProse(args),
};

export default meta;
type Story = StoryObj<ProseProps>;

export const Default: Story = {};

export const WithFlow: Story = {
  name: 'With Flow',
  render: (args) => {
    const classes = [proseClassNames(), flowClassNames()].join(' ');
    return `<div class="${classes}">${args.content}</div>`;
  },
};

export const LevelOverride: Story = {
  name: 'Level override',
  args: {
    content: withOverrideContent(),
  },
  render: (args) => {
    const classes = [proseClassNames(), flowClassNames()].join(' ');
    return `<div class="${classes}">${args.content}</div>`;
  },
};

const characterGalleryContent = (): string => `
  <h2>Hahmogalleria</h2>
  <p>Peli pyörii muutaman keskeisen henkilön ja heidän toimintansa ympärillä.</p>
  <h3>Kukonhelttojen fanikaaren Allar</h3>
  <p>Ihminen, 24 v. Mies. Kotolainen. Tehdastyöläinen.</p>
  <p>Tumma tukka, kellanruskeat silmät. Useita ikäviä tehdasonnettomuuksien arpia. 184 cm, solakkarakenteinen.</p>
  <p><strong>Nimet (Kaaret):</strong> Yövuoron Allar, Kannusten Allar, Kukonhelttojen fanikaaren Allar, Katkaisintehdas 8a:n Allar, Allar Sinisten peltojen korttelista.</p>
  <p><strong>Ensivaikutelma:</strong> Epävarma nuori mies, joka puristaa henkisesti uutta löydettyä suuntaa olematta täysin varma onko se hyvä asia. Katselee Hakaa kohti opastusta etsien.</p>
  <p><strong>Maneerit:</strong> Vaihtaa asentoa usein. Proteesi ei ole täydellisesti sopiva ja mikään asento ei oikein ole täydellinen. Tämä ei enää vaivaa Allaria, mutta alitajuisesti hän liikkuu hieman koko ajan. Välttää katsekontaktia vanhojen ystäviensä kanssa.</p>
  <p>Allar oli liian nuori päätyäkseen rintamalle Jumalten sodassa. Hän oli seuraava suuri lupaus Kukonhelttojen etulinjan juoksijaksi, mutta onnettomuus kuusi vuotta sitten päivätöissä tehtaalla repi häneltä hänen vasemman jalkansa. Allar on siitä lähtien tehnyt yhä huonompia hommia Katkaisintehdas 8a:lla, sillä hän ei pysy liikkumista vaativan tehdastyön vauhdissa ja on kompensoinut ottamalla enemmän maksavia yövuoroja.</p>
  <p>Koska Allar ei ole jaksanut olla samalla tavalla viimeisten kuukausien aikana osana Kukonhelttojen faneja, hän on omissa oloissaan kehittänyt ajatuksen, että häntä pidetään mukana vain koska hän on rampa, jota säälitään. Tämä on tunne, johon Haka ja Kannukset ovat tarttuneet.</p>
  <p>Vaikka Haka on ollut erinomainen manipulaationsa kanssa, muut Kannukset suhtautuvat Allariin säälien, ja Allarilla on vähän epäilyksiä tämän takia.</p>
`;

export const CharacterGallery: Story = {
  name: 'Character gallery (Prose vs Prose + Flow)',
  render: () => {
    const proseOnly = proseClassNames();
    const proseFlow = [proseClassNames(), flowClassNames()].join(' ');
    return `
      <div style="display: grid; gap: var(--eevenkoto-space-8); max-width: 52rem;">
        <section data-specimen="prose-only" class="${proseOnly}">${characterGalleryContent()}</section>
        <section data-specimen="prose-flow" class="${proseFlow}">${characterGalleryContent()}</section>
      </div>
    `;
  },
  play: async ({ canvasElement }) => {
    for (const specimen of ['prose-only', 'prose-flow']) {
      const container = canvasElement.querySelector<HTMLElement>(`[data-specimen="${specimen}"]`);
      expect(container).not.toBeNull();

      const h3 = container!.querySelector<HTMLElement>('h3');
      const paragraphs = container!.querySelectorAll<HTMLElement>('p');
      expect(h3).not.toBeNull();
      expect(paragraphs.length).toBeGreaterThanOrEqual(4);

      const prevP = paragraphs[0];
      const nextP = paragraphs[1];
      const pAfterNext = paragraphs[2];

      const prevPRect = prevP.getBoundingClientRect();
      const h3Rect = h3!.getBoundingClientRect();
      const nextPRect = nextP.getBoundingClientRect();
      const pAfterNextRect = pAfterNext.getBoundingClientRect();

      const gapBeforeH3 = h3Rect.top - prevPRect.bottom;
      const gapAfterH3 = nextPRect.top - h3Rect.bottom;
      const paragraphGap = pAfterNextRect.top - nextPRect.bottom;

      expect(gapBeforeH3).toBeGreaterThanOrEqual(20);
      expect(gapAfterH3).toBeGreaterThanOrEqual(6);
      expect(gapAfterH3).toBeLessThanOrEqual(10);
      expect(gapBeforeH3).toBeGreaterThanOrEqual(2.5 * gapAfterH3);
      expect(paragraphGap).toBeGreaterThanOrEqual(14);
    }
  },
};
