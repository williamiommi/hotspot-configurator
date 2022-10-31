import { useState } from 'react';
import { TextLink } from '@contentful/f36-components';
import { useHotspotStore } from '../lib';
import { IHotspot } from '../lib/types/IHotspot';

interface HotspotCoordsProps {
  hotspot: IHotspot;
}

export const HotspotCoords: React.FC<HotspotCoordsProps> = ({ hotspot }) => {
  const [isCoordsVisible, setIsCoordsVisible] = useState(false);
  const isAdmin = useHotspotStore((state) => state.isAdmin);

  if (!isAdmin) return null;

  return (
    <>
      <TextLink className="!mt-5 !text-sm" onClick={() => setIsCoordsVisible(!isCoordsVisible)}>
        {isCoordsVisible ? 'Hide' : 'Show'} coordinates
      </TextLink>
      {isCoordsVisible && (
        <div className="grid gap-px bg-gray-400 grid-cols-[120px,1fr] my-5 p-px place-content-center max-w-fit">
          <span className="font-bold bg-gray-100 p-2 text-right">X</span>
          <span className="bg-white p-2">{hotspot.x}px</span>
          <span className="font-bold bg-gray-100 p-2 text-right">Y</span>
          <span className="bg-white p-2">{hotspot.y}px</span>

          <span className="font-bold bg-gray-100 p-2 text-right">Natural X</span>
          <span className="bg-white p-2">{hotspot.naturalX}px</span>
          <span className="font-bold bg-gray-100 p-2 text-right">Natural Y</span>
          <span className="bg-white p-2">{hotspot.naturalY}px</span>

          <span className="font-bold bg-gray-100 p-2 text-right">Percentage X</span>
          <span className="bg-white p-2">{hotspot.percentageX}%</span>
          <span className="font-bold bg-gray-100 p-2 text-right">Percentage Y</span>
          <span className="bg-white p-2">{hotspot.percentageY}%</span>
        </div>
      )}
    </>
  );
};
