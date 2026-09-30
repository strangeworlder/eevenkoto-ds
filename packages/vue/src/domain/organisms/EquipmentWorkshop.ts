import {
  equipmentWorkshopClassNames,
  calculateWeapon,
  calculateArmor,
  weaponToEquipmentBlockProps,
  armorToEquipmentBlockProps,
  generateWeaponName,
  generateArmorName,
  WEAPON_PRESETS,
  ARMOR_PRESETS,
  type EquipmentWorkshopProps,
  type WeaponSpec,
  type ArmorSpec,
  type WeaponMainTrait,
  type ArmorSpecialTrait,
} from '@eevenkoto/core';
import { defineComponent, h, ref, type PropType, type VNodeChild } from 'vue';
import { Button } from '../../core/atoms/Button';
import { Icon } from '../../core/atoms/Icon';
import { Checkbox } from '../../core/atoms/Checkbox';
import { Input } from '../../core/atoms/Input';
import { Select } from '../../core/atoms/Select';
import { Badge } from '../../core/atoms/Badge';
import { SegmentedControl } from '../../core/molecules/SegmentedControl';
import { RadioGroup } from '../../core/molecules/RadioGroup';
import { CheckboxGroup } from '../../core/molecules/CheckboxGroup';
import { Stepper } from '../../core/molecules/Stepper';
import { EquipmentBlock } from './EquipmentBlock';

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

export type { EquipmentWorkshopProps };

