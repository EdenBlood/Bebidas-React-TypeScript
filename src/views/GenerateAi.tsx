import { useAppStore } from "../stores/useAppStore";

export default function GenerateAI() {

  const { showNotification, generateRecipe, recipe, isGenerating } = useAppStore()
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget)
    const prompt = form.get("prompt") as string
    if ( prompt.trim() === "" ) {
      showNotification({ 
        text: "Ingresa un Prompt",
        error: true 
      })
      return;
    }

    await generateRecipe(prompt)
  }
  
  return (
    <>

      <div className="w-[95%] max-w-5xl mx-auto">
      
        <h1 className="my-8 text-6xl font-extrabold">Generar Receta con IA</h1>
        <form  
          onSubmit={handleSubmit}
          className='flex flex-col space-y-3 py-10'
        >
          <div className="w-[80%] mx-auto relative">
            
            <input 
              name="prompt" 
              id="prompt" 
              className="border bg-white p-3 rounded-lg w-full border-slate-800" 
              placeholder="Genera una receta con ingredientes. Ej. Bebida con Tequila y Fresa"
            />
            <button 
              type="submit" 
              aria-label="Enviar"
              className={`cursor-pointer absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 hover:text-orange-500 disabled:hover:text-black disabled:opacity-50 disabled:cursor-not-allowed text-black transition-all duration-300 `}
              disabled={isGenerating}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </button>
          </div>
        </form>
        { isGenerating && ( 
          <p className="font-semibold text-center animate-blink">Generando...</p>
        )}
        <div className="w-[80%] mx-auto py-10 whitespace-pre-wrap">
          {recipe}
        </div>
      </div>

    </> 
  )
}