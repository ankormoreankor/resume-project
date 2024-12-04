import { useEventListener } from './useEventListener';

import type { RefObject } from 'react';

interface UseClickOutsideProps {
  ref: RefObject<HTMLElement>;
  clickOutsideHandler: (event: Event) => void;
}

export const useClickOutside = ({ ref, clickOutsideHandler }: UseClickOutsideProps) => {
  useEventListener({
    eventType: 'click',
    eventHandler: (e: Event) => {
      if (ref.current == null || ref.current.contains(e.target as Node)) return;
      clickOutsideHandler(e);
    },
    element: document,
  });
};
