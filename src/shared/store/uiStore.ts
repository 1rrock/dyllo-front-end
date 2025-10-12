import { create } from 'zustand';

interface UiState {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  isSidebarOpen: false,
  setIsSidebarOpen: (open) => set({ isSidebarOpen: open }),
}));


