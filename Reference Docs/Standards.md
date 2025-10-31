# JavaScript Standards

---

## Teaching Order / Table of Contents

1. [Primitives (VDT.PRM)](#primitives-vdtprm)
2. [Collections (VDT.COL)](#collections-vdtcol)
3. [Methods & Properties (VDT.MTH)](#methods--properties-of-data-types-vdtmth)
4. [Basic Functions (FN.BAS)](#basic-functions-fnbas)
5. [Higher-Order Functions (FN.HOF)](#higher-order-functions-fnhof)
6. [Conditionals (PF.CON)](#conditionals-pfcon)
7. [Iteration (PF.ITR)](#iteration-pfitr)
8. [Access & Updates (AR.ACC)](#access--updates-aracc)
9. [Array Methods (AR.MTH)](#array-methods-armth)
10. [Element Selection & Manipulation (SD.ELM)](#element-selection--manipulation-sdelm)
11. [Event Handling (SD.EVH)](#event-handling-sdevh)
12. [State Synchronization (SD.STA)](#state-synchronization-sdsta)
13. [Error Messages & Stack Traces (DB.ERR)](#error-messages--stack-traces-dberr)
14. [Tracing & Inspection (DB.TRC)](#tracing--inspection-dbtrc)
15. [Common Bugs & Fixes (DB.BUG)](#common-bugs--fixes-dbbug)
16. [Project Structure (MO.STR)](#project-structure-mostr)
17. [Import/Export (MO.IMP)](#importexport-moimp)
18. [Promises (AS.PRO)](#promises-aspro)
19. [Async/Await (AS.AAW)](#asyncawait-asaaw)
20. [Fetch & HTTP (AS.FET)](#fetch--http-asfet)
21. [Error Handling (AS.ERR)](#error-handling-aserr)
22. [Schema Planning (DA.SCH)](#schema-planning-dasch)
23. [Services & Handlers (DA.SER)](#services--handlers-daser)
24. [Utilizing Data in Apps (DA.UTA)](#utilizing-data-in-apps-dauta)

---

# Guiding Principles for JavaScript Standards

## 1\. End-of-Certification, Not Mastery

These standards set expectations for what students should be able to do after attaining their JavaScript certification. They are not designed to cover every nuance of JavaScript, but instead focus on practical fluency — the skills required to function as web developers.

## 2\. Web Development Focus

Every standard was chosen because it shows up in actual project work. Students don’t need to memorize exotic types or academic computer science patterns. They do need to handle arrays of objects from an API, update the DOM, and write modular code that supports real applications.

## 3\. Action-Oriented, Observable Outcomes

Each standard is written so we can watch students demonstrate it: declaring and invoking functions, debugging with console logs, structuring modules. Nothing is phrased as “understand” or “be familiar with” — all outcomes are framed as demonstrable actions.

## 4\. Clear Separation of Categories

To avoid overlap and confusion, each strand has its own lane:

* **Variables & Data Types** \= declaring and choosing data structures.
* **Arrays & Collections** \= manipulating those structures once they exist.
* **Program Flow** \= logic and iteration.
* **Debugging** \= strategies to diagnose and fix problems.
* **State & DOM** \= tying data to the browser UI.
* **Asynchronous JS** \= handling promises, async/await, and fetch mechanics.
* **Data & Applications** \= schema planning, ERDs, services, and data-driven apps.
* **Modules & Organization** \= structuring projects and imports/exports.

## 5\. Cross-Cutting Concepts

Alongside the categories, there are habits we want students to practice everywhere: analytical thinking, algorithmic thinking, efficient learning, and communication. These are not separate standards but core practices that underpin everything students do.

---

# Primitives (VDT.PRM)

* **JS.VDT.PRM.1** Declare and assign variables using `let` and `const` appropriately.
* **JS.VDT.PRM.2** Store and use primitive values (`string`, `number`, `boolean`, `null`, `undefined`) in web applications.
* **JS.VDT.PRM.3** Combine primitive values with operators (arithmetic, concatenation, comparison, logical) and template literals to produce and evaluate expressions.
* **JS.VDT.PRM.4** Determine the appropriate primitive data type to use for a given situation (e.g., string vs number vs boolean).

---

# Collections (VDT.COL)

* **JS.VDT.COL.1** Create and access objects to group related data using key–value pairs.
* **JS.VDT.COL.2** Create and access arrays to store ordered lists of values.
* **JS.VDT.COL.3** Work with arrays of objects to represent structured data, such as API responses.
* **JS.VDT.COL.4** Determine the appropriate collection type (object, array, array of objects, or object of array of objects) for a given situation.

---

# Methods & Properties of Data Types (VDT.MTH)

* **JS.VDT.MTH.1** Use string properties and methods (e.g., `.length`, `.trim()`, `.toLowerCase()`, `.split()`, `.replace()`).
* **JS.VDT.MTH.2** Use number parsing and formatting methods (e.g., `Number()`, `parseInt()`, `parseFloat()`, `Number.isNaN()`, `.toFixed()`).
* **JS.VDT.MTH.3** Use object utilities and shaping methods (e.g., `Object.keys()`, `Object.values()`, `Object.entries()`).

---

# Basic Functions (FN.BAS)

* **JS.FN.BAS.1** Declare and invoke functions, recognizing that some use parameters and/or return values while others do not.
* **JS.FN.BAS.2** Write functions with both the `function` keyword and arrow syntax using both named and anonymous functions appropriately (e.g., named for reuse/clarity; anonymous for inline use).
* **JS.FN.BAS.3** Use parameters and return values to pass data in and out of a function; prefer passing data over relying on outer variables when feasible.
* **JS.FN.BAS.4** Compose small, single-purpose functions to build larger features (i.e. break a problem into helper functions).

---

# Higher-Order Functions (FN.HOF)

* **JS.FN.HOF.1** Determine when to pass a function reference and when to invoke a function, such as in event listeners where a named handler can be passed directly or an anonymous function used to supply arguments.
* **JS.FN.HOF.2** Provide callbacks to functions (such as array methods, event listeners, or timers) that use the correct parameters and return or perform the expected behavior.

---

# Conditionals (PF.CON)

* **JS.PF.CON.1** Use `if/else` to branch behavior based on input, state, or user actions.
* **JS.PF.CON.2** Choose between `if/else` and `switch` and justify the choice for readability and intent.
* **JS.PF.CON.3** Combine conditions with comparison and logical operators (`===`, `>`, `&&`, `||`, `!`) and correctly reason about truthy/falsy and short-circuiting.

---

# Iteration (PF.ITR)

* **JS.PF.ITR.1** Iterate through arrays and DOM collections using loops such as `for` and `for…of` to access items and update state or UI as needed.
* **JS.PF.ITR.2** Use loops to perform an action for each item in a collection (e.g., render elements, attach the same event listener to multiple elements).
* **JS.PF.ITR.3** Identify and fix common loop errors (off-by-one, infinite loops, unintended mutation during iteration).

---

# Access & Updates (AR.ACC)

* **JS.AR.ACC.1** Update arrays and objects by adding, changing, or removing elements and properties using appropriate syntax.
* **JS.AR.ACC.2** Distinguish between mutating and non-mutating operations, and choose the appropriate approach for a given task.
* **JS.AR.ACC.3** Use arrays of objects to represent and manipulate structured data (e.g., datasets from an API, or state used to render lists).

---

# Array Methods (AR.MTH)

* **JS.AR.MTH.1** Transform arrays using `map` to create new collections of values or elements.
* **JS.AR.MTH.2** Filter arrays using `filter` to return subsets of values that match given criteria.
* **JS.AR.MTH.3** Aggregate or summarize arrays using `reduce` to produce a single result (e.g., sum, count, lookup object).
* **JS.AR.MTH.4** Search and validate arrays using `find`, `some`, and `every`.
* **JS.AR.MTH.5** Chain methods together to perform complex array transformations efficiently.

---

# Element Selection & Manipulation (SD.ELM)

* **JS.SD.ELM.1** Select DOM elements using `getElementById`, `querySelector`, and related methods.
* **JS.SD.ELM.2** Read and update content and attributes of elements (e.g., `textContent`, `innerHTML`, `src`, `classList`).

---

# Event Handling (SD.EVH)

* **JS.SD.EVH.1** Attach event listeners to elements using `addEventListener`.
* **JS.SD.EVH.2** Access event object properties (e.g., `event.target`, `preventDefault`) to manage user interactions.
* **JS.SD.EVH.3** Use event delegation by attaching a listener to a stable parent and handling dynamic child elements with `event.target` or `closest()`.

---

# State Synchronization (SD.STA)

* **JS.SD.STA.1** Maintain program state using variables/objects that reflect the current UI or user input.
* **JS.SD.STA.2** Update the DOM when state changes to keep the UI consistent with data.
* **JS.SD.STA.3** Read user input from form elements and update state accordingly.
* **JS.SD.STA.4** Clear, reset, or toggle DOM elements in response to changes in state.

---

# Error Messages & Stack Traces (DB.ERR)

* **JS.DB.ERR.1** Read browser/Node error messages and identify the error type (e.g., ReferenceError, TypeError, SyntaxError).
* **JS.DB.ERR.2** Use stack traces to locate the file, line, and frame where an error originates.
* **JS.DB.ERR.3** Reproduce an error reliably and describe the conditions that trigger it.

---

# Tracing & Inspection (DB.TRC)

* **JS.DB.TRC.1** Insert `console.log` to trace control flow and data values at key points.
* **JS.DB.TRC.2** Set breakpoints in DevTools, step through code, and inspect variables to monitor values, and track data in the program flow.

---

# Common Bugs & Fixes (DB.BUG)

* **JS.DB.BUG.1** Diagnose and fix off-by-one and infinite loop errors in iteration.
* **JS.DB.BUG.2** Diagnose and fix undefined/null and type errors arising from bad selectors, missing data, or wrong access paths.
* **JS.DB.BUG.3** Resolve async timing issues (e.g., using values before fetch completes) by adding loading/error paths or moving dependent code.
* **JS.DB.BUG.4** Identify and correct DOM sync issues (UI not updating or updating the wrong node) by checking selectors, event targets, and state.

---

# Project Structure (MO.STR)

* **JS.MO.STR.1** Organize code into feature-oriented directories (e.g., `users/`, `posts/`) or layer groups (e.g., `services/`, `components/`), and stick to one approach per project.
* **JS.MO.STR.2** Use clear naming conventions for folders and files (lowercase-kebab or lowerCamelCase) so imports are predictable.
* **JS.MO.STR.3** Keep assets (images, fonts, static data) in a dedicated `assets/` (or `public/`) folder and reference them consistently.

---

# Import/Export (MO.IMP)

* **JS.MO.IMP.1** Use ES module **named** and **default** exports appropriately to share code across files.
* **JS.MO.IMP.2** Import functions, objects, or data from other modules using ES module syntax, and keep imports organized and readable.
* **JS.MO.IMP.3** Refactor code by moving functions or data into modules and reusing them via imports.

---

# Promises (AS.PRO)

* **JS.AS.PRO.1** Use `.then()` and `.catch()` to handle asynchronous results and errors.
* **JS.AS.PRO.2** Explain the difference between synchronous and asynchronous code execution in simple terms (blocking vs non-blocking).

---

# Async/Await (AS.AAW)

* **JS.AS.AAW.1** Write functions declared with `async` and use `await` to pause until a Promise resolves.
* **JS.AS.AAW.2** Refactor simple Promise chains into `async/await` for readability.

---

# Fetch & HTTP (AS.FET)

* **JS.AS.FET.1** Use `fetch` to perform GET requests and display the resulting data in the DOM.
* **JS.AS.FET.2** Use `fetch` with POST, PUT, and DELETE (and other methods) to send data to an API.
* **JS.AS.FET.3** Handle loading states (e.g., “Loading…” message) while waiting for data.

---

# Error Handling (AS.ERR)

* **JS.AS.ERR.1** Use `.catch()` and `try/catch` to handle errors in asynchronous code.
* **JS.AS.ERR.2** Provide user feedback for common failure cases (e.g., display an error message if the API request fails).

---

# Schema Planning (DA.SCH)

* **JS.DA.SCH.1** Plan application data using **Entity Relationship Diagrams (ERDs)** to model entities and their relationships.
* **JS.DA.SCH.2** Use **foreign keys** to model one-to-many relationships between entities.
* **JS.DA.SCH.3** Use **join tables** to model many-to-many relationships between entities.

---

# Services & Handlers (DA.SER)

* **JS.DA.SER.1** Write modular service functions organized by table that use `fetch` to interact with an API (e.g., `getUsers()`, `createPost()`).
* **JS.DA.SER.2** Organize services in separate modules/files for reuse across the application.

---

# Utilizing Data in Apps (DA.UTA)

* **JS.DA.UTA.1** Render data from state or API responses into the DOM (e.g., displaying a list of items).
* **JS.DA.UTA.2** Update the UI in response to changes made through services (e.g., reflect a new record, update an edited record, remove a deleted record).
* **JS.DA.UTA.3** Handle empty, loading, and error states when working with application data.
* **JS.DA.UTA.4** Provide simple filtering, sorting, or searching of data sets in response to user actions.

---

# Cross-Cutting Concepts

These cross-cutting concepts are habits of mind and practices that apply across all strands. They are not coded standards but overarching competencies students are expected to demonstrate.

## Analytical Thinking

* Approach problems objectively, breaking them into functional units and detecting patterns.
* Take time to fully understand the problem before coding.
* Debug methodically: analyze each step, inspect every value, and verify patterns.
* Use facts and evidence (not guesses) to drive decisions, with tools like the Console or Network tab.

## Algorithmic Thinking

* Define algorithms as sequences of basic operations (BO) and elementary operations (EO).
* Order BO and EO correctly to solve problems.
* Organize steps into appropriate modules following principles like **Single Responsibility**.
* Navigate related data across multiple tables to present correct, joined information.

## Efficient Learning

* Use all available resources to master skills or apply them in new contexts.
* Debug efficiently to learn what code is doing.
* Leverage developer tools (Network tab, SQL tools, Application tab, React Components tab).
* Perform and evaluate effective web searches.
* Prompt LLM tools effectively to support learning.

## Communication

* Communicate effectively with both technical and non-technical peers.
* Use correct technical vocabulary and improve it intentionally.
* Ask for help efficiently by presenting the problem, relevant code, and steps already taken.
* Write coherent, readable algorithms.
* Produce professional artifacts: valid commit messages, pull requests, and project proposals.
* Offer help and support (e.g., rubber ducking, peer feedback) to teammates.
