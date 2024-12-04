import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import { forwardRef } from 'react';

import utility from '../../scss/utility.module.scss';
import { Avatar, type AvatarProps } from '../Avatar/Avatar';
import { Button } from '../Button/Button';
import { IconExtended } from '../IconExtended/IconExtended';
import { CheckboxIndicatorIcon, ChevronRightIcon } from '../icons';
import { ScrollArea } from '../ScrollArea/ScrollArea';
import { Tooltip, type TooltipProps } from '../Tooltip/Tooltip';

import scss from './DropdownMenu.module.scss';

import type { DivElement, IconProps } from '../../types';
import type { ButtonProps } from '../Button/Button';
import type { IconExtendedProps } from '../IconExtended/IconExtended';
import type { ComponentType, PropsWithChildren, ReactNode } from 'react';

const DEFAULT_POPOVER_OFFSET = 8;

export const dropdownMenuItemsType = {
  default: 'default',
  destructive: 'destructive',
  divider: 'divider',
  injection: 'injection',
} as const;

export type DropdownMenuItemsType = (typeof dropdownMenuItemsType)[keyof typeof dropdownMenuItemsType];

interface DropdownMenuCommonItem extends Omit<RadixDropdownMenu.DropdownMenuItemProps, 'onClick' | 'onSelect' | 'content'> {
  /**
   * Item id
   */
  value: string;
  /**
   * Item type
   */
  type?: DropdownMenuItemsType;
}

export interface DropdownMenuDividerItem extends DropdownMenuCommonItem {
  /**
   * Item type
   */
  type?: 'divider';
}

export interface DropdownMenuInjectionItem extends DropdownMenuCommonItem {
  /**
   * Item type
   */
  type?: 'injection';
  /**
   * Header item content. Don't forget to put it as first element in the items array❗️
   */
  content: ReactNode;
}

export interface DropdownMenuTextItem extends DropdownMenuCommonItem {
  /**
   * Type of the item
   */
  type?: 'default' | 'destructive';
  /**
   * Item label
   */
  label?: string;
  /**
   * If the field exists, the item will be rendered as checkbox with the value as label
   */
  isChecked?: boolean;
  /**
   * Item description
   */
  description?: string;
  /**
   * Submenu items
   */
  items?: (DropdownMenuTextItem | DropdownMenuDividerItem | DropdownMenuInjectionItem)[];
  /**
   * Item icon
   */
  icon?: ComponentType<IconProps>;
  /**
   * Item icon props
   */
  iconProps?: IconExtendedProps;
  /**
   * Item avatar props. Alternative to icon. If passed both, icon will be used
   */
  avatarProps?: AvatarProps;
  /**
   * Replaceable subitem icon (chevron right by default)
   */
  subitemIcon?: ComponentType<IconProps>;
  /**
   * Subitem icon props
   */
  subitemIconProps?: IconExtendedProps;
  /**
   * Item state
   */
  state?: {
    /**
     * Is item disabled
     */
    isDisabled?: boolean;
    /**
     * Is item hidden
     */
    isHidden?: boolean;
  };
  /**
   * Item tooltip props
   */
  tooltipProps?: TooltipProps;
  /**
   * Item click handler
   */
  onSelect?: (value: string) => void;
  /**
   * Custom item renderer. Selectable alternative to type injection
   */
  renderItem?: () => ReactNode;
  /**
   * Any data prop you need
   */
  [key: `data-${string}`]: string | undefined;
}

export type DropdownMenuItem = DropdownMenuTextItem | DropdownMenuDividerItem | DropdownMenuInjectionItem;

const checkIfDividerItem = (item: DropdownMenuItem): item is DropdownMenuDividerItem => item.type === 'divider';
const checkIfTextItem = (item: DropdownMenuItem): item is DropdownMenuTextItem =>
  item.type !== 'divider' && item.type !== 'injection';
