import {Navigate, RouteObject} from "react-router"
import { routesVar } from "./routesVar";
import App from "../components/App";
import ProductsPage from "../pages/ProductsPage";
import ProductPage from "../pages/ProductsPage/components/ProductPage";
import CartPage from "@/pages/CartPage";
import CategoriesPage from "@/pages/CategoriesPage";
import CategoryPage from "@/pages/CategoriesPage/components/CategoryPage";
import AuthPage from "@/pages/AuthPage";
import RegistPage from "@/pages/RegistPage";
import ProfilePage from "@/pages/ProfilePage";
import SettingsPage from "@/pages/SettingsPage";

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
        path: "/categories",
        element: <CategoriesPage />
      },
      {
        path: "/categories/:category",
        element: <CategoryPage />
      },
      {
        path: "/cart",
        element: <CartPage />
      },
      {
        path: "/auth",
        element: <AuthPage />
      },
      {
        path: "/regist",
        element: <RegistPage />
      },
      {
        path: "/profile",
        element: <ProfilePage />
      },
      {
        path: "/settings",
        element: <SettingsPage />
      },
    ]
  },
  {
    path: "*",
    element: <Navigate to={routesVar.main.mask} replace />,
  }
];