import { Ellipsis } from "lucide-react";

export default function UserMetrics({ metrics }: { metrics: { label: string; value: string; change?: string; icon: React.ComponentType<{ size: number }> }[] }) {
    return (
        <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {metrics.map(({ label, value, change, icon: Icon }) => (
          <article
            key={label}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-10 place-items-center rounded-lg bg-indigo-50 text-indigo-500">
                <Icon size={20} />
              </span>

              <button
                aria-label={`More ${label} options`}
                className="text-slate-400"
              >
                <Ellipsis size={22} />
              </button>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              {label}
            </p>

            <p className="mt-1 text-2xl font-medium tracking-tight text-slate-900">
              {value}
            </p>

            <p className="mt-3 text-xs">
              <span className="font-semibold text-emerald-600">
                {change && `↗ ${change}`}
              </span>

              {change && (
                <span className="ml-2 text-slate-500">
                  vs. previous month
                </span>
              )}
            </p>
          </article>
        ))}
      </section>
    )
}