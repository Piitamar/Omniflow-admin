import { useState } from "react";
import {
  Activity,
  Settings as SettingsIcon,
  Users,
  Shield,
  ChevronRight,
  Plus,
  SlidersHorizontal,
  Megaphone,
} from "lucide-react";

type Role = "admin" | "manager" | "staff";
type Action = "view" | "edit" | "delete";

type Permissions = Record<
  string,
  Record<Role, Record<Action, boolean>>
>;

const modules = [
  "Dashboard & analytics",
  "Products",
  "Orders",
  "Customers",
  "Marketing",
  "Reports",
  "Settings",
];

const roles: {
  id: Role;
  name: string;
  description: string;
  users: number;
}[] = [
  {
    id: "admin",
    name: "Admin",
    description: "Full workspace access",
    users: 2,
  },
  {
    id: "manager",
    name: "Manager",
    description: "Operations & reporting",
    users: 8,
  },
  {
    id: "staff",
    name: "Staff",
    description: "Day-to-day essentials",
    users: 24,
  },
];

const sections = [
  { label: "General", icon: SettingsIcon },
  { label: "Team members", icon: Users },
  { label: "Roles & permissions", icon: Shield },
  { label: "Security", icon: Activity },
  { label: "Marketing", icon: Megaphone },
  { label: "Settings", icon: SlidersHorizontal },
];

const initialPermissions: Permissions = Object.fromEntries(
  modules.map((module) => [
    module,
    {
      admin: { view: true, edit: true, delete: true },
      manager: { view: true, edit: true, delete: false },
      staff: { view: true, edit: false, delete: false },
    },
  ]),
) as Permissions;

export default function Settings() {
  const [activeSection, setActiveSection] = useState("Security");
  const [permissions, setPermissions] =
    useState<Permissions>(initialPermissions);

  const togglePermission = (
    module: string,
    role: Role,
    action: Action,
  ) => {
    setPermissions((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [role]: {
          ...prev[module][role],
          [action]: !prev[module][role][action],
        },
      },
    }));
  };

  return (
    <div className="min-h-full bg-[#f7f8fa] px-5 py-5 text-gray-900 md:px-6 lg:px-8">
      {/* Page header */}
      <header className="mb-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-indigo-500">
            Workspace settings
          </p>

          <h1 className="text-3xl font-medium tracking-tight">
            Settings
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Monitor performance, manage operations, and grow your business.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-gray-50"
          >
            Discard changes
          </button>

          <button
            type="button"
            className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Save changes
          </button>
        </div>
      </header>

      <div className="grid items-start gap-5 lg:grid-cols-[170px_minmax(0,1fr)] xl:grid-cols-[170px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="space-y-1">
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Workspace
          </p>

          {sections.map(({ label, icon: Icon }) => {
            const active = activeSection === label;

            return (
              <button
                key={label}
                type="button"
                onClick={() => setActiveSection(label)}
                className={`flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-sm transition ${
                  active
                    ? "border-gray-200 bg-white font-semibold text-indigo-600 shadow-sm"
                    : "border-transparent text-gray-500 hover:bg-white hover:text-gray-800"
                }`}
              >
                <Icon size={19} strokeWidth={1.8} />

                <span className="flex-1 text-left">{label}</span>

                <ChevronRight
                  size={16}
                  className={active ? "text-indigo-500" : "text-gray-400"}
                />
              </button>
            );
          })}
        </aside>

        {/* Main panel */}
        <main className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-5 lg:p-6">
          {/* Section header */}
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-medium">Security</h2>

              <p className="mt-1.5 text-sm text-gray-500">
                Define what each role can view, edit, and manage across your workspace.
              </p>
            </div>

            <button
              type="button"
              className="flex shrink-0 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm font-semibold transition hover:bg-gray-50"
            >
              <Plus size={19} />
              Create custom role
            </button>
          </div>

          {/* Role summary cards */}
          <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {roles.map((role) => {
              const Icon =
                role.id === "admin"
                  ? Shield
                  : role.id === "manager"
                    ? Users
                    : SettingsIcon;

              const iconStyle =
                role.id === "admin"
                  ? "bg-indigo-50 text-indigo-500"
                  : role.id === "manager"
                    ? "bg-blue-50 text-blue-500"
                    : "bg-amber-50 text-amber-600";

              return (
                <div
                  key={role.id}
                  className="flex min-w-0 items-center gap-3 rounded-xl border border-gray-200 p-3"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconStyle}`}
                  >
                    <Icon size={20} strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{role.name}</p>

                    <p className="mt-1 truncate text-xs text-gray-500">
                      {role.description}
                    </p>
                  </div>

                  <span className="shrink-0 text-xs font-semibold text-gray-500">
                    {role.users} users
                  </span>
                </div>
              );
            })}
          </div>

          {/* Permissions table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full min-w-[680px] border-collapse text-xs">
              <thead>
                <tr className="bg-gray-100/80">
                  <th
                    rowSpan={2}
                    className="w-[25%] border-b border-gray-200 px-3 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500"
                  >
                    Module
                  </th>

                  {roles.map((role) => (
                    <th
                      key={role.id}
                      colSpan={3}
                      className="border-b border-gray-200 px-2 py-3.5 text-center text-xs font-semibold uppercase tracking-wide"
                    >
                      {role.name}
                    </th>
                  ))}
                </tr>

                <tr className="bg-gray-100/80 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                  {roles.map((role) =>
                    (["view", "edit", "delete"] as Action[]).map(
                      (action) => (
                        <th
                          key={`${role.id}-${action}`}
                          className="border-b border-gray-200 px-2 py-2.5"
                        >
                          {action}
                        </th>
                      ),
                    ),
                  )}
                </tr>
              </thead>

              <tbody>
                {modules.map((module) => (
                  <tr
                    key={module}
                    className="transition hover:bg-gray-50/70"
                  >
                    <td className="whitespace-nowrap border-b border-gray-200 px-3 py-3.5 text-sm font-medium">
                      {module}
                    </td>

                    {roles.map((role) =>
                      (["view", "edit", "delete"] as Action[]).map(
                        (action) => {
                          const checked =
                            permissions[module][role.id][action];

                          return (
                            <td
                              key={`${module}-${role.id}-${action}`}
                              className="border-b border-gray-200 px-2 py-3 text-center"
                            >
                              <button
                                type="button"
                                role="checkbox"
                                aria-checked={checked}
                                aria-label={`${module} - ${role.name} - ${action}`}
                                onClick={() =>
                                  togglePermission(
                                    module,
                                    role.id,
                                    action,
                                  )
                                }
                                className={`inline-flex h-6 w-6 items-center justify-center rounded-md border transition ${
                                  checked
                                    ? "border-indigo-500 bg-indigo-500 text-white"
                                    : "border-gray-200 bg-white text-transparent hover:border-indigo-400"
                                }`}
                              >
                                <svg
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  className="h-4 w-4"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="m4 10 4 4 8-8"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </td>
                          );
                        },
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs text-gray-400">
            Changes are local until you save them.
          </p>
        </main>
      </div>
    </div>
  );
}
