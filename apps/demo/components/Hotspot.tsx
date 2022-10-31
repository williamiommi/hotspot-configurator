import * as Tooltip from '@radix-ui/react-tooltip';
import { RefObject, useEffect, useRef, useState } from 'react';

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
    const newX = (left * imageRef.current.offsetWidth) / imageRef.current.naturalWidth;
    const newY = (top * imageRef.current.offsetHeight) / imageRef.current.naturalHeight;
    setCoords({ x: newX, y: newY });
  }, [resizingCount, imageRef, top, left]);

  return (
    <Tooltip.Provider delayDuration={100}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <i
            ref={hotspotRef}
            className={`absolute w-6 h-6 border rounded-full border-white bg-blue-600/20 hover:cursor-pointer transition-opacity duration-300 top-0 left-0 ${
              imageIsResizing ? 'opacity-0' : ''
            }`}
            style={{
              transform: `translate(${coords.x}px, ${coords.y}px)`,
            }}
          />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            collisionBoundary={collisionBoundaryRef.current}
            collisionPadding={2}
            className="flex flex-col bg-white p-2 rounded-lg max-w-xs shadow-xl"
          >
            <h3 className="font-bold">{title}</h3>
            <p>{content}</p>
            <Tooltip.Arrow className="fill-white" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

Hotspot.displayName = 'Hotspot';

export default Hotspot;
