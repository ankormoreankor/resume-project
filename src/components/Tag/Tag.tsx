import classNames from 'classnames';

import utility from '../../scss/utility.module.scss';
import { Button } from '../Button/Button';
import { CloseSmallIcon, PencilWithEraserIcon } from '../icons';
import { Tooltip } from '../Tooltip/Tooltip';

import scss from './Tag.module.scss';

import type { DivElement } from '../../types';
import type { TooltipProps } from '../Tooltip/Tooltip';
import type { PropsWithChildren, ReactNode } from 'react';

export interface TooltipContentItem {
  icon: ReactNode;
  text: ReactNode;
  id: string;
}

const TooltipContent = ({ data }: { data: TooltipContentItem[] }) => (
  <div className={scss.tooltipContent} data-element="tag-tooltip-content-container">
    {data.map(({ icon, text, id }) => (
      <div key={id} className={scss.tooltipContentItem}>
        {!!icon && <div data-element="tag-tooltip-content-icon">{icon}</div>}
        <span className={utility.ellipsis} data-element="tag-tooltip-content-text">
          {text}
        </span>
      </div>
    ))}
  </div>
);

export const tagSize = {
  xSmall: 'small',
  small: 'medium',
} as const;

export type TagSize = (typeof tagSize)[keyof typeof tagSize];

export interface TagProps extends PropsWithChildren<DivElement> {
  id?: string;
  /**
   * Tag class name
   */
  className?: string;
  /**
   * Tag size
   */
  size?: TagSize;
  /**
   * Tag left side content. Can be any react node
   */
  leftContent?: ReactNode;
  /**
   * If true, the tag will be filled
   * @default false
   */
  isFilled?: boolean;
  /**
   * If true, the tag will be hoverable and the buttons will be shown on hover
   */
  isHoverable?: boolean;
  state?: {
    /**
     * If true, the tag will be disabled
     * @default false
     */
    isDisabled?: boolean;
    /**
     * If true, text will have line though
     */
    isDeleted?: boolean;
  };
  /**
   * Tooltip props
   */
  tooltipProps?: TooltipProps;
  /**
   * Tooltip default content. This overrides tooltipProps['content'] prop and renders tooltip content as the list of items
   */
  tooltipContent?: TooltipContentItem[];
  /**
   * When passed the tag will have a delete button, that can accept a callback
   */
  onDelete?: (id?: string) => void;
  /**
   * When passed the tag will have a edit button, that can accept a callback
   */
  onEdit?: (id?: string) => void;
  /**
   * Any data-* prop you need
   */
  [key: `data-${string}`]: string | undefined;
}

export const Tag = ({
  id,
  size = tagSize.small,
  state: { isDisabled = false, isDeleted = false } = {},
  onEdit,
  isFilled = false,
  onDelete,
  children,
  className,
  isHoverable = false,
  leftContent,
  tooltipProps: { content, contentProps, ...restTooltipProps } = {},
  tooltipContent,
  ...restTagProps
}: TagProps) => {
  const isWithLeftContent = !!leftContent;
  const isDeletable = !!onDelete;
  const isEditable = !!onEdit;
  const isWithButtons = isDeletable || isEditable;

  return (
    <Tooltip
      {...restTooltipProps}
      content={tooltipContent ? <TooltipContent data={tooltipContent} /> : content}
      contentProps={contentProps ?? { side: 'top', sideOffset: 0 }}
      className={classNames(scss.tooltip, utility.ellipsis)}
      state={{ isDisabled, ...restTooltipProps.state }}
    >
      <div
        className={classNames(
          className,
          scss[size],
          scss.tagRoot,
          isFilled && scss.isFilled,
          isDisabled && scss.isDisabled,
          isWithLeftContent && scss.isWithLeftContent,
          isWithButtons && scss.isWithButtons,
          isHoverable && scss.isHoverable,
        )}
        data-tag-id={id}
        data-element="tag"
        {...restTagProps}
      >
        {isWithLeftContent && <div data-element="tag-left-content">{leftContent}</div>}

        {!!children && (
          <span className={classNames(scss.text, utility.ellipsis, isDeleted && scss.isDeleted)}>{children}</span>
        )}

        {isWithButtons && (
          <div className={classNames(scss.buttons)}>
            {isEditable && (
              <Button
                variant="transparent"
                size="tiny"
                className={scss.button}
                icon={PencilWithEraserIcon}
                onClick={() => onEdit(id)}
              />
            )}

            {isDeletable && (
              <Button
                variant="transparent"
                size="tiny"
                className={scss.button}
                icon={CloseSmallIcon}
                onClick={() => onDelete(id)}
              />
            )}
          </div>
        )}
      </div>
    </Tooltip>
  );
};
