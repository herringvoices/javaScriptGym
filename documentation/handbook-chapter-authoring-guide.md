# JavaScript Gym Handbook Chapter Authoring Guide

This guide defines the house style for JavaScript Gym handbook chapters.

The goal is not merely to make chapters *sound* alike. The goal is to make them **teach alike**.

The handbook should feel like a guided lesson with a clear learning path, not like documentation broken into sections.

A strong instructional rhythm is:

> **problem → mental model → smallest useful tool → example → immediate practice → next complication**

The `<HandbookChallenge>` component is the spine of that rhythm. It marks the moment when reading stops and the learner must use the idea before moving on.

---

# 1. Core Teaching Philosophy

## 1.1 Earn the abstraction

Do not begin with a feature merely because it is the topic of the chapter.

When practical, begin with the **problem the feature solves**.

Examples:

- awkward string concatenation → template literals
- several related variables → objects
- many similarly shaped objects → arrays
- manually selecting matching items → `.filter()`
- manually transforming every item → `.map()`
- repeated code → functions

The learner should encounter enough friction to understand why the new idea exists, but not enough to turn the setup into busywork.

> **Let the learner feel the problem before giving them the tool, but do not punish them with the problem.**

---

## 1.2 Teach one meaningful new thing at a time

Every chapter and every challenge has a limited novelty budget.

Prefer examples where the learner already understands nearly everything except the concept currently being taught.

A useful diagnostic is:

> If the learner gets this wrong, will we know what they misunderstood?

If the answer is no, the example or challenge probably contains too many new dimensions.

---

## 1.3 Explain behavior before terminology

Technical vocabulary matters, but vocabulary should usually name something the learner already understands.

A strong sequence is:

1. show the behavior,
2. explain it plainly,
3. let the learner use it,
4. give the technical name,
5. later compress the idea into a reference table.

---

## 1.4 Use mental models that predict behavior

Useful mental models include:

- variables as labeled boxes,
- arrays as numbered shelves,
- objects as grouped information about one thing,
- methods as tools attached to a kind of data.

A metaphor is useful when it helps the learner correctly predict what happens next.

---

## 1.5 Build from the learner's existing world

Whenever practical:

- reuse familiar data,
- extend an existing script,
- bring back previously learned syntax,
- connect the new tool to a prior problem,
- maintain recognizable project contexts.

The learner should often feel:

> "We are doing something new with something I already know."

---

# 2. Default Chapter Rhythm

A normal instructional chapter should usually move through this sequence.

## 2.1 Bridge from prior knowledge

Briefly establish:

- what the learner already knows,
- what they are trying to do now,
- why the current approach is becoming awkward or insufficient.

Keep this concrete.

---

## 2.2 Present the problem

Show the friction in code whenever practical.

The problem might be repetition, scattered data, inability to make a decision, inability to repeat an action, or difficulty selecting or transforming data.

---

## 2.3 Introduce a mental model

Answer:

> "What kind of thing is this, and what job does it do?"

Keep this short enough that the learner reaches code quickly.

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

---

## 2.5 Demonstrate with a tiny example

The first example should be:

- short,
- runnable,
- unsurprising,
- focused on the current concept,
- composed mostly of familiar syntax.

---

## 2.5.1 Examples should prepare, not answer

A worked example should demonstrate the same **kind of thinking** the learner will need in the following challenge, but it should usually not be the challenge itself with different variable names.

Prefer **parallel examples**:

- the example demonstrates the exact concept,
- the challenge uses that concept in a closely related situation,
- the syntax and reasoning transfer cleanly,
- but the learner still has to decide how to apply it.

For example:

- **Example:** concatenate an animal and a mood into a sentence.
- **Challenge:** concatenate several existing values into an invitation.

The challenge should feel like:

> "I just saw how to do this kind of thing."

not:

> "I can copy the line above and replace one word."

Examples and challenges may share a larger project or theme when that continuity is useful. They do not need to use unrelated subject matter. The important distinction is that the worked example should **model the move without supplying the challenge's answer**.

---

## 2.6 Give immediate practice

