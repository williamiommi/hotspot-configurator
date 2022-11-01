import { FieldExtensionSDK } from '@contentful/app-sdk';
import { useCMA, useSDK } from '@contentful/react-apps-toolkit';
import { useEffect } from 'react';
import { stringifyCompare, IField, useHotspotStore } from 'shared';
import { transformAsset } from '../utils';

const useInitApp = () => {
  const sdk = useSDK<FieldExtensionSDK>();
  const cma = useCMA();
  const isAppLoading = useHotspotStore((state) => state.isAppLoading);
  const field = useHotspotStore((state) => state.field);
  const media = useHotspotStore((state) => state.media);
  const setIsAppLoading = useHotspotStore((state) => state.setIsAppLoading);
  const setField = useHotspotStore((state) => state.setField);
  const setMedia = useHotspotStore((state) => state.setMedia);
  const setIsAdmin = useHotspotStore((state) => state.setIsAdmin);

  useEffect(() => {
    setIsAppLoading(true);

    //set admin visibility
    setIsAdmin(sdk.user.spaceMembership.admin);

    // subscribe to zustand field changes and save the new value
    const unsub = useHotspotStore.subscribe(
      (state) => state.field,
      (state) => {
        sdk.field.setValue(state);
      },
      {
        equalityFn: stringifyCompare,
      }
    );
    // save entry on every value update
    //sdk.field.onValueChanged(sdk.entry.save);

    const value: IField = sdk.field.getValue();
    if (value?.assetId) {
      // copy contentful value inside app state
      setField(value);
      // retrieve asset
      cma.asset
        .get({ assetId: value.assetId })
        .then((res) => {
          if (res) {
            setMedia(transformAsset(res, sdk.field.locale));
          }
        })
        .finally(() => {
          setIsAppLoading(false);
        });
    } else {
      setIsAppLoading(false);
    }

    return () => {
      if (unsub) unsub();
    };
  }, [sdk.field, sdk.entry, setField, cma.asset, setMedia, setIsAppLoading]);

  return {
    isAppLoading,
    hasMedia: field?.assetId && !!media,
    hasMediaOutdated: (field?.assetId && !media) === true,
  };
};

export default useInitApp;
