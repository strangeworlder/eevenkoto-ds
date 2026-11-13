import {
  workshopBodyClassNames,
  workshopClassNames,
  workshopControlsClassNames,
  workshopFooterClassNames,
  workshopHeaderClassNames,
  workshopPreviewClassNames,
  workshopToolbarClassNames,
  type WorkshopProps,
  type WorkshopTitleLevel,
} from '@eevenkoto/core';
import type { CSSProperties, HTMLAttributes, ReactElement, ReactNode } from 'react';
import { Icon } from '../atoms/Icon';

export type { WorkshopProps };

export type WorkshopComponentProps = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'title'> &
  Omit<WorkshopProps, 'header' | 'controls' | 'toolbar' | 'preview' | 'footer'> & {
    /** Header content (title, mode switcher, presets). */
    header?: ReactNode;
    /** Controls column content (form inputs, steppers, radio/checkbox groups). */
    controls?: ReactNode;
    /** Sunken summary/export bar above the preview region. */
    toolbar?: ReactNode;
    /** Live preview column/region content (Statblock, Spellblock, EquipmentBlock, etc.). */
    preview?: ReactNode;
    /** Top-bordered quick-pick or secondary footer tray below body. */
    footer?: ReactNode;
    /** Shorthand for `controls` when passed as children. */
    children?: ReactNode;
  };

export const Workshop = ({
  header,
  controls,
  toolbar,
  preview,
  footer,
  children,
  id,
  idSuffix,
  label,
  layout,
  sticky,
  icon,
  title,
  titleLevel,
  subtitle,
  controlsWidth,
  className,
  style,
  role,
  ...rest
}: WorkshopComponentProps): ReactElement => {
  const classes = [workshopClassNames({ layout, sticky }), className].filter(Boolean).join(' ');
  const elementId = id ?? (idSuffix ? `workshop${idSuffix}` : undefined);
  const mergedStyle: CSSProperties | undefined = controlsWidth
    ? ({
        ...style,
        '--eevenkoto-workshop-controls-width': controlsWidth,
      } as CSSProperties)
    : style;

  const hasTitleGroup = Boolean(icon || title || subtitle);
  const resolvedTitleLevel: WorkshopTitleLevel = titleLevel === 3 ? 3 : 2;
  const TitleTag = resolvedTitleLevel === 3 ? 'h3' : 'h2';
  const hasHeader = hasTitleGroup || Boolean(header);
  const hasPreview = Boolean(toolbar || preview);

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
      {hasHeader ? (
        <div className={workshopHeaderClassNames()}>
          {hasTitleGroup ? (
            <div className="eevenkoto-workshop__title-group">
              {icon ? (
                <span className="eevenkoto-workshop__icon-badge">
                  <Icon name={icon} />
                </span>
              ) : null}
              {title ? <TitleTag className="eevenkoto-workshop__title">{title}</TitleTag> : null}
              {subtitle ? <p className="eevenkoto-workshop__subtitle">{subtitle}</p> : null}
            </div>
          ) : null}
          {header}
        </div>
      ) : null}
      <div className={workshopBodyClassNames()}>
        <div className={workshopControlsClassNames()}>{controls ?? children}</div>
        {hasPreview ? (
          <div className={workshopPreviewClassNames()}>
            {toolbar ? <div className={workshopToolbarClassNames()}>{toolbar}</div> : null}
            {preview}
          </div>
        ) : null}
      </div>
      {footer ? <footer className={workshopFooterClassNames()}>{footer}</footer> : null}
    </div>
  );
};
