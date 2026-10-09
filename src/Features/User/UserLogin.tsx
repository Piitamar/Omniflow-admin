import {
  Bell,
  ChevronRight,
  Sun,
} from "lucide-react";
import { useUIStore } from "../../UIstore";

interface UserLoginProps {
  onOpenLogin: () => void;
}

export default function UserLogin({
  onOpenLogin,
}: UserLoginProps) {
  const user = useUIStore((state) => state.loginUser);

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
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={`${user.name} avatar`}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-500">
            {user?.name
              ?.split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)
              .toUpperCase() ?? "GU"}
          </div>
        )}

        <div className="text-left">
          <p className="text-sm font-semibold text-slate-800">
            {user?.name ?? "Guest"}
          </p>

          <p className="text-xs text-slate-500">
            {user?.role ?? "Not signed in"}
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
