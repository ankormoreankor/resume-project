import classNames from 'classnames';

import scss from './InputFeedback.module.scss';

import type { DivElement } from '../../types';
import type { ReactNode } from 'react';

export const feedbackVariant = {
  primary: 'primary',
  destructive: 'destructive',
} as const;

export type FeedbackVariant = (typeof feedbackVariant)[keyof typeof feedbackVariant];

export interface InputFeedbackProps extends DivElement {
  /**
   * Feedback text
   */
  text?: ReactNode;
  /**
   * Feedback variant. Default is "primary"
   */
  variant?: FeedbackVariant;
  state?: {
    /**
     * Prop to know that feedback is rendered for the disabled element, so it should be styled accordingly
     */
    isDisabled?: boolean;
  };
  /**
   * Any data-* prop you need
   */
  [key: `data-${string}`]: string | undefined;
}

export const InputFeedback = ({
  text,
  state: { isDisabled } = {},
  variant = feedbackVariant.primary,
  children,
  className,
  ...dataProps
}: InputFeedbackProps) => {
  return (
    <div className={classNames(scss.inputFeedbackRoot, className)} {...dataProps}>
      {children}

      {!!text && (
        <span
          className={classNames(scss.feedback, scss[variant], isDisabled && scss.isDisabled)}
          data-element="input-feedback"
        >
          {text}
        </span>
      )}
    </div>
  );
};
