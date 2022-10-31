/* eslint-disable @next/next/no-img-element */
import { useRef } from 'react';
import { useHotspotStore } from '../lib';
import HotspotDraggableList from './HotspotDraggableList';

interface HotspotImageWrapperProps {}

export const HotspotImageWrapper: React.FC<HotspotImageWrapperProps> = () => {
  const imageRef = useRef<HTMLImageElement>(null);
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
      {isImageLoaded && <HotspotDraggableList imageRef={imageRef} />}
    </div>
  );
};