const checkIfInjectionItem = (item: DropdownMenuItem): item is DropdownMenuInjectionItem => item.type === 'injection';

const MenuContentContainer = ({ children, level, ...props }: DivElement & { level?: number }) => (
  <ScrollArea type="always" className={scss.contentScrollArea}>
    <div
      {...props}
      className={classNames(scss.content, props.className)}
      data-element="dropdown-menu-content"
      data-level={level}
    >
      {children}
    </div>
  </ScrollArea>
);

interface MenuItemContentProps extends DivElement {
  label?: string;
  iconProps: IconExtendedProps;
  description?: string;
  avatarProps?: AvatarProps;
}

const MenuItemContent = ({ iconProps, description, label, avatarProps, ...props }: MenuItemContentProps) => {
  const isWithDescription = !!description;
  const isWithIcon = !!iconProps.icon;
  const isWithAvatar = !!avatarProps && !iconProps.icon;

  return (
    <div {...props} className={classNames(isWithDescription && scss.isWithDescription, props.className)}>
      {isWithIcon && <IconExtended size={14} className={scss.icon} {...iconProps} data-element="dropdown-menu-icon" />}

      {isWithAvatar && <Avatar size={14} {...avatarProps} className={scss.avatar} data-element="dropdown-menu-avatar" />}

      {!isWithDescription && (
        <span className={utility.ellipsis} data-element="dropdown-menu-label">
          {label}
        </span>
      )}

      {isWithDescription && (
        <div className={scss.withDescriptionContent}>
          <span data-element="dropdown-menu-label">{label}</span>

          <span data-element="dropdown-menu-description">{description}</span>
        </div>
      )}

      {props.children}
    </div>
  );
};

interface ProcessMenuItemsProps {
  items: DropdownMenuItem[];
  level?: number;
  className?: string;
  onCheckedChange?: (value: string, isChecked?: boolean) => void;
}

