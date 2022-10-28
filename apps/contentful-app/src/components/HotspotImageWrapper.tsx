import { DndContext } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { useRef } from 'react';
import useImageResizeCount from '../lib/hooks/useImageResizeCount';
import useHotspotStore from '../lib/store/hotspotStore';
import HotspotAddButton from './HotspotAddButton';
import HotspotDraggable from './HotspotDraggable';
import HotspotImageActions from './HotspotImageActions';

interface HotspotImageWrapperProps {}

const HotspotImageWrapper: React.FC<HotspotImageWrapperProps> = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const imageResizeCount = useImageResizeCount(imageRef);
  const { isImageLoaded, highlightedHotspot, media, field, setIsImageLoaded } = useHotspotStore(
    (state) => ({
      highlightedHotspot: state.highlightedHotspot,
      media: state.media,
      field: state.field,
      isImageLoaded: state.isImageLoaded,
      setIsImageLoaded: state.setIsImageLoaded,
    })
  );
  return (
    <DndContext modifiers={[restrictToParentElement]}>
      <HotspotImageActions />
      <div className="relative">
        <div
          className={`absolute inset-0 bg-slate-800/60 transition-opacity duration-500 ${
            highlightedHotspot ? 'opacity-1' : 'opacity-0'
          }`}
        ></div>
        {media?.url && (
          <img
            ref={imageRef}
            src={media.url}
            alt={media.title}
            className="max-w-full"
            onLoad={() => setIsImageLoaded(true)}
          />
        )}
        {isImageLoaded &&
          field?.hotspots &&
          field.hotspots.map((hotspot, index) => (
            <HotspotDraggable
              key={hotspot.id}
              hotspot={hotspot}
              label={index + 1}
              imageRef={imageRef}
              imageResizeCount={imageResizeCount}
            />
          ))}
      </div>
      <HotspotAddButton />
    </DndContext>
  );
};

export default HotspotImageWrapper;
