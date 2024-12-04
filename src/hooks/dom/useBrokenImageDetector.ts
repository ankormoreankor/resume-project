import { useCallback, useEffect, useState, useRef } from 'react';

export const useBrokenImageDetector = () => {
  // Track the broken state of the image
  const [isImageBroken, setIsImageBroken] = useState(false);

  // Hold reference to the image node
  const imageRef = useRef<HTMLImageElement | null>(null);

  const imageRefCallback = useCallback((node: HTMLImageElement | null) => {
    if (node) {
      node.addEventListener('error', () => setIsImageBroken(true));
      imageRef.current = node; // Store the node in the ref
    }
  }, []);

  useEffect(
    () => () => {
      if (imageRef.current) {
        // Remove the event listener when the component unmounts
        imageRef.current.removeEventListener('error', () => setIsImageBroken(true));
      }
    },
    [],
  );

  return {
    imageRef: imageRefCallback,
    isImageBroken,
  };
};
