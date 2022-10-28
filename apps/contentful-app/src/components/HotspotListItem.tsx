import { FieldExtensionSDK } from '@contentful/app-sdk';
import {
  Card,
  Checkbox,
  FormControl,
  IconButton,
  Textarea,
  TextInput,
  TextLink,
} from '@contentful/f36-components';
import { ChevronDownIcon, DeleteIcon, PreviewIcon } from '@contentful/f36-icons';
import { useSDK } from '@contentful/react-apps-toolkit';
import { useRef, useState } from 'react';
import useHotspotStore from '../lib/store/hotspotStore';
import { debounce } from 'shared';

export interface IHotspot {
  id: string;
  title: string;
  content: string;
  dark: boolean;
  x: number;
  y: number;
  naturalX: number;
  naturalY: number;
  percentageX: number;
  percentageY: number;
  el?: HTMLElement;
}
interface HotspotListItemProps {
  hotspot: IHotspot;
  label: string;
}

const HotspotListItem: React.FC<HotspotListItemProps> = ({ hotspot, label }) => {
  const sdk = useSDK<FieldExtensionSDK>();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const darkRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isCoordsVisible, setIsCoordsVisible] = useState(false);
  const { updateHotspot, removeHotspot, highlightHotspot, highlightedHotspot } = useHotspotStore(
    (state) => ({
      updateHotspot: state.updateHotspot,
      removeHotspot: state.removeHotspot,
      highlightHotspot: state.highlightHotspot,
      highlightedHotspot: state.highlightedHotspot,
    })
  );

  const updateHotspotHandler = () => {
    const updatedField = updateHotspot({
      ...hotspot,
      title: titleRef.current?.value!,
      content: contentRef.current?.value!,
      dark: darkRef.current?.checked!,
    });
    sdk.field.setValue(updatedField);
  };

  const highlightHotspotHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    highlightHotspot(hotspot.id);
  };

  const removeHotspotHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    sdk.dialogs
      .openConfirm({
        title: 'Confirmation required',
        message: 'Do you really want to remove the selected hotspot?',
        intent: 'negative',
      })
      .then((result) => {
        if (result) {
          const updatedField = removeHotspot(hotspot.id);
          sdk.field.setValue(updatedField);
        }
      });
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
              onClick={removeHotspotHandler}
            />
            <IconButton
              variant="transparent"
              aria-label="Toggle hotspot"
              size="small"
              icon={<ChevronDownIcon size="tiny" className={`${isOpen ? 'rotate-180' : ''}`} />}
              className="!min-h-[20px] !p-1"
              isDisabled={!!highlightedHotspot}
              // onClick={() => setIsOpen(!isOpen)}
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
          {sdk.user.spaceMembership.admin && (
            <>
              <TextLink
                className="mt-3 !text-[9px]"
                onClick={() => setIsCoordsVisible(!isCoordsVisible)}
              >
                {isCoordsVisible ? 'Hide' : 'Show'} coordinates
              </TextLink>
              {isCoordsVisible && (
                <div className="text-xs">
                  <div className="flex gap-1">
                    <strong className="w-16 text-right">x:</strong>
                    <span>{hotspot.x}px</span>
                  </div>
                  <div className="flex gap-1">
                    <strong className="w-16 text-right">y:</strong>
                    <span>{hotspot.y}px</span>
                  </div>
                  <div className="flex gap-1">
                    <strong className="w-16 text-right">% x:</strong>
                    <span>{hotspot.percentageX}%</span>
                  </div>
                  <div className="flex gap-1">
                    <strong className="w-16 text-right">% y:</strong>
                    <span>{hotspot.percentageY}%</span>
                  </div>
                  <div className="flex gap-1">
                    <strong className="w-16 text-right">natural x:</strong>
                    <span>{hotspot.naturalX}px</span>
                  </div>
                  <div className="flex gap-1">
                    <strong className="w-16 text-right">natural y:</strong>
                    <span>{hotspot.naturalY}px</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </Card>
    </>
  );
};

export default HotspotListItem;
