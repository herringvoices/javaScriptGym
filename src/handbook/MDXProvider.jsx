import { MDXProvider } from "@mdx-js/react";
import React from "react";
import Callout from "../components/Callout";
import PracticeCard from "../components/PracticeCard";
import HandbookChallenge from "../components/HandbookChallenge";
// Removed MiniSandpack and Playground (deprecated)

function Note(props) {
  return (
    <div className="rounded-md border border-brand-500/40 bg-brand-500/10 p-4 text-sm text-slate-200">
      <p className="m-0 font-medium tracking-wide text-brand-300">Note</p>
      <div className="mt-1 leading-relaxed">{props.children}</div>
    </div>
  );
}

function Tip(props) {
  return (
    <div className="rounded-md border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-slate-200">
      <p className="m-0 font-medium tracking-wide text-emerald-300">Tip</p>
      <div className="mt-1 leading-relaxed">{props.children}</div>
    </div>
  );
}

const components = {
  Callout,
  PracticeCard,
  HandbookChallenge,
  Note,
  Tip,
  h2: (props) => <h2 {...props} className="text-2xl font-semibold" />,
  h3: (props) => <h3 {...props} className="text-xl font-semibold" />,
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
