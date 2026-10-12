import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  ImagePlus,
  Plus,
  Upload,
  X,
} from "lucide-react";

export interface AddProductFormData {
  name: string;
  description: string;
  category: string;
  brand: string;
  productType: string;
  basePrice: number;
  comparePrice: number | null;
  sku: string;
  color: string[];
  trackQuantity: boolean;
  quantityAvailable: number;
  lowStockAlert: number;
  warehouse: string;
  images: File[];
}

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: AddProductFormData) => void;
}

const initialForm: AddProductFormData = {
  name: "",
  description: "",
  category: "",
  brand: "",
  productType: "",
  basePrice: 0,
  comparePrice: null,
  sku: "",
  color: ["Black", "Silver", "Midnight Blue"],
  trackQuantity: true,
  quantityAvailable: 0,
  lowStockAlert: 10,
  warehouse: "",
  images: [],
};

const steps = [
  "Basic info",
  "Variants & pricing",
  "Inventory",
  "Media upload",
];

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

const labelClass = "mb-2 block text-sm font-semibold text-gray-800";

export default function AddProductModal({
  isOpen,
  onClose,
  onSave,
}: AddProductModalProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<AddProductFormData>(initialForm);
  const [colorInput, setColorInput] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const updateField = <K extends keyof AddProductFormData>(
    key: K,
    value: AddProductFormData[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    const validFiles = files.filter(
      (file) =>
        ["image/png", "image/jpeg", "image/webp"].includes(file.type) &&
        file.size <= 10 * 1024 * 1024,
    );

    updateField("images", [...form.images, ...validFiles]);
    event.target.value = "";
  };

  const addColor = () => {
    const color = colorInput.trim();
    if (!color || form.color.includes(color)) return;

    updateField("color", [...form.color, color]);
    setColorInput("");
  };

  const removeColor = (color: string) => {
    updateField(
      "color",
      form.color.filter((item) => item !== color),
    );
  };

  const handleNext = () => {
    if (step === 0 && !form.name.trim()) {
      setError("Please enter a product name.");
      return;
    }

    if (step === 0 && !form.category) {
      setError("Please select a category.");
      return;
    }

    if (step === 1 && !form.sku.trim()) {
      setError("Please enter a SKU.");
      return;
    }

    if (step === 1 && form.basePrice < 0) {
      setError("Base price cannot be negative.");
      return;
    }

    if (step === 2 && form.quantityAvailable < 0) {
      setError("Quantity cannot be negative.");
      return;
    }

    setError("");
    setStep((current) => Math.min(current + 1, 3));
  };

  const handleBack = () => {
    setError("");
    setStep((current) => Math.max(current - 1, 0));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (step < 3) {
      handleNext();
      return;
    }

    if (!form.name.trim() || !form.category || !form.sku.trim()) {
      setError("Please complete the required fields.");
      return;
    }

    onSave({
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      brand: form.brand.trim(),
      sku: form.sku.trim(),
      color: [...form.color],
      images: [...form.images],
    });

    // Close and reset after saving.
    setForm(initialForm);
    setStep(0);
    setError("");
    onClose();
  };

  const handleClose = () => {
    setForm(initialForm);
    setStep(0);
    setError("");
    setColorInput("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-product-title"
        className="flex h-full w-full flex-col overflow-hidden bg-white shadow-2xl md:max-w-4xl xl:max-w-5xl"
      >
        {/* Header */}
        <header className="flex shrink-0 items-center justify-between border-b border-gray-200 px-6 py-5 md:px-9">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.15em] text-indigo-500">
              New product
            </p>
            <h2
              id="add-product-title"
              className="text-2xl font-medium tracking-tight text-gray-900"
            >
              Add a product
            </h2>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="rounded-xl border border-gray-200 p-3 text-gray-800 transition hover:bg-gray-50"
          >
            <X size={23} />
          </button>
        </header>

        {/* Stepper */}
        <div className="shrink-0 overflow-x-auto border-b border-gray-200 px-6 py-5 md:px-9">
          <div className="flex min-w-[620px] items-center">
            {steps.map((title, index) => {
              const completed = index < step;
              const active = index === step;

              return (
                <div
                  key={title}
                  className="flex min-w-0 flex-1 items-center last:flex-none"
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (index < step) {
                        setStep(index);
                        setError("");
                      }
                    }}
                    disabled={index >= step}
                    className={`flex shrink-0 items-center gap-2.5 text-sm font-semibold ${
                      active || completed
                        ? "text-indigo-600"
                        : "text-gray-500"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
                        active || completed
                          ? "border-indigo-500 bg-indigo-500 text-white"
                          : "border-gray-200 bg-white text-gray-500"
                      }`}
                    >
                      {completed ? <Check size={18} /> : index + 1}
                    </span>
                    <span>{title}</span>
                  </button>

                  {index < steps.length - 1 && (
                    <div className="mx-3 h-px min-w-5 flex-1 bg-gray-200 md:mx-5" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form content */}
        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col"
        >
          <main className="min-h-0 flex-1 overflow-y-auto px-6 py-7 md:px-9 md:py-8">
            {/* STEP 1 */}
            {step === 0 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Basic information
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Add the essential details customers will see.
                  </p>
                </div>

                <div>
                  <label className={labelClass}>
                    Product name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    className={inputClass}
                    placeholder="e.g. Aero Wireless Headphones"
                    value={form.name}
                    maxLength={150}
                    onChange={(e) => updateField("name", e.target.value)}
                  />
                </div>

                <div>
                  <div className="mb-2 flex justify-between">
                    <label className={labelClass + " mb-0"}>
                      Description
                    </label>
                    <span className="text-xs text-gray-400">
                      {form.description.length}/500
                    </span>
                  </div>
                  <textarea
                    className={`${inputClass} min-h-32 resize-y`}
                    placeholder="Describe your product's features and benefits..."
                    value={form.description}
                    maxLength={500}
                    onChange={(e) =>
                      updateField("description", e.target.value)
                    }
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Category <span className="text-rose-500">*</span>
                    </label>
                    <select
                      className={inputClass}
                      value={form.category}
                      onChange={(e) =>
                        updateField("category", e.target.value)
                      }
                    >
                      <option value="">Select category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Audio">Audio</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Home & Living">Home & Living</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Brand</label>
                    <input
                      className={inputClass}
                      placeholder="e.g. Omni Audio"
                      value={form.brand}
                      onChange={(e) => updateField("brand", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Product type</label>
                  <input
                    className={inputClass}
                    placeholder="e.g. Wireless headphones"
                    value={form.productType}
                    onChange={(e) =>
                      updateField("productType", e.target.value)
                    }
                  />
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Variants & pricing
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Configure pricing and product options.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Base price <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex overflow-hidden rounded-xl border border-gray-200 focus-within:border-indigo-500">
                      <span className="flex items-center border-r border-gray-200 bg-gray-50 px-4 text-gray-600">
                        $
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        className="min-w-0 flex-1 px-4 py-3 outline-none"
                        value={form.basePrice}
                        onChange={(e) =>
                          updateField("basePrice", Number(e.target.value))
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Compare-at price</label>
                    <div className="flex overflow-hidden rounded-xl border border-gray-200 focus-within:border-indigo-500">
                      <span className="flex items-center border-r border-gray-200 bg-gray-50 px-4 text-gray-600">
                        $
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="299.00"
                        className="min-w-0 flex-1 px-4 py-3 outline-none"
                        value={form.comparePrice ?? ""}
                        onChange={(e) =>
                          updateField(
                            "comparePrice",
                            e.target.value === ""
                              ? null
                              : Number(e.target.value),
                          )
                        }
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    SKU <span className="text-rose-500">*</span>
                  </label>
                  <input
                    className={inputClass}
                    placeholder="e.g. AWH-024-BLK"
                    value={form.sku}
                    onChange={(e) => updateField("sku", e.target.value)}
                  />
                </div>

                <div>
                  <label className={labelClass}>Options</label>

                  <div className="rounded-xl border border-gray-200 p-4">
                    <p className="mb-3 text-sm font-semibold text-gray-800">
                      Color
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {form.color.map((color) => (
                        <span
                          key={color}
                          className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700"
                        >
                          {color}
                          <button
                            type="button"
                            onClick={() => removeColor(color)}
                            aria-label={`Remove ${color}`}
                            className="text-gray-400 hover:text-rose-500"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex gap-2">
                      <input
                        className={inputClass}
                        placeholder="Add a color..."
                        value={colorInput}
                        onChange={(e) => setColorInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addColor();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={addColor}
                        className="shrink-0 rounded-xl border border-gray-200 px-4 text-sm font-semibold hover:bg-gray-50"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Inventory
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage stock and fulfillment details.
                  </p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={form.trackQuantity}
                  onClick={() =>
                    updateField("trackQuantity", !form.trackQuantity)
                  }
                  className="flex w-full items-center justify-between rounded-xl border border-gray-200 p-5 text-left transition hover:border-indigo-200"
                >
                  <span>
                    <span className="block text-base font-semibold text-gray-900">
                      Track quantity
                    </span>
                    <span className="mt-1 block text-sm text-gray-500">
                      Automatically update stock after every sale
                    </span>
                  </span>

                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded border ${
                      form.trackQuantity
                        ? "border-indigo-500 bg-indigo-500 text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {form.trackQuantity && <Check size={17} />}
                  </span>
                </button>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Quantity available{" "}
                      <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      disabled={!form.trackQuantity}
                      className={`${inputClass} disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400`}
                      value={form.quantityAvailable}
                      onChange={(e) =>
                        updateField(
                          "quantityAvailable",
                          Math.max(0, Number(e.target.value)),
                        )
                      }
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Low stock alert at</label>
                    <input
                      type="number"
                      min="0"
                      disabled={!form.trackQuantity}
                      className={`${inputClass} disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400`}
                      value={form.lowStockAlert}
                      onChange={(e) =>
                        updateField(
                          "lowStockAlert",
                          Math.max(0, Number(e.target.value)),
                        )
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Warehouse</label>
                  <select
                    className={inputClass}
                    value={form.warehouse}
                    onChange={(e) =>
                      updateField("warehouse", e.target.value)
                    }
                  >
                    <option value="">Select warehouse</option>
                    <option value="New York — Main warehouse">
                      New York — Main warehouse
                    </option>
                    <option value="Los Angeles warehouse">
                      Los Angeles warehouse
                    </option>
                    <option value="Chicago warehouse">
                      Chicago warehouse
                    </option>
                  </select>
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Media upload
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Add high-quality images to showcase your product.
                  </p>
                </div>

                <label className="flex min-h-72 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 px-6 py-10 text-center transition hover:border-indigo-400 hover:bg-indigo-50/30">
                  <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
                    <Upload size={27} />
                  </span>

                  <span className="text-base font-semibold text-gray-900">
                    Drop files here or click to upload
                  </span>
                  <span className="mt-2 text-sm text-gray-500">
                    PNG, JPG or WebP · Max 10 MB each
                  </span>

                  <span className="mt-6 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-800">
                    Browse files
                  </span>

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    multiple
                    className="hidden"
                    onChange={handleFiles}
                  />
                </label>

                {form.images.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="flex items-center gap-4 rounded-xl border border-gray-200 p-4"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                      <ImagePlus size={22} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {file.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB · Upload complete
                      </p>
                    </div>

                    <span className="text-sm font-semibold text-green-600">
                      <Check size={20} />
                    </span>

                    <button
                      type="button"
                      aria-label={`Remove ${file.name}`}
                      onClick={() =>
                        updateField(
                          "images",
                          form.images.filter((_, i) => i !== index),
                        )
                      }
                      className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50"
                    >
                      <X size={19} />
                    </button>
                  </div>
                ))}

                <div className="rounded-xl bg-gray-50 p-5">
                  <h4 className="font-semibold text-gray-900">
                    Product summary
                  </h4>
                  <div className="mt-3 space-y-2 text-sm text-gray-600">
                    <p>
                      <span className="font-medium text-gray-800">Name:</span>{" "}
                      {form.name}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">Category:</span>{" "}
                      {form.category}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">SKU:</span>{" "}
                      {form.sku}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">Base price:</span>{" "}
                      ${form.basePrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <p role="alert" className="mt-5 text-sm text-rose-600">
                {error}
              </p>
            )}
          </main>

          {/* Sticky footer */}
          <footer className="flex shrink-0 items-center justify-between gap-4 border-t border-gray-200 bg-white px-6 py-4 md:px-9">
            <span className="text-sm text-gray-500">
              Step {step + 1} of 4
            </span>

            <div className="flex items-center gap-3">
              {step > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
                >
                  Back
                </button>
              )}

              {step < 3 ? (
                <button
                  type="submit"
                  className="flex items-center gap-3 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700"
                >
                  Continue <ArrowRight size={19} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700"
                >
                  Save product
                </button>
              )}
            </div>
          </footer>
        </form>
      </section>
    </div>
  );
}
