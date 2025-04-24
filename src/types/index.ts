import {z} from 'zod';
import { CategoriesAPIResponseSchema, DrinkAPIResponse, DrinksAPIReponse, RecipeAPIResponseSchema, SearchFilterSchema } from '../schemas/recipes-schema';

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>

export type SearchFilter = z.infer<typeof SearchFilterSchema>

export type Drinks = z.infer<typeof DrinksAPIReponse>

export type Drink = z.infer<typeof DrinkAPIResponse>

export type Recipe = z.infer<typeof RecipeAPIResponseSchema>