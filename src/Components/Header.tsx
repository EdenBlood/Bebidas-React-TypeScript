import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {

  const [ searchFilters, setSearchFilters ] = useState({
    ingredient: '',
    category: ''
  })
  const location = useLocation();

  const isHome = useMemo(() => location.pathname === "/" , [location.pathname])

  const { fetchCategories, categories, searchRecipes, setShouldScrollToResults, showNotification } = useAppStore()
  
  useEffect(() => {
    fetchCategories();
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> ) => {
    setSearchFilters({
      ...searchFilters, 
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ( Object.values( searchFilters ).some( value => String(value).trim() === '' ) ) {
      showNotification({text: "Todos los campos son obligatorios", error: true})
      return;
    }
    
    //* Buscar las recetas.
    searchRecipes( searchFilters );
    setTimeout(()=> {
      setShouldScrollToResults( false );
    }, 100)
  }

  return (
    <header className={ isHome ? "bg-[url(/bg.jpg)] bg-center bg-cover" :"bg-slate-800"}>
      <div className={ isHome ? "h-screen w-[95%] max-w-6xl mx-auto px-5 py-16" : "mx-auto container px-5 py-16"}>
        <div className="flex justify-between items-center">
          <div>
            <img className="w-32" src="logo.svg" alt="Logotipo" />
          </div>

          <nav className="text-white uppercase font-bold">
            <NavLink 
              className={ ( {isActive} ) => isActive 
                ? "px-2 text-orange-500 border-b border-orange-500" 
                : "px-2 text-white border-white hover:text-orange-500  hover:border-orange-500 transition-colors duration-500"
              } 
              to="/"
            >Inicio</NavLink>

            <NavLink 
              className={ ( {isActive} ) => isActive 
                ? "px-2 text-orange-500 border-b border-orange-500" 
                : "px-2 text-white border-white hover:text-orange-500 hover:border-b hover:border-orange-500 transition-colors duration-500"
              } 
              to="/favoritos"
            >Favoritos</NavLink>

            <NavLink 
              className={ ( {isActive} ) => isActive 
                ? "px-2 text-orange-500 border-b border-orange-500" 
                : "px-2 text-white border-white hover:text-orange-500 hover:border-b hover:border-orange-500 transition-colors duration-500"
              } 
              to="/GenerateAi"
            >Generar con IA</NavLink>
          </nav>
        </div>

        { isHome && (
          <form 
            onSubmit={handleSubmit}
            className="md:w-1/2 2xl:w-1/3 bg-orange-500/90 shadow p-5 rounded-lg mx-auto my-20 space-y-6"
          >

            <div className="space-y-3">
              <label 
                htmlFor="ingredient"
                className="block text-white uppercase font-extrabold text-lg"
              >Nombre o Ingredientes</label>
              <input 
                id="ingredient" 
                onChange={handleChange} 
                value={ searchFilters.ingredient }
                name="ingredient"
                type="text" 
                className="p-2 w-full bg-slate-100 border border-slate-400 rounded-lg focus:outline-none"
                placeholder="Vodka, Tekila, Cafe..."

              />
            </div>

            <div className="space-y-3">
              <label 
                htmlFor="category"
                className="block text-white uppercase font-extrabold text-lg"
              >Categoría</label>
              <select 
                name="category" 
                id="category" 
                onChange={handleChange} 
                value={ searchFilters.category } 
                className="p-2 w-full bg-slate-100 border border-slate-400 rounded-lg focus:outline-none"
              >
                <option value="">-- Seleccione --</option>
                { categories.drinks.map( category => (
                  <option 
                    key={category.strCategory} 
                    value={category.strCategory} 
                  >
                    { category.strCategory }
                  </option>
                ) ) }
              </select>
            </div>

            <input 
              type="submit"
              value="Buscar Recetas"
              className="bg-orange-900 hover:bg-gray-950 text-white hover:text-amber-200 transition-colors duration-300 font-extrabold uppercase block md:mx-auto p-2 rounded-lg cursor-pointer "
            />
          </form>
        )}

      </div>
    </header>
  )
}
