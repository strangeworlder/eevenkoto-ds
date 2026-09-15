import {
  menuBranchClassNames,
  menuClassNames,
  menuGroupClassNames,
  menuItemClassNames,
  menuSummaryClassNames,
  type MenuEntry,
  type MenuProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { Icon } from '../atoms/Icon';

export type { MenuProps, MenuEntry };

export type MenuComponentProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  MenuProps & {
    onSelect?: (id: string) => void;
  };

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
            <span>{entry.label}</span>
          </summary>
          <div className={menuGroupClassNames()}>{renderEntries(entry.children, onSelect)}</div>
        </details>
      );
    }

    const itemClasses = menuItemClassNames(entry.selected);

    if (entry.href) {
      return (
        <a
          key={entry.id}
          className={itemClasses}
          href={entry.href}
          aria-disabled={entry.disabled ? true : undefined}
        >
          {entry.label}
        </a>
      );
    }

    return (
      <button
        key={entry.id}
        type="button"
        className={itemClasses}
        disabled={entry.disabled}
        onClick={() => onSelect?.(entry.id)}
      >
        {entry.label}
      </button>
    );
  });

export const Menu = ({
  entries,
  label,
  className,
  onSelect,
  ...rest
}: MenuComponentProps): ReactElement => {
  const classes = [menuClassNames(), className].filter(Boolean).join(' ');

  return (
    <div className={classes} role="group" aria-label={label} {...rest}>
      {renderEntries(entries, onSelect)}
    </div>
  );
};
