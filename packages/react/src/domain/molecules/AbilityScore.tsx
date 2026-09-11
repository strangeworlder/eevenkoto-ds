import { abilityScoreClassNames, type AbilityScoreProps } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement } from 'react';
import { useId } from 'react';
import { Stat } from '../../core/atoms/Stat';

export type { AbilityScoreProps };

export type AbilityScoreComponentProps = Omit<HTMLAttributes<HTMLElement>, 'children'> &
  AbilityScoreProps;

const StatSlot = ({
  role,
  label,
  value,
  shape,
  size,
  emphasis,
}: {
  role: 'score' | 'modifier' | 'save';
  label: string;
  value: string;
  shape: 'disk' | 'arch' | 'shield';
  size: 'sm' | 'lg';
  emphasis?: boolean;
}): ReactElement => (
  <div className={`eevenkoto-ability-score__stat eevenkoto-ability-score__stat--${role}`}>
    <dt className="eevenkoto-ability-score__stat-label">{label}</dt>
    <dd className="eevenkoto-ability-score__stat-value">
      <Stat value={value} shape={shape} size={size} emphasis={emphasis} />
    </dd>
  </div>
);

export const AbilityScore = ({
  label,
  labelId: labelIdProp,
  score,
  modifier,
  save,
  scoreLabel = 'Score',
  modifierLabel = 'Modifier',
  saveLabel = 'Save',
  saveProficient = false,
  proficientLabel = 'proficient',
  className,
  ...rest
}: AbilityScoreComponentProps): ReactElement => {
  const reactId = useId();
  const labelId = labelIdProp ?? `eevenkoto-ability-label${reactId}`;
  const classes = [abilityScoreClassNames({ saveProficient }), className].filter(Boolean).join(' ');
  const saveTerm = saveProficient ? `${saveLabel} (${proficientLabel})` : saveLabel;
  return (
    <figure className={classes} {...rest}>
      <figcaption id={labelId} className="eevenkoto-ability-score__label">
        {label}
      </figcaption>
      <dl className="eevenkoto-ability-score__stats" aria-labelledby={labelId}>
        <StatSlot role="modifier" label={modifierLabel} value={modifier} shape="arch" size="lg" />
        <StatSlot role="score" label={scoreLabel} value={score} shape="disk" size="sm" />
        <StatSlot
          role="save"
          label={saveTerm}
          value={save}
          shape="shield"
          size="sm"
          emphasis={saveProficient}
        />
      </dl>
    </figure>
  );
};
