import { ChevronRight } from "lucide-react";

export default function Workspace() {
  return (
    <button className="flex w-full items-center gap-3 rounded-xl border border-slate-200 p-3 text-left hover:bg-slate-50">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-white">
        A
      </div>

      <div className="flex-1">
        <p className="text-xs text-slate-500">
          Workspace
        </p>

        <p className="text-sm font-semibold text-slate-800">
          Acme Commerce
        </p>
      </div>

      <ChevronRight
        size={18}
        className="text-slate-500"
      />
    </button>
  );
}

