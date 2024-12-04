import classNames from 'classnames';

import scss from './Divider.module.scss';

const dividerVariant = {
  line: 'line',
  dashed: 'dashed',
} as const;

export type DividerVariant = (typeof dividerVariant)[keyof typeof dividerVariant];

const dividerOrientation = {
  vertical: 'vertical',
  horizontal: 'horizontal',
} as const;

export type DividerOrientation = (typeof dividerOrientation)[keyof typeof dividerOrientation];

export interface DividerProps {
  /**
   * The class name to apply to the root element
   */
  className?: string;
  /**
   * The text to display in the center of divider
   * Didn't work with dashed variant
   */
  text?: string;
  /**
   * Divider variant
   */
  variant?: DividerVariant;
  /**
   * Divider orientation
   */
  orientation?: DividerOrientation;
}

export const Divider = ({ className, text, variant = 'line', orientation = 'horizontal' }: DividerProps) => {
  const isLine = variant === dividerVariant.line;
  const isDashed = variant === dividerVariant.dashed;

  return (
    <div className={classNames(scss.dividerRoot, className, scss[variant], scss[orientation])} role="separator">
      {isLine && !!text && <span data-element="divider-text">{text}</span>}

      {isDashed && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={scss.dashedLine}
          width="100%"
          height="2"
          role="presentation"
          data-element="divider-dashed-line"
        >
          <defs>
            <pattern id="dottedPattern" patternUnits="userSpaceOnUse" width="7" height="2">
              <path stroke="#E1E3E7" strokeDasharray="2,5" d="M0 1 h7" />
            </pattern>
          </defs>
          <rect width="100%" height="2" fill="url(#dottedPattern)" />
        </svg>
      )}
    </div>
  );
};
