import { PuzzleIcon } from '@contentful/f36-icons';
import { Heading, Text } from '@contentful/f36-components';
import { FieldExtensionSDK } from '@contentful/app-sdk';
import { useSDK } from '@contentful/react-apps-toolkit';
import { HotspotImageActions } from 'shared';
import useDialogUtils from '../lib/hooks/useDialogUtils';

interface HotspotImageWrapperOutdatedProps {}

const HotspotImageWrapperOutdated: React.FC<HotspotImageWrapperOutdatedProps> = () => {
  const sdk = useSDK<FieldExtensionSDK>();
  const { selectAssetDialog, addAssetDialog, removeAssetDialog } = useDialogUtils();
  return (
    <>
      <HotspotImageActions
        noOpenAsset
        selectAsset={selectAssetDialog}
        addAsset={addAssetDialog}
        removeAsset={removeAssetDialog}
      />
      <div className="flex flex-col items-center justify-center gap-2 bg-red-100 p-5 text-gray-700">
        <PuzzleIcon size="xlarge" variant="secondary" />
        <Heading className="!mb-0 !text-lg">I can't find the image</Heading>
        <Text>
          Please verify in your{' '}
          <button onClick={sdk.navigator.openAssetsList} className="underline">
            media tab
          </button>{' '}
          or select/add a new image
        </Text>
      </div>
    </>
  );
};

export default HotspotImageWrapperOutdated;
