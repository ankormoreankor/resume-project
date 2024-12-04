import * as RadixScrollArea from '@radix-ui/react-scroll-area';
import classNames from 'classnames';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';

import { Button, type ButtonProps } from '../Button/Button';
import { ArrowDownIcon } from '../icons';

import scss from './ScrollArea.module.scss';

export interface ScrollAreaProps extends RadixScrollArea.ScrollAreaProps {
  className?: string;
  isAlwaysVisible?: boolean;
  scrollDownButtonProps?: ButtonProps & {
    /*
     * Specifies whether the scroll down button is active.
     */
    isActive?: boolean;
    /*
     * Threshold value (in pixels) to determine when to show the scroll down button. Default is 100 pixels
     */
    treshold?: number;
  };
  isWithHorizontalScrollbar?: boolean;
}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    { className, children, isAlwaysVisible, isWithHorizontalScrollbar = true, scrollDownButtonProps = {}, ...props },
    ref,
  ) => {
    const {
      isActive: isScrollDownButtonActive = false,
      treshold: showScrollDownButtonTreshold = 100,
      ...restScrolldownButtonProps
    } = scrollDownButtonProps;

    const scrollViewportRef = useRef<HTMLDivElement>(null);

    const scrollDown = useCallback(() => {
      if (scrollViewportRef.current) {
        scrollViewportRef.current.scrollTo({ behavior: 'smooth', top: scrollViewportRef.current.scrollHeight });
      }
    }, []);

    const [isShowScrollDownButton, setIsShowScrollDownButton] = useState(false);

    const isToRenderScrollDownButton = isShowScrollDownButton && isScrollDownButtonActive;

    /**
     * An useEffect hook to monitor scroll position within a specified viewport container.
     */
    useEffect(() => {
      const viewPortContainer = scrollViewportRef.current;

      if (!viewPortContainer || !isScrollDownButtonActive) return undefined;

      const checkScrollPosition = () => {
        if (!scrollViewportRef.current) return;

        const { scrollHeight, clientHeight, scrollTop } = scrollViewportRef.current;

        const isBelowThreshold = scrollHeight - scrollTop - clientHeight > showScrollDownButtonTreshold;

        setIsShowScrollDownButton(isBelowThreshold);
      };

      viewPortContainer.addEventListener('scroll', checkScrollPosition);

      return () => viewPortContainer.removeEventListener('scroll', checkScrollPosition);
    }, [isScrollDownButtonActive, showScrollDownButtonTreshold]);

    return (
      <RadixScrollArea.Root
        ref={ref}
        className={classNames(scss.scrollAreaRoot, className, isAlwaysVisible && scss.isVisible)}
        type="scroll"
        {...props}
      >
        <RadixScrollArea.Viewport ref={scrollViewportRef} className={scss.viewport} data-element="viewport">
          {children}

          {isToRenderScrollDownButton && (
            <Button
              size="tiny"
              variant="secondary"
              icon={ArrowDownIcon}
              className={scss.scrollDownButton}
              onClick={scrollDown}
              {...restScrolldownButtonProps}
            />
          )}
        </RadixScrollArea.Viewport>

        <RadixScrollArea.Scrollbar className={scss.scrollarea} orientation="vertical" data-element="vertical-scrollarea">
          <RadixScrollArea.Thumb className={scss.scrollbar} data-element="vertical-scrollbar" />
        </RadixScrollArea.Scrollbar>

        {isWithHorizontalScrollbar && (
          <RadixScrollArea.Scrollbar
            className={scss.scrollarea}
            orientation="horizontal"
            data-element="horizontal-scrollarea"
          >
            <RadixScrollArea.Thumb className={scss.scrollbar} data-element="horizontal-scrollbar" />
          </RadixScrollArea.Scrollbar>
        )}
        <RadixScrollArea.Corner />
      </RadixScrollArea.Root>
    );
  },
);

ScrollArea.displayName = 'ScrollArea';
