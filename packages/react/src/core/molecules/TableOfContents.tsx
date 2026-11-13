import {
  tableOfContentsClassNames,
  type TableOfContentsGroup,
  type TableOfContentsProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement } from 'react';
import { Icon } from '../atoms/Icon';

export type { TableOfContentsProps };

export type TableOfContentsComponentProps = Omit<HTMLAttributes<HTMLElement>, 'children'> &
  TableOfContentsProps;

const Groups = ({ groups }: { groups: TableOfContentsGroup[] }): ReactElement => (
  <>
    {groups.map((group, index) => (
      <div className="eevenkoto-toc__group" id={group.id} key={group.id ?? index}>
        {group.label ? <p className="eevenkoto-toc__group-label">{group.label}</p> : null}
        <ul className="eevenkoto-toc__list">
          {group.items.map((item) => (
            <li key={item.id}>
              <a
                className="eevenkoto-toc__link"
                href={item.href}
                data-toc-target={item.id}
                aria-current={item.current ? 'location' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </>
);

export const TableOfContents = ({
  id,
  label = 'Table of contents',
  groups,
  variant = 'auto',
  toggleLabel = 'On this page',
  open,
  className,
  ...rest
}: TableOfContentsComponentProps): ReactElement => {
  const classes = [tableOfContentsClassNames({ variant }), className].filter(Boolean).join(' ');

  return (
    <nav id={id} className={classes} aria-label={label} {...rest}>
      {variant !== 'collapsible' ? (
        <div className="eevenkoto-toc__rail">
          <p className="eevenkoto-toc__heading">{toggleLabel}</p>
          <Groups groups={groups} />
        </div>
      ) : null}
      {variant !== 'rail' ? (
        <details className="eevenkoto-toc__disclosure" open={open || undefined}>
          <summary className="eevenkoto-toc__summary">
            <span className="eevenkoto-toc__toggle-label">{toggleLabel}</span>
            <Icon name="chevron-down" size="sm" />
          </summary>
          <div className="eevenkoto-toc__panel">
            <Groups groups={groups} />
          </div>
        </details>
      ) : null}
    </nav>
  );
};
