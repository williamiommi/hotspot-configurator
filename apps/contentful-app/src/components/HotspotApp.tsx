import useHotspotStore from '../lib/store/hotspotStore';
import HotspotImageWrapper from './HotspotImageWrapper';
import HotspotList from './HotspotList';
import { HotspotAddButton } from 'shared';

interface HotspotAppProps {}

const HotspotApp: React.FC<HotspotAppProps> = () => {
  const isImageLoaded = useHotspotStore((state) => state.isImageLoaded);
  const addHotspot = useHotspotStore((state) => state.addHotspot);
  return (
    <div
      className={`max-w-fit transition-opacity duration-500 ${
        isImageLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <HotspotImageWrapper />
      <HotspotAddButton onClick={addHotspot} />
      <HotspotList />
    </div>
  );
};

export default HotspotApp;
