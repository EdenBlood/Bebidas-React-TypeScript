import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeServices"

import type { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types"

export type RecipesSliceType = {
  categories: Categories ,
  drinks: Drinks,
  recipeDetails: Recipe,
  modal: boolean,
  shouldScrollToResults: boolean,
  fetchCategories: () => Promise<void>,
  searchRecipes: (searchFilter: SearchFilter) => Promise<void>,
  selectRecipe: (id: Drink['idDrink']) => Promise<void>,
  closeModal: () => void,
  setShouldScrollToResults: (value: boolean) => void
}

export const createRecipesSlice : StateCreator<RecipesSliceType> = (set) => ({
  categories: {
    drinks: []
  },
  drinks: {
    drinks: []
  },
  recipeDetails: {} as Recipe,
  modal: false,
  shouldScrollToResults: false,
  fetchCategories: async () => {
    const categories = await getCategories();
    set({
      categories
    })
  },
  searchRecipes: async (filter) => {
    const drinks = await getRecipes(filter);
    set({
      drinks,
      shouldScrollToResults: true
    })
  },
  selectRecipe: async (id) => {
    const recipeDetails = await getRecipeById(id)
    set({
      recipeDetails,
      modal: true
    })
  },
  closeModal: () => {
    set({
      recipeDetails: {} as Recipe,
      modal: false
    })
  },
  setShouldScrollToResults: (value) => set({ shouldScrollToResults: value })
})