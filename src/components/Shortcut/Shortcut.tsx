import classNames from 'classnames';

import scss from './Shortcut.module.scss';

import type { CSSProperties } from 'react';

export interface ShortcutProps {
  values: string[];
  className?: string;
  /**
   * @description If true, the word 'then' will be color='white'
   * @default false, color='black'
   */
  isThenWordWhite?: boolean;
  /**
   * @description If true, the shortcut background-color='black' and color='white'
   * @default false, background-color='white' and color='black'
   */
  isShortcutBlack?: boolean;
  /**
   * @description Size of the shortcut
   * @default 20
   */
  size?: 14 | 16 | 18 | 20;
}

const paddingByItem: Map<string, { bottom?: number }> = new Map([['@', { bottom: 2 }]]);

export const Shortcut = ({ values, className, isThenWordWhite, isShortcutBlack = false, size = 20 }: ShortcutProps) => (
  <div className={classNames(scss.shortcutRoot, className)}>
    {values.map((item, index) => {
      const isThenWordVisible = item.toLowerCase() === 'then';
      const itemPadding = paddingByItem.get(item);

      return (
        <kbd
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className={classNames(
            scss.shortcut,
            !isThenWordVisible && isShortcutBlack && scss.isBlack,
            isThenWordVisible && scss.isThen,
            isThenWordVisible && isThenWordWhite && scss.isWhite,
            scss[`size${size}`],
          )}
          style={
            {
              '--size': `${size}px`,
              paddingBottom: itemPadding?.bottom ? `${itemPadding?.bottom}px` : undefined,
            } as CSSProperties
          }
        >
          {item}
        </kbd>
      );
    })}
  </div>
);
