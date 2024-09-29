import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./storage";
import { STORAGE_NAMES } from "@/constants";
import { TCocktail } from "@/types";

interface TFavoritesState {
  favorites: TCocktail[];
  add: (cocktail: TCocktail) => void;
  remove: (cocktail: TCocktail) => void;
  clear: () => void;
}

export const useFavoritesStore = create<TFavoritesState>()(
  persist(
    (set, _get) => ({
      favorites: [],
      clear: () => set({ ..._get(), favorites: [] }),
      add: (cocktail) =>
        set({ ..._get(), favorites: [cocktail, ..._get().favorites] }),
      remove: (cocktail) =>
        set({
          ..._get(),
          favorites: [
            ..._get().favorites.filter((f) => f.name !== cocktail.name),
          ],
        }),
    }),
    {
      name: STORAGE_NAMES.FAVORITES,
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
