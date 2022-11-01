import { DragEndEvent, DragStartEvent, useDndMonitor } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { useHotspotStore } from '../store/hotspotStore';
import { IHotspot } from '../types/IHotspot';

const useHotspotDraggableBag = (
  label: number,
  hotspot: IHotspot,
  imageRef: React.RefObject<HTMLImageElement>,
  imageResizeCount: number
) => {
  const [coords, setCoords] = useState({ x: hotspot.x, y: hotspot.y });
  const [lastImageSize, setLastImageSize] = useState({
    offsetWidth: hotspot.appImageWidth,
    offsetHeight: hotspot.appImageHeight,
  });
  const [isDragging, setIsDragging] = useState(false);
  const updateHotspot = useHotspotStore((state) => state.updateHotspot);
  const highlightedHotspot = useHotspotStore((state) => state.highlightedHotspot);

  const onDragStart = ({ active }: DragStartEvent) => {
    if (active.id !== label) return;
    setIsDragging(true);
  };

  const onDragEnd = ({ active, delta }: DragEndEvent) => {
    if (active.id !== label) return;
    setIsDragging(false);
    setCoords({
      x: coords.x + delta.x,
      y: coords.y + delta.y,
    });
  };

  const onDoubleClickHandler = () => {
    updateHotspot({ ...hotspot, dark: !hotspot.dark });
  };

  // listen to coords and update positions and save hotspot
  useEffect(() => {
    const { offsetWidth, offsetHeight, naturalWidth, naturalHeight } = imageRef.current!;
    const naturalX = (coords.x * naturalWidth) / offsetWidth;
    const naturalY = (coords.y * naturalHeight) / offsetHeight;
    const percentageX = (naturalX / naturalWidth) * 100;
    const percentageY = (naturalY / naturalHeight) * 100;
    updateHotspot({
      ...hotspot,
      x: coords.x,
      y: coords.y,
      appImageWidth: offsetWidth,
      appImageHeight: offsetHeight,
      percentageX,
      percentageY,
      naturalX,
      naturalY,
    });
  }, [coords.x, coords.y]);

  useEffect(() => {
    const { offsetWidth, offsetHeight } = imageRef.current!;
    const newX = (coords.x * offsetWidth) / lastImageSize.offsetWidth;
    const newY = (coords.y * offsetHeight) / lastImageSize.offsetHeight;
    setLastImageSize({ offsetWidth, offsetHeight });
    setCoords({ x: newX, y: newY });
  }, [imageResizeCount]);

  useDndMonitor({ onDragStart, onDragEnd });

  return { coords, onDoubleClickHandler, isDragging, highlightedHotspot };
};

export default useHotspotDraggableBag;
