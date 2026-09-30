export interface EquipmentWorkshopProps {
  /** Optional custom id suffix for element uniqueness in DOM */
  idSuffix?: string;
  /** Controls column content (or use default slot/children in frameworks) */
  controls?: string;
  /** Preview column content (typically an EquipmentBlock) */
  preview?: string;
  /** Header bar content (mode switch, title, preset selector) */
  header?: string;
}

export const equipmentWorkshopClassNames = (): string => 'eevenkoto-equipment-workshop';
