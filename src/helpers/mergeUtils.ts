import type { MutableRefObject, RefCallback, RefObject } from 'react';

type Ref<T> = RefCallback<T> | RefObject<T> | null;

export const mergeRefs =
  <T>(...refs: Ref<T>[]): RefCallback<T> =>
  (inst: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(inst);
      } else if (ref && 'current' in ref) {
        // Using type assertion to bypass TypeScript error

        (ref as MutableRefObject<T | null>).current = inst;
      }
    });
  };

/**
 * Helps to construct conditional objects like this: {a: b, ...(some ? c : {}), z: x}
 */
export const wrapConditionalObjectElement = <T extends Record<string, unknown>>(element: T, isPassing: boolean) => {
  if (!element || !isPassing) {
    return {} as T;
  }

  return element;
};

/**
 * Helps to construct conditional arrays like this: [item1, condition && item2, item3].filter(item => !!item)
 */
export const wrapConditionalArrayElements = <T>(elements: T[], isPassing: boolean) => {
  if (!elements || !isPassing) {
    return [];
  }

  return elements;
};
