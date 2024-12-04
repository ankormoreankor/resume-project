import classNames from 'classnames';
import { forwardRef, useEffect, useRef, useState } from 'react';

import { mergeRefs } from '../../helpers';

import scss from './ResizableTextarea.module.scss';

import type { TextAreaElement } from '../../types';
import type { ChangeEvent } from 'react';

export interface ResizableTextareaProps extends Omit<TextAreaElement, 'rows'> {
  /**
   * Min number of lines
   * It number will be multiplied by the textarea line height to get the max height.
   */
  minRows?: number;
  /**
   * Max number of rows
   * It number will be multiplied by the textarea line height to get the max height.
   */
  maxRows?: number | 'maximum';
  state?: {
    isDisabled?: boolean;
  };
  /**
   * Any data-* prop you need
   */
  [key: `data-${string}`]: string | undefined;
}

/**
 * Resizable textarea component for things like title and description.
 * Can be prevented from resizing.
 * Uses css trick based on the article below.
 * https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/
 *
 * When is not focused, reduces it's height
 */
export const ResizableTextarea = forwardRef(
  (
    {
      className,
      minRows = 1,
      maxRows = 'maximum',
      state: { isDisabled = false } = {},
      onInput,
      defaultValue,
      value,
      ...props
    }: ResizableTextareaProps,
    ref,
  ) => {
    const [textValue, setTextValue] = useState(defaultValue || value || '');
    const [lineHeight, setLineHeight] = useState('');
    const [cursor, setCursor] = useState<number | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const isFixedCountOfLines = typeof maxRows === 'number';

    const textareaMaxHeight = isFixedCountOfLines ? `${parseFloat(lineHeight) * maxRows}px` : 'none';
    const textareaMinHeight = `${parseFloat(lineHeight) * minRows}px`;

    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setCursor(e.target.selectionStart);
      setTextValue(e.target.value);
      onInput?.(e);
    };

    // Sets the computed line height of the textarea's text
    useEffect(() => {
      if (!textareaRef.current) return;

      const style = window.getComputedStyle(textareaRef.current);
      setLineHeight(style.lineHeight);
    }, []);

    // Sets the default value if it is passed
    useEffect(() => {
      const setCursorPosition = () => {
        setTimeout(() => {
          textareaRef.current?.setSelectionRange(cursor, cursor);
        }, 0);
      };

      if (defaultValue !== undefined) {
        setTextValue(defaultValue);
        setCursorPosition();
      }
      if (value !== undefined) {
        setTextValue(value);
        setCursorPosition();
      }
    }, [defaultValue, value, textareaRef, cursor]);

    return (
      <div
        className={classNames(scss.resizableTextareaRoot, className)}
        style={
          {
            ...props.style,
            '--max-height': textareaMaxHeight,
            '--min-height': textareaMinHeight,
          } as React.CSSProperties
        }
        data-replicated-value={textValue || props.placeholder}
        data-element="resizable-textarea-container"
      >
        <textarea
          {...props}
          rows={minRows}
          ref={mergeRefs(textareaRef, ref)}
          className={scss.textarea}
          onInput={handleInput}
          value={textValue}
          disabled={isDisabled}
          data-element="resizable-textarea"
        />
      </div>
    );
  },
);

ResizableTextarea.displayName = 'ResizableTextarea';
