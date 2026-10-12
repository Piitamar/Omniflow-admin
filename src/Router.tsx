import { createBrowserRouter } from "react-router-dom";

import AppLayout from "./Layout/AppLayout";

import { Dashboard } from "./Features/Dashboard/Dashboard";
import  Products  from "./Features/Products/Products";
import Orders from "./Features/Orders/Orders";
import { Customers } from "./Features/Dashboard/Dashboard";
import  Settings  from "./Features/Settings/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);
