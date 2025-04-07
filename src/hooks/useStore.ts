import { useContext } from "react";
import { StoreContext } from "../components/StoreProvider/StoreProvider";

export const useStore = () => useContext(StoreContext);