Do not teach several sections of new material before the learner touches the first idea.

A challenge should appear soon after instruction.

The first challenge should normally change one meaningful thing:

- create one variable,
- add one property,
- access one array item,
- call one method,
- write one condition,
- change one value.

---

## 2.7 Add the next complication

Once the learner succeeds with the smallest form, introduce the next natural need.

The rhythm is:

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

The learner should be able to answer:

> "What can I do now that I could not do before?"

---

# 3. Recommended Chapter Anatomy

This is the default shape, not an inflexible template.

````mdx
---
id: JS.VDT....
title: ...
short: ...
---

# Human-readable chapter title

Bridge from prior learning.
Introduce the problem this chapter solves.

## First idea

Explanation.

```js
// smallest useful example
```

<HandbookChallenge
  title="Do the specific thing"
  hints={[
    <>Conceptual reminder.</>,
    <>More specific direction.</>,
    <>Syntax reminder using <code>inlineCode</code> when useful.</>,
  ]}
  expected={
    <pre className="m-0 whitespace-pre-wrap">{`observable result`}</pre>
  }
  solution={
    <pre className="m-0 whitespace-pre-wrap">{`// canonical solution`}</pre>
  }
>
  <p className="m-0">
    Clear learner-facing instructions.
  </p>
</HandbookChallenge>

## Next idea

Explanation.
Example.
Immediate practice.

## Checkpoint

Show the expected cumulative state when later work depends on it.

## Common gotchas

Call out likely mistakes if needed.

## Technical Vocabulary

| Term | Plain-English meaning | Tiny example |
| --- | --- | --- |
| ... | ... | ... |

## Wrap-up

Brief synthesis and bridge forward.
````

---

# 4. Pacing and the Novelty Budget

## 4.1 One primary learning target per challenge

A challenge may reinforce older skills, but it should normally have one main new target.

A challenge about array indexing can require declaring a variable and logging a value if those skills are already familiar. It should not quietly become a challenge about indexing, nested objects, callbacks, and interpolation at the same time.

---

## 4.2 Increase difficulty by reducing support

A useful progression is:

### Early challenge

Nearly mirrors the example.

### Next challenge

Uses the same idea with different data.

### Later challenge

Combines the new idea with one familiar concept.

### Final challenge

Asks the learner to choose the appropriate form with less prompting.

Difficulty should come from increasing independence, not unrelated complexity.

---

## 4.3 Let patterns repeat before abstracting them

Learners should usually see or perform the pattern that a new abstraction will simplify.

Examples:

- concatenate strings before interpolation,
- perform repeated operations before extracting a function,
- use a loop before introducing an array method that expresses the same intention.

---

# 5. Examples

Examples are teaching tools, not demonstrations of author expertise.

## 5.1 Keep first examples tiny

Good:

```js
const scores = [8, 10, 7];
console.log(scores[0]);
```

Avoid making the learner find the target concept inside a large block of unrelated syntax.

---

## 5.2 Use names that carry meaning

Prefer:

```js
book.price
```

over:

```js
obj.x
```

Code examples are part of the prose. Naming should reduce cognitive load.

---

## 5.3 Keep example domains stable when practical

If the learner is already working with books, do not switch to spaceships, sandwiches, zoo animals, and bank accounts in four consecutive examples unless the change serves a purpose.

---

## 5.4 Do not give away the challenge

An example immediately before a challenge should be a cousin of the task, not its twin.

If the learner can copy the example and only rename a variable or selector, the challenge is too close to the example.

---

# 6. HandbookChallenge: The Authoring Contract

`<HandbookChallenge>` is a required practice checkpoint.

It is not:

- an optional callout,
- a place for extra explanation,
- a decorative exercise box,
- a quiz about material the learner has not been taught.

When the learner reaches one, the intended message is:

> **Stop reading. Use what you just learned. Then continue.**

The component has five instructional surfaces:

1. **title**: the action the learner is about to perform,
2. **body**: the task instructions,
3. **expected**: the observable success target when useful,
4. **hints**: progressively stronger nudges,
5. **solution**: the canonical working implementation.

