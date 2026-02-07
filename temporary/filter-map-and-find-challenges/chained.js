// Challenges — Chaining filter/map/find
export const chainedChallenges = [
  {
    id: 'CHAIN1',
    title: 'Code: filter then map doubles',
    type: 'code',
    topic: 'chained',
    difficulty: '★',
    prompt: 'Set ctx.out to the even numbers doubled.',
    snippet: `const nums = [1,2,3,4];\n// Your code sets ctx.out to [4,8]` ,
    setup: `const nums = [1,2,3,4];` ,
    context: { out: null },
    verify: (ctx) => Array.isArray(ctx.out) && ctx.out.length===2 && ctx.out[0]===4 && ctx.out[1]===8,
    hints: [
      'Filter evens -> [2,4]',
      'Map *2 -> [4,8]',
      'Return that array'
    ]
  },
  {
    id: 'CHAIN2',
    title: 'Code: map then filter by length',
    type: 'code',
    topic: 'chained',
    difficulty: '★',
    prompt: 'Set ctx.out to the uppercase words longer than 2 chars.',
    snippet: `const words = ['hi','code','map'];\n// Your code sets ctx.out to ['CODE','MAP']`,
    setup: `const words = ['hi','code','map'];`,
    context: { out: null },
    verify: (ctx) => Array.isArray(ctx.out) && ctx.out[0]==='CODE' && ctx.out[1]==='MAP' && ctx.out.length===2,
    hints: [
      'map -> ["HI","CODE","MAP"]',
      'Filter length > 2 removes HI',
      'Remaining two values'
    ]
  },
  {
    id: 'CHAIN3',
    title: 'Code: filter then find by age',
    type: 'code',
    topic: 'chained',
    difficulty: '★★',
    prompt: 'Filter people age > 20 then find first age > 40. Store name in ctx.name.',
    snippet: `const people = [\n  { name: 'Ada', age: 30 },\n  { name: 'Lin', age: 19 },\n  { name: 'Edsger', age: 45 }\n];\n// Your code sets ctx.name = 'Edsger'`,
    setup: `const people = [{ name: 'Ada', age: 30 },{ name: 'Lin', age: 19 },{ name: 'Edsger', age: 45 }];`,
    context: { name: null },
    verify: (ctx) => ctx.name === 'Edsger',
    hints: [
      'Filter age>20 removes only Lin? Actually Lin is 19',
      'Filtered list: Ada(30), Edsger(45)',
      'find picks first with age>40: Edsger'
    ]
  },
  {
    id: 'CHAIN4',
    title: 'Code: show chain order difference',
    type: 'code',
    topic: 'chained',
    difficulty: '★★',
    prompt: 'Produce ctx.a = [9] and ctx.b = [4,6] demonstrating order difference.',
    snippet: `const nums = [3,5,8];\n// Your code sets ctx.a and ctx.b`,
    setup: `const nums = [3,5,8];`,
    context: { a: null, b: null },
    verify: (ctx) => Array.isArray(ctx.a) && ctx.a.length===1 && ctx.a[0]===9 && Array.isArray(ctx.b) && ctx.b.length===2 && ctx.b[0]===4 && ctx.b[1]===6,
    hints: [
      'Path a: filter evens -> [8] then +1 -> [9]',
      'Path b: map +1 -> [4,6,9], filter evens -> [4,6]',
      'Return both arrays in one line'
    ]
  },
  {
    id: 'CHAIN5',
    title: 'Three-step chain',
    type: 'value',
    topic: 'chained',
    difficulty: '★★★',
    prompt: 'What is logged to the console?',
    snippet: `const nums = [2,3,4,5,6];\nconst out = nums\n  .filter(n => n % 2 === 0)    // evens
  .map(n => n * n)             // squares
  .find(n => n > 20);          // first square > 20\nconsole.log(out);`,
    expected: 36,
    hints: [
      'Evens: [2,4,6]',
      'Squares: [4,16,36]',
      'First >20 is 36'
    ]
  },
  {
    id: 'CHAIN6',
    title: 'Find result may be undefined',
    type: 'value',
    topic: 'chained',
    difficulty: '★★',
    prompt: 'What is logged to the console?',
    snippet: `const nums = [1,2,3];\nconst result = nums.filter(n => n > 2).map(n => n * 10).find(n => n < 20);\nconsole.log(result);`,
    expected: undefined,
    hints: [
      'filter n>2 -> [3]',
      'map *10 -> [30]',
      'find n<20 finds none -> undefined'
    ]
  }
  ,
  {
    id: 'CHAIN_CODE1',
    title: 'Chain filter → map → find (code)',
    type: 'code',
    topic: 'chained',
    difficulty: '★★★',
    prompt: 'Use one chain on nums to set ctx.value to the first squared even > 50.',
    snippet: `const nums=[4,5,6,7,8];\n// Your code: ctx.value should be 64 (8^2)`,
    setup: `const nums=[4,5,6,7,8];`,
    context: { value: null },
    verify: (ctx) => ctx.value === 64,
    hints: [
      'filter evens',
      'map square',
      'find first > 50'
    ]
  },
  {
    id: 'CHAIN_CODE2',
    title: 'Two chains comparison',
    type: 'code',
    topic: 'chained',
    difficulty: '★★★',
    prompt: 'Create ctx.a = first even square > 30 using chaining; ctx.b = same using separate variables.',
    snippet: `const nums=[3,4,5,6];\n// Your code sets ctx.a and ctx.b both to 36`,
    setup: `const nums=[3,4,5,6];`,
    context: { a: null, b: null },
    verify: (ctx) => ctx.a === 36 && ctx.b === 36,
    hints: [
      'Chained: nums.filter(...).map(...).find(...)',
      'Separate: temp1 = nums.filter(...); etc.',
      'Assign both results'
    ]
  }
  ,
  // Added value chain challenges CHAIN7-14
  {
    id: 'CHAIN7',
    title: 'Filter then map lengths',
    type: 'value',
    topic: 'chained',
    difficulty: '★',
    prompt: 'What is logged to the console?',
    snippet: `const words=['a','tool','map'];\nconst lens = words.filter(w=>w.length>1).map(w=>w.length);\nconsole.log(lens);`,
    expected: [4,3],
    hints: [
      'Filter length>1 -> tool,map',
      'Map to lengths 4,3',
      '[4,3]'
    ]
  },
  {
    id: 'CHAIN8',
    title: 'Map then filter even squares',
    type: 'value',
    topic: 'chained',
    difficulty: '★',
    prompt: 'What is logged to the console?',
    snippet: `const nums=[1,2,3];\nconst out = nums.map(n=>n*n).filter(n=>n%2===0);\nconsole.log(out);`,
    expected: [4],
    hints: [
      'Squares [1,4,9]',
      'Even only 4',
      '[4]'
    ]
  },
  {
    id: 'CHAIN9',
    title: 'Filter then find string',
    type: 'value',
    topic: 'chained',
    difficulty: '★★',
    prompt: 'What is logged to the console?',
    snippet: `const words=['alpha','beta','gamma'];\nconst r = words.filter(w=>w.includes('a')).find(w=>w.startsWith('b'));\nconsole.log(r);`,
    expected: 'beta',
    hints: [
      'Filter keeps all (all have a)',
      'find startsWith b -> beta',
      'beta'
    ]
  },
  {
    id: 'CHAIN10',
    title: 'Map uppercase then find length>4',
    type: 'value',
    topic: 'chained',
    difficulty: '★★',
    prompt: 'What is logged to the console?',
    snippet: `const words=['hi','there','sun'];\nconst first = words.map(w=>w.toUpperCase()).find(w=>w.length>4);\nconsole.log(first);`,
    expected: 'THERE',
    hints: [
      'Uppercase -> HI,THERE,SUN',
      'First length>4 is THERE',
      'Logs THERE'
    ]
  },
  {
    id: 'CHAIN11',
    title: 'Two-step reordering difference',
    type: 'value',
    topic: 'chained',
    difficulty: '★★',
    prompt: 'What is logged to the console?',
    snippet: `const nums=[1,2,3,4];\nconst a = nums.filter(n=>n%2===0).map(n=>n*3);\nconst b = nums.map(n=>n*3).filter(n=>n%2===0);\nconsole.log(a,b);`,
    expected: [[6,12],[6,12]],
    hints: [
      'Both produce same in this case',
      'Evens 2,4 *3 -> 6,12',
      'map then filter also 6,12'
    ]
  },
  {
    id: 'CHAIN12',
    title: 'Chained skip with index',
    type: 'value',
    topic: 'chained',
    difficulty: '★★',
    prompt: 'What is logged to the console?',
    snippet: `const letters=['a','b','c','d'];\nconst out = letters.filter((_,i)=>i>1).map(ch=>ch.toUpperCase());\nconsole.log(out);`,
    expected: ['C','D'],
    hints: [
      'i>1 keeps c,d',
      'Uppercase -> C,D',
      '["C","D"]'
    ]
  },
  {
    id: 'CHAIN13',
    title: 'Filter after map transformation',
    type: 'value',
    topic: 'chained',
    difficulty: '★★★',
    prompt: 'What is logged to the console?',
    snippet: `const nums=[2,3,5];\nconst out = nums.map(n=>n*n).filter(n=>n>10);\nconsole.log(out);`,
    expected: [25],
    hints: [
      'Squares [4,9,25]',
      'Filter >10 -> 25',
      '[25]'
    ]
  },
  {
    id: 'CHAIN14',
    title: 'Triple chain with undefined result',
    type: 'value',
    topic: 'chained',
    difficulty: '★★★',
    prompt: 'What is logged to the console?',
    snippet: `const nums=[1,2];\nconst res = nums.filter(n=>n>2).map(n=>n*n).find(n=>n>0);\nconsole.log(res);`,
    expected: undefined,
    hints: [
      'filter n>2 -> []',
      'map on [] -> []',
      'find returns undefined'
    ]
  },
  // Added code chain challenges CHAIN_CODE3 - CHAIN_CODE6
  {
    id: 'CHAIN_CODE3',
    title: 'Code: chain to build object',
    type: 'code',
    topic: 'chained',
    difficulty: '★★',
    prompt: 'Filter numbers >2, map to {v:n}, find first with v>4; set ctx.out to that object.',
    snippet: `const nums=[1,2,3,5];\n// Your code sets ctx.out = {v:5}`,
    setup: `const nums=[1,2,3,5];`,
    context: { out: null },
    verify: (ctx) => ctx.out && ctx.out.v === 5,
    hints: [
      'filter >2 -> [3,5]',
      'map to objects',
      'find v>4 gives {v:5}'
    ]
  },
  {
    id: 'CHAIN_CODE4',
    title: 'Code: branch after chain',
    type: 'code',
    topic: 'chained',
    difficulty: '★★★',
    prompt: 'Chain to get first even >10 squared else -1; store in ctx.val.',
    snippet: `const nums=[3,4,5,6];\n// Your code sets ctx.val = -1` ,
    setup: `const nums=[3,4,5,6];`,
    context: { val: null },
    verify: (ctx) => ctx.val === -1,
    hints: [
      'Evens >10 none',
      'Result should be -1',
      'Use fallback'
    ]
  },
  {
    id: 'CHAIN_CODE5',
    title: 'Code: chain with intermediate reuse',
    type: 'code',
    topic: 'chained',
    difficulty: '★★',
    prompt: 'Store ctx.filtered length (numbers>5) AND ctx.first = first square >50 in one chain expression (can compute twice).',
    snippet: `const nums=[4,6,8,10];\n// Your code sets ctx.filtered=3 and ctx.first=64`,
    setup: `const nums=[4,6,8,10];`,
    context: { filtered: null, first: null },
    verify: (ctx) => ctx.filtered === 3 && ctx.first === 64,
    hints: [
      'numbers>5 -> [6,8,10]',
      'Squares -> 36,64,100',
      'First >50 is 64'
    ]
  },
  {
    id: 'CHAIN_CODE6',
    title: 'Code: manual chain (no built-ins)',
    type: 'code',
    topic: 'chained',
    difficulty: '★★★',
    prompt: 'Without using filter/map/find build ctx.out = first even*even > 20.',
    snippet: `const nums=[2,3,5,6];\n// Your code sets ctx.out = 36`,
    setup: `const nums=[2,3,5,6];`,
    context: { out: null },
    verify: (ctx) => ctx.out === 36,
    hints: [
      'Loop accumulate evens',
      'Square and check',
      'Break when >20'
    ]
  }
];
