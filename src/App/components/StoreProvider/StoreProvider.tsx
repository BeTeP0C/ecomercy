import React, { createContext } from "react";
import { RootStore } from "../../../store/rootStore";

const rootStore = new RootStore ()

export const StoreContext = createContext(rootStore);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>;
};