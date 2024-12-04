import classNames from 'classnames';
import { forwardRef } from 'react';

import utility from '../../scss/utility.module.scss';

import scss from './ActionCard.module.scss';

import type { HTMLAttributes, ReactNode } from 'react';

export interface ActionCardProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * The title of the card
   */
  title?: string;
  /**
   * The description of the card
   */
  description?: string | ReactNode;
  descriptionClass?: string;
  /**
   * If true, the card will be disabled. Defaults to false
   */
  isDisabled?: boolean;
}

export const ActionCard = forwardRef<HTMLButtonElement, ActionCardProps>(
  ({ children, className, title, description, isDisabled = false, descriptionClass, ...restProps }, ref) => {
    return (
      <button
        {...restProps}
        ref={ref}
        type="button"
        className={classNames(scss.actionCardRoot, utility.buttonReset, className, isDisabled && scss.isDisabled)}
        disabled={isDisabled}
        data-element="action-card"
      >
        {children}

        {!!title && (
          <span className={scss.title} data-element="action-card-title">
            {title}
          </span>
        )}

        {!!description && <span className={descriptionClass}>{description}</span>}
      </button>
    );
  },
);

ActionCard.displayName = 'ActionCard';
