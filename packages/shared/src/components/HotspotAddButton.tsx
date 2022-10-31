import { useHotspotStore } from '../lib';

interface HotspotAddButtonProps {}

export const HotspotAddButton: React.FC<HotspotAddButtonProps> = () => {
  const addHotspot = useHotspotStore((state) => state.addHotspot);
  return (
    <button
      className="my-1 w-full border-2 border-dashed p-3 font-bold text-slate-500 hover:bg-slate-100/30"
      onClick={addHotspot}
    >
      + ADD HOTSPOT!!
    </button>
  );
};
