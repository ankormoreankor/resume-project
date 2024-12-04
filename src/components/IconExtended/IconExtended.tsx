import classNames from 'classnames';

import scss from './IconExtended.module.scss';

import type { CSSProperties, ComponentType, SVGProps } from 'react';

export interface IconExtendedProps extends SVGProps<SVGSVGElement> {
  icon?: ComponentType<SVGProps<SVGSVGElement>> | null;
  size?: number;
  padding?: number;
}

export const IconExtended = ({
  icon: Icon,
  size,
  padding = 0,
  strokeWidth,
  className,
  ...restProps
}: IconExtendedProps) => {
  if (!Icon) return null;

  return (
    <Icon
      aria-hidden="true"
      {...{ strokeWidth, ...restProps }}
      {...(size ? { width: size, height: size } : {})}
      className={classNames(scss.iconExtendedRoot, className, strokeWidth && scss.isWithCustomStrokeWidth)}
      style={
        { ...(size ? { '--icon-size': `${size}px` } : {}), padding: `${padding}px`, ...restProps?.style } as CSSProperties
      }
    />
  );
};
