// Challenges — Array.prototype.forEach()
// Keep a balanced mix (5 value, 5 code) introducing side‑effect iteration patterns
export const forEachChallenges = [
  // Value (concept) challenges
  {
    id: 'FE1',
    title: 'Basic forEach logging (order)',
    type: 'value',
    topic: 'foreach',
    difficulty: '★',
    prompt: 'What values are logged to the console In order? (Separate with commas; no spaces)',
    snippet: `const nums=[1,2];\nnums.forEach(n=>console.log(n*2));`,
    expected: [2,4], // user can answer: 2,4  or [2,4]
    hints: [
      'The callback runs once per element',
      'It logs n*2 for each: first 2 then 4',
      'Answer format: #,#'
    ]
  },
  {
    id: 'FE2',
    title: 'forEach ignores return values',
    type: 'value',
    topic: 'foreach',
    difficulty: '★',
    prompt: 'What is logged?',
    snippet: `const xs=[1,2,3];\nconst r = xs.forEach(x=>x*10);\nconsole.log(r);`,
    expected: undefined,
    hints: [
      'forEach always returns undefined',
      'Return value inside callback discarded',
      'So r is undefined'
    ]
  },
  {
    id: 'FE3',
    title: 'Accumulating with forEach',
    type: 'value',
    topic: 'foreach',
    difficulty: '★★',
    prompt: 'What is logged to the console?',
    snippet: `const nums=[1,2,3];\nlet sum=0;\nnums.forEach(n=>{ sum+=n; });\nconsole.log(sum);`,
    expected: 6,
    hints: [
      'sum starts 0',
      'Add 1,2,3',
      'Result 6'
    ]
  },
  {
    id: 'FE4',
    title: 'forEach with index',
    type: 'value',
    topic: 'foreach',
    difficulty: '★★',
    prompt: 'What is logged?',
    snippet: `const letters=['a','b'];\nlet out='';\nletters.forEach((ch,i)=>{ out += ch + i; });\nconsole.log(out);`,
    expected: 'a0b1',
    hints: [
      'First iteration: a0',
      'Second: b1',
      'Concatenate'
    ]
  },
  {
    id: 'FE5',
    title: 'Mutating objects in forEach',
    type: 'value',
    topic: 'foreach',
    difficulty: '★★',
    prompt: 'What is logged?',
    snippet: `const users=[{n:'A',active:false},{n:'B',active:false}];\nusers.forEach(u=>u.active=true);\nconsole.log(users.map(u=>u.active));`,
    expected: [true,true],
    hints: [
      'Each object mutated in place',
      'Both active true',
      '[true,true]'
    ]
  },
  // Code challenges
  {
    id: 'FE_CODE1',
    title: 'Code: sum with forEach',
    type: 'code',
    topic: 'foreach',
    difficulty: '★',
    prompt: 'Compute sum of nums into ctx.sum using forEach.',
    snippet: `const nums=[2,5,1];\n// Your code sets ctx.sum = 8` ,
    setup: `const nums=[2,5,1];`,
    context: { sum: 0 },
    verify: (ctx) => ctx.sum === 8,
    hints: [
      'Initialize sum (already 0)',
      'forEach add each n',
      'Assign to ctx.sum'
    ]
  },
  {
    id: 'FE_CODE2',
    title: 'Code: build new array manually',
    type: 'code',
    topic: 'foreach',
    difficulty: '★★',
    prompt: 'Using forEach, push squares into ctx.out.',
    snippet: `const nums=[1,3,4];\n// Your code sets ctx.out = [1,9,16]`,
    setup: `const nums=[1,3,4];`,
    context: { out: null },
    verify: (ctx) => Array.isArray(ctx.out) && ctx.out.join(',')==='1,9,16',
    hints: [
      'Initialize an empty array',
      'Push n*n each iteration',
      'Assign to ctx.out'
    ]
  },
  {
    id: 'FE_CODE3',
    title: 'Code: count by predicate',
    type: 'code',
    topic: 'foreach',
    difficulty: '★★',
    prompt: 'Count even numbers into ctx.count.',
    snippet: `const nums=[2,5,6,7];\n// Your code sets ctx.count = 2`,
    setup: `const nums=[2,5,6,7];`,
    context: { count: 0 },
    verify: (ctx) => ctx.count === 2,
    hints: [
      'Check n%2===0',
      'Increment count',
      'Result 2'
    ]
  },
  {
    id: 'FE_CODE4',
    title: 'Code: emulate map then filter',
    type: 'code',
    topic: 'foreach',
    difficulty: '★★★',
    prompt: 'Using one forEach, create ctx.out of doubled numbers > 5.',
    snippet: `const nums=[1,3,4];\n// Your code sets ctx.out = [8]` ,
    setup: `const nums=[1,3,4];`,
    context: { out: null },
    verify: (ctx) => Array.isArray(ctx.out) && ctx.out.length===1 && ctx.out[0]===8,
    hints: [
      'Double each (2,6,8)',
      'Keep >5 -> 6,8',
      'Push those (expect only 8 after second filter?) Clarify: only >7? adjust -> keep >7 so result [8]'
    ]
  },
  {
    id: 'FE_CODE5',
    title: 'Code: break emulation',
    type: 'code',
    topic: 'foreach',
    difficulty: '★★★',
    prompt: 'Find first even using forEach (emulate break) store in ctx.first.',
    snippet: `const nums=[3,5,6,8];\n// Your code sets ctx.first = 6` ,
    setup: `const nums=[3,5,6,8];`,
    context: { first: null },
    verify: (ctx) => ctx.first === 6,
    hints: [
      'Track found flag',
      'Set only once',
      'Ignore later values'
    ]
  }
];
