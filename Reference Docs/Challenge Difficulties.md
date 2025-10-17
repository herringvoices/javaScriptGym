# JavaScript Standards — Difficulty Matrix (Teaching Order)

**Scale:** 1 = foundational · 2 = basic application · 3 = multi‑step use · 4 = integration/nuance · 5 = capstone‑level synthesis

> We now use **small ranges** (e.g., 1–2, 2–3, 3–4, 4–5) where cohort variance is real, and **fixed values** where the scope is tight and consistent.

---

## Variables & Data Types: Primitives (`JS.VDT.PRM`)

| Standard         | Description                                                                | Difficulty |
| ---------------- | -------------------------------------------------------------------------- | ---------- |
| **JS.VDT.PRM.1** | Declare and assign variables using `let` and `const` appropriately.        | **1**      |
| **JS.VDT.PRM.2** | Store and use primitive values (string, number, boolean, null, undefined). | **1**      |
| **JS.VDT.PRM.3** | Combine primitive values with operators and template literals.             | **1–2**    |
| **JS.VDT.PRM.4** | Choose the right primitive type for a given situation.                     | **1–2**    |

---

## Variables & Data Types: Collections (`JS.VDT.COL`)

| Standard         | Description                                               | Difficulty |
| ---------------- | --------------------------------------------------------- | ---------- |
| **JS.VDT.COL.1** | Create and access objects with key–value pairs.           | **2**      |
| **JS.VDT.COL.2** | Create and access arrays.                                 | **2**      |
| **JS.VDT.COL.3** | Work with arrays of objects (e.g., API responses).        | **2–4**    |
| **JS.VDT.COL.4** | Choose the correct collection type for a given situation. | **2**      |

---

## Variables & Data Types: Methods (`JS.VDT.MTH`)

| Standard         | Description                                                                                               | Difficulty |
| ---------------- | --------------------------------------------------------------------------------------------------------- | ---------- |
| **JS.VDT.MTH.1** | Use string props/methods (`.length`, `.trim()`, `.toLowerCase()`, `.split()`, `.replace()`).              | **1–2**    |
| **JS.VDT.MTH.2** | Use number parsing/formatting (`Number()`, `parseInt()`, `parseFloat()`, `Number.isNaN()`, `.toFixed()`). | **1–2**    |
| **JS.VDT.MTH.3** | Use object utilities (`Object.keys()`, `Object.values()`, `Object.entries()`).                            | **2–3**    |

---

## Functions: Basics (`JS.FN.BAS`)

| Standard        | Description                                                   | Difficulty |
| --------------- | ------------------------------------------------------------- | ---------- |
| **JS.FN.BAS.1** | Declare and invoke functions (with/without params & returns). | **2-3**    |
| **JS.FN.BAS.2** | Write named and arrow functions appropriately.                | **2-3**    |
| **JS.FN.BAS.3** | Use parameters and return values to pass data in/out.         | **2–3**    |
| **JS.FN.BAS.4** | Compose small helper functions to build larger features.      | **3–4**    |

---

## Program Flow: Conditionals (`JS.PF.CON`)

| Standard        | Description                                                                                         | Difficulty |
| --------------- | --------------------------------------------------------------------------------------------------- | ---------- |
| **JS.PF.CON.1** | Use `if/else` to branch behavior.                                                                   | **2-3**    |
| **JS.PF.CON.2** | Choose between `if/else` and `switch` for clarity.                                                  | **2**      |
| **JS.PF.CON.3** | Combine conditions with logical/comparison operators; reason about truthy/falsy & short‑circuiting. | **3–4**    |

---

## Program Flow: Iteration (`JS.PF.ITR`)

| Standard        | Description                                                                              | Difficulty |
| --------------- | ---------------------------------------------------------------------------------------- | ---------- |
| **JS.PF.ITR.1** | Iterate arrays/DOM collections with `for`, `for…of` to access items and update state/UI. | **2–3**    |
| **JS.PF.ITR.2** | Use loops to perform an action for each item (render, attach listeners).                 | **2–3**    |
| **JS.PF.ITR.3** | Identify/fix loop errors (off‑by‑one, infinite, unintended mutation).                    | **2–3**    |

---

## Arrays & Collections: Access & Updates (`JS.AR.ACC`)

