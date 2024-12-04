import classNames from 'classnames';

import scss from './InputWrapper.module.scss';

import type { HTMLAttributes, PropsWithChildren } from 'react';

export const inputVariant = {
  primary: 'primary',
  destructive: 'destructive',
} as const;

export type InputVariant = (typeof inputVariant)[keyof typeof inputVariant];

export interface InputWrapperProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  /**
   * Input variant. Default is "primary"
   */
  variant?: InputVariant;
  /**
   * A class name applied to the root element
   */
  className?: string;
  /**
   * State props
   */
  state?: {
    /**
     * If true, the input will be disabled
     */
    isDisabled?: boolean;
  };
  /**
   * Debug props. Useful for imitating different states in storybook.
   * Accepts isHovered and isFocused props
   */
  debugProps?: {
    state: {
      isHovered?: boolean;
      isFocused?: boolean;
    };
  };
  /**
   * Any data-* prop you need
   */
  [key: `data-${string}`]: string | undefined;
}

/**
 * Utility component. Can be combined with inputs or inputs-like components.
 * Provides an ability to apply different states like 'focused', 'has an error', etc.
 */
export const InputWrapper = ({
  className,
  children,
  debugProps,
  state: { isDisabled } = {},
  variant = inputVariant.primary,
  ...dataProps
}: InputWrapperProps) => {
  const { isFocused, isHovered } = debugProps?.state ?? {};

  return (
    <div
      className={classNames(
        scss.inputWrapperRoot,
        scss[variant],
        className,
        isFocused && scss.isFocused,
        isHovered && scss.isHovered,
        isDisabled && scss.isDisabled,
      )}
      {...dataProps}
    >
      {children}
    </div>
  );
};
