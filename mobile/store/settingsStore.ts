import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./storage";
import { STORAGE_NAMES } from "@/constants";
export type TOrder = "desc" | "asc";
export type TSettings = {
  haptics: boolean;
  sound: boolean;
  order: TOrder;
};

interface TSettingsState {
  settings: TSettings;
  update: (settings: TSettings) => void;
  restore: () => void;
}

const initialSettings = {
  haptics: true,
  sound: true,
  order: "asc",
} satisfies TSettings;

export const useSettingsStore = create<TSettingsState>()(
  persist(
    (set, _get) => ({
      settings: initialSettings,
      update: (settings) => set({ ..._get(), settings }),
      restore: () => set({ ..._get(), settings: initialSettings }),
    }),
    {
      name: STORAGE_NAMES.SETTINGS,
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
