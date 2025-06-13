import { createBrowserRouter } from "react-router";
import Home from "../pages/home";
import About from "../pages/about";
import Layout from "../components/layout";

export const routes = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "/about", Component: About },
    ],
  },
]);
