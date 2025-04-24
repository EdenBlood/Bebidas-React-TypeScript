import { useEffect, useMemo, useRef } from "react";
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../Components/DrinkCard";

export default function IndexPage() {

  const { shouldScrollToResults } = useAppStore()

  const resultsRef = useRef<HTMLElement | null>(null)

  const { drinks: { drinks } } = useAppStore();

  const hasDrinks = useMemo(() => drinks.length, [drinks])

  useEffect(() => {
    if (shouldScrollToResults) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [shouldScrollToResults])

  return (
    <>
      <h1 className="text-6xl font-extrabold pt-5">Recetas</h1>
      <section className="min-h-screen" ref={resultsRef}>
        {hasDrinks 
          ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-10 gap-10"> 
              { drinks.map( drink => (
                <DrinkCard key={drink.idDrink} drink={drink} />
              ))}
            </div>
          )
          : ( <p className="py-10 text-center text-2xl">No hay resultados aún, utiliza el formulario para buscar recetas</p>)
        }

      </section>
    </>
  )
}
