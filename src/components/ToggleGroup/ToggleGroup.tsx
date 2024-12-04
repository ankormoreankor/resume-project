import * as RadixToggleGroup from '@radix-ui/react-toggle-group';
import classNames from 'classnames';
import { forwardRef, useRef, type HTMLAttributes, type ReactNode } from 'react';

import utility from '../../scss/utility.module.scss';

import scss from './ToggleGroup.module.scss';

const toggleGroupBehavior = {
  normal: 'normal',
  unresettable: 'unresettable',
} as const;

export type ToggleGroupBehavior = (typeof toggleGroupBehavior)[keyof typeof toggleGroupBehavior];

export interface ToggleGroupItem extends Omit<HTMLAttributes<HTMLButtonElement>, 'disabled'> {
  /**
   * Item content
   */
  item: ReactNode;
  /**
   * Value of the item
   */
  value: string;
  /**
   * Item state
   */
  state?: { isDisabled?: boolean; isHidden?: boolean };
}

export interface ToggleGroupBaseProps {
  /**
   * Toggle group items
   */
  items: ToggleGroupItem[];
  /**
   * Toggle group behavior. If `unresettable`, there are always one selected item
   */
  behavior?: ToggleGroupBehavior;
  onItemSelect?: (item: ToggleGroupItem) => void;
  /**
   * Any data-* prop you need
   */
  [key: `data-${string}`]: string | undefined;
}

type ToggleGroupWithSingleCheckProps = RadixToggleGroup.ToggleGroupSingleProps & ToggleGroupBaseProps;
type ToggleGroupWithMultipleCheckProps = RadixToggleGroup.ToggleGroupMultipleProps & ToggleGroupBaseProps;

export type ToggleGroupProps = ToggleGroupWithSingleCheckProps | ToggleGroupWithMultipleCheckProps;

export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ className, items = [], behavior = toggleGroupBehavior.normal, onItemSelect, ...restProps }, ref) => {
    if (restProps.type === 'multiple' && behavior === toggleGroupBehavior.unresettable) {
      throw new Error('`unresettable` behavior is not supported for multiple toggle group');
    }

    const selectedValueRef = useRef<string | string[] | undefined>(restProps.defaultValue);
    const isNormalBehavior = behavior === toggleGroupBehavior.normal;
    const isUnresettableBehavior = behavior === toggleGroupBehavior.unresettable;

    return (
      <RadixToggleGroup.Root
        {...restProps}
        ref={ref}
        className={classNames(scss.toggleGroupRoot, className)}
        data-element="toggle-group"
      >
        {items.map(({ item, value = '', state: { isDisabled, isHidden } = {}, onClick, ...restToggleProps }) => {
          const itemCommonProps = {
            ...restToggleProps,
            value,
            children: item,
            disabled: isDisabled,
            'data-element': 'toggle-group-item',
            className: classNames(utility.buttonReset, scss.item),
          };

          const handleItemsSelect = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            onItemSelect?.({ item, value });
            onClick?.(evt);
          };

          if (isHidden) return false;

          return (
            // this wrap is needed, cos when key prop is passed to RadixToggleGroup.Item it's not working and we get a warning
            <div key={value}>
              {isNormalBehavior && <RadixToggleGroup.Item {...itemCommonProps} onClick={handleItemsSelect} />}

              {isUnresettableBehavior && (
                <RadixToggleGroup.Item
                  {...itemCommonProps}
                  onClick={(evt) => {
                    if (isUnresettableBehavior && selectedValueRef.current === value) {
                      evt.preventDefault();
                      return;
                    }

                    selectedValueRef.current = value;

                    handleItemsSelect?.(evt);
                  }}
                />
              )}
            </div>
          );
        })}
      </RadixToggleGroup.Root>
    );
  },
);

ToggleGroup.displayName = 'ToggleGroup';

export const ToggleGroupBase = RadixToggleGroup;
export type ToggleGroupBaseSingleProps = RadixToggleGroup.ToggleGroupSingleProps;
export type ToggleGroupBaseMultipleProps = RadixToggleGroup.ToggleGroupMultipleProps;
