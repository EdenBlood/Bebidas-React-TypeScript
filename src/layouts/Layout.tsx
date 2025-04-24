import Header from "../Components/Header";
import { Outlet } from "react-router-dom";
import Modal from "../Components/Modal";
import Notification from "../Components/Notification";
import { useEffect } from "react";
import { useAppStore } from "../stores/useAppStore";

//* Ruta: ./Layouts/Layout.tsx

export default function Layout() {
  const {loadLocalStorage} = useAppStore()

  useEffect(() => {
    loadLocalStorage()
  },[loadLocalStorage])
  
  return (
    <>
      <Header />    

      <main className="w-[95%] max-w-6xl mx-auto">
        <Outlet />
      </main>

      <Modal />
      <Notification />
    </>
  )
}
