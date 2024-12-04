import classNames from 'classnames';

import scss from './Badge.module.scss';

import type { SpanElement } from '../../types';

export const badgeType = {
  primary: 'primary',
  primaryFilled: 'primaryFilled',
  secondary: 'secondary',
  secondaryFilled: 'secondaryFilled',
  error: 'error',
  errorFilled: 'errorFilled',
  blue: 'blue',
  lightBlue: 'lightBlue',
} as const;

type BadgeType = (typeof badgeType)[keyof typeof badgeType];

export const badgeSize = {
  tiny: 'tiny',
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

type BadgeSize = (typeof badgeSize)[keyof typeof badgeSize];

export interface BadgeProps extends SpanElement {
  className?: string;
  type?: BadgeType;
  size?: BadgeSize;
}

export const Badge = ({ className, children, type = 'primary', size = 'small', ...props }: BadgeProps) => (
  <span className={classNames(className, scss.badgeRoot, scss[type], scss[size])} {...props}>
    {children}
  </span>
);
