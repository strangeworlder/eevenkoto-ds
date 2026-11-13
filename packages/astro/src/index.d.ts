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
  DividerProps,
  FloatingBannerProps,
  ProgressBarProps,
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
  StatblockSectionTitleLevel,
  StatusDotProps,
  StepperProps,
  SwatchProps,
  SwatchShape,
  SwatchSize,
  TableCellInput,
  TableCellKind,
  TableCellObject,
  TableCellProps,
  TableCellScope,
  TableColumn,
  TableElementAttributes,
  TableProps,
  TableRowInput,
  TableRowObject,
  TableStripe,
  TableVariant,
  ToastProps,
  TooltipCardProps,
  TooltipCardTitleLevel,
  WorkshopLayout,
  WorkshopProps,
  WorkshopSticky,
  WorkshopTitleLevel,
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
  DividerProps,
  FloatingBannerProps,
  ProgressBarProps,
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
  StatblockSectionTitleLevel,
  StatusDotProps,
  StepperProps,
  SwatchProps,
  SwatchShape,
  SwatchSize,
  TableCellInput,
  TableCellKind,
  TableCellObject,
  TableCellProps,
  TableCellScope,
  TableColumn,
  TableElementAttributes,
  TableProps,
  TableRowInput,
  TableRowObject,
  TableStripe,
  TableVariant,
  ToastProps,
  TooltipCardProps,
  TooltipCardTitleLevel,
  WorkshopLayout,
  WorkshopProps,
  WorkshopSticky,
  WorkshopTitleLevel,
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
export declare const ListItem: AstroComponent<ListItemProps>;
export declare const Paragraph: AstroComponent<Omit<ParagraphProps, 'text'> & { text?: string }>;
export declare const Popover: AstroComponent<PopoverProps & { open?: boolean }>;
export declare const Property: AstroComponent<PropertyProps>;
export declare const Radio: AstroComponent<RadioProps>;
export declare const Scroll: AstroComponent<ScrollProps>;
export declare const Select: AstroComponent<SelectProps>;
export declare const Stat: AstroComponent<StatProps>;
export declare const StatusDot: AstroComponent<StatusDotProps>;
export declare const Swatch: AstroComponent<SwatchProps>;
export declare const Divider: AstroComponent<DividerProps>;
export declare const ProgressBar: AstroComponent<ProgressBarProps>;
export declare const TableCell: AstroComponent<TableCellProps>;
export declare const Toast: AstroComponent<ToastProps>;

// Core — Molecules
export declare const Card: AstroComponent<CardProps & { href?: string }>;
export declare const Catalog: AstroComponent<CatalogProps>;
export declare const CatalogTile: AstroComponent<CatalogTileProps>;
export declare const CheckboxGroup: AstroComponent<CheckboxGroupProps>;
export declare const Field: AstroComponent<FieldProps>;
export declare const FloatingBanner: AstroComponent<FloatingBannerProps>;
export declare const Flow: AstroComponent<FlowProps>;
export declare const List: AstroComponent<
  Omit<ListProps, 'items'> & { items?: Array<string | ListItemProps> }
>;
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
  Omit<TableProps, 'columns' | 'rows'> & { columns?: TableColumn[]; rows?: TableRowInput[] }
>;
export declare const TooltipCard: AstroComponent<TooltipCardProps>;

// Core — Organisms
export declare const TableShell: AstroComponent<{
  frame?: boolean;
  scroll?: boolean;
  scrollAxis?: ScrollAxis;
}>;
export declare const Workshop: AstroComponent<
  Omit<WorkshopProps, 'header' | 'controls' | 'toolbar' | 'preview' | 'footer'> & {
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
  Omit<EquipmentWorkshopProps, 'header' | 'controls' | 'toolbar' | 'preview' | 'footer'> & {
    id?: string;
  }
>;
export declare const Spellblock: AstroComponent<SpellblockProps>;
export declare const Statblock: AstroComponent<StatblockProps>;

import type {
  ChipGroupProps,
  DisclosureProps,
  TableOfContentsProps,
} from '@eevenkoto/core';

export type { ChipGroupProps, DisclosureProps, TableOfContentsProps };

export declare const ChipGroup: AstroComponent<ChipGroupProps>;
export declare const Disclosure: AstroComponent<DisclosureProps>;
export declare const TableOfContents: AstroComponent<TableOfContentsProps>;

import type { AccountMenuProps, SectionHeaderProps, TierCardProps } from '@eevenkoto/core';

export type { AccountMenuProps, SectionHeaderProps, TierCardProps };

export declare const SectionHeader: AstroComponent<SectionHeaderProps>;
export declare const AccountMenu: AstroComponent<AccountMenuProps>;
export declare const TierCard: AstroComponent<TierCardProps>;

import type {
  LicenseBarProps,
  DocumentHeaderProps,
  ContentTableProps,
  EntityPreviewProps,
  ReadAloudBoxProps,
  NpcCardProps,
  MapFrameProps,
  NpcCardGridProps,
  ContentGateProps,
} from '@eevenkoto/core';
export type {
  LicenseBarProps,
  DocumentHeaderProps,
  ContentTableProps,
  EntityPreviewProps,
  ReadAloudBoxProps,
  NpcCardProps,
  MapFrameProps,
  NpcCardGridProps,
  ContentGateProps,
};

export declare const LicenseBar: AstroComponent<LicenseBarProps>;
export declare const DocumentHeader: AstroComponent<DocumentHeaderProps>;
export declare const ContentTable: AstroComponent<ContentTableProps>;
export declare const EntityPreview: AstroComponent<EntityPreviewProps>;
export declare const ReadAloudBox: AstroComponent<ReadAloudBoxProps>;
export declare const NpcCard: AstroComponent<NpcCardProps>;
export declare const MapFrame: AstroComponent<MapFrameProps>;
export declare const NpcCardGrid: AstroComponent<NpcCardGridProps>;
export declare const ContentGate: AstroComponent<ContentGateProps>;
