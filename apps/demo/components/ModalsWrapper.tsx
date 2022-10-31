import { ModalConfirm, Text } from '@contentful/f36-components';
import { useDemoStore } from '../lib/store/demoStore';

const ModalsWrapper = () => {
  const isDemoModalVisible = useDemoStore((state) => state.isDemoModalVisible);
  const hideDemoModal = useDemoStore((state) => state.hideDemoModal);
  return (
    <>
      <ModalConfirm
        title="Hotspot Configurator // Demo App"
        onConfirm={hideDemoModal}
        onCancel={hideDemoModal}
        cancelLabel={false}
        intent="primary"
        confirmLabel="Confirm"
        isShown={isDemoModalVisible}
      >
        <Text>
          This is a demo. <br />
          You can&apos;t view, change, add or remove the image.
        </Text>
      </ModalConfirm>
    </>
  );
};

export default ModalsWrapper;
