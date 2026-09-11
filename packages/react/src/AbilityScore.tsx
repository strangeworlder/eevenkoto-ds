import { abilityScoreClassNames, type AbilityScoreProps } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement } from 'react';
import { Stat } from './Stat';

export type { AbilityScoreProps };

export type AbilityScoreComponentProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  AbilityScoreProps;

const StatSlot = ({
  role,
  term,
  value,
  shape,
  size,
  emphasis,
}: {
  role: 'score' | 'modifier' | 'save';
  term: string;
  value: string;
  shape: 'disk' | 'arch' | 'shield';
  size: 'sm' | 'lg';
  emphasis?: boolean;
}): ReactElement => (
  <div className={`eevenkoto-ability-score__stat eevenkoto-ability-score__stat--${role}`}>
    <dt className="eevenkoto-ability-score__stat-label">{term}</dt>
    <dd className="eevenkoto-ability-score__stat-value">
      <Stat value={value} shape={shape} size={size} emphasis={emphasis} />
    </dd>
  </div>
);

export const AbilityScore = ({
  label,
  score,
  modifier,
  save,
  scoreLabel = 'Score',
  modifierLabel = 'Modifier',
  saveLabel = 'Save',
  saveProficient = false,
  className,
  ...rest
}: AbilityScoreComponentProps): ReactElement => {
  const classes = [abilityScoreClassNames({ saveProficient }), className].filter(Boolean).join(' ');
  const saveTerm = saveProficient ? `${saveLabel} (proficient)` : saveLabel;
  return (
    <div className={classes} {...rest}>
      <div className="eevenkoto-ability-score__label">{label}</div>
      <dl className="eevenkoto-ability-score__stats">
        <StatSlot role="modifier" term={modifierLabel} value={modifier} shape="arch" size="lg" />
        <StatSlot role="score" term={scoreLabel} value={score} shape="disk" size="sm" />
        <StatSlot
          role="save"
          term={saveTerm}
          value={save}
          shape="shield"
          size="sm"
          emphasis={saveProficient}
        />
      </dl>
    </div>
  );
};
