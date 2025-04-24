import { Dialog, Transition } from '@headlessui/react';
import { Fragment, JSX, useMemo } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { Recipe } from '../types';


export default function Modal() {
  const { recipeDetails, modal, closeModal, handleClickFavorite, favorites, favoriteExists } = useAppStore()

  const isFavorite = useMemo(() => favoriteExists(recipeDetails.idDrink), [favorites, modal])

  const renderIngredients = () => {
    const ingredients : JSX.Element[] = []
    for( let i = 1; i <= 6; i++) {
      const ingredient = recipeDetails[`strIngredient${i}` as keyof Recipe]
      const measure = recipeDetails[`strMeasure${i}` as keyof Recipe]

      if( ingredient && measure) {
        ingredients.push(
          <li key={i} className='text-lg font-normal'>
            {ingredient} - {measure}
          </li>
        )
      }
    }
    return ingredients
  }
  
  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => closeModal()}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-slate-50 px-4 py-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                  <Dialog.Title as="h3" className="text-gray-900 text-4xl font-extrabold text-center">
                      {recipeDetails.strDrink}
                  </Dialog.Title>
                  <img 
                    src={recipeDetails.strDrinkThumb} 
                    alt={`Imagen de ${recipeDetails.strDrink}`}
                    className='mx-auto w-80 mt-5' 
                  />
                  <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                    Ingredientes y Cantidades
                  </Dialog.Title>
                    {renderIngredients()}
                  <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                    Instrucciones
                  </Dialog.Title>
                  <p className='text-lg '>{recipeDetails.strInstructions}</p>

                  <div className='mt-5 flex justify-between gap-5'>
                    <button
                      type='button'
                      className='rounded-lg bg-gray-700 cursor-pointer hover:bg-gray-900 transition-colors duration-300 w-full p-3 font-bold uppercase text-white text-lg shadow'
                      onClick={closeModal}
                    >
                      Cerrar
                    </button>

                    <button
                      type='button'
                      className='rounded-lg bg-orange-500 cursor-pointer hover:bg-orange-600 transition-colors duration-300 w-full p-3 font-bold uppercase text-white text-lg shadow'
                      onClick={() => handleClickFavorite(recipeDetails)}
                    >
                      { isFavorite ? "Eliminar de Favoritos" : "Agregar a Favoritos" }
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
