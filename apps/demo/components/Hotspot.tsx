import * as Tooltip from '@radix-ui/react-tooltip';
import { RefObject, useEffect, useRef, useState } from 'react';
import { isTouchDevice } from 'shared';
import PopoverComponent from './Popover';
import TooltipComponent from './Tooltip';

interface HotspotProps {
  title: string;
  content: string;
  top: number;
  left: number;
  unit?: string;
  resizingCount: number;
  collisionBoundaryRef: RefObject<HTMLDivElement>;
  imageRef: RefObject<HTMLImageElement>;
  imageIsResizing: boolean;
}

const Hotspot = ({
  resizingCount,
  top,
  left,
  title,
  content,
  collisionBoundaryRef,
  imageRef,
  imageIsResizing,
}: HotspotProps) => {
  const hotspotRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!imageRef.current || !hotspotRef.current) return;
    const { offsetWidth, offsetHeight, naturalWidth, naturalHeight } = imageRef.current;
    const newX = (left * offsetWidth) / naturalWidth;
    const newY = (top * offsetHeight) / naturalHeight;
    setCoords({ x: newX, y: newY });
  }, [resizingCount, imageRef, top, left]);

  const Button = (
    <button
      ref={hotspotRef}
      className={`absolute w-6 h-6 border rounded-full border-white bg-blue-600/20 hover:cursor-pointer transition-opacity duration-300 top-0 left-0 ${
        imageIsResizing ? 'opacity-0' : ''
      }`}
      style={{
        transform: `translate(${coords.x}px, ${coords.y}px)`,
      }}
    />
  );

  if (!isTouchDevice()) {
    return (
      <TooltipComponent collisionBoundaryRef={collisionBoundaryRef} title={title} content={content}>
        {Button}
      </TooltipComponent>
    );
  }

  return (
    <PopoverComponent collisionBoundaryRef={collisionBoundaryRef} title={title} content={content}>
      {Button}
    </PopoverComponent>
  );
};

Hotspot.displayName = 'Hotspot';

export default Hotspot;
