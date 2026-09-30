import type { EquipmentBlockProps, EquipmentStatItem } from './equipmentBlock';

export type WeaponClass = 'improvisoitu' | 'yksinkertainen' | 'sota_ase';
export type WeaponType = 'lahitaistelu' | 'kantama';
export type WeaponMainTrait =
  | 'tarkkuus'
  | 'ulottuva'
  | 'viiltava'
  | 'pistava'
  | 'murskaava'
  | 'raskas'
  | 'monikayttoinen';
export type WeaponAddTrait = 'none' | 'kevyt' | 'kompelo' | 'perinteinen';
export type WeaponAetherTrait =
  | 'none'
  | 'tyonto'
  | 'tuhoisa'
  | 'hidastava'
  | 'kehittynyt'
  | 'maaginen';

export interface WeaponSpec {
  name: string;
  weaponClass: WeaponClass;
  weaponType: WeaponType;
  mainTraits: WeaponMainTrait[];
  addTrait: WeaponAddTrait;
  aetherTrait: WeaponAetherTrait;
}

export type ArmorType = 'vaatetus' | 'kevyt' | 'keskiraskas' | 'raskas';
export type ArmorSpecialTrait =
  | 'liikkuva'
  | 'vaimennettu'
  | 'sirpalesuoja'
  | 'tiivis'
  | 'tukiranka';
export type ShieldType = 'none' | 'perinteinen' | 'moderni';

export interface ArmorGeneralTraits {
  iskunvaimennus: number;
  leikkauskestavyys: number;
  pistosuojaus: number;
  vahvistettu: number;
}

export interface ArmorSpec {
  name: string;
  armorType: ArmorType;
  generalTraits: ArmorGeneralTraits;
  specialTraits: ArmorSpecialTrait[];
  shield: ShieldType;
}

export interface PriceDetail {
  amount: number;
  unit: string;
  text: string;
}

export interface WeaponCalculationResult {
  name: string;
  weaponClass: WeaponClass;
  weaponType: WeaponType;
  baseDamage: string;
  finalDamage: string;
  damageType: string;
  critInfo: string;
  ability: string;
  reach: string;
  range: string;
  hands: string;
  traits: string[];
  notes: string[];
  price: PriceDetail;
  maxMainTraits: number;
  usedMainTraits: number;
  isBudgetValid: boolean;
  validationErrors: string[];
}

export interface ArmorCalculationResult {
  name: string;
  armorType: ArmorType;
  defenseFormula: string;
  baseDefense: number;
  totalDefense: string;
  kestoBase: number;
  kestoMurskaus: number;
  kestoViilto: number;
  kestoPisto: number;
  speedPenalty: string;
  stealthPenalty: boolean;
  swimmingPenalty: boolean;
  climbingPenalty: boolean;
  specialBenefits: string[];
  shieldInfo?: { type: ShieldType; defenseBonus: number; price: number };
  traits: string[];
  price: PriceDetail;
  maxTraits: number;
  usedTraits: number;
  isBudgetValid: boolean;
  validationErrors: string[];
  traditionalWeakness?: string;
}

export const DICE_LADDER = ['1n3', '1n4', '1n6', '1n8', '1n10', '1n12'] as const;

export const stepDice = (dice: string, delta: number): string => {
  const index = DICE_LADDER.indexOf(dice as (typeof DICE_LADDER)[number]);
  if (index === -1) return dice;
  const newIndex = Math.max(0, Math.min(DICE_LADDER.length - 1, index + delta));
  return DICE_LADDER[newIndex];
};

const formatPrice = (amount: number, unit: string): PriceDetail => {
  const unitNames: Record<string, string> = {
    kup: 'kuparia',
    hr: 'hopearahaa',
    kr: 'kultarahaa',
    pt: 'platinaa',
  };
  return {
    amount,
    unit,
    text: `${amount} ${unit} (${amount} ${unitNames[unit] || unit})`,
  };
};

