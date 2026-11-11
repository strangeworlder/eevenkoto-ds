import { propertyClassNames, type PropertyProps } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';

export type { PropertyProps };

/** Property whose value may carry inline nodes (EntityRef, emphasis, …). */
export type PropertyItemNode = {
  label: string;
  value?: ReactNode;
  valueHtml?: string;
};

export type PropertyComponentProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  Omit<PropertyProps, 'value'> & { value?: ReactNode };

export const Property = ({
  label,
  value,
  valueHtml,
  className,
  ...rest
}: PropertyComponentProps): ReactElement => {
  const classes = [propertyClassNames(), className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      <dt className="eevenkoto-property__label">{label}</dt>
      {value === undefined && valueHtml !== undefined ? (
        <dd
          className="eevenkoto-property__value"
          dangerouslySetInnerHTML={{ __html: valueHtml }}
        />
      ) : (
        <dd className="eevenkoto-property__value">{value}</dd>
      )}
    </div>
  );
};
