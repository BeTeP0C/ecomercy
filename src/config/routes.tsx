import {Navigate, RouteObject} from "react-router"
import { routesVar } from "./routesVar";
import App from "../App";
import ProductsPage from "../App/pages/ProductsPage";
import ProductPage from "../App/pages/ProductsPage/components/ProductPage";

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
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to={routesVar.main.mask} replace />,
  }
];