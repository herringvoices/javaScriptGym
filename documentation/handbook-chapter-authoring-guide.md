# JavaScript Gym Handbook Chapter Authoring Guide

This guide defines the house style for authoring JavaScript Gym handbook chapters.

The goal is not merely to make chapters *sound* alike. The goal is to make them **teach alike**.

The strongest VDT chapters share a recognizable instructional rhythm:

> **problem → mental model → smallest useful tool → example → immediate practice → next complication**

A successful chapter should feel like a guided lesson with a clear learning path, not like documentation broken into sections.

---

# 1. The Core Teaching Philosophy

## 1.1 Earn the abstraction

Do not begin with the new feature just because it is the topic of the chapter.

Begin, whenever practical, with the **problem the feature solves**.

The learner should encounter enough friction to understand why the new idea exists.

For example:

- awkward string concatenation → template literals
- several related variables → objects
- many similarly shaped objects → arrays
- manually selecting matching items → `.filter()`
- manually transforming every item → `.map()`
- repeated code → functions

Bad:

> JavaScript objects store key-value pairs.

Better:

> We have a title, author, price, and availability for one book. We *could* keep four separate variables, but those values all describe the same thing. It would be useful if JavaScript gave us a way to keep them together.

Then introduce the object.

### Productive pain, not busywork

The learner only needs enough awkwardness to recognize the need.

Do **not** make them write twenty lines of intentionally clumsy code so that the elegant solution can arrive dramatically.

Usually one small example is enough.

The rule is:

> **Let the learner feel the problem before giving them the tool, but do not punish them with the problem.**

---

## 1.2 Teach one meaningful new thing at a time

Every chapter has a limited **novelty budget**.

The learner may technically be capable of following an example that contains six unfamiliar ideas, but that does not mean they can tell which idea caused their confusion when the code breaks.

Prefer examples where the learner already understands nearly everything except the concept currently being taught.

If the lesson is about `.filter()`, do not also make the challenge depend on:

- a brand-new object shape,
- unfamiliar destructuring,
- a complicated callback,
- a new comparison pattern,
- and DOM rendering.

Control the number of moving parts.

### A useful diagnostic

Ask:

> If the learner gets this wrong, will we know what they misunderstood?

If the answer is no, the challenge probably contains too many new dimensions.

---

## 1.3 Explain behavior before terminology

Technical vocabulary matters, but vocabulary should usually **name something the learner already understands**.

A strong sequence is:

1. show the behavior,
2. explain it plainly,
3. let the learner use it,
4. give the technical name,
5. later compress the idea into a reference table.

This is why vocabulary tables work well near the end of a chapter. They summarize understanding rather than replacing instruction.

---

## 1.4 Use mental models that predict behavior

Metaphors are useful when they help the learner reason about code they have not seen yet.

Strong examples include ideas like:

- variables as labeled boxes,
- arrays as numbered shelves,
- objects as grouped information about one thing,
- methods as tools attached to a kind of data.

A metaphor is not successful merely because it is memorable.

It should help the learner correctly predict what happens next.

Avoid metaphors that must be repeatedly qualified with “well, not really.”

---

## 1.5 Build from the learner’s existing world

A chapter should feel connected to what came before.

Whenever possible:

- reuse familiar data,
- extend an existing script,
- bring back previously learned syntax,
- connect the new tool to a prior problem,
- maintain recognizable project contexts.

This lowers setup cost and creates retrieval practice naturally.

A learner should often think:

> “Oh, we are doing something new with something I already know.”

---

# 2. The Default Chapter Rhythm

A normal instructional chapter should usually move through this sequence.

## 2.1 Bridge from prior knowledge

Open by orienting the learner.

Briefly answer:

- What do we already know?
- What are we trying to do now?
- Why is the current approach becoming awkward or insufficient?

Keep this concrete.

Do not spend several paragraphs previewing every concept that will appear later.

---

## 2.2 Present the problem

Show the learner the friction.

The problem might be:

- repetition,
- scattered data,
- awkward syntax,
- inability to make a decision,
- inability to repeat an action,
- difficulty selecting data,
- difficulty changing every item,
- difficulty keeping state organized.

Whenever possible, show the problem in code rather than only describing it.

---

## 2.3 Introduce a mental model

Before or alongside formal syntax, give the learner a simple conceptual model.

The model should answer:

> “What kind of thing is this, and what job does it do?”

Keep this section short enough that the learner reaches code quickly.

---

## 2.4 Show the smallest useful syntax

