import { RefObject, useEffect, useLayoutEffect, useState } from 'react';
import { debounce } from 'shared';

const useResizeObserverCounter = <T extends HTMLElement>(el: RefObject<T>) => {
  const [resizingCount, setResizingCount] = useState(0);
  useEffect(() => {
    let resizeObserver: ResizeObserver;
    if (el.current) {
      resizeObserver = new ResizeObserver(() => {
        setResizingCount((prev) => prev + 1);
      });
      resizeObserver.observe(el.current);
    }
    return () => {
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [el]);
  return resizingCount;
};

export default useResizeObserverCounter;