const processMenuItems = ({ items, level = 0, className, onCheckedChange }: ProcessMenuItemsProps): ReactNode[] => {
  return items.map((item) => {
    const { value } = item;

    if (checkIfInjectionItem(item)) {
      return (
        <span className={scss.item} key={value} data-element="dropdown-menu-injection-item" data-level={level}>
          {item.content}
        </span>
      );
    }

    if (checkIfDividerItem(item)) {
      return (
        <RadixDropdownMenu.Separator
          key={value}
          className={scss.divider}
          data-element="dropdown-menu-divider"
          data-level={level}
        />
      );
    }

    if (checkIfTextItem(item)) {
      const {
        type = dropdownMenuItemsType.default,
        icon,
        label,
        state: { isDisabled, isHidden } = {},
        onSelect,
        isChecked,
        iconProps,
        renderItem,
        subitemIcon = ChevronRightIcon,
        avatarProps,
        description,
        tooltipProps,
        subitemIconProps,
        ...restItemProps
      } = item;

      const isDestructive = type === dropdownMenuItemsType.destructive;
      const isCheckboxItem = isChecked !== undefined;

      const dropdownItemCommonStyles = classNames(scss.itemContent, isDestructive && scss.isDestructive);

      const commonItemProps = {
        className: scss.item,
        disabled: isDisabled,
        'data-level': level,
      };

      const onClickPropagationHandler = (e: React.MouseEvent) => e.stopPropagation();

      const commonSelectHandler = (e: Event, handlers: (CallableFunction | undefined)[]) => {
        e.stopPropagation();

        if (isDisabled) return;

        handlers.forEach((handler) => {
          handler?.(value);
        });
      };

      if (isHidden) return null;

      if (item.items) {
        return (
          <Tooltip key={value} {...tooltipProps}>
            <RadixDropdownMenu.Sub>
              <RadixDropdownMenu.SubTrigger {...commonItemProps} data-element="dropdown-menu-submenu-trigger">
                <MenuItemContent
                  label={label}
                  avatarProps={avatarProps}
                  description={description}
                  iconProps={{ icon, ...iconProps }}
                  className={classNames(dropdownItemCommonStyles, scss.subitem)}
                  data-element="dropdown-menu-sub-item-content"
                >
                  <IconExtended
                    icon={subitemIcon}
                    size={16}
                    {...subitemIconProps}
                    data-element="dropdown-menu-submenu-trigger-icon"
                  />
                </MenuItemContent>
              </RadixDropdownMenu.SubTrigger>

              <RadixDropdownMenu.Portal>
                <RadixDropdownMenu.SubContent
                  className={classNames(scss.dropDownMenuRoot, className)}
                  sideOffset={6}
                  alignOffset={-4}
                  data-level={level + 1}
                >
                  <MenuContentContainer level={level + 1}>
                    {processMenuItems({ items: item.items, level: level + 1, className, onCheckedChange })}
                  </MenuContentContainer>
                </RadixDropdownMenu.SubContent>
              </RadixDropdownMenu.Portal>
            </RadixDropdownMenu.Sub>
          </Tooltip>
        );
      }

      if (isCheckboxItem) {
        return (
          <Tooltip key={value} {...tooltipProps}>
            <RadixDropdownMenu.CheckboxItem
              {...commonItemProps}
              checked={isChecked}
              onCheckedChange={(checked) => onCheckedChange?.(value, checked)}
              onClick={onClickPropagationHandler}
              onSelect={(e) => commonSelectHandler(e, [onSelect, () => e.preventDefault()])}
            >
              <MenuItemContent
                label={label}
                avatarProps={avatarProps}
                description={description}
                iconProps={{ icon, ...iconProps }}
                className={dropdownItemCommonStyles}
              >
                <RadixDropdownMenu.ItemIndicator className={scss.selectableItemIndicator}>
                  <IconExtended icon={CheckboxIndicatorIcon} size={14} />
                </RadixDropdownMenu.ItemIndicator>
              </MenuItemContent>
            </RadixDropdownMenu.CheckboxItem>
          </Tooltip>
        );
      }

      if (renderItem) {
        return (
          <Tooltip key={value} {...tooltipProps}>
            <RadixDropdownMenu.Item
              {...{ ...commonItemProps, ...restItemProps }}
              onClick={onClickPropagationHandler}
              onSelect={(e) => commonSelectHandler(e, [onSelect, onCheckedChange])}
              data-element="dropdown-menu-item"
            >
              <div className={dropdownItemCommonStyles} data-element="dropdown-menu-item-custom-content">
                {renderItem()}
              </div>
            </RadixDropdownMenu.Item>
          </Tooltip>
        );
      }

      return (
        <Tooltip key={value} {...tooltipProps}>
          <RadixDropdownMenu.Item
            {...{ ...commonItemProps, ...restItemProps }}
            onClick={onClickPropagationHandler}
            onSelect={(e) => commonSelectHandler(e, [onSelect, onCheckedChange])}
            data-element="dropdown-menu-item"
          >
            <MenuItemContent
              label={label}
              avatarProps={avatarProps}
              description={description}
              iconProps={{ icon, ...iconProps }}
              className={dropdownItemCommonStyles}
              data-element="dropdown-menu-item-content"
            />
          </RadixDropdownMenu.Item>
        </Tooltip>
      );
    }

    return null;
  });
};

