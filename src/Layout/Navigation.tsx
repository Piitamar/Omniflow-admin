import {
  BarChart3,
  Box,
  ShoppingBag,
  Settings,
  ChevronRight,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useProducts } from "../Features/Products/useProducts";
import { useOrders } from "../Features/Orders/useOrders";
import { useUIStore } from "../UIstore";

export default function Navigation() {
  const { loginUser } = useUIStore();
  const { products } = useProducts({
    userId: loginUser?.id
  });
  const { orders } = useOrders({ userId: loginUser?.id });
  const productCount = products.length;
  const orderCount = orders.length;

  const navigationItems = [
    {
      label: "Dashboard",
      path: "/",
      icon: BarChart3,
    },
    {
      label: "Products",
      path: "/products",
      icon: Box,
      count: productCount,
    },
    {
      label: "Orders",
      path: "/orders",
      icon: ShoppingBag,
      count: orderCount,
    },
    {
      label: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <nav className="px-4">
      <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Workspace
      </p>

      <div className="space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                [
                  "flex h-12 items-center gap-3 rounded-xl px-3 text-sm font-medium transition",
                  isActive
                    ? "bg-indigo-50 text-indigo-500"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                ].join(" ")
              }
            >
              <Icon size={20} />

              <span className="flex-1">
                {item.label}
              </span>

              {item.count !== undefined && (
                <span className="text-xs text-slate-400">
                  {item.count}
                </span>
              )}

              {item.label !== "Dashboard" &&
                item.label !== "Settings" && (
                  <ChevronRight
                    size={16}
                    className="text-slate-400"
                  />
                )}
            </NavLink>
          );
        })}
      </div>

      <div className="mt-8">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Manage
        </p>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            [
              "flex h-12 items-center gap-3 rounded-xl px-3 text-sm font-medium transition",
              isActive
                ? "bg-indigo-50 text-indigo-500"
                : "text-slate-600 hover:bg-slate-50",
            ].join(" ")
          }
        >
          <Settings size={20} />

          <span>Settings</span>
        </NavLink>
      </div>
    </nav>
  );
}

