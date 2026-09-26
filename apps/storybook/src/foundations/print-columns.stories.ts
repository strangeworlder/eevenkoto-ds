// apps/storybook/src/foundations/print-columns.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/prose.css';
import '@eevenkoto/css/flow.css';
import '@eevenkoto/css/notice.css';
import '@eevenkoto/css/menu.css';
import '@eevenkoto/css/icon.css';
import '@eevenkoto/css/link-button.css';
import '@eevenkoto/css/entity-ref.css';
import '@eevenkoto/css/frame.css';
import '@eevenkoto/css/scroll.css';
import '@eevenkoto/css/caption.css';
import '@eevenkoto/css/table.css';
import '@eevenkoto/css/table-shell.css';
import '@eevenkoto/css/heading.css';
import '@eevenkoto/css/paragraph.css';
import '@eevenkoto/css/property.css';
import '@eevenkoto/css/stat.css';
import '@eevenkoto/css/ability-score.css';
import '@eevenkoto/css/statblock-feature.css';
import '@eevenkoto/css/statblock-section.css';
import '@eevenkoto/css/statblock.css';
import '@eevenkoto/css/spellblock.css';
import './print-columns.stories.css';
import { flowClassNames, proseClassNames } from '@eevenkoto/core';
import {
  renderAbilityScoreGroup,
  renderEntityRef,
  renderLinkButton,
  renderMenu,
  renderNotice,
  renderSpellblock,
  renderStatblock,
  renderTable,
  renderTableShell,
  type SpellblockProps,
  type StatblockProps,
} from '@eevenkoto/html';

const reading = (): string => [proseClassNames(), flowClassNames()].join(' ');

const ref = (name: string, kind: 'classFeature' | 'mechanic' | 'condition'): string =>
  renderEntityRef({ name, kind, href: '#' });

const shortStatblock: StatblockProps = {
  name: 'Aatelinen',
  nameLevel: 2,
  flavor:
    'Aateliset ovat poliittisesti vaikutusvaltaisia henkilöitä, joiden asema perustuu syntyperään.',
  typeLine: 'Keskikokoinen humanoidi',
  vitals: [
    { label: 'Puolustus', value: '15' },
    { label: 'Aloite', value: '+1 (11)' },
    { label: 'Osumapisteet', value: '9 (2n8)' },
    { label: 'Nopeus', value: '12 m' },
  ],
  abilities: [
    {
      label: 'Karisma',
      score: '16',
      modifier: '+3',
      save: '+5',
      saveProficient: true,
      proficientLabel: 'pätevä',
      scoreLabel: 'Arvo',
      modifierLabel: 'Muuttuja',
      saveLabel: 'Pelastus',
    },
    {
      label: 'Ketteryys',
      score: '12',
      modifier: '+1',
      save: '+1',
      scoreLabel: 'Arvo',
      modifierLabel: 'Muuttuja',
      saveLabel: 'Pelastus',
    },
    {
      label: 'Sitkeys',
      score: '11',
      modifier: '+0',
      save: '+0',
      scoreLabel: 'Arvo',
      modifierLabel: 'Muuttuja',
      saveLabel: 'Pelastus',
    },
    {
      label: 'Viisaus',
      score: '14',
      modifier: '+2',
      save: '+4',
      saveProficient: true,
      proficientLabel: 'pätevä',
      scoreLabel: 'Arvo',
      modifierLabel: 'Muuttuja',
      saveLabel: 'Pelastus',
    },
    {
      label: 'Voimakkuus',
      score: '11',
      modifier: '+0',
      save: '+0',
      scoreLabel: 'Arvo',
      modifierLabel: 'Muuttuja',
      saveLabel: 'Pelastus',
    },
    {
      label: 'Älykkyys',
      score: '12',
      modifier: '+1',
      save: '+1',
      scoreLabel: 'Arvo',
      modifierLabel: 'Muuttuja',
      saveLabel: 'Pelastus',
    },
  ],
  details: [
    { label: 'Taidot', value: 'huijaus +5, suostuttelu +5' },
    { label: 'Haastearvo', value: '1/8 (KOP 25; PB +2)' },
  ],
  sections: [
    {
      title: 'Toiminnot',
      features: [
        {
          name: 'Kalpa',
          description:
            '<em>Lähitaisteluhyökkäys:</em> +3, ulottuvuus 2 m. <em>Osuma:</em> 5 (1n8 + 1) iskuvahinkoa.',
        },
      ],
    },
  ],
};

