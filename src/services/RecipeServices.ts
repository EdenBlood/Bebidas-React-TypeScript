import { CategoriesAPIResponseSchema, DrinksAPIReponse, RecipeAPIResponseSchema } from "../schemas/recipes-schema"
import { Drink, SearchFilter } from "../types"
import api from "../lib/axios"

export async function getCategories() {
  const url = '/list.php?c=list'

  const { data } = await api(url)

  const result = CategoriesAPIResponseSchema.safeParse( data )

  if (result.success) {
    return result.data
  }
}

export async function getRecipes({ingredient ,category}: SearchFilter) {
  const url =`/filter.php?c=${category}&i=${ingredient}`;
  
  const { data } = await api(url);
  const result = DrinksAPIReponse.safeParse( data );
  if (result.success) {
    return result.data;
  }
}

export async function getRecipeById(id: Drink['idDrink']) {
  const url = `/lookup.php?i=${id}`

  const { data } = await api(url);

  const result = RecipeAPIResponseSchema.safeParse( data.drinks[0] );
  if( result.success ) {
    return result.data
  }
}