import LoginModal from "../Features/User/LoginModal";
import Search from "./Search";
import UserLogin from "./UserLogin";
import { useState } from "react"; 

export default function TopBar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null);
  console.log("Current user:", user);

  return (
    <header className="flex h-18 items-center border-b border-slate-200 bg-white">
      {/* Logo */}
      <div className="flex w-70 shrink-0 items-center gap-3 border-r border-slate-200 px-8">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500 text-lg font-bold text-white">
          ∥
        </div>

        <span className="text-xl font-semibold tracking-tight">
          OmniFlow
        </span>

        <span className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-500">
          {user ? user.role : "Guest"}
        </span>
      </div>

      {/* Search */}
      <div className="flex flex-1 items-center px-10">
        <Search />
      </div>

      {/* User */}
      <UserLogin
        onOpenLogin={() => setIsLoginOpen(true)}
      />

       <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </header>
  );
}

