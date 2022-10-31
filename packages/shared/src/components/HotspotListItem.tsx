import { useRef, useState } from 'react';
import {
  Card,
  Checkbox,
  FormControl,
  IconButton,
  Textarea,
  TextInput,
} from '@contentful/f36-components';
import { ChevronDownIcon, DeleteIcon, PreviewIcon } from '@contentful/f36-icons';
import { debounce, useHotspotStore } from '../lib';
import { IHotspot } from '../lib/types/IHotspot';
import { HotspotCoords } from './HotspotCoords';

interface HotspotListItemProps {
  hotspot: IHotspot;
  label: string;
  onRemove: (hotspotId: string) => void;
}

export const HotspotListItem: React.FC<HotspotListItemProps> = ({ hotspot, label, onRemove }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const darkRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isCoordsVisible, setIsCoordsVisible] = useState(false);
  const updateHotspot = useHotspotStore((state) => state.updateHotspot);
  const highlightHotspot = useHotspotStore((state) => state.highlightHotspot);
  const highlightedHotspot = useHotspotStore((state) => state.highlightedHotspot);
  const isAdmin = useHotspotStore((state) => state.isAdmin);

  const updateHotspotHandler = () => {
    updateHotspot({
      ...hotspot,
      title: titleRef.current?.value!,
      content: contentRef.current?.value!,
      dark: darkRef.current?.checked!,
    });
  };

  const highlightHotspotHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    highlightHotspot(hotspot.id);
  };

  const onRemoveHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(hotspot.id);
  };

  return (
    <>
      <Card className="!bg-slate-400/10 !p-0">
        <div
          className={`flex items-center justify-between p-2 ${isOpen && 'border-b'}`}
          role="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-700 font-mono text-sm text-white">
            {label}
          </span>
          <div className="flex-1 pl-2 line-clamp-1" title={hotspot.title}>
            {hotspot.title}
          </div>
          <div className="flex gap-2">
            <IconButton
              variant="primary"
              aria-label="Highlight hotspot"
              size="small"
              icon={<PreviewIcon size="tiny" />}
              className="!min-h-[20px] !p-1"
              isDisabled={!!highlightedHotspot}
              onClick={highlightHotspotHandler}
            />
            <IconButton
              variant="negative"
              aria-label="Remove hotspot"
              size="small"
              icon={<DeleteIcon size="tiny" />}
              className="!min-h-[20px] !p-1"
              isDisabled={!!highlightedHotspot}
              onClick={onRemoveHandler}
            />
            <IconButton
              variant="transparent"
              aria-label="Toggle hotspot"
              size="small"
              icon={<ChevronDownIcon size="tiny" className={`${isOpen ? 'rotate-180' : ''}`} />}
              className="!min-h-[20px] !p-1"
              isDisabled={!!highlightedHotspot}
            />
          </div>
        </div>
        <div className={`${isOpen ? 'bg-white p-3' : 'hidden'}`}>
          <FormControl className="!mb-3">
            <FormControl.Label className="!mb-1" htmlFor={`title${hotspot.id}`}>
              Title
            </FormControl.Label>
            <TextInput
              ref={titleRef}
              id={`title${hotspot.id}`}
              onChange={debounce(updateHotspotHandler, 500)}
              defaultValue={hotspot.title}
              size="small"
            />
          </FormControl>
          <FormControl className="!mb-3">
            <FormControl.Label className="!mb-1" htmlFor={`content${hotspot.id}`}>
              Content
            </FormControl.Label>
            <Textarea
              ref={contentRef}
              id={`content${hotspot.id}`}
              onChange={debounce(updateHotspotHandler, 500)}
              defaultValue={hotspot.content}
              resize="none"
            />
          </FormControl>
          <FormControl className="!mb-0">
            <Checkbox
              ref={darkRef}
              id={`dark${hotspot.id}`}
              isChecked={hotspot.dark}
              onChange={updateHotspotHandler}
            >
              Dark
            </Checkbox>
          </FormControl>
          <HotspotCoords hotspot={hotspot} />
        </div>
      </Card>
    </>
  );
};
