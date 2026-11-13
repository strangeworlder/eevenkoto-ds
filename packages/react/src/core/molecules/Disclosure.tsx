import {
  disclosureBodyClassNames,
  disclosureChevronClassNames,
  disclosureClassNames,
  disclosureSummaryClassNames,
  disclosureSummaryLabelClassNames,
  disclosureSummaryLeadClassNames,
  disclosureSummaryMetaClassNames,
  disclosureSummaryTextClassNames,
  type DisclosureProps,
} from '@eevenkoto/core';
import type { DetailsHTMLAttributes, ReactElement, ReactNode } from 'react';
import { Icon } from '../atoms/Icon';

export type { DisclosureProps };

export type DisclosureComponentProps = Omit<DetailsHTMLAttributes<HTMLDetailsElement>, 'children'> &
  DisclosureProps & {
    /** Body content; takes precedence over `bodyHtml` and `body`. */
    children?: ReactNode;
    summaryLead?: ReactNode;
    summaryMeta?: ReactNode;
  };

export const Disclosure = ({
  id,
  label,
  summaryText,
  variant,
  open,
  emphasized,
  body,
  bodyHtml,
  children,
  summaryLead,
  summaryMeta,
  className,
  ...rest
}: DisclosureComponentProps): ReactElement => {
  const classes = [disclosureClassNames({ variant, emphasized }), className]
    .filter(Boolean)
    .join(' ');

  return (
    <details id={id} className={classes} open={open || undefined} {...rest}>
      <summary className={disclosureSummaryClassNames()}>
        {summaryLead ? <span className={disclosureSummaryLeadClassNames()}>{summaryLead}</span> : null}
        <span className={disclosureSummaryLabelClassNames()}>{label}</span>
        {summaryText ? <span className={disclosureSummaryTextClassNames()}>{summaryText}</span> : null}
        {summaryMeta ? <span className={disclosureSummaryMetaClassNames()}>{summaryMeta}</span> : null}
        <Icon name="chevron-down" size="sm" className={disclosureChevronClassNames()} />
      </summary>
      {children !== undefined ? (
        <div className={disclosureBodyClassNames()}>{children}</div>
      ) : bodyHtml !== undefined ? (
        <div className={disclosureBodyClassNames()} dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      ) : (
        <div className={disclosureBodyClassNames()}>{body ? <p>{body}</p> : null}</div>
      )}
    </details>
  );
};
