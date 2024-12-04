import classNames from 'classnames';
import { omit } from 'lodash';
import { forwardRef, useId } from 'react';

import { useForceFocused } from '../../hooks';
import utility from '../../scss/utility.module.scss';
import { IconExtended } from '../IconExtended/IconExtended';
import { SpinnerIcon } from '../icons';
import { Tooltip } from '../Tooltip/Tooltip';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';

import scss from './Button.module.scss';

import type { IconExtendedProps } from '../IconExtended/IconExtended';
import type { TooltipProps } from '../Tooltip/Tooltip';
import type { ReactNode, ComponentType, HTMLAttributes } from 'react';

export const buttonVariant = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  bordered: 'bordered',
  transparent: 'transparent',
  destructive: 'destructive',
  link: 'link',
} as const;

export type ButtonVariant = (typeof buttonVariant)[keyof typeof buttonVariant];

export const buttonSize = {
  large: 'large',
  medium: 'medium',
  small: 'small',
  xSmall: 'xSmall',
  tiny: 'tiny',
} as const;

export type ButtonSize = (typeof buttonSize)[keyof typeof buttonSize];

const DEFAULT_ICON_SIZE = 18;

const iconSizesDict: Record<ButtonSize, number> = {
  large: DEFAULT_ICON_SIZE,
  medium: DEFAULT_ICON_SIZE,
  small: DEFAULT_ICON_SIZE,
  xSmall: DEFAULT_ICON_SIZE,
  tiny: 16,
};

interface IconPropsWithPLacement extends IconExtendedProps {
  /**
   * Icon placement
   */
  placement?: 'left' | 'right';
}

export interface ButtonCommonProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * Button content. Basically it's used the same way as children, but can be used when passing via buttonProps for better readability
   */
  content?: string;
  /**
   * Used for better accessability
   */
  label?: string;
  /**
   * Defines button type
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Button variant
   */
  variant?: ButtonVariant;
  /**
   * Button size
   */
  size?: ButtonSize;
  /**
   * Button state
   */
  state?: {
    /**
     * If true button will be disabled
     */
    isDisabled?: boolean;
    /**
     * If true button will have 'loading' state
     */
    isLoading?: boolean;
  };
  /**
   * Icon component
   */
  icon?: ComponentType<IconPropsWithPLacement>;
  /**
   * Props for icon component
   */
  iconProps?: IconPropsWithPLacement;
  /**
   * Can be used instead of icon
   */
  startContent?: ReactNode;
  /**
   * Props for tooltip
   */
  tooltipProps?: TooltipProps;

  controlProps?: {
    /**
     * If true button will be focused (useful for controlled focus)
     */
    forceIsFocused?: boolean;
  };

  debugProps?: {
    state: {
      /**
       * If true button will be hovered (useful only for testing)
       */
      isHovered?: boolean;
      /**
       * If true button will be focused (useful only for testing)
       */
      isFocused?: boolean;
      /**
       * If true button will be focused (useful only for testing)
       */
      isActive?: boolean;
    };
  };
  /**
   * Specifies the form element the <button> element belongs to.
   * The value of this attribute must be the id attribute of a <form> element in the same document.
   */
  form?: string;
  /**
   * Any data-* prop you need
   */
  [key: `data-${string}`]: string | undefined;
}

interface BorderedButtonProps extends ButtonCommonProps {
  variant: 'bordered';
  /**
   * If true button will be without shadow. This variant has a shadow by default
   */
  isShadowless?: boolean;
}

export type ButtonProps = ButtonCommonProps | BorderedButtonProps;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      content,
      label,
      className,
      tooltipProps,
      controlProps,
      variant = buttonVariant.primary,
      size = buttonSize.small,
      state,
      debugProps,
      icon,
      iconProps,
      children,
      startContent,
      type,
      ...buttonProps
    },
    forwardedRef,
  ) => {
    const labelId = useId();
    const { isActive, isFocused, isHovered } = debugProps?.state ?? {};
    const { isLoading = false, isDisabled = false } = state ?? {};
    const { forceIsFocused = false } = controlProps ?? {};

    const IconComponent = isLoading ? SpinnerIcon : icon;

    const isShadowless = variant === buttonVariant.bordered && (buttonProps as BorderedButtonProps).isShadowless;
    const isWithRightIcon = iconProps?.placement === 'right';
    const isLinkType = variant === buttonVariant.link;

    const Icon = !isLinkType && !startContent && (
      <IconExtended
        icon={IconComponent}
        size={iconSizesDict[size]}
        {...iconProps}
        className={classNames(isLoading && scss.spinner, iconProps?.className)}
        data-element="button-icon"
      />
    );

    const { ref } = useForceFocused({ elementRef: forwardedRef, isFocused: forceIsFocused });

    return (
      <>
        {!!label && (
          <VisuallyHidden>
            <label id={labelId}>{label}</label>
          </VisuallyHidden>
        )}

        <Tooltip {...tooltipProps}>
          <button
            type={type ?? 'button'}
            ref={ref}
            {...omit(buttonProps, ['isShadowless'])}
            className={classNames(
              className,
              scss.buttonRoot,
              utility.buttonReset,
              scss[variant],
              scss[size],
              !!children && scss.isRectangular,
              isHovered && scss.isHovered,
              isFocused && scss.isFocused,
              isActive && scss.isPressed,
              (isDisabled || isLoading) && scss.isDisabled,
              isLoading && scss.isLoading,
              isShadowless && scss.isShadowless,
            )}
            disabled={isDisabled || isLoading}
            {...(!!label && { 'aria-labelledby': labelId })}
          >
            {startContent}

            {!isWithRightIcon && Icon}

            {(children || content) && (
              <span className={scss.content} data-element="button-content">
                {content || children}
              </span>
            )}

            {isWithRightIcon && Icon}
          </button>
        </Tooltip>
      </>
    );
  },
);

Button.displayName = 'Button';
