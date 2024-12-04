import * as RadixProgress from '@radix-ui/react-progress';
import cx from 'classnames';
import { useState, useEffect } from 'react';

import scss from './Progress.module.scss';

export interface ProgressProps extends RadixProgress.ProgressProps {
  className?: string;
  /**
   * @description completion is a percent (%) of total count
   * @default 0
   * @example if we pass 45, then progress will be filled up to 45%
   */
  completion: number;
  /**
   * @description timer is a time needed for animation to fill the progress bar in milliseconds
   * @default 500
   */
  timer?: number;
  /**
   * @description Controls whether the progress bar fills with animation.
   * @default true
   */
  isHasAnimation?: boolean;
}

export const Progress = ({ className, completion = 0, timer = 500, isHasAnimation = true, ...props }: ProgressProps) => {
  const [progress, setProgress] = useState(isHasAnimation ? 0 : completion);

  useEffect(() => {
    const normalizedCompletion = completion > 100 ? 100 : completion;
    if (!isHasAnimation) return setProgress(completion);
    const timeout = setTimeout(() => setProgress(normalizedCompletion), timer);
    return () => clearTimeout(timeout);
  }, [completion, timer, isHasAnimation]);

  return (
    <RadixProgress.Root
      className={cx(scss.ProgressRoot, className)}
      value={progress}
      {...props}
      data-testid="progress-indicator"
    >
      <RadixProgress.Indicator
        className={scss.ProgressIndicator}
        style={{ transform: `translateX(-${100 - progress}%)` }}
        data-progress-indicator
      />
    </RadixProgress.Root>
  );
};