Keep those responsibilities separate.

---

## 6.1 The canonical component shape

```mdx
<HandbookChallenge
  title="Create the viewer name"
  hints={[
    <>A variable can exist before it has a value.</>,
    <>Declare the variable before your first <code>console.log()</code>.</>,
    <>Remember that <code>let name;</code> declares without assigning.</>,
  ]}
  expected={
    <pre className="m-0 whitespace-pre-wrap">{`undefined
Milo`}</pre>
  }
  solution={
    <pre className="m-0 whitespace-pre-wrap">{`let viewerName;
console.log(viewerName);

viewerName = "Milo";
console.log(viewerName);`}</pre>
  }
>
  <p className="m-0">
    Declare <code>viewerName</code>, log it before assigning a value,
    then assign your name and log it again.
  </p>
</HandbookChallenge>
```

New handbook content should use this form.

---

# 7. Challenge Titles

Challenge titles have one job:

> **Tell the learner what they are about to do.**

Use a short, active, verb-first phrase whenever possible.

Good:

- `Create the viewer name`
- `Build the book object`
- `Grab the first book`
- `Filter the affordable books`
- `Select the mount point`
- `Update the text content`
- `Return the total`

Avoid:

- `Challenge 3`
- `Challenge A1: One book's data`
- `ELM Challenge 6 · Import and inspect potion data`
- `F1-5 · Create users`
- `Practice`
- `Warmup`
- `Arrays`
- story-only titles such as `Dressing a Cat`

The component already tells the learner that this is **YOUR TURN**. The title should not repeat curriculum metadata or the word "challenge."

Story flavor belongs in the body, not in place of the programming action.

### Title test

Ask:

> If this title appeared by itself in a table of contents, would I know what coding action I am practicing?

If not, rewrite it.

---

# 8. Challenge Body

The body describes the task clearly and concretely.

It should answer only what the learner needs in order to act:

- What should I create or change?
- What names must I use?
- What result should I produce?
- What constraints matter?
- What existing code should remain in place?

Good:

```mdx
<p className="m-0">
  Create a variable named <code>displayName</code>. Use a template literal
  to combine <code>firstName</code> and <code>lastName</code> with one space
  between them.
</p>
```

Avoid burying the task inside a long story.

Do not move required instructions into hints. A learner who understands the material should be able to complete the task without opening any hint.

### Starting state

When a challenge depends on code from earlier work, state that briefly in the body or a small starting-point callout.

Do not make the learner guess which old lines should still exist.

---

# 9. Expected Results

Use the `expected` prop when success would otherwise be ambiguous.

Good uses include:

- exact console output,
- the text that should appear on the page,
- the shape of a returned object,
- the visible state of a rendered UI,
- a specific array or value the learner should be able to inspect.

Example:

```mdx
expected={
  <pre className="m-0 whitespace-pre-wrap">{`undefined
Milo`}</pre>
}
```

The expected result should describe **what success looks like**, not reveal the implementation.

Do not include an expected block when the result is already obvious from the task.

---

# 10. Hints: A Support Ladder, Not a Solution Ladder

Hints should answer:

> **What should I think about next?**

They should not answer:

> **What code should I type?**

Use one to three hints. Three is a ceiling for normal challenges, not a target.

A strong progression is:

1. **recall**: remind the learner of the relevant concept,
2. **direction**: point toward the relevant part of the problem,
3. **syntax cue**: remind them of a general syntax form without completing this task.

Example:

```mdx
hints={[
  <>Array positions start counting at <code>0</code>.</>,
  <>Use the item's position with the array name.</>,
  <>Array access uses square brackets, like <code>someArray[0]</code>.</>,
]}
```

The UI reveals these one at a time. The order therefore matters.

---

## 10.1 Hint 1: recall the idea

Bad:

> Get the first item from the array.

That merely restates the task.

Better:

> Array positions start counting at 0.

---

## 10.2 Hint 2: narrow the path

Bad:

> Write `const firstBook = books[0]`.

That is the solution.

Better:

> You need the position of the item you want and the array that contains it.

---

## 10.3 Hint 3: remind, do not complete

