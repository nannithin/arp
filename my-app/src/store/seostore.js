import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useSEOStore = create(
  persist(
    (set) => ({
      channelData: null,
      channelStats: null,

      setChannelData: (data) => set({ channelData: data }),
      setChannelStats: (stats) => set({ channelStats: stats }),

      reset: () => set({ channelData: null, channelStats: null }),
    }),
    {
      name: "seo-store", // localStorage key
    }
  )
)

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-store", // localStorage key
    }
  )
)