Introduce only enough syntax to solve the problem currently on the page.

Prefer:

```js
const book = {
  title: "The Hobbit",
  price: 12
};
```

before introducing every object feature JavaScript supports.

Do not front-load edge cases.

---

## 2.5 Demonstrate with a tiny example

The first example should be:

- short,
- runnable,
- unsurprising,
- focused on the current concept,
- composed mostly of familiar syntax.

The learner should be able to inspect it and explain what changed.

---

## 2.6 Give immediate practice

Do not teach three sections of new material before the learner touches the first idea.

Use a challenge soon after introducing the concept.

The first challenge should normally change **one meaningful thing**.

Examples:

- create one variable,
- add one property,
- access one array item,
- call one method,
- write one condition,
- change one value.

---

## 2.7 Add the next complication

Once the learner succeeds with the smallest form, introduce the next natural need.

This creates a rhythm:

1. learn,
2. use,
3. complicate,
4. learn,
5. use.

A chapter should feel like climbing stairs, not jumping onto a roof.

---

## 2.8 End with consolidation

A chapter should usually finish with some combination of:

- a checkpoint,
- common gotchas,
- technical vocabulary,
- a cumulative challenge,
- a brief synthesis,
- a bridge to the next chapter.

The ending should help the learner answer:

> “What can I do now that I could not do before?”

---

# 3. Recommended Chapter Anatomy

This is the default authoring shape, not an inflexible template.

````mdx
---
id: JS.VDT....
title: ...
short: ...
---

# Human-readable chapter title

Bridge from prior learning.
Introduce the problem this chapter solves.

<Callout type="note" title="Starting checkpoint">
  ...
</Callout>

---

## 1) First idea

Explanation.

```js
// smallest useful example
```

<HandbookChallenge
  title="..."
  hints={[
    "Conceptual nudge.",
    "More concrete nudge.",
    <pre key="peek" className="m-0 whitespace-pre-wrap">{`// optional code peek`}</pre>,
  ]}
  answers={
    <pre className="m-0 whitespace-pre-wrap">{`// canonical answer`}</pre>
  }
>
  <p className="m-0">
    Clear learner-facing instructions.
  </p>
</HandbookChallenge>

---

## 2) Next idea

Explanation.

```js
// another focused example
```

<HandbookChallenge ...>
  ...
</HandbookChallenge>

---

## Checkpoint

Show the expected state or cumulative result.

---

## Common gotchas

Call out likely mistakes if needed.

---

## Technical Vocabulary

| Term | Plain-English meaning | Tiny example |
| --- | --- | --- |
| ... | ... | ... |

---

## Wrap-up

Brief synthesis and bridge forward.
````

Not every chapter needs every section.

The important thing is the instructional flow.

---

# 4. Openings: Start With the Need

The opening is one of the most important parts of the chapter.

Avoid opening with dictionary-style definitions.

Bad:

> An array is an ordered collection of values.

That statement is true, but it gives the learner no reason to care yet.

Better:

> Our bookshelf is growing. We could make `book1`, `book2`, `book3`, and keep going, but that gets hard to work with fast. What we really need is one value that can hold a whole list of books.

Now the array has a job.

## 4.1 Good opening questions

Useful opening questions include:

- What is becoming annoying?
- What are we repeating?
- What information belongs together?
- What can our program not do yet?
- What would be easier if JavaScript gave us a tool for it?

## 4.2 Do not manufacture fake stakes

The problem should be credible.

Avoid exaggerated language such as:

> Our code is an absolute disaster!

when the learner has only written three variables.

A calmer tone is more trustworthy:

> This still works, but it is starting to get awkward.

---

# 5. Pacing and the Novelty Budget

## 5.1 One primary learning target per challenge

A challenge may reinforce older skills, but it should normally have one main new target.

For example, a challenge about array indexing may still require:

- declaring a variable,
- logging a value,
- reading a string.

Those are fine if already familiar.

It should not quietly become a challenge about indexing, nested objects, callbacks, and string interpolation all at once.

---

## 5.2 Increase difficulty by reducing support, not by adding unrelated complexity

A strong progression might look like:

### Challenge 1
Nearly mirrors the example.

### Challenge 2
Uses the same idea with different data.

### Challenge 3
Combines the new idea with one familiar concept.

### Challenge 4
Asks the learner to choose the appropriate form with less prompting.

This is usually better than making every later challenge longer.

---

## 5.3 Let patterns repeat before abstracting them

