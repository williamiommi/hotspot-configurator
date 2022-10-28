import useHotspotStore from '../lib/store/hotspotStore';
import HotspotImageWrapper from './HotspotImageWrapper';
import HotspotList from './HotspotList';

interface HotspotAppProps {}

const HotspotApp: React.FC<HotspotAppProps> = () => {
  const isImageLoaded = useHotspotStore((state) => state.isImageLoaded);
  return (
    <div
      className={`max-w-fit transition-opacity duration-500 ${
        isImageLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <HotspotImageWrapper />
      <HotspotList />
    </div>
  );
};

export default HotspotApp;
