import {
  panelBodyClassNames,
  panelClassNames,
  panelHeaderActionsClassNames,
  panelHeaderClassNames,
  panelHeaderLeadClassNames,
  panelTitleClassNames,
  type PanelProps,
  type PanelTitleLevel,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { createElement } from 'react';

export type { PanelProps, PanelTitleLevel };

export type PanelComponentProps = Omit<HTMLAttributes<HTMLElement>, 'title' | 'children'> &
  PanelProps & {
    /** Leading content inside `.eevenkoto-panel__header` (e.g. a `Swatch`). */
    headerLead?: ReactNode;
    /** Trailing actions inside `.eevenkoto-panel__header`. */
    headerActions?: ReactNode;
    /** Body content; takes precedence over `bodyHtml` and `body`. */
    children?: ReactNode;
  };

const BLOCK_TAG_RE = /^\s*<(?:p|ul|ol|div|dl|blockquote|table|figure|section|fieldset|h[1-6])\b/i;

export const Panel = ({
  id,
  label,
  surface,
  density,
  title,
  titleLevel,
  hidden,
  body,
  bodyHtml,
  headerLead,
  headerActions,
  children,
  className,
  ...rest
}: PanelComponentProps): ReactElement => {
  const classes = [panelClassNames({ surface, density }), className].filter(Boolean).join(' ');
  const level: PanelTitleLevel = titleLevel === 2 ? 2 : titleLevel === 4 ? 4 : 3;
  const hasHeader = Boolean(headerLead != null || title || headerActions != null);

  const headingEl = title
    ? createElement(`h${level}`, { className: panelTitleClassNames() }, title)
    : null;

  const bodyEl =
    children !== undefined ? (
      <div className={panelBodyClassNames()}>{children}</div>
    ) : bodyHtml !== undefined ? (
      BLOCK_TAG_RE.test(bodyHtml) ? (
        <div className={panelBodyClassNames()} dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      ) : (
        <div className={panelBodyClassNames()}>
          <p dangerouslySetInnerHTML={{ __html: bodyHtml }} />
        </div>
      )
    ) : body ? (
      <div className={panelBodyClassNames()}>
        <p>{body}</p>
      </div>
    ) : null;

  const Tag = label ? 'section' : 'div';

  return (
    <Tag
      id={id}
      role={label ? 'region' : undefined}
      aria-label={label}
      hidden={hidden || undefined}
      className={classes}
      {...rest}
    >
      {hasHeader ? (
        <div className={panelHeaderClassNames()}>
          {headerLead != null ? (
            <span className={panelHeaderLeadClassNames()}>{headerLead}</span>
          ) : null}
          {headingEl}
          {headerActions != null ? (
            <div className={panelHeaderActionsClassNames()}>{headerActions}</div>
          ) : null}
        </div>
      ) : null}
      {bodyEl}
    </Tag>
  );
};