export const calculateWeapon = (spec: WeaponSpec): WeaponCalculationResult => {
  const errors: string[] = [];
  const notes: string[] = [];
  const traits: string[] = [];

  let maxMain = 0;
  if (spec.weaponClass === 'improvisoitu') maxMain = 0;
  else if (spec.weaponClass === 'yksinkertainen') maxMain = 1;
  else if (spec.weaponClass === 'sota_ase') maxMain = 2;

  if (spec.aetherTrait !== 'none') maxMain += 1;

  const isRanged = spec.weaponType === 'kantama';
  let usedMain = spec.mainTraits.length;
  if (isRanged) usedMain += 1;

  if (usedMain > maxMain) {
    errors.push(`Pääpiirteiden enimmäismäärä ylittyy: valittu ${usedMain}, sallittu ${maxMain}.`);
  }

  const has = (trait: WeaponMainTrait) => spec.mainTraits.includes(trait);
  const heavy = has('raskas');
  const versatile = has('monikayttoinen');
  const finesse = has('tarkkuus');
  const reach = has('ulottuva');
  const slashing = has('viiltava');
  const piercing = has('pistava');
  const bludgeoning = has('murskaava');

  const light = spec.addTrait === 'kevyt';
  const clumsy = spec.addTrait === 'kompelo';
  const traditional = spec.addTrait === 'perinteinen';

  if (isRanged && slashing) {
    errors.push('Kantama-ase ei voi olla viiltävä.');
  }

  const damageTypeCount = (slashing ? 1 : 0) + (piercing ? 1 : 0) + (bludgeoning ? 1 : 0);
  if (damageTypeCount > 1) {
    errors.push(
      'Aseella voi olla enintään yksi vahinkotyyppipiirre (viiltävä, pistävä tai murskaava).',
    );
  }

  if (heavy) {
    if (spec.weaponClass !== 'sota_ase') errors.push('Raskas-piirteen voi valita vain sota-aseisiin.');
    if (light) errors.push('Raskas- ja Kevyt-piirteitä ei voi yhdistää.');
    if (versatile) errors.push('Raskas- ja Monikäyttöinen-piirteitä ei voi yhdistää.');
    if (clumsy) errors.push('Raskas- ja Kömpelö-piirteitä ei voi yhdistää.');
    if (finesse) errors.push('Raskas- ja Tarkkuus-piirteitä ei voi yhdistää.');
  }

  if (versatile) {
    if (spec.weaponClass !== 'sota_ase') errors.push('Monikäyttöinen-piirteen voi valita vain sota-aseisiin.');
    if (bludgeoning) errors.push('Monikäyttöinen- ja Murskaava-piirteitä ei voi yhdistää.');
    if (light) errors.push('Monikäyttöinen- ja Kevyt-piirteitä ei voi yhdistää.');
  }

  if (clumsy) {
    if (spec.weaponClass === 'sota_ase') {
      errors.push('Kömpelö-piirre on sallittu vain improvisoiduille ja yksinkertaisille aseille.');
    }
    if (finesse) errors.push('Kömpelö- ja Tarkkuus-piirteitä ei voi yhdistää.');
  }

  if (traditional && !isRanged) {
    errors.push('Perinteinen-piirre on sallittu vain kantama-aseille.');
  }

  const baseDie = spec.weaponClass === 'improvisoitu' ? '1n4' : '1n6';
  let curDie = baseDie;

  if (heavy) {
    curDie = bludgeoning ? '1n10' : stepDice(curDie, 2);
  }
  if (slashing) curDie = stepDice(curDie, 1);
  if (light) curDie = stepDice(curDie, -1);
  if (clumsy) curDie = stepDice(curDie, 1);
  if (spec.aetherTrait === 'kehittynyt') curDie = stepDice(curDie, 1);

  let finalDamage = '';
  let damageType = 'iskuvahinko';
  if (traditional) damageType = 'iskuvahinko';
  else if (slashing) damageType = 'viiltovahinko';
  else if (piercing) damageType = 'pistovahinko';
  else if (bludgeoning) damageType = 'murskausvahinko';

  if (bludgeoning) {
    finalDamage = `2${stepDice(curDie, -1).replace('1n', 'n')}`;
  } else if (versatile) {
    const twoHandDie = stepDice(curDie, 1);
    finalDamage = `${curDie}/${twoHandDie}`;
  } else {
    finalDamage = curDie;
  }

  let critInfo = 'Normaali: aseen vahinkonoppa heitetään maksimivahingon päälle vain kerran.';
  if (piercing) {
    critInfo = heavy
      ? '+10 pistettä lisävahinkoa kriittisessä osumassa (kahden käden ase).'
      : '+5 pistettä lisävahinkoa kriittisessä osumassa.';
  } else if (bludgeoning) {
    const dVal = curDie === '1n6' ? 4 : curDie === '1n4' ? 3 : curDie === '1n8' ? 6 : 8;
    critInfo = `Kriittisessä osumassa maksimi (${dVal * 2}) + 1n${dVal} vahinkoa.`;
  }

  let ability = '';
  if (isRanged) {
    ability = finesse ? 'Ketteryys tai Viisaus' : 'Ketteryys';
  } else {
    ability = finesse ? 'Voimakkuus tai Ketteryys' : 'Voimakkuus';
  }

  let reachText = isRanged ? '—' : '2 m';
  let rangeText = '—';
  if (!isRanged) {
    if (reach) reachText = '4 m';
    if (heavy || clumsy) rangeText = 'Ei heitettävä';
    else if (light) rangeText = reach ? '12/32 m (heitto)' : '6/16 m (heitto)';
    else rangeText = reach ? '8/20 m (heitto)' : '4/10 m (heitto)';
  } else {
    reachText = '—';
    let norm = 20;
    let long = 60;
    if (clumsy) {
      norm = 10;
      long = 30;
    } else {
      if (reach) {
        norm *= 2;
        long *= 2;
      }
      if (traditional) {
        norm *= 2;
        long *= 2;
      }
    }
    rangeText = `${norm}/${long} m`;
  }

  let hands = '1 käsi';
  if (heavy || clumsy) hands = '2 kättä';
  else if (versatile) hands = '1 tai 2 kättä (monikäyttöinen)';
  else if (isRanged) hands = light ? '1 käsi' : '2 kättä';

  if (isRanged) traits.push('Kantama');
  if (finesse) traits.push('Tarkkuus');
  if (reach) traits.push('Ulottuva');
  if (slashing) traits.push('Viiltävä');
  if (piercing) traits.push('Pistävä');
  if (bludgeoning) traits.push('Murskaava');
  if (heavy) traits.push('Raskas');
  if (versatile) traits.push('Monikäyttöinen');
  if (light) traits.push('Kevyt');
  if (clumsy) traits.push('Kömpelö');
  if (traditional) traits.push('Perinteinen');

  if (spec.aetherTrait !== 'none') {
    const aetherLabels: Record<string, string> = {
      tyonto: 'Eetteripiirre: Työntö',
      tuhoisa: 'Eetteripiirre: Tuhoisa',
      hidastava: 'Eetteripiirre: Hidastava',
      kehittynyt: 'Eetteripiirre: Kehittynyt',
      maaginen: 'Eetteripiirre: Maaginen',
    };
    traits.push(aetherLabels[spec.aetherTrait] || '');

    if (spec.aetherTrait === 'tyonto') {
      notes.push('Kohdetta vahingoittava isku työntää tätä 4 m taaksepäin. Vaihtoehtoinen vahinkotyyppi: voimavahinko.');
    } else if (spec.aetherTrait === 'tuhoisa') {
      notes.push('Ohimenevä isku tekee 2 pistettä vauriota kohteeseen. Vaihtoehtoinen vahinkotyyppi: ukkosvahinko.');
    } else if (spec.aetherTrait === 'hidastava') {
      notes.push('Kohdetta vahingoittava isku vähentää kohteen nopeutta 4 m seuraavan vuorosi alkuun. Vaihtoehtoinen vahinkotyyppi: kylmävahinko.');
    } else if (spec.aetherTrait === 'kehittynyt') {
      notes.push('Aseella vaihtoehtoinen vahinkotyyppi: tulivahinko.');
    } else if (spec.aetherTrait === 'maaginen') {
      notes.push('Lasketaan maagiseksi aseeksi. Hohkaa hämärää valoa 6 m säteelle.');
    }
  }

  if (light) {
    notes.push('Kerran kierroksessa: jos osut kevyellä aseella, voit hahmotoiminnolla tehdä ylimääräisen hyökkäyksen toisella kevyellä aseella (ilman ominaisuuslisää vahinkoon).');
  }
  if (clumsy) {
    notes.push('Heität aloitteen 1n12-nopalla. Aseen esiinotto tai poislaittaminen vie toiminnon.');
  }
  if (traditional) {
    notes.push('Aseen lataaminen vaatii hahmotoiminnon tai olet liikkumatta vuorollasi. Tekee aina vain iskuvahinkoa.');
  }

  let basePrice = 10;
  let priceUnit = 'kr';
  if (spec.weaponClass === 'improvisoitu') {
    priceUnit = 'kup';
    basePrice = 10;
  } else if (spec.weaponClass === 'yksinkertainen') {
    priceUnit = 'hr';
    basePrice = 10;
  }

  let finalPrice = basePrice;
  if (isRanged) finalPrice = Math.round(basePrice * 2.5);

  if (spec.weaponClass === 'improvisoitu') {
    // base
  } else if (spec.weaponClass === 'yksinkertainen') {
    let extra = 0;
    if (slashing || piercing || bludgeoning || reach || finesse) extra += 10;
    finalPrice = (isRanged ? Math.round(basePrice * 2.5) : basePrice) + extra;
  } else {
    // sota_ase
    if (!isRanged) {
      if (heavy) finalPrice = spec.mainTraits.filter((t) => t !== 'raskas').length > 0 ? 35 : 25;
      else if (versatile) finalPrice = 25;
      else if (light) finalPrice = 5 + spec.mainTraits.length * 5;
      else if (clumsy) finalPrice = 8;
      else finalPrice = 10 + spec.mainTraits.length * 5;
    }
  }

  if (spec.weaponClass !== 'sota_ase' || isRanged) {
    if (light) finalPrice = Math.round(finalPrice * 0.5);
    else if (clumsy || traditional) finalPrice = Math.round(finalPrice * 0.75);
  }

  if (spec.weaponClass === 'sota_ase' && isRanged) {
    let p = 10;
    if (slashing) p += 5;
    if (piercing) p += 5;
    if (bludgeoning) p += 5;
    if (reach) p += 10;
    if (finesse) p += 5;
    if (heavy) p += 25;
    if (light) p = Math.round(p * 0.5);
    else if (traditional) p = Math.round(p * 0.8);
    finalPrice = p;
  }

  if (spec.aetherTrait !== 'none') {
    priceUnit = 'pt';
    let ap = 20;
    if (spec.aetherTrait === 'kehittynyt') ap = 30;
    if (spec.aetherTrait === 'maaginen') ap = 10;
    finalPrice = ap;
  }

  return {
    name: spec.name || 'Kustomoitu ase',
    weaponClass: spec.weaponClass,
    weaponType: spec.weaponType,
    baseDamage: `${baseDie} iskuvahinko`,
    finalDamage: `${finalDamage} ${damageType}`,
    damageType,
    critInfo,
    ability,
    reach: reachText,
    range: rangeText,
    hands,
    traits,
    notes,
    price: formatPrice(finalPrice, priceUnit),
    maxMainTraits: maxMain,
    usedMainTraits: usedMain,
    isBudgetValid: errors.length === 0,
    validationErrors: errors,
  };
};

