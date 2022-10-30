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

const Playground: NextPage = () => {
  const dummyFn = () => alert('This is just a demo');
  const isImageLoaded = useHotspotStore((state) => state.isImageLoaded);
  const addHotspot = useHotspotStore((state) => state.addHotspot);
  const setIsImageLoaded = useHotspotStore((state) => state.setIsImageLoaded);

  useEffect(() => {
    return () => {
      setIsImageLoaded(false);
    };
  }, []);

  return (
    <>
      <Navigation />
      <div className="flex flex-col mx-auto w-[703px] border-l-4 border-l-gray-300 pl-4">
        <span className="text-gray-500 text-sm">Hotspot</span>
        <div
          className={`max-w-fit transition-opacity duration-500 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <HotspotImageActions
            openAsset={dummyFn}
            selectAsset={dummyFn}
            addAsset={dummyFn}
            removeAsset={dummyFn}
          />
          <HotspotImageWrapper />
          <HotspotAddButton onClick={addHotspot} />
          <HotspotList onRemove={(id: string) => console.log(id)} />
        </div>
      </div>
    </>
  );
};

export default Playground;
