import { RouteObject} from "react-router"
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
import LOCAL_ENDPOINT from "./localEndpoint";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";

export const routesConfig: RouteObject[] = [
  {
    path: LOCAL_ENDPOINT.MAIN,
    element: <App />,
    children: [
      {
        path: LOCAL_ENDPOINT.MAIN,
        element: <ProductsPage />
      },
      {
        path: LOCAL_ENDPOINT.PRODUCTS,
        element: <ProductsPage />
      },
      {
        path: LOCAL_ENDPOINT.PRODUCT,
        element: <ProductPage />
      },
      {
        path: LOCAL_ENDPOINT.CATEGORIES,
        element: <CategoriesPage />
      },
      {
        path: LOCAL_ENDPOINT.CATEGORY,
        element: <CategoryPage />
      },
      {
        path: LOCAL_ENDPOINT.CART,
        element: <CartPage />
      },
      {
        path: LOCAL_ENDPOINT.AUTH,
        element: <AuthPage />
      },
      {
        path: LOCAL_ENDPOINT.REGIST,
        element: <RegistPage />
      },
      {
        path: LOCAL_ENDPOINT.PROFILE,
        element: <ProfilePage />
      },
      {
        path: LOCAL_ENDPOINT.SETTINGS,
        element: <SettingsPage />
      },
    ]
  },
  {
    path: "*",
    element: <ErrorPage />,
  }
];