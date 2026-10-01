// apps/storybook/src/domain/organisms/EquipmentWorkshop/EquipmentWorkshop.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/heading.css';
import '@eevenkoto/css/caption.css';
import '@eevenkoto/css/badge.css';
import '@eevenkoto/css/chip.css';
import '@eevenkoto/css/button.css';
import '@eevenkoto/css/icon.css';
import '@eevenkoto/css/notice.css';
import '@eevenkoto/css/input.css';
import '@eevenkoto/css/select.css';
import '@eevenkoto/css/toast.css';
import '@eevenkoto/css/segmented-control.css';
import '@eevenkoto/css/radio.css';
import '@eevenkoto/css/radio-group.css';
import '@eevenkoto/css/checkbox.css';
import '@eevenkoto/css/checkbox-group.css';
import '@eevenkoto/css/stepper.css';
import '@eevenkoto/css/equipment-block.css';
import '@eevenkoto/css/equipment-workshop.css';
import {
  renderEquipmentWorkshop,
  renderEquipmentBlock,
  renderInput,
  renderButton,
  renderRadioGroup,
  renderCheckboxGroup,
  renderSegmentedControl,
  renderSelect,
  renderToast,
  type EquipmentWorkshopProps,
} from '@eevenkoto/html';
import {
  calculateWeapon,
  weaponToEquipmentBlockProps,
  calculateArmor,
  armorToEquipmentBlockProps,
  WEAPON_PRESETS,
  type WeaponSpec,
  type ArmorSpec,
} from './equipmentRules';

const meta: Meta<EquipmentWorkshopProps> = {
  title: 'Domain/Organisms/EquipmentWorkshop',
  parameters: {
    docs: {
      description: {
        component:
          'EquipmentWorkshop ("Varusteverstas") is a layout chassis organism for equipment crafters and workbenches. The Design System provides the 2-column layout (controls on left, sticky preview on right, header bar on top), while the consuming application owns the rules engine, calculations, and interactive state.',
      },
    },
  },
  render: (args) => renderEquipmentWorkshop(args),
};

export default meta;
type Story = StoryObj<EquipmentWorkshopProps>;

export const Chassis: Story = {
  name: 'Chassis (Pure Layout)',
  args: {
    header: `
      <div style="display: flex; justify-content: space-between; align-items: center; inline-size: 100%;">
        <strong>Varusteverstaan runko (Chassis)</strong>
        <span style="font-size: 0.875rem; color: var(--eevenkoto-color-content-secondary);">Kuluttajasovelluksen ohjauspalkki</span>
      </div>
    `,
    controls: `
      <div style="padding: 1.5rem; background: var(--eevenkoto-color-surface-sunken); border-radius: var(--eevenkoto-radius-md); border: 1px dashed var(--eevenkoto-color-boundary-strong);">
        <p style="margin: 0 0 1rem 0; font-weight: 600;">Controls-sarake (vasen palsta)</p>
        <p style="margin: 0; color: var(--eevenkoto-color-content-secondary); font-size: 0.875rem;">
          Tähän kuluttajasovellus sijoittaa lomake-elementit (Input, Stepper, RadioGroup, CheckboxGroup, Select).
        </p>
      </div>
    `,
    preview: renderEquipmentBlock({
      name: 'Esimerkkiase',
      category: 'Sota-ase · Lähitaistelu',
      price: '25 kr',
      stats: [
        { label: 'Vahinko', value: '1n8', subValue: 'viilto', emphasis: true },
        { label: 'Omin.', abilities: ['Voimakkuus'] },
        {
          label: 'Ulottuvuus & heitto',
          subItems: [
            { label: 'Ulottuvuus', value: '2 m' },
            { label: 'Heitto', value: '4/10 m' },
          ],
        },
      ],
      traits: ['Viiltävä', 'Ulottuva'],
      notes: ['Kriittinen osuma: normaali.'],
    }),
  },
};

