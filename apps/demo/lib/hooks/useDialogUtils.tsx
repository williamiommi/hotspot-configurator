import { ModalLauncher, ModalConfirm, Text } from '@contentful/f36-components';
import { useHotspotStore } from 'shared';

const useDialogUtils = () => {
  const removeHotspot = useHotspotStore((state) => state.removeHotspot);

  const demoDialogLauncher = () => {
    ModalLauncher.open(({ isShown, onClose }) => {
      return (
        <ModalConfirm
          title='Hotspot Configurator // Demo'
          onConfirm={onClose}
          onCancel={onClose}
          cancelLabel={false}
          intent='primary'
          confirmLabel='OK'
          isShown={isShown}
        >
          <Text>
            This is a demo. <br />
            You can&apos;t view, change, add or remove the image.
          </Text>
        </ModalConfirm>
      );
    });
  };

  const removeHotspotHandler = (id: string) => {
    ModalLauncher.open(({ isShown, onClose }) => {
      return (
        <ModalConfirm
          title='Confirmation required'
          onConfirm={() => onClose(true)}
          onCancel={() => onClose(false)}
          intent='negative'
          isShown={isShown}
        >
          <Text>Do you really want to remove the selected hotspot?</Text>
        </ModalConfirm>
      );
    }).then((confirm) => {
      if (confirm) removeHotspot(id);
    });
  };

  return { removeHotspotHandler, demoDialogLauncher };
};

export default useDialogUtils;
