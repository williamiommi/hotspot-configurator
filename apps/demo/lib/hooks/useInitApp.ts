import { useEffect } from 'react';
import { useHotspotStore } from 'shared';
import sampleData from '../sampleData.json';

export const useInitDemo = () => {
  const setMedia = useHotspotStore((state) => state.setMedia);
  const setField = useHotspotStore((state) => state.setField);
  const setIsAdmin = useHotspotStore((state) => state.setIsAdmin);
  useEffect(() => {
    setMedia({ status: 'published', title: 'Coffee Love', url: './image.jpeg' });
    setField(sampleData);
    setIsAdmin(false);
  }, []);
};
