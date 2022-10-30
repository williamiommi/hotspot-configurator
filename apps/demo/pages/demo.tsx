/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import Hotspot from '../components/Hotspot';
import data from '../fakedata.js';
import { useHotspotStore, useImageResizeCount } from 'shared';
import Navigation from '../components/Navigation';

const Demo: NextPage = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { imageIsResizing, imageResizeCount } = useImageResizeCount(imageRef);
  const field = useHotspotStore((state) => state.field);

  useEffect(() => {
    if (imageRef.current) setImageLoaded(true);
  }, []);

  return (
    <>
      <Navigation />
      <div
        ref={wrapperRef}
        className={`max-w-[1400px] mx-auto relative overflow-hidden transition-opacity duration-1000 opacity-0 ${
          imageLoaded ? 'opacity-100' : ''
        }`}
      >
        <div className="absolute inset-0 bg-black/20" />
        <img ref={imageRef} src="./image.jpeg" alt="demo image" />
        {field?.hotspots &&
          field.hotspots.map((hotspot) => (
            <Hotspot
              key={hotspot.id}
              title={hotspot.title}
              content={hotspot.content}
              left={hotspot.naturalX}
              top={hotspot.naturalY}
              resizingCount={imageResizeCount}
              collisionBoundaryRef={wrapperRef}
              imageRef={imageRef}
              imageIsResizing={imageIsResizing}
            />
          ))}
      </div>
    </>
  );
};

export default Demo;
