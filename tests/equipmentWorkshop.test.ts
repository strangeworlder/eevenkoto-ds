import { describe, expect, it } from 'vitest';
import {
  calculateWeapon,
  calculateArmor,
  exportWeaponToMarkdown,
  exportArmorToMarkdown,
  weaponToEquipmentBlockProps,
  armorToEquipmentBlockProps,
  generateWeaponName,
  generateArmorName,
  WEAPON_PRESETS,
  ARMOR_PRESETS,
  type WeaponSpec,
  type ArmorSpec,
} from '../apps/storybook/src/domain/organisms/EquipmentWorkshop/equipmentRules';

describe('Equipment calculation engine', () => {
  describe('Weapon calculation', () => {
    it('calculates a basic simple weapon (Tikari)', () => {
      const spec: WeaponSpec = {
        name: 'Tikari',
        weaponClass: 'yksinkertainen',
        weaponType: 'lahitaistelu',
        mainTraits: ['pistava'],
        addTrait: 'kevyt',
        aetherTrait: 'none',
      };
      const res = calculateWeapon(spec);
      expect(res.name).toBe('Tikari');
      expect(res.weaponClass).toBe('yksinkertainen');
      expect(res.damageType).toBe('pistovahinko');
      expect(res.isBudgetValid).toBe(true);
      expect(res.validationErrors).toHaveLength(0);
      expect(res.price.amount).toBeGreaterThan(0);
    });

    it('calculates war weapon damage and hands correctly (Kahden käden miekka)', () => {
      const spec: WeaponSpec = {
        name: 'Suurmiekka',
        weaponClass: 'sota_ase',
        weaponType: 'lahitaistelu',
        mainTraits: ['viiltava', 'raskas'],
        addTrait: 'none',
        aetherTrait: 'none',
      };
      const res = calculateWeapon(spec);
      expect(res.damageType).toBe('viiltovahinko');
      expect(res.hands).toContain('2 kättä');
      expect(res.isBudgetValid).toBe(true);
    });

    it('enforces trait limits (error if exceeding max main traits)', () => {
      const spec: WeaponSpec = {
        name: 'Liikaa piirteitä',
        weaponClass: 'yksinkertainen', // max 1 main trait
        weaponType: 'lahitaistelu',
        mainTraits: ['viiltava', 'pistava', 'murskaava'],
        addTrait: 'none',
        aetherTrait: 'none',
      };
      const res = calculateWeapon(spec);
      expect(res.isBudgetValid).toBe(false);
      expect(res.validationErrors.length).toBeGreaterThan(0);
    });

    it('handles aether weapons with platinum price unit', () => {
      const spec: WeaponSpec = {
        name: 'Eetteriterä',
        weaponClass: 'sota_ase',
        weaponType: 'lahitaistelu',
        mainTraits: ['viiltava'],
        addTrait: 'none',
        aetherTrait: 'tuhoisa',
      };
      const res = calculateWeapon(spec);
      expect(res.price.unit).toBe('pt');
      expect(res.traits).toContain('Eetteripiirre: Tuhoisa');
    });
  });

  describe('Armor calculation', () => {
    it('calculates basic light armor correctly', () => {
      const spec: ArmorSpec = {
        name: 'Kevyt nahkaliivi',
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
      const res = calculateArmor(spec);
      expect(res.baseDefense).toBe(11);
      expect(res.kestoBase).toBe(1);
      expect(res.speedPenalty).toBe('Ei nopeussakkoa');
      expect(res.isBudgetValid).toBe(true);
    });

    it('calculates heavy armor with shield and speed penalty', () => {
      const spec: ArmorSpec = {
        name: 'Ritarin levyhaarniska',
        armorType: 'raskas',
        generalTraits: {
          iskunvaimennus: 1,
          leikkauskestavyys: 1,
          pistosuojaus: 1,
          vahvistettu: 0,
        },
        specialTraits: ['tukiranka'],
        shield: 'perinteinen',
      };
      const res = calculateArmor(spec);
      expect(res.baseDefense).toBe(15);
      expect(res.kestoBase).toBe(3);
      expect(res.kestoMurskaus).toBe(4);
      expect(res.kestoViilto).toBe(4);
      expect(res.kestoPisto).toBe(4);
      expect(res.speedPenalty).toContain('nopeus');
      expect(res.shieldInfo?.defenseBonus).toBe(1);
      expect(res.isBudgetValid).toBe(true);
    });

    it('detects invalid special trait selection on light armor', () => {
      const spec: ArmorSpec = {
        name: 'Laiton nahka',
        armorType: 'kevyt', // light armor cannot have special traits like tukiranka
        generalTraits: {
          iskunvaimennus: 0,
          leikkauskestavyys: 0,
          pistosuojaus: 0,
          vahvistettu: 0,
        },
        specialTraits: ['tukiranka'],
        shield: 'none',
      };
      const res = calculateArmor(spec);
      expect(res.isBudgetValid).toBe(false);
      expect(res.validationErrors.length).toBeGreaterThan(0);
    });
  });

  describe('Markdown export & EquipmentBlock props mapping', () => {
    it('exports weapon to markdown string', () => {
      const spec = WEAPON_PRESETS[0].spec;
      const res = calculateWeapon(spec);
      const md = exportWeaponToMarkdown(res);
      expect(md).toContain(`**${spec.name}**`);
      expect(md).toContain('Vahinko:');
      expect(md).toContain('Hinta:');
    });

    it('exports armor to markdown string', () => {
      const spec = ARMOR_PRESETS[0].spec;
      const res = calculateArmor(spec);
      const md = exportArmorToMarkdown(res);
      expect(md).toContain(`**${spec.name}**`);
      expect(md).toContain('Puolustus (PL):');
    });

    it('maps weapon to valid EquipmentBlockProps', () => {
      const spec = WEAPON_PRESETS[0].spec;
      const res = calculateWeapon(spec);
      const props = weaponToEquipmentBlockProps(res, true);
      expect(props.name).toBe(spec.name);
      expect(props.category).toBeDefined();
      expect(props.stats?.length).toBe(3);
      expect(props.stats?.[0].emphasis).toBe(true);
      expect(props.stats?.[0].subValue).toBeDefined();
      expect(props.stats?.[1].label).toBe('Omin.');
      expect(props.stats?.[2].subItems?.length).toBe(2);
      expect(props.copyText).toBeDefined();
    });

    it('maps armor to valid EquipmentBlockProps with kesto', () => {
      const spec = ARMOR_PRESETS[0].spec;
      const res = calculateArmor(spec);
      const props = armorToEquipmentBlockProps(res, true);
      expect(props.name).toBe(spec.name);
      expect(props.stats?.length).toBe(3);
      expect(props.stats?.[0].emphasis).toBe(true);
      expect(props.stats?.[1].label).toBe('Nopeus');
      expect(props.stats?.[2].label).toBe('Hiipiminen');
      expect(props.stats?.some((s) => s.label === 'Kilpi')).toBe(false);
      expect(props.stats?.some((s) => s.label === 'Nopeusvaikutus')).toBe(false);
      expect(props.kesto).toBeDefined();
      expect(props.kesto?.base).toBe(res.kestoBase);
      expect(props.copyText).toBeDefined();
    });

    it('generates non-empty names', () => {
      const wName = generateWeaponName();
      expect(wName.length).toBeGreaterThan(3);
      const aName = generateArmorName();
      expect(aName.length).toBeGreaterThan(3);
    });
  });
});
