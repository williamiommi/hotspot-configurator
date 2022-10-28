import { FieldExtensionSDK } from '@contentful/app-sdk';
import { useSDK } from '@contentful/react-apps-toolkit';
import useHotspotStore from '../lib/store/hotspotStore';

interface HotspotAddButtonProps {}

const HotspotAddButton: React.FC<HotspotAddButtonProps> = () => {
  const sdk = useSDK<FieldExtensionSDK>();
  const addHotspot = useHotspotStore((state) => state.addHotspot);
  const addHotspotHandler = () => {
    const updatedField = addHotspot();
    sdk.field.setValue(updatedField);
  };
  return (
    <button
      className="my-1 w-full border-2 border-dashed p-3 font-bold text-slate-500 hover:bg-slate-100/30"
      onClick={addHotspotHandler}
    >
      + ADD HOTSPOT
    </button>
  );
};

export default HotspotAddButton;