A final hint may show a **generic syntax pattern**:

```mdx
<>Array access looks like <code>someArray[index]</code>.</>
```

It should not show the challenge's completed line:

```mdx
// Do not use this as a hint:
<pre>{`const firstBook = books[0];`}</pre>
```

That belongs in `solution`.

---

## 10.4 The paste test

Use this test on every hint:

> **Could the learner paste this hint, make one or two trivial edits, and finish the task?**

If yes, it is not a hint. Move that information to the solution or rewrite the hint.

---

## 10.5 Do not hide required instructions in hints

Bad hint:

> Write a function named `createUser(first, last)` that returns an object with `firstName` and `lastName` properties.

If those names and requirements are part of the assignment, they belong in the body.

A hint should help a learner who understood the assignment but is stuck on the programming idea.

---

## 10.6 Hint formatting

Hints are React nodes inside an array.

Use JSX when a hint contains inline code:

```mdx
hints={[
  <>Use <code>const</code> when the variable should not be reassigned.</>,
  <>Keep <code>let</code> for values that will change.</>,
]}
```

Do **not** write HTML or Markdown syntax inside a JavaScript string:

```mdx
// Wrong: this is only a string. The <code> tag will not become markup.
hints={[
  "Use <code>const</code> for fixed values.",
]}
```

Likewise, backticks inside a normal hint string are just backtick characters. Prefer JSX and `<code>` when code formatting matters.

---

# 11. Solutions

Use the `solution` prop for the canonical working implementation.

```mdx
solution={
  <pre className="m-0 whitespace-pre-wrap">{`const firstBook = books[0];`}</pre>
}
```

A canonical solution should be:

- correct,
- simple,
- consistent with the syntax taught,
- free from clever shortcuts,
- easy to compare against the learner's work.

Do not introduce a new technique in the solution that the learner has not been taught.

If several solutions are valid, show the one that best reinforces the chapter's current mental model.

The prop is called `solution`, not `answers`. We are showing a canonical implementation, not implying that programming problems always have one magical answer.

---

# 12. HandbookChallenge UX Rules

The component's visual design encodes the teaching model.

Authors should not recreate these regions manually.

The component itself provides:

- the fixed **YOUR TURN** eyebrow,
- the large task title,
- the task body,
- an optional **EXPECTED RESULT** surface,
- progressively revealed hints,
- a separate **VIEW SOLUTION** action.

Hints and solutions are intentionally not peer tabs. Hints are scaffolding. The solution is the fallback/reference after scaffolding is not enough.

Do not add your own `Hints`, `Answers`, `Expected output`, or `Challenge` headings inside the body when the component already has a prop or built-in surface for that information.

---

# 13. PracticeCard vs HandbookChallenge

Use the components for different jobs.

## `<PracticeCard>`

Use for:

- recall,
- identification,
- prediction,
- conceptual checks,
- quick "what do you notice?" questions.

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

# 14. Checkpoints and Cumulative State

Checkpoints help learners know what their working file should look like before continuing.

They also make later lessons less fragile.

Use a checkpoint when later work depends on specific earlier state.

A learner should not fail the next lesson because they missed an unrelated line several sections ago.

Example:

```mdx
<Callout type="note" title="Checkpoint">
  <p className="m-0">Your file should now contain three book objects.</p>
  <pre className="m-0 whitespace-pre-wrap">{`const book1 = ...;
const book2 = ...;
const book3 = ...;`}</pre>
</Callout>
```

A checkpoint confirms or restores state. A challenge asks the learner to perform new practice. Do not use them interchangeably.

---

# 15. Tone and Voice

The handbook should sound like a capable instructor sitting beside the learner.

## 15.1 Be conversational without becoming vague

Prefer concrete explanations over formal definitions at the moment a concept is first introduced.

## 15.2 Respect the learner

Avoid:

- "Obviously..."
- "Simply..."
- unnecessary "Just..."
- "This is easy."
- "You should already know..."

## 15.3 Humor should be brief and nonessential

Humor can give the handbook personality, but the instructional path must remain clear without the joke.

