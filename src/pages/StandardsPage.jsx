import React from "react";
import HandbookMDXProvider from "../handbook/MDXProvider";
import StandardsReference from "../standards/standards-reference.mdx";
import { standardsIcons } from "../standards/icons";

const toc = [
  { id: "variables-data-types", label: "Variables & Data Types" },
  { id: "functions", label: "Functions" },
  { id: "program-flow", label: "Program Flow" },
  { id: "arrays-collections", label: "Arrays & Collections" },
  { id: "state-dom", label: "State & DOM" },
  { id: "debugging", label: "Debugging" },
  { id: "modules-organization", label: "Modules & Organization" },
  { id: "asynchronous-js", label: "Asynchronous JS" },
  { id: "data-applications", label: "Data & Applications" },
];

export default function StandardsPage() {
  return (
    <div className="w-full max-w-full overflow-x-hidden bg-slate-950">
      <div className="mx-auto w-[calc(100vw-4rem)] max-w-full px-2 py-8 sm:w-full sm:px-0 lg:max-w-7xl">
        <header className="mb-6 max-w-full rounded-lg border border-brand-500/30 bg-slate-900/70 p-5 shadow-card lg:p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-300">Reference</p>
          <h1 className="mt-1 text-3xl font-semibold text-white lg:text-4xl">JavaScript Standards</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-300 lg:text-base">
            A clean, browsable catalog of standards used across handbook chapters, challenges, and projects.
            This page is a reference, not a lesson.
          </p>
        </header>

        <nav className="mb-6 flex max-w-full gap-2 overflow-x-auto rounded-lg border border-slate-800 bg-slate-900/60 p-2 lg:hidden">
          {toc.map((item) => {
            const Icon = standardsIcons[item.id];
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center gap-2 whitespace-nowrap rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-brand-500/50 hover:text-white"
              >
                {Icon ? <Icon className="h-3.5 w-3.5 text-slate-300" aria-hidden="true" /> : null}
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <aside className="hidden lg:block sticky top-20 self-start rounded-lg border border-slate-800 bg-slate-900/70 p-6 shadow-card">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-300 mb-3">Standards</h2>
            <nav className="flex flex-col gap-1">
              {toc.map((item) => {
                const Icon = standardsIcons[item.id];
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-brand-500/10 hover:text-brand-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-400"
                  >
                    {Icon ? <Icon className="h-4 w-4 text-slate-300" aria-hidden="true" /> : null}
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </aside>

          <main className="min-w-0 max-w-full">
            <article className="max-w-full overflow-hidden">
              <HandbookMDXProvider>
                <StandardsReference />
              </HandbookMDXProvider>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
