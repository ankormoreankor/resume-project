import * as Collapsible from '@radix-ui/react-collapsible';
import classNames from 'classnames';

import { Button } from '../Button/Button';
import { ChevronFilledIcon } from '../icons';

import scss from './CollapsibleArea.module.scss';

import type { ButtonProps } from '../Button/Button';
import type { PropsWithChildren, ReactNode } from 'react';

export interface CollapsibleAreaProps extends PropsWithChildren {
  /**
   * Class name applied to the root element
   */
  className?: string;
  /**
   * Menu header
   */
  header?: ReactNode;
  /**
   * Header id
   */
  headerId?: string;
  /**
   * State props
   */
  state?: ButtonProps['state'] & {
    /**
     * Is menu open by default
     */
    isDefaultOpen?: boolean;
  };
  /**
   * Props to control the menu from the outside
   */
  controlProps?: Pick<Collapsible.CollapsibleProps, 'open' | 'onOpenChange'>;
  /**
   * Trigger props
   */
  triggerProps?: Omit<ButtonProps, 'state'>;
  /**
   * Any data-* prop you need
   */
  [key: `data-${string}`]: string | undefined;
}

export const CollapsibleArea = ({
  header,
  headerId,
  children,
  className,
  controlProps = {},
  triggerProps = {},
  state: { isDefaultOpen = false, isDisabled: isCollapsibleAreaDisabled = false, ...stateProps } = {},
  ...dataProps
}: CollapsibleAreaProps) => {
  return (
    <Collapsible.Root
      {...controlProps}
      className={classNames(scss.collapsibleAreaRoot, className)}
      defaultOpen={isDefaultOpen}
    >
      <Collapsible.Trigger asChild disabled={isCollapsibleAreaDisabled} {...dataProps}>
        <header className={scss.header} data-element="collapsible-area-header">
          <h5 id={headerId}>{header}</h5>

          <Button
            size="tiny"
            variant="transparent"
            icon={ChevronFilledIcon}
            {...triggerProps}
            state={{ isDisabled: isCollapsibleAreaDisabled, ...stateProps }}
            className={classNames(triggerProps.className, scss.trigger)}
            data-element="collapsible-area-trigger"
          />
        </header>
      </Collapsible.Trigger>

      <Collapsible.Content className={scss.content} data-element="collapsible-area-content">
        {children}
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
