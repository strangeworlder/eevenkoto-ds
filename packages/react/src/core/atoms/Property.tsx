import {
  propertyClassNames,
  propertyMetaClassNames,
  type PropertyProps,
  type PropertySpan,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';

export type { PropertyProps, PropertySpan };

/** Property whose value may carry inline nodes (EntityRef, emphasis, …). */
export type PropertyItemNode = {
  id?: string;
  label: string;
  value?: ReactNode;
  valueHtml?: string;
  meta?: string | string[];
  emphasized?: boolean;
  span?: PropertySpan;
  hidden?: boolean;
};

export type PropertyComponentProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  Omit<PropertyProps, 'value'> & { value?: ReactNode };

export const Property = ({
  id,
  label,
  value,
  valueHtml,
  meta,
  emphasized,
  span,
  hidden,
  className,
  ...rest
}: PropertyComponentProps): ReactElement => {
  const classes = [propertyClassNames({ emphasized, span }), className].filter(Boolean).join(' ');
  const metaLines = (Array.isArray(meta) ? meta : meta ? [meta] : []).filter(Boolean);
  const metaNodes = metaLines.map((line, index) => (
    <span key={`${line}-${index}`} className={propertyMetaClassNames()}>
      {line}
    </span>
  ));

  return (
    <div id={id} hidden={hidden || undefined} className={classes} {...rest}>
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
