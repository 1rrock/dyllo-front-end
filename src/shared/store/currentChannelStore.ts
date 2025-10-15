import { create } from 'zustand';

export interface SiloInfo {
  siloId: number;
  name: string;
  channels?: { channelId: number; name: string }[];
}

export interface ChannelInfo {
  channelId: number;
  name: string;
}

interface CurrentChannelState {
  currentSilo: SiloInfo | null;
  currentChannel: ChannelInfo | null;
  setCurrentSilo: (silo: SiloInfo | null) => void;
  setCurrentChannel: (channel: ChannelInfo | null) => void;
  setCurrent: (silo: SiloInfo | null, channel: ChannelInfo | null) => void;
  clear: () => void;
  getCurrentSilo: () => SiloInfo | null;
  getCurrentChannel: () => ChannelInfo | null;
}

export const useCurrentChannelStore = create<CurrentChannelState>((set, get) => ({
  currentSilo: null,
  currentChannel: null,
  setCurrentSilo: (silo) => set({ currentSilo: silo }),
  setCurrentChannel: (channel) => set({ currentChannel: channel }),
  setCurrent: (silo, channel) => set({ currentSilo: silo, currentChannel: channel }),
  clear: () => set({ currentSilo: null, currentChannel: null }),
  getCurrentSilo: () => get().currentSilo,
  getCurrentChannel: () => get().currentChannel,
}));

