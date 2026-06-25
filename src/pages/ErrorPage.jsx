import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug, faHouse, faRotateRight, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

function getErrorSummary(error) {
  if (isRouteErrorResponse(error)) {
    return {
      title: `${error.status} ${error.statusText || "Route Error"}`,
      detail: typeof error.data === "string" ? error.data : error.data?.message,
    };
  }

  if (error instanceof Error) {
    return {
      title: error.name || "Application Error",
      detail: error.message,
      stack: error.stack,
    };
  }

  return {
    title: "Unexpected Error",
    detail: "Something went sideways before JavaScript Gym could finish the rep.",
  };
}

export default function ErrorPage() {
  const error = useRouteError();
  const summary = getErrorSummary(error);

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_34%),radial-gradient(circle_at_82%_28%,rgba(20,184,166,0.14),transparent_30%),linear-gradient(135deg,rgba(15,23,42,0.35),rgba(2,6,23,0.9))]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/70 to-transparent" />

        <section className="relative w-full max-w-4xl overflow-hidden rounded-lg border border-slate-700/80 bg-slate-950/92 shadow-2xl shadow-slate-950/60 backdrop-blur">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="border-b border-slate-800 p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="inline-flex items-center gap-2 rounded-md border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-200">
                <FontAwesomeIcon icon={faTriangleExclamation} className="h-3.5 w-3.5" />
                Error Boundary
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Oops! All Errors!
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
                The app hit a snag, but you are still in the gym. Try reloading the rep, head back home, or use the details panel to see what went wrong.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-2 rounded-md border border-brand-400/60 bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-950/40 transition hover:bg-brand-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
                >
                  <FontAwesomeIcon icon={faRotateRight} className="h-4 w-4" />
                  Reload
                </button>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-900/90 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
                >
                  <FontAwesomeIcon icon={faHouse} className="h-4 w-4" />
                  Go Home
                </Link>
              </div>
            </div>

            <aside className="bg-slate-900/70 p-6 sm:p-8">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                <FontAwesomeIcon icon={faBug} className="h-4 w-4 text-rose-300" />
                Debug Notes
              </div>
              <div className="mt-4 rounded-lg border border-slate-700 bg-slate-950/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-300">What happened</p>
                <p className="mt-2 text-sm font-semibold text-white">{summary.title}</p>
                {summary.detail ? (
                  <p className="mt-2 break-words text-sm leading-6 text-slate-300">{summary.detail}</p>
                ) : (
                  <p className="mt-2 text-sm leading-6 text-slate-400">No extra message was provided.</p>
                )}
              </div>

              {summary.stack ? (
                <details className="mt-4 rounded-lg border border-slate-800 bg-slate-950/65 p-4 text-sm text-slate-300">
                  <summary className="cursor-pointer font-semibold text-slate-100">Stack trace</summary>
                  <pre className="mt-3 max-h-56 overflow-auto whitespace-pre-wrap text-xs leading-5 text-slate-400">
                    {summary.stack}
                  </pre>
                </details>
              ) : null}
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
