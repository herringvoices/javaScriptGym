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
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <NavLink
            to="/"
            className="shrink-0 text-xl font-semibold text-white tracking-tight"
          >
            JavaScript Gym <FontAwesomeIcon icon={faDumbbell}/>
          </NavLink>
          <nav className="flex w-full max-w-full items-center gap-2 overflow-x-auto pb-1 sm:w-auto sm:pb-0">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/challenges" className={navLinkClass}>
              Challenges
            </NavLink>
            <NavLink to="/handbook/overview" className={navLinkClass}>
              Handbook
            </NavLink>
            <NavLink to="/projects" className={navLinkClass}>
              Projects
            </NavLink>
              <NavLink to="/standards" className={navLinkClass}>
                Standards
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
