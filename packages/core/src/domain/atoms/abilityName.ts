/**
 * AbilityName domain atom props and helpers.
 * Represents a single RPG ability name with responsive full/short display.
 */

export interface AbilityNameProps {
  /** Ability name, e.g. "Voimakkuus" or "Ketteryys". */
  name?: string;
  /** Text content / label fallback (e.g. children in React/Vue). */
  children?: string;
  /** Custom abbreviation override. Default: first 3 letters uppercase (e.g. "VOI"). */
  short?: string;
  /** Forced display variant: 'auto' (responsive), 'full', or 'short'. Default: 'auto'. */
  variant?: 'auto' | 'full' | 'short';
}

/**
 * Returns the 3-letter ALLCAPS abbreviation for an ability name.
 * e.g. "Voimakkuus" -> "VOI", "Ketteryys" -> "KET".
 */
export const abbreviateAbility = (name: string): string => {
  return name.trim().slice(0, 3).toUpperCase();
};

export interface AbilityNameClassNameProps {
  variant?: 'auto' | 'full' | 'short';
}

export const abilityNameClassNames = (props: AbilityNameClassNameProps = {}): string => {
  const classes = ['eevenkoto-ability-name'];
  if (props.variant === 'short') {
    classes.push('eevenkoto-ability-name--short');
  } else if (props.variant === 'full') {
    classes.push('eevenkoto-ability-name--full');
  }
  return classes.join(' ');
};
