import {
  readAloudBoxBodyClassNames,
  readAloudBoxClassNames,
  readAloudBoxOrnamentClassNames,
  type ReadAloudBoxProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';

export type { ReadAloudBoxProps };

export type ReadAloudBoxComponentProps = Omit<HTMLAttributes<HTMLElement>, 'children'> &
  ReadAloudBoxProps & {
    children?: ReactNode;
  };

export const ReadAloudBox = ({
  id,
  label,
  ornament = '❖',
  body,
  bodyHtml,
  className,
  children,
  ...rest
}: ReadAloudBoxComponentProps): ReactElement => {
  const classes = [readAloudBoxClassNames(), className].filter(Boolean).join(' ');
  const hasChildren = children !== undefined && children !== null && children !== false;

  return (
    <aside id={id} className={classes} aria-label={label} {...rest}>
      {ornament ? (
        <span className={readAloudBoxOrnamentClassNames()} aria-hidden="true">
          {ornament}
        </span>
      ) : null}
      {hasChildren ? (
        <div className={readAloudBoxBodyClassNames()}>{children}</div>
      ) : bodyHtml !== undefined ? (
        <div className={readAloudBoxBodyClassNames()} dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      ) : (
        <div className={readAloudBoxBodyClassNames()}>{body ? <p>{body}</p> : null}</div>
      )}
    </aside>
  );
};