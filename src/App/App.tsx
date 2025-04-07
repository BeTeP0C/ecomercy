import React from "react"
import "./styles.module.scss"
import { StoreProvider } from "./components/StoreProvider/StoreProvider"
import { Outlet } from "react-router"
import Header from "./components/Header"

const App = () => {
  return (
    <React.StrictMode>
      <StoreProvider>
        <Header />
        <Outlet />
      </StoreProvider>
    </React.StrictMode>
  )
}

export default App