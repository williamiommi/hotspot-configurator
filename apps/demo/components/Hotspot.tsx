import * as Tooltip from '@radix-ui/react-tooltip';
import { MotionConfig } from 'framer-motion';
import { forwardRef, Ref, RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface HotspotProps {
  title: string;
  content: string;
  x1: number;
  y1: number;
  top: number;
  left: number;
  unit?: string;
  resizingCount: number;
  collisionBoundaryRef: RefObject<HTMLDivElement>;
  imageRef: RefObject<HTMLImageElement>;
}

const Hotspot = ({
  resizingCount,
  x1,
  y1,
  top,
  left,
  unit = 'px',
  title,
  content,
  collisionBoundaryRef,
  imageRef,
}: HotspotProps) => {
  const hotspotRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [boundary, setBoundary] = useState<HTMLDivElement>();
  useEffect(() => {
    if (collisionBoundaryRef.current) setBoundary(collisionBoundaryRef.current);
  }, [collisionBoundaryRef]);

  useEffect(() => {
    if (!imageRef.current || !hotspotRef.current) return;
    const newX = (left * imageRef.current.offsetWidth) / imageRef.current.naturalWidth;
    const newY = (top * imageRef.current.offsetHeight) / imageRef.current.naturalHeight;
    setCoords({ x: newX, y: newY });
  }, [resizingCount, imageRef, top, left]);

  return (
    <Tooltip.Provider delayDuration={100}>
      <Tooltip.Root open={open}>
        <Tooltip.Trigger asChild>
          <i
            ref={hotspotRef}
            className="absolute w-6 h-6 border rounded-full border-white bg-white/40 hover:cursor-pointer top-0 left-0"
            style={{
              transform: `translate(${coords.x}${unit}, ${coords.y}${unit})`,
            }}
            onClick={() => setOpen(!open)}
            onMouseOver={() => setOpen(!open)}
            onMouseOut={() => setOpen(false)}
          />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            collisionBoundary={collisionBoundaryRef.current}
            collisionPadding={2}
            className="flex flex-col bg-white p-2 rounded-lg max-w-xs"
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
