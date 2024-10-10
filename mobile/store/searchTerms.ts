import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./storage";
import { STORAGE_NAMES } from "@/constants";

type TQuery = {
  search: string;
  favorites: string;
};

interface TSearchTermsState {
  query: TQuery;
  update: (q: TQuery) => void;
  restore: () => void;
}

export const useSearchTermsStore = create<TSearchTermsState>()(
  persist(
    (set, _get) => ({
      query: { favorites: "", search: "" },
      update: (q) => set({ ..._get(), query: q }),
      restore: () => set({ ..._get(), query: { favorites: "", search: "" } }),
    }),
    {
      name: STORAGE_NAMES.SEARCH_TERMS,
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
