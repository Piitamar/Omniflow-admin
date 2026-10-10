import { Outlet } from "react-router-dom";

import TopBar from "./TopBar";
import Sidebar from "./SideBar";

export default function AppLayout() {
  return (
    <main className="flex h-screen flex-col overflow-hidden bg-[#f8f9fc] text-slate-900">
      <TopBar />

      <section className="flex min-h-0 flex-1 overflow-hidden">
        <Sidebar />

        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </section>
    </main>
  );
}
