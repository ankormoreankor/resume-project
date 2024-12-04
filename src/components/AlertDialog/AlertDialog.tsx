import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';
import classNames from 'classnames';
import { omit } from 'lodash';
import { useEffect, type PropsWithChildren, type ReactNode, useCallback, useState } from 'react';

import { Button } from '../Button/Button';

import scss from './AlertDialog.module.scss';

import type { ButtonProps } from '../Button/Button';

export const alertDialogType = {
  short: 'short',
  wide: 'wide',
} as const;

export type AlertDialogType = (typeof alertDialogType)[keyof typeof alertDialogType];

export const alertDialogOverlayType = {
  transparent: 'transparent',
  colored: 'colored',
} as const;

export type AlertDialogOverlayType = (typeof alertDialogOverlayType)[keyof typeof alertDialogOverlayType];

const ConfirmButtonWrapper = ({ isWrapped, children }: PropsWithChildren<{ isWrapped?: boolean }>) => (
  <>
    {isWrapped && <RadixAlertDialog.Action asChild>{children}</RadixAlertDialog.Action>}

    {!isWrapped && children}
  </>
);

export interface AlertDialogProps extends PropsWithChildren {
  /**
   * Optional class name to add to the root element.
   */
  className?: string;
  /**
   * Props to pass to the dialog.
   */
  /**
   * Type of the dialog.
   */
  type?: AlertDialogType;
  /**
   * Optional custom content to render inside the dialog. Replaces the title and description.
   */
  customContent?: ReactNode;
  /**
   * Title to render inside the dialog.
   */
  title?: ReactNode;
  /**
   * Description to render inside the dialog.
   */
  description?: ReactNode;
  /**
   * State props
   */
  state?: {
    /**
     * Is modal open by default
     */
    isDefaultOpen?: boolean;
  };
  /**
   * Props to control the modal from the outside
   */
  controlProps?: Pick<RadixAlertDialog.AlertDialogProps, 'open' | 'onOpenChange'> & {
    /**
     * ❗️For debug only❗️
     * It prevents the modal from closing when you click outside (devtools etc.)
     */
    isPreventChange?: boolean;
  };
  /**
   * Overlay props
   */
  overlayProps?: RadixAlertDialog.AlertDialogOverlayProps & {
    isEnabled?: boolean;
    isClickable?: boolean;
    type?: AlertDialogOverlayType;
  };
  /**
   * Content props
   */
  contentProps?: RadixAlertDialog.AlertDialogContentProps;
  /**
   * Portal props. Can be used to change the root element of the portal (default is `document.body`)
   */
  portalProps?: RadixAlertDialog.AlertDialogPortalProps;
  /**
   * Props for cancel button
   */
  cancelButtonProps?: ButtonProps & { text?: string; isHidden?: boolean };
  /**
   * Props for confirm button
   */
  confirmButtonProps?: ButtonProps & { text?: string; isDismissModalOnClick?: boolean };
}

export const AlertDialog = ({
  type = alertDialogType.wide,
  className,
  children,
  customContent,
  title,
  description,
  portalProps = {},
  overlayProps: {
    isEnabled = true,
    isClickable = true,
    type: overlayType = alertDialogOverlayType.transparent,
    ...restOverlayProps
  } = {},
  controlProps = {},
  contentProps = {},
  state: { isDefaultOpen = false } = {},
  cancelButtonProps,
  confirmButtonProps = {
    isDismissModalOnClick: true,
  },
}: AlertDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(isDefaultOpen ?? false);

  const { open: isOpenProp, onOpenChange: onOpenChangeProp } = controlProps;
  const isOverlayColored = overlayType === alertDialogOverlayType.colored;

  const onOpenChange: RadixAlertDialog.AlertDialogProps['onOpenChange'] = useCallback(
    (open: boolean) => {
      if (controlProps.isPreventChange) return;

      onOpenChangeProp?.(open);
      setIsOpen(open);
    },
    [controlProps.isPreventChange, onOpenChangeProp],
  );

  useEffect(() => {
    if (isOpenProp === undefined) return;

    setIsOpen(isOpenProp);
  }, [isOpenProp]);

  return (
    <RadixAlertDialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <RadixAlertDialog.Portal {...portalProps}>
        {isEnabled && (
          <RadixAlertDialog.Overlay
            className={classNames(scss.overlay, isOverlayColored && scss.isColored)}
            {...restOverlayProps}
            data-element="alert-dialog-overlay"
            onClick={(event) => {
              if (isClickable) {
                onOpenChange(false);
              }

              restOverlayProps?.onClick?.(event);
            }}
          />
        )}

        <RadixAlertDialog.Content
          className={classNames(className, scss.alertDialogRoot, scss[type])}
          {...contentProps}
          data-element="alert-dialog-main-container"
        >
          {!!customContent && customContent}

          {!customContent && (
            <>
              {title && (
                <RadixAlertDialog.Title className={scss.title} data-element="alert-dialog-title">
                  {title}
                </RadixAlertDialog.Title>
              )}

              {description && (
                <RadixAlertDialog.Description className={scss.description} data-element="alert-dialog-description">
                  {description}
                </RadixAlertDialog.Description>
              )}

              {children && <div data-element="alert-dialog-content">{children}</div>}

              <div data-element="alert-dialog-buttons-container" className={scss.buttons}>
                <Button
                  variant="bordered"
                  size="medium"
                  className={scss.button}
                  onClick={(e) => {
                    cancelButtonProps?.onClick?.(e);
                    onOpenChangeProp?.(false);
                  }}
                  {...omit(cancelButtonProps, 'text', 'onClick')}
                >
                  {cancelButtonProps?.text ?? 'Cancel'}
                </Button>

                <ConfirmButtonWrapper isWrapped={confirmButtonProps.isDismissModalOnClick}>
                  <Button variant="destructive" size="medium" className={scss.button} {...omit(confirmButtonProps, 'text')}>
                    {confirmButtonProps?.text ?? 'Confirm'}
                  </Button>
                </ConfirmButtonWrapper>
              </div>
            </>
          )}
        </RadixAlertDialog.Content>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  );
};
