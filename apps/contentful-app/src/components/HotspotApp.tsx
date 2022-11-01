import {
  HotspotImageActions,
  HotspotImageWrapper,
  HotspotAddButton,
  HotspotList,
  useHotspotStore,
} from 'shared';
import useDialogUtils from '../lib/hooks/useDialogUtils';
import useMediaSelector from '../lib/hooks/useMediaSelector';

interface HotspotAppProps {}

const HotspotApp: React.FC<HotspotAppProps> = () => {
  const isImageLoaded = useHotspotStore((state) => state.isImageLoaded);
  const addHotspot = useHotspotStore((state) => state.addHotspot);
  const { openAsset } = useMediaSelector();
  const { selectAssetDialog, addAssetDialog, removeAssetDialog, removeHotspotDialog } =
    useDialogUtils();
  return (
    <div
      className={`max-w-fit transition-opacity duration-500 ${
        isImageLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <HotspotImageActions
        openAsset={openAsset}
        addAsset={addAssetDialog}
        selectAsset={selectAssetDialog}
        removeAsset={removeAssetDialog}
      />
      <HotspotImageWrapper />
      <HotspotAddButton onClick={addHotspot} />
      <HotspotList onRemove={removeHotspotDialog} />
    </div>
  );
};

export default HotspotApp;