export const InteractiveWeaponWorkshop: Story = {
  name: 'Consumer Demo: Weapon Workshop',
  render: () => {
    const container = document.createElement('div');

    const weapon: WeaponSpec = {
      name: 'Korppiterä',
      weaponClass: 'sota_ase',
      weaponType: 'lahitaistelu',
      mainTraits: ['viiltava'],
      addTrait: 'none',
      aetherTrait: 'none',
    };

    const updateView = () => {
      const result = calculateWeapon(weapon);
      const previewProps = weaponToEquipmentBlockProps(result, true);

      const headerHtml = `
        <div style="display: flex; justify-content: space-between; align-items: center; inline-size: 100%;">
          ${renderSegmentedControl({
            name: 'demo-mode',
            selectedId: 'weapons',
            options: [
              { id: 'weapons', label: 'Aseet' },
              { id: 'armor', label: 'Haarniskat' },
            ],
          })}
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <label style="font-size: 0.875rem; font-weight: 600;">Esiasetus:</label>
            ${renderSelect({
              ariaLabel: 'Esiasetus',
              options: [
                { value: 'custom', label: 'Valitse valmis ase...' },
                ...WEAPON_PRESETS.map((p) => ({ value: p.id, label: p.label })),
              ],
            })}
          </div>
        </div>
      `;

      const controlsHtml = `
        <div class="eevenkoto-equipment-workshop__control-group">
          <label class="eevenkoto-equipment-workshop__group-label">Aseen nimi:</label>
          <div class="eevenkoto-equipment-workshop__name-row">
            ${renderInput({ value: weapon.name, ariaLabel: 'Aseen nimi' })}
          </div>
        </div>

        <div class="eevenkoto-equipment-workshop__control-group">
          ${renderRadioGroup({
            name: 'demo-wclass',
            label: 'Asepätevyysluokka:',
            layout: 'grid',
            columns: 3,
            variant: 'tile',
            value: weapon.weaponClass,
            options: [
              { value: 'improvisoitu', label: 'Improvisoitu', description: '0 pääpiirrettä (1n4)' },
              { value: 'yksinkertainen', label: 'Yksinkertainen', description: '1 pääpiirre (1n6)' },
              { value: 'sota_ase', label: 'Sota-ase', description: '2 pääpiirrettä (1n6)' },
            ],
          })}
        </div>

        <div class="eevenkoto-equipment-workshop__control-group">
          ${renderCheckboxGroup({
            label: 'Pääpiirteet:',
            badge: `${result.usedMainTraits} / ${result.maxMainTraits} käytetty`,
            columns: 2,
            items: [
              {
                value: 'viiltava',
                label: 'Viiltävä',
                description: '+1 vahinkonopan askel.',
                checked: weapon.mainTraits.includes('viiltava'),
              },
              {
                value: 'tarkkuus',
                label: 'Tarkkuus',
                description: 'Ketteryys hyökkäyksiin.',
                checked: weapon.mainTraits.includes('tarkkuus'),
              },
              {
                value: 'ulottuva',
                label: 'Ulottuva',
                description: 'Lähitaistelu 4 m.',
                checked: weapon.mainTraits.includes('ulottuva'),
              },
              {
                value: 'raskas',
                label: 'Raskas',
                description: '+2 noppa-askelta, 2 kättä.',
                checked: weapon.mainTraits.includes('raskas'),
              },
            ],
          })}
        </div>
      `;

      const previewHtml = renderEquipmentBlock(previewProps);

      container.innerHTML = renderEquipmentWorkshop({
        header: headerHtml,
        controls: controlsHtml,
        preview: previewHtml,
      });

      // Bind simple event listener demo
      const nameInput = container.querySelector<HTMLInputElement>('.eevenkoto-input__field');
      if (nameInput) {
        nameInput.addEventListener('input', (e) => {
          weapon.name = (e.target as HTMLInputElement).value;
          updateView();
        });
      }

      const radios = container.querySelectorAll<HTMLInputElement>('input[name="demo-wclass"]');
      radios.forEach((r) => {
        r.addEventListener('change', () => {
          weapon.weaponClass = r.value as any;
          updateView();
        });
      });

      const checkboxes = container.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
      checkboxes.forEach((cb) => {
        cb.addEventListener('change', () => {
          const val = cb.value as any;
          if (cb.checked && !weapon.mainTraits.includes(val)) {
            weapon.mainTraits.push(val);
          } else if (!cb.checked) {
            weapon.mainTraits = weapon.mainTraits.filter((t) => t !== val);
          }
          updateView();
        });
      });
    };

    updateView();
    return container;
  },
};