export const calculateArmor = (spec: ArmorSpec): ArmorCalculationResult => {
  const errors: string[] = [];
  const benefits: string[] = [];
  const traits: string[] = [];

  let maxTraits = 1;
  let formula = '10 + KET';
  let baseDef = 10;
  let baseKesto = 0;
  let speedPenalty = 'Ei nopeussakkoa';
  let stealthPenalty = false;
  let swimmingPenalty = false;
  let climbingPenalty = false;
  let basePrice = 1;

  if (spec.armorType === 'vaatetus') {
    maxTraits = 1;
    formula = '10 + KET';
    baseDef = 10;
    baseKesto = 0;
    basePrice = 1;
  } else if (spec.armorType === 'kevyt') {
    maxTraits = 1;
    formula = '11 + KET';
    baseDef = 11;
    baseKesto = 1;
    basePrice = 2;
  } else if (spec.armorType === 'keskiraskas') {
    maxTraits = 2;
    formula = '13 + KET (maks. +2)';
    baseDef = 13;
    baseKesto = 2;
    speedPenalty = '−2 m nopeus';
    stealthPenalty = true;
    basePrice = 20;
  } else if (spec.armorType === 'raskas') {
    maxTraits = 4;
    formula = '15';
    baseDef = 15;
    baseKesto = 3;
    speedPenalty = '−4 m nopeus';
    stealthPenalty = true;
    swimmingPenalty = true;
    climbingPenalty = true;
    basePrice = 200;
  }

  const gen = spec.generalTraits;
  const generalSum =
    (gen.iskunvaimennus || 0) +
    (gen.leikkauskestavyys || 0) +
    (gen.pistosuojaus || 0) +
    (gen.vahvistettu || 0);
  const specCount = spec.specialTraits.length;
  const usedTraits = generalSum + specCount;

  if (usedTraits > maxTraits) {
    errors.push(`Piirteiden enimmäismäärä ylittyy: valittu ${usedTraits}, sallittu ${maxTraits}.`);
  }

  if (specCount > 0 && spec.armorType !== 'keskiraskas' && spec.armorType !== 'raskas') {
    errors.push('Erikoispiirteitä voi valita vain keskiraskaille ja raskaille haarniskoille.');
  }

  const reinforced = gen.vahvistettu || 0;
  const kestoBludgeon = baseKesto + (gen.iskunvaimennus || 0);
  const kestoSlash = baseKesto + (gen.leikkauskestavyys || 0);
  const kestoPierce = baseKesto + (gen.pistosuojaus || 0);

  if (gen.iskunvaimennus > 0) traits.push(`Iskunvaimennus (${gen.iskunvaimennus}x)`);
  if (gen.leikkauskestavyys > 0) traits.push(`Leikkauskestävyys (${gen.leikkauskestavyys}x)`);
  if (gen.pistosuojaus > 0) traits.push(`Pistosuojaus (${gen.pistosuojaus}x)`);
  if (gen.vahvistettu > 0) traits.push(`Vahvistettu (+${gen.vahvistettu} PL)`);

  const hasSpec = (t: ArmorSpecialTrait) => spec.specialTraits.includes(t);

  if (hasSpec('liikkuva')) {
    traits.push('Liikkuva');
    climbingPenalty = false;
    if (spec.armorType === 'keskiraskas') speedPenalty = 'Ei nopeussakkoa (Liikkuva)';
    else if (spec.armorType === 'raskas') speedPenalty = '−2 m nopeus (Liikkuva)';
    benefits.push('Panssari rajoittaa nopeutta 2 m vähemmän eikä aiheuta haittaa kiipeämiseen.');
  }
  if (hasSpec('vaimennettu')) {
    traits.push('Vaimennettu');
    stealthPenalty = false;
    benefits.push('Panssari ei aiheuta haittaa hiipimiseen.');
  }
  if (hasSpec('sirpalesuoja')) {
    traits.push('Sirpalesuoja');
    benefits.push('+2 puolustukseen kantamahyökkäyksiä vastaan ja etu ketteryyspelastusheittoihin.');
  }
  if (hasSpec('tiivis')) {
    traits.push('Tiivis');
    benefits.push('Etu kaikkiin sitkeyspelastusheittoihin.');
  }
  if (hasSpec('tukiranka')) {
    traits.push('Tukiranka');
    benefits.push('Etu kaikkiin voimakkuuspelastusheittoihin ja vastustettuihin voimakkuusheittoihin.');
  }

  let shieldBonus = 0;
  let shieldCost = 0;
  if (spec.shield === 'perinteinen') {
    shieldBonus = 1;
    shieldCost = 5;
    traits.push('Perinteinen kilpi (+1 PL)');
  } else if (spec.shield === 'moderni') {
    shieldBonus = 2;
    shieldCost = 50;
    traits.push('Moderni kilpi (+2 PL)');
  }

  const finalACVal = baseDef + reinforced + shieldBonus;
  let totalDefense = '';
  if (spec.armorType === 'vaatetus' || spec.armorType === 'kevyt') {
    totalDefense = `${finalACVal} + KET`;
  } else if (spec.armorType === 'keskiraskas') {
    totalDefense = `${finalACVal} + KET (maks. +2)`;
  } else {
    totalDefense = `${finalACVal}`;
  }

  let priceFactor = 0;
  priceFactor += (gen.iskunvaimennus || 0) * 1;
  priceFactor += (gen.leikkauskestavyys || 0) * 1;
  priceFactor += (gen.pistosuojaus || 0) * 1;
  priceFactor += (gen.vahvistettu || 0) * 0.5;
  if (hasSpec('liikkuva')) priceFactor += 1;
  if (hasSpec('vaimennettu')) priceFactor += 1;
  if (hasSpec('sirpalesuoja')) priceFactor += 1.5;
  if (hasSpec('tiivis')) priceFactor += 1.5;
  if (hasSpec('tukiranka')) priceFactor += 1.5;

  const finalPrice = Math.round(basePrice * (1 + priceFactor)) + shieldCost;

  let traditionalWeakness: string | undefined;
  if (spec.armorType === 'kevyt') traditionalWeakness = '−1 PL moderneja sota-aseita vastaan';
  else if (spec.armorType === 'keskiraskas') traditionalWeakness = '−2 PL moderneja sota-aseita vastaan';
  else if (spec.armorType === 'raskas') traditionalWeakness = '−3 PL moderneja sota-aseita vastaan';

  return {
    name: spec.name || 'Räätälöity panssari',
    armorType: spec.armorType,
    defenseFormula: formula,
    baseDefense: baseDef,
    totalDefense,
    kestoBase: baseKesto,
    kestoMurskaus: kestoBludgeon,
    kestoViilto: kestoSlash,
    kestoPisto: kestoPierce,
    speedPenalty,
    stealthPenalty,
    swimmingPenalty,
    climbingPenalty,
    specialBenefits: benefits,
    shieldInfo: spec.shield !== 'none' ? { type: spec.shield, defenseBonus: shieldBonus, price: shieldCost } : undefined,
    traits,
    price: formatPrice(finalPrice, 'kr'),
    maxTraits,
    usedTraits,
    isBudgetValid: errors.length === 0,
    validationErrors: errors,
    traditionalWeakness,
  };
};

