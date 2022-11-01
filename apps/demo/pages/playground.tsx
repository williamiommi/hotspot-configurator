import type { NextPage } from 'next';
import { useEffect } from 'react';
import {
  useHotspotStore,
  HotspotImageActions,
  HotspotImageWrapper,
  HotspotAddButton,
  HotspotList,
} from 'shared';
import MainLayout from '../components/MainLayout';
import useDialogUtils from '../lib/hooks/useDialogUtils';

const Playground: NextPage = () => {
  const isImageLoaded = useHotspotStore((state) => state.isImageLoaded);
  const setIsImageLoaded = useHotspotStore((state) => state.setIsImageLoaded);
  const addHotspot = useHotspotStore((state) => state.addHotspot);
  const { demoDialogLauncher, removeHotspotHandler } = useDialogUtils();

  useEffect(() => {
    return () => setIsImageLoaded(false);
  }, [setIsImageLoaded]);

  return (
    <MainLayout>
      <div className="mx-auto max-w-[739px] px-2">
        <div className="flex flex-col border-l-4 border-l-gray-300 pl-4">
          <span className="text-gray-500 text-sm">Hotspot</span>
          <div
            className={`max-w-fit transition-opacity duration-1000 opacity-0 ${
              isImageLoaded ? 'opacity-100' : ''
            }`}
          >
            <HotspotImageActions
              openAsset={demoDialogLauncher}
              selectAsset={demoDialogLauncher}
              addAsset={demoDialogLauncher}
              removeAsset={demoDialogLauncher}
            />
            <HotspotImageWrapper />
            <HotspotAddButton onClick={addHotspot} />
            <HotspotList onRemove={removeHotspotHandler} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Playground;
