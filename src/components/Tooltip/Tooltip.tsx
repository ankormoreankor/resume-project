import * as RadixTooltip from '@radix-ui/react-tooltip';
import classNames from 'classnames';

import scss from './Tooltip.module.scss';

import type { SpanElement } from '../../types';
import type { PropsWithChildren, ReactNode } from 'react';

type TooltipContentProps = RadixTooltip.TooltipContentProps;

const DEFAULT_TOOLTIP_MARGIN = 4;

export interface TooltipProps extends PropsWithChildren {
  /**
   * className applied to the root element
   */
  className?: string;
  /**
   * className applied to the Arrow element
   */
  arrowClassName?: string;
  /**
   * Tooltip content
   */
  content?: ReactNode;
  /**
   * @description if true - tooltip will have an Arrow
   * @default true
   */
  isHasArrow?: boolean;
  /**
   * Tooltip content props
   */
  contentProps?: TooltipContentProps;
  /**
   * Tooltip placement
   */
  placement?: TooltipContentProps['side'];
  state?: {
    /**
     * @description if true - tooltip will not be shown
     * @default false
     */
    isDisabled?: boolean;
    /**
     * @description if true - tooltip will opened by default
     * @default false
     */
    isDefaultOpen?: boolean;
  };
  /**
   * Props to control the tooltip from the outside
   */
  controlProps?: Pick<RadixTooltip.TooltipProps, 'open' | 'onOpenChange' | 'delayDuration'>;
  /**
   * Props for the tooltip portal. Can be used to specify a container element to portal the content into.
   */
  portalProps?: RadixTooltip.TooltipPortalProps;
  triggerProps?: SpanElement;
  /**
   * Any data-* prop you need
   */
  [key: `data-${string}`]: string | undefined;
}

export const Tooltip = ({
  state: { isDisabled = false, isDefaultOpen = false } = {},
  content,
  children,
  className,
  placement,
  isHasArrow = false,
  portalProps,
  triggerProps,
  contentProps,
  arrowClassName,
  controlProps: { delayDuration = 400, ...controlProps } = {},
  ...dataProps
}: TooltipProps) => {
  if (!content) return <>{children}</>;

  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root {...controlProps} defaultOpen={isDefaultOpen}>
        <RadixTooltip.Trigger asChild>
          <span {...triggerProps} data-element="tooltip-trigger" className={classNames(scss.tooltipRoot, className)}>
            {children}
          </span>
        </RadixTooltip.Trigger>

        {!isDisabled && (
          <RadixTooltip.Portal {...portalProps}>
            <RadixTooltip.Content
              sideOffset={DEFAULT_TOOLTIP_MARGIN}
              {...{ ...contentProps, ...dataProps }}
              style={{ zIndex: 100000 }}
              className={classNames(scss.content, contentProps?.className)}
              side={placement ?? contentProps?.side}
            >
              <span className={scss.tooltipContentContainer}>{content}</span>

              {isHasArrow && (
                <RadixTooltip.Arrow className={classNames(scss.tooltipArrow, arrowClassName)} width={11} height={5} />
              )}
            </RadixTooltip.Content>
          </RadixTooltip.Portal>
        )}
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};