const tallStatblock: StatblockProps = {
  ...shortStatblock,
  name: 'Kapinakenraali',
  flavor:
    'Pitkä olento, joka ei mahdu yhteen palstaan ilman reikää. Printti pitää kortin koossa (`break-inside: avoid`) ja siirtää sen seuraavaan palstaan tai sivulle.',
  sections: [
    {
      title: 'Toiminnot',
      features: [
        {
          name: 'Kalpa',
          description:
            '<em>Lähitaisteluhyökkäys:</em> +7, ulottuvuus 2 m. <em>Osuma:</em> 11 (2n8 + 2) iskuvahinkoa.',
        },
        {
          name: 'Komentohuuto',
          description:
            'Kenraali valitsee kolme liittolaista 12 metrin etäisyydellä. Kukin saa edun seuraavaan hyökkäysheittoonsa.',
        },
        {
          name: 'Monihyökkäys',
          description: 'Kenraali tekee kaksi kalpahyökkäystä.',
        },
      ],
    },
    {
      title: 'Reaktiot',
      features: [
        {
          name: 'Torjunta',
          description:
            '<em>Laukaisin:</em> Kenraaliin osutaan lähitaisteluhyökkäyksellä. <em>Vastaus:</em> Puolustus +2 kyseistä hyökkäystä vastaan.',
        },
      ],
    },
    {
      title: 'Legendaariset toiminnot',
      features: [
        {
          name: 'Siirtyminen',
          description: 'Kenraali liikkuu nopeudellaan ilman tilaisuushyökkäystä.',
        },
        {
          name: 'Hyökkäys',
          description: 'Kenraali tekee yhden kalpahyökkäyksen.',
        },
        {
          name: 'Komento',
          description: 'Kenraali käyttää komentohuutonsa ilman toimintoa.',
        },
      ],
    },
  ],
};

const spell: SpellblockProps = {
  name: 'Aavevalo',
  typeLine: 'Taikakonsti, luominen',
  lang: 'fi',
  classes: [{ label: 'Luokat', value: 'mystikko, sensaatio' }],
  properties: [
    { label: 'Loitsimisviive', value: '1 toiminto' },
    { label: 'Kantama', value: '20 metriä' },
    { label: 'Komponentit', value: 'taikasana, ele' },
    { label: 'Kesto', value: 'välitön' },
  ],
  paragraphs: [
    'Lähetät tuonpuoleisesta eetteripallon olentoon tai esineeseen kantamalla. Tee loitsuhyökkäys kohteeseen.',
  ],
  features: [
    {
      name: 'Taikakonstin voimistuminen',
      description:
        'Aavevalo tekee 1n8 lisää kuolonvahinkoa kun saavutat hahmotason 5 (2n8), 11 (3n8) ja 17 (4n8).',
    },
  ],
};

const classTable = renderTableShell({
  frame: true,
  scroll: true,
  scrollAxis: 'x',
  table: renderTable({
    variant: 'pair',
    stripe: 'row',
    caption: 'Hurjapään piirteet',
    columns: [
      { key: 'taso', header: 'Taso', kind: 'numeric' },
      { key: 'pb', header: 'PB', kind: 'numeric' },
      { key: 'piirteet', header: 'Piirteet', kind: 'text' },
    ],
    rows: [
      ['1', '+2', 'Hurma, tyyli ja asenne'],
      ['2', '+2', 'Uhkarohkea provokaatio, taistelutyyli, vaaran vaistoaminen'],
      ['3', '+2', 'Väkevä manifesti, manifestin piirre'],
    ],
  }),
});

const abilityGrid = renderAbilityScoreGroup({
  abilities: shortStatblock.abilities ?? [],
});

