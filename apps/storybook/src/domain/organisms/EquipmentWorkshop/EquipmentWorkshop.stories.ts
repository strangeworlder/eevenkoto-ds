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
  initEquipmentWorkshop,
  type EquipmentWorkshopProps,
} from '@eevenkoto/html';

const meta: Meta<EquipmentWorkshopProps> = {
  title: 'Domain/Organisms/EquipmentWorkshop',
  parameters: {
    docs: {
      description: {
        component:
          'EquipmentWorkshop ("Varusteverstas") is an interactive organism for crafting customized weapons and armor. It pairs an accessible control panel (presets, radio cards, steppers, checkboxes) with a live reactive EquipmentBlock preview and one-click clipboard export.',
      },
    },
  },
  render: (args) => {
    const container = document.createElement('div');
    container.innerHTML = renderEquipmentWorkshop(args);
    const host = container.firstElementChild as HTMLElement;
    if (host) {
      setTimeout(() => initEquipmentWorkshop(host), 0);
    }
    return container;
  },
};

export default meta;
type Story = StoryObj<EquipmentWorkshopProps>;

export const Default: Story = {
  args: {
    initialMode: 'weapons',
  },
};

export const ArmorWorkshop: Story = {
  name: 'Haarniskaverstas (Armor mode)',
  args: {
    initialMode: 'armor',
  },
};