If a new abstraction exists to simplify a pattern, learners should usually see or perform the pattern first.

Examples:

- concatenate strings before interpolation,
- manually inspect conditions before a reusable predicate,
- perform repeated operations before extracting a function,
- use a loop before introducing an array method that expresses the same intention.

The learner should recognize the abstraction as a solution to something they know.

---

## 5.4 Do not explain the entire language feature at once

Teach the subset needed now.

For example, an introductory function lesson does not need to cover:

- declarations,
- expressions,
- arrow functions,
- default parameters,
- rest parameters,
- closures,
- recursion,
- higher-order functions.

Teach the smallest coherent concept, then expand later.

---

# 6. Examples

Examples are teaching tools, not demonstrations of author expertise.

## 6.1 Keep first examples tiny

The first example should foreground the new syntax.

Good:

```js
const scores = [8, 10, 7];
console.log(scores[0]);
```

Less useful as a first example:

```js
const activePlayers = game.players
  .filter((player) => player.stats.isActive)
  .sort((a, b) => b.stats.score - a.stats.score);

console.log(activePlayers[0]?.profile?.displayName);
```

Even if every line is technically relevant someday, the learner cannot see the target.

---

## 6.2 Use names that carry meaning

Prefer:

```js
book.price
```

over:

```js
obj.x
```

Prefer:

```js
availableBooks
```

over:

```js
arr2
```

Code examples are part of the prose. Naming should reduce cognitive load.

---

## 6.3 Keep example domains stable when practical

If the learner is already working with books, do not switch to spaceships, sandwiches, zoo animals, and bank accounts in four consecutive examples unless the change itself serves a purpose.

Stable contexts help learners distinguish the **programming idea** from the **story wrapper**.

---

## 6.4 Use output when output clarifies behavior

Show console output when it makes the transformation or result easier to understand.

Inside a challenge, a compact output block may be useful:

```mdx
<p className="mt-3 mb-1 text-slate-300">
  <strong>Example console output:</strong>
</p>
<pre className="m-0 whitespace-pre-wrap">{`The Hobbit
12`}</pre>
```

Do not show output merely because you can.

---

# 7. Challenge Design

`<HandbookChallenge>` is the primary coding-practice component.

A challenge should make the learner **do the thing that was just taught**.

## 7.1 Challenge responsibilities

The component has three distinct instructional surfaces:

1. **body**: what the learner must do,
2. **hints**: progressively stronger help,
3. **answers**: the canonical solution.

Keep those responsibilities separate.

---

## 7.2 Challenge body

The body should describe the task clearly and concretely.

It should answer:

- What should I create or change?
- What names must I use?
- What result should I produce?
- What constraints matter?

Good:

```mdx
<HandbookChallenge ...>
  <p className="m-0">
    Create a variable named <code>displayName</code>. Use a template literal
    to combine <code>firstName</code> and <code>lastName</code> with a space
    between them.
  </p>
</HandbookChallenge>
```

Avoid burying the actual task inside a long story.

---

## 7.3 Challenge titles

Titles should be short, active, and specific.

Good:

- `Build the display name`
- `Grab the first book`
- `Keep the affordable books`
- `Add one more property`
- `Return the total`

Less useful:

- `Challenge 3`
- `Practice`
- `Try This`
- `Arrays`

The title should remind the learner what action they are practicing.

---

# 8. Hint Design

Hints should form a **support ladder**.

A learner who needs a small nudge should not have to reveal the whole solution.

A strong sequence is:

1. conceptual reminder,
2. more concrete guidance,
3. syntax reminder,
4. optional code peek.

Example:

```mdx
hints={[
  "An array position is called an index.",
  "The first item is at index <code>0</code>.",
  "Use square brackets after the array name.",
  <pre key="peek" className="m-0 whitespace-pre-wrap">{`books[0]`}</pre>,
]}
```

## 8.1 Hint 1: point toward the idea

Do not simply restate the prompt.

Bad:

> Get the first item from the array.

Better:

> Array positions start counting at 0.

---

## 8.2 Hint 2: narrow the path

Give more specific conceptual or syntactic help.

> Put the index inside square brackets after the array name.

---

## 8.3 Final hint: code peek when useful

The final hint may show the crucial syntax or a partial solution.

```mdx
<pre key="peek" className="m-0 whitespace-pre-wrap">{`const firstBook = books[0];`}</pre>
```

The code peek is allowed to be strong. The learner deliberately requested escalating help.

---

## 8.4 Do not make every hint equally revealing

