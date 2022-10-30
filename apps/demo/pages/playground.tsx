import type { NextPage } from 'next';
import { useEffect } from 'react';
import {
  useHotspotStore,
  HotspotImageActions,
  HotspotImageWrapper,
  HotspotAddButton,
  HotspotList,
} from 'shared';
import Navigation from '../components/Navigation';
import useDemoBag from '../lib/hooks/useDemoBag';
import { useDemoStore } from '../lib/store/demoStore';

const Playground: NextPage = () => {
  const showDemoModal = useDemoStore((state) => state.showDemoModal);
  const setIsImageLoaded = useHotspotStore((state) => state.setIsImageLoaded);
  const addHotspot = useHotspotStore((state) => state.addHotspot);
  const { removeHotspotHandler } = useDemoBag();

  useEffect(() => {
    return () => setIsImageLoaded(false);
  }, []);

  return (
    <>
      <Navigation />
      <div className="flex flex-col mx-auto w-[703px] border-l-4 border-l-gray-300 pl-4">
        <span className="text-gray-500 text-sm">Hotspot</span>
        <div className={`max-w-fit transition-opacity duration-500`}>
          <HotspotImageActions
            openAsset={showDemoModal}
            selectAsset={showDemoModal}
            addAsset={showDemoModal}
            removeAsset={showDemoModal}
          />
          <HotspotImageWrapper />
          <HotspotAddButton onClick={addHotspot} />
          <HotspotList onRemove={removeHotspotHandler} />
        </div>
      </div>
    </>
  );
};

export default Playground;
