import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Outlet } from "react-router-dom";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";

const navLinkClass = ({ isActive }) =>
  [
    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
    isActive
      ? "bg-brand-500 text-white shadow"
      : "text-slate-200 hover:bg-slate-800 hover:text-white",
  ].join(" ");

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="bg-slate-900 border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <NavLink
            to="/"
            className="text-xl font-semibold text-white tracking-tight"
          >
            JavaScript Gym <FontAwesomeIcon icon={faDumbbell}/>
          </NavLink>
          <nav className="flex items-center gap-2">
            <NavLink to="/" className={navLinkClass} end>
              Challenges
            </NavLink>
            <NavLink to="/handbook/overview" className={navLinkClass}>
              Handbook
            </NavLink>
            <NavLink to="/projects" className={navLinkClass}>
              Projects
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto px-6 py-2 flex-1 flex flex-col min-h-0 w-full">
        <Outlet />
      </main>
    </div>
  );
}