If all hints effectively give the answer, there is no support ladder.

If every hint is vague, the hints do not help.

Escalate intentionally.

---

# 9. Answers

The `answers` prop contains a canonical answer.

```mdx
answers={
  <pre className="m-0 whitespace-pre-wrap">{`const firstBook = books[0];`}</pre>
}
```

A canonical answer should be:

- correct,
- simple,
- consistent with the syntax taught,
- free from clever shortcuts,
- formatted like handbook code.

Do not introduce a new technique in the answer that the learner has not been taught.

If several solutions are valid, show the one that best reinforces the chapter’s current mental model.

---

# 10. PracticeCard vs HandbookChallenge

Use the components for different jobs.

## `<PracticeCard>`

Use for:

- recall,
- identification,
- prediction,
- conceptual checks,
- quick “what do you notice?” questions.

Example:

```mdx
<PracticeCard
  prompt="Is .trim() a property or a method? How can you tell?"
  answer={`Method. It has the parentheses at the end.`}
/>
```

The learner does not need an editor to answer.

## `<HandbookChallenge>`

Use when the learner should:

- write code,
- modify code,
- run code,
- debug code,
- produce a specific program result.

A useful rule:

> If the lesson objective requires fingers on the keyboard, prefer `HandbookChallenge`.

---

# 11. Checkpoints and Cumulative State

Checkpoints help learners know what their working file should look like before continuing.

They also make later lessons less fragile.

## 11.1 Callout checkpoint

Use a callout when the checkpoint is mostly an editor-state reset or confirmation.

```mdx
<Callout type="note" title="Checkpoint">
  <p>Your file should now have three book variables.</p>
  <pre className="m-0 whitespace-pre-wrap">{`const book1 = ...
const book2 = ...
const book3 = ...`}</pre>
</Callout>
```

This says:

> Make sure your file is in this state before we continue.

---

## 11.2 Section checkpoint

Use a full section when reaching the state is itself an important learning milestone.

```md
## Checkpoint B · Two book objects

By the end of this section, your program should have two complete book objects.
```

This gives the checkpoint more instructional weight.

---

## 11.3 Checkpoints should reduce accidental failure

A learner should not fail the next lesson because they missed an unrelated line three chapters ago.

When later work depends on specific state, provide enough checkpoint information to recover.

---

# 12. Cumulative Projects

Project chapters should integrate learned concepts rather than secretly introduce several new ones.

A project is primarily for:

- retrieval,
- combination,
- decision-making,
- fluency,
- transfer.

It should not be the first time the learner sees a critical syntax form.

## 12.1 Project scaffolding

A project may still be staged.

For example:

1. create the data,
2. display one piece,
3. add a decision,
4. process the collection,
5. produce the final output.

“Project” does not mean “remove all structure.”

---

## 12.2 Preserve diagnosability

If the final project fails, the learner should have intermediate checkpoints that help locate the problem.

Avoid one enormous challenge whose only feedback is that the final output is wrong.

---

# 13. Tone and Voice

The handbook should sound like a capable instructor sitting beside the learner.

## 13.1 Be conversational without becoming sloppy

Prefer:

> We have a problem: all four variables describe the same book, but JavaScript does not know they belong together yet.

over:

> Objects are associative data structures consisting of properties represented by key-value pairs.

The technical version may become useful later, but it is not the opening explanation.

---

## 13.2 Respect the learner

Do not imply that a concept is trivial.

Avoid:

- “Obviously...”
- “Simply...”
- “Just...”
- “This is easy.”
- “You should already know...”

Something can be straightforward to an experienced programmer and still require real work from a beginner.

---

## 13.3 Humor should be brief and safe

Humor can give the handbook personality, but it should not obscure instructions.

Good humor:

- one sentence,
- easy to skip,
- does not depend on the learner getting a reference,
- does not make the learner the joke.

The instructional path must remain clear without the joke.

---

## 13.4 Prefer concrete verbs

Good:

- create,
- store,
- compare,
- keep,
- remove,
- return,
- log,
- update,
- loop,
- call,
- choose.

Weaker:

- leverage,
- utilize,
- facilitate,
- implement functionality for.

---

# 14. Frontmatter

VDT chapters use minimal frontmatter.

```yaml
---
id: JS.VDT.PRM.STR
title: Strings · Text Data
short: Create text values, join them, and embed variables with template literals.
---
```

## `id`

The `id` should match the handbook’s standard hierarchy.

Do not invent a one-off naming pattern.

## `title`

Keep it compact and UI-friendly.

