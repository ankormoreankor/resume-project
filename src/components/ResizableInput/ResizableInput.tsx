import classNames from 'classnames';
import { forwardRef, useEffect, useState } from 'react';

import utility from '../../scss/utility.module.scss';

import scss from './ResizableInput.module.scss';

import type { InputElement } from '../../types';
import type { ChangeEvent } from 'react';

export interface ResizableInputProps extends Omit<InputElement, 'ref' | 'disabled'> {
  state?: {
    isDisabled?: boolean;
  };
  /**
   * Any data-* prop you need
   */
  [key: `data-${string}`]: string | undefined;
}

export const ResizableInput = forwardRef<HTMLInputElement, ResizableInputProps>(
  ({ className, defaultValue, value, placeholder, state: { isDisabled } = {}, onInput, ...inputProps }, ref) => {
    const [textValue, setTextValue] = useState(defaultValue || value || '');

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
      setTextValue(e.target.value);
      onInput?.(e);
    };

    useEffect(() => {
      if (defaultValue !== undefined) {
        setTextValue(defaultValue);
      }

      if (value !== undefined) {
        setTextValue(value);
      }
    }, [defaultValue, value]);

    return (
      <div
        className={classNames(scss.resizableInputRoot, className)}
        data-replicated-value={textValue || placeholder}
        data-element="resizable-input-container"
      >
        <input
          type="text"
          {...inputProps}
          placeholder={placeholder}
          ref={ref}
          value={textValue}
          className={classNames(scss.input, utility.inputReset)}
          onInput={handleInput}
          disabled={isDisabled}
        />
      </div>
    );
  },
);

ResizableInput.displayName = 'ResizableInput';
