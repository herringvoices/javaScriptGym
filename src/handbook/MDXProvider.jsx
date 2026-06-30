import { MDXProvider } from "@mdx-js/react";
import React from "react";
import Callout from "../components/Callout";
import PracticeCard from "../components/PracticeCard";
import HandbookChallenge from "../components/HandbookChallenge";
import { Checklist, ChecklistItem } from "../components/Checklist";
// Removed MiniSandpack and Playground (deprecated)

function Note(props) {
  return (
    <div className="rounded-md border border-brand-500/40 bg-brand-500/10 p-4 text-sm text-slate-200">
	  <div className="m-0 font-medium tracking-wide text-brand-300">Note</div>
	  <div className="mt-1 leading-relaxed">{props.children}</div>
    </div>
  );
}

function Tip(props) {
  return (
    <div className="rounded-md border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-slate-200">
	  <div className="m-0 font-medium tracking-wide text-emerald-300">Tip</div>
	  <div className="mt-1 leading-relaxed">{props.children}</div>
    </div>
  );
}

const components = {
  Callout,
  PracticeCard,
  HandbookChallenge,
  Checklist,
  ChecklistItem,
  Note,
  Tip,
  // Let MDX render real paragraphs; block components are responsible
  // for not wrapping MDX children in <p>.
  p: (props) => <p {...props} className={props.className || ""} />,
  h2: ({ className = "", ...props }) => (
    <h2 {...props} className={`text-2xl font-semibold ${className}`.trim()} />
  ),
  h3: ({ className = "", ...props }) => (
    <h3 {...props} className={`text-xl font-semibold ${className}`.trim()} />
  ),
  table: ({ className = "", ...props }) => (
    <div className="not-prose my-6 overflow-x-auto rounded-md border border-slate-700 bg-slate-950/50">
      <table
        {...props}
        className={`w-full min-w-max border-collapse text-left text-sm text-slate-200 ${className}`.trim()}
      />
    </div>
  ),
  th: ({ className = "", ...props }) => (
    <th
      {...props}
      className={`border-b border-slate-700 bg-slate-900/80 px-3 py-2 font-semibold text-slate-100 ${className}`.trim()}
    />
  ),
  td: ({ className = "", ...props }) => (
    <td
      {...props}
      className={`border-t border-slate-800 px-3 py-2 align-top text-slate-300 ${className}`.trim()}
    />
  ),
  // Only style inline code; let rehype-pretty-code render fenced blocks.
  code: (props) => {
    const className = props?.className || "";
    // If this code node is part of a fenced block, it will have language-*
    if (/\blanguage-/.test(className)) {
      return <code {...props} />;
    }
    return (
      <code
        {...props}
        className="rounded bg-slate-900 px-1.5 py-0.5 text-sm font-medium text-brand-200"
      />
    );
  },
};

export default function HandbookMDXProvider({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
