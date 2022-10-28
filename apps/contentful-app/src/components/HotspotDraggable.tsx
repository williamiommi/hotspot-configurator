import { useDraggable } from '@dnd-kit/core';
import classNames from 'classnames';
import IHotspot from '../lib/ts/IHotspot';
import useHotspotDraggableBag from '../lib/hooks/useHotspotDraggableBag';

interface HotspotDraggableProps {
  hotspot: IHotspot;
  label: number;
  imageRef: React.RefObject<HTMLImageElement>;
  imageResizeCount: number;
}

const HotspotDraggable: React.FC<HotspotDraggableProps> = ({
  hotspot,
  label,
  imageRef,
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
    'absolute flex h-6 w-6 cursor-pointer items-center justify-center rounded-full font-mono text-sm',
    {
      'bg-slate-700 text-white': hotspot.dark,
      'bg-white text-slate-700': !hotspot.dark,
      'animate-pulse bg-yellow-400 !text-white': highlightedHotspot === hotspot.id,
      'cursor-grab opacity-70': isDragging,
      'opacity-0': highlightedHotspot && highlightedHotspot !== hotspot.id,
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