import classNames from 'classnames';
import { forwardRef, type ReactNode, type SourceHTMLAttributes } from 'react';

import scss from './Video.module.scss';

import type { VideoElement } from '../../types';

export interface VideoItem extends SourceHTMLAttributes<HTMLSourceElement> {
  /**
   * The MIME type of the video
   */
  type: string;
}

export interface VideoProps extends VideoElement {
  /**
   * A list of video sources. Put items in order from the most optimized to the least one (example: 0 = av1, 1 = webm, 2 = mp4)
   */
  sources: VideoItem[];
  /**
   * The video source that will be used by default if the browser doesn't support the first one
   */
  defaultSource: string;
  /**
   * Track element props
   */
  trackProps?: SourceHTMLAttributes<HTMLTrackElement>;
  /**
   * A custom message for browsers that don't support video
   */
  videoNotSupportedMessage?: ReactNode;
  /**
   * Any data-* prop you need
   */
  [key: `data-${string}`]: string | undefined;
}

/**
 * The video component is muted by default
 * Props can be found here - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
 */
export const Video = forwardRef<HTMLVideoElement, VideoProps>(
  ({ className, trackProps, sources, defaultSource, ...restProps }, ref) => {
    return (
      <video muted className={classNames(scss.videoRoot, className)} {...restProps} ref={ref}>
        {sources.map((sourceProps) => (
          <source key={sourceProps.type} {...sourceProps} />
        ))}

        {!!trackProps && <track {...trackProps} />}

        <p>
          Your browser doesn&apos;t support HTML video. Here is a
          <a href={defaultSource} download={defaultSource}>
            link to the video
          </a>{' '}
          instead.
        </p>
      </video>
    );
  },
);

Video.displayName = 'Video';
