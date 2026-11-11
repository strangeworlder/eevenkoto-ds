import type {
  AbilityNameProps,
  AbilityScoreGroupProps,
  AbilityScoreProps,
  AvatarProps,
  BadgeProps,
  ButtonIconName,
  ButtonProps,
  CaptionProps,
  CardProps,
  CardTitleLevel,
  CatalogProps,
  CatalogTileProps,
  CheckboxGroupItemProps,
  CheckboxGroupProps,
  CheckboxProps,
  ChipProps,
  EntityRefKind,
  EntityRefProps,
  EquipmentBlockNameLevel,
  EquipmentBlockProps,
  EquipmentWorkshopProps,
  FieldProps,
  FlowDensity,
  FlowProps,
  HeadingLevel,
  HeadingProps,
  IconName,
  IconProps,
  ImageProps,
  InlineRefProps,
  InputProps,
  InputType,
  LinkButtonProps,
  ListItemProps,
  ListProps,
  MenuAttributes,
  MenuEntry,
  MenuProps,
  MenuSize,
  NoticeProps,
  NoticeRole,
  ParagraphProps,
  PopoverPlacement,
  PopoverProps,
  PropertyItem,
  PropertyListProps,
  PropertyProps,
  RadioGroupOptionProps,
  RadioGroupProps,
  RadioProps,
  ScrollAxis,
  ScrollProps,
  SegmentedControlProps,
  SelectOption,
  SelectOptionGroup,
  SelectProps,
  SpellblockNameLevel,
  SpellblockProps,
  StatProps,
  StatblockFeatureLevel,
  StatblockFeatureProps,
  StatblockNameLevel,
  StatblockProps,
  StatblockSectionProps,
  StatusDotProps,
  StepperProps,
  TableCellKind,
  TableCellProps,
  TableColumn,
  TableProps,
  TableStripe,
  TableVariant,
  ToastProps,
  TooltipCardProps,
  TooltipCardTitleLevel,
  WorkshopProps,
} from '@eevenkoto/core';

export type {
  AbilityNameProps,
  AbilityScoreGroupProps,
  AbilityScoreProps,
  AvatarProps,
  BadgeProps,
  ButtonIconName,
  ButtonProps,
  CaptionProps,
  CardProps,
  CardTitleLevel,
  CatalogProps,
  CatalogTileProps,
  CheckboxGroupItemProps,
  CheckboxGroupProps,
  CheckboxProps,
  ChipProps,
  EntityRefKind,
  EntityRefProps,
  EquipmentBlockNameLevel,
  EquipmentBlockProps,
  EquipmentWorkshopProps,
  FieldProps,
  FlowDensity,
  FlowProps,
  HeadingLevel,
  HeadingProps,
  IconName,
  IconProps,
  ImageProps,
  InlineRefProps,
  InputProps,
  InputType,
  LinkButtonProps,
  ListItemProps,
  ListProps,
  MenuAttributes,
  MenuEntry,
  MenuProps,
  MenuSize,
  NoticeProps,
  NoticeRole,
  ParagraphProps,
  PopoverPlacement,
  PopoverProps,
  PropertyItem,
  PropertyListProps,
  PropertyProps,
  RadioGroupOptionProps,
  RadioGroupProps,
  RadioProps,
  ScrollAxis,
  ScrollProps,
  SegmentedControlProps,
  SelectOption,
  SelectOptionGroup,
  SelectProps,
  SpellblockNameLevel,
  SpellblockProps,
  StatProps,
  StatblockFeatureLevel,
  StatblockFeatureProps,
  StatblockNameLevel,
  StatblockProps,
  StatblockSectionProps,
  StatusDotProps,
  StepperProps,
  TableCellKind,
  TableCellProps,
  TableColumn,
  TableProps,
  TableStripe,
  TableVariant,
  ToastProps,
  TooltipCardProps,
  TooltipCardTitleLevel,
  WorkshopProps,
};

