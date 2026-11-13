import {
  captionClassNames,
  headingClassNames,
  paragraphClassNames,
  sectionHeaderClassNames,
  type SectionHeaderProps,
} from '@eevenkoto/core';
import type { CSSProperties, ElementType, HTMLAttributes, ReactElement, ReactNode } from 'react';
import { Icon } from '../atoms/Icon';

export type { SectionHeaderProps };

export type SectionHeaderComponentProps = Omit<HTMLAttributes<HTMLElement>, 'title'> &
  SectionHeaderProps & {
    /** Actions row (buttons / links). */
    actions?: ReactNode;
  };

export const SectionHeader = ({
  id,
  eyebrow,
  title,
  titleHtml,
  titleLevel = 2,
  logo,
  lead,
  leadHtml,
  align,
  note,
  actions,
  className,
  ...rest
}: SectionHeaderComponentProps): ReactElement => {
  const classes = [sectionHeaderClassNames({ align }), className].filter(Boolean).join(' ');
  const Heading = `h${titleLevel}` as ElementType;
  const logoStyle: CSSProperties = {};

  return (
    <header id={id} className={classes} {...rest}>
      {eyebrow ? (
        <p className={captionClassNames({ tone: 'accent', variant: 'eyebrow' })}>{eyebrow}</p>
      ) : null}
      {logo ? (
        <img
          className="eevenkoto-section-header__logo"
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          style={logoStyle}
        />
      ) : null}
      {titleHtml !== undefined ? (
        <Heading
          className={headingClassNames({ level: titleLevel })}
          dangerouslySetInnerHTML={{ __html: titleHtml }}
        />
      ) : title ? (
        <Heading className={headingClassNames({ level: titleLevel })}>{title}</Heading>
      ) : null}
      {leadHtml !== undefined ? (
        <p
          className={`${paragraphClassNames({ size: 'lg', tone: 'secondary' })} eevenkoto-section-header__lead`}
          dangerouslySetInnerHTML={{ __html: leadHtml }}
        />
      ) : lead ? (
        <p
          className={`${paragraphClassNames({ size: 'lg', tone: 'secondary' })} eevenkoto-section-header__lead`}
        >
          {lead}
        </p>
      ) : null}
      {actions ? <div className="eevenkoto-section-header__actions">{actions}</div> : null}
      {note && (note.text || note.html) ? (
        <p className={`eevenkoto-section-header__note ${captionClassNames({ tone: 'secondary' })}`}>
          {note.icon ? <Icon name={note.icon} size="sm" /> : null}
          {note.html !== undefined ? (
            <span dangerouslySetInnerHTML={{ __html: note.html }} />
          ) : (
            <span>{note.text}</span>
          )}
        </p>
      ) : null}
    </header>
  );
};
