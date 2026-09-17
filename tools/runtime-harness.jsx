import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import HandbookWorkbench from '../src/components/HandbookWorkbench';
import '../src/index.css';

const entry = {
  id: 'debugging-acceptance', standard: 'developer', entry: '/main.js',
  files: [
    { path: '/main.js', content: 'import { calculate } from "./helpers.js";\n\nconst total = calculate(21);\nconsole.log(total);' },
    { path: '/helpers.js', content: 'export function calculate(value) {\n  const doubled = value * 2;\n  throw new TypeError("Try clicking this location");\n  return doubled;\n}' },
  ],
};
function Harness() {
  const [showRunner, setShowRunner] = useState(true);
  return <main className="min-h-screen bg-slate-900 p-5 text-white"><h1 className="mb-2 text-xl">Debugging acceptance workspace</h1><p className="mb-4 text-sm text-slate-300">Run, expand the stack, and click a file location. In Chrome Sources, open helpers.js under jsgym and set a breakpoint. Fix or remove the throw to continue.</p><div className="grid min-h-[740px] grid-cols-1 lg:grid-cols-2"><HandbookWorkbench entry={entry} showRunner={showRunner} onShowRunnerChange={setShowRunner} /></div></main>;
}
if (!location.search.includes('runnerOnly')) createRoot(document.getElementById('root')).render(<Harness />);
