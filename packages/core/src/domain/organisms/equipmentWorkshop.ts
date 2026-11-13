import {
  workshopClassNames,
  type WorkshopClassNameProps,
} from '../../core/organisms/workshop';

export interface EquipmentWorkshopProps extends WorkshopClassNameProps {
  /** Optional custom id suffix for element uniqueness in DOM */
  idSuffix?: string;
  /** Controls column content (or use default slot/children in frameworks) */
  controls?: string;
  /** Optional sunken toolbar above preview */
  toolbar?: string;
  /** Preview column content (typically an EquipmentBlock) */
  preview?: string;
  /** Header bar content (mode switch, title, preset selector) */
  header?: string;
  /** Optional footer tray content */
  footer?: string;
}

export const equipmentWorkshopClassNames = (props: WorkshopClassNameProps = {}): string =>
  `${workshopClassNames(props)} eevenkoto-equipment-workshop`;
