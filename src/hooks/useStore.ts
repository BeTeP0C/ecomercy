import { useContext } from "react";
import { StoreContext } from "../App/components/StoreProvider/StoreProvider";

export const useStore = () => useContext(StoreContext);