import { FieldExtensionSDK } from '@contentful/app-sdk';
import { useCMA, useSDK } from '@contentful/react-apps-toolkit';
import { AssetProps } from 'contentful-management';
import { useHotspotStore } from 'shared';
import { saveHiddenMediaField, transformAsset } from '../utils';

const useMediaSelector = () => {
  const sdk = useSDK<FieldExtensionSDK>();
  const cma = useCMA();
  const field = useHotspotStore((state) => state.field);
  const setField = useHotspotStore((state) => state.setField);
  const clearField = useHotspotStore((state) => state.clearField);
  const setMedia = useHotspotStore((state) => state.setMedia);
  const clearMedia = useHotspotStore((state) => state.clearMedia);

  const HIDDEN_MEDIA_REF_ID = `${sdk.field.id}_mediaRef`;

  const setAppState = async (asset?: AssetProps | null) => {
    if (asset) {
      setField({ assetId: asset.sys.id });
      setMedia(transformAsset(asset, sdk.field.locale));
      await sdk.field.setValue({ assetId: asset.sys.id });
      saveHiddenMediaField(HIDDEN_MEDIA_REF_ID, sdk, cma, asset.sys);
    }
  };

  // open specific asset
  const openAsset = () => {
    if (field?.assetId) {
      sdk.navigator.openAsset(field.assetId);
    }
  };

  // select existing asset
  const selectAsset = async () => {
    const asset = await sdk.dialogs.selectSingleAsset<AssetProps>({ locale: sdk.field.locale });
    setAppState(asset);
  };

  const addAsset = async () => {
    const asset = await sdk.navigator.openNewAsset({
      slideIn: { waitForClose: true },
    });
    setAppState(asset.entity);
  };

  const removeAsset = () => {
    clearField();
    clearMedia();
    sdk.field.removeValue();
    if (sdk.entry.fields[HIDDEN_MEDIA_REF_ID]) {
      sdk.entry.fields[HIDDEN_MEDIA_REF_ID].removeValue(sdk.field.locale);
    }
  };

  return {
    openAsset,
    selectAsset,
    addAsset,
    removeAsset,
  };
};

export default useMediaSelector;
