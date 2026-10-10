import Workspace from "./WorkSpace";
import Navigation from "./Navigation";

export default function Sidebar() {
  return (
    <aside className="h-full w-70 shrink-0 overflow-hidden border-r border-slate-200 bg-white">
      <div className="p-5">
        <Workspace />
      </div>

      <Navigation />
    </aside>
  );
}