## 15.4 Prefer concrete verbs

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

# 16. Markdown and JSX

Use the simplest authoring form that correctly expresses the content.

## 16.1 Prefer Markdown for normal instructional content

Use Markdown for headings, paragraphs, emphasis, lists, inline code, links, code fences, tables, and horizontal rules.

## 16.2 Use JSX for handbook components

Use JSX when invoking custom UI such as:

- `<Callout>`
- `<HandbookChallenge>`
- `<PracticeCard>`

Inside those components, JSX elements are useful for precise structure and code formatting.

---

## 16.3 Multiline code inside props

Use a template literal inside a JSX expression:

```mdx
<pre className="m-0 whitespace-pre-wrap">{`const name = "Nick";
console.log(name);`}</pre>
```

If the displayed code contains template-literal backticks or `${...}`, escape those characters so the authoring-time template literal does not evaluate them.

Example:

```mdx
<pre className="m-0 whitespace-pre-wrap">{`const greeting = \`Hello, \${name}!\`;`}</pre>
```

---

## 16.4 JSX elements inside arrays need keys only when React needs them

The preferred hints are fragments containing prose and inline code:

```mdx
hints={[
  <>Array indexes start at <code>0</code>.</>,
  <>Use square brackets after the array name.</>,
]}
```

If you intentionally place a standalone element such as `<pre>` in an array, give it a stable `key`.

In normal challenge authoring, a task-specific code block should be in `solution`, not in `hints`.

---

# 17. Callouts

Callouts should carry meaning. They are not decorative boxes.

## `type="note"`

Use for context, starting state, checkpoints, clarification, or useful background.

## `type="tip"`

Use for an important mental model, useful insight, or a "why this works" explanation.

## `type="caution"` or `type="danger"`

Use for a common mistake, misleading similarity, conceptual trap, or behavior that deserves unusually high attention.

Do not choose a callout type because its color looks good.

---

# 18. Horizontal Rules and Visual Pacing

Use `---` to mark a genuine lesson boundary.

Do not usually place a horizontal rule between a concept and the challenge that practices it. They belong to the same instructional beat.

A common unit is:

1. heading,
2. explanation,
3. example,
4. challenge,
5. `---`,
6. next concept.

The challenge component already has strong visual separation. Do not surround every challenge with extra spacing hacks or decorative rules.

---

# 19. Technical Vocabulary

When a chapter introduces important technical terms, include a **Technical Vocabulary** section near the end of the instructional material.

Technical Vocabulary is a **reference and reinforcement tool**, not the place where terminology is first taught.

Follow the handbook's normal sequence:

1. show the behavior,
2. explain it plainly,
3. let the learner use it,
4. give the technical name,
5. collect the important terms in the vocabulary table.

Use the standard three-column table:

| Term | Plain-English meaning | Tiny example |
| --- | --- | --- |
| property | A named piece of data stored on an object | `book.title` |
| index | The numbered position of an item in an array | `books[0]` |
| method | A function attached to a value or object that you call with parentheses | `name.trim()` |

Include terms that learners will need to recognize and use later. Do not turn the table into a glossary of every word that appeared on the page.

Definitions should be:

- short,
- written in plain English,
- specific enough to distinguish the term from related ideas,
- consistent with how the chapter explained the concept.

The **Tiny example** should make the term concrete whenever possible. Prefer actual syntax, values, output, or a very small programming situation over another abstract definition.

Avoid circular definitions.

---

# 20. Editing an Existing Chapter

When revising an existing chapter, work in this order.

## Step 1: Identify the learning target

Write one sentence:

> By the end of this chapter, the learner can ______.

## Step 2: Find the problem that makes the skill useful

Ask why a beginner would want this tool right now.

## Step 3: Audit prerequisite knowledge

Mark syntax as:

- already known,
- being taught now,
- unnecessary novelty.

## Step 4: Break the lesson into beats

Aim for:

> explanation → example → practice

## Step 5: Audit every challenge

For each `<HandbookChallenge>`, ask:

- Is the title a short action rather than a number or label?
- Is the task completely understandable without opening a hint?
- Is there one primary skill?
- Is failure diagnosable?
- Are hints actual nudges rather than instructions or solutions?
- Does each hint get progressively more specific?
- Would any hint fail the paste test?
- Is the expected result observable without exposing implementation?
- Does the solution use only syntax already taught?

## Step 6: Audit MDX structure

Check frontmatter, heading hierarchy, callout semantics, Markdown vs JSX, challenge props, and escaping.

## Step 7: Tighten language

Remove repeated explanation, filler, unnecessary jargon, and instructions hidden in long paragraphs.

---

# 21. Challenge Migration Rules

When converting an older challenge to the current contract:

1. Remove challenge numbers, standard IDs, and `Challenge` from the title.
2. Rewrite the title as a short programming action.
3. Move all required instructions out of hints and into the body.
4. Convert hint strings that need code formatting into JSX nodes.
5. Delete hints that only restate the prompt.
6. Rewrite solution-like hints as conceptual or syntactic nudges.
7. Move exact task code out of hints and into `solution`.
8. Rename `answers` to `solution`.
9. Move expected output/results out of the body and into `expected`.
10. Read the full challenge sequence to ensure support decreases and independence grows.

Do not perform a purely mechanical `answers` → `solution` rename and call the migration complete. The content contract matters more than the prop name.

---

# 22. Authoring Checklist

Before considering a chapter complete, verify the following.

## Learning target

- [ ] Can I state the primary learning target in one sentence?
- [ ] Does the chapter stay focused on that target?
- [ ] Are prerequisites already taught?

## Pacing

- [ ] Is new material introduced in small steps?
- [ ] Does practice occur soon after instruction?
- [ ] Does the worked example model the same kind of thinking without giving away the challenge?
- [ ] Does each challenge have one primary new target?
- [ ] Does difficulty increase through independence rather than random complexity?

## Technical vocabulary

- [ ] Are important new technical terms collected near the end of the chapter?
- [ ] Were those terms taught in context before appearing in the vocabulary table?
- [ ] Are definitions short, plain-English, and non-circular?
- [ ] Does each tiny example make the term more concrete?

## Challenge titles

- [ ] Is every title a short, active description of the coding task?
- [ ] Have I removed challenge numbers, standard IDs, and generic labels?
- [ ] Would the title still make sense outside the story wrapper?

## Challenge body

- [ ] Can a prepared learner complete the task without opening a hint?
- [ ] Are required names, constraints, and starting state stated in the body?
- [ ] Is the body short enough to scan before coding?

## Expected result

- [ ] Is an expected result included when success would otherwise be ambiguous?
- [ ] Does it show the outcome without revealing the implementation?

## Hints

- [ ] Are there no more than three normal hints?
- [ ] Does each hint answer "what should I think about next?"
- [ ] Do hints progress from recall to direction to syntax cue?
- [ ] Have I removed task-completing code from hints?
- [ ] Does every hint pass the paste test?
- [ ] Are inline code terms represented with JSX `<code>` elements rather than markup inside strings?

## Solution

- [ ] Is there one simple canonical solution?
- [ ] Does it use only taught syntax?
- [ ] Does it avoid clever shortcuts that obscure the lesson?

## Cumulative state

- [ ] If later work depends on earlier code, is there a checkpoint?
- [ ] Can a learner recover if their working file drifted?

## Tone and MDX

- [ ] Does the writing respect beginners?
- [ ] Is ordinary prose written in Markdown?
- [ ] Is JSX used where it provides structure or formatting?
- [ ] Are callout types chosen semantically?
- [ ] Are quotes, backticks, and `${...}` escaped for the syntax layer that owns them?

---

# 23. The Short Version

When in doubt, write the chapter according to this rule:

> **Make the learner feel a real problem, give them one new tool that solves it, show the smallest useful version of that tool, let them use it immediately, then build the next need from what they now understand.**

And write every challenge according to this rule:

> **Tell the learner exactly what to do, show what success looks like when needed, offer hints that nudge without solving, and keep the canonical solution behind the final reveal.**

That combination is the core of the JavaScript Gym handbook style.
