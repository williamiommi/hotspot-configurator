import { Button } from '@contentful/f36-components';
import { PlusIcon } from '@contentful/f36-icons';
import useMediaSelector from '../lib/hooks/useMediaSelector';

interface MediaSelectorProps {}

const MediaSelector: React.FC<MediaSelectorProps> = () => {
  const { selectAsset, addAsset } = useMediaSelector();
  const ctas = [
    {
      text: 'Add existing media',
      onClick: selectAsset,
    },
    { text: 'Add new media', onClick: addAsset },
  ];
  return (
    <div className="flex items-center justify-center gap-2 rounded-md border border-dashed border-slate-500 p-8">
      {ctas.map((cta) => (
        <Button
          key={cta.text}
          size="small"
          startIcon={<PlusIcon variant="secondary" />}
          onClick={cta.onClick}
        >
          <strong>{cta.text}</strong>
        </Button>
      ))}
    </div>
  );
};

export default MediaSelector;
