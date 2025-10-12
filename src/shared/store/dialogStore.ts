import { create } from 'zustand';

export type DialogMode = 'channel' | 'silo' | null;

interface DialogState {
  isOpen: boolean;
  mode: DialogMode;
  selectedSilo: number | null; // for channel creation
  name: string;
  openChannel: (siloId: number) => void;
  openSilo: () => void;
  close: () => void;
  setName: (value: string) => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  mode: null,
  selectedSilo: null,
  name: '',
  openChannel: (siloId: number) => set({ isOpen: true, mode: 'channel', selectedSilo: siloId, name: '' }),
  openSilo: () => set({ isOpen: true, mode: 'silo', selectedSilo: null, name: '' }),
  close: () => set({ isOpen: false, mode: null, selectedSilo: null, name: '' }),
  setName: (value: string) => set({ name: value }),
}));

