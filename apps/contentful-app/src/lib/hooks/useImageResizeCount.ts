import { useEffect, useState } from 'react';
import { debounce } from 'shared';

const useImageResizeCount = (imageRef: React.RefObject<HTMLImageElement>) => {
  const [imageResizeCount, setImageResizeCount] = useState(0);

  useEffect(() => {
    if (!imageRef.current) return;
    const resizeObserver = new ResizeObserver(
      debounce(() => {
        setImageResizeCount((prev) => prev + 1);
      }, 300)
    );
    resizeObserver.observe(imageRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [imageRef]);

  return imageResizeCount;
};

export default useImageResizeCount;