It may pair a formal topic with a learner-friendly description.

## `short`

Use an action-oriented summary.

Prefer:

> Create text values, join them, and embed variables with template literals.

over:

> An introduction to strings and template literals.

The `short` field should tell us what the learner will **do**.

---

# 15. Markdown vs JSX

Use the simplest authoring form that correctly expresses the content.

## 15.1 Prefer normal Markdown for normal instructional content

Use Markdown for:

- headings,
- paragraphs,
- emphasis,
- lists,
- inline code,
- links,
- ordinary code fences,
- tables,
- horizontal rules.

Example:

```md
Arrays are like **numbered shelves**.

Each item has a position called an `index`.
```

Do not wrap every paragraph in `<p>` simply because MDX allows it.

---

## 15.2 Use JSX for handbook components

Use JSX when invoking:

- `<Callout>`
- `<HandbookChallenge>`
- `<PracticeCard>`
- other custom handbook UI components.

Inside those components, JSX elements may be useful for precise layout.

Example:

```mdx
<HandbookChallenge ...>
  <p className="m-0">
    Create a variable named <code>firstBook</code>.
  </p>
</HandbookChallenge>
```

---

## 15.3 JSX inside custom components

Inside a component body, utility classes are often used to control spacing reliably.

Common patterns:

```mdx
<p className="m-0">...</p>
```

```mdx
<p className="mt-3 mb-1 text-slate-300">
  <strong>Example console output:</strong>
</p>
```

```mdx
<pre className="m-0 whitespace-pre-wrap">{`...`}</pre>
```

```mdx
<ul className="mt-2 mb-2">
  <li>...</li>
  <li>...</li>
</ul>
```

Outside custom UI components, prefer ordinary Markdown unless JSX solves a specific problem.

---

# 16. Callouts

Callouts should carry meaning. They are not decorative boxes.

## `type="note"`

Use for:

- context,
- starting state,
- checkpoints,
- clarifications,
- useful background.

Think:

> **Here is something to keep in mind.**

---

## `type="tip"`

Use for:

- an important mental model,
- a useful insight,
- a “why this works” explanation,
- a “problem this solves” observation.

Think:

> **Here is an idea that will make this easier to understand or use.**

---

## `type="caution"` or `type="danger"`

Use when the learner should stop and pay special attention.

Appropriate uses include:

- a very common mistake,
- a misleading similarity,
- a conceptual trap,
- behavior that can unexpectedly change data,
- syntax that looks almost correct but means something different.

“Danger” does not have to mean literal danger. It signals instructional importance.

Do not overuse high-attention callouts or they stop feeling important.

---

## 16.1 Choose callout type by purpose

Do not choose a type because its color looks good in the page.

The visual treatment should communicate the semantic role.

A useful shorthand:

> **note = context**  
> **tip = insight**  
> **caution/danger = stop and notice**

---

# 17. Horizontal Rules and Visual Pacing

VDT uses `---` heavily to create lesson beats.

A common unit is:

1. heading,
2. explanation,
3. example,
4. challenge,
5. `---`,
6. next concept.

Do not usually put a horizontal rule between a concept and the challenge that practices it. They belong to the same instructional unit.

Use `---` when the learner is moving to the next conceptual beat.

---

# 18. `<br/>`

`<br/>` may occasionally be useful between adjacent custom components when the rendered layout needs a small local spacing correction.

It is not a general chapter-structure tool.

Prefer:

- sections,
- paragraphs,
- component spacing,
- horizontal rules,

before adding repeated `<br/>` tags.

A useful distinction:

> `---` marks a **lesson boundary**.  
> `<br/>` fixes **local visual spacing**.

---

# 19. Tables

Use Markdown tables primarily as **reference and compression surfaces**.

Teach the idea first.

Then summarize it.

Good order:

1. explanation,
2. examples,
3. practice,
4. vocabulary/reference table.

Avoid introducing a complex concept by dropping a large table on the learner before they have a mental model for it.

---

# 20. Technical Vocabulary

Vocabulary sections should connect formal language to concepts the learner already understands.

Example:

| Term | Plain-English meaning | Tiny example |
| --- | --- | --- |
| property | A named piece of data stored on an object | `book.title` |
| index | The numbered position of an item in an array | `books[0]` |
| method | A function attached to a value or object that you call with parentheses | `name.trim()` |

Avoid circular definitions.

Bad:

> Method: a method belonging to an object.

Better:

> Method: a function attached to a value or object that you call with parentheses.

