import React from "react"
import { StoreProvider } from "../StoreProvider/StoreProvider"
import { Outlet } from "react-router"
import Header from "../Header"
import Modal from "../UI/Modal/Modal"

const App = () => {
  return (
    <React.StrictMode>
      <StoreProvider>
        <Header />
        <Outlet />
        <Modal />
      </StoreProvider>
    </React.StrictMode>
  )
}

export default App