export const weaponToEquipmentBlockProps = (
  res: WeaponCalculationResult,
  showCopy = true,
): EquipmentBlockProps => {
  const classLabels: Record<string, string> = {
    improvisoitu: 'Improvisoitu ase',
    yksinkertainen: 'Yksinkertainen ase',
    sota_ase: 'Sota-ase',
  };
  const typeLabels: Record<string, string> = {
    lahitaistelu: 'Lähitaistelu',
    kantama: 'Kantama-ase',
  };

  const stats: EquipmentStatItem[] = [
    { label: 'Vahinko', value: res.finalDamage },
    { label: 'Ominaisuus', value: res.ability },
    res.weaponType === 'kantama'
      ? { label: 'Kantama', value: res.range }
      : { label: 'Ulottuvuus & heitto', value: `${res.reach} (${res.range})` },
    { label: 'Käyttö', value: res.hands },
  ];

  const notes = [...res.notes, `Kriittinen osuma: ${res.critInfo}`];

  return {
    name: res.name,
    category: `${classLabels[res.weaponClass] || res.weaponClass} · ${typeLabels[res.weaponType] || res.weaponType}`,
    price: `${res.price.amount} ${res.price.unit}`,
    stats,
    traits: res.traits,
    emptyTraitsText: 'Ei piirteitä',
    traitsTitle: 'Valitut piirteet',
    notesTitle: 'Säännöt & vaikutukset',
    notes,
    warnings: res.validationErrors.length > 0 ? res.validationErrors : undefined,
    copyText: exportWeaponToMarkdown(res),
    showCopyButton: showCopy,
  };
};

