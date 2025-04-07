import {Navigate, RouteObject} from "react-router"
import { routesVar } from "./routesVar";
import App from "../components/App";
import ProductsPage from "../pages/ProductsPage";
import ProductPage from "../pages/ProductsPage/components/ProductPage";
import CartPage from "@/pages/CartPage";

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <ProductsPage />
      },
      {
        path: "/products",
        element: <ProductsPage />
      },
      {
        path: "/products/:id",
        element: <ProductPage />
      },
      {
        path: "/cart",
        element: <CartPage />
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to={routesVar.main.mask} replace />,
  }
];