| Standard        | Description                                                      | Difficulty |
| --------------- | ---------------------------------------------------------------- | ---------- |
| **JS.AR.ACC.1** | Add/change/remove elements & properties with appropriate syntax. | **2-3**    |
| **JS.AR.ACC.2** | Distinguish mutating vs non‑mutating ops; choose appropriately.  | **3**      |
| **JS.AR.ACC.3** | Use arrays of objects to represent/manipulate structured data.   | **2–4**    |

---

## Arrays & Collections: Array Methods (`JS.AR.MTH`)

| Standard        | Description                                                                   | Difficulty |
| --------------- | ----------------------------------------------------------------------------- | ---------- |
| **JS.AR.MTH.1** | Transform arrays using `map`.                                                 | **3–4**    |
| **JS.AR.MTH.2** | Filter arrays using `filter`.                                                 | **2–3**    |
| **JS.AR.MTH.3** | Aggregate with `reduce` to produce a single result.                           | **4–5**    |
| **JS.AR.MTH.4** | Search/validate with `find`, `some`, `every`.                                 | **3–4**    |
| **JS.AR.MTH.5** | Order/reshape with `sort`, `flat`, `flatMap` (comparators, in‑place caveats). | **4–5**    |

---

## Functions: Higher‑Order (`JS.FN.HOF`)

| Standard        | Description                                                                        | Difficulty |
| --------------- | ---------------------------------------------------------------------------------- | ---------- |
| **JS.FN.HOF.1** | Decide when to pass a function reference vs invoke it (events, callbacks).         | **2**      |
| **JS.FN.HOF.2** | Provide callbacks to array methods, listeners, timers with correct params/returns. | **2–3**    |

---

## Debugging: Error Messages & Traces (`JS.DB.ERR`)

| Standard        | Description                                                | Difficulty |
| --------------- | ---------------------------------------------------------- | ---------- |
| **JS.DB.ERR.1** | Read error types (ReferenceError, TypeError, SyntaxError). | **2**      |
| **JS.DB.ERR.2** | Use stack traces to locate file/line/frame.                | **2–3**    |
| **JS.DB.ERR.3** | Reproduce errors and describe triggering conditions.       | **2–3**    |

---

## Debugging: Tracing & Inspection (`JS.DB.TRC`)

| Standard        | Description                                                   | Difficulty |
| --------------- | ------------------------------------------------------------- | ---------- |
| **JS.DB.TRC.1** | Insert `console.log` to trace control flow & values.          | **2**      |
| **JS.DB.TRC.2** | Set breakpoints, step through, inspect variables in DevTools. | **2–3**    |

---

## Debugging: Common Bugs & Fixes (`JS.DB.BUG`)

| Standard        | Description                                                                | Difficulty |
| --------------- | -------------------------------------------------------------------------- | ---------- |
| **JS.DB.BUG.1** | Diagnose/fix loop errors.                                                  | **2–3**    |
| **JS.DB.BUG.2** | Fix undefined/null/type errors (bad selectors, missing data, wrong paths). | **2–3**    |
| **JS.DB.BUG.3** | Resolve async timing issues (values before fetch completes; race‑y code).  | **4–5**    |
| **JS.DB.BUG.4** | Correct DOM sync issues (wrong node, stale state).                         | **3–4**    |

---

## State & DOM: Element Selection & Manipulation (`JS.SD.ELM`)

| Standard        | Description                                                                        | Difficulty |
| --------------- | ---------------------------------------------------------------------------------- | ---------- |
| **JS.SD.ELM.1** | Select DOM elements (`getElementById`, `querySelector`, etc.).                     | **1–2**    |
| **JS.SD.ELM.2** | Read/update content & attributes (`textContent`, `innerHTML`, `src`, `classList`). | **1–2**    |

---

## State & DOM: Event Handling (`JS.SD.EVH`)

| Standard        | Description                                                     | Difficulty |
| --------------- | --------------------------------------------------------------- | ---------- |
| **JS.SD.EVH.1** | Attach listeners with `addEventListener`.                       | **2**      |
| **JS.SD.EVH.2** | Use event object properties (`event.target`, `preventDefault`). | **2–3**    |
| **JS.SD.EVH.3** | Event delegation on stable parent; handle dynamic children.     | **3–4**    |

---

## State & DOM: State Synchronization (`JS.SD.STA`)

| Standard        | Description                                          | Difficulty |
| --------------- | ---------------------------------------------------- | ---------- |
| **JS.SD.STA.1** | Maintain program state that reflects UI/input.       | **2–3**    |
| **JS.SD.STA.2** | Update DOM when state changes to keep UI consistent. | **2–3**    |
| **JS.SD.STA.3** | Read user input from forms and update state.         | **2–3**    |
| **JS.SD.STA.4** | Clear/reset/toggle DOM elements based on state.      | **2–3**    |

