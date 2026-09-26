import {
  menuClassNames,
  menuItemClassNames,
  menuItemLabelClassNames,
  type MenuEntry,
  type MenuItemEntry,
  type MenuProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { Icon } from '../atoms/Icon';
import { StatusDot } from '../atoms/StatusDot';

export type { MenuProps, MenuEntry };

export type MenuComponentProps = Omit<HTMLAttributes<HTMLElement>, 'children'> &
  MenuProps & {
    onSelect?: (id: string) => void;
  };

const itemExtras = (entry: MenuItemEntry): ReactNode => {
  const extras = Boolean(entry.locked || entry.status);
  return (
    <>
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
            <summary>{entry.label}</summary>
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
  embedded,
  className,
  onSelect,
  ...rest
}: MenuComponentProps): ReactElement => {
  const classes = [menuClassNames({ embedded }), className].filter(Boolean).join(' ');

  return (
    <nav className={classes} aria-label={label} {...rest}>
      <ul>{renderEntries(entries, onSelect)}</ul>
    </nav>
  );
};
