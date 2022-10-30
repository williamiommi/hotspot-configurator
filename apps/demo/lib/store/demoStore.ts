import create from 'zustand';

interface IDemoStore {
  isDemoModalVisible: boolean;
  showDemoModal: () => void;
  hideDemoModal: () => void;
}

export const useDemoStore = create<IDemoStore>((set, get) => ({
  isDemoModalVisible: false,
  showDemoModal: () => set(() => ({ isDemoModalVisible: true })),
  hideDemoModal: () => set(() => ({ isDemoModalVisible: false })),
}));