export const armorToEquipmentBlockProps = (
  res: ArmorCalculationResult,
  showCopy = true,
): EquipmentBlockProps => {
  const typeLabels: Record<string, string> = {
    vaatetus: 'Vaatetus',
    kevyt: 'Kevyt panssari',
    keskiraskas: 'Keskiraskas panssari',
    raskas: 'Raskas panssari',
  };

  const stats: EquipmentStatItem[] = [
    { label: 'Puolustus (PL)', value: res.totalDefense },
    { label: 'Nopeusvaikutus', value: res.speedPenalty },
    { label: 'Hiipiminen', value: res.stealthPenalty ? 'Haitta' : 'Normaali' },
    {
      label: 'Kilpi',
      value: res.shieldInfo
        ? `${res.shieldInfo.type === 'perinteinen' ? 'Perinteinen' : 'Moderni'} (+${res.shieldInfo.defenseBonus} PL)`
        : 'Ei kilpeä',
    },
  ];

  const notes = [...res.specialBenefits];
  if (res.traditionalWeakness) {
    notes.push(`Perinteisen version heikkous: ${res.traditionalWeakness}`);
  }
  if (res.climbingPenalty) notes.push('Haitta kiipeämiseen.');
  if (res.swimmingPenalty) notes.push('Haitta uimiseen.');
  if (notes.length === 0) {
    notes.push('Panssari toimii perussääntöjen mukaan ilman lisäominaisuuksia.');
  }

  return {
    name: res.name,
    category: typeLabels[res.armorType] || res.armorType,
    price: `${res.price.amount} ${res.price.unit}`,
    stats,
    kesto: {
      base: res.kestoBase,
      bludgeoning: res.kestoMurskaus,
      slashing: res.kestoViilto,
      piercing: res.kestoPisto,
    },
    traits: res.traits,
    emptyTraitsText: 'Ei piirteitä',
    traitsTitle: 'Valitut piirteet',
    notesTitle: 'Säännöt & vaikutukset',
    notes,
    warnings: res.validationErrors.length > 0 ? res.validationErrors : undefined,
    copyText: exportArmorToMarkdown(res),
    showCopyButton: showCopy,
  };
};

