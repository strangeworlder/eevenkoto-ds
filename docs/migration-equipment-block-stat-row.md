# Migraatio-ohje: EquipmentBlock-tilastorivin (Stat Row) uudistus ja AbilityName-atomi

Tämä ohje kuvaa siirtymisen `EquipmentBlock`-komponentin vanhasta 4-laatikon tilastorivistä uuteen korostettuun 3-laatikon malliin sekä uuden `AbilityName`-domain-atomin käyttöönoton versiossa `0.9.5`.

---

## 1. Tausta ja arkkitehtuuripäätös

Aiemmassa toteutuksessa `EquipmentBlock`:in tilasto-osio (`eevenkoto-equipment-block__stats`) käytti 4-sarakkeista ruudukkoa sekä aseille että haarniskoille.

Käytännön pelipöytä- ja sääntökirjakäytössä havaittiin seuraavat kehityskohteet:
1. **Tärkeimmät arvot hukkuivat massaan:** Pelaajalle ja pelinjohtajalle kriittisimmät numerot ovat aseissa **Vahinko** ja haarniskoissa **Puolustus (PL)**. Niillä ei aiemmin ollut visuaalista hierarkiaeroa toisarvoisiin tietoihin nähden.
2. **Liiallinen tilanvienti ja tarpeettomat laatikot:**
   - Aseiden *"Käyttö"*-laatikko (1-kätinen / 2-kätinen) vei oman ruutunsa, vaikka tieto ilmenee luontevasti vahinkonopasta (esim. `1n8/1n10`) tai erikoispiirteistä (*Monikäyttöinen*, *Kahden käden*).
   - Haarniskojen *"Kilpi"*-laatikko vei neljännen ruudun silloinkin, kun kyseessä oli pelkkä vartalopanssari ilman kilpeä.
   - Haarniskan *"Nopeusvaikutus"* ja aseen *"Ominaisuus"* olivat tarpeettoman pitkiä otsikoita pieniin laatikoihin.
3. **Ulottuvuuden ja heiton hajonta:** Lähitaisteluaseissa ulottuvuus ja heittokantama liittyvät tiiviisti toisiinsa.
4. **Ominaisuuksien nimien tilankäyttö:** Aseiden käyttämä ominaisuus (*Voimakkuus*, *Ketteryys*) vei paljon tilaa. Useamman ominaisuuden yhdistelmät (*Voimakkuus tai Ketteryys*) eivät mahtuneet kapeaan laatikkoon siististi ilman hallittua lyhennysmekanismia.

### Uusi ratkaisu:
- **3-laatikon selkeä ruudukko** sekä aseille että haarniskoille.
- **Visuaalinen painotus (`emphasis: true`)**: Vahinko ja Puolustus saavat korostetun taustasävyn, reunaviivan ja suuremman typografian. Keskikokoisissa näkymissä korostettu laatikko ottaa automaattisesti koko ylärivin.
- **Vahinkotyyppi pääarvon alle (`subValue`)**: Vahinkonopan alle sijoitettu pienempi, himmeämpi lisätieto (esim. `"Viiltävä"` nopan `"1n8"` alla).
- **Jaettu laatikko (`subItems`)**: Ulottuvuus ja heittokantama esitetään samassa laatikossa rinnakkaisilla minisarakeotsikoilla. Kantama-aseilla käytetään vastaavasti suoraa `Kantama`-ruutua.
- **Uusi `AbilityName`-atomi**: Ominaisuuden nimi (`Voimakkuus`, `Ketteryys` jne.) esitetään kokonaisena aina kun tila riittää, mutta kapeassa laatikossa tai useamman ominaisuuden rinnakkaisasettelussa se lyhenee responsiivisesti 3-kirjaimiseen suuraakkosmuotoon (`VOI`, `KET`).

---

## 2. Rajapintamuutokset (API)

### `EquipmentStatItem` ja `EquipmentStatSubItem` (@eevenkoto/core)

`EquipmentStatItem`-rajapintaa on laajennettu seuraavilla valinnaisilla kentillä:

```ts
export interface EquipmentStatSubItem {
  /** Pieni yläotsikko jaetun laatikon sisällä (esim. "Ulottuvuus" tai "Heitto") */
  label: string;
  /** Alaotsikon arvo (esim. "2 m" tai "6/16 m") */
  value: string;
}

export interface EquipmentStatItem {
  label: string;
  value?: string;
  /** Visuaalinen painotus (suurempi fontti, korostettu tehostetausta ja reunus) */
  emphasis?: boolean;
  /** Toissijainen arvo pääarvon alla (esim. vahinkotyyppi "Viiltävä") */
  subValue?: string;
  /** Jaettu laatikko kahdelle rinnakkaiselle arvolle */
  subItems?: EquipmentStatSubItem[];
  /** Ominaisuusnimet, jotka renderöidään AbilityName-atomeina */
  abilities?: string[];
  /** Ominaisuusnimen esitystapa ('auto' = responsiivinen, 'full' = aina pitkä, 'short' = aina lyhyt) */
  abilityMode?: 'auto' | 'full' | 'short';
}
```

