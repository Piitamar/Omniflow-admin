import { Outlet } from "react-router-dom";

import TopBar from "./TopBar";
import Sidebar from "./SideBar";

export default function AppLayout() {
  return (
    <main className="min-h-screen bg-[#f8f9fc] text-slate-900">
      <TopBar />

      <section className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </section>
    </main>
  );
}
