import classNames from 'classnames';
import { Children } from 'react';

import { Divider } from '../Divider/Divider';

import scss from './MultiTrigger.module.scss';

import type { DivElement } from '../../types';
import type { ReactNode } from 'react';

export interface MultiTriggerProps extends DivElement {
  /**
   * Any data-* prop you need
   */
  [key: `data-${string}`]: string | undefined;
}

export const MultiTrigger = ({ className, children, ...dataProps }: MultiTriggerProps) => {
  const childArray = Children.toArray(children);

  const childrenWithDividers = childArray.reduce<ReactNode[]>((acc, child, index) => {
    const isLastChild = index === childArray.length - 1;
    acc.push(
      // eslint-disable-next-line react/no-array-index-key -- it's okay to use index as key here
      <div key={`multi-trigger-item-${index}`} data-element={`multi-trigger-item-${index}`}>
        {child}
      </div>,
    );

    if (!isLastChild) {
      acc.push(<Divider key={`divider-${100 + index}`} className={scss.divider} orientation="vertical" />);
    }

    return acc;
  }, []);

  return (
    <div className={classNames(scss.multiTriggerRoot, className)} {...dataProps}>
      {childrenWithDividers}
    </div>
  );
};