export const exportWeaponToMarkdown = (res: WeaponCalculationResult): string => {
  const classLabels: Record<string, string> = {
    improvisoitu: 'Improvisoitu ase',
    yksinkertainen: 'Yksinkertainen ase',
    sota_ase: 'Sota-ase',
  };
  const typeLabels: Record<string, string> = {
    lahitaistelu: 'lähitaistelu',
    kantama: 'kantama',
  };

  const lines = [
    `**${res.name}** (${classLabels[res.weaponClass]}, ${typeLabels[res.weaponType]})`,
    `• Vahinko: ${res.finalDamage}`,
    `• Ominaisuus: ${res.ability}`,
    `• Käyttö: ${res.hands}`,
  ];
  if (res.weaponType === 'kantama') {
    lines.push(`• Kantama: ${res.range}`);
  } else {
    lines.push(`• Ulottuvuus: ${res.reach} (heitto: ${res.range})`);
  }
  if (res.traits.length > 0) lines.push(`• Piirteet: ${res.traits.join(', ')}`);
  lines.push(`• Hinta: ${res.price.text}`);
  lines.push(`• Kriittinen osuma: ${res.critInfo}`);
  if (res.notes.length > 0) lines.push(`• Erikoisvaikutukset: ${res.notes.join(' ')}`);

  return lines.join('\n');
};

export const exportArmorToMarkdown = (res: ArmorCalculationResult): string => {
  const typeLabels: Record<string, string> = {
    vaatetus: 'Vaatetus',
    kevyt: 'Kevyt panssari',
    keskiraskas: 'Keskiraskas panssari',
    raskas: 'Raskas panssari',
  };

  const lines = [
    `**${res.name}** (${typeLabels[res.armorType]})`,
    `• Puolustus (PL): ${res.totalDefense}`,
    `• Kesto: perus ${res.kestoBase} (viilto ${res.kestoViilto}, pisto ${res.kestoPisto}, murskaus ${res.kestoMurskaus})`,
  ];

  const penalties: string[] = [];
  if (res.speedPenalty !== 'Ei nopeussakkoa') penalties.push(res.speedPenalty);
  if (res.stealthPenalty) penalties.push('haitta hiipimiseen');
  if (res.climbingPenalty) penalties.push('haitta kiipeämiseen');
  if (res.swimmingPenalty) penalties.push('haitta uimiseen');

  if (penalties.length > 0) {
    lines.push(`• Rajoitukset: ${penalties.join(', ')}`);
  } else {
    lines.push('• Rajoitukset: ei rajoituksia');
  }

  if (res.specialBenefits.length > 0) lines.push(`• Erikoisominaisuudet: ${res.specialBenefits.join(' ')}`);
  if (res.shieldInfo) {
    lines.push(
      `• Kilpi: ${res.shieldInfo.type === 'perinteinen' ? 'Perinteinen kilpi (+1 PL)' : 'Moderni kilpi (+2 PL)'}`,
    );
  }
  if (res.traits.length > 0) lines.push(`• Piirteet: ${res.traits.join(', ')}`);
  lines.push(`• Kokonaishinta: ${res.price.text}`);

  return lines.join('\n');
};

export interface EquipmentPreset<T> {
  id: string;
  label: string;
  spec: T;
}

