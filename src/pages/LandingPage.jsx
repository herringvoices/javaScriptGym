import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-brand-900 py-16 px-4">
      <div className="max-w-3xl w-full bg-slate-900/80 rounded-3xl shadow-2xl p-10 border border-brand-500/30">
        <header className="mb-10 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-brand-300 drop-shadow mb-4 tracking-tight">JavaScript Gym</h1>
          <p className="text-lg md:text-2xl text-slate-200 max-w-2xl mx-auto mb-4 font-medium">
            Level up your JavaScript skills with hands-on challenges, guided projects, and a standards-driven handbook. Everything you need to go from basics to building real apps.
          </p>
          <p className="text-base text-brand-200 font-semibold">New here? <Link to="/handbook/overview" className="underline hover:text-brand-400">Start with the Handbook</Link>.</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SectionCard
            title="Handbook"
            description="Read clear explanations, see real examples, and reference the standards for every core JavaScript concept."
            link="/handbook/overview"
            linkLabel="Explore the Handbook"
            color="brand"
          />
          <SectionCard
            title="Challenges"
            description="Practice with interactive coding challenges, organized by topic and difficulty. Get instant feedback and track your mastery."
            link="/challenges"
            linkLabel="Try Challenges"
            color="emerald"
          />
          <SectionCard
            title="Projects"
            description="Apply your knowledge to real-world projects, broken into guided steps with code review checkpoints."
            link="/projects"
            linkLabel="View Projects"
            color="blue"
          />
          <SectionCard
            title="Standards"
            description="See the full list of coding standards and best practices that guide all content and solutions in JavaScript Gym."
            link="/standards"
            linkLabel="Read Standards"
            color="yellow"
          />
        </div>
      </div>
    </div>
  );
}


function SectionCard({ title, description, link, linkLabel }) {
  return (
    <Link
      to={link}
      aria-label={linkLabel}
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-card transition-transform hover:-translate-y-1 hover:border-brand-500/60 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/80"
    >
      <div>
        <h2 className="text-lg font-semibold text-white mb-1 tracking-tight">{title}</h2>
        <p className="mb-4 text-slate-300 text-sm leading-relaxed">{description}</p>
      </div>
      <span className="inline-flex items-center gap-1 mt-auto font-semibold text-brand-300 group-hover:text-brand-200 underline underline-offset-2 text-sm">
        {linkLabel}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
      </span>
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-slate-950/10 group-hover:bg-brand-500/5 transition-colors" />
    </Link>
  );
}
