import {
  equipmentWorkshopClassNames,
  workshopBodyClassNames,
  workshopControlsClassNames,
  workshopFooterClassNames,
  workshopHeaderClassNames,
  workshopPreviewClassNames,
  workshopToolbarClassNames,
  type EquipmentWorkshopProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';

export type { EquipmentWorkshopProps };

export type EquipmentWorkshopComponentProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  Omit<EquipmentWorkshopProps, 'header' | 'controls' | 'toolbar' | 'preview' | 'footer'> & {
    /** Header content (title, mode switcher, presets) */
    header?: ReactNode;
    /** Controls column content (form inputs, steppers, radio groups) */
    controls?: ReactNode;
    /** Optional sunken toolbar above preview */
    toolbar?: ReactNode;
    /** Preview column content (typically EquipmentBlock) */
    preview?: ReactNode;
    /** Optional footer tray content */
    footer?: ReactNode;
    /** Shorthand for controls when passed as children */
    children?: ReactNode;
  };

export const EquipmentWorkshop = ({
  header,
  controls,
  toolbar,
  preview,
  footer,
  children,
  idSuffix,
  layout,
  sticky,
  className,
  id,
  ...rest
}: EquipmentWorkshopComponentProps): ReactElement => {
  const classes = [equipmentWorkshopClassNames({ layout, sticky }), className]
    .filter(Boolean)
    .join(' ');
  const elementId = id ?? (idSuffix ? `equipment-workshop${idSuffix}` : undefined);
  const hasPreview = Boolean(toolbar || preview);

  return (
    <div className={classes} id={elementId} data-eevenkoto-equipment-workshop {...rest}>
      {header ? (
        <div className={`${workshopHeaderClassNames()} eevenkoto-equipment-workshop__header`}>
          {header}
        </div>
      ) : null}
      <div className={`${workshopBodyClassNames()} eevenkoto-equipment-workshop__body`}>
        <div className={`${workshopControlsClassNames()} eevenkoto-equipment-workshop__controls`}>
          {controls ?? children}
        </div>
        {hasPreview ? (
          <div className={`${workshopPreviewClassNames()} eevenkoto-equipment-workshop__preview`}>
            {toolbar ? (
              <div
                className={`${workshopToolbarClassNames()} eevenkoto-equipment-workshop__toolbar`}
              >
                {toolbar}
              </div>
            ) : null}
            {preview}
          </div>
        ) : null}
      </div>
      {footer ? (
        <div className={`${workshopFooterClassNames()} eevenkoto-equipment-workshop__footer`}>
          {footer}
        </div>
      ) : null}
    </div>
  );
};
