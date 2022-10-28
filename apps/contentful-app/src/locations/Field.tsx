import { SkeletonImage, SkeletonContainer, SkeletonBodyText } from '@contentful/f36-components';
import { useAutoResizer } from '@contentful/react-apps-toolkit';
import HotspotApp from '../components/HotspotApp';
import HotspotImageWrapperOutdated from '../components/HotspotImageWrapperOutdated';
import MediaSelector from '../components/MediaSelector';
import useInitApp from '../lib/hooks/useInitApp';

const Field = () => {
  useAutoResizer();
  const { isAppLoading, hasMedia, hasMediaOutdated } = useInitApp();
  if (isAppLoading)
    return (
      <SkeletonContainer>
        <SkeletonImage width="100%" height={40} />
        <SkeletonBodyText numberOfLines={7} lineHeight={7} offsetTop={47} />
      </SkeletonContainer>
    );

  if (hasMediaOutdated) {
    return <HotspotImageWrapperOutdated />;
  }

  if (hasMedia) {
    return <HotspotApp />;
  }

  return <MediaSelector />;
};

export default Field;
