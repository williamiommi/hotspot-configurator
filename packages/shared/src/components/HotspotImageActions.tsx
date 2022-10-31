import { Badge, EntityStatusBadge, IconButton, Menu } from '@contentful/f36-components';
import { MoreHorizontalIcon, ExternalLinkIcon } from '@contentful/f36-icons';
import { useHotspotStore } from '../lib/store/hotspotStore';

interface HotspotImageActionsProps {
  noOpenAsset?: boolean;
  openAsset?: () => void;
  selectAsset: () => void;
  addAsset: () => void;
  removeAsset: () => void;
}

export const HotspotImageActions: React.FC<HotspotImageActionsProps> = ({
  noOpenAsset,
  openAsset,
  selectAsset,
  addAsset,
  removeAsset,
}) => {
  const media = useHotspotStore((state) => state.media);

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

              <Menu.Item onClick={selectAsset}>Select existing media</Menu.Item>
              <Menu.Item onClick={addAsset}>Add new media</Menu.Item>
              <Menu.Divider />
              <Menu.Item onClick={removeAsset}>
                <strong className="text-red-600">Remove Hotspot Image</strong>
              </Menu.Item>
            </Menu.List>
          </Menu>
        </div>
      </div>
    </>
  );
};
