import { useAppStore } from "../stores/useAppStore"
import type { Drink } from "../types"

type DrinkCardProps = {
  drink: Drink
}

export default function DrinkCard({drink} : DrinkCardProps) {

  const { selectRecipe } = useAppStore()
  
  return (
    <>
      <button onClick={() => selectRecipe(drink.idDrink)} className="shadow-lg group cursor-pointer">
        <div>
          <div className="overflow-hidden">
            <img 
              className="group-hover:scale-115 duration-300 group-hover:rotate-2 transition-transform"
              src={drink.strDrinkThumb} 
              alt={`imagen de ${drink.strDrink}`} 
            />
          </div>
          <div className="p-5">
            <h2 className="text-2xl transition-colors truncate font-black group-hover:text-orange-500 duration-300">{drink.strDrink}</h2>

            <div
              className="rounded-lg bg-orange-400 group-hover:bg-orange-500 transition-colors duration-300 w-full mt-5 p-3 font-bold uppercase text-white text-lg"
            >ver receta</div>
          </div>

        </div>

      </button>
    </>
  )
}