export const WEAPON_PRESETS: EquipmentPreset<WeaponSpec>[] = [
  {
    id: 'veitsi',
    label: 'Veitsi (Yksinkertainen, viiltävä, kevyt)',
    spec: {
      name: 'Veitsi',
      weaponClass: 'yksinkertainen',
      weaponType: 'lahitaistelu',
      mainTraits: ['viiltava'],
      addTrait: 'kevyt',
      aetherTrait: 'none',
    },
  },
  {
    id: 'tikari',
    label: 'Tikari (Yksinkertainen, pistävä, kevyt)',
    spec: {
      name: 'Tikari',
      weaponClass: 'yksinkertainen',
      weaponType: 'lahitaistelu',
      mainTraits: ['pistava'],
      addTrait: 'kevyt',
      aetherTrait: 'none',
    },
  },
  {
    id: 'floretti_yksinkertainen',
    label: 'Floretti (Yksinkertainen, tarkkuus, kevyt)',
    spec: {
      name: 'Floretti',
      weaponClass: 'yksinkertainen',
      weaponType: 'lahitaistelu',
      mainTraits: ['tarkkuus'],
      addTrait: 'kevyt',
      aetherTrait: 'none',
    },
  },
  {
    id: 'lyhytmiekka',
    label: 'Lyhytmiekka (Yksinkertainen, viiltävä)',
    spec: {
      name: 'Lyhytmiekka',
      weaponClass: 'yksinkertainen',
      weaponType: 'lahitaistelu',
      mainTraits: ['viiltava'],
      addTrait: 'none',
      aetherTrait: 'none',
    },
  },
  {
    id: 'pajavasara',
    label: 'Pajavasara (Yksinkertainen, murskaava)',
    spec: {
      name: 'Pajavasara',
      weaponClass: 'yksinkertainen',
      weaponType: 'lahitaistelu',
      mainTraits: ['murskaava'],
      addTrait: 'none',
      aetherTrait: 'none',
    },
  },
  {
    id: 'miekka_sota',
    label: 'Miekka (Sota-ase, viiltävä)',
    spec: {
      name: 'Miekka',
      weaponClass: 'sota_ase',
      weaponType: 'lahitaistelu',
      mainTraits: ['viiltava'],
      addTrait: 'none',
      aetherTrait: 'none',
    },
  },
  {
    id: 'kalpa',
    label: 'Kalpa (Sota-ase, kevyt, tarkkuus, viiltävä)',
    spec: {
      name: 'Kalpa',
      weaponClass: 'sota_ase',
      weaponType: 'lahitaistelu',
      mainTraits: ['tarkkuus', 'viiltava'],
      addTrait: 'kevyt',
      aetherTrait: 'none',
    },
  },
  {
    id: 'pitkamiekka',
    label: 'Pitkämiekka (Sota-ase, ulottuva, viiltävä)',
    spec: {
      name: 'Pitkämiekka',
      weaponClass: 'sota_ase',
      weaponType: 'lahitaistelu',
      mainTraits: ['ulottuva', 'viiltava'],
      addTrait: 'none',
      aetherTrait: 'none',
    },
  },
  {
    id: 'sotakirves',
    label: 'Sotakirves (Sota-ase, monikäyttöinen, viiltävä)',
    spec: {
      name: 'Sotakirves',
      weaponClass: 'sota_ase',
      weaponType: 'lahitaistelu',
      mainTraits: ['monikayttoinen', 'viiltava'],
      addTrait: 'none',
      aetherTrait: 'none',
    },
  },
  {
    id: 'kahdenkadenmiekka',
    label: 'Keisarillinen kahdenkädenmiekka (Sota-ase, raskas, viiltävä)',
    spec: {
      name: 'Keisarillinen kahdenkädenmiekka',
      weaponClass: 'sota_ase',
      weaponType: 'lahitaistelu',
      mainTraits: ['raskas', 'viiltava'],
      addTrait: 'none',
      aetherTrait: 'none',
    },
  },
  {
    id: 'vuorenvasara',
    label: 'Vuorenvasara (Sota-ase, raskas, murskaava)',
    spec: {
      name: 'Vuorenvasara',
      weaponClass: 'sota_ase',
      weaponType: 'lahitaistelu',
      mainTraits: ['raskas', 'murskaava'],
      addTrait: 'none',
      aetherTrait: 'none',
    },
  },
  {
    id: 'taskupistooli',
    label: 'Taskupistooli (Sota-ase, kantama, kevyt)',
    spec: {
      name: 'Taskupistooli',
      weaponClass: 'sota_ase',
      weaponType: 'kantama',
      mainTraits: [],
      addTrait: 'kevyt',
      aetherTrait: 'none',
    },
  },
  {
    id: 'revolveri',
    label: 'Revolveri (Sota-ase, kantama)',
    spec: {
      name: 'Revolveri',
      weaponClass: 'sota_ase',
      weaponType: 'kantama',
      mainTraits: [],
      addTrait: 'none',
      aetherTrait: 'none',
    },
  },
  {
    id: 'kivaari',
    label: 'Kivääri (Sota-ase, kantama, pistävä)',
    spec: {
      name: 'Kivääri',
      weaponClass: 'sota_ase',
      weaponType: 'kantama',
      mainTraits: ['pistava'],
      addTrait: 'none',
      aetherTrait: 'none',
    },
  },
  {
    id: 'tarkkuuskivaari',
    label: 'Tarkkuuskivääri (Sota-ase, kantama, ulottuva)',
    spec: {
      name: 'Tarkkuuskivääri',
      weaponClass: 'sota_ase',
      weaponType: 'kantama',
      mainTraits: ['ulottuva'],
      addTrait: 'none',
      aetherTrait: 'none',
    },
  },
  {
    id: 'sotakivaari',
    label: 'Sotakivääri (Sota-ase, kantama, raskas)',
    spec: {
      name: 'Sotakivääri',
      weaponClass: 'sota_ase',
      weaponType: 'kantama',
      mainTraits: ['raskas'],
      addTrait: 'none',
      aetherTrait: 'none',
    },
  },
];

