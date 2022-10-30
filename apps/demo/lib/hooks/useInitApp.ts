import { useEffect } from 'react';
import { useHotspotStore } from 'shared';

export const useInitDemo = () => {
  const setMedia = useHotspotStore((state) => state.setMedia);
  const setField = useHotspotStore((state) => state.setField);
  const setIsAdmin = useHotspotStore((state) => state.setIsAdmin);
  useEffect(() => {
    setMedia({ status: 'published', title: 'Coffee Love', url: './image.jpeg' });
    setField({ assetId: 'xxx', hotspots: [] });
    setIsAdmin(false);
  }, []);
};
