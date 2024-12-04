import { useEffect, useRef } from 'react';

import { mergeRefs } from '../helpers';

import type { Ref } from 'react';

type FocusableElement = HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement;

/**
 * A hook that forces focus on a component when it mounts.
 */
export const useForceFocused = <T extends FocusableElement>({
  elementRef,
  isFocused,
}: {
  elementRef: Ref<T>;
  isFocused?: boolean;
}) => {
  const focusedElementRef = useRef<T>(null);
  const ref = mergeRefs<T>(focusedElementRef, elementRef);

  useEffect(() => {
    if (isFocused && focusedElementRef.current) {
      focusedElementRef.current.focus();
    }
  }, [isFocused]);

  return {
    ref,
  };
};
