import Workspace from "./WorkSpace";
import Navigation from "./Navigation";

export default function Sidebar() {
  return (
    <aside className="sticky top-0 h-[calc(100vh-72px)] w-70 shrink-0 border-r border-slate-200 bg-white">
      <div className="p-5">
        <Workspace />
      </div>

      <Navigation />
    </aside>
  );
}

