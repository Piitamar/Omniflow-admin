import { createBrowserRouter } from "react-router-dom";

import AppLayout from "./Layout/AppLayout";

import { Dashboard } from "./Features/Dashboard/Dashboard";
import { Products } from "./Features/Dashboard/Dashboard";
import { Orders } from "./Features/Dashboard/Dashboard";
import { Customers } from "./Features/Dashboard/Dashboard";
import { Settings } from "./Features/Dashboard/Dashboard";

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