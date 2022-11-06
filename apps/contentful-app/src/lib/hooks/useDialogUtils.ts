import { useSDK } from '@contentful/react-apps-toolkit';
import { FieldExtensionSDK } from '@contentful/app-sdk';
import { useHotspotStore } from 'shared';
import useMediaSelector from './useMediaSelector';

const useDialogUtils = () => {
  const sdk = useSDK<FieldExtensionSDK>();
  const removeHotspot = useHotspotStore((state) => state.removeHotspot);
  const { addAsset, selectAsset, removeAsset } = useMediaSelector();

  const showDialog = (message: string, confirmCB: () => void) => {
    sdk.dialogs
      .openConfirm({
        title: 'Confirmation required',
        message,
        intent: 'negative',
      })
      .then((result) => {
        if (result) {
          confirmCB();
        }
      });
  };

  const selectAssetDialog = () => {
    showDialog(
      'By modifying the image, you will lose the current configuration. Do you want to continue?',
      selectAsset
    );
  };

  const addAssetDialog = () => {
    showDialog(
      'Adding a new image will remove the current configuration. Do you want to continue?',
      addAsset
    );
  };

  const removeAssetDialog = () => {
    showDialog('Do you really want to remove the image and all the related hotspots?', removeAsset);
  };

  const removeHotspotDialog = (hotspotId: string) => {
    showDialog('Do you really want to remove the selected hotspot?', () =>
      removeHotspot(hotspotId)
    );
  };

  return {
    selectAssetDialog,
    addAssetDialog,
    removeAssetDialog,
    removeHotspotDialog,
  };
};

export default useDialogUtils;
