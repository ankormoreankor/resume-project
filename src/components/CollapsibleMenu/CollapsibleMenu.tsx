import classNames from 'classnames';

import utility from '../../scss/utility.module.scss';
import { CollapsibleArea } from '../CollapsibleArea/CollapsibleArea';
import { IconExtended } from '../IconExtended/IconExtended';
import { ScrollArea } from '../ScrollArea/ScrollArea';
import { Tooltip, type TooltipProps } from '../Tooltip/Tooltip';

import scss from './CollapsibleMenu.module.scss';

import type { IconProps } from '../../types';
import type { CollapsibleAreaProps } from '../CollapsibleArea/CollapsibleArea';
import type { ComponentType, ReactNode } from 'react';

const ITEM_ICON_DEFAULT_SIZE = 18;

export interface CollapsibleMenuItem extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Unique item identifier
   */
  id: string;
  /**
   * Item label
   */
  label: string;
  /**
   * Item icon
   */
  iconLeft?: ComponentType<IconProps> | null;
  /**
   * Icon props
   */
  iconLeftProps?: IconProps;
  /**
   * Item icon
   */
  iconRight?: ComponentType<IconProps> | null;
  /**
   * Item shortcut
   */
  shortcut?: ReactNode;
  /**
   * Icon props
   */
  iconRightProps?: IconProps;
  /**
   * Item state props
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
    /**
     * Is item selected
     */
    isSelected?: boolean;
  };
  /**
   * Tooltip props (each item can have its own tooltip)
   */
  tooltipProps?: TooltipProps;
}

export interface CollapsibleMenuProps extends CollapsibleAreaProps {
  /**
   * Menu items
   */
  items: CollapsibleMenuItem[];
}

export const CollapsibleMenu = ({ items = [], headerId, ...props }: CollapsibleMenuProps) => (
  <CollapsibleArea {...props} className={classNames(scss.collapsibleMenuRoot, props.className)}>
    <ScrollArea>
      <ul
        className={scss.menu}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby={headerId}
        data-element="collapsible-menu-content"
      >
        {items.map(
          ({
            id,
            label,
            shortcut,
            tooltipProps,
            iconLeftProps,
            iconLeft,
            iconRightProps,
            iconRight,
            state: { isDisabled: isItemDisabled, isHidden, isSelected } = {},
            ...restItemProps
          }) => {
            if (isHidden) return null;

            return (
              <li key={id} role="presentation">
                <Tooltip {...tooltipProps}>
                  <button
                    type="button"
                    role="menuitem"
                    data-element="collapsible-menu-item"
                    className={classNames(
                      utility.buttonReset,
                      scss.item,
                      isItemDisabled && scss.isDisabled,
                      isSelected && scss.isSelected,
                    )}
                    disabled={isItemDisabled || isSelected}
                    value={label}
                    {...restItemProps}
                  >
                    <IconExtended
                      icon={iconLeft}
                      className={scss.itemIcon}
                      size={ITEM_ICON_DEFAULT_SIZE}
                      {...iconLeftProps}
                      data-element="collapsible-menu-item-icon"
                    />

                    <span className={scss.itemText} data-element="collapsible-menu-item-text">
                      {label}
                    </span>

                    <IconExtended
                      icon={iconRight}
                      className={scss.itemIcon}
                      size={ITEM_ICON_DEFAULT_SIZE}
                      {...iconRightProps}
                      data-element="collapsible-menu-item-icon"
                    />

                    {shortcut}
                  </button>
                </Tooltip>
              </li>
            );
          },
        )}
      </ul>
    </ScrollArea>
  </CollapsibleArea>
);