export type AstroCommonProps = {
  class?: string;
  className?: string;
  slot?: string;
  children?: unknown;
  [key: string]: unknown;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AstroComponent<P = Record<string, never>> = (props: P & AstroCommonProps) => any;

// Core — Atoms
export declare const Avatar: AstroComponent<AvatarProps>;
export declare const Badge: AstroComponent<Omit<BadgeProps, 'label'> & { label?: string }>;
export declare const Button: AstroComponent<
  Omit<ButtonProps, 'label'> & { label?: string; type?: 'button' | 'submit' | 'reset' }
>;
export declare const Caption: AstroComponent<
  Omit<CaptionProps, 'text'> & { text?: string; as?: 'p' | 'span' | 'figcaption' }
>;
export declare const Checkbox: AstroComponent<CheckboxProps>;
export declare const Chip: AstroComponent<Omit<ChipProps, 'label'> & { label?: string }>;
export declare const Frame: AstroComponent;
export declare const Heading: AstroComponent<Omit<HeadingProps, 'text'> & { text?: string }>;
export declare const Icon: AstroComponent<IconProps>;
export declare const Image: AstroComponent<ImageProps>;
export declare const InlineRef: AstroComponent<Omit<InlineRefProps, 'name'> & { name?: string }>;
export declare const Input: AstroComponent<InputProps>;
export declare const LinkButton: AstroComponent<
  Omit<LinkButtonProps, 'label'> & { label?: string }
>;
export declare const ListItem: AstroComponent<Omit<ListItemProps, 'text'> & { text?: string }>;
export declare const Paragraph: AstroComponent<Omit<ParagraphProps, 'text'> & { text?: string }>;
export declare const Popover: AstroComponent<PopoverProps & { open?: boolean }>;
export declare const Property: AstroComponent<PropertyProps>;
export declare const Radio: AstroComponent<RadioProps>;
export declare const Scroll: AstroComponent<ScrollProps>;
export declare const Select: AstroComponent<SelectProps>;
export declare const Stat: AstroComponent<StatProps>;
export declare const StatusDot: AstroComponent<StatusDotProps>;
export declare const TableCell: AstroComponent<{
  kind?: TableCellKind;
  header?: boolean;
  angled?: boolean;
  inTable?: boolean;
  scope?: 'col' | 'row' | 'colgroup' | 'rowgroup';
}>;
export declare const Toast: AstroComponent<ToastProps>;

// Core — Molecules
export declare const Card: AstroComponent<CardProps & { href?: string }>;
export declare const Catalog: AstroComponent<CatalogProps>;
export declare const CatalogTile: AstroComponent<CatalogTileProps>;
export declare const CheckboxGroup: AstroComponent<CheckboxGroupProps>;
export declare const Field: AstroComponent<FieldProps>;
export declare const Flow: AstroComponent<FlowProps>;
export declare const List: AstroComponent<Omit<ListProps, 'items'> & { items?: string[] }>;
export declare const Menu: AstroComponent<MenuProps>;
export declare const Notice: AstroComponent<
  Omit<NoticeProps, 'icon'> & { icon?: IconName | false; role?: NoticeRole }
>;
export declare const PropertyList: AstroComponent<
  Omit<PropertyListProps, 'items'> & { items?: PropertyItem[] }
>;
export declare const Prose: AstroComponent;
export declare const RadioGroup: AstroComponent<RadioGroupProps>;
export declare const SegmentedControl: AstroComponent<SegmentedControlProps>;
export declare const Stepper: AstroComponent<StepperProps>;
export declare const Table: AstroComponent<
  Omit<TableProps, 'columns' | 'rows'> & { columns?: TableColumn[]; rows?: string[][] }
>;
export declare const TooltipCard: AstroComponent<TooltipCardProps>;

// Core — Organisms
export declare const TableShell: AstroComponent<{
  frame?: boolean;
  scroll?: boolean;
  scrollAxis?: ScrollAxis;
}>;
export declare const Workshop: AstroComponent<
  Omit<WorkshopProps, 'header' | 'controls' | 'preview'> & {
    role?: string;
    style?: string | Record<string, string | number | undefined>;
  }
>;

// Domain — Atoms
export declare const AbilityName: AstroComponent<
  Omit<AbilityNameProps, 'name'> & { name?: string }
>;
export declare const EntityRef: AstroComponent<
  Omit<EntityRefProps, 'name'> & { name?: string }
>;

// Domain — Molecules
export declare const AbilityScore: AstroComponent<AbilityScoreProps>;
export declare const StatblockFeature: AstroComponent<StatblockFeatureProps>;
export declare const StatblockSection: AstroComponent<StatblockSectionProps>;

// Domain — Organisms
export declare const AbilityScoreGroup: AstroComponent<{ abilities: AbilityScoreProps[] }>;
export declare const EquipmentBlock: AstroComponent<EquipmentBlockProps>;
export declare const EquipmentWorkshop: AstroComponent<
  Omit<EquipmentWorkshopProps, 'header' | 'controls' | 'preview'> & { id?: string }
>;
export declare const Spellblock: AstroComponent<SpellblockProps>;
export declare const Statblock: AstroComponent<StatblockProps>;