export interface DropdownMenuProps extends PropsWithChildren {
  /**
   * Dropdown menu class name. Applied to the popover element, for trigger use `triggerProps.className`
   */
  className?: string;
  /**
   * Dropdown menu items
   */
  items?: DropdownMenuItem[];
  /**
   * Called when any item that has `onClick` prop is clicked. Can be used when dropdown is used ala select
   */
  onCheckedChange?: (value: string, isChecked?: boolean) => void;
  /**
   * State props
   */
  state?: ButtonProps['state'] & {
    /**
     * Is dropdown menu open by default
     */
    isDefaultOpen?: boolean;
  };
  /**
   * Props to control the dropdown menu from the outside
   */
  controlProps?: Pick<RadixDropdownMenu.DropdownMenuProps, 'open' | 'onOpenChange' | 'modal'> & {
    /**
     * Will prevent autofocus on trigger element on close. This is useful when you have a tooltip that should not be shown when the popover is closed
     * Default is `true`
     */
    isPreventAutofocusOnClose?: boolean;
  };
  /**
   * Popover props
   */
  popoverProps?: RadixDropdownMenu.DropdownMenuContentProps & {
    /**
     * Popover width type. If `auto`, the width will be calculated based on the trigger width. Default is `fixed`
     */
    widthType?: 'fixed' | 'auto';
    /**
     * Popover height type. If `auto`, the height will be calculated based on the content. Default is `fixed`, which is relevant to 5 items
     */
    heightType?: 'fixed' | 'auto';
  };
  /**
   * Trigger props
   */
  triggerProps?: Omit<ButtonProps, 'state'>;
  /**
   * Portal props. Can be used to change the root element of the portal (default is `document.body`)
   */
  portalProps?: RadixDropdownMenu.DropdownMenuPortalProps;
  /**
   * Any data-* prop you need
   */
  [key: `data-${string}`]: string | undefined;
}

export const DropdownMenu = forwardRef<HTMLButtonElement, DropdownMenuProps>(
  (
    {
      items,
      children,
      className,
      portalProps = {},
      controlProps: { isPreventAutofocusOnClose = true, ...controlProps } = {},
      triggerProps = {},
      popoverProps: { widthType = 'fixed', heightType = 'fixed', sideOffset, onCloseAutoFocus, ...popoverProps } = {},
      onCheckedChange,
      state: { isDefaultOpen = false, isDisabled: isDropdownMenuDisabled = false, ...stateProps } = {},
      ...dataProps
    },
    ref,
  ) => {
    const isPopoverFixedWidth = widthType === 'fixed';
    const isPopoverAutoWidth = widthType === 'auto';
    const isPopoverFixedHeight = heightType === 'fixed';

    return (
      <RadixDropdownMenu.Root {...controlProps} defaultOpen={isDefaultOpen}>
        <RadixDropdownMenu.Trigger asChild disabled={isDropdownMenuDisabled || stateProps.isLoading}>
          <Button
            variant="transparent"
            size="tiny"
            {...triggerProps}
            ref={ref}
            state={{ isDisabled: isDropdownMenuDisabled, ...stateProps }}
            data-element="dropdown-menu-trigger"
          >
            {children}
          </Button>
        </RadixDropdownMenu.Trigger>

        <RadixDropdownMenu.Portal {...portalProps}>
          {!!items?.length && (
            <RadixDropdownMenu.Content
              style={{ zIndex: 1000 }}
              className={classNames(
                scss.dropDownMenuRoot,
                isPopoverFixedWidth && scss.isPopoverFixedWidth,
                isPopoverAutoWidth && scss.isPopoverAutoWidth,
                isPopoverFixedHeight && scss.isPopoverFixedHeight,
                className,
              )}
              {...{ ...popoverProps, ...dataProps }}
              sideOffset={sideOffset ?? DEFAULT_POPOVER_OFFSET}
              data-element="dropdown-menu-root"
              onCloseAutoFocus={(event) => {
                if (isPreventAutofocusOnClose) {
                  event.preventDefault();
                }

                onCloseAutoFocus?.(event);
              }}
            >
              <MenuContentContainer level={0}>
                {processMenuItems({ items, className, onCheckedChange })}
              </MenuContentContainer>
            </RadixDropdownMenu.Content>
          )}
        </RadixDropdownMenu.Portal>
      </RadixDropdownMenu.Root>
    );
  },
);

DropdownMenu.displayName = 'DropdownMenu';