### Uusi atomi: `AbilityName`

Käytettävissä kaikissa paketeissa:
- `@eevenkoto/core`: `AbilityNameProps`, `abbreviateAbility()`, `abilityNameClassNames()`
- `@eevenkoto/css`: `@eevenkoto/css/ability-name.css`
- `@eevenkoto/html`: `renderAbilityName(props)`
- `@eevenkoto/react`: `<AbilityName name="..." />`
- `@eevenkoto/vue`: `<AbilityName name="..." />`

Jos ase vaatii useamman vaihtoehtoisen ominaisuuden, suositeltava tapa on kompostoida useampi atomi erillisinä:
```tsx
<AbilityName name="Voimakkuus" /> tai <AbilityName name="Ketteryys" />
```
tai välittää ne suoraan `EquipmentStatItem`:in `abilities`-taulukossa:
```ts
{
  label: 'Omin.',
  value: 'Voimakkuus tai Ketteryys',
  abilities: ['Voimakkuus', 'Ketteryys'],
}
```

---

## 3. Ennen ja jälkeen -koodiesimerkit

### Aseen tilastorivi (Weapon)

#### Ennen (v0.9.4 ja aiemmat — 4 laatikkoa):
```tsx
<EquipmentBlock
  name="Pitkämiekka"
  category="Sota-ase · Lähitaistelu"
  price="25 kr"
  stats={[
    { label: 'Vahinko', value: '1n8/1n10 viiltovahinko' },
    { label: 'Ominaisuus', value: 'Voimakkuus' },
    { label: 'Ulottuvuus', value: '2 m' },
    { label: 'Käyttö', value: '1- tai 2-kätinen' },
  ]}
  traits={['Monikäyttöinen', 'Viiltävä']}
/>
```

#### Nyt (v0.9.5 — 3 laatikkoa, korostus, subValue, subItems):
```tsx
<EquipmentBlock
  name="Pitkämiekka"
  category="Sota-ase · Lähitaistelu"
  price="25 kr"
  stats={[
    {
      label: 'Vahinko',
      value: '1n8/1n10',
      subValue: 'Viiltävä',
      emphasis: true,
    },
    {
      label: 'Omin.',
      value: 'Voimakkuus',
      abilities: ['Voimakkuus'],
    },
    {
      label: 'Ulottuvuus & heitto',
      subItems: [
        { label: 'Ulottuvuus', value: '2 m' },
        { label: 'Heitto', value: '4/10 m' },
      ],
    },
  ]}
  traits={['Monikäyttöinen', 'Viiltävä']}
/>
```

#### Monikäyttöinen tarkkuusase (useampi ominaisuus):
```tsx
<EquipmentBlock
  name="Kalpa"
  category="Sota-ase · Lähitaistelu"
  price="25 kr"
  stats={[
    {
      label: 'Vahinko',
      value: '1n8',
      subValue: 'Pistävä',
      emphasis: true,
    },
    {
      label: 'Omin.',
      value: 'Voimakkuus tai Ketteryys',
      abilities: ['Voimakkuus', 'Ketteryys'],
    },
    {
      label: 'Ulottuvuus & heitto',
      subItems: [
        { label: 'Ulottuvuus', value: '2 m' },
        { label: 'Heitto', value: 'Ei heitettävä' },
      ],
    },
  ]}
  traits={['Tarkkuus', 'Pistävä']}
/>
```

#### Kantama-ase (Ranged):
```tsx
<EquipmentBlock
  name="Kivääri"
  category="Sota-ase · Kantama-ase"
  price="35 kr"
  stats={[
    {
      label: 'Vahinko',
      value: '2n8',
      subValue: 'Isku',
      emphasis: true,
    },
    {
      label: 'Omin.',
      value: 'Ketteryys',
      abilities: ['Ketteryys'],
    },
    {
      label: 'Kantama',
      value: '40/120 m',
    },
  ]}
  traits={['Raskas', 'Perinteinen']}
/>
```

---

### Haarniskan tilastorivi (Armor)

#### Ennen (v0.9.4 ja aiemmat — 4 laatikkoa):
```tsx
<EquipmentBlock
  name="Rengaspanssari"
  category="Keskiraskas panssari"
  price="20 kr"
  stats={[
    { label: 'Puolustus (PL)', value: '13 + KET (maks. +2)' },
    { label: 'Nopeusvaikutus', value: '−2 m nopeus' },
    { label: 'Hiipiminen', value: 'Haitta' },
    { label: 'Kilpi', value: 'Ei kilpeä' },
  ]}
  traits={['Keskiraskas']}
/>
```

