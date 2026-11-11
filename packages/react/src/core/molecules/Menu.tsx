import {
  menuClassNames,
  menuIconClassNames,
  menuItemClassNames,
  menuItemLabelClassNames,
  type MenuEntry,
  type MenuGroupEntry,
  type MenuItemEntry,
  type MenuProps,
  type MenuSize,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { Icon } from '../atoms/Icon';
import { StatusDot } from '../atoms/StatusDot';

export type { MenuProps, MenuEntry, MenuSize };

export type MenuComponentProps = Omit<HTMLAttributes<HTMLElement>, 'children'> &
  MenuProps & {
    onSelect?: (id: string) => void;
  };

const itemExtras = (entry: MenuItemEntry): ReactNode => {
  const extras = Boolean(entry.icon || entry.locked || entry.status);
  return (
    <>
      {entry.icon ? (
        <span className={menuIconClassNames()}>
          <Icon name={entry.icon} />
        </span>
      ) : null}
      {extras ? <span className={menuItemLabelClassNames()}>{entry.label}</span> : entry.label}
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
};

const groupSummaryInner = (entry: MenuGroupEntry): ReactNode => {
  if (!entry.icon) return entry.label;
  return (
    <>
      <span className={menuIconClassNames()}>
        <Icon name={entry.icon} />
      </span>
      <span className={menuItemLabelClassNames()}>{entry.label}</span>
    </>
  );
};

const renderEntries = (
  entries: MenuEntry[],
  onSelect?: (id: string) => void,
): ReactNode[] =>
  entries.map((entry, index) => {
    if (entry.kind === 'separator') {
      return (
        <li key={`separator-${index}`}>
          <hr />
        </li>
      );
    }

    if (entry.kind === 'header') {
      return (
        <li key={`header-${entry.label}-${index}`}>
          <p className="eevenkoto-menu__header">{entry.label}</p>
        </li>
      );
    }

    if (entry.kind === 'group') {
      return (
        <li key={entry.id}>
          <details open={entry.expanded || undefined}>
            <summary>{groupSummaryInner(entry)}</summary>
            <ul>{renderEntries(entry.children, onSelect)}</ul>
          </details>
        </li>
      );
    }

    const itemClasses = menuItemClassNames({ selected: entry.selected, locked: entry.locked });
    const lockedNoHref = Boolean(entry.locked && !entry.href);

    if (entry.href) {
      return (
        <li key={entry.id}>
          <a
            className={itemClasses}
            href={entry.href}
            aria-current={entry.selected ? 'page' : undefined}
            aria-disabled={entry.disabled || lockedNoHref ? true : undefined}
            tabIndex={entry.disabled || lockedNoHref ? -1 : undefined}
          >
            {itemExtras(entry)}
          </a>
        </li>
      );
    }

    return (
      <li key={entry.id}>
        <button
          type="button"
          className={itemClasses}
          disabled={entry.disabled || entry.locked}
          onClick={() => onSelect?.(entry.id)}
        >
          {itemExtras(entry)}
        </button>
      </li>
    );
  });

export const Menu = ({
  entries,
  label,
  size,
  embedded,
  className,
  onSelect,
  ...rest
}: MenuComponentProps): ReactElement => {
  const classes = [menuClassNames({ embedded, size }), className].filter(Boolean).join(' ');

  return (
    <nav className={classes} aria-label={label} {...rest}>
      <ul>{renderEntries(entries, onSelect)}</ul>
    </nav>
  );
};
