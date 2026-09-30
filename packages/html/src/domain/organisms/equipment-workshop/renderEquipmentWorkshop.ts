import {
  badgeClassNames,
  equipmentWorkshopClassNames,
  calculateWeapon,
  calculateArmor,
  weaponToEquipmentBlockProps,
  armorToEquipmentBlockProps,
  WEAPON_PRESETS,
  ARMOR_PRESETS,
  type EquipmentWorkshopProps,
  type WeaponSpec,
  type ArmorSpec,
} from '@eevenkoto/core';
import { renderButton } from '../../../core/atoms/button/renderButton';
import { renderIcon } from '../../../core/atoms/icon/renderIcon';
import { renderInput } from '../../../core/atoms/input/renderInput';
import { renderSelect } from '../../../core/atoms/select/renderSelect';
import { renderSegmentedControl } from '../../../core/molecules/segmented-control/renderSegmentedControl';
import { renderRadioGroup } from '../../../core/molecules/radio-group/renderRadioGroup';
import { renderCheckboxGroup } from '../../../core/molecules/checkbox-group/renderCheckboxGroup';
import { renderStepper } from '../../../core/molecules/stepper/renderStepper';
import { renderEquipmentBlock } from '../equipment-block/renderEquipmentBlock';
import { escapeHtml } from '../../../utils/html';
import template from './EquipmentWorkshop.html';

export type { EquipmentWorkshopProps };

export const DEFAULT_WEAPON_SPEC: WeaponSpec = {
  name: 'Kustomoitu ase',
  weaponClass: 'sota_ase',
  weaponType: 'lahitaistelu',
  mainTraits: [],
  addTrait: 'none',
  aetherTrait: 'none',
};

export const DEFAULT_ARMOR_SPEC: ArmorSpec = {
  name: 'Räätälöity panssari',
  armorType: 'kevyt',
  generalTraits: {
    iskunvaimennus: 0,
    leikkauskestavyys: 0,
    pistosuojaus: 0,
    vahvistettu: 0,
  },
  specialTraits: [],
  shield: 'none',
};

