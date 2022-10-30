import create from 'zustand';
import IField from '../types/IField';
import IHotspot from '../types/IHotspot';
import IMedia from '../types/IMedia';
import { generateEmptyHotspot, wait } from '../utils';

interface IHotspotStore {
  isAppLoading: boolean;
  isImageLoaded: boolean;
  field?: IField;
  media?: IMedia;
  highlightedHotspot?: string;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  setIsAppLoading: (isAppLoading: boolean) => void;
  setIsImageLoaded: (isAppLoading: boolean) => void;
  setField: (field: IField) => void;
  clearField: () => void;
  setMedia: (media: IMedia) => void;
  clearMedia: () => void;
  highlightHotspot: (hotspotIdToHighlight: string) => void;
  addHotspot: () => IField;
  updateHotspot: (hotspotToUpdate: IHotspot) => IField;
  updateHotspotPosition: (
    hotspotId: string,
    positions: {
      x: number;
      y: number;
      naturalX: number;
      naturalY: number;
      percentageX: number;
      percentageY: number;
    }
  ) => IField;
  removeHotspot: (hotspotIdToRemove: string) => IField;
}

export const useHotspotStore = create<IHotspotStore>((set, get) => ({
  isAppLoading: false,
  isImageLoaded: false,
  isAdmin: false,
  setIsAdmin: (isAdmin) => set(() => ({ isAdmin })),
  setIsAppLoading: (isAppLoading) => set(() => ({ isAppLoading })),
  setIsImageLoaded: (isImageLoaded) => set(() => ({ isImageLoaded })),
  setField: (newField) =>
    set(() => ({
      field: {
        assetId: newField.assetId || '',
        hotspots: [...(newField.hotspots || [])],
      },
    })),
  clearField: () => set(() => ({ field: undefined })),
  setMedia: (media: IMedia) => set(() => ({ media })),
  clearMedia: () => set(() => ({ media: undefined })),
  highlightHotspot: async (hotspotIdToHighlight) => {
    set({ highlightedHotspot: hotspotIdToHighlight });
    await wait(2500);
    set({ highlightedHotspot: undefined });
  },
  addHotspot: () => {
    const newField = {
      ...get().field,
      hotspots: [...(get().field?.hotspots || []), generateEmptyHotspot()],
    };
    set(() => ({ field: newField }));
    return newField;
  },
  updateHotspot: (hotspotToUpdate) => {
    const newField = {
      ...get().field,
      hotspots: (get().field?.hotspots || []).map((currentHotspot) => {
        if (currentHotspot.id !== hotspotToUpdate.id) return currentHotspot;
        return hotspotToUpdate;
      }),
    };
    set(() => ({ field: newField }));
    return newField;
  },
  updateHotspotPosition: (hotspotId, { x, y, naturalX, naturalY, percentageX, percentageY }) => {
    const newField = {
      ...get().field,
      hotspots: (get().field?.hotspots || []).map((currentHotspot) => {
        if (currentHotspot.id === hotspotId)
          return { ...currentHotspot, x, y, naturalX, naturalY, percentageX, percentageY };
        return currentHotspot;
      }),
    };
    set(() => ({ field: newField }));
    return newField;
  },
  removeHotspot: (hotspotIdToRemove) => {
    const newField = {
      ...get().field,
      hotspots: (get().field?.hotspots || []).filter(
        (currentHotspot) => currentHotspot.id !== hotspotIdToRemove
      ),
    };
    set(() => ({ field: newField }));
    return newField;
  },
}));