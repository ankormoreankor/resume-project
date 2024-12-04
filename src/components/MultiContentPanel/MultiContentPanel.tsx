import * as RadixTabs from '@radix-ui/react-tabs';
import classNames from 'classnames';

import utility from '../../scss/utility.module.scss';
import { Divider } from '../Divider/Divider';
import { IconExtended } from '../IconExtended/IconExtended';
import { ChevronRightIcon } from '../icons';
import { ScrollArea } from '../ScrollArea/ScrollArea';

import scss from './MultiContentPanel.module.scss';

import type { ReactNode } from 'react';

export interface MultiContentPanelItem {
  /**
   * A unique value for the tab
   */
  value: string;
  /**
   * The title of the tab
   */
  title: ReactNode;
  /**
   * The content of the tab
   */
  content: ReactNode;
}

export interface MultiContentPanelProps extends RadixTabs.TabsProps {
  /**
   * The items to display in the panel
   */
  items: MultiContentPanelItem[];
  /**
   * The height of the panel. Important prop that should be set to make the panel scrollable
   */
  height?: number;
}

export const MultiContentPanel = ({ className, items = [], height = 300, ...restProps }: MultiContentPanelProps) => {
  return (
    <RadixTabs.Root
      className={classNames(scss.multiContentPanelRoot, className)}
      {...restProps}
      orientation="vertical"
      data-element="multi-content-panel"
    >
      <RadixTabs.List asChild>
        <ScrollArea style={{ height }}>
          <div className={scss.triggers} data-element="multi-content-panel-trigger-list">
            {items.map(({ value, title }) => (
              <RadixTabs.Trigger
                key={value}
                value={value}
                className={classNames(utility.buttonReset, scss.trigger)}
                data-element="multi-content-panel-trigger"
              >
                {title} <IconExtended icon={ChevronRightIcon} className={scss.selectedItemMarker} />
              </RadixTabs.Trigger>
            ))}
          </div>
        </ScrollArea>
      </RadixTabs.List>

      <Divider orientation="vertical" className={scss.divider} />

      <ScrollArea style={{ height }}>
        <div className={scss.content} data-element="multi-content-panel-content">
          {items.map(({ value, content }) => (
            <RadixTabs.Content key={value} value={value} data-element="multi-content-panel-content-tab">
              {content}
            </RadixTabs.Content>
          ))}
        </div>
      </ScrollArea>
    </RadixTabs.Root>
  );
};
