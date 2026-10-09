import {
  ArrowDownToLine,
  ArrowRight,
  Activity,
  CircleDollarSign,
  Ellipsis,
  ShoppingCart,
  UsersRound,
} from "lucide-react";

import { useUIStore } from "../../UIstore";
import { useDashboard } from "./useDashboard";
import { formatCurrency, formatChange, formatNumber } from "../Shared/formatters";
import UserMetrics from "./UserMetrics";
import RevenueOverviewChart from "./RevenueOverViewChart";

export function Dashboard() {
  const user = useUIStore((state) => state.loginUser);
  const { dashboard, isLoading } = useDashboard(user?.id);
  console.log("Dashboard data:", dashboard?.categories);

  const emptyValue = isLoading ? "Loading…" : "—";

  const metrics = [
    {
      label: "Total revenue",
      value: dashboard
        ? formatCurrency(dashboard.totalRevenue)
        : emptyValue,
      change: dashboard
        ? formatChange(dashboard.revenueChange)
        : "",
      icon: CircleDollarSign,
    },
    {
      label: "Total orders",
      value: dashboard
        ? formatNumber(dashboard.totalOrders)
        : emptyValue,
      change: dashboard
        ? formatChange(dashboard.ordersChange)
        : "",
      icon: ShoppingCart,
    },
    {
      label: "Conversion rate",
      value: dashboard
        ? formatNumber(dashboard.conversionRate)
        : emptyValue,
      change: dashboard
        ? formatChange(dashboard.conversionChange)
        : "",
      icon: Activity,
    },
    {
      label: "Active users",
      value: dashboard
        ? formatNumber(dashboard.activeUsers)
        : emptyValue,
      change: dashboard
        ? formatChange(dashboard.activeUsersChange)
        : "",
      icon: UsersRound,
    },
  ];

  return (
    <div className="space-y-5 p-4 lg:p-6">
      <section className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="mb-1 text-xs font-semibold tracking-[0.12em] text-indigo-500">
            OVERVIEW
          </p>

          <h1 className="text-2xl font-medium tracking-tight text-slate-900">
            Good morning, {user?.name ?? "there"}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Monitor performance, manage operations, and grow your business.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold shadow-sm">
            <ArrowDownToLine size={18} />
            Export report
          </button>

          <button className="inline-flex items-center gap-3 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200">
            View live store
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <UserMetrics metrics={metrics} />

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,2.1fr)_minmax(300px,0.9fr)]">
        <RevenueOverviewChart dashboard={dashboard} emptyValue={emptyValue} />

        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:p-7">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-medium">
                Top categories
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Sales by category
              </p>
            </div>

            <button
              aria-label="More category options"
              className="rounded-lg border border-slate-200 p-2.5 text-slate-500"
            >
              <Ellipsis size={21} />
            </button>
          </div>

          <div
            className="mx-auto my-7 grid size-52 place-items-center rounded-full"
            style={{
              background:
                "conic-gradient(#6366f1 0 42%, #8b5cf6 42% 70%, #06b6d4 70% 88%, #cbd5e1 88% 100%)",
            }}
          >
            <div className="grid size-32 place-content-center rounded-full bg-white text-center">
              <strong className="text-2xl">
                {dashboard
                  ? formatCurrency(dashboard.totalSales)
                  : emptyValue}
              </strong>

              <span className="mt-1 text-sm text-slate-500">
                Total sales
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {dashboard?.categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="flex items-center gap-3">
                  <i
                    className={`size-2.5 rounded-full ${category.category === "Electronics"
                      ? "bg-indigo-500"
                      : category.category === "Clothing"
                        ? "bg-purple-500"
                        : category.category === "Home & Garden"
                          ? "bg-teal-500"
                          : "bg-slate-300"}`}
                  />
                  {category.category}
                </span>

                <strong>{category.percentage}</strong>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-slate-200 pt-5 text-center">
            <button className="inline-flex items-center gap-2 text-sm font-medium text-indigo-500">
              View category report
              <ArrowRight size={17} />
            </button>
          </div>
        </article>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 lg:px-7">
          <div>
            <h2 className="text-xl font-medium">
              Recent orders
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest transactions across your store
            </p>
          </div>

          <button className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold">
            View all orders
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-190 text-left text-sm">
            <thead className="border-y border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-7 py-4 font-medium">
                  Order
                </th>

                <th className="px-4 py-4 font-medium">
                  Customer
                </th>

                <th className="px-4 py-4 font-medium">
                  Type
                </th>

                <th className="px-4 py-4 font-medium">
                  Date
                </th>

                <th className="px-4 py-4 font-medium">
                  Amount
                </th>

                <th className="px-7 py-4 font-medium">
                  Status
                </th>


              </tr>
            </thead>

            <tbody>
              {dashboard?.recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="px-7 py-4 font-semibold text-indigo-600">
                    {order.id}
                  </td>

                  <td className="px-4 py-4">
                    {order.customer}
                  </td>

                  <td className="px-4 py-4 text-slate-500">
                    {order.type}
                  </td>

                  <td className="px-4 py-4 text-slate-500">
                    {order.date}
                  </td>

                  <td className="px-4 py-4 font-medium">
                    {order.amount}
                  </td>

                  <td className="px-7 py-4">
                    <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export function Products() {
  return <div className="p-10">Products</div>;
}

export function Orders() {
  return <div className="p-10">Orders</div>;
}

export function Customers() {
  return <div className="p-10">Customers</div>;
}

export function Settings() {
  return <div className="p-10">Settings</div>;
}