export const EquipmentWorkshop = defineComponent({
  name: 'EevenkotoEquipmentWorkshop',
  props: {
    initialMode: {
      type: String as PropType<'weapons' | 'armor'>,
      default: 'weapons',
    },
    initialWeapon: {
      type: Object as PropType<WeaponSpec>,
      default: () => ({ ...DEFAULT_WEAPON_SPEC, mainTraits: [] }),
    },
    initialArmor: {
      type: Object as PropType<ArmorSpec>,
      default: () => ({
        ...DEFAULT_ARMOR_SPEC,
        generalTraits: { ...DEFAULT_ARMOR_SPEC.generalTraits },
        specialTraits: [],
      }),
    },
    idSuffix: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const mode = ref<'weapons' | 'armor'>(props.initialMode);
    const weapon = ref<WeaponSpec>({
      ...props.initialWeapon,
      mainTraits: [...props.initialWeapon.mainTraits],
    });
    const armor = ref<ArmorSpec>({
      ...props.initialArmor,
      generalTraits: { ...props.initialArmor.generalTraits },
      specialTraits: [...props.initialArmor.specialTraits],
    });
    const showToast = ref(false);

    const sfx = props.idSuffix;

    const handleCopy = (text: string) => {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          showToast.value = true;
          setTimeout(() => {
            showToast.value = false;
          }, 2500);
        });
      }
    };

    const handlePresetChange = (val: string) => {
      if (val.startsWith('weapon:')) {
        const pid = val.replace('weapon:', '');
        const p = WEAPON_PRESETS.find((x) => x.id === pid);
        if (p) {
          weapon.value = { ...p.spec, mainTraits: [...p.spec.mainTraits] };
          mode.value = 'weapons';
        }
      } else if (val.startsWith('armor:')) {
        const pid = val.replace('armor:', '');
        const p = ARMOR_PRESETS.find((x) => x.id === pid);
        if (p) {
          armor.value = {
            ...p.spec,
            generalTraits: { ...p.spec.generalTraits },
            specialTraits: [...p.spec.specialTraits],
          };
          mode.value = 'armor';
        }
      }
    };

    return () => {
      const weaponRes = calculateWeapon(weapon.value);
      const armorRes = calculateArmor(armor.value);

      const isRanged = weapon.value.weaponType === 'kantama';
      const isWar = weapon.value.weaponClass === 'sota_ase';
      const allowsSpecial =
        armor.value.armorType === 'keskiraskas' || armor.value.armorType === 'raskas';

      const previewProps =
        mode.value === 'weapons'
          ? weaponToEquipmentBlockProps(weaponRes, true)
          : armorToEquipmentBlockProps(armorRes, true);

      // --- Header ---
      const headerEl = h('div', { class: 'eevenkoto-equipment-workshop__header' }, [
        h('div', { class: 'eevenkoto-equipment-workshop__mode-nav' }, [
          h(SegmentedControl, {
            name: `mode-${sfx}`,
            label: 'Varustetyyppi',
            selectedId: mode.value,
            onChange: (id: string) => {
              mode.value = id as 'weapons' | 'armor';
            },
            options: [
              { id: 'weapons', label: 'Aseverstas', icon: 'swords' },
              { id: 'armor', label: 'Haarniskaverstas', icon: 'shield' },
            ],
          }),
        ]),
        h('div', { class: 'eevenkoto-equipment-workshop__preset-group' }, [
          h(
            'label',
            { class: 'eevenkoto-equipment-workshop__preset-label', for: `preset-${sfx}` },
            'Pohjavalinta:',
          ),
          h(Select, {
            id: `preset-${sfx}`,
            placeholder: '— Valitse esimerkkivaruste —',
            onChange: (val: string) => handlePresetChange(val),
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
          }),
        ]),
      ]);

      // --- Weapons Panel ---
      const weaponPanelEl = h(
        'div',
        {
          class: [
            'eevenkoto-equipment-workshop__panel',
            mode.value === 'weapons' && 'eevenkoto-equipment-workshop__panel--active',
          ],
        },
        [
          // Name row
          h('div', { class: 'eevenkoto-equipment-workshop__control-group' }, [
            h(
              'label',
              { class: 'eevenkoto-equipment-workshop__group-label', for: `w-name-${sfx}` },
              'Aseen nimi:',
            ),
            h('div', { class: 'eevenkoto-equipment-workshop__name-row' }, [
              h(Input, {
                id: `w-name-${sfx}`,
                value: weapon.value.name,
                'onUpdate:value': (v: string) => {
                  weapon.value.name = v;
                },
                placeholder: 'esim. Korppiterä, Metsästyskivääri...',
              }),
              h(Button, {
                label: 'Arvo nimi',
                icon: 'dice',
                iconPosition: 'left',
                variant: 'secondary',
                size: 'md',
                title: 'Arvo satunnainen nimi',
                onClick: () => {
                  weapon.value.name = generateWeaponName();
                },
              }),
            ]),
          ]),
          // Weapon Class
          h(RadioGroup, {
            name: `w-class-${sfx}`,
            label: 'Asepätevyysluokka:',
            layout: 'grid',
            columns: 3,
            variant: 'tile',
            value: weapon.value.weaponClass,
            onChange: (val: string) => {
              weapon.value.weaponClass = val as any;
            },
            options: [
              { value: 'improvisoitu', label: 'Improvisoitu', description: '1n4 isku · 10 kup' },
              { value: 'yksinkertainen', label: 'Yksinkertainen', description: '1n6 isku · 10 hr' },
              { value: 'sota_ase', label: 'Sota-ase', description: '1n6 isku · 10 kr' },
            ],
          }),
          // Weapon Type
          h(RadioGroup, {
            name: `w-type-${sfx}`,
            label: 'Aseen tyyppi:',
            layout: 'grid',
            columns: 2,
            variant: 'tile',
            value: weapon.value.weaponType,
            onChange: (val: string) => {
              weapon.value.weaponType = val as any;
              if (val === 'kantama') {
                weapon.value.mainTraits = weapon.value.mainTraits.filter((t) => t !== 'viiltava');
              }
            },
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
          }),
          // Main Traits
          h(
            CheckboxGroup,
            {
              label: 'Pääpiirteet:',
              badge: `${weaponRes.usedMainTraits} / ${weaponRes.maxMainTraits} käytetty`,
              badgeIntent:
                weaponRes.usedMainTraits > weaponRes.maxMainTraits ? 'critical' : 'neutral',
              layout: 'stack',
            },
            () => [
              h(Checkbox, {
                value: 'tarkkuus',
                label: 'Tarkkuus',
                description: 'Käytä KET tai VOI (lähitaistelu) tai KET/VII (kantama). (+100 % hinta)',
                variant: 'card',
                checked: weapon.value.mainTraits.includes('tarkkuus'),
                'onUpdate:checked': (checked: boolean) => {
                  weapon.value.mainTraits = checked
                    ? [...weapon.value.mainTraits, 'tarkkuus']
                    : weapon.value.mainTraits.filter((t) => t !== 'tarkkuus');
                },
              }),
              h(Checkbox, {
                value: 'ulottuva',
                label: 'Ulottuva',
                description: 'Tuplaa aseen kantaman, ulottuvuuden (4 m) tai heittoetäisyyden. (+100 % hinta)',
                variant: 'card',
                checked: weapon.value.mainTraits.includes('ulottuva'),
                'onUpdate:checked': (checked: boolean) => {
                  weapon.value.mainTraits = checked
                    ? [...weapon.value.mainTraits, 'ulottuva']
                    : weapon.value.mainTraits.filter((t) => t !== 'ulottuva');
                },
              }),
              h(Checkbox, {
                value: 'viiltava',
                label: 'Viiltävä',
                description: 'Vahinkonoppa +1 ketjulla. Tyyppi: viilto. Ei kantama-aseeseen. (+100 % hinta)',
                variant: 'card',
                disabled: isRanged,
                checked: weapon.value.mainTraits.includes('viiltava'),
                'onUpdate:checked': (checked: boolean) => {
                  weapon.value.mainTraits = checked
                    ? [...weapon.value.mainTraits, 'viiltava']
                    : weapon.value.mainTraits.filter((t) => t !== 'viiltava');
                },
              }),
              h(Checkbox, {
                value: 'pistava',
                label: 'Pistävä',
                description: 'Kriittinen osuma tekee +5 vahinkoa (+10 jos 2 kättä). Tyyppi: pisto. (+100 % hinta)',
                variant: 'card',
                checked: weapon.value.mainTraits.includes('pistava'),
                'onUpdate:checked': (checked: boolean) => {
                  weapon.value.mainTraits = checked
                    ? [...weapon.value.mainTraits, 'pistava']
                    : weapon.value.mainTraits.filter((t) => t !== 'pistava');
                },
              }),
              h(Checkbox, {
                value: 'murskaava',
                label: 'Murskaava',
                description: 'Noppa -1 noppaketjulla, mutta 2 noppaa (esim. 1n6 → 2n4). Tyyppi: murskaus. (+100 % hinta)',
                variant: 'card',
                checked: weapon.value.mainTraits.includes('murskaava'),
                'onUpdate:checked': (checked: boolean) => {
                  weapon.value.mainTraits = checked
                    ? [...weapon.value.mainTraits, 'murskaava']
                    : weapon.value.mainTraits.filter((t) => t !== 'murskaava');
                },
              }),
              h(Checkbox, {
                value: 'raskas',
                label: 'Raskas (vain sota-aseet)',
                description: 'Vahinkonoppa +2 ketjulla (1n6 → 1n10). Kahdella kädellä. Ei heittoa. (+150 % hinta)',
                variant: 'card',
                disabled: !isWar,
                checked: weapon.value.mainTraits.includes('raskas'),
                'onUpdate:checked': (checked: boolean) => {
                  weapon.value.mainTraits = checked
                    ? [...weapon.value.mainTraits, 'raskas']
                    : weapon.value.mainTraits.filter((t) => t !== 'raskas');
                },
              }),
              h(Checkbox, {
                value: 'monikayttoinen',
                label: 'Monikäyttöinen (vain sota-aseet)',
                description: '1 tai 2 kättä. Kahdella kädellä vahinkonoppa +1 ketjulla. (+150 % hinta)',
                variant: 'card',
                disabled: !isWar,
                checked: weapon.value.mainTraits.includes('monikayttoinen'),
                'onUpdate:checked': (checked: boolean) => {
                  weapon.value.mainTraits = checked
                    ? [...weapon.value.mainTraits, 'monikayttoinen']
                    : weapon.value.mainTraits.filter((t) => t !== 'monikayttoinen');
                },
              }),
            ],
          ),
          // Add Trait
          h(RadioGroup, {
            name: `w-add-${sfx}`,
            label: 'Lisäpiirre (enintään 1):',
            layout: 'stack',
            variant: 'card',
            value: weapon.value.addTrait,
            onChange: (val: string) => {
              weapon.value.addTrait = val as any;
            },
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
                disabled: isWar,
                description: 'Noppa +1 ketjulla. Aloite 1n12. 2 kättä. Vain improvisoidut/yksinkertaiset. Hinta 75 %.',
              },
              {
                value: 'perinteinen',
                label: 'Perinteinen',
                disabled: !isRanged,
                description: 'Vain kantama-aseet. Tuplaa kantaman. Lataus hahmotoiminto. Vain iskuvahinko. Hinta 75 %.',
              },
            ],
          }),
          // Aether Trait
          h('div', { class: 'eevenkoto-equipment-workshop__control-group' }, [
            h(
              'label',
              { class: 'eevenkoto-equipment-workshop__group-label', for: `w-aether-${sfx}` },
              'Eetteripiirre (valinnainen):',
            ),
            h(Select, {
              id: `w-aether-${sfx}`,
              value: weapon.value.aetherTrait,
              onChange: (val: string) => {
                weapon.value.aetherTrait = val as any;
              },
              options: [
                { value: 'none', label: 'Ei eetteripiirrettä' },
                { value: 'tyonto', label: 'Työntö — Isku työntää 4 m taaksepäin (voimavahinko) [+20 pt]' },
                { value: 'tuhoisa', label: 'Tuhoisa — Ohi-isku tekee 2 pistettä vauriota (ukkosvahinko) [+20 pt]' },
                { value: 'hidastava', label: 'Hidastava — Isku hidastaa kohdetta 4 m (kylmävahinko) [+20 pt]' },
                { value: 'kehittynyt', label: 'Kehittynyt — Vahinkonoppa +1 ketjulla (tulivahinko) [+30 pt]' },
                { value: 'maaginen', label: 'Maaginen — Maaginen ase, hämärä valo 6 m [+10 pt]' },
              ],
            }),
            h(
              'small',
              { class: 'eevenkoto-equipment-workshop__group-hint' },
              'Eetteripiirre antaa +1 pääpiirreslotin ja muuttaa hinnan platinaksi.',
            ),
          ]),
        ],
      );

      // --- Armor Panel ---
      const armorPanelEl = h(
        'div',
        {
          class: [
            'eevenkoto-equipment-workshop__panel',
            mode.value === 'armor' && 'eevenkoto-equipment-workshop__panel--active',
          ],
        },
        [
          // Name row
          h('div', { class: 'eevenkoto-equipment-workshop__control-group' }, [
            h(
              'label',
              { class: 'eevenkoto-equipment-workshop__group-label', for: `a-name-${sfx}` },
              'Haarniskan nimi:',
            ),
            h('div', { class: 'eevenkoto-equipment-workshop__name-row' }, [
              h(Input, {
                id: `a-name-${sfx}`,
                value: armor.value.name,
                'onUpdate:value': (v: string) => {
                  armor.value.name = v;
                },
                placeholder: 'esim. Eetterivahvistettu liivi...',
              }),
              h(Button, {
                label: 'Arvo nimi',
                icon: 'dice',
                iconPosition: 'left',
                variant: 'secondary',
                size: 'md',
                title: 'Arvo satunnainen nimi',
                onClick: () => {
                  armor.value.name = generateArmorName();
                },
              }),
            ]),
          ]),
          // Armor Type
          h(RadioGroup, {
            name: `a-type-${sfx}`,
            label: 'Haarniskatyyppi:',
            layout: 'grid',
            columns: 2,
            variant: 'tile',
            value: armor.value.armorType,
            onChange: (val: string) => {
              armor.value.armorType = val as any;
              if (val !== 'keskiraskas' && val !== 'raskas') {
                armor.value.specialTraits = [];
              }
            },
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
          }),
          // General Traits Steppers
          h('div', { class: 'eevenkoto-equipment-workshop__control-group' }, [
            h('div', { class: 'eevenkoto-equipment-workshop__group-header' }, [
              h(
                'span',
                { class: 'eevenkoto-equipment-workshop__group-label' },
                'Yleiset piirteet (voi ottaa useasti):',
              ),
              h(Badge, {
                label: `${armorRes.usedTraits} / ${armorRes.maxTraits} valittu`,
                intent: armorRes.usedTraits > armorRes.maxTraits ? 'critical' : 'neutral',
                variant: 'solid',
              }),
            ]),
            h('div', { class: 'eevenkoto-equipment-workshop__stepper-grid' }, [
              h(Stepper, {
                name: 'iskunvaimennus',
                label: 'Iskunvaimennus',
                description: '+1 kesto murskausta vastaan (+100 % hinta)',
                value: armor.value.generalTraits.iskunvaimennus,
                onChange: (v: number) => {
                  armor.value.generalTraits.iskunvaimennus = v;
                },
              }),
              h(Stepper, {
                name: 'leikkauskestavyys',
                label: 'Leikkauskestävyys',
                description: '+1 kesto viiltoa vastaan (+100 % hinta)',
                value: armor.value.generalTraits.leikkauskestavyys,
                onChange: (v: number) => {
                  armor.value.generalTraits.leikkauskestavyys = v;
                },
              }),
              h(Stepper, {
                name: 'pistosuojaus',
                label: 'Pistosuojaus',
                description: '+1 kesto pistoa vastaan (+100 % hinta)',
                value: armor.value.generalTraits.pistosuojaus,
                onChange: (v: number) => {
                  armor.value.generalTraits.pistosuojaus = v;
                },
              }),
              h(Stepper, {
                name: 'vahvistettu',
                label: 'Vahvistettu',
                description: '+1 puolustukseen (PL) (+50 % hinta)',
                value: armor.value.generalTraits.vahvistettu,
                onChange: (v: number) => {
                  armor.value.generalTraits.vahvistettu = v;
                },
              }),
            ]),
          ]),
          // Special Traits
          h(
            CheckboxGroup,
            {
              label: 'Erikoispiirteet (keskiraskaat & raskaat):',
              layout: 'stack',
              hint: 'Erikoispiirteitä voi valita vain keskiraskaille ja raskaille haarniskoille.',
            },
            () => [
              h(Checkbox, {
                value: 'liikkuva',
                label: 'Liikkuva',
                description: 'Nopeussakko 2 m pienempi, ei kiipeilyhaittaa. (+100 % hinta)',
                variant: 'card',
                disabled: !allowsSpecial,
                checked: armor.value.specialTraits.includes('liikkuva'),
                'onUpdate:checked': (checked: boolean) => {
                  armor.value.specialTraits = checked
                    ? [...armor.value.specialTraits, 'liikkuva']
                    : armor.value.specialTraits.filter((t) => t !== 'liikkuva');
                },
              }),
              h(Checkbox, {
                value: 'vaimennettu',
                label: 'Vaimennettu',
                description: 'Ei aiheuta haittaa hiipimiseen. (+100 % hinta)',
                variant: 'card',
                disabled: !allowsSpecial,
                checked: armor.value.specialTraits.includes('vaimennettu'),
                'onUpdate:checked': (checked: boolean) => {
                  armor.value.specialTraits = checked
                    ? [...armor.value.specialTraits, 'vaimennettu']
                    : armor.value.specialTraits.filter((t) => t !== 'vaimennettu');
                },
              }),
              h(Checkbox, {
                value: 'sirpalesuoja',
                label: 'Sirpalesuoja',
                description: '+2 PL kantamahyökkäyksiä vastaan, etu ketteryyspelastusheittoihin. (+150 % hinta)',
                variant: 'card',
                disabled: !allowsSpecial,
                checked: armor.value.specialTraits.includes('sirpalesuoja'),
                'onUpdate:checked': (checked: boolean) => {
                  armor.value.specialTraits = checked
                    ? [...armor.value.specialTraits, 'sirpalesuoja']
                    : armor.value.specialTraits.filter((t) => t !== 'sirpalesuoja');
                },
              }),
              h(Checkbox, {
                value: 'tiivis',
                label: 'Tiivis',
                description: 'Etu kaikkiin sitkeyspelastusheittoihin. (+150 % hinta)',
                variant: 'card',
                disabled: !allowsSpecial,
                checked: armor.value.specialTraits.includes('tiivis'),
                'onUpdate:checked': (checked: boolean) => {
                  armor.value.specialTraits = checked
                    ? [...armor.value.specialTraits, 'tiivis']
                    : armor.value.specialTraits.filter((t) => t !== 'tiivis');
                },
              }),
              h(Checkbox, {
                value: 'tukiranka',
                label: 'Tukiranka',
                description: 'Etu voimakkuuspelastusheittoihin ja vastustettuihin voimakkuusheittoihin. (+150 % hinta)',
                variant: 'card',
                disabled: !allowsSpecial,
                checked: armor.value.specialTraits.includes('tukiranka'),
                'onUpdate:checked': (checked: boolean) => {
                  armor.value.specialTraits = checked
                    ? [...armor.value.specialTraits, 'tukiranka']
                    : armor.value.specialTraits.filter((t) => t !== 'tukiranka');
                },
              }),
            ],
          ),
          // Shield
          h('div', { class: 'eevenkoto-equipment-workshop__control-group' }, [
            h(
              'label',
              { class: 'eevenkoto-equipment-workshop__group-label', for: `a-shield-${sfx}` },
              'Kilpi (valinnainen):',
            ),
            h(Select, {
              id: `a-shield-${sfx}`,
              value: armor.value.shield,
              onChange: (val: string) => {
                armor.value.shield = val as any;
              },
              options: [
                { value: 'none', label: 'Ei kilpeä' },
                { value: 'perinteinen', label: 'Perinteinen kilpi (+1 PL) [5 kr]' },
                { value: 'moderni', label: 'Moderni komposiittikilpi (+2 PL) [50 kr]' },
              ],
            }),
          ]),
        ],
      );

      // --- Body ---
      const bodyEl = h('div', { class: 'eevenkoto-equipment-workshop__body' }, [
        h(
          'div',
          { class: 'eevenkoto-equipment-workshop__controls' },
          mode.value === 'weapons' ? [weaponPanelEl] : [armorPanelEl],
        ),
        h('div', { class: 'eevenkoto-equipment-workshop__preview' }, [
          h(EquipmentBlock, {
            ...previewProps,
            onCopy: handleCopy,
          }),
        ]),
      ]);

      // --- Toast ---
      const toastEl = h(
        'div',
        {
          class: [
            'eevenkoto-equipment-workshop__toast',
            showToast.value && 'eevenkoto-equipment-workshop__toast--visible',
          ],
          role: 'alert',
          'aria-live': 'polite',
        },
        [h(Icon, { name: 'check' }), ' Varustetiedot kopioitu leikepöydälle!'],
      );

      return h('div', { class: equipmentWorkshopClassNames() }, [headerEl, bodyEl, toastEl]);
    };
  },
});
