import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipesSlice, RecipesSliceType } from "./recipeSlice";
import { createFavoriteSlice, FavoritesSliceType  } from "./favoriteSlice";
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";
import { AiSliceType, createAiSlice } from "./aiSlice";

export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationSliceType & AiSliceType>()(devtools( (...a) => ({
  ...createRecipesSlice(...a),
  ...createFavoriteSlice(...a),
  ...createNotificationSlice(...a),
  ...createAiSlice(...a)
})))

