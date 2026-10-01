import {
  headingClassNames,
  captionClassNames,
  badgeClassNames,
  chipClassNames,
  buttonClassNames,
  noticeClassNames,
  equipmentBlockClassNames,
  type EquipmentBlockProps,
  type EquipmentBlockNameLevel,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { AbilityName } from '../atoms/AbilityName';

export type EquipmentBlockComponentProps = Omit<
  HTMLAttributes<HTMLElement>,
  'children' | 'onCopy'
> &
  EquipmentBlockProps & {
    onCopy?: (text: string) => void;
  };

export const EquipmentBlock = ({
  name,
  nameLevel = 1,
  category,
  price,
  stats,
  kesto,
  traits,
  emptyTraitsText = 'Ei erikoispiirteitä',
  traitsTitle = 'Valitut piirteet',
  notesTitle = 'Säännöt & vaikutukset',
  notes,
  warnings,
  copyText,
  copyLabel = 'Kopioi hahmolomakkeelle',
  showCopyButton = false,
  onCopy,
  className,
  ...rest
}: EquipmentBlockComponentProps): ReactElement => {
  const hostClasses = [equipmentBlockClassNames(), className].filter(Boolean).join(' ');
  const level: EquipmentBlockNameLevel = nameLevel === 2 ? 2 : 1;
  const NameTag = level === 2 ? 'h2' : 'h1';

  const handleCopy = () => {
    if (onCopy && copyText) {
      onCopy(copyText);
    } else if (copyText && typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(copyText);
    }
  };

  return (
    <article className={hostClasses} {...rest}>
      <div className="eevenkoto-equipment-block__plate">
        <div className="eevenkoto-equipment-block__heading-group">
          <NameTag className={headingClassNames({ level })}>{name}</NameTag>
          {category ? (
            <p className={`${captionClassNames()} eevenkoto-equipment-block__category`}>
              {category}
            </p>
          ) : null}
        </div>
        {price ? (
          <div className="eevenkoto-equipment-block__price">
            <span className={badgeClassNames({ variant: 'solid', intent: 'neutral' })}>
              {price}
            </span>
          </div>
        ) : null}
      </div>

      {stats?.length ? (
        <div className="eevenkoto-equipment-block__stats">
          {stats.map((st, i) => {
            const itemClasses = [
              'eevenkoto-equipment-block__stat-item',
              st.emphasis && 'eevenkoto-equipment-block__stat-item--emphasis',
              st.subItems?.length && 'eevenkoto-equipment-block__stat-item--split',
            ]
              .filter(Boolean)
              .join(' ');

            if (st.subItems?.length) {
              return (
                <div key={i} className={itemClasses}>
                  {st.subItems.map((sub, j) => (
                    <div key={j} className="eevenkoto-equipment-block__stat-subitem">
                      <span className="eevenkoto-equipment-block__stat-label">{sub.label}</span>
                      <strong className="eevenkoto-equipment-block__stat-value">{sub.value}</strong>
                    </div>
                  ))}
                </div>
              );
            }

            let valueContent: ReactNode = st.value;
            if (st.abilities?.length) {
              valueContent = st.abilities.map((ab, idx) => (
                <span key={idx}>
                  {idx > 0 ? ' tai ' : null}
                  <AbilityName name={ab} />
                </span>
              ));
            } else if (st.label?.toLowerCase().startsWith('omin') && typeof st.value === 'string') {
              if (st.value.includes(' tai ')) {
                const parts = st.value.split(' tai ');
                valueContent = parts.map((ab, idx) => (
                  <span key={idx}>
                    {idx > 0 ? ' tai ' : null}
                    <AbilityName name={ab.trim()} />
                  </span>
                ));
              } else {
                valueContent = <AbilityName name={st.value.trim()} />;
              }
            }

            return (
              <div key={i} className={itemClasses}>
                <span className="eevenkoto-equipment-block__stat-label">{st.label}</span>
                <strong className="eevenkoto-equipment-block__stat-value">{valueContent}</strong>
                {st.subValue ? (
                  <span className="eevenkoto-equipment-block__stat-subvalue">{st.subValue}</span>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}

      {kesto ? (
        <div className="eevenkoto-equipment-block__kesto">
          <span className="eevenkoto-equipment-block__kesto-title">
            {kesto.title || 'Vahingon kesto'}
          </span>
          <div className="eevenkoto-equipment-block__kesto-tags">
            <span className="eevenkoto-equipment-block__kesto-tag">
              {kesto.labels?.base || 'Perus'}: <strong>{kesto.base}</strong>
            </span>
            {kesto.bludgeoning !== undefined ? (
              <span className="eevenkoto-equipment-block__kesto-tag">
                {kesto.labels?.bludgeoning || 'Murskaus'}: <strong>{kesto.bludgeoning}</strong>
              </span>
            ) : null}
            {kesto.slashing !== undefined ? (
              <span className="eevenkoto-equipment-block__kesto-tag">
                {kesto.labels?.slashing || 'Viilto'}: <strong>{kesto.slashing}</strong>
              </span>
            ) : null}
            {kesto.piercing !== undefined ? (
              <span className="eevenkoto-equipment-block__kesto-tag">
                {kesto.labels?.piercing || 'Pisto'}: <strong>{kesto.piercing}</strong>
              </span>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="eevenkoto-equipment-block__section">
        <h4 className="eevenkoto-equipment-block__section-title">{traitsTitle}</h4>
        <div className="eevenkoto-equipment-block__traits">
          {traits?.length ? (
            traits.map((tr) => (
              <span key={tr} className={chipClassNames()}>
                {tr}
              </span>
            ))
          ) : (
            <span className="eevenkoto-equipment-block__empty-traits">{emptyTraitsText}</span>
          )}
        </div>
      </div>

      {notes?.length ? (
        <div className="eevenkoto-equipment-block__section">
          <h4 className="eevenkoto-equipment-block__section-title">{notesTitle}</h4>
          <ul className="eevenkoto-list eevenkoto-equipment-block__notes">
            {notes.map((note, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: note }} />
            ))}
          </ul>
        </div>
      ) : null}

      {warnings?.length ? (
        <div className="eevenkoto-equipment-block__notice">
          <div className={noticeClassNames({ intent: 'caution' })} role="alert">
            {warnings.map((w, idx) => (
              <div key={idx}>{w}</div>
            ))}
          </div>
        </div>
      ) : null}

      {showCopyButton ? (
        <div className="eevenkoto-equipment-block__footer">
          <button
            type="button"
            className={`${buttonClassNames({ variant: 'primary', size: 'md' })} eevenkoto-equipment-block__copy-btn`}
            onClick={handleCopy}
          >
            {copyLabel}
          </button>
        </div>
      ) : null}
    </article>
  );
};
