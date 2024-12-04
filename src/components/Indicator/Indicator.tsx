import classNames from 'classnames';

import scss from './Indicator.module.scss';

export const indicatorSize = {
  tiny: 'tiny',
  small: 'small',
  medium: 'medium',
} as const;

export type IndicatorSize = (typeof indicatorSize)[keyof typeof indicatorSize];

export interface IndicatorProps {
  /**
   * A class name applied to the root element
   */
  className?: string;
  /**
   * Count of items
   */
  count?: number;
  /**
   * Max count of items
   */
  maxCount?: number;
  /**
   * Indicator size. Default is `medium`
   */
  size?: IndicatorSize;
  /**
   * Any data-* prop you need
   */
  [key: `data-${string}`]: string | undefined;
}

export const Indicator = ({ className, count, maxCount, size = 'medium', ...dataProps }: IndicatorProps) => {
  if (!count) return null;

  const realCount = maxCount && count > maxCount ? `${maxCount}+` : count;

  return (
    <div className={classNames(scss.indicatorRoot, scss[size], className)} {...dataProps}>
      {realCount}
    </div>
  );
};
