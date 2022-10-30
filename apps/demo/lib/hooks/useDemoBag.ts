import { useEffect } from 'react';
import { useHotspotStore } from 'shared';

const useDemoBag = () => {
  const removeHotspot = useHotspotStore((state) => state.removeHotspot);
  const setIsImageLoaded = useHotspotStore((state) => state.setIsImageLoaded);

  const removeHotspotHandler = (id: string) => {
    removeHotspot(id);
  };

  useEffect(() => {
    return () => {
      setIsImageLoaded(false);
    };
  }, []);

  return { removeHotspotHandler };
};

export default useDemoBag;
