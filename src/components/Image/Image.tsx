import * as RadixAspectRatio from '@radix-ui/react-aspect-ratio';
import classNames from 'classnames';

import scss from './Image.module.scss';

import type { HTMLAttributes, ImgHTMLAttributes, SourceHTMLAttributes } from 'react';

const DEFAULT_IMAGE_RESOLUTION = 1;

export type ImageListByResolution = { [DEFAULT_IMAGE_RESOLUTION]: string } & Record<number, string>;

const createSrcset = (images: ImageListByResolution): string => {
  const srcSetEntries = Object.entries(images).map(([resolution, url]) => {
    const resSuffix = resolution === '1' ? '1x' : `${resolution}x`;
    return `${url} ${resSuffix}`;
  });

  return srcSetEntries.join(', ');
};

export interface ImageItem extends SourceHTMLAttributes<HTMLSourceElement> {
  /**
   * The MIME type of the image
   */
  type: string;
  items: ImageListByResolution;
}

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  /**
   * The aspect ratio of the image accepts number, but you can pass it as w/h (e.g. 16/9) for better readability
   */
  ratio?: number;
  /**
   * Key is used as an image resolution multiplier
   * Example { 1: '/image.jpg', 1.5: '/image.jpg', 2: '/image.jpg', 3: '/image.jpg' }
   */
  items: ImageListByResolution;
  /**
   * Will render <picture /> element with <source /> elements
   */
  sources?: ImageItem[];
  /**
   * Props for the root element
   */
  wrapperProps?: HTMLAttributes<HTMLDivElement>;
  /**
   * A class name applied to the root element
   */
  className?: string;
  /**
   * Any data-* prop you need
   */
  [key: `data-${string}`]: string | undefined;
}

export const Image = ({ className, ratio, items, sources, wrapperProps, ...restProps }: ImageProps) => {
  const isWithSources = Array.isArray(sources) && sources.length > 0;

  const ImageComponent = () => (
    <img
      className={scss.image}
      src={items[DEFAULT_IMAGE_RESOLUTION]}
      srcSet={createSrcset(items)}
      {...restProps}
      loading="lazy"
    />
  );

  return (
    <div className={classNames(scss.imageRoot, className)} {...wrapperProps}>
      <RadixAspectRatio.Root ratio={ratio}>
        {!isWithSources && <ImageComponent />}

        {isWithSources && (
          <picture>
            {sources.map(({ type, items: sourceItems, ...source }) => (
              <source key={type} {...source} srcSet={createSrcset(sourceItems)} />
            ))}
            <ImageComponent />
          </picture>
        )}
      </RadixAspectRatio.Root>
    </div>
  );
};
