import classNames from 'classnames';
import { Fragment } from 'react';

import { ellipsis } from '../../helpers';
import utility from '../../scss/utility.module.scss';
import { IconExtended } from '../IconExtended/IconExtended';
import { ChevronIcon } from '../icons';

import scss from './Breadcrumbs.module.scss';

import type { IconProps } from '../../types';
import type { ComponentType, FC, HTMLAttributes, ReactNode } from 'react';

const CRUMB_MAX_LENGTH = 25;
const DEFAULT_SHOWED_ITEMS_COUNT = 2;

export interface Breadcrumb extends HTMLAttributes<HTMLButtonElement> {
  id: string;
  item: ReactNode;
  icon?: ComponentType<IconProps>;
  iconProps?: IconProps;
}

export interface BreadcrumbsProps {
  items: Breadcrumb[];
  className?: string;
  itemsToShow?: {
    start: number;
    end: number;
  };
  itemMaxLength?: number;
  separatorIcon?: ComponentType<IconProps>;
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  className,
  items,
  itemsToShow: { start = DEFAULT_SHOWED_ITEMS_COUNT, end = DEFAULT_SHOWED_ITEMS_COUNT } = {},
  itemMaxLength = CRUMB_MAX_LENGTH,
  separatorIcon: Separator = ChevronIcon,
}) => {
  const itemsLength = items?.length;

  if (!items || itemsLength === 0) return null;

  const itemsInTheStart = items.slice(0, start);
  const itemsInTheEnd = items.slice(itemsLength - end);
  const isDeepNesting = itemsLength > start + end;

  const itemsToRender =
    itemsLength <= start + end
      ? items
      : [
          ...itemsInTheStart,
          ...(isDeepNesting ? [{ id: 'rest', item: '...', onClick: items.at(-1 - end)?.onClick }] : []),
          ...itemsInTheEnd,
        ];

  return (
    <div className={classNames(scss.breadcrumbsRoot, className)}>
      {itemsToRender.map(({ id, item, icon, iconProps, onClick, ...restProps }, index) => {
        const isFirstItem = index === 0;
        const isLastItem = index === itemsToRender.length - 1;

        return (
          <Fragment key={id}>
            {!isFirstItem && <IconExtended icon={Separator} data-element="breadcrumbs-separator-icon" />}

            <span className={scss.item}>
              <IconExtended icon={icon} {...iconProps} data-element="breadcrumbs-item-icon" />

              {!isLastItem && onClick && (
                <button
                  type="button"
                  className={classNames(utility.buttonReset, scss.link)}
                  data-element="breadcrumbs-link-item"
                  onClick={onClick}
                  {...restProps}
                >
                  {typeof item === 'string' ? ellipsis(item ?? '', itemMaxLength) : item}
                </button>
              )}

              {!isLastItem && !onClick && (
                <span
                  className={classNames(!isFirstItem && utility.ellipsis)}
                  data-element="breadcrumbs-text-item"
                  {...restProps}
                >
                  {item}
                </span>
              )}

              {isLastItem && (
                <span
                  className={classNames(scss.lastItem, utility.ellipsis)}
                  data-element="breadcrumbs-last-item"
                  {...restProps}
                >
                  {item}
                </span>
              )}
            </span>
          </Fragment>
        );
      })}
    </div>
  );
};
