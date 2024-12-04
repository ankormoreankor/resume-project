import { useEffect, useState, useRef } from 'react';

const DEFAULT_KEY_PRESS_DELAY = 300;

export const KeyPressActionTypes = {
  keypress: 'keypress',
  keyhold: 'keyhold',
} as const;

export type KeyPressActionType = keyof typeof KeyPressActionTypes;

export interface UseKeyPressListenerProps {
  keys: string[];
  callback: (e: KeyboardEvent) => void;
  actionType?: KeyPressActionType;
  delay?: number;
}

export const useKeyPressListener = ({
  keys,
  callback,
  actionType = 'keypress',
  delay = DEFAULT_KEY_PRESS_DELAY,
}: UseKeyPressListenerProps): void => {
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const holdTimers = useRef<{ [key: string]: ReturnType<typeof setTimeout> | null }>({});

  const handleKeyDown = (event: KeyboardEvent) => {
    if (keys.includes(event.key)) {
      if (actionType === 'keyhold') {
        holdTimers.current[event.key] = setTimeout(() => {
          callback(event);
          setPressedKeys((prevKeys) => prevKeys.filter((key) => key !== event.key));
        }, delay);
      }
      setPressedKeys((prevKeys) => [...prevKeys, event.key]);
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (keys.includes(event.key)) {
      const timer = holdTimers.current[event.key];
      if (actionType === 'keyhold' && timer) {
        clearTimeout(timer);
        holdTimers.current[event.key] = null;
      }
      if (actionType === 'keypress' && keys.every((key) => pressedKeys.includes(key))) {
        callback(event);
      }
      setPressedKeys((prevKeys) => prevKeys.filter((key) => key !== event.key));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const currentHoldTimers = holdTimers.current;

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      Object.values(currentHoldTimers).forEach((timer) => {
        if (timer) clearTimeout(timer);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keys, callback, actionType, delay, pressedKeys]);
};