---

# 21. Quotation Marks, Backticks, and Escaping

MDX chapters contain several nested syntax layers.

Most authoring mistakes happen because the writer loses track of **which layer currently owns the text**.

Ask:

> **What is currently delimiting this text?**

The answer determines what must be escaped.

---

## 21.1 Normal Markdown prose

Use Markdown backticks for inline code.

```md
Create a variable named `bookTitle`.
```

JavaScript quotes inside inline code do not need escaping:

```md
Set it equal to `"The Hobbit"`.
```

The Markdown backticks own the inline-code span, so the quotation marks are ordinary content.

---

## 21.2 JSX text content

Quotation marks in JSX text content are generally fine.

```mdx
<p>
  Use <code>"hello"</code> for a string.
</p>
```

The quotation marks are text content, not JSX attribute delimiters.

Do not escape them unnecessarily.

---

## 21.3 JSX attributes

A JSX attribute commonly uses double quotation marks:

```mdx
<Callout type="tip" title="Remember the index">
```

If you need literal double quotation marks *inside* a double-quoted attribute, they cannot appear unescaped as ordinary delimiter characters.

When the content becomes complicated, prefer restructuring rather than building unreadable escape sequences.

---

## 21.4 JavaScript strings inside JSX expressions

The `hints` prop is a JavaScript array.

```mdx
hints={[
  "Remember that array indexes start at 0.",
  "Use square brackets after the array name.",
]}
```

Each quoted item is a real JavaScript string.

If a double-quoted hint needs a literal double quote, escape it:

```mdx
hints={[
  "Create <code>status</code> with the value <code>\"active\"</code>.",
]}
```

The outer JavaScript string owns the text, so its internal double quotes require `\"`.

---

## 21.5 HTML inside hint strings

VDT hint strings may include small HTML fragments such as `<code>`.

```mdx
hints={[
  "Use <code>books[0]</code> to access the first item.",
]}
```

This is an established handbook pattern.

Use it sparingly and keep the string readable.

---

## 21.6 Multiline code inside JSX

For code inside props or custom component content, use a template literal inside a JSX expression:

```mdx
<pre className="m-0 whitespace-pre-wrap">{`const name = "Nick";
console.log(name);`}</pre>
```

This is especially convenient because normal JavaScript double quotes inside the displayed code do not need escaping.

The outer delimiters are backticks.

---

## 21.7 Displaying backticks inside a template literal

If the code being displayed itself contains JavaScript template-literal backticks, escape those inner backticks:

```mdx
<pre className="m-0 whitespace-pre-wrap">{`const greeting = \`Hello!\`;`}</pre>
```

Without the backslashes, the inner backticks would terminate the outer authoring-time template literal.

---

## 21.8 Displaying `${...}` inside a template literal

If the displayed code contains template interpolation, escape the `${...}` so the **outer** authoring-time template literal does not evaluate it.

```mdx
<pre className="m-0 whitespace-pre-wrap">{`const greeting = \`Hello, \${name}!\`;`}</pre>
```

The learner should see:

```js
const greeting = `Hello, ${name}!`;
```

The source MDX must therefore protect both:

- the displayed backticks,
- the displayed interpolation marker.

---

## 21.9 `<pre>` elements inside arrays need a key

A JSX element stored inside the `hints` array should have a `key`.

```mdx
hints={[
  "Start with the array name.",
  <pre key="peek" className="m-0 whitespace-pre-wrap">{`books[0]`}</pre>,
]}
```

The `key="peek"` exists because the `<pre>` is a JSX element inside an array.

The `answers` prop usually contains one JSX expression rather than an array, so it does not need the same key:

```mdx
answers={
  <pre className="m-0 whitespace-pre-wrap">{`const firstBook = books[0];`}</pre>
}
```

---

## 21.10 Escaping quick reference

| Where you are writing | Typical delimiter | What to watch |
| --- | --- | --- |
| Markdown prose | none | use backticks for inline code |
| Inline code | `` `...` `` | quotes usually need no escaping |
| JSX attribute | `"..."` | internal `"` can conflict |
| Hint string | `"..."` | internal `"` becomes `\"` |
| `<pre>` code template | `` {`...`} `` | displayed backticks become `\`` |
| Template interpolation being displayed | inside `` {`...`} `` | `${name}` becomes `\${name}` |

The general rule is more useful than memorizing individual cases:

> **Identify the outer delimiter first. Escape only characters that would interfere with that delimiter or trigger authoring-time JavaScript behavior.**

