/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import { useRef } from 'react';
import Hotspot from '../components/Hotspot';
import data from '../fakedata.js';
import useResizeObserverCounter from '../lib/hooks/useResizeObserverCounter';

const Demo: NextPage = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const resizingCount = useResizeObserverCounter(imageRef);

  return (
    <>
      <div ref={wrapperRef} className="max-w-full mx-auto relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <img ref={imageRef} src="./image2.jpeg" alt="demo image" />
        {data.hotspots.map((hotspot) => (
          <Hotspot
            key={hotspot.id}
            title={hotspot.title}
            content={hotspot.content}
            x1={hotspot.x || 0}
            y1={hotspot.y || 0}
            left={hotspot.naturalX}
            top={hotspot.naturalY}
            resizingCount={resizingCount}
            collisionBoundaryRef={wrapperRef}
            imageRef={imageRef}
          />
        ))}
      </div>
      <p>{resizingCount}</p>
      <div className="my-[3000px]">&nbsp;</div>
    </>
  );
};

export default Demo;
