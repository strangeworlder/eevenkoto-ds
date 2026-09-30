import {
  equipmentWorkshopClassNames,
  type EquipmentWorkshopProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';

export type { EquipmentWorkshopProps };

export type EquipmentWorkshopComponentProps = Omit<HTMLAttributes<HTMLElement>, 'children'> &
  EquipmentWorkshopProps & {
    /** Header content (title, mode switcher, presets) */
    header?: ReactNode;
    /** Controls column content (form inputs, steppers, radio groups) */
    controls?: ReactNode;
    /** Preview column content (typically EquipmentBlock) */
    preview?: ReactNode;
    /** Shorthand for controls when passed as children */
    children?: ReactNode;
  };

export const EquipmentWorkshop = ({
  header,
  controls,
  preview,
  children,
  idSuffix,
  className,
  id,
  ...rest
}: EquipmentWorkshopComponentProps): ReactElement => {
  const classes = [equipmentWorkshopClassNames(), className].filter(Boolean).join(' ');
  const elementId = id ?? (idSuffix ? `equipment-workshop${idSuffix}` : undefined);

  return (
    <div className={classes} id={elementId} data-eevenkoto-equipment-workshop {...rest}>
      {header ? <div className="eevenkoto-equipment-workshop__header">{header}</div> : null}
      <div className="eevenkoto-equipment-workshop__body">
        <div className="eevenkoto-equipment-workshop__controls">{controls ?? children}</div>
        {preview ? <div className="eevenkoto-equipment-workshop__preview">{preview}</div> : null}
      </div>
    </div>
  );
};