const articleHtml = (): string => `
<article class="${reading()}">
  <section class="doc-section ${reading()}">
    <h1>Hurjapää</h1>
    <h2>Hurjapään piirteet</h2>
    ${classTable}
    <h2>Hurjapään ydin</h2>
    <p><strong>Osumanopat:</strong> 1n12 jokaista hurjapäätasoa kohden. <strong>Osumapisteet 1. tasolla:</strong> 12 + sitkeysmuuttuja. <strong>Osumapisteet tasonousussa:</strong> 1n12 tai 7 (valitse) + sitkeysmuuttuja.</p>
    <p><strong>Työkalupätevyydet:</strong> ei mitään. <strong>Pelastusheittopätevyydet:</strong> sitkeys, voimakkuus. <strong>Haarniskapätevyydet:</strong> kevyet ja keskiraskaat panssarit, kilvet. <strong>Asepätevyydet:</strong> kaikki aseet.</p>
    <p><strong>Tyypilliset ominaisuudet:</strong> ketteryys, sitkeys, voimakkuus. <strong>Taidot:</strong> Valitse 2: akrobatia, esiintyminen, selviytyminen, tarkkaavaisuus, uhkailu ja urheilu.</p>
    <h2>Hurjapääksi tuleminen…</h2>
    <h3>.. 1. hahmotasolla</h3>
    <p>Saat Hurjapään ydin -listassa olevat asiat ja Hurjapään piirteet -taulukosta 1. tason piirteet.</p>
    <h3>.. myöhemmin lisähahmoluokkana</h3>
    <p>Saat osumanopat, pätevyyden kaikkiin aseisiin ja kilpiin sekä 1. tason hurjapään piirteet. Mekaaniset vaatimukset ovat voimakkuus 13.</p>
    <h2>Hahmoluokan piirteet</h2>
    <h3>Hurma</h3>
    <p>Taso 1: Voit ajaa itsesi ${ref('bonustoimintona', 'mechanic')} taisteluhurmaan. Sinulla on kaksi käyttökertaa. Saat seuraavat vaikutukset ${ref('hurmasta', 'mechanic')}:</p>
    <ul>
      <li>Saat ${ref('edun', 'mechanic')} kaikkiin voimakkuuteen liittyviin ominaisuusheittoihin ja voimakkuus ${ref('pelastusheittoihin', 'mechanic')}.</li>
      <li>Saat hurman vahinkobonuksen, +2, vahinkoosi hyökätessäsi ${ref('lähitaisteluhyökkäyksen', 'mechanic')} käyttäen ketteryyttä tai voimakkuutta.</li>
      <li>Sinulla on ${ref('sietokyky', 'mechanic')} murskaavaa, pistävää tai viiltävää vahinkoa vastaan.</li>
      <li>Et voi loitsia hurman aikana, etkä ylläpitää mitään vaikutusta, mikä vaatii keskittymistä.</li>
    </ul>
    <p>Hurma kestää enintään 15 minuuttia. Se loppuu jos sinut lyödään ${ref('tajuttomaksi', 'condition')} tai et ole hyökännyt kenenkään kimppuun, pakottanut vastustajaa tekemään ${ref('pelastusheittoa', 'mechanic')}, tai saanut itse vahinkoa kierrokseen.</p>
    <p>Kerran lepojen välillä jos hurman käyttökertoja ei ole jäljellä heittäessäsi aloitetta taistelussa, saat yhden käyttökerran takaisin. Et voi astua hurmaan raskaassa haarniskassa.</p>
    <p>Hurmassa vastaanottaessasi maagista parannusta voit muuttaa osan tai kaiken parannuksen ${ref('väliaikaisiksi osumapisteiksi', 'mechanic')} aitojen osumapisteiden sijaan. Käyttökerrat palautuvat ${ref('pitkän levon', 'mechanic')} jälkeen.</p>
    <h3>Tyyli ja asenne</h3>
    <p>Taso 1: Kun sinulla ei ole päälläsi mitään haarniskaa, saat 2 pistettä kestoa joko murskaus-, pisto- tai viiltovahinkoa vastaan. Voit valita ${ref('lyhyen', 'mechanic')} tai ${ref('pitkän levon', 'mechanic')} yhteydessä toisen näistä vahinkotyypeistä.</p>
    <p>${ref('Verissäpäin', 'condition')} ollessasi voit kerran kierroksessa osuessasi ${ref('lähitaisteluhyökkäyksessä', 'mechanic')} yrittää tarttumista tai sysäämistä osana samaa hyökkäystä ilman toiminnon käyttöä.</p>
    <h3>Uhkarohkea provokaatio</h3>
    <p>Taso 2: Voit tehdä uhkarohkean provokaation. Hyökätessäsi tällä tavoin saat voimaa tai ketteryyttä käyttäviin lähitaistelu hyökkäysheittoihin ${ref('edun', 'mechanic')}, mutta kaikki vastustajat voivat halutessaan ottaa edun sinua vastaan tekemiinsä hyökkäyksiin seuraavan vuoronsa loppuun.</p>
    <p>Jos vastustaja valitsee ottaa edun hyökkäykseen sinua vastaan ja vaurioittaa sinua sillä saat puolet kärsimäsi vaurion verran ${ref('väliaikaisia osumapisteitä', 'mechanic')}.</p>
    <h3>Taistelutyyli</h3>
    <p>Taso 2: Voit valita yhden alla olevista taistelutyyleistä. Et voi valita samaa taistelutyyliä toiseen kertaan jos saat valita taistelutyylin uudelleen.</p>
    <h4>Kahden käden aseilla taistelu</h4>
    <p>Kun käytät lähitaisteluasetta kahdella kädellä, kohteesi kesto on hyökkäystäsi kohtaan yhtä pienempi. Voit lisäksi heittää aseesi vahinkonopan tai -nopat uudelleen jos et ole tyytyväinen ensimmäiseen tulokseen, mutta sinun on käytettävä uutta tulosta.</p>
    <h4>Uhrautuva</h4>
    <p>Kun kohteeseen 2 metrin etäisyydellä sinuun osutaan lähitaistelu- tai kantamahyökkäyksellä, voit ${ref('reaktiona', 'mechanic')} vähentää kohteen kärsimän vahingon puoleen (pyöristettynä ylöspäin), ennen kuin kohteen omat vähennykset lasketaan.</p>
    <h3>Vaaran vaistoaminen</h3>
    <p>Taso 2: Saat ${ref('edun', 'mechanic')} ketteryys ${ref('pelastusheittoihin', 'mechanic')}. Vaaran vaistoaminen ei toimi, kun olet ${ref('toimintakyvytön', 'condition')}.</p>
    <h3>Väkevä manifesti</h3>
    <p>Taso 3: Valitset manifestin. Saat manifestisi piirteet hurjapään tasoilla 3, 6, 10 ja 14.</p>
  </section>
  <section class="doc-section ${reading()}">
    <h2>Hurjapäiden manifestit</h2>
    <h3>Spektaakkelin manifesti</h3>
    <h4>Valokeilan ryöstö</h4>
    <p>Taso 3: Kun aloitat ${ref('hurman', 'mechanic')}, voit valita yhden vihollisen saaliksesi. Saalistasi vastaan tämän hurman ollessa voimassa:</p>
    <ul>
      <li>Hyökkäyksesi tekevät hurman vahinkobonuksen verran lisävahinkoa saaliiseesi, jos 4 metrin etäisyydellä sinusta ei ole toista liittolaista.</li>
      <li>Tiedät osuttuasi kerran tähän vaistomaisesti saaliisi ${ref('kestot', 'mechanic')}, ${ref('sietokyvyt', 'mechanic')}, ${ref('immuniteetit', 'mechanic')} ja heikkoudet.</li>
      <li>Sinulla on ${ref('etu', 'mechanic')} kaikkiin tämän vihollisen sinulle pakottamiin pelastusheittoihin, etkä voi tulla tämän vihollisen ${ref('lumoamaksi', 'condition')} tai ${ref('kauhistuttamaksi', 'condition')}.</li>
    </ul>
    <p>Kaikkia muita kuin saalistasi vastaan tämän hurman ollessa voimassa sinulla on ${ref('haitta', 'mechanic')} hyökkäysheittoihisi. Kun saaliisi kuolee, yllä olevat hyödyt ja haitat lakkaavat vaikuttamasta.</p>
  </section>
  <section class="doc-section ${reading()}">
    <h3>Rajatanssijan manifesti</h3>
    <h4>Kuoleman läheisyys</h4>
    <p>Taso 3: Kun olet hurmassa ja ${ref('verissäpäin', 'condition')}, saat seuraavat edut:</p>
    <ul>
      <li>Hyökkäyksesi tekevät 1n6 lisävahinkoa (samaa vahinkotyyppiä kuin alkuperäinen hyökkäys). Tämä kasvaa tasolla 10 2n6:een ja tasolla 14 3n6:een.</li>
      <li>Tehdessäsi uhkarohkean provokaation kimppuusi käyvien vastustajien on pakko vastaanottaa tarjoamasi ${ref('etu', 'mechanic')}.</li>
    </ul>
    <p>Lisäkappale palstojen testaamiseksi: hurjapää lukee vasemmalta oikealle, sitten seuraavalle sivulle. Sisäkkäinen Prose-osio ei saa avata uutta kaksipalstaista kontekstia.</p>
    <p>Toinen kappale rytmistä: Flow pitää otsikoiden ja kappaleiden välit, myös kun palsta katkeaa sivun tai palstan rajalla. Kolmas kappale täyttää mittaa, jotta tulosteeseen syntyy useampi sivu.</p>
    <p>Neljäs kappale: luokkasivut eevenko.to:ssa ovat pitkiä piirreluetteloita. Palstat lyhentävät riviä ja tuovat kirjamaisen mitan ilman erillistä printtinäkymää.</p>
  </section>
  <section class="doc-section ${reading()}">
    <h3>Barrikadien manifesti</h3>
    <h4>Kapinan kipinä</h4>
    <p>Taso 3: Kun aloitat hurman, valitse hurman vahinkobonuksen verran liittolaisia 20 m etäisyydellä. Valitut liittolaiset saavat ${ref('edun', 'mechanic')} seuraavaan pelastusheittoonsa, jos tämä pelastusheitto tapahtuu hurman keston aikana.</p>
    <h2>Domain organisms in the same stream</h2>
    <p>Seuraavat kortit ovat muita reittejä (otukset, loitsut). Niillä ei ole printtiluokkia.</p>
    ${renderStatblock(shortStatblock)}
    <p>Pitkä statblock pysyy yhtenä laatikkona. Jos se ei mahdu jäljellä olevaan palstaan, se siirtyy seuraavaan.</p>
    ${renderStatblock(tallStatblock)}
    ${renderSpellblock(spell)}
    ${abilityGrid}
    <p>Kykyruudukko ja luokkataulukko peittävät molemmat palstat, jotta kuusisarakkeinen grid ei murskaudu 90 millimetriin.</p>
  </section>
</article>
`;

