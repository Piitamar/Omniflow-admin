import { useState } from "react";
import {
    Search,
    Plus,
    LayoutGrid,
    Table2,
    Filter,
    ChevronRight,
    MoreHorizontal,
} from "lucide-react";
import { formatCurrency, formatDate } from "../Shared/formatters";
import { useOrders } from "./useOrders";
import { useUIStore } from "../../UIstore";

const statuses = [
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipping" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
];

const statusStyles: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700",
    processing: "bg-blue-100 text-blue-600",
    shipped: "bg-violet-100 text-violet-600",
    completed: "bg-emerald-100 text-emerald-700",
    cancelled: "bg-red-100 text-red-600",
};

const statusDots: Record<string, string> = {
    pending: "bg-amber-500",
    processing: "bg-blue-500",
    shipped: "bg-violet-500",
    completed: "bg-emerald-500",
    cancelled: "bg-red-500",
};

function getInitials(name: string) {
    return name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

export default function Orders() {
    const [view, setView] = useState<"board" | "table">("board");
    const loginUser = useUIStore((state) => state.loginUser);
    const { orders } = useOrders({ userId: loginUser?.id });

    return (
        <div className="min-h-screen min-w-0 bg-[#f7f8fa] text-[#19191f]">
            <main className="min-w-0 p-5 md:p-8 lg:p-10">
                {/* Page header */}
                <div className="mb-8 flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
                    <div>
                        <p className="mb-3 text-sm font-semibold tracking-[0.12em] text-indigo-600">
                            FULFILLMENT
                        </p>

                        <h1 className="text-3xl font-normal tracking-tight md:text-4xl">
                            Orders
                        </h1>

                        <p className="mt-3 text-base text-gray-500">
                            Monitor performance, manage operations, and grow your business.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        {/* View switch */}
                        <div className="flex rounded-xl bg-[#f0f0f3] p-1">
                            <button
                                type="button"
                                onClick={() => setView("board")}
                                aria-pressed={view === "board"}
                                className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm transition ${view === "board"
                                        ? "bg-white text-gray-900 shadow-sm"
                                        : "text-gray-500 hover:text-gray-900"
                                    }`}
                            >
                                <LayoutGrid size={20} />
                                Board
                            </button>

                            <button
                                type="button"
                                onClick={() => setView("table")}
                                aria-pressed={view === "table"}
                                className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm transition ${view === "table"
                                        ? "bg-white text-gray-900 shadow-sm"
                                        : "text-gray-500 hover:text-gray-900"
                                    }`}
                            >
                                <Table2 size={20} />
                                Table
                            </button>
                        </div>

                        <button
                            type="button"
                            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                        >
                            <Plus size={21} />
                            Create order
                        </button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="mb-5 flex flex-col justify-between gap-3 xl:flex-row xl:items-center">
                    <div className="relative w-full xl:max-w-[550px]">
                        <Search
                            size={21}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                        />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="h-[52px] w-full rounded-xl border border-gray-200 bg-white pl-12 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            type="button"
                            className="flex h-[52px] items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 font-medium transition hover:bg-gray-50"
                        >
                            <Filter size={20} />
                            Filter
                        </button>

                        <button
                            type="button"
                            className="flex h-[52px] items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 font-medium transition hover:bg-gray-50"
                        >
                            May 1 – May 30
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Board view */}
                {view === "board" && (
                    <div className="overflow-x-auto pb-4">
                        <div className="flex min-w-max items-start gap-4">
                            {statuses.map(({ value, label }) => {
                                const statusOrders = orders.filter(
                                    (order) => order.status === value
                                );

                                return (
                                    <section
                                        key={value}
                                        className="w-[280px] shrink-0 rounded-2xl border border-gray-200 bg-[#f1f1f4] p-3"
                                    >
                                        {/* Column header */}
                                        <div className="mb-3 flex items-center justify-between px-1 py-1">
                                            <div className="flex items-center gap-2.5">
                                                <span
                                                    className={`h-2.5 w-2.5 rounded-full ${statusDots[value] ?? "bg-gray-400"
                                                        }`}
                                                />
                                                <h2 className="text-sm font-semibold">{label}</h2>
                                                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-2 text-xs text-gray-500">
                                                    {statusOrders.length}
                                                </span>
                                            </div>

                                            <button
                                                type="button"
                                                aria-label={`More options for ${label}`}
                                                className="rounded-md p-1 text-gray-500 hover:bg-gray-200"
                                            >
                                                <MoreHorizontal size={21} />
                                            </button>
                                        </div>

                                        {/* Order cards */}
                                        <div className="space-y-3">
                                            {statusOrders.map((order) => (
                                                <article
                                                    key={order.id}
                                                    className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                                                >
                                                    <div className="flex items-center justify-between gap-2">
                                                        <h3 className="text-sm font-bold">
                                                            #{order.orderNumber}
                                                        </h3>
                                                        <button
                                                            type="button"
                                                            aria-label={`More options for order ${order.orderNumber}`}
                                                            className="rounded-md p-1 text-gray-600 hover:bg-gray-100"
                                                        >
                                                            <MoreHorizontal size={20} />
                                                        </button>
                                                    </div>

                                                    <p className="mt-3 text-xs text-gray-500">
                                                        {order.type}
                                                    </p>

                                                    <div className="mt-4 flex items-center gap-3">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-600">
                                                            {getInitials(order.customerId)}
                                                        </div>

                                                        <div className="min-w-0">
                                                            <p className="truncate text-xs font-semibold">
                                                                {order.customerId}
                                                            </p>
                                                            <p className="mt-1 text-[11px] text-gray-500">
                                                                {order.itemCount}{" "}
                                                                {order.itemCount === 1 ? "item" : "items"}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-3">
                                                        <span className="text-xs text-gray-500">
                                                            Total
                                                        </span>
                                                        <span className="text-sm font-bold">
                                                            {formatCurrency(order.total)}
                                                        </span>
                                                    </div>
                                                </article>
                                            ))}

                                            <button
                                                type="button"
                                                className="flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm text-gray-500 transition hover:bg-gray-200 hover:text-gray-800"
                                            >
                                                <Plus size={19} />
                                                Add order
                                            </button>
                                        </div>
                                    </section>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Table view */}
                {view === "table" && (
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[850px] border-collapse text-left">
                                <thead className="bg-[#f2f2f4]">
                                    <tr className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                        <th className="px-6 py-5">Order ID</th>
                                        <th className="px-6 py-5">Customer</th>
                                        <th className="px-6 py-5">Status</th>
                                        <th className="px-6 py-5">Items</th>
                                        <th className="px-6 py-5">Total</th>
                                        <th className="px-6 py-5">Date</th>
                                        <th className="px-4 py-5"></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders.map((order) => (
                                        <tr
                                            key={order.id}
                                            className="border-t border-gray-200 transition hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-5 text-sm font-bold">
                                                #{order.orderNumber}
                                            </td>

                                            <td className="px-6 py-5 text-sm">
                                                {order.customerId}
                                            </td>

                                            <td className="px-6 py-5">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[
                                                        order.status
                                                        ] ?? "bg-gray-100 text-gray-600"
                                                        }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>

                                            <td className="px-6 py-5 text-sm">
                                                {order.itemCount}{" "}
                                                {order.itemCount === 1 ? "item" : "items"}
                                            </td>

                                            <td className="px-6 py-5 text-sm font-bold">
                                                {formatCurrency(order.total)}
                                            </td>

                                            <td className="whitespace-nowrap px-6 py-5 text-sm">
                                                {formatDate(order.createdAt)}
                                            </td>

                                            <td className="px-4 py-5">
                                                <button
                                                    type="button"
                                                    aria-label={`More options for order ${order.orderNumber}`}
                                                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                                                >
                                                    <MoreHorizontal size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
