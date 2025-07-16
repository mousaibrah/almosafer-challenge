import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IsFirstTimeStore {
  isFirstTime: boolean;
  setIsFirstTime: (isFirstTime: boolean) => void;
}

export const useIsFirstTime = create<IsFirstTimeStore>()(
  persist(
    (set) => ({
      isFirstTime: true,
      setIsFirstTime: (isFirstTime) => set({ isFirstTime }),
    }),
    {
      name: "is-first-time",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