#### Nyt (v0.9.5 — 3 laatikkoa, korostettu PL, tiiviit otsikot):
```tsx
<EquipmentBlock
  name="Rengaspanssari"
  category="Keskiraskas panssari"
  price="20 kr"
  stats={[
    {
      label: 'Puolustus (PL)',
      value: '13 + KET (maks. +2)',
      emphasis: true,
    },
    {
      label: 'Nopeus',
      value: '−2 m',
    },
    {
      label: 'Hiipiminen',
      value: 'Haitta',
    },
  ]}
  traits={['Keskiraskas']}
/>
```

---

## 4. Sovelluksen sääntömoottorin adapterit

Jos sovelluksesi käyttää laskentafunktioita (kuten `weaponToEquipmentBlockProps` tai `armorToEquipmentBlockProps`), päivitä muunnosfunktiosi seuraavan mallin mukaisesti:

```ts
import type { EquipmentBlockProps, EquipmentStatItem } from '@eevenkoto/core';

export const weaponToEquipmentBlockProps = (
  res: WeaponCalculationResult,
  showCopy = true,
): EquipmentBlockProps => {
  const damageTypeShort = res.damageType.replace('vahinko', '').trim();
  const damageDie = res.finalDamage.replace(` ${res.damageType}`, '').trim();

  const stats: EquipmentStatItem[] = [
    {
      label: 'Vahinko',
      value: damageDie,
      subValue: damageTypeShort,
      emphasis: true,
    },
    {
      label: 'Omin.',
      value: res.ability,
      abilities: res.ability.split(' tai ').map((s) => s.trim()),
    },
    res.weaponType === 'kantama'
      ? { label: 'Kantama', value: res.range }
      : {
          label: 'Ulottuvuus & heitto',
          subItems: [
            { label: 'Ulottuvuus', value: res.reach },
            { label: 'Heitto', value: res.range.replace(' (heitto)', '') },
          ],
        },
  ];

  return {
    name: res.name,
    category: `${res.weaponClass} · ${res.weaponType}`,
    price: `${res.price.amount} ${res.price.unit}`,
    stats,
    traits: res.traits,
    notes: res.notes,
    showCopyButton: showCopy,
  };
};

export const armorToEquipmentBlockProps = (
  res: ArmorCalculationResult,
  showCopy = true,
): EquipmentBlockProps => {
  const stats: EquipmentStatItem[] = [
    {
      label: 'Puolustus (PL)',
      value: res.totalDefense,
      emphasis: true,
    },
    {
      label: 'Nopeus',
      value: res.speedPenalty || '—',
    },
    {
      label: 'Hiipiminen',
      value: res.stealthPenalty ? 'Haitta' : 'Normaali',
    },
  ];

  return {
    name: res.name,
    category: res.armorType,
    price: `${res.price.amount} ${res.price.unit}`,
    stats,
    traits: res.traits,
    notes: res.notes,
    showCopyButton: showCopy,
  };
};
```

---

## 5. Tyylitiedostot ja CSS

Jos sovelluksesi tuo komponenttikohtaisia CSS-tiedostoja, muista lisätä uusi `@eevenkoto/css/ability-name.css`:

```css
/* Esimerkki komponenttikohtaisista tuonneista */
@import '@eevenkoto/css/equipment-block.css';
@import '@eevenkoto/css/ability-name.css';
```

Kokoelmatyylitiedostoja tai bundler-tuonteja käyttäessäsi varmista, että uusi tiedosto sisällytetään pakettiin.

---

## 6. Migraation tarkistuslista

- [ ] **Tilastorivin pituus:** Lyhennä aseiden ja haarniskojen `stats`-taulukot 4:stä 3:een laatikkoon.
- [ ] **Visuaalinen painotus:** Aseta `emphasis: true` aseen vahinkoruudulle ja haarniskan puolustusruudulle.
- [ ] **Vahinkotyyppi:** Erota vahinkotyyppi erilliseksi `subValue`-arvoksi aseen vahinkonopan alapuolelle (esim. `value: '1n8'`, `subValue: 'Viiltävä'`).
- [ ] **Ominaisuudet ja AbilityName:** Muuta otsikko muotoon `"Omin."` ja välitä kyvyt `abilities`-taulukossa (tai käytä suoraan `<AbilityName />` -atomeja).
- [ ] **Ulottuvuus ja heitto:** Korvaa erilliset laatikot jaetulla ruudulla lähitaisteluaseissa käyttäen `subItems: [{ label: 'Ulottuvuus', ... }, { label: 'Heitto', ... }]`.
- [ ] **Kantama-aseet:** Käytä yhtä `{ label: 'Kantama', value: ... }` -ruutua.
- [ ] **Poistettavat laatikot:** Poista vanhat `"Kilpi"`- ja `"Käyttö"`-laatikot.
- [ ] **Haarniskan nopeus:** Muuta otsikko `"Nopeusvaikutus"` -> `"Nopeus"`.
- [ ] **CSS:** Varmista että `@eevenkoto/css/ability-name.css` on tuotu sovellukseen.
