import { useEffect, useRef } from 'react';

interface UseEventListenerProps<T extends EventTarget = EventTarget> {
  eventType: keyof WindowEventMap;
  eventHandler: (e: Event) => void;
  element?: T | Window;
}

export const useEventListener = <T extends EventTarget = EventTarget>({
  eventType,
  eventHandler,
  element = window as T | Window,
}: UseEventListenerProps<T>) => {
  const eventHandlerRef = useRef(eventHandler);

  useEffect(() => {
    eventHandlerRef.current = eventHandler;
  }, [eventHandler]);

  useEffect(() => {
    if (!element) return undefined;

    const handler = (e: Event) => {
      eventHandlerRef.current(e);
    };

    element.addEventListener(eventType, handler);

    return () => {
      element.removeEventListener(eventType, handler);
    };
  }, [eventType, element]);
};
