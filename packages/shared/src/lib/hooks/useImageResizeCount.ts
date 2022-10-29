import { useEffect, useState } from 'react';
import { debounce } from '../utils';

export const useImageResizeCount = (imageRef: React.RefObject<HTMLImageElement>) => {
  const [imageResizeCount, setImageResizeCount] = useState(0);
  const [imageIsResizing, setImageIsResizing] = useState(false);

  useEffect(() => {
    if (!imageRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      setImageIsResizing(true);
      setImageResizeCount((prev) => prev + 1);
    });

    const resizeObserverDebounced = new ResizeObserver(() => {
      debounce(() => {
        setImageIsResizing(false);
      }, 300)();
    });
    resizeObserver.observe(imageRef.current);
    resizeObserverDebounced.observe(imageRef.current);
    return () => {
      resizeObserver.disconnect();
      resizeObserverDebounced.disconnect();
    };
  }, [imageRef]);

  return { imageIsResizing, imageResizeCount };
};
