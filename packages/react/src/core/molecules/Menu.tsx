import {
  menuBranchClassNames,
  menuClassNames,
  menuGroupClassNames,
  menuItemClassNames,
  menuItemLabelClassNames,
  menuSummaryClassNames,
  type MenuEntry,
  type MenuItemEntry,
  type MenuProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { Icon } from '../atoms/Icon';
import { StatusDot } from '../atoms/StatusDot';

export type { MenuProps, MenuEntry };

export type MenuComponentProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  MenuProps & {
    onSelect?: (id: string) => void;
  };

const itemExtras = (entry: MenuItemEntry): ReactNode => (
  <>
    <span className={menuItemLabelClassNames()}>{entry.label}</span>
    {entry.locked ? (
      <span className="eevenkoto-menu__lock">
        <Icon name="lock" />
        <span className="eevenkoto-visually-hidden">{entry.lockedLabel ?? 'Locked'}</span>
      </span>
    ) : null}
    {entry.status ? (
      <span className="eevenkoto-menu__status">
        <StatusDot intent={entry.status} label={entry.statusLabel ?? 'Ready'} />
      </span>
    ) : null}
  </>
);

const renderEntries = (
  entries: MenuEntry[],
  onSelect?: (id: string) => void,
): ReactNode[] =>
  entries.map((entry, index) => {
    if (entry.kind === 'separator') {
      return <hr key={`separator-${index}`} className="eevenkoto-menu__separator" />;
    }

    if (entry.kind === 'header') {
      return (
        <p key={`header-${entry.label}-${index}`} className="eevenkoto-menu__header">
          {entry.label}
        </p>
      );
    }

    if (entry.kind === 'group') {
      return (
        <details
          key={entry.id}
          className={menuBranchClassNames()}
          open={entry.expanded || undefined}
        >
          <summary className={menuSummaryClassNames()}>
            <span className="eevenkoto-menu__chevron" aria-hidden="true">
              <Icon name="chevron-right" size="sm" />
            </span>
            <span className={menuItemLabelClassNames()}>{entry.label}</span>
          </summary>
          <div className={menuGroupClassNames()}>{renderEntries(entry.children, onSelect)}</div>
        </details>
      );
    }

    const itemClasses = menuItemClassNames({ selected: entry.selected, locked: entry.locked });
    const lockedNoHref = Boolean(entry.locked && !entry.href);

    if (entry.href) {
      return (
        <a
          key={entry.id}
          className={itemClasses}
          href={entry.href}
          aria-disabled={entry.disabled || lockedNoHref ? true : undefined}
        >
          {itemExtras(entry)}
        </a>
      );
    }

    return (
      <button
        key={entry.id}
        type="button"
        className={itemClasses}
        disabled={entry.disabled || entry.locked}
        onClick={() => onSelect?.(entry.id)}
      >
        {itemExtras(entry)}
      </button>
    );
  });

export const Menu = ({
  entries,
  label,
  embedded,
  className,
  onSelect,
  ...rest
}: MenuComponentProps): ReactElement => {
  const classes = [menuClassNames({ embedded }), className].filter(Boolean).join(' ');

  return (
    <div className={classes} role="group" aria-label={label} {...rest}>
      {renderEntries(entries, onSelect)}
    </div>
  );
};
