import { Search as SearchIcon, Command } from "lucide-react";

export default function Search() {
  return (
    <div className="flex h-11 w-full max-w-137.5 items-center rounded-xl border border-slate-200 bg-white px-4 shadow-sm">
      <SearchIcon
        size={20}
        className="mr-3 text-slate-400"
      />

      <input
        type="text"
        placeholder="Search anything..."
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
      />

      <div className="flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-400">
        <Command size={12} />
        <span>K</span>
      </div>
    </div>
  );
}

