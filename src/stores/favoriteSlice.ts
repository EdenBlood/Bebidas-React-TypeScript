import { StateCreator } from "zustand";
import { Recipe } from "../types";
import { NotificationSliceType } from "./notificationSlice";

export type FavoritesSliceType = {
  favorites: Recipe[],
  handleClickFavorite: (recipe: Recipe) => void,
  favoriteExists: (id: Recipe['idDrink']) => boolean,
  loadLocalStorage: () => void
}

export const createFavoriteSlice: StateCreator<FavoritesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get) => ({
  favorites: [],
  handleClickFavorite: (recipe) => {
    if( get().favoriteExists(recipe.idDrink) ) {
      const updatedFavorites = get().favorites.filter( favorite => favorite.idDrink !== recipe.idDrink )
      set({
        favorites: updatedFavorites
      })
      get().showNotification({
        text: 'Se eliminó de favoritos', 
        error: false
      })
    } else {
      set((state) => ({
        favorites: [...state.favorites, recipe]
      }))
      get().showNotification({
        text: 'Se agregó a Favoritos',
        error: false
      })
    }
    localStorage.setItem('Favorites_Drinks', JSON.stringify( get().favorites))
  },
  favoriteExists: (id) => {
    return get().favorites.some( favorite => favorite.idDrink === id)
  },
  loadLocalStorage: () => {
    const getStorage = localStorage.getItem('Favorites_Drinks')
    if(getStorage) {
      set({
        favorites: JSON.parse(getStorage)
      })
    }
  }
})