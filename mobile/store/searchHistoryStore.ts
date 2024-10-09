import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./storage";
import { STORAGE_NAMES } from "@/constants";
import { TCocktail } from "@/types";

interface TSearchHistoryState {
  searches: TCocktail[];
  add: (cocktail: TCocktail) => void;
  remove: (cocktail: TCocktail) => void;
  clear: () => void;
}

export const useSearchHistoryStore = create<TSearchHistoryState>()(
  persist(
    (set, _get) => ({
      searches: [],
      clear: () => set({ ..._get(), searches: [] }),
      add: (cocktail) => {
        set({
          ..._get(),
          searches: [
            cocktail,
            ..._get().searches.filter((c) => c.name !== cocktail.name),
          ],
        });
      },
      remove: (cocktail) =>
        set({
          ..._get(),
          searches: [
            ..._get().searches.filter((f) => f.name !== cocktail.name),
          ],
        }),
    }),
    {
      name: STORAGE_NAMES.SEARCH_HISTORY,
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
