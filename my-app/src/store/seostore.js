import { create } from "zustand"

export const useSEOStore = create((set) => ({
  channelData: null,
  channelStats: null,

  setChannelData: (data) => set({ channelData: data }),
  setChannelStats: (stats) => set({ channelStats: stats }),

  reset: () => set({ channelData: null, channelStats: null }),
}))
