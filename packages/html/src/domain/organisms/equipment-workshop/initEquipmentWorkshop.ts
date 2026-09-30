import {
  calculateWeapon,
  calculateArmor,
  weaponToEquipmentBlockProps,
  armorToEquipmentBlockProps,
  generateWeaponName,
  generateArmorName,
  WEAPON_PRESETS,
  ARMOR_PRESETS,
  type WeaponSpec,
  type ArmorSpec,
  type WeaponMainTrait,
  type ArmorSpecialTrait,
} from '@eevenkoto/core';
import { renderEquipmentBlock } from '../equipment-block/renderEquipmentBlock';
import { DEFAULT_WEAPON_SPEC, DEFAULT_ARMOR_SPEC } from './renderEquipmentWorkshop';

export interface EquipmentWorkshopInitOptions {
  onCopy?: (text: string) => void;
}

export const initEquipmentWorkshop = (
  container: HTMLElement,
  options: EquipmentWorkshopInitOptions = {},
): (() => void) => {
  if (container.dataset.initialized === 'true') {
    return () => {};
  }
  container.dataset.initialized = 'true';

  let currentMode: 'weapons' | 'armor' = 'weapons';
  let weapon: WeaponSpec = { ...DEFAULT_WEAPON_SPEC };
  let armor: ArmorSpec = {
    ...DEFAULT_ARMOR_SPEC,
    generalTraits: { ...DEFAULT_ARMOR_SPEC.generalTraits },
    specialTraits: [...DEFAULT_ARMOR_SPEC.specialTraits],
  };

  const previewContainer = container.querySelector<HTMLElement>('[data-role="preview-container"]');
  const toast = container.querySelector<HTMLElement>('[data-role="toast"]');
  const presetSelect = container.querySelector<HTMLSelectElement>('[data-role="preset-select"]');

  const panelWeapons = container.querySelector<HTMLElement>('[data-panel="weapons"]');
  const panelArmor = container.querySelector<HTMLElement>('[data-panel="armor"]');

  const weaponNameInput = container.querySelector<HTMLInputElement>('[data-role="weapon-name"]');
  const btnRandomWeaponName = container.querySelector<HTMLButtonElement>('[data-role="btn-random-weapon-name"]');
  const weaponBudgetBadge = container.querySelector<HTMLElement>('[data-role="weapon-budget-badge"]');
  const weaponAetherSelect = container.querySelector<HTMLSelectElement>('[data-role="weapon-aether"]');

  const armorNameInput = container.querySelector<HTMLInputElement>('[data-role="armor-name"]');
  const btnRandomArmorName = container.querySelector<HTMLButtonElement>('[data-role="btn-random-armor-name"]');
  const armorBudgetBadge = container.querySelector<HTMLElement>('[data-role="armor-budget-badge"]');
  const armorShieldSelect = container.querySelector<HTMLSelectElement>('[data-role="armor-shield"]');
  const armorSpecialHint = container.querySelector<HTMLElement>('[data-role="armor-special-hint"]');

  let toastTimer: ReturnType<typeof setTimeout> | null = null;
  const showToast = () => {
    if (!toast) return;
    toast.classList.add('eevenkoto-equipment-workshop__toast--visible');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('eevenkoto-equipment-workshop__toast--visible');
    }, 2500);
  };

  const syncFormFromSpecs = () => {
    if (weaponNameInput) weaponNameInput.value = weapon.name;
    if (armorNameInput) armorNameInput.value = armor.name;

    // Weapon radios
    const wClassRadio = container.querySelector<HTMLInputElement>(
      `input[name^="weapon-class"][value="${weapon.weaponClass}"]`,
    );
    if (wClassRadio) wClassRadio.checked = true;

    const wTypeRadio = container.querySelector<HTMLInputElement>(
      `input[name^="weapon-type"][value="${weapon.weaponType}"]`,
    );
    if (wTypeRadio) wTypeRadio.checked = true;

    const wAddRadio = container.querySelector<HTMLInputElement>(
      `input[name^="weapon-add-trait"][value="${weapon.addTrait}"]`,
    );
    if (wAddRadio) wAddRadio.checked = true;

    // Weapon checkboxes
    container
      .querySelectorAll<HTMLInputElement>('input[name^="weapon-main-trait"]')
      .forEach((cb) => {
        cb.checked = weapon.mainTraits.includes(cb.value as WeaponMainTrait);
      });

    if (weaponAetherSelect) weaponAetherSelect.value = weapon.aetherTrait;

    // Armor radios
    const aTypeRadio = container.querySelector<HTMLInputElement>(
      `input[name^="armor-type"][value="${armor.armorType}"]`,
    );
    if (aTypeRadio) aTypeRadio.checked = true;

    // Armor steppers
    Object.entries(armor.generalTraits).forEach(([field, val]) => {
      const el = container.querySelector<HTMLElement>(`[data-stepper-val="${field}"]`);
      if (el) el.textContent = String(val);
    });

    // Armor special traits
    container
      .querySelectorAll<HTMLInputElement>('input[name^="armor-special-trait"]')
      .forEach((cb) => {
        cb.checked = armor.specialTraits.includes(cb.value as ArmorSpecialTrait);
      });

    if (armorShieldSelect) armorShieldSelect.value = armor.shield;
  };

  const setMode = (mode: 'weapons' | 'armor') => {
    currentMode = mode;
    if (mode === 'weapons') {
      panelWeapons?.classList.add('eevenkoto-equipment-workshop__panel--active');
      panelArmor?.classList.remove('eevenkoto-equipment-workshop__panel--active');
    } else {
      panelArmor?.classList.add('eevenkoto-equipment-workshop__panel--active');
      panelWeapons?.classList.remove('eevenkoto-equipment-workshop__panel--active');
    }
    update();
  };

  const update = () => {
    if (currentMode === 'weapons') {
      // Rule disablers
      const isRanged = weapon.weaponType === 'kantama';
      const isWar = weapon.weaponClass === 'sota_ase';

      const slashingCb = container.querySelector<HTMLInputElement>(
        'input[name^="weapon-main-trait"][value="viiltava"]',
      );
      if (slashingCb) {
        slashingCb.disabled = isRanged;
        if (isRanged && slashingCb.checked) {
          slashingCb.checked = false;
          weapon.mainTraits = weapon.mainTraits.filter((t) => t !== 'viiltava');
        }
      }

      const heavyCb = container.querySelector<HTMLInputElement>(
        'input[name^="weapon-main-trait"][value="raskas"]',
      );
      const versatileCb = container.querySelector<HTMLInputElement>(
        'input[name^="weapon-main-trait"][value="monikayttoinen"]',
      );
      if (heavyCb) heavyCb.disabled = !isWar;
      if (versatileCb) versatileCb.disabled = !isWar;

      const clumsyRadio = container.querySelector<HTMLInputElement>(
        'input[name^="weapon-add-trait"][value="kompelo"]',
      );
      if (clumsyRadio) clumsyRadio.disabled = isWar;

      const traditionalRadio = container.querySelector<HTMLInputElement>(
        'input[name^="weapon-add-trait"][value="perinteinen"]',
      );
      if (traditionalRadio) traditionalRadio.disabled = !isRanged;

      const res = calculateWeapon(weapon);
      if (weaponBudgetBadge) {
        weaponBudgetBadge.textContent = `${res.usedMainTraits} / ${res.maxMainTraits} käytetty`;
        weaponBudgetBadge.className = `eevenkoto-badge eevenkoto-badge--bold ${
          res.usedMainTraits > res.maxMainTraits ? 'eevenkoto-badge--critical' : 'eevenkoto-badge--neutral'
        }`;
      }

      if (previewContainer) {
        const blockProps = weaponToEquipmentBlockProps(res, true);
        previewContainer.innerHTML = renderEquipmentBlock(blockProps);
        wireCopyButton(blockProps.copyText || '');
      }
    } else {
      // Armor disablers
      const allowsSpecial = armor.armorType === 'keskiraskas' || armor.armorType === 'raskas';
      container
        .querySelectorAll<HTMLInputElement>('input[name^="armor-special-trait"]')
        .forEach((cb) => {
          cb.disabled = !allowsSpecial;
          if (!allowsSpecial && cb.checked) {
            cb.checked = false;
            armor.specialTraits = [];
          }
        });

      if (armorSpecialHint) {
        armorSpecialHint.style.color = allowsSpecial
          ? 'var(--eevenkoto-color-content-secondary)'
          : 'var(--eevenkoto-color-content-accent)';
      }

      const res = calculateArmor(armor);
      if (armorBudgetBadge) {
        armorBudgetBadge.textContent = `${res.usedTraits} / ${res.maxTraits} valittu`;
        armorBudgetBadge.className = `eevenkoto-badge eevenkoto-badge--bold ${
          res.usedTraits > res.maxTraits ? 'eevenkoto-badge--critical' : 'eevenkoto-badge--neutral'
        }`;
      }

      if (previewContainer) {
        const blockProps = armorToEquipmentBlockProps(res, true);
        previewContainer.innerHTML = renderEquipmentBlock(blockProps);
        wireCopyButton(blockProps.copyText || '');
      }
    }
  };

  const wireCopyButton = (copyText: string) => {
    const btn = previewContainer?.querySelector<HTMLButtonElement>('.eevenkoto-equipment-block__copy-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy-text') || copyText;
      if (options.onCopy) {
        options.onCopy(text);
        showToast();
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          showToast();
        });
      }
    });
  };

  // Wire mode switches
  container
    .querySelectorAll<HTMLInputElement>('input[name^="equipment-workshop-mode"]')
    .forEach((radio) => {
      radio.addEventListener('change', () => {
        if (radio.checked) {
          setMode(radio.value as 'weapons' | 'armor');
        }
      });
    });

  // Wire preset selection
  presetSelect?.addEventListener('change', () => {
    const val = presetSelect.value;
    if (!val) return;
    if (val.startsWith('weapon:')) {
      const pid = val.replace('weapon:', '');
      const p = WEAPON_PRESETS.find((x) => x.id === pid);
      if (p) {
        weapon = { ...p.spec, mainTraits: [...p.spec.mainTraits] };
        syncFormFromSpecs();
        const modeRadio = container.querySelector<HTMLInputElement>(
          'input[name^="equipment-workshop-mode"][value="weapons"]',
        );
        if (modeRadio) modeRadio.checked = true;
        setMode('weapons');
      }
    } else if (val.startsWith('armor:')) {
      const pid = val.replace('armor:', '');
      const p = ARMOR_PRESETS.find((x) => x.id === pid);
      if (p) {
        armor = {
          ...p.spec,
          generalTraits: { ...p.spec.generalTraits },
          specialTraits: [...p.spec.specialTraits],
        };
        syncFormFromSpecs();
        const modeRadio = container.querySelector<HTMLInputElement>(
          'input[name^="equipment-workshop-mode"][value="armor"]',
        );
        if (modeRadio) modeRadio.checked = true;
        setMode('armor');
      }
    }
    presetSelect.value = '';
  });

  // Name inputs & Random dice
  weaponNameInput?.addEventListener('input', () => {
    weapon.name = weaponNameInput.value || 'Kustomoitu ase';
    update();
  });
  btnRandomWeaponName?.addEventListener('click', () => {
    const rName = generateWeaponName();
    weapon.name = rName;
    if (weaponNameInput) weaponNameInput.value = rName;
    update();
  });

  armorNameInput?.addEventListener('input', () => {
    armor.name = armorNameInput.value || 'Räätälöity panssari';
    update();
  });
  btnRandomArmorName?.addEventListener('click', () => {
    const rName = generateArmorName();
    armor.name = rName;
    if (armorNameInput) armorNameInput.value = rName;
    update();
  });

  // Radios and Checkboxes
  container.querySelectorAll<HTMLInputElement>('input[type="radio"]').forEach((radio) => {
    if (radio.name.startsWith('weapon-class')) {
      radio.addEventListener('change', () => {
        if (radio.checked) {
          weapon.weaponClass = radio.value as any;
          update();
        }
      });
    } else if (radio.name.startsWith('weapon-type')) {
      radio.addEventListener('change', () => {
        if (radio.checked) {
          weapon.weaponType = radio.value as any;
          update();
        }
      });
    } else if (radio.name.startsWith('weapon-add-trait')) {
      radio.addEventListener('change', () => {
        if (radio.checked) {
          weapon.addTrait = radio.value as any;
          update();
        }
      });
    } else if (radio.name.startsWith('armor-type')) {
      radio.addEventListener('change', () => {
        if (radio.checked) {
          armor.armorType = radio.value as any;
          update();
        }
      });
    }
  });

  container.querySelectorAll<HTMLInputElement>('input[type="checkbox"]').forEach((cb) => {
    if (cb.name.startsWith('weapon-main-trait')) {
      cb.addEventListener('change', () => {
        const checkedList: WeaponMainTrait[] = [];
        container
          .querySelectorAll<HTMLInputElement>(`input[name="${cb.name}"]:checked`)
          .forEach((c) => checkedList.push(c.value as WeaponMainTrait));
        weapon.mainTraits = checkedList;
        update();
      });
    } else if (cb.name.startsWith('armor-special-trait')) {
      cb.addEventListener('change', () => {
        const checkedList: ArmorSpecialTrait[] = [];
        container
          .querySelectorAll<HTMLInputElement>(`input[name="${cb.name}"]:checked`)
          .forEach((c) => checkedList.push(c.value as ArmorSpecialTrait));
        armor.specialTraits = checkedList;
        update();
      });
    }
  });

  // Selects
  weaponAetherSelect?.addEventListener('change', () => {
    weapon.aetherTrait = weaponAetherSelect.value as any;
    update();
  });
  armorShieldSelect?.addEventListener('change', () => {
    armor.shield = armorShieldSelect.value as any;
    update();
  });

  // Steppers
  container.querySelectorAll<HTMLButtonElement>('[data-role="stepper-btn"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const field = btn.getAttribute('data-field') as keyof typeof armor.generalTraits;
      const dir = parseInt(btn.getAttribute('data-dir') || '0', 10);
      if (!field) return;
      const current = armor.generalTraits[field] || 0;
      const next = Math.max(0, current + dir);
      armor.generalTraits[field] = next;
      const displayEl = container.querySelector<HTMLElement>(`[data-stepper-val="${field}"]`);
      if (displayEl) displayEl.textContent = String(next);
      update();
    });
  });

  // Initial update
  update();

  return () => {
    if (toastTimer) clearTimeout(toastTimer);
    container.dataset.initialized = 'false';
  };
};

export const autoInitEquipmentWorkshops = (): void => {
  if (typeof document === 'undefined') return;
  document
    .querySelectorAll<HTMLElement>('[data-eevenkoto-equipment-workshop]')
    .forEach((el) => {
      initEquipmentWorkshop(el);
    });
};
