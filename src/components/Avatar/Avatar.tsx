import classNames from 'classnames';
import ReactAvatar, { ConfigProvider } from 'react-avatar';

import scss from './Avatar.module.scss';

import type { CSSProperties, ReactNode } from 'react';

// Workaround for type error with React 18 and TS
declare module 'react-avatar' {
  interface ConfigProvider {
    children: ReactNode;
  }
}

function getInitials(name?: string): string | undefined {
  if (name?.includes(' ')) {
    const words = name.split(' ');
    return (
      words[0]?.trimStart().toLocaleUpperCase().charAt(0) || words[1]?.trimStart().toLocaleUpperCase().charAt(0) || 'A'
    );
  }
  return name?.trimStart().toLocaleUpperCase().charAt(0) || 'A';
}

const allowedColors: string[] = [
  '#3b39ff',
  '#396aff',
  '#0086ff',
  '#0097ef',
  '#00a9ea',
  '#00add9',
  '#04acc6',
  '#09b0b7',
  '#0eb6aa',
  '#10ac8e',
  '#12a874',
  '#14a550',
  '#2cad06',
  '#80b900',
  '#bdcf00',
  '#ddcc00',
  '#edbe00',
  '#f5ae00',
  '#f09600',
  '#ef8100',
  '#f37413',
  '#f35528',
  '#e04a49',
  '#df4769',
  '#db4688',
  '#d347a7',
  '#c74bc3',
  '#b751dc',
  '#a752ff',
  '#7644ff',
];

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  title?: string;
  className?: string;
  style?: CSSProperties;
  size?: number;
  isBordered?: boolean;
  /**
   * Any data-* prop you need
   */
  [key: `data-${string}`]: string | undefined;
}

export const Avatar = ({ src, alt, name, size = 24, title, className, style, isBordered, ...dataProps }: AvatarProps) => {
  const commonClassNames = classNames(scss.avatarRoot, className);

  if (!src) {
    return (
      <ConfigProvider colors={allowedColors}>
        <ReactAvatar
          className={classNames(commonClassNames, scss[`s${size}`])}
          size={String(size)}
          name={getInitials(name)}
          style={style}
          round
          title={title || alt}
        />
      </ConfigProvider>
    );
  }

  return (
    <img
      {...{
        src,
        alt,
        title: title || alt,
        height: size,
        width: size,
        className: classNames(commonClassNames, isBordered && scss.isBordered),
        style,
        loading: 'lazy',
        ...dataProps,
      }}
    />
  );
};
