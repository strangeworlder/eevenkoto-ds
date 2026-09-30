# Migraatio-ohje: EquipmentWorkshop-rungon (Chassis) käyttöönotto

Tämä ohje kuvaa siirtymisen monoliittisesta `EquipmentWorkshop`-toteutuksesta puhtaaseen design systemin **layout-runkoon (chassis)** versiossa `0.9.3`.

---

## 1. Tausta ja arkkitehtuuripäätös

Eevenkoto Design Systemin rooli on toimia **TTRPG-sisältöjen ja käyttöliittymäkomponenttien design systeminä**, ei kokonaisena sääntömoottorina tai sovelluskehyksenä (*"TTRPG content design system with growing core chrome, not a full app kit"*).

Aiemmassa toteutuksessa `@eevenkoto/core` sisälsi TTRPG-pelimekaniikan laskentakaavoja (`calculateWeapon`, `calculateArmor`), noppaportaita (`stepDice`), esiasetuksia (`WEAPON_PRESETS`) ja satunnaisnimigeneraattoreita. Lisäksi komponentit hallitsivat sisäistä lomaketilaa.

### Uusi vastuunjako:
- **Design System (@eevenkoto/*)**:
  - Tarjoaa layout-rungon (`EquipmentWorkshop`: 2-palstainen responsiivinen asettelu, sticky esikatselupalkki, header-alue).
  - Tarjoaa lomake- ja palautekomponentit (`Input`, `Select`, `Stepper`, `RadioGroup`, `CheckboxGroup`, `SegmentedControl`, `Button`, `Toast`, `Badge`).
  - Tarjoaa esityskomponentin (`EquipmentBlock`).
- **Kuluttajasovellus (esim. eevenko.to web-sovellus)**:
  - Omistaa TTRPG-sääntökaavat ja laskentalogiikan.
  - Hallitsee sovelluskohtaista tilaa (valitut ominaisuudet, aktiivinen välilehti, esiasetukset).

---

## 2. Mitä poistui @eevenkoto/core -paketista?

Seuraavat funktiot, tyypit ja vakiot on poistettu `@eevenkoto/core`- ja wrapper-paketeista:
- `calculateWeapon`, `calculateArmor`
- `weaponToEquipmentBlockProps`, `armorToEquipmentBlockProps`
- `exportWeaponToMarkdown`, `exportArmorToMarkdown`
- `stepDice`, `DICE_LADDER`
- `WEAPON_PRESETS`, `ARMOR_PRESETS`
- `generateWeaponName`, `generateArmorName`
- `DEFAULT_WEAPON_SPEC`, `DEFAULT_ARMOR_SPEC`
- `initEquipmentWorkshop`, `autoInitEquipmentWorkshops`

### Mistä löydän poistuneen sääntömoottorikoodin?
Täydellinen, toimiva sääntömoottorin referenssitoteutus on siirretty tiedostoon:
[`apps/storybook/src/domain/organisms/EquipmentWorkshop/equipmentRules.ts`](../apps/storybook/src/domain/organisms/EquipmentWorkshop/equipmentRules.ts).

Voit kopioida tämän tiedoston suoraan omaan kuluttajasovellukseesi (esim. `src/domain/equipmentRules.ts`).

---

## 3. Miten käytän uutta EquipmentWorkshop-runkoa?

### React

**Ennen (v0.9.2):**
```tsx
import { EquipmentWorkshop } from '@eevenkoto/react';

// Monoliittinen komponentti, joka teki kaiken itse:
<EquipmentWorkshop initialMode="weapons" />
```

**Nyt (v0.9.3+):**
```tsx
import { useState } from 'react';
import {
  EquipmentWorkshop,
  EquipmentBlock,
  RadioGroup,
  CheckboxGroup,
  Input,
  Toast,
} from '@eevenkoto/react';
// Tuo oma sovelluslogiikkasi / sääntömoottorisi:
import { calculateWeapon, weaponToEquipmentBlockProps } from './myEquipmentRules';

export const MyWeaponWorkshop = () => {
  const [weapon, setWeapon] = useState({
    name: 'Korppiterä',
    weaponClass: 'sota_ase',
    mainTraits: ['viiltava'],
    // ...
  });

  const result = calculateWeapon(weapon);
  const previewProps = weaponToEquipmentBlockProps(result);

  return (
    <EquipmentWorkshop
      header={<h2>Aseverstas</h2>}
      controls={
        <div>
          <Input
            value={weapon.name}
            onChange={(e) => setWeapon({ ...weapon, name: e.target.value })}
            ariaLabel="Aseen nimi"
          />
          <RadioGroup
            name="wclass"
            label="Asepätevyysluokka:"
            value={weapon.weaponClass}
            onChange={(val) => setWeapon({ ...weapon, weaponClass: val })}
            options={[/* ... */]}
          />
          {/* Muut ohjaimet: CheckboxGroup, Stepper jne. */}
        </div>
      }
      preview={<EquipmentBlock {...previewProps} />}
    />
  );
};
```

### Vue

**Ennen (v0.9.2):**
```html
<script setup>
import { EquipmentWorkshop } from '@eevenkoto/vue';
</script>

<template>
  <EquipmentWorkshop initial-mode="weapons" />
</template>
```

**Nyt (v0.9.3+):**
```html
<script setup>
import { ref, computed } from 'vue';
import { EquipmentWorkshop, EquipmentBlock, Input, RadioGroup } from '@eevenkoto/vue';
import { calculateWeapon, weaponToEquipmentBlockProps } from './myEquipmentRules';

const weapon = ref({
  name: 'Korppiterä',
  weaponClass: 'sota_ase',
  mainTraits: ['viiltava'],
});

const previewProps = computed(() =>
  weaponToEquipmentBlockProps(calculateWeapon(weapon.value))
);
</script>

<template>
  <EquipmentWorkshop>
    <template #header>
      <h2>Aseverstas</h2>
    </template>

    <template #controls>
      <Input v-model="weapon.name" aria-label="Aseen nimi" />
      <!-- Muut ohjaimet -->
    </template>

    <template #preview>
      <EquipmentBlock v-bind="previewProps" />
    </template>
  </EquipmentWorkshop>
</template>
```

### Vanilla HTML

```ts
import { renderEquipmentWorkshop, renderEquipmentBlock } from '@eevenkoto/html';

const html = renderEquipmentWorkshop({
  header: '<h2>Aseverstas</h2>',
  controls: '<div class="eevenkoto-equipment-workshop__control-group">...lomakekentät...</div>',
  preview: renderEquipmentBlock(calculatedProps),
});
```

---

## 4. Tyyliluokat ja apumuotoilut

CSS-luokka `.eevenkoto-equipment-workshop` sisältää automaattisesti:
- Responsiivisen 2-palstaisen grid-asettelun (`controls` vasemmalla, `preview` oikealla).
- Mobiililaitteilla automaattisen 1-palstaisen asettelun.
- Sticky-sijoittelun `preview`-sarakkeelle työpöytänäkymässä.
- Valmiit apuluokat ryhmittelyille:
  - `.eevenkoto-equipment-workshop__control-group`
  - `.eevenkoto-equipment-workshop__group-label`
  - `.eevenkoto-equipment-workshop__group-hint`
  - `.eevenkoto-equipment-workshop__name-row`
  - `.eevenkoto-equipment-workshop__stepper-grid`
