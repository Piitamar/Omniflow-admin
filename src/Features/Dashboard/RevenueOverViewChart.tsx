import { formatCurrency } from "../Shared/formatters";
import type { DashboardState } from "./types";

function RevenueChart() {
  return (
    <svg
      className="mt-8 h-64 w-full overflow-visible"
      viewBox="0 0 720 220"
      role="img"
      aria-label="Revenue trend chart"
    >
      <defs>
        <linearGradient
          id="revenueFill"
          x1="0"
          x2="0"
          y1="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#6366f1"
            stopOpacity="0.2"
          />
          <stop
            offset="100%"
            stopColor="#6366f1"
            stopOpacity="0"
          />
        </linearGradient>
      </defs>

      {[20, 75, 130, 185].map((y) => (
        <line
          key={y}
          x1="0"
          x2="720"
          y1={y}
          y2={y}
          stroke="#e5e7eb"
          strokeWidth="1"
        />
      ))}

      <path
        d="M0 158 C60 138 83 150 130 112 S210 148 270 95 S350 126 405 70 S490 116 540 68 S620 92 665 42 S700 47 720 24 L720 185 L0 185Z"
        fill="url(#revenueFill)"
      />

      <path
        d="M0 169 C55 145 92 146 130 130 S215 112 270 120 S350 78 405 95 S485 52 540 66 S620 83 665 55 S700 57 720 34"
        fill="none"
        stroke="#cbd5e1"
        strokeDasharray="5 5"
        strokeWidth="2"
      />

      <path
        d="M0 158 C60 138 83 150 130 112 S210 148 270 95 S350 126 405 70 S490 116 540 68 S620 92 665 42 S700 47 720 24"
        fill="none"
        stroke="#6366f1"
        strokeLinecap="round"
        strokeWidth="3.5"
      />

      <circle
        cx="520"
        cy="76"
        r="6"
        fill="white"
        stroke="#6366f1"
        strokeWidth="3"
      />

      {[
        "May 1",
        "May 5",
        "May 10",
        "May 15",
        "May 20",
        "May 25",
        "May 30",
      ].map((day, i) => (
        <text
          key={day}
          x={i * 120}
          y="205"
          fill="#64748b"
          fontSize="11"
        >
          {day}
        </text>
      ))}
    </svg>
  );
}

export default function RevenueOverviewChart({ dashboard, emptyValue = "--" }: { dashboard: DashboardState | null; emptyValue?: string }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-medium">
            Revenue overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Real-time revenue performance
          </p>
        </div>

        <div className="flex rounded-lg bg-slate-100 p-1 text-sm text-slate-500">
          <button className="rounded-md px-3 py-2">
            Today
          </button>

          <button className="rounded-md bg-white px-3 py-2 font-medium text-slate-900 shadow-sm">
            This month
          </button>

          <button className="rounded-md px-3 py-2">
            Custom
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-end justify-between gap-5">
        <div className="flex gap-8">
          <div>
            <p className="text-2xl font-semibold">
              {dashboard
                ? formatCurrency(dashboard.grossRevenue)
                : emptyValue}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Gross revenue
            </p>
          </div>

          <div>
            <p className="text-2xl font-semibold">
              {dashboard
                ? formatCurrency(dashboard.netRevenue)
                : emptyValue}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Net revenue
            </p>
          </div>
        </div>

        <div className="flex gap-5 text-sm text-slate-500">
          <span>
            <i className="mr-2 inline-block size-2.5 rounded-full bg-indigo-500" />
            This period
          </span>

          <span>
            <i className="mr-2 inline-block size-2.5 rounded-full bg-slate-300" />
            Previous period
          </span>
        </div>

        <RevenueChart />
      </div>
    </article>
  );
}