export const renderEquipmentWorkshop = (props: EquipmentWorkshopProps = {}): string => {
  const mode = props.initialMode ?? 'weapons';
  const weaponSpec: WeaponSpec = props.initialWeapon
    ? { ...props.initialWeapon }
    : { ...DEFAULT_WEAPON_SPEC };
  const armorSpec: ArmorSpec = props.initialArmor
    ? { ...props.initialArmor, generalTraits: { ...props.initialArmor.generalTraits } }
    : { ...DEFAULT_ARMOR_SPEC, generalTraits: { ...DEFAULT_ARMOR_SPEC.generalTraits } };

  const idSuffix = props.idSuffix ? `-${props.idSuffix}` : '';
  const modeControlName = `equipment-workshop-mode${idSuffix}`;
  const weaponClassName = `weapon-class${idSuffix}`;
  const weaponTypeName = `weapon-type${idSuffix}`;
  const weaponMainTraitName = `weapon-main-trait${idSuffix}`;
  const weaponAddTraitName = `weapon-add-trait${idSuffix}`;
  const armorTypeName = `armor-type${idSuffix}`;
  const armorSpecialTraitName = `armor-special-trait${idSuffix}`;

  // 1. Header: Mode nav & Presets
  const modeSelectorHtml = renderSegmentedControl({
    name: modeControlName,
    label: 'Varustetyyppi',
    selectedId: mode,
    options: [
      { id: 'weapons', label: 'Aseverstas', icon: 'swords' },
      { id: 'armor', label: 'Haarniskaverstas', icon: 'shield' },
    ],
  });

  const presetSelectorHtml =
    `<div class="eevenkoto-equipment-workshop__preset-group">` +
    `<label class="eevenkoto-equipment-workshop__preset-label" for="preset-select${idSuffix}">Pohjavalinta:</label>` +
    renderSelect({
      id: `preset-select${idSuffix}`,
      dataRole: 'preset-select',
      placeholder: '— Valitse esimerkkivaruste —',
      groups: [
        {
          label: 'Aseet',
          options: WEAPON_PRESETS.map((p) => ({ value: `weapon:${p.id}`, label: p.label })),
        },
        {
          label: 'Haarniskat',
          options: ARMOR_PRESETS.map((p) => ({ value: `armor:${p.id}`, label: p.label })),
        },
      ],
    }) +
    `</div>`;

  const headerHtml =
    `<div class="eevenkoto-equipment-workshop__header">` +
    `<div class="eevenkoto-equipment-workshop__mode-nav">${modeSelectorHtml}</div>` +
    presetSelectorHtml +
    `</div>`;

  // 2. Weapons panel controls
  const weaponInitialRes = calculateWeapon(weaponSpec);
  const weaponBudgetBadge =
    `<span class="${badgeClassNames({ variant: 'solid', intent: weaponInitialRes.usedMainTraits > weaponInitialRes.maxMainTraits ? 'critical' : 'neutral' })}" data-role="weapon-budget-badge">` +
    `${weaponInitialRes.usedMainTraits} / ${weaponInitialRes.maxMainTraits} käytetty</span>`;

  const weaponPanelHtml =
    `<div class="eevenkoto-equipment-workshop__panel eevenkoto-equipment-workshop__panel--weapons${mode === 'weapons' ? ' eevenkoto-equipment-workshop__panel--active' : ''}" data-panel="weapons">` +
    // Weapon Name
    `<div class="eevenkoto-equipment-workshop__control-group">` +
    `<label class="eevenkoto-equipment-workshop__group-label" for="weapon-name-input${idSuffix}">Aseen nimi:</label>` +
    `<div class="eevenkoto-equipment-workshop__name-row">` +
    renderInput({
      id: `weapon-name-input${idSuffix}`,
      value: weaponSpec.name,
      placeholder: 'esim. Korppiterä, Metsästyskivääri...',
      ariaLabel: 'Aseen nimi',
    }).replace('<input ', '<input data-role="weapon-name" ') +
    renderButton({
      label: 'Arvo nimi',
      icon: 'dice',
      iconPosition: 'left',
      variant: 'secondary',
      size: 'md',
    }).replace('<button ', '<button data-role="btn-random-weapon-name" title="Arvo satunnainen nimi" ') +
    `</div>` +
    `</div>` +
    // Weapon Class (RadioGroup grid 3 tile)
    renderRadioGroup({
      name: weaponClassName,
      label: 'Asepätevyysluokka:',
      layout: 'grid',
      columns: 3,
      variant: 'tile',
      value: weaponSpec.weaponClass,
      options: [
        { value: 'improvisoitu', label: 'Improvisoitu', description: '1n4 isku · 10 kup' },
        { value: 'yksinkertainen', label: 'Yksinkertainen', description: '1n6 isku · 10 hr' },
        { value: 'sota_ase', label: 'Sota-ase', description: '1n6 isku · 10 kr' },
      ],
    }) +
    // Weapon Type (RadioGroup grid 2 tile)
    renderRadioGroup({
      name: weaponTypeName,
      label: 'Aseen tyyppi:',
      layout: 'grid',
      columns: 2,
      variant: 'tile',
      value: weaponSpec.weaponType,
      options: [
        {
          value: 'lahitaistelu',
          label: 'Lähitaisteluase',
          description: 'VOI · Ulottuvuus 2 m · Heitto 4/10 m',
        },
        {
          value: 'kantama',
          label: 'Kantama-ase',
          description: 'KET · Kantama 20/60 m (+150 % hinta)',
        },
      ],
    }) +
    // Main Traits (CheckboxGroup stack card)
    renderCheckboxGroup({
      name: weaponMainTraitName,
      label: 'Pääpiirteet:',
      badge: `${weaponInitialRes.usedMainTraits} / ${weaponInitialRes.maxMainTraits} käytetty`,
      badgeIntent: weaponInitialRes.usedMainTraits > weaponInitialRes.maxMainTraits ? 'critical' : 'neutral',
      layout: 'stack',
      items: [
        {
          value: 'tarkkuus',
          label: 'Tarkkuus',
          description: 'Käytä KET tai VOI (lähitaistelu) tai KET/VII (kantama). (+100 % hinta)',
          variant: 'card',
          checked: weaponSpec.mainTraits.includes('tarkkuus'),
        },
        {
          value: 'ulottuva',
          label: 'Ulottuva',
          description: 'Tuplaa aseen kantaman, ulottuvuuden (4 m) tai heittoetäisyyden. (+100 % hinta)',
          variant: 'card',
          checked: weaponSpec.mainTraits.includes('ulottuva'),
        },
        {
          value: 'viiltava',
          label: 'Viiltävä',
          description: 'Vahinkonoppa +1 ketjulla. Tyyppi: viilto. Ei kantama-aseeseen. (+100 % hinta)',
          variant: 'card',
          checked: weaponSpec.mainTraits.includes('viiltava'),
        },
        {
          value: 'pistava',
          label: 'Pistävä',
          description: 'Kriittinen osuma tekee +5 vahinkoa (+10 jos 2 kättä). Tyyppi: pisto. (+100 % hinta)',
          variant: 'card',
          checked: weaponSpec.mainTraits.includes('pistava'),
        },
        {
          value: 'murskaava',
          label: 'Murskaava',
          description: 'Noppa -1 noppaketjulla, mutta 2 noppaa (esim. 1n6 → 2n4). Tyyppi: murskaus. (+100 % hinta)',
          variant: 'card',
          checked: weaponSpec.mainTraits.includes('murskaava'),
        },
        {
          value: 'raskas',
          label: 'Raskas (vain sota-aseet)',
          description: 'Vahinkonoppa +2 ketjulla (1n6 → 1n10). Kahdella kädellä. Ei heittoa. (+150 % hinta)',
          variant: 'card',
          checked: weaponSpec.mainTraits.includes('raskas'),
        },
        {
          value: 'monikayttoinen',
          label: 'Monikäyttöinen (vain sota-aseet)',
          description: '1 tai 2 kättä. Kahdella kädellä vahinkonoppa +1 ketjulla. (+150 % hinta)',
          variant: 'card',
          checked: weaponSpec.mainTraits.includes('monikayttoinen'),
        },
      ],
    }).replace('<span class="eevenkoto-badge ', '<span data-role="weapon-budget-badge" class="eevenkoto-badge ') +
    // Add Trait (RadioGroup stack card)
    renderRadioGroup({
      name: weaponAddTraitName,
      label: 'Lisäpiirre (enintään 1):',
      layout: 'stack',
      variant: 'card',
      value: weaponSpec.addTrait,
      options: [
        { value: 'none', label: 'Ei lisäpiirrettä' },
        {
          value: 'kevyt',
          label: 'Kevyt',
          description: 'Noppa -1 ketjulla. Kahden aseen taistelu. Heitto 6/16 m. Hinta 50 %.',
        },
        {
          value: 'kompelo',
          label: 'Kömpelö',
          description: 'Noppa +1 ketjulla. Aloite 1n12. 2 kättä. Vain improvisoidut/yksinkertaiset. Hinta 75 %.',
        },
        {
          value: 'perinteinen',
          label: 'Perinteinen',
          description: 'Vain kantama-aseet. Tuplaa kantaman. Lataus hahmotoiminto. Vain iskuvahinko. Hinta 75 %.',
        },
      ],
    }) +
    // Aether Trait
    `<div class="eevenkoto-equipment-workshop__control-group">` +
    `<label class="eevenkoto-equipment-workshop__group-label" for="weapon-aether-select${idSuffix}">Eetteripiirre (valinnainen):</label>` +
    renderSelect({
      id: `weapon-aether-select${idSuffix}`,
      dataRole: 'weapon-aether',
      value: weaponSpec.aetherTrait,
      options: [
        { value: 'none', label: 'Ei eetteripiirrettä' },
        { value: 'tyonto', label: 'Työntö — Isku työntää 4 m taaksepäin (voimavahinko) [+20 pt]' },
        { value: 'tuhoisa', label: 'Tuhoisa — Ohi-isku tekee 2 pistettä vauriota (ukkosvahinko) [+20 pt]' },
        { value: 'hidastava', label: 'Hidastava — Isku hidastaa kohdetta 4 m (kylmävahinko) [+20 pt]' },
        { value: 'kehittynyt', label: 'Kehittynyt — Vahinkonoppa +1 ketjulla (tulivahinko) [+30 pt]' },
        { value: 'maaginen', label: 'Maaginen — Maaginen ase, hämärä valo 6 m [+10 pt]' },
      ],
    }) +
    `<small class="eevenkoto-equipment-workshop__group-hint">Eetteripiirre antaa +1 pääpiirreslotin ja muuttaa hinnan platinaksi.</small>` +
    `</div>` +
    `</div>`;

  // 3. Armor panel controls
  const armorInitialRes = calculateArmor(armorSpec);
  const armorBudgetBadge =
    `<span class="${badgeClassNames({ variant: 'solid', intent: armorInitialRes.usedTraits > armorInitialRes.maxTraits ? 'critical' : 'neutral' })}" data-role="armor-budget-badge">` +
    `${armorInitialRes.usedTraits} / ${armorInitialRes.maxTraits} valittu</span>`;

  const armorPanelHtml =
    `<div class="eevenkoto-equipment-workshop__panel eevenkoto-equipment-workshop__panel--armor${mode === 'armor' ? ' eevenkoto-equipment-workshop__panel--active' : ''}" data-panel="armor">` +
    // Armor Name
    `<div class="eevenkoto-equipment-workshop__control-group">` +
    `<label class="eevenkoto-equipment-workshop__group-label" for="armor-name-input${idSuffix}">Haarniskan nimi:</label>` +
    `<div class="eevenkoto-equipment-workshop__name-row">` +
    renderInput({
      id: `armor-name-input${idSuffix}`,
      value: armorSpec.name,
      placeholder: 'esim. Eetterivahvistettu liivi...',
      ariaLabel: 'Haarniskan nimi',
    }).replace('<input ', '<input data-role="armor-name" ') +
    renderButton({
      label: 'Arvo nimi',
      icon: 'dice',
      iconPosition: 'left',
      variant: 'secondary',
      size: 'md',
    }).replace('<button ', '<button data-role="btn-random-armor-name" title="Arvo satunnainen nimi" ') +
    `</div>` +
    `</div>` +
    // Armor Type (RadioGroup grid 2 tile)
    renderRadioGroup({
      name: armorTypeName,
      label: 'Haarniskatyyppi:',
      layout: 'grid',
      columns: 2,
      variant: 'tile',
      value: armorSpec.armorType,
      options: [
        { value: 'vaatetus', label: 'Vaatetus', description: 'PL 10 + KET · Kesto 0 · 1 piirre · 1 kr' },
        { value: 'kevyt', label: 'Kevyt panssari', description: 'PL 11 + KET · Kesto 1 · 1 piirre · 2 kr' },
        {
          value: 'keskiraskas',
          label: 'Keskiraskas panssari',
          description: 'PL 13 + KET (max +2) · Kesto 2 · 2 piirrettä · 20 kr',
        },
        { value: 'raskas', label: 'Raskas panssari', description: 'PL 15 · Kesto 3 · 4 piirrettä · 200 kr' },
      ],
    }) +
    // General Traits Steppers
    `<div class="eevenkoto-equipment-workshop__control-group">` +
    `<div class="eevenkoto-equipment-workshop__group-header">` +
    `<span class="eevenkoto-equipment-workshop__group-label">Yleiset piirteet (voi ottaa useasti):</span>` +
    armorBudgetBadge +
    `</div>` +
    `<div class="eevenkoto-equipment-workshop__stepper-grid">` +
    renderStepper({
      name: 'iskunvaimennus',
      label: 'Iskunvaimennus',
      description: '+1 kesto murskausta vastaan (+100 % hinta)',
      value: armorSpec.generalTraits.iskunvaimennus,
    }) +
    renderStepper({
      name: 'leikkauskestavyys',
      label: 'Leikkauskestävyys',
      description: '+1 kesto viiltoa vastaan (+100 % hinta)',
      value: armorSpec.generalTraits.leikkauskestavyys,
    }) +
    renderStepper({
      name: 'pistosuojaus',
      label: 'Pistosuojaus',
      description: '+1 kesto pistoa vastaan (+100 % hinta)',
      value: armorSpec.generalTraits.pistosuojaus,
    }) +
    renderStepper({
      name: 'vahvistettu',
      label: 'Vahvistettu',
      description: '+1 puolustukseen (PL) (+50 % hinta)',
      value: armorSpec.generalTraits.vahvistettu,
    }) +
    `</div>` +
    `</div>` +
    // Special Traits (CheckboxGroup stack card)
    renderCheckboxGroup({
      name: armorSpecialTraitName,
      label: 'Erikoispiirteet (keskiraskaat & raskaat):',
      layout: 'stack',
      items: [
        {
          value: 'liikkuva',
          label: 'Liikkuva',
          description: 'Nopeussakko 2 m pienempi, ei kiipeilyhaittaa. (+100 % hinta)',
          variant: 'card',
          checked: armorSpec.specialTraits.includes('liikkuva'),
        },
        {
          value: 'vaimennettu',
          label: 'Vaimennettu',
          description: 'Ei aiheuta haittaa hiipimiseen. (+100 % hinta)',
          variant: 'card',
          checked: armorSpec.specialTraits.includes('vaimennettu'),
        },
        {
          value: 'sirpalesuoja',
          label: 'Sirpalesuoja',
          description: '+2 PL kantamahyökkäyksiä vastaan, etu ketteryyspelastusheittoihin. (+150 % hinta)',
          variant: 'card',
          checked: armorSpec.specialTraits.includes('sirpalesuoja'),
        },
        {
          value: 'tiivis',
          label: 'Tiivis',
          description: 'Etu kaikkiin sitkeyspelastusheittoihin. (+150 % hinta)',
          variant: 'card',
          checked: armorSpec.specialTraits.includes('tiivis'),
        },
        {
          value: 'tukiranka',
          label: 'Tukiranka',
          description: 'Etu voimakkuuspelastusheittoihin ja vastustettuihin voimakkuusheittoihin. (+150 % hinta)',
          variant: 'card',
          checked: armorSpec.specialTraits.includes('tukiranka'),
        },
      ],
    }) +
    `<small class="eevenkoto-equipment-workshop__group-hint" data-role="armor-special-hint">Erikoispiirteitä voi valita vain keskiraskaille ja raskaille haarniskoille.</small>` +
    // Shield
    `<div class="eevenkoto-equipment-workshop__control-group">` +
    `<label class="eevenkoto-equipment-workshop__group-label" for="armor-shield-select${idSuffix}">Kilpi (valinnainen):</label>` +
    renderSelect({
      id: `armor-shield-select${idSuffix}`,
      dataRole: 'armor-shield',
      value: armorSpec.shield,
      options: [
        { value: 'none', label: 'Ei kilpeä' },
        { value: 'perinteinen', label: 'Perinteinen kilpi (+1 PL) [5 kr]' },
        { value: 'moderni', label: 'Moderni komposiittikilpi (+2 PL) [50 kr]' },
      ],
    }) +
    `</div>` +
    `</div>`;

  // 4. Initial preview block
  const previewProps =
    mode === 'weapons'
      ? weaponToEquipmentBlockProps(weaponInitialRes, true)
      : armorToEquipmentBlockProps(armorInitialRes, true);

  const previewHtml =
    `<div class="eevenkoto-equipment-workshop__preview" data-role="preview-container">` +
    renderEquipmentBlock(previewProps) +
    `</div>`;

  // 5. Toast
  const toastHtml =
    `<div class="eevenkoto-equipment-workshop__toast" data-role="toast" role="alert" aria-live="polite">` +
    `${renderIcon({ name: 'check' })} Varustetiedot kopioitu leikepöydälle!` +
    `</div>`;

  const bodyHtml =
    `<div class="eevenkoto-equipment-workshop__body">` +
    `<div class="eevenkoto-equipment-workshop__controls">${weaponPanelHtml}${armorPanelHtml}</div>` +
    previewHtml +
    `</div>`;

  return template
    .replace('{{className}}', equipmentWorkshopClassNames())
    .replace('{{idAttr}}', props.idSuffix ? ` id="equipment-workshop${idSuffix}"` : '')
    .replace('{{content}}', `${headerHtml}${bodyHtml}${toastHtml}`);
};
