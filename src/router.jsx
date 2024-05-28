import { createBrowserRouter } from "react-router-dom";
import { Index } from "./pages/index";
import { Movie } from "./pages/movie";
import { Basket } from "./pages/basket.jsx";
import { List } from "./pages/list.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/movie/:id",
    element: <Movie />,
  },
  {
    path: "/basket",
    element: <Basket />,
  },
  {
    path: "/list/:id",
    element: <List />,
  },
]);
