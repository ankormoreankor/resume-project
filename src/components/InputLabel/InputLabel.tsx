import classNames from 'classnames';
import { Fragment, type DetailedHTMLProps, type LabelHTMLAttributes } from 'react';

import { wrapConditionalObjectElement } from '../../helpers';
import utility from '../../scss/utility.module.scss';
import { IconExtended } from '../IconExtended/IconExtended';
import { InfoFilledSmallIcon } from '../icons';
import { Tooltip } from '../Tooltip/Tooltip';

import scss from './InputLabel.module.scss';

import type { DivElement } from '../../types';
import type { TooltipProps } from '../Tooltip/Tooltip';

export type LabelElement = DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;

export interface InputLabelProps extends DivElement {
  /**
   * Label text
   */
  text?: string;
  /**
   * Tooltip props. If provided, a tooltip icon will be rendered next to the label
   */
  tooltipProps?: TooltipProps;
  /**
   * If true, a "Optional" text will be rendered next to the label. Default is false
   */
  isOptional?: boolean;
  /**
   * Label props
   */
  labelProps?: LabelElement;
  /**
   * Any data-* prop you need
   */
  [key: `data-${string}`]: string | undefined;
}

export const InputLabel = ({
  text,
  children,
  className,
  isOptional = false,
  labelProps,
  tooltipProps,
  ...dataProps
}: InputLabelProps) => {
  const isLabelWrapped = Boolean(tooltipProps || isOptional);

  const LabelWrapper = isLabelWrapped ? 'div' : Fragment;

  return (
    <div className={classNames(scss.inputLabelRoot, className)} {...dataProps}>
      <LabelWrapper
        {...wrapConditionalObjectElement(
          { className: scss.labelWrapper, 'data-element': 'input-label-wrapper' },
          isLabelWrapped,
        )}
      >
        {!!text && (
          <label className={classNames(scss.label, utility.ellipsis)} {...labelProps}>
            {text}
          </label>
        )}

        {!!tooltipProps && (
          <Tooltip {...tooltipProps}>
            <IconExtended className={scss.labelIcon} icon={InfoFilledSmallIcon} data-element="input-label-icon" />
          </Tooltip>
        )}

        {isOptional && (
          <span className={scss.textIndicator} data-element="input-text-indicator">
            Optional
          </span>
        )}
      </LabelWrapper>

      {children}
    </div>
  );
};
