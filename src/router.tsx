import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layouts/Layout"

const IndexPage = lazy(() => import("./views/IndexPage"))
const FavoritePage = lazy(() => import("./views/FavoritesPage"))
const GenerateAi = lazy(() => import("./views/GenerateAi"))

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" index element={
            <Suspense fallback="Cargando...">
              <IndexPage />
            </Suspense>
          } />
          
          <Route path="/favoritos" element={
            <Suspense fallback="Cargando...">
              <FavoritePage />
            </Suspense>
          } /> 

          <Route path="/GenerateAi" element={
            <Suspense fallback="Cargando..">
              <GenerateAi />
            </Suspense>
            } />

        </Route>
      </Routes>

    </BrowserRouter>
  )
}