---

# 22. Common MDX Authoring Patterns

## A standard challenge

```mdx
<HandbookChallenge
  title="Grab the first book"
  hints={[
    "Array positions start counting at <code>0</code>.",
    "Put the index inside square brackets after <code>books</code>.",
    <pre key="peek" className="m-0 whitespace-pre-wrap">{`books[0]`}</pre>,
  ]}
  answers={
    <pre className="m-0 whitespace-pre-wrap">{`const firstBook = books[0];`}</pre>
  }
>
  <p className="m-0">
    Create a variable named <code>firstBook</code> and store the first item
    from <code>books</code> in it.
  </p>
</HandbookChallenge>
```

---

## A challenge with displayed template-literal code

```mdx
<HandbookChallenge
  title="Build the greeting"
  hints={[
    "Template literals use backticks instead of quotation marks.",
    "Put the variable inside <code>${...}</code>.",
    <pre key="peek" className="m-0 whitespace-pre-wrap">{`const greeting = \`Hello, \${name}!\`;`}</pre>,
  ]}
  answers={
    <pre className="m-0 whitespace-pre-wrap">{`const greeting = \`Hello, \${name}!\`;`}</pre>
  }
>
  <p className="m-0">
    Create <code>greeting</code> with a template literal that includes
    <code>name</code>.
  </p>
</HandbookChallenge>
```

---

## A conceptual practice card

```mdx
<PracticeCard
  prompt="Why is .trim() a method instead of a property?"
  answer={`Because it performs an action and is called with parentheses.`}
