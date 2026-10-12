import { useState } from "react";
import {
  Upload,
  Plus,
  ChevronRight,
  MoreHorizontal,
  Package,
} from "lucide-react";
import Search from "../../Layout/Search";
import { formatCurrency } from "../Shared/formatters";
import { useProducts } from "./useProducts";
import { useUIStore } from "../../UIstore";
import type { Product } from "./types";
import AddProductModal, { type AddProductFormData } from "./AddProductModal";

export default function Products() {
  const { loginUser } = useUIStore()
  const { products, setProducts } = useProducts({
    userId: loginUser?.id,
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const totalProducts = products.length;
  const activeProducts = products.filter(
    (product) => product.status === "active",
  ).length;
  const stockProducts = products.filter(
    (product) => product.stock > 0 && product.stock <= 10,
  ).length;
  const outOfStockProducts = products.filter(
    (product) => product.stock === 0,
  ).length;

  const handleAddProduct = (form: AddProductFormData) => {
    const newProduct: Product = {
      sku: form.sku,
      name: form.name,
      price: form.basePrice,
      image: form.images[0]
        ? URL.createObjectURL(form.images[0])
        : "",
      category: form.category,
      stock: form.trackQuantity ? form.quantityAvailable : 0,
      status: "active",
      createdAt: new Date().toISOString(),
    };

    setProducts((prev) => [...prev, newProduct]);
    setIsAddModalOpen(false);

    console.log("Products:", newProduct);
  };

  return (
    <div className="min-h-full bg-[#f8f9fc] px-6 py-7 text-slate-900 lg:px-10">
      {/* Header */}
      <div className="mb-7 flex flex-wrap items-center justify-between gap-5">
        <div>
          <p className="mb-2 text-xs font-bold tracking-widest text-indigo-500">
            CATALOG
          </p>

          <h1 className="text-3xl font-medium tracking-tight">
            Products
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Monitor performance, manage operations, and grow your business.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className="flex h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold hover:bg-slate-50"
          >
            <Upload size={18} />
            Import
          </button>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex h-12 items-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-md shadow-indigo-200 hover:bg-indigo-700"
          >
            <Plus size={20} />
            Add product
          </button>
        </div>
      </div>

      {/* Product summary */}
      <div className="mb-6 flex flex-wrap gap-x-7 gap-y-3 border-b border-slate-200 pb-6 text-sm">
        <div>
          <span className="font-bold">{totalProducts.toLocaleString("en-US")}</span>
          <span className="ml-2 text-slate-500">All products</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="font-bold">{activeProducts.toLocaleString("en-US")}</span>
          <span className="text-slate-500">Active</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span className="font-bold">{stockProducts.toLocaleString("en-US")}</span>
          <span className="text-slate-500">Low stock</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-rose-500" />
          <span className="font-bold">{outOfStockProducts.toLocaleString("en-US")}</span>
          <span className="text-slate-500">Out of stock</span>
        </div>
      </div>

      {/* Products table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-4">
          <div className="w-full lg:max-w-105">
            <Search />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 px-4 text-sm font-semibold hover:bg-slate-50"
            >
              Category
              <ChevronRight size={16} />
            </button>

            <button
              type="button"
              className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 px-4 text-sm font-semibold hover:bg-slate-50"
            >
              Stock status
              <ChevronRight size={16} />
            </button>

            <button
              type="button"
              aria-label="More actions"
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50"
            >
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-212.5 text-left">
            <thead className="bg-[#f5f5f7] text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-4 py-4">SKU</th>
                <th className="px-4 py-4">Category</th>
                <th className="px-4 py-4">Price</th>
                <th className="px-4 py-4">Inventory</th>
                <th className="px-4 py-4" />
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.sku}
                  className="border-t border-slate-200 hover:bg-slate-50/70"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Package size={22} className="text-slate-400" />
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-semibold">{product.name}</p>
                        <p className="mt-1 text-xs text-slate-400">
                          {product.status === "active" ? "Active" : "Inactive"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-500">
                    {product.sku}
                  </td>

                  <td className="px-4 py-4 text-sm">{product.category}</td>

                  <td className="px-4 py-4 text-sm font-semibold">
                    {formatCurrency(product.price)}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1.5 text-xs font-semibold ${product.stock === 0
                          ? "bg-red-100 text-red-600"
                          : product.stock <= 10
                            ? "bg-amber-100 text-amber-700"
                            : "bg-emerald-100 text-emerald-700"
                          }`}
                      >
                        {product.stock === 0
                          ? "Out of stock"
                          : product.stock <= 10
                            ? "Low stock"
                            : "In stock"}
                      </span>

                      <span className="whitespace-nowrap text-xs text-slate-500">
                        {product.stock} units
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <button
                      type="button"
                      aria-label={`Actions for ${product.name}`}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-100"
                    >
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <Package
                      size={30}
                      className="mx-auto text-slate-300"
                    />
                    <p className="mt-3 text-sm font-medium text-slate-700">
                      No products yet
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Your products will appear here.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-5 py-4 text-sm text-slate-500">
          Showing {products.length} products
        </div>
      </div>

      {/* Modal sẽ được nối với component hiện có sau */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddProduct}
      />
    </div>
  );
}
