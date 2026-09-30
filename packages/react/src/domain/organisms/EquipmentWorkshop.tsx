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
import { useState, type ReactElement, type HTMLAttributes } from 'react';
import { Button } from '../../core/atoms/Button';
import { Icon } from '../../core/atoms/Icon';
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

export type EquipmentWorkshopComponentProps = Omit<HTMLAttributes<HTMLElement>, 'children'> &
  EquipmentWorkshopProps;

export const EquipmentWorkshop = ({
  initialMode = 'weapons',
  initialWeapon = DEFAULT_WEAPON_SPEC,
  initialArmor = DEFAULT_ARMOR_SPEC,
  idSuffix = '',
  className,
  ...rest
}: EquipmentWorkshopComponentProps): ReactElement => {
  const [mode, setMode] = useState<'weapons' | 'armor'>(initialMode);
  const [weapon, setWeapon] = useState<WeaponSpec>({ ...initialWeapon, mainTraits: [...initialWeapon.mainTraits] });
  const [armor, setArmor] = useState<ArmorSpec>({
    ...initialArmor,
    generalTraits: { ...initialArmor.generalTraits },
    specialTraits: [...initialArmor.specialTraits],
  });
  const [showToast, setShowToast] = useState(false);

  const hostClasses = [equipmentWorkshopClassNames(), className].filter(Boolean).join(' ');

  const handleCopy = (text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
      });
    }
  };

  const handlePresetChange = (val: string) => {
    if (!val) return;
    if (val.startsWith('weapon:')) {
      const pid = val.replace('weapon:', '');
      const p = WEAPON_PRESETS.find((x) => x.id === pid);
      if (p) {
        setWeapon({ ...p.spec, mainTraits: [...p.spec.mainTraits] });
        setMode('weapons');
      }
    } else if (val.startsWith('armor:')) {
      const pid = val.replace('armor:', '');
      const p = ARMOR_PRESETS.find((x) => x.id === pid);
      if (p) {
        setArmor({
          ...p.spec,
          generalTraits: { ...p.spec.generalTraits },
          specialTraits: [...p.spec.specialTraits],
        });
        setMode('armor');
      }
    }
  };

  const weaponRes = calculateWeapon(weapon);
  const armorRes = calculateArmor(armor);

  const isRanged = weapon.weaponType === 'kantama';
  const isWar = weapon.weaponClass === 'sota_ase';
  const allowsSpecial = armor.armorType === 'keskiraskas' || armor.armorType === 'raskas';

  const previewProps =
    mode === 'weapons'
      ? weaponToEquipmentBlockProps(weaponRes, true)
      : armorToEquipmentBlockProps(armorRes, true);

  return (
    <div className={hostClasses} data-eevenkoto-equipment-workshop {...rest}>
      {/* Header Bar */}
      <div className="eevenkoto-equipment-workshop__header">
        <div className="eevenkoto-equipment-workshop__mode-nav">
          <SegmentedControl
            name={`mode-${idSuffix}`}
            label="Varustetyyppi"
            selectedId={mode}
            onChange={(val) => setMode(val as 'weapons' | 'armor')}
            options={[
              { id: 'weapons', label: 'Aseverstas', icon: 'swords' },
              { id: 'armor', label: 'Haarniskaverstas', icon: 'shield' },
            ]}
          />
        </div>

        <div className="eevenkoto-equipment-workshop__preset-group">
          <label className="eevenkoto-equipment-workshop__preset-label" htmlFor={`preset-${idSuffix}`}>
            Pohjavalinta:
          </label>
          <Select
            id={`preset-${idSuffix}`}
            placeholder="— Valitse esimerkkivaruste —"
            onChange={(e) => handlePresetChange((e.target as HTMLSelectElement).value)}
            groups={[
              {
                label: 'Aseet',
                options: WEAPON_PRESETS.map((p) => ({ value: `weapon:${p.id}`, label: p.label })),
              },
              {
                label: 'Haarniskat',
                options: ARMOR_PRESETS.map((p) => ({ value: `armor:${p.id}`, label: p.label })),
              },
            ]}
          />
        </div>
      </div>

      {/* Body Grid */}
      <div className="eevenkoto-equipment-workshop__body">
        <div className="eevenkoto-equipment-workshop__controls">
          {/* Weapons Panel */}
          {mode === 'weapons' ? (
            <div className="eevenkoto-equipment-workshop__panel eevenkoto-equipment-workshop__panel--active">
              {/* Name */}
              <div className="eevenkoto-equipment-workshop__control-group">
                <label className="eevenkoto-equipment-workshop__group-label" htmlFor={`w-name-${idSuffix}`}>
                  Aseen nimi:
                </label>
                <div className="eevenkoto-equipment-workshop__name-row">
                  <Input
                    id={`w-name-${idSuffix}`}
                    value={weapon.name}
                    onChange={(e) => setWeapon({ ...weapon, name: e.target.value })}
                    placeholder="esim. Korppiterä, Metsästyskivääri..."
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    label="Arvo nimi"
                    icon="dice"
                    iconPosition="left"
                    onClick={() => setWeapon({ ...weapon, name: generateWeaponName() })}
                    title="Arvo satunnainen nimi"
                  />
                </div>
              </div>

              {/* Weapon Class */}
              <RadioGroup
                name={`w-class-${idSuffix}`}
                label="Asepätevyysluokka:"
                layout="grid"
                columns={3}
                variant="tile"
                value={weapon.weaponClass}
                onChange={(val) => setWeapon({ ...weapon, weaponClass: val as any })}
                options={[
                  { value: 'improvisoitu', label: 'Improvisoitu', description: '1n4 isku · 10 kup' },
                  { value: 'yksinkertainen', label: 'Yksinkertainen', description: '1n6 isku · 10 hr' },
                  { value: 'sota_ase', label: 'Sota-ase', description: '1n6 isku · 10 kr' },
                ]}
              />

              {/* Weapon Type */}
              <RadioGroup
                name={`w-type-${idSuffix}`}
                label="Aseen tyyppi:"
                layout="grid"
                columns={2}
                variant="tile"
                value={weapon.weaponType}
                onChange={(val) =>
                  setWeapon({
                    ...weapon,
                    weaponType: val as any,
                    mainTraits: val === 'kantama' ? weapon.mainTraits.filter((t) => t !== 'viiltava') : weapon.mainTraits,
                  })
                }
                options={[
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
                ]}
              />

              {/* Main Traits */}
              <CheckboxGroup
                label="Pääpiirteet:"
                badge={`${weaponRes.usedMainTraits} / ${weaponRes.maxMainTraits} käytetty`}
                badgeIntent={weaponRes.usedMainTraits > weaponRes.maxMainTraits ? 'critical' : 'neutral'}
                layout="stack"
                items={[
                  {
                    value: 'tarkkuus',
                    label: 'Tarkkuus',
                    description: 'Käytä KET tai VOI (lähitaistelu) tai KET/VII (kantama). (+100 % hinta)',
                    variant: 'card',
                    checked: weapon.mainTraits.includes('tarkkuus'),
                    onChange: (e: any) => {
                      const checked = e.target.checked;
                      setWeapon({
                        ...weapon,
                        mainTraits: checked
                          ? [...weapon.mainTraits, 'tarkkuus']
                          : weapon.mainTraits.filter((t) => t !== 'tarkkuus'),
                      });
                    },
                  },
                  {
                    value: 'ulottuva',
                    label: 'Ulottuva',
                    description: 'Tuplaa aseen kantaman, ulottuvuuden (4 m) tai heittoetäisyyden. (+100 % hinta)',
                    variant: 'card',
                    checked: weapon.mainTraits.includes('ulottuva'),
                    onChange: (e: any) => {
                      const checked = e.target.checked;
                      setWeapon({
                        ...weapon,
                        mainTraits: checked
                          ? [...weapon.mainTraits, 'ulottuva']
                          : weapon.mainTraits.filter((t) => t !== 'ulottuva'),
                      });
                    },
                  },
                  {
                    value: 'viiltava',
                    label: 'Viiltävä',
                    description: 'Vahinkonoppa +1 ketjulla. Tyyppi: viilto. Ei kantama-aseeseen. (+100 % hinta)',
                    variant: 'card',
                    disabled: isRanged,
                    checked: weapon.mainTraits.includes('viiltava'),
                    onChange: (e: any) => {
                      const checked = e.target.checked;
                      setWeapon({
                        ...weapon,
                        mainTraits: checked
                          ? [...weapon.mainTraits, 'viiltava']
                          : weapon.mainTraits.filter((t) => t !== 'viiltava'),
                      });
                    },
                  },
                  {
                    value: 'pistava',
                    label: 'Pistävä',
                    description: 'Kriittinen osuma tekee +5 vahinkoa (+10 jos 2 kättä). Tyyppi: pisto. (+100 % hinta)',
                    variant: 'card',
                    checked: weapon.mainTraits.includes('pistava'),
                    onChange: (e: any) => {
                      const checked = e.target.checked;
                      setWeapon({
                        ...weapon,
                        mainTraits: checked
                          ? [...weapon.mainTraits, 'pistava']
                          : weapon.mainTraits.filter((t) => t !== 'pistava'),
                      });
                    },
                  },
                  {
                    value: 'murskaava',
                    label: 'Murskaava',
                    description: 'Noppa -1 noppaketjulla, mutta 2 noppaa (esim. 1n6 → 2n4). Tyyppi: murskaus. (+100 % hinta)',
                    variant: 'card',
                    checked: weapon.mainTraits.includes('murskaava'),
                    onChange: (e: any) => {
                      const checked = e.target.checked;
                      setWeapon({
                        ...weapon,
                        mainTraits: checked
                          ? [...weapon.mainTraits, 'murskaava']
                          : weapon.mainTraits.filter((t) => t !== 'murskaava'),
                      });
                    },
                  },
                  {
                    value: 'raskas',
                    label: 'Raskas (vain sota-aseet)',
                    description: 'Vahinkonoppa +2 ketjulla (1n6 → 1n10). Kahdella kädellä. Ei heittoa. (+150 % hinta)',
                    variant: 'card',
                    disabled: !isWar,
                    checked: weapon.mainTraits.includes('raskas'),
                    onChange: (e: any) => {
                      const checked = e.target.checked;
                      setWeapon({
                        ...weapon,
                        mainTraits: checked
                          ? [...weapon.mainTraits, 'raskas']
                          : weapon.mainTraits.filter((t) => t !== 'raskas'),
                      });
                    },
                  },
                  {
                    value: 'monikayttoinen',
                    label: 'Monikäyttöinen (vain sota-aseet)',
                    description: '1 tai 2 kättä. Kahdella kädellä vahinkonoppa +1 ketjulla. (+150 % hinta)',
                    variant: 'card',
                    disabled: !isWar,
                    checked: weapon.mainTraits.includes('monikayttoinen'),
                    onChange: (e: any) => {
                      const checked = e.target.checked;
                      setWeapon({
                        ...weapon,
                        mainTraits: checked
                          ? [...weapon.mainTraits, 'monikayttoinen']
                          : weapon.mainTraits.filter((t) => t !== 'monikayttoinen'),
                      });
                    },
                  },
                ]}
              />

              {/* Add Trait */}
              <RadioGroup
                name={`w-add-${idSuffix}`}
                label="Lisäpiirre (enintään 1):"
                layout="stack"
                variant="card"
                value={weapon.addTrait}
                onChange={(val) => setWeapon({ ...weapon, addTrait: val as any })}
                options={[
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
                ]}
              />

              {/* Aether Trait */}
              <div className="eevenkoto-equipment-workshop__control-group">
                <label className="eevenkoto-equipment-workshop__group-label" htmlFor={`w-aether-${idSuffix}`}>
                  Eetteripiirre (valinnainen):
                </label>
                <Select
                  id={`w-aether-${idSuffix}`}
                  value={weapon.aetherTrait}
                  onChange={(e) => setWeapon({ ...weapon, aetherTrait: (e.target as HTMLSelectElement).value as any })}
                  options={[
                    { value: 'none', label: 'Ei eetteripiirrettä' },
                    { value: 'tyonto', label: 'Työntö — Isku työntää 4 m taaksepäin (voimavahinko) [+20 pt]' },
                    { value: 'tuhoisa', label: 'Tuhoisa — Ohi-isku tekee 2 pistettä vauriota (ukkosvahinko) [+20 pt]' },
                    { value: 'hidastava', label: 'Hidastava — Isku hidastaa kohdetta 4 m (kylmävahinko) [+20 pt]' },
                    { value: 'kehittynyt', label: 'Kehittynyt — Vahinkonoppa +1 ketjulla (tulivahinko) [+30 pt]' },
                    { value: 'maaginen', label: 'Maaginen — Maaginen ase, hämärä valo 6 m [+10 pt]' },
                  ]}
                />
                <small className="eevenkoto-equipment-workshop__group-hint">
                  Eetteripiirre antaa +1 pääpiirreslotin ja muuttaa hinnan platinaksi.
                </small>
              </div>
            </div>
          ) : (
            /* Armor Panel */
            <div className="eevenkoto-equipment-workshop__panel eevenkoto-equipment-workshop__panel--active">
              {/* Name */}
              <div className="eevenkoto-equipment-workshop__control-group">
                <label className="eevenkoto-equipment-workshop__group-label" htmlFor={`a-name-${idSuffix}`}>
                  Haarniskan nimi:
                </label>
                <div className="eevenkoto-equipment-workshop__name-row">
                  <Input
                    id={`a-name-${idSuffix}`}
                    value={armor.name}
                    onChange={(e) => setArmor({ ...armor, name: e.target.value })}
                    placeholder="esim. Eetterivahvistettu liivi..."
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    label="Arvo nimi"
                    icon="dice"
                    iconPosition="left"
                    onClick={() => setArmor({ ...armor, name: generateArmorName() })}
                    title="Arvo satunnainen nimi"
                  />
                </div>
              </div>

              {/* Armor Type */}
              <RadioGroup
                name={`a-type-${idSuffix}`}
                label="Haarniskatyyppi:"
                layout="grid"
                columns={2}
                variant="tile"
                value={armor.armorType}
                onChange={(val) =>
                  setArmor({
                    ...armor,
                    armorType: val as any,
                    specialTraits: val === 'keskiraskas' || val === 'raskas' ? armor.specialTraits : [],
                  })
                }
                options={[
                  { value: 'vaatetus', label: 'Vaatetus', description: 'PL 10 + KET · Kesto 0 · 1 piirre · 1 kr' },
                  { value: 'kevyt', label: 'Kevyt panssari', description: 'PL 11 + KET · Kesto 1 · 1 piirre · 2 kr' },
                  {
                    value: 'keskiraskas',
                    label: 'Keskiraskas panssari',
                    description: 'PL 13 + KET (max +2) · Kesto 2 · 2 piirrettä · 20 kr',
                  },
                  { value: 'raskas', label: 'Raskas panssari', description: 'PL 15 · Kesto 3 · 4 piirrettä · 200 kr' },
                ]}
              />

              {/* General Traits Steppers */}
              <div className="eevenkoto-equipment-workshop__control-group">
                <div className="eevenkoto-equipment-workshop__group-header">
                  <span className="eevenkoto-equipment-workshop__group-label">
                    Yleiset piirteet (voi ottaa useasti):
                  </span>
                  <Badge
                    label={`${armorRes.usedTraits} / ${armorRes.maxTraits} valittu`}
                    intent={armorRes.usedTraits > armorRes.maxTraits ? 'critical' : 'neutral'}
                    variant="solid"
                  />
                </div>
                <div className="eevenkoto-equipment-workshop__stepper-grid">
                  <Stepper
                    name="iskunvaimennus"
                    label="Iskunvaimennus"
                    description="+1 kesto murskausta vastaan (+100 % hinta)"
                    value={armor.generalTraits.iskunvaimennus}
                    onChange={(val) =>
                      setArmor({
                        ...armor,
                        generalTraits: { ...armor.generalTraits, iskunvaimennus: val },
                      })
                    }
                  />
                  <Stepper
                    name="leikkauskestavyys"
                    label="Leikkauskestävyys"
                    description="+1 kesto viiltoa vastaan (+100 % hinta)"
                    value={armor.generalTraits.leikkauskestavyys}
                    onChange={(val) =>
                      setArmor({
                        ...armor,
                        generalTraits: { ...armor.generalTraits, leikkauskestavyys: val },
                      })
                    }
                  />
                  <Stepper
                    name="pistosuojaus"
                    label="Pistosuojaus"
                    description="+1 kesto pistoa vastaan (+100 % hinta)"
                    value={armor.generalTraits.pistosuojaus}
                    onChange={(val) =>
                      setArmor({
                        ...armor,
                        generalTraits: { ...armor.generalTraits, pistosuojaus: val },
                      })
                    }
                  />
                  <Stepper
                    name="vahvistettu"
                    label="Vahvistettu"
                    description="+1 puolustukseen (PL) (+50 % hinta)"
                    value={armor.generalTraits.vahvistettu}
                    onChange={(val) =>
                      setArmor({
                        ...armor,
                        generalTraits: { ...armor.generalTraits, vahvistettu: val },
                      })
                    }
                  />
                </div>
              </div>

              {/* Special Traits */}
              <CheckboxGroup
                label="Erikoispiirteet (keskiraskaat & raskaat):"
                layout="stack"
                hint="Erikoispiirteitä voi valita vain keskiraskaille ja raskaille haarniskoille."
                items={[
                  {
                    value: 'liikkuva',
                    label: 'Liikkuva',
                    description: 'Nopeussakko 2 m pienempi, ei kiipeilyhaittaa. (+100 % hinta)',
                    variant: 'card',
                    disabled: !allowsSpecial,
                    checked: armor.specialTraits.includes('liikkuva'),
                    onChange: (e: any) => {
                      const checked = e.target.checked;
                      setArmor({
                        ...armor,
                        specialTraits: checked
                          ? [...armor.specialTraits, 'liikkuva']
                          : armor.specialTraits.filter((t) => t !== 'liikkuva'),
                      });
                    },
                  },
                  {
                    value: 'vaimennettu',
                    label: 'Vaimennettu',
                    description: 'Ei aiheuta haittaa hiipimiseen. (+100 % hinta)',
                    variant: 'card',
                    disabled: !allowsSpecial,
                    checked: armor.specialTraits.includes('vaimennettu'),
                    onChange: (e: any) => {
                      const checked = e.target.checked;
                      setArmor({
                        ...armor,
                        specialTraits: checked
                          ? [...armor.specialTraits, 'vaimennettu']
                          : armor.specialTraits.filter((t) => t !== 'vaimennettu'),
                      });
                    },
                  },
                  {
                    value: 'sirpalesuoja',
                    label: 'Sirpalesuoja',
                    description: '+2 PL kantamahyökkäyksiä vastaan, etu ketteryyspelastusheittoihin. (+150 % hinta)',
                    variant: 'card',
                    disabled: !allowsSpecial,
                    checked: armor.specialTraits.includes('sirpalesuoja'),
                    onChange: (e: any) => {
                      const checked = e.target.checked;
                      setArmor({
                        ...armor,
                        specialTraits: checked
                          ? [...armor.specialTraits, 'sirpalesuoja']
                          : armor.specialTraits.filter((t) => t !== 'sirpalesuoja'),
                      });
                    },
                  },
                  {
                    value: 'tiivis',
                    label: 'Tiivis',
                    description: 'Etu kaikkiin sitkeyspelastusheittoihin. (+150 % hinta)',
                    variant: 'card',
                    disabled: !allowsSpecial,
                    checked: armor.specialTraits.includes('tiivis'),
                    onChange: (e: any) => {
                      const checked = e.target.checked;
                      setArmor({
                        ...armor,
                        specialTraits: checked
                          ? [...armor.specialTraits, 'tiivis']
                          : armor.specialTraits.filter((t) => t !== 'tiivis'),
                      });
                    },
                  },
                  {
                    value: 'tukiranka',
                    label: 'Tukiranka',
                    description: 'Etu voimakkuuspelastusheittoihin ja vastustettuihin voimakkuusheittoihin. (+150 % hinta)',
                    variant: 'card',
                    disabled: !allowsSpecial,
                    checked: armor.specialTraits.includes('tukiranka'),
                    onChange: (e: any) => {
                      const checked = e.target.checked;
                      setArmor({
                        ...armor,
                        specialTraits: checked
                          ? [...armor.specialTraits, 'tukiranka']
                          : armor.specialTraits.filter((t) => t !== 'tukiranka'),
                      });
                    },
                  },
                ]}
              />

              {/* Shield */}
              <div className="eevenkoto-equipment-workshop__control-group">
                <label className="eevenkoto-equipment-workshop__group-label" htmlFor={`a-shield-${idSuffix}`}>
                  Kilpi (valinnainen):
                </label>
                <Select
                  id={`a-shield-${idSuffix}`}
                  value={armor.shield}
                  onChange={(e) => setArmor({ ...armor, shield: (e.target as HTMLSelectElement).value as any })}
                  options={[
                    { value: 'none', label: 'Ei kilpeä' },
                    { value: 'perinteinen', label: 'Perinteinen kilpi (+1 PL) [5 kr]' },
                    { value: 'moderni', label: 'Moderni komposiittikilpi (+2 PL) [50 kr]' },
                  ]}
                />
              </div>
            </div>
          )}
        </div>

        {/* Live Preview Block */}
        <div className="eevenkoto-equipment-workshop__preview">
          <EquipmentBlock {...previewProps} onCopy={handleCopy} />
        </div>
      </div>

      {/* Copy Toast */}
      <div
        className={`eevenkoto-equipment-workshop__toast${
          showToast ? ' eevenkoto-equipment-workshop__toast--visible' : ''
        }`}
        role="alert"
        aria-live="polite"
      >
        <Icon name="check" /> Varustetiedot kopioitu leikepöydälle!
      </div>
    </div>
  );
};
