import { StateCreator } from "zustand";
import AiService from "../services/AiService"

export type AiSliceType = {
  recipe: string,
  isGenerating: boolean,
  generateRecipe: (prompt: string) => Promise<void>,

}

export const createAiSlice : StateCreator<AiSliceType, [], [], AiSliceType> = (set) => ({
  recipe: "",
  isGenerating: false,
  generateRecipe: async (prompt) => {
    set({ recipe: "", isGenerating: true })
    const data = await AiService.generateRecipe(prompt)

    for await (const textPart of data) {
      set(state => ({
        recipe: state.recipe + textPart
      }))
    }

    set({ isGenerating: false })
  }
})