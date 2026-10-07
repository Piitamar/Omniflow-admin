import {
  Bell,
  ChevronRight,
  Sun,
} from "lucide-react";

interface UserLoginProps {
  onOpenLogin: () => void;
}

export default function UserLogin({
  onOpenLogin,
}: UserLoginProps) {
  return (
    <div className="flex h-full items-center gap-4 px-6">
      <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
        <Sun size={19} />
      </button>

      <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
        <Bell size={19} />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
      </button>

      <div className="h-8 w-px bg-slate-200" />

      <button
        onClick={onOpenLogin}
        className="flex items-center gap-3"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-500">
          AK
        </div>

        <div className="text-left">
          <p className="text-sm font-semibold text-slate-800">
            Alex Kim
          </p>

          <p className="text-xs text-slate-500">
            Admin
          </p>
        </div>

        <ChevronRight
          size={18}
          className="text-slate-500"
        />
      </button>
    </div>
  );
}