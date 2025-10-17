import { NavLink, Outlet } from "react-router-dom";

const navLinkClass = ({ isActive }) =>
  [
    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
    isActive
      ? "bg-brand-500 text-white shadow"
      : "text-slate-200 hover:bg-slate-800 hover:text-white",
  ].join(" ");

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="bg-slate-900 border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <NavLink
            to="/"
            className="text-xl font-semibold text-white tracking-tight"
          >
            FE Practice Playground
          </NavLink>
          <nav className="flex items-center gap-2">
            <NavLink to="/" className={navLinkClass} end>
              Challenges
            </NavLink>
            <NavLink to="/handbook/overview" className={navLinkClass}>
              Handbook
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
