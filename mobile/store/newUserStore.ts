import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./storage";
import { STORAGE_NAMES } from "@/constants";

interface TNewUserState {
  new: boolean;
  toggle: () => void;
}

export const useNewUserStore = create<TNewUserState>()(
  persist(
    (set, _get) => ({
      new: true,
      toggle: () => set({ ..._get(), new: !_get().new }),
    }),
    {
      name: STORAGE_NAMES.NEW_TO_APP,
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
