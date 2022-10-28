import { FieldExtensionSDK } from '@contentful/app-sdk';
import { Badge, EntityStatusBadge, IconButton, Menu } from '@contentful/f36-components';
import { MoreHorizontalIcon, ExternalLinkIcon } from '@contentful/f36-icons';
import { useSDK } from '@contentful/react-apps-toolkit';
import useMediaSelector from '../lib/hooks/useMediaSelector';
import useHotspotStore from '../lib/store/hotspotStore';

interface HotspotImageActionsProps {
  noOpenAsset?: boolean;
}

const HotspotImageActions: React.FC<HotspotImageActionsProps> = ({ noOpenAsset }) => {
  const sdk = useSDK<FieldExtensionSDK>();
  const media = useHotspotStore((state) => state.media);
  const { openAsset, selectAsset, addAsset, removeAsset } = useMediaSelector();

  const onAssetHandler = (confirmCB: () => void, type: 'select' | 'add' | 'remove') => {
    let message = 'Do you really want to remove the image and all the related hotspots?';
    if (type === 'select') {
      message =
        'By modifying the image, you will lose the current configuration. Do you want to continue?';
    } else if (type === 'add') {
      message =
        'Adding a new image will remove the current configuration. Do you want to continue?';
    }
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

  return (
    <>
      <div className="flex items-center justify-between gap-1 rounded-t-md border border-b-0 border-slate-300 px-1 py-2">
        <h3 className="font-bold italic line-clamp-1">{media?.title}</h3>
        <div className="flex items-center gap-1">
          {media?.status ? (
            <EntityStatusBadge entityStatus={media.status} />
          ) : (
            <Badge variant="negative">UNKNOWN</Badge>
          )}
          <Menu>
            <Menu.Trigger>
              <IconButton
                size="small"
                aria-label="toggle menu"
                icon={<MoreHorizontalIcon variant="secondary" />}
                className="!min-h-[20px] !p-0"
              />
            </Menu.Trigger>
            <Menu.List>
              {!noOpenAsset && (
                <Menu.Item onClick={openAsset}>
                  Open Asset <ExternalLinkIcon className="scale-75" variant="secondary" />
                </Menu.Item>
              )}

              <Menu.Item onClick={() => onAssetHandler(selectAsset, 'select')}>
                Select existing media
              </Menu.Item>
              <Menu.Item onClick={() => onAssetHandler(addAsset, 'add')}>Add new media</Menu.Item>
              <Menu.Divider />
              <Menu.Item onClick={() => onAssetHandler(removeAsset, 'remove')}>
                <strong className="text-red-600">Remove Hotspot Image</strong>
              </Menu.Item>
            </Menu.List>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default HotspotImageActions;
