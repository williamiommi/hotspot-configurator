import { useDraggable } from '@dnd-kit/core';
import classNames from 'classnames';
import useHotspotDraggableBag from '../lib/hooks/useHotspotDraggableBag';
import { IHotspot } from '../lib/types/IHotspot';

interface HotspotDraggableProps {
  hotspot: IHotspot;
  label: number;
  imageRef: React.RefObject<HTMLImageElement>;
  imageIsResizing: boolean;
  imageResizeCount: number;
}

const HotspotDraggable: React.FC<HotspotDraggableProps> = ({
  hotspot,
  label,
  imageRef,
  imageIsResizing,
  imageResizeCount,
}) => {
  const { coords, onDoubleClickHandler, highlightedHotspot, isDragging } = useHotspotDraggableBag(
    label,
    hotspot,
    imageRef,
    imageResizeCount
  );

  const { listeners, setNodeRef, transform } = useDraggable({
    id: label,
  });

  const hotspotClasses = classNames(
    'absolute flex h-6 w-6 cursor-pointer items-center justify-center rounded-full font-mono text-sm transition-opacity duration-300',
    {
      'bg-slate-700 text-white': hotspot.dark,
      'bg-white text-slate-700': !hotspot.dark,
      'animate-pulse bg-yellow-400 !text-white': highlightedHotspot === hotspot.id,
      'cursor-grab opacity-70': isDragging,
      'opacity-0': (highlightedHotspot && highlightedHotspot !== hotspot.id) || imageIsResizing,
    }
  );

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      className={hotspotClasses}
      style={{
        top: `${coords.y}px`,
        left: `${coords.x}px`,
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      }}
      onDoubleClick={onDoubleClickHandler}
    >
      {label}
    </div>
  );
};

export default HotspotDraggable;
