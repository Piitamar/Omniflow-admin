import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, X } from "lucide-react";
import { login } from "./api";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface User {
    email: string;
    password: string;
}

export default function LoginModal({
  isOpen,
  onClose,
}: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = login(user.email, user.password);
    console.log("Login result:", result);
    localStorage.setItem("user", JSON.stringify(result));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
            <LockKeyhole size={22} />
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            Welcome back
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Sign in to your OmniFlow Admin account
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5"
          onSubmit={handleSubmit}
        >
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="you@example.com"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <button
                type="button"
                className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
              >
                Forgot password?
              </button>
            </div>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Enter your password"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            Remember me
          </label>

          {/* Login */}
          <button
            type="submit"
            className="h-11 w-full rounded-xl bg-indigo-600 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.99]"
          >
            Sign in
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <button className="font-medium text-indigo-600 hover:text-indigo-700">
            Contact administrator
          </button>
        </p>
      </div>
    </div>
  );
}