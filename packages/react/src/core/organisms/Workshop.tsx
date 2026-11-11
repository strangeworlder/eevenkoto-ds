import {
  workshopBodyClassNames,
  workshopClassNames,
  workshopControlsClassNames,
  workshopHeaderClassNames,
  workshopPreviewClassNames,
  type WorkshopProps,
} from '@eevenkoto/core';
import type { CSSProperties, HTMLAttributes, ReactElement, ReactNode } from 'react';

export type { WorkshopProps };

export type WorkshopComponentProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  Omit<WorkshopProps, 'header' | 'controls' | 'preview'> & {
    /** Header content (title, mode switcher, presets). */
    header?: ReactNode;
    /** Controls column content (form inputs, steppers, radio/checkbox groups). */
    controls?: ReactNode;
    /** Sticky preview column content (Statblock, Spellblock, EquipmentBlock, etc.). */
    preview?: ReactNode;
    /** Shorthand for `controls` when passed as children. */
    children?: ReactNode;
  };

export const Workshop = ({
  header,
  controls,
  preview,
  children,
  id,
  idSuffix,
  label,
  controlsWidth,
  className,
  style,
  role,
  ...rest
}: WorkshopComponentProps): ReactElement => {
  const classes = [workshopClassNames(), className].filter(Boolean).join(' ');
  const elementId = id ?? (idSuffix ? `workshop${idSuffix}` : undefined);
  const mergedStyle: CSSProperties | undefined = controlsWidth
    ? ({
        ...style,
        '--eevenkoto-workshop-controls-width': controlsWidth,
      } as CSSProperties)
    : style;

  return (
    <div
      className={classes}
      id={elementId}
      role={role ?? (label ? 'region' : undefined)}
      aria-label={label}
      style={mergedStyle}
      data-eevenkoto-workshop
      {...rest}
    >
      {header ? <div className={workshopHeaderClassNames()}>{header}</div> : null}
      <div className={workshopBodyClassNames()}>
        <div className={workshopControlsClassNames()}>{controls ?? children}</div>
        {preview ? <div className={workshopPreviewClassNames()}>{preview}</div> : null}
      </div>
    </div>
  );
};
