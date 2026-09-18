// apps/storybook/src/domain/organisms/Spellblock/Spellblock.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/heading.css';
import '@eevenkoto/css/paragraph.css';
import '@eevenkoto/css/caption.css';
import '@eevenkoto/css/property.css';
import '@eevenkoto/css/statblock-feature.css';
import '@eevenkoto/css/spellblock.css';
import { renderSpellblock, type SpellblockProps } from '@eevenkoto/html';

const aavevalo: SpellblockProps = {
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
    'Lähetät tuonpuoleisesta eetteripallon olentoon tai esineeseen kantamalla. Tee loitsuhyökkäys kohteeseen. Osumalla kohde kärsii 1n8 kuolonvahinkoa eikä voi seuraavan vuorosi loppuun asti hyötyä <em>näkymätön</em> -olotilasta hehkuessaan vaimeaa eetterikajoa.',
  ],
  features: [
    {
      name: 'Taikakonstin voimistuminen',
      description:
        'Aavevalo tekee 1n8 lisää kuolonvahinkoa kun saavutat hahmotason 5 (2n8), 11 (3n8) ja 17 (4n8).',
    },
  ],
};

const elainystava: SpellblockProps = {
  name: 'Eläinystävä',
  typeLine: 'Ensimmäisen piirin lumoaminen',
  lang: 'fi',
  classes: [{ label: 'Luokat', value: 'noutaja, sensaatio' }],
  properties: [
    { label: 'Loitsimisviive', value: '1 toiminto' },
    { label: 'Kantama', value: '10 metriä' },
    { label: 'Komponentit', value: 'taikasana, ele, aines' },
    { label: 'Kesto', value: '24 tuntia' },
  ],
  paragraphs: [
    'Pystyt vakuuttamaan eläimen hyvistä aikomuksistasi ja voittamaan sen luottamuksen. Valitse kohteeksi eläin, jonka näet loitsun kantamalla. Kohteen täytyy onnistua viisauspelastusheitossa tai sillä on <em>lumottu</em> -olotila loitsun keston ajan. Jos sinä tai liittolaisesi vahingoittaa kohdetta, loitsu päättyy.',
  ],
  features: [
    {
      name: 'Korkeammilla piireillä',
      description:
        'Voit valita kohteeksi yhden eläimen lisää jokaista ensimmäistä piiriä korkeampaa loitsuvarausta kohden.',
    },
  ],
};

const linnoitus: SpellblockProps = {
  name: 'Linnoitus',
  typeLine: 'Kuudennen piirin suojelus',
  lang: 'fi',
  classes: [{ label: 'Luokat', value: 'sensaatio, velho' }],
  properties: [
    { label: 'Loitsimisviive', value: '1 tunti' },
    { label: 'Kantama', value: 'kosketus' },
    {
      label: 'Komponentit',
      value: 'taikasana, ele, aines (hopeatanko arvoltaan vähintään 10 kr)',
    },
    { label: 'Kesto', value: '24 tuntia' },
  ],
  paragraphs: [
    'Vedät hopeatangolla ilmaan monimutkaisen riimun, joka uppoaa hitaasti ympäröiviin rakenteisiin. Koko tila huokaisee vaimeasti ottaessaan suojelutaikuuden vastaan. Ilmapiiri muuttuu välittömästi painostavaksi, aivan kuin näkymättömät silmät tarkkailisivat jokaista liikettä.',
    'Luot suojauksen enintään 400 neliömetrin kokoiseen ja enintään 8 metriä korkeaan tilaan. Voit määrittää suojauksen jättämään tietyt henkilöt huomioimatta tai asettaa salasanan, jonka lausuminen tekee puhujasta immuunin loitsun vaikutuksille. Alueella on voimassa seuraavat vaikutukset: käytävät täyttyvät sumusta (peittynyt näkyvyys) ja risteyksissä on 50 % todennäköisyys, että tunkeutuja luulee kulkevansa vastakkaiseen suuntaan.',
    'Ovet lukkiutuvat taianomaisesti (kuten <em>maaginen lukko</em> -loitsu), ja voit peittää jopa kymmenen ovea illuusiolla seinästä. Portaat peittyvät seitistä. Loitsu kestää kunnes kaikki sen vaikutukset puretaan; jos loitsit sen samaan paikkaan 365 päivän ajan, se jää pysyväksi.',
  ],
};

const meta: Meta<SpellblockProps> = {
  title: 'Domain/Organisms/Spellblock',
  parameters: {
    docs: {
      description: {
        component:
          'Spellblock is the spell-entry organism: a banded card with a title plate, a boxed casting-stat band, effect prose, and scaling run-ins.',
      },
    },
  },
  render: (args) => renderSpellblock(args),
};

export default meta;
type Story = StoryObj<SpellblockProps>;

export const Default: Story = {
  args: aavevalo,
};

export const Aavevalo: Story = {
  name: 'Aavevalo (cantrip)',
  args: aavevalo,
};

export const Elainystava: Story = {
  name: 'Eläinystävä (1st level)',
  args: elainystava,
};

export const Linnoitus: Story = {
  name: 'Linnoitus (no scaling footer)',
  args: linnoitus,
  parameters: {
    docs: {
      description: {
        story:
          'Most spells have no scaling entry. Omit `features` and the footer band is not rendered — the card ends on the effect prose.',
      },
    },
  },
};

export const Deck: Story = {
  name: 'Deck (compact grid)',
  render: () => {
    const cards = [aavevalo, elainystava, linnoitus]
      .map((spell) => renderSpellblock({ ...spell, deck: true }))
      .join('');
    return `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(28rem,1fr));gap:1.6rem;align-items:start">${cards}</div>`;
  },
  parameters: {
    docs: {
      description: {
        story:
          'The `deck` variant constrains the card width, steps type down, stacks each casting property label above its value, and drops the label colon so Finnish compounds fit.',
      },
    },
  },
};

export const EmbedNameLevel: Story = {
  name: 'Embed (nameLevel 2)',
  args: {
    ...aavevalo,
    nameLevel: 2,
  },
  parameters: {
    docs: {
      description: {
        story:
          'When the host document already owns an H1, set `nameLevel: 2` so the spell title does not fork the outline.',
      },
    },
  },
};
