import 'react';
import ReactDom from 'react-dom/client';
import "./styles/index.global.scss"
import { createBrowserRouter, RouterProvider } from 'react-router';
import { routesConfig } from './config/routes';

const router = createBrowserRouter(routesConfig)
const rootElement = document.getElementById('root')

if (rootElement) {
  const root = ReactDom.createRoot(rootElement)
  root.render(<RouterProvider router={router}/>);
} else {
  console.error("Элемент с id 'root' не найден в DOM")
}
