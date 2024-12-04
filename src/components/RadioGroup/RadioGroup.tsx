import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import classNames from 'classnames';
import { forwardRef } from 'react';

import utility from '../../scss/utility.module.scss';

import scss from './RadioGroup.module.scss';

export const radioButtonSize = {
  small: 'small',
  medium: 'medium',
} as const;

export type RadioButtonSize = (typeof radioButtonSize)[keyof typeof radioButtonSize];

export interface RadioButtonProps extends RadixRadioGroup.RadioGroupItemProps {
  /**
   * Radio button size
   */
  size?: RadioButtonSize;
  /**
   * Radio button label
   */
  label?: string;
  /**
   * If true, the radio button will be disabled. Defaults to false
   */
  isDisabled?: boolean;
}

export const RadioButton = ({ size = 'medium', isDisabled, label, id, ...props }: RadioButtonProps) => {
  const RadioButtonComponent = () => (
    <RadixRadioGroup.Item
      {...props}
      id={id ?? props.value}
      className={classNames(scss.radioButton, utility.buttonReset, scss[size], isDisabled && scss.isDisabled)}
      disabled={isDisabled}
      data-element="radio-button"
    >
      <RadixRadioGroup.Indicator
        className={classNames(scss.radioButtonIndicator, scss[size], isDisabled && scss.isDisabled)}
        data-element="radio-button-indicator"
      />
    </RadixRadioGroup.Item>
  );

  return (
    <>
      {!!label && (
        <label className={classNames(scss.label, scss[size])} data-element="radio-button-label">
          <RadioButtonComponent />
          <span data-element="radio-button-label-text">{label}</span>
        </label>
      )}

      {!label && <RadioButtonComponent />}
    </>
  );
};

export interface RadioGroupProps extends RadixRadioGroup.RadioGroupProps {
  /**
   * Radio group items
   */
  items: RadioButtonProps[];
  /**
   * Radio group buttons size
   */
  size?: RadioButtonSize;
  /**
   * If true, the radio group will be disabled. Defaults to false
   */
  isDisabled?: boolean;
  /**
   * Any data-* prop you need
   */
  [key: `data-${string}`]: string | undefined;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, items, isDisabled: isRadioGroupDisabled, size, ...restProps }, ref) => {
    if (!items?.length) return false;

    return (
      <RadixRadioGroup.Root
        {...restProps}
        ref={ref}
        className={classNames(scss.radioGroupRoot, className)}
        disabled={isRadioGroupDisabled}
        data-element="radio-group"
      >
        {items.map(({ isDisabled: isRadioButtonDisabled, ...restButtonProps }) => (
          <RadioButton
            size={size}
            {...restButtonProps}
            key={restButtonProps.value}
            isDisabled={isRadioGroupDisabled || isRadioButtonDisabled}
          />
        ))}
      </RadixRadioGroup.Root>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';

export const RadioGroupBase = RadixRadioGroup;
export type RadioGroupBaseProps = RadixRadioGroup.RadioGroupProps;
export type RadioGroupBaseItemProps = RadixRadioGroup.RadioGroupItemProps;
