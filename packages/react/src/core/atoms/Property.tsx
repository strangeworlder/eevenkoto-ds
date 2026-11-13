import {
  propertyClassNames,
  propertyMetaClassNames,
  type PropertyProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';

export type { PropertyProps };

/** Property whose value may carry inline nodes (EntityRef, emphasis, …). */
export type PropertyItemNode = {
  label: string;
  value?: ReactNode;
  valueHtml?: string;
  meta?: string | string[];
};

export type PropertyComponentProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  Omit<PropertyProps, 'value'> & { value?: ReactNode };

export const Property = ({
  label,
  value,
  valueHtml,
  meta,
  className,
  ...rest
}: PropertyComponentProps): ReactElement => {
  const classes = [propertyClassNames(), className].filter(Boolean).join(' ');
  const metaLines = (Array.isArray(meta) ? meta : meta ? [meta] : []).filter(Boolean);
  const metaNodes = metaLines.map((line, index) => (
    <span key={`${line}-${index}`} className={propertyMetaClassNames()}>
      {line}
    </span>
  ));

  return (
    <div className={classes} {...rest}>
      <dt className="eevenkoto-property__label">{label}</dt>
      {value === undefined && valueHtml !== undefined ? (
        metaNodes.length > 0 ? (
          <dd className="eevenkoto-property__value">
            <span dangerouslySetInnerHTML={{ __html: valueHtml }} />
            {metaNodes}
          </dd>
        ) : (
          <dd
            className="eevenkoto-property__value"
            dangerouslySetInnerHTML={{ __html: valueHtml }}
          />
        )
      ) : (
        <dd className="eevenkoto-property__value">
          {value}
          {metaNodes.length > 0 ? metaNodes : null}
        </dd>
      )}
    </div>
  );
};
