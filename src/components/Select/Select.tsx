import * as RadixSelect from '@radix-ui/react-select';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';

import { wrapConditionalObjectElement } from '../../helpers';
import utility from '../../scss/utility.module.scss';
import { Button, buttonSize } from '../Button/Button';
import { Divider } from '../Divider/Divider';
import { IconExtended } from '../IconExtended/IconExtended';
import { ArrowDownLightIcon } from '../icons';
import { ScrollArea } from '../ScrollArea/ScrollArea';
import { Tooltip, type TooltipProps } from '../Tooltip/Tooltip';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';

import scss from './Select.module.scss';

import type { IconProps } from '../../types';
import type { ButtonProps } from '../Button/Button';
import type { CSSProperties, ComponentType, HTMLAttributes, ReactNode } from 'react';

export const DEFAULT_SELECT_PLACEHOLDER = 'Select an item...';
const DEFAULT_POPOVER_OFFSET = 8;

export const selectSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

export type SelectSize = (typeof selectSize)[keyof typeof selectSize];

export const selectWidth = {
  auto: 'auto',
  fixed: 'fixed',
  wide: 'wide',
} as const;

export type SelectWidth = (typeof selectWidth)[keyof typeof selectWidth];

const selectSizeToButtonSizeDict = {
  [selectSize.small]: buttonSize.tiny,
  [selectSize.medium]: buttonSize.xSmall,
  [selectSize.large]: buttonSize.xSmall,
};

export interface SelectItem<T = string> extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
  /**
   * Item label
   */
  label: string | number;
  /**
   * Item value
   */
  value: T;
  /**
   * Item icon
   */
  iconLeft?: ComponentType<IconProps>;
  /**
   * Icon props
   */
  iconLeftProps?: IconProps;
  /**
   * Item icon
   */
  iconRight?: ComponentType<IconProps>;
  /**
   * Item shortcut
   */
  shortcut?: ReactNode;
  /**
   * Icon props
   */
  iconRightProps?: IconProps;
  /**
   * Item depth. Default is 0. Used for nested items
   */
  depth?: number;
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
  };
  /**
   * Tooltip props (each item can have its own tooltip)
   */
  tooltipProps?: TooltipProps;
  /**
   * Custom item renderer. Combine with `renderLabel` to have a full control over the item
   */
  renderItem?: () => ReactNode;
  /**
   * Custom label renderer. Combine with `renderItem` to have a full control over the item
   */
  renderLabel?: () => ReactNode;
  /**
   * Any data-* prop you need
   */
  [key: `data-${string}`]: string | undefined;
}

export interface SelectProps<T extends string = string> {
  /**
   * Select size. Default is `auto`
   */
  size?: SelectSize;
  /**
   * Select width. Default is `auto`
   */
  width?: SelectWidth;
  /**
   * Select items
   */
  items: SelectItem<T>[];
  /**
   * Used in max-height calculation of the popover.
   */
  itemsToShow?: number | 'all';
  /**
   * Default select value
   */
  defaultValue?: string;
  /**
   * Select class name. Applied to the popover element, for trigger use `triggerProps.className`
   */
  className?: string;
  /**
   * Select placeholder
   */
  placeholder?: string;
  /**
   * Select state props
   */
  state?: ButtonProps['state'] & {
    /**
     * Is select open by default
     */
    isDefaultOpen?: boolean;
  };
  /**
   * Props to control the select from the outside
   */
  controlProps?: Pick<RadixSelect.SelectProps, 'open' | 'onOpenChange' | 'value'> & {
    /**
     * Will prevent autofocus on trigger element on close. This is useful when you have a tooltip that should not be shown when the popover is closed
     * Default is `true`
     */
    isPreventAutofocusOnClose?: boolean;
  };
  /**
   * Popover props
   */
  popoverProps?: RadixSelect.SelectContentProps;
  /**
   * Props to use in the form. For `id` prop use `triggerProps.id`
   */
  formProps?: { name?: string; required?: boolean };
  /**
   * Trigger props
   */
  triggerProps?: Omit<ButtonProps, 'state'> & {
    /**
     * Inner label. If added, the label will be displayed inside the trigger button
     */
    innerLabel?: string;
    /**
     * Item icon
     */
    innerLabelIcon?: ComponentType<IconProps>;
    /**
     * Icon props
     */
    innerLabelIconProps?: IconProps;
  };
  /**
   * Portal props. Can be used to change the root element of the portal (default is `document.body`)
   */
  portalProps?: RadixSelect.SelectPortalProps;
  /**
   * Any data-* prop you need
   */
  onValueChange?: (value: T) => void;
}

