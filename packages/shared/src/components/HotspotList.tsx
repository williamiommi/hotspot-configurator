import { useHotspotStore } from '../lib';
import { HotspotListItem } from './HotspotListItem';

interface HotspotListProps {
  onRemove: (hotspotId: string) => void;
}

export const HotspotList: React.FC<HotspotListProps> = ({ onRemove }) => {
  const field = useHotspotStore((state) => state.field);
  if (!field?.hotspots?.length) return null;
  return (
    <section className="my-5 flex max-h-[800px] w-full flex-col overflow-y-auto">
      {field.hotspots &&
        field.hotspots.map((hotspot, index) => (
          <div key={hotspot.id}>
            <HotspotListItem hotspot={hotspot} label={`${index + 1}`} onRemove={onRemove} />
            {field.hotspots && index !== field.hotspots.length - 1 && (
              <div className="mx-auto my-3 h-px w-80 bg-gray-300" />
            )}
          </div>
        ))}
    </section>
  );
};