---

## Modules & Organization: Project Structure (`JS.MO.STR`)

| Standard        | Description                                                       | Difficulty |
| --------------- | ----------------------------------------------------------------- | ---------- |
| **JS.MO.STR.1** | Organize code by feature or layer; stick to one approach.         | **1–2**    |
| **JS.MO.STR.2** | Use clear naming (kebab/camel) so imports are predictable.        | **1**      |
| **JS.MO.STR.3** | Keep assets in `assets/` or `public/` and reference consistently. | **1**      |

---

## Modules & Organization: Import/Export (`JS.MO.IMP`)

| Standard        | Description                                           | Difficulty |
| --------------- | ----------------------------------------------------- | ---------- |
| **JS.MO.IMP.1** | Use ES module named vs default exports appropriately. | **2–3**    |
| **JS.MO.IMP.2** | Import syntax and organized readable imports.         | **2**      |
| **JS.MO.IMP.3** | Refactor into modules and reuse via imports.          | **2–3**    |

---

## Asynchronous: Promises (`JS.AS.PRO`)

| Standard        | Description                                                  | Difficulty |
| --------------- | ------------------------------------------------------------ | ---------- |
| **JS.AS.PRO.1** | Use `.then()`/`.catch()` to handle async results and errors. | **2–3**    |
| **JS.AS.PRO.2** | Explain sync vs async execution (blocking vs non‑blocking).  | **2**      |

---

## Asynchronous: Async/Await (`JS.AS.AAW`)

| Standard        | Description                                                | Difficulty |
| --------------- | ---------------------------------------------------------- | ---------- |
| **JS.AS.AAW.1** | Write `async` functions; use `await` to pause on Promises. | **3–4**    |
| **JS.AS.AAW.2** | Refactor simple Promise chains into async/await.           | **3–4**    |

---

## Asynchronous: Fetch & HTTP (`JS.AS.FET`)

| Standard        | Description                                         | Difficulty |
| --------------- | --------------------------------------------------- | ---------- |
| **JS.AS.FET.1** | Use `fetch` for GET and render the data in the DOM. | **3–4**    |
| **JS.AS.FET.2** | Use `fetch` with POST/PUT/DELETE to send data.      | **4–5**    |
| **JS.AS.FET.3** | Handle loading states while waiting for data.       | **3**      |

---

## Asynchronous: Error Handling (`JS.AS.ERR`)

| Standard        | Description                                      | Difficulty |
| --------------- | ------------------------------------------------ | ---------- |
| **JS.AS.ERR.1** | Use `.catch()` and `try/catch` for async errors. | **2–3**    |
| **JS.AS.ERR.2** | Provide user feedback for common failure cases.  | **2–3**    |

---

## Data & Applications: Schema Planning (`JS.DA.SCH`)

| Standard        | Description                                          | Difficulty |
| --------------- | ---------------------------------------------------- | ---------- |
| **JS.DA.SCH.1** | Plan data with ERDs to model entities/relationships. | **3–4**    |
| **JS.DA.SCH.2** | Use foreign keys for one‑to‑many relationships.      | **2–3**    |
| **JS.DA.SCH.3** | Use join tables for many‑to‑many relationships.      | **3–4**    |

---

## Data & Applications: Services & Handlers (`JS.DA.SER`)

| Standard        | Description                                                                        | Difficulty |
| --------------- | ---------------------------------------------------------------------------------- | ---------- |
| **JS.DA.SER.1** | Write modular service functions by table using `fetch` (get/create/update/delete). | **4–5**    |
| **JS.DA.SER.2** | Organize services in separate modules for reuse.                                   | **2–3**    |

---

## Data & Applications: Utilizing Data (`JS.DA.UTA`)

| Standard        | Description                                          | Difficulty |
| --------------- | ---------------------------------------------------- | ---------- |
| **JS.DA.UTA.1** | Render state/API data into the DOM.                  | **2**      |
| **JS.DA.UTA.2** | Update the UI after create/edit/delete via services. | **2–3**    |
| **JS.DA.UTA.3** | Handle empty/loading/error states.                   | **2–3**    |
| **JS.DA.UTA.4** | Provide simple filtering, sorting, or searching.     | **2–3**    |