export const Select = <T extends string>({
  size = selectSize.medium,
  width = selectWidth.auto,
  items = [],
  className,
  defaultValue,
  state: { isDefaultOpen = false, isDisabled = false, isLoading } = {},
  controlProps: { isPreventAutofocusOnClose = true, ...controlProps } = {},
  popoverProps = {},
  triggerProps: { innerLabel, ...triggerProps } = {},
  portalProps = {},
  formProps: { name, required } = {},
  placeholder = DEFAULT_SELECT_PLACEHOLDER,
  itemsToShow = 5,
  onValueChange: onValueChangeProp,
}: SelectProps<T>) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue ?? '');

  const selectedItem = items.find((item) => item.value === selectedValue);

  const { open, onOpenChange, value: valueProp } = controlProps;

  const onValueChange: RadixSelect.SelectProps['onValueChange'] = useCallback(
    (value: T) => {
      onValueChangeProp?.(value);
      setSelectedValue(value);
      // this prevents showing a tooltip when item is selected
    },
    [onValueChangeProp],
  );

  useEffect(() => {
    if (valueProp !== undefined) {
      setSelectedValue(valueProp);
    }
  }, [valueProp, placeholder]);

  return (
    <RadixSelect.Root
      open={open}
      defaultOpen={isDefaultOpen}
      onOpenChange={onOpenChange}
      value={selectedValue}
      onValueChange={onValueChange}
      disabled={isDisabled || isLoading}
      name={name}
      required={required}
    >
      <RadixSelect.Trigger aria-label={name} asChild>
        <Button
          variant="bordered"
          size={selectSizeToButtonSizeDict[size]}
          title={selectedValue ? String(selectedItem?.label) : placeholder}
          {...triggerProps}
          className={classNames(
            scss.trigger,
            scss[size],
            scss[width],
            (selectedItem?.iconLeft || triggerProps.icon) && scss.isWithLeftIcon,
            triggerProps.className,
          )}
          state={{ isDisabled, isLoading }}
          icon={selectedItem?.iconLeft ?? triggerProps.icon}
          iconProps={{ ...selectedItem?.iconLeftProps, ...triggerProps.iconProps }}
          data-element="select-trigger"
        >
          {innerLabel && (
            <>
              <span className={scss.triggerInnerLabel}>{`${innerLabel}:`}</span>
              <Divider orientation="vertical" className={scss.triggerInnerLabelDivider} />
            </>
          )}

          <RadixSelect.Value placeholder={placeholder} data-element="select-trigger-value" />

          <RadixSelect.Icon className={scss.indicator} data-element="select-indicator">
            <IconExtended icon={ArrowDownLightIcon} size={18} data-element="select-arrow-down-icon" />
          </RadixSelect.Icon>
        </Button>
      </RadixSelect.Trigger>

      <RadixSelect.Portal {...portalProps}>
        <RadixSelect.Content
          align="start"
          sideOffset={DEFAULT_POPOVER_OFFSET}
          position="popper"
          {...popoverProps}
          onCloseAutoFocus={(event) => {
            if (isPreventAutofocusOnClose) {
              event.preventDefault();
            }

            popoverProps.onCloseAutoFocus?.(event);
          }}
          style={{
            zIndex: 1000,
            ...popoverProps.style,
            ...(Number(itemsToShow) ? ({ '--items-in-the-view': itemsToShow } as CSSProperties) : {}),
          }}
          className={classNames(scss.selectRoot, scss[width], className)}
          // This is a fix of quite an annoying issue when click calls a touch event behind the popover
          // https://github.com/radix-ui/primitives/issues/1658
          // Do not remove it ❗️
          ref={(ref) => {
            if (!ref) return;

            ref.ontouchstart = (e) => {
              e.preventDefault();
            };
          }}
        >
          <RadixSelect.Viewport className={scss.viewport} data-element="select-viewport">
            <ScrollArea isWithHorizontalScrollbar={false}>
              {items.map(
                ({
                  label,
                  value,
                  depth,
                  shortcut,
                  iconLeft,
                  iconLeftProps,
                  iconRight,
                  iconRightProps,
                  tooltipProps,
                  renderLabel,
                  state: { isDisabled: isItemDisabled, isHidden } = {},
                  renderItem,
                  className: itemClassName,
                  ...restItemProps
                }) => {
                  if (isHidden) return null;

                  const tooltipClassNames = classNames(tooltipProps?.className, scss.itemTooltip);

                  const isNestedChildren = depth !== undefined;

                  const itemCommonProps = {
                    value,
                    title: String(label),
                    className: classNames(utility.ellipsis, scss.item, itemClassName),
                    ...wrapConditionalObjectElement({ style: { '--depth': depth } as CSSProperties }, isNestedChildren),
                    disabled: isItemDisabled,
                    'data-element': 'select-item',
                  };

                  if (renderItem) {
                    return (
                      <Tooltip key={value} {...tooltipProps} className={tooltipClassNames}>
                        <RadixSelect.Item {...{ ...restItemProps, ...itemCommonProps }}>
                          <VisuallyHidden>
                            <RadixSelect.ItemText className={scss.itemText} data-element="select-item-text">
                              {renderLabel ? renderLabel() : label}
                            </RadixSelect.ItemText>
                          </VisuallyHidden>

                          {renderItem()}
                        </RadixSelect.Item>
                      </Tooltip>
                    );
                  }

                  return (
                    <Tooltip key={value} {...tooltipProps} className={tooltipClassNames}>
                      <RadixSelect.Item {...{ ...restItemProps, ...itemCommonProps }}>
                        <IconExtended
                          icon={iconLeft}
                          size={16}
                          {...iconLeftProps}
                          className={classNames(iconLeftProps?.className, scss.icon)}
                          data-element="select-item-icon"
                        />

                        <RadixSelect.ItemText data-element="select-item-text">{label}</RadixSelect.ItemText>

                        <IconExtended
                          icon={iconRight}
                          size={14}
                          {...iconRightProps}
                          className={classNames(iconRightProps?.className, scss.icon)}
                          data-element="select-item-icon"
                        />

                        {shortcut}
                      </RadixSelect.Item>
                    </Tooltip>
                  );
                },
              )}
            </ScrollArea>
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};
