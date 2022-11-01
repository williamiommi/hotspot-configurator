import { DndContext } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { useHotspotStore, useImageResizeCount } from '../lib';
import HotspotDraggable from './HotspotDraggable';

interface HotspotDraggableListProps {
  imageRef: React.RefObject<HTMLImageElement>;
}

const HotspotDraggableList: React.FC<HotspotDraggableListProps> = ({ imageRef }) => {
  const { imageIsResizing, imageResizeCount } = useImageResizeCount(imageRef);
  const field = useHotspotStore((state) => state.field);

  if (!field?.hotspots || field.hotspots.length === 0) return null;

  return (
    <DndContext modifiers={[restrictToParentElement]}>
      {field.hotspots.map((hotspot, index) => (
        <HotspotDraggable
          key={hotspot.id}
          hotspot={hotspot}
          label={index + 1}
          imageRef={imageRef}
          imageIsResizing={imageIsResizing}
          imageResizeCount={imageResizeCount}
        />
      ))}
    </DndContext>
  );
};

export default HotspotDraggableList;
