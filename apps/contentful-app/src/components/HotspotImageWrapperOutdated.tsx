import HotspotImageActions from './HotspotImageActions';
import { PuzzleIcon } from '@contentful/f36-icons';
import { Heading, Text } from '@contentful/f36-components';
import { FieldExtensionSDK } from '@contentful/app-sdk';
import { useSDK } from '@contentful/react-apps-toolkit';

interface HotspotImageWrapperOutdatedProps {}

const HotspotImageWrapperOutdated: React.FC<HotspotImageWrapperOutdatedProps> = () => {
  const sdk = useSDK<FieldExtensionSDK>();
  return (
    <>
      <HotspotImageActions noOpenAsset />
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
