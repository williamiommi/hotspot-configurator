/* eslint-disable @next/next/no-img-element */
import { DndContext } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { useRef } from 'react';
import { useHotspotStore, useImageResizeCount } from '../lib';
import HotspotDraggable from './HotspotDraggable';

interface HotspotImageWrapperProps {}

export const HotspotImageWrapper: React.FC<HotspotImageWrapperProps> = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const { imageResizeCount } = useImageResizeCount(imageRef);
  const isImageLoaded = useHotspotStore((state) => state.isImageLoaded);
  const highlightedHotspot = useHotspotStore((state) => state.highlightedHotspot);
  const media = useHotspotStore((state) => state.media);
  const field = useHotspotStore((state) => state.field);
  const setIsImageLoaded = useHotspotStore((state) => state.setIsImageLoaded);
  return (
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
      <DndContext modifiers={[restrictToParentElement]}>
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
      </DndContext>
    </div>
  );
};