const pageHtml = (): string => {
  const notice = renderNotice({
    variant: 'subtle',
    intent: 'info',
    title: 'SRD-tiivistelmä (Kirjautumaton lukija)',
    body: 'Näet säännöistä tiivistetyn SRD-version. Kirjaudu ilmaisella tunnuksella lukeaksesi koko tekstiversion.',
    actions: renderLinkButton({
      label: 'Kirjaudu ilmaisella Seuraaja-tunnuksella',
      href: '#',
      size: 'sm',
      variant: 'secondary',
    }),
  });
  const menu = renderMenu({
    label: 'Sivustonavigaatio',
    entries: [
      {
        kind: 'group',
        id: 'pc',
        label: 'Pelaajahahmot',
        expanded: true,
        children: [
          { id: 'hurjapaa', label: 'Hurjapää', href: '#', selected: true },
          { id: 'lurjus', label: 'Lurjus', href: '#' },
          { id: 'mystikko', label: 'Mystikko', href: '#' },
        ],
      },
      {
        kind: 'group',
        id: 'rules',
        label: 'Säännöt',
        children: [
          { id: 'combat', label: 'Taistelu', href: '#' },
          { id: 'rest', label: 'Lepo', href: '#' },
        ],
      },
    ],
  });

  return `<div class="print-columns-lab">
  <div class="print-columns-lab__nav">${menu}</div>
  <div class="print-columns-lab__main">${notice}${articleHtml()}</div>
</div>`;
};

const meta: Meta = {
  title: 'Foundations/Print columns',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Same-document print: screen stays one column; @media print on existing hosts snakes Prose into two columns. Print this canvas (not a second URL).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const ClassPage: Story = {
  name: 'Class page (Hurjapää-shaped)',
  render: () => pageHtml(),
};