/>
```

---

## A checkpoint callout

```mdx
<Callout type="note" title="Checkpoint">
  <p>
    Before continuing, make sure your file contains the completed
    <code>book</code> object.
  </p>
  <pre className="m-0 whitespace-pre-wrap">{`const book = {
  title: "The Hobbit",
  price: 12,
  available: true
};`}</pre>
</Callout>
```

---

# 23. Things to Avoid

## 23.1 Documentation-first openings

Avoid beginning with a complete formal definition and list of syntax rules.

Teach the need first.

---

## 23.2 Giant walls of explanation before practice

If the learner has read several screens without changing or running code, look for a place to insert practice sooner.

---

## 23.3 Challenges that introduce hidden new material

A challenge should not require the learner to reverse-engineer syntax the chapter never taught.

Difficulty should come from applying the concept, not discovering missing instructions.

---

## 23.4 Huge challenge bodies

Do not turn `<HandbookChallenge>` into a mini textbook chapter.

Teach outside the component.

Use the component to tell the learner what to do.

---

## 23.5 Unstructured hint dumps

Hints are not miscellaneous notes.

They should escalate deliberately.

---

## 23.6 Clever answers

Do not show advanced shorthand merely because it is elegant.

Canonical answers should reinforce the lesson currently being learned.

---

## 23.7 Callout inflation

If every other paragraph is a colorful callout, none of the callouts communicate importance.

---

## 23.8 Unnecessary JSX

Ordinary prose should remain ordinary Markdown.

MDX is not improved by turning:

```md
This is an **array**.
```

into:

```mdx
<p>This is an <strong>array</strong>.</p>
```

without a reason.

---

## 23.9 Arbitrary context switching

A new story setting should not make the learner mentally rebuild the entire world for every example.

Reuse familiar data when it helps.

---

## 23.10 “Just” teaching

Avoid instructions like:

> Just use `.filter()` here.

If the learner knew why and how to use it, the instruction would be unnecessary.

Say what decision they should make.

---

# 24. Chapter Types

Not every handbook page serves the same purpose.

The author should know what kind of chapter they are writing.

## 24.1 Concept introduction

Purpose:

- establish a need,
- build a mental model,
- introduce basic syntax,
- provide immediate practice.

This type should follow the core problem-first rhythm closely.

---

## 24.2 Expansion chapter

Purpose:

- add another capability to a known concept.

Examples:

- more string methods,
- object utilities,
- array end controls.

Start from what the learner already knows and introduce the new capability as an answer to a new need.

Do not reteach the entire foundational concept.

---

## 24.3 Integration chapter

Purpose:

- combine previously learned concepts.

Examples:

- arrays of objects,
- a cumulative data project,
- rendering structured data.

Be especially careful with the novelty budget. Integration is already cognitively demanding.

---

## 24.4 Reference or overview chapter

Purpose:

- organize a family of related concepts,
- show where the learner is headed,
- compare tools already introduced or soon to be introduced.

These can contain more summary material than a normal lesson, but they should still avoid becoming raw documentation dumps.

---

## 24.5 Project chapter

Purpose:

- practice retrieval and transfer,
- combine skills,
- produce something larger.

Projects may reduce scaffolding gradually, but should still contain milestones and recovery points.

---

# 25. Editing an Existing Chapter Toward VDT Quality

Do not revise a weak chapter by only changing its tone.

A chapter can sound friendly and still teach poorly.

When revising, work in this order.

## Step 1: Identify the actual learning target

Write one sentence:

> By the end of this chapter, the learner can ______.

If that sentence contains four unrelated skills, reconsider the chapter boundary.

---

## Step 2: Find the problem that makes the skill useful

Ask:

> Why would a beginner want this tool *right now*?

Build the opening around that need.

---

## Step 3: Audit prerequisite knowledge

Mark every piece of syntax in the examples as:

- already known,
- being taught now,
- unnecessary novelty.

Remove or explain unnecessary novelty.

---

## Step 4: Break the lesson into beats

For each beat, aim for:

> explanation → example → practice

Do not group all explanations first and all challenges later unless there is a compelling reason.

---

## Step 5: Audit challenges

For each challenge, ask:

- What is the primary skill?
- What previous skills does it require?
- Is failure diagnosable?
- Do the hints escalate?
- Does the answer use only taught syntax?

---

## Step 6: Audit MDX structure

Check:

- frontmatter,
- heading hierarchy,
- horizontal rules,
- callout semantics,
- Markdown vs JSX,
- challenge props,
- `key` on JSX elements inside hint arrays,
- quoting and escaping.

---

## Step 7: Tighten language

Remove:

- repeated explanations,
- unnecessary preambles,
- jargon before understanding,
- filler,
- instructions hidden in paragraphs.

Keep useful warmth and personality.

---

# 26. Authoring Checklist

Before considering a chapter complete, ask the following.

## Learning target

- [ ] Can I state the primary learning target in one sentence?
- [ ] Does the chapter mostly stay focused on that target?
- [ ] Are prerequisites already taught?

## Problem and motivation

- [ ] Does the learner understand why the new concept is useful?
- [ ] When practical, do they encounter the awkward/problematic version first?
- [ ] Is the pain brief and productive rather than tedious?

## Pacing

- [ ] Is new material introduced in small steps?
- [ ] Does practice occur soon after instruction?
- [ ] Does each challenge have one primary new target?
- [ ] Does difficulty increase through independence rather than random complexity?

## Explanations

- [ ] Is there a useful mental model?
- [ ] Does terminology follow understanding where practical?
- [ ] Are examples small enough to foreground the concept?
- [ ] Are names concrete and meaningful?

## Challenges

- [ ] Are instructions explicit?
- [ ] Is the title active and specific?
- [ ] Do hints progress from conceptual to concrete?
- [ ] Is the final answer simple and canonical?
- [ ] Does the answer avoid untaught shortcuts?

## Cumulative state

- [ ] If later work depends on earlier code, is there a checkpoint?
- [ ] Can a learner recover if their file drifted?
- [ ] Are project milestones visible?

## Tone

- [ ] Does the writing respect beginners?
- [ ] Have I removed “obviously,” “simply,” and unnecessary “just” language?
- [ ] Is humor brief and nonessential?
- [ ] Is the prose conversational but precise?

## MDX

- [ ] Is frontmatter complete and consistent?
- [ ] Is ordinary prose written in Markdown?
- [ ] Is JSX used only when useful?
- [ ] Are callout types chosen semantically?
- [ ] Are horizontal rules marking actual lesson beats?
- [ ] Are `<br/>` tags rare and local?
- [ ] Do JSX elements inside arrays have keys?
- [ ] Are quotes, backticks, and `${...}` correctly escaped for their current syntax layer?

## Ending

- [ ] Does the learner get a chance to consolidate?
- [ ] Is important vocabulary summarized?
- [ ] Does the ending make clear what the learner can now do?
- [ ] Is there a natural bridge to what comes next?

---

# 27. The Short Version

When in doubt, write the chapter according to this rule:

> **Make the learner feel a real problem, give them one new tool that solves it, show the smallest useful version of that tool, let them use it immediately, then build the next need from what they now understand.**

And author the MDX according to this rule:

> **Use Markdown for teaching, components for handbook behavior, JSX for component-internal structure, and always know which syntax layer currently owns your text.**

That combination is the core of the JavaScript Gym handbook style.
