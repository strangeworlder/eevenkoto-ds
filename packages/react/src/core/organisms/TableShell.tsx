import {
  tableShellClassNames,
  tableShellFooterClassNames,
  type ScrollAxis,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { Frame } from '../atoms/Frame';
import { Scroll } from '../atoms/Scroll';

export type TableShellComponentProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  children: ReactNode;
  frame?: boolean;
  scroll?: boolean;
  scrollAxis?: ScrollAxis;
  footer?: ReactNode;
};

export const TableShell = ({
  children,
  frame = true,
  scroll = true,
  scrollAxis = 'x',
  footer,
  className,
  ...rest
}: TableShellComponentProps): ReactElement => {
  const classes = [tableShellClassNames(), className].filter(Boolean).join(' ');

  let body: ReactNode = children;
  if (scroll) {
    body = <Scroll axis={scrollAxis}>{body}</Scroll>;
  }
  if (frame) {
    body = <Frame>{body}</Frame>;
  }

  return (
    <div className={classes} {...rest}>
      {body}
      {footer ? <div className={tableShellFooterClassNames()}>{footer}</div> : null}
    </div>
  );
};
