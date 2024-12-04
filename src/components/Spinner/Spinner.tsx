import classNames from 'classnames';

import { IconExtended } from '../IconExtended/IconExtended';
import { SpinnerIcon } from '../icons';

import scss from './Spinner.module.scss';

export interface SpinnerProps {
  /**
   * Class name applied to the root element.
   */
  className?: string;
  /**
   * Text to be displayed next to the spinner
   */
  text?: string;
  /**
   * Icon Size
   */
  size?: number;
  /**
   * Any data-* prop you need
   */
  [key: `data-${string}`]: string | undefined;
}

export const Spinner = ({ className, text, size, ...dataProps }: SpinnerProps) => (
  <div className={classNames(scss.spinnerRoot, className)} {...dataProps}>
    <IconExtended icon={SpinnerIcon} className={scss.icon} size={size} />

    {text && <span data-element="spinner-text">{text}</span>}
  </div>
);
