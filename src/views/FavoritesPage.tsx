import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../Components/DrinkCard"

export default function FavoritesPage() {
  const {favorites} = useAppStore()
  
  const hasFavorites = useMemo(() => favorites.length, [favorites])
  
  return (
    <>
      <h1 className="text-6xl font-extrabold pt-5">Favoritos</h1>
      { !hasFavorites ? (
        <h1 className="text-2xl my-5 font-bold text-center">Aún no hay bebidas agregadas en Favoritos</h1>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-10 gap-10">
            { favorites.map( favorite => (
              <DrinkCard key={favorite.idDrink} drink={favorite} />
            )) }
          </div>
        </>
      ) }
    </>
  )
}
