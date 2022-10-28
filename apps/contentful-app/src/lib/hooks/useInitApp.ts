import { FieldExtensionSDK } from '@contentful/app-sdk';
import { useCMA, useSDK } from '@contentful/react-apps-toolkit';
import { useEffect } from 'react';
import useHotspotStore from '../store/hotspotStore';
import IField from '../ts/IField';

const useInitApp = () => {
  const sdk = useSDK<FieldExtensionSDK>();
  const cma = useCMA();
  const { isAppLoading, field, media, setIsAppLoading, setField, setMedia } = useHotspotStore(
    (state) => ({
      isAppLoading: state.isAppLoading,
      field: state.field,
      media: state.media,
      setIsAppLoading: state.setIsAppLoading,
      setField: state.setField,
      setMedia: state.setMedia,
    })
  );

  useEffect(() => {
    setIsAppLoading(true);
    // save entry on every value update
    sdk.field.onValueChanged(sdk.entry.save);

    const value: IField = sdk.field.getValue();
    if (value?.assetId) {
      // copy contentful value inside app state
      setField(value);
      // retrieve asset
      cma.asset
        .get({ assetId: value.assetId })
        .then((res) => {
          if (res) setMedia(res, sdk.field.locale);
        })
        .finally(() => {
          setIsAppLoading(false);
        });
    } else {
      setIsAppLoading(false);
    }
  }, [sdk.field, sdk.entry, setField, cma.asset, setMedia, setIsAppLoading]);

  return {
    isAppLoading,
    hasMedia: field?.assetId && !!media,
    hasMediaOutdated: (field?.assetId && !media) === true,
  };
};

export default useInitApp;
