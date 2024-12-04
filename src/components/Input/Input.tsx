import classNames from 'classnames';
import { omit } from 'lodash';
import { forwardRef } from 'react';

import { useForceFocused } from '../../hooks';
import utility from '../../scss/utility.module.scss';
import { InputWrapper } from '../InputWrapper/InputWrapper';
import { ResizableTextarea } from '../ResizableTextarea/ResizableTextarea';

import scss from './Input.module.scss';

import type { InputElement } from '../../types';
import type { InputWrapperProps } from '../InputWrapper/InputWrapper';
import type { ResizableTextareaProps } from '../ResizableTextarea/ResizableTextarea';
import type { ReactNode } from 'react';

export const inputSize = {
  small: 'small',
  large: 'large',
} as const;

export type InputSize = (typeof inputSize)[keyof typeof inputSize];

export const inputType = {
  input: 'input',
  textarea: 'textarea',
} as const;

export type InputType = (typeof inputType)[keyof typeof inputType];

export interface BaseInputProps extends Pick<InputWrapperProps, 'state' | 'debugProps' | 'variant'> {
  /**
   * Additional class name
   */
  className?: string;
  /**
   * Input type. Default is "input"
   */
  type: InputType;
  /**
   * Input state
   */
  state?: {
    /**
     * Prop to know that input is in loading state, so it should be styled accordingly. If true, input will be disabled. Default is false
     * Styles are not implemented yet
     */
    isLoading?: boolean;
    /**
     * Prop to know that input is disabled, so it should be styled accordingly. Default is false
     */
    isDisabled?: boolean;
  };
  /**
   * Control props
   */
  controlProps?: {
    /**
     * Prop to force input to be focused. Default is false
     */
    forceIsFocused?: boolean;
  };
  /**
   * Any data-* prop you need
   */
  [key: `data-${string}`]: string | undefined;
}

export interface InputTypeInputProps extends BaseInputProps, Omit<InputElement, 'size' | 'type' | 'disabled'> {
  type: 'input';
  /**
   * Input size. Default is "small"
   */
  size?: InputSize;
  /**
   * Native input type. Default is "text"
   */
  inputType?: InputElement['type'];
  /**
   * Native input size. Default is "undefined"
   */
  inputSize?: InputElement['size'];
  /**
   * Start content. Can be anything
   */
  startContent?: ReactNode;
  /**
   * End content. Can be anything
   */
  endContent?: ReactNode;
}

export interface TextareaTypeInputProps extends BaseInputProps, Omit<ResizableTextareaProps, 'state' | 'disabled'> {
  type: 'textarea';
}

export type InputProps = Omit<InputTypeInputProps, 'ref'> | Omit<TextareaTypeInputProps, 'ref'>;

/**
 * Dummy input component that can be presented as textarea or input. Based on html input element and ResizableTextarea component.
 * Can be rendered in different styles, sizes, can show a feedback etc.
 * If you need it to change styling and show a feedback in the same time, you need to handle it from outside (make a wrapper, for instance)
 */
export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ className, type = inputType.input, state, debugProps, controlProps, variant, ...props }, forwardedRef) => {
    const { isLoading = false, isDisabled = false } = state ?? {};
    const { forceIsFocused = false } = controlProps ?? {};

    const isInputType = type === inputType.input;
    const isTextareaType = type === inputType.textarea;
    const isInputDisabled = isDisabled || isLoading;

    const textareaProps = props as TextareaTypeInputProps;
    const { size: inputSizeProp = inputSize.small, startContent, endContent, ...inputProps } = props as InputTypeInputProps;

    const { ref } = useForceFocused({ elementRef: forwardedRef, isFocused: forceIsFocused });

    const inputCommonProps = { ref, disabled: isInputDisabled };

    return (
      <>
        {isInputType && (
          <InputWrapper
            className={classNames(scss.inputRoot, className, scss.inputElement, scss[inputSizeProp])}
            state={{ isDisabled: isInputDisabled }}
            debugProps={debugProps}
            variant={variant}
          >
            {startContent}

            <input
              {...omit(inputProps, 'size', 'type', 'inputType', 'inputSize')}
              type={inputProps.inputType ?? 'text'}
              size={inputProps.inputSize}
              className={utility.inputReset}
              {...inputCommonProps}
              data-element="input"
            />

            {endContent}
          </InputWrapper>
        )}

        {isTextareaType && (
          <InputWrapper
            className={classNames(scss.inputRoot, className, scss.textareaElement)}
            state={{ isDisabled: isInputDisabled }}
            debugProps={debugProps}
            variant={variant}
          >
            <ResizableTextarea {...{ ...textareaProps, state }} {...inputCommonProps} />
          </InputWrapper>
        )}
      </>
    );
  },
);

Input.displayName = 'Input';