export const ARMOR_PRESETS: EquipmentPreset<ArmorSpec>[] = [
  {
    id: 'perus_kevyt',
    label: 'Kevyt nahkaliivi (Kevyt panssari)',
    spec: {
      name: 'Kevyt nahkaliivi',
      armorType: 'kevyt',
      generalTraits: { iskunvaimennus: 0, leikkauskestavyys: 0, pistosuojaus: 0, vahvistettu: 0 },
      specialTraits: [],
      shield: 'none',
    },
  },
  {
    id: 'vahvistettu_kevyt',
    label: 'Vahvistettu nahkatakki (Kevyt, Vahvistettu)',
    spec: {
      name: 'Vahvistettu nahkatakki',
      armorType: 'kevyt',
      generalTraits: { iskunvaimennus: 0, leikkauskestavyys: 0, pistosuojaus: 0, vahvistettu: 1 },
      specialTraits: [],
      shield: 'none',
    },
  },
  {
    id: 'sirpalesuoja_liivi',
    label: 'Sirpalesuojaliivi (Keskiraskas, Sirpalesuoja + Vaimennettu)',
    spec: {
      name: 'Sirpalesuojaliivi',
      armorType: 'keskiraskas',
      generalTraits: { iskunvaimennus: 0, leikkauskestavyys: 0, pistosuojaus: 0, vahvistettu: 0 },
      specialTraits: ['sirpalesuoja', 'vaimennettu'],
      shield: 'none',
    },
  },
  {
    id: 'eliitti_raskas',
    label: 'Tukirankapanssari (Raskas, Tukiranka, Liikkuva, Vahvistettu 2x)',
    spec: {
      name: 'Tukirankapanssari',
      armorType: 'raskas',
      generalTraits: { iskunvaimennus: 0, leikkauskestavyys: 0, pistosuojaus: 0, vahvistettu: 2 },
      specialTraits: ['tukiranka', 'liikkuva'],
      shield: 'moderni',
    },
  },
];

const WEAPON_PREFIXES = [
  'Teroitettu',
  'Musta',
  'Pohjoisen',
  'Eetterivahvistettu',
  'Keisarillinen',
  'Salamannopea',
  'Ruosteinen',
  'Kipinöivä',
  'Pronssinen',
  'Hiljainen',
  'Raudankova',
  'Myrskyisä',
];

const WEAPON_BASES = [
  'Terä',
  'Miekka',
  'Sapeli',
  'Pistooli',
  'Kivääri',
  'Nuija',
  'Vasara',
  'Kirves',
  'Keihäs',
  'Varsijousi',
  'Tikari',
  'Jousi',
];

const ARMOR_PREFIXES = [
  'Vahvistettu',
  'Sirpalesuojattu',
  'Tukirankainen',
  'Höyhenenkevyt',
  'Hiljainen',
  'Taottu',
  'Musta',
  'Eetterisuojattu',
  'Teräksinen',
  'Pehmustettu',
];

const ARMOR_BASES = [
  'Nahkaliivi',
  'Rintapanssari',
  'Haarniska',
  'Taistelutakki',
  'Panssariliivi',
  'Suojapuku',
  'Levypanssari',
  'Rengaspaita',
];

const pickRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export const generateWeaponName = (): string =>
  `${pickRandom(WEAPON_PREFIXES)} ${pickRandom(WEAPON_BASES).toLowerCase()}`;

export const generateArmorName = (): string =>
  `${pickRandom(ARMOR_PREFIXES)} ${pickRandom(ARMOR_BASES).toLowerCase()}`;

export interface EquipmentWorkshopProps {
  /** Initial mode tab ('weapons' | 'armor'). Default 'weapons'. */
  initialMode?: 'weapons' | 'armor';
  /** Initial weapon specification. */
  initialWeapon?: WeaponSpec;
  /** Initial armor specification. */
  initialArmor?: ArmorSpec;
  /** Optional custom id suffix for element uniqueness in DOM. */
  idSuffix?: string;
}

export const equipmentWorkshopClassNames = (): string => 'eevenkoto-equipment-workshop';
