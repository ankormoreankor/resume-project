import * as RadixPopover from '@radix-ui/react-popover';
import classNames from 'classnames';
import { forwardRef, type ReactNode } from 'react';

import { Button } from '../Button/Button';

import scss from './Popover.module.scss';

import type { ButtonProps } from '../Button/Button';

export interface PopoverProps extends Omit<RadixPopover.PopoverContentProps, 'content'> {
  content: ReactNode;
  portalProps?: RadixPopover.PopoverPortalProps;
  controlProps?: Pick<RadixPopover.PopoverProps, 'onOpenChange' | 'modal'> & {
    /**
     * Is popover open
     */
    isOpen?: boolean;
  };
  state?: {
    /**
     * Is popover open by default
     */
    isDefaultOpen?: boolean;
    /**
     * Is popover cannot be opened
     */
    isDisabled?: boolean;
  };
  popoverProps?: RadixPopover.PopoverContentProps;
  closeButtonProps?: ButtonProps & {
    isVisible?: boolean;
  };
  arrowProps?: RadixPopover.PopoverArrowProps & {
    isVisible?: boolean;
  };
}

export const Popover = forwardRef<HTMLButtonElement, PopoverProps>(
  (
    {
      content,
      children,
      className,
      portalProps = {},
      popoverProps = {},
      closeButtonProps: { isVisible: isCloseButtonVisible = false, ...closeButtonProps } = {},
      arrowProps: { isVisible: isArrowVisible = false, ...arrowProps } = {},
      controlProps: { isOpen, onOpenChange, modal } = {},
      state: { isDefaultOpen = false, isDisabled = false } = {},
    },
    ref,
  ) => {
    return (
      <RadixPopover.Root open={isOpen} onOpenChange={onOpenChange} modal={modal} defaultOpen={isDefaultOpen}>
        <RadixPopover.Trigger asChild disabled={isDisabled} ref={ref}>
          {children}
        </RadixPopover.Trigger>

        <RadixPopover.Portal {...portalProps}>
          {!!content && (
            <RadixPopover.Content
              sideOffset={5}
              {...popoverProps}
              style={{ zIndex: 1000, ...popoverProps.style }}
              className={classNames(scss.popoverRoot, className)}
              data-element="popover-content"
            >
              {content}

              {isCloseButtonVisible && (
                // TODO(@andrey.koreykin): add styles and proper icon when/if element needed
                <RadixPopover.Close aria-label="Close" asChild>
                  <Button
                    variant="transparent"
                    size="tiny"
                    {...closeButtonProps}
                    className={classNames(scss.close, closeButtonProps?.className)}
                    data-element="popover-close-button"
                  />
                </RadixPopover.Close>
              )}

              {isArrowVisible && (
                // TODO(@andrey.koreykin): add styles when/if element needed
                <RadixPopover.Arrow
                  {...arrowProps}
                  className={classNames(scss.arrow, arrowProps.className)}
                  data-element="popover-arrow"
                />
              )}
            </RadixPopover.Content>
          )}
        </RadixPopover.Portal>
      </RadixPopover.Root>
    );
  },
);

Popover.displayName = 'Popover';
