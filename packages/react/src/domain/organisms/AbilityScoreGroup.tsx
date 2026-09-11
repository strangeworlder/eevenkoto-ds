import { abilityScoreGroupClassNames, type AbilityScoreProps } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { AbilityScore } from '../molecules/AbilityScore';

export type AbilityScoreGroupComponentProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  abilities: AbilityScoreProps[];
  header?: ReactNode;
  footer?: ReactNode;
};

export const AbilityScoreGroup = ({
  abilities,
  header,
  footer,
  className,
  ...rest
}: AbilityScoreGroupComponentProps): ReactElement => {
  const classes = [abilityScoreGroupClassNames(), className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      {header ? <div className="eevenkoto-ability-score-group__header">{header}</div> : null}
      <div className="eevenkoto-ability-score-group__grid">
        {abilities.map((ability) => (
          <AbilityScore key={ability.label} {...ability} />
        ))}
      </div>
      {footer ? <div className="eevenkoto-ability-score-group__footer">{footer}</div> : null}
    </div>
  );
};
