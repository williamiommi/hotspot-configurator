import type { NextPage } from 'next';
import { HotspotAddButton } from 'shared';

const Playground: NextPage = () => {
  return (
    <div className="flex flex-col mx-auto w-[703px] border-l-4 border-l-gray-300 pl-4 mt-10">
      <span className="text-gray-500 text-sm">Hotspot</span>
      <HotspotAddButton onClick={() => true} />
    </div>
  );
};

export default Playground;
