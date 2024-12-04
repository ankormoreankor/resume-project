import classNames from 'classnames';

import { IconExtended } from '../IconExtended/IconExtended';
import { InfoFilledIcon } from '../icons';

import scss from './Remark.module.scss';

import type { IconExtendedProps } from '../IconExtended/IconExtended';

const remarkVariant = {
  default: 'default',
} as const;

export type RemarkVariant = (typeof remarkVariant)[keyof typeof remarkVariant];

export interface RemarkProps {
  /**
   * A class name applied to the root element
   */
  className?: string;
  variant?: RemarkVariant;
  text?: string;
  icon?: IconExtendedProps['icon'];
  iconProps?: Omit<IconExtendedProps, 'icon'>;
  /**
   * Any data-* prop you need
   */
  [key: `data-${string}`]: string | undefined;
}

export const Remark = ({
  className,
  variant = remarkVariant.default,
  text,
  icon = InfoFilledIcon,
  iconProps,
  ...dataProps
}: RemarkProps) => {
  return (
    <p className={classNames(scss.remarkRoot, className, scss[variant])} {...dataProps} role="note">
      <IconExtended size={16} {...iconProps} icon={icon} /> {text}
    </p>
  );
};
