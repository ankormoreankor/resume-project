import * as RadixCheckbox from '@radix-ui/react-checkbox';
import classNames from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';

import { CheckIcon, MinusIcon } from '../icons';

import scss from './Checkbox.module.scss';

type CheckboxSize = 'large' | 'medium';

export interface CheckboxProps extends RadixCheckbox.CheckboxProps {
  /**
   * className applied to the root element
   */
  className?: string;
  /**
   * True for round checkbox
   */
  isRound?: boolean;
  /**
   * Checkbox size. Default is 'large'
   */
  size?: CheckboxSize;
  /**
   * Text for label
   */
  labelText?: React.ReactNode;
  /**
   * If true - label will be placed on the left side of checkbox. 'false' by default
   */
  isWithLeftLabel?: boolean;
  /**
   * OnChange callback
   * Checkbox will pass a status and ref to the element
   */
  onStateChange?: (checked: boolean, element: HTMLButtonElement | null) => void;

  testId?: string;
}

const iconSizesDict: Record<CheckboxSize, number> = {
  large: 14,
  medium: 12,
};

export const Checkbox = ({
  className,
  isRound,
  size = 'medium',
  onStateChange,
  checked: checkedState,
  labelText,
  isWithLeftLabel = false,
  disabled,
  testId,
  ...props
}: CheckboxProps) => {
  const [checked, setChecked] = useState(checkedState ?? false);
  const iconSize = iconSizesDict[size];
  const ref = useRef<HTMLButtonElement>(null);

  const onCheckedChange = useCallback(
    (value: boolean) => {
      setChecked(value);
      onStateChange?.(value, ref.current);
    },
    [onStateChange],
  );

  const onLabelClick = useCallback(() => {
    if (checked === 'indeterminate') {
      onCheckedChange(true);
      return;
    }
    onCheckedChange(!checked);
  }, [checked, onCheckedChange]);

  const renderLabel = () => (
    <span className={classNames(scss.labelText, scss[size], isWithLeftLabel && scss.alignRight)} onClick={onLabelClick}>
      {labelText}
    </span>
  );

  useEffect(() => {
    if (checkedState === undefined) return;
    setChecked(checkedState ?? false);
  }, [checkedState]);

  return (
    <div className={classNames(scss.root, !!labelText && scss.labeled, disabled && scss.isDisabled, className)}>
      {!!labelText && isWithLeftLabel && renderLabel()}

      <RadixCheckbox.Root
        data-testid={testId}
        className={classNames(scss.checkbox, isRound && scss.isRound, disabled && scss.isDisabled, scss[size])}
        {...{ checked, onCheckedChange, ref, disabled, ...props }}
      >
        <RadixCheckbox.Indicator className={scss.indicator}>
          {checked === 'indeterminate' && <MinusIcon width={iconSize} height={iconSize} />}
          {checked === true && <CheckIcon width={iconSize} height={iconSize} />}
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>

      {!!labelText && !isWithLeftLabel && renderLabel()}
    </div>
  );
};
