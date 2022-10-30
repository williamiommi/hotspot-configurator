import { useHotspotStore } from 'shared';

const useDemoBag = () => {
  const removeHotspot = useHotspotStore((state) => state.removeHotspot);

  const removeHotspotHandler = (id: string) => {
    removeHotspot(id);
  };

  return { removeHotspotHandler };
};

export default useDemoBag;
