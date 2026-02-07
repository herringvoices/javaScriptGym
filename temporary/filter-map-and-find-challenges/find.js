// Challenges — Array.prototype.find()
export const findChallenges = [
  {
    id: 'FIND1',
    title: 'Find first even',
    type: 'value',
    topic: 'find',
    difficulty: '★',
    prompt: 'What is logged to the console?',
    snippet: `const nums = [1,3,4,6];\nconst firstEven = nums.find(n => n % 2 === 0);\nconsole.log(firstEven);`,
    expected: 4,
    hints: [
      'find returns the first matching element',
      '4 is the first even',
      'So it logs 4'
    ]
  },
  {
    id: 'FIND2',
    title: 'Find by object property',
    type: 'value',
    topic: 'find',
    difficulty: '★',
    prompt: 'What is logged to the console?',
    snippet: `const users = [\n  { id: 1, name: 'A' },\n  { id: 2, name: 'B' }\n];\nconst u = users.find(x => x.id === 2);\nconsole.log(u.name);`,
    expected: 'B',
    hints: [
      'find returns object where id===2',
      'That object has name B',
      'Log its name'
    ]
  },
  {
    id: 'FIND3',
    title: 'Find returns undefined when none',
    type: 'value',
    topic: 'find',
    difficulty: '★',
    prompt: 'What is logged to the console?',
    snippet: `const xs = [1,3,5];\nconst even = xs.find(n => n % 2 === 0);\nconsole.log(even);`,
    expected: undefined,
    hints: [
      'No element matches predicate',
      'find returns undefined',
      'So undefined is logged'
    ]
  },
  {
    id: 'FIND4',
    title: 'Find with index parameter (skip first)',
    type: 'value',
    topic: 'find',
    difficulty: '★★',
    prompt: 'What is logged to the console?',
    snippet: `const letters = ['a','b','c'];\nconst r = letters.find((ch,i) => i > 0 && ch === 'c');\nconsole.log(r);`,
    expected: 'c',
    hints: [
      'Predicate only true when index > 0 and letter c',
      'c is at index 2 meeting both',
      'Result is c'
    ]
  },
  {
    id: 'FIND5',
    title: 'Code: compound condition find',
    type: 'code',
    topic: 'find',
    difficulty: '★★',
    prompt: 'Set ctx.itemName to the name of first product with price >5 and <20.',
    snippet: `const products = [\n  { name: 'pen', price: 2 },\n  { name: 'book', price: 12 },\n  { name: 'bag', price: 30 }\n];\n// Your code sets ctx.itemName = 'book'`,
    setup: `const products = [{ name:'pen', price:2 },{ name:'book', price:12 },{ name:'bag', price:30 }];`,
    context: { itemName: null },
    verify: (ctx) => ctx.itemName === 'book',
    hints: [
      'Check each price',
      'First meeting >5 & <20 is book (12)',
      'Assign its name to ctx.itemName'
    ]
  },
  {
    id: 'FIND6',
    title: 'Code: find first admin name',
    type: 'code',
    topic: 'find',
    difficulty: '★★',
    prompt: 'Using find, set ctx.firstAdmin to the first admin user name.',
    snippet: `const users = [{ name:'Ada', admin:false },{ name:'Lin', admin:true },{ name:'Edsger', admin:true }];\n// Your code sets ctx.firstAdmin = 'Lin'`,
    setup: `const users = [{ name:'Ada', admin:false },{ name:'Lin', admin:true },{ name:'Edsger', admin:true }];`,
    context: { firstAdmin: null },
    verify: (ctx) => ctx.firstAdmin === 'Lin',
    hints: [
      'find stops at first true',
      'Ada admin false, Lin admin true -> stop',
      'Assign its name to ctx.firstAdmin'
    ]
  }
  ,
  {
    id: 'FIND_CODE1',
    title: 'Write a find predicate',
    type: 'code',
    topic: 'find',
    difficulty: '★★',
    prompt: 'Set ctx.admin to the first admin user name or null if none.',
    snippet: `const users=[{name:'Ada',admin:false},{name:'Lin',admin:true},{name:'Edsger',admin:true}];\n// Your code: ctx.admin should become 'Lin'`,
    setup: `const users=[{name:'Ada',admin:false},{name:'Lin',admin:true},{name:'Edsger',admin:true}];`,
    context: { admin: null },
    verify: (ctx) => ctx.admin === 'Lin',
    hints: [
      'Use users.find(u => u.admin)',
      'Then read its name',
      'Assign to ctx.admin'
    ]
  },
  {
    id: 'FIND_CODE2',
    title: 'Find with fallback',
    type: 'code',
    topic: 'find',
    difficulty: '★★★',
    prompt: 'If no item price > 50, set ctx.price to -1 else that price.',
    snippet: `const items=[{price:10},{price:55},{price:30}];\n// Your code: ctx.price => 55`,
    setup: `const items=[{price:10},{price:55},{price:30}];`,
    context: { price: 0 },
    verify: (ctx) => ctx.price === 55,
    hints: [
      'Use items.find(i => i.price > 50)',
      'Check result; if missing set -1',
      'Else assign found price'
    ]
  }
  ,
  // Added value find challenges FIND7-12
  {
    id: 'FIND7',
    title: 'Find first negative',
    type: 'value',
    topic: 'find',
    difficulty: '★',
    prompt: 'What is logged to the console?',
    snippet: `const nums=[3,-1,5];\nconst firstNeg = nums.find(n=>n<0);\nconsole.log(firstNeg);`,
    expected: -1,
    hints: [
      'Predicate n<0',
      'First negative -1',
      'Logs -1'
    ]
  },
  {
    id: 'FIND8',
    title: 'Find object by nested prop',
    type: 'value',
    topic: 'find',
    difficulty: '★★',
    prompt: 'What is logged to the console?',
    snippet: `const data=[{meta:{id:1}},{meta:{id:2}}];\nconst r = data.find(d=>d.meta.id===2);\nconsole.log(r.meta.id);`,
    expected: 2,
    hints: [
      'Check meta.id',
      'Object with id 2',
      'Log 2'
    ]
  },
  {
    id: 'FIND9',
    title: 'Find returns undefined if missing (confirm)',
    type: 'value',
    topic: 'find',
    difficulty: '★',
    prompt: 'What is logged to the console?',
    snippet: `const xs=[2,4];\nconst odd = xs.find(n=>n%2===1);\nconsole.log(odd===undefined);`,
    expected: true,
    hints: [
      'No odd numbers',
      'odd is undefined',
      'undefined === undefined -> true'
    ]
  },
  {
    id: 'FIND10',
    title: 'Find last? (first match only)',
    type: 'value',
    topic: 'find',
    difficulty: '★★',
    prompt: 'What is logged to the console?',
    snippet: `const nums=[5,7,7,9];\nconst found = nums.find(n=>n===7);\nconsole.log(found);`,
    expected: 7,
    hints: [
      'find stops at first 7',
      'Ignores later 7',
      'Logs 7'
    ]
  },
  {
    id: 'FIND11',
    title: 'Find with index condition',
    type: 'value',
    topic: 'find',
    difficulty: '★★',
    prompt: 'What is logged to the console?',
    snippet: `const letters=['a','b','c'];\nconst r = letters.find((ch,i)=> i>0 && ch==='b');\nconsole.log(r);`,
    expected: 'b',
    hints: [
      'Check i>0 eliminates a',
      "Then ch==='b' true",
      'Result b'
    ]
  },
  {
    id: 'FIND12',
    title: 'Find after mapping (inefficient pattern)',
    type: 'value',
    topic: 'find',
    difficulty: '★★★',
    prompt: 'What is logged to the console?',
    snippet: `const nums=[2,3,4];\nconst doubled = nums.map(n=>n*2);\nconst firstOver5 = doubled.find(n=>n>5);\nconsole.log(firstOver5);`,
    expected: 6,
    hints: [
      'doubled -> [4,6,8]',
      'First >5 is 6',
      'Logs 6'
    ]
  },
  // Added code find challenges FIND_CODE3 - FIND_CODE8
  {
    id: 'FIND_CODE3',
    title: 'Code: find user by role',
    type: 'code',
    topic: 'find',
    difficulty: '★★',
    prompt: 'Set ctx.name to name of first user with role "mod".',
    snippet: `const users=[{name:'A',role:'user'},{name:'B',role:'mod'},{name:'C',role:'mod'}];\n// Your code sets ctx.name = 'B'`,
    setup: `const users=[{name:'A',role:'user'},{name:'B',role:'mod'},{name:'C',role:'mod'}];`,
    context: { name: null },
    verify: (ctx) => ctx.name === 'B',
    hints: [
      'Use users.find(u=>u.role==="mod")',
      'Then its name',
      'Assign'
    ]
  },
  {
    id: 'FIND_CODE4',
    title: 'Code: find price or fallback',
    type: 'code',
    topic: 'find',
    difficulty: '★★',
    prompt: 'Set ctx.cost to first price > 20 else -1.',
    snippet: `const prices=[5,12,25,30];\n// Your code sets ctx.cost = 25` ,
    setup: `const prices=[5,12,25,30];`,
    context: { cost: null },
    verify: (ctx) => ctx.cost === 25,
    hints: [
      'find(p=>p>20)',
      'Check result',
      'Assign number'
    ]
  },
  {
    id: 'FIND_CODE5',
    title: 'Code: find index manually',
    type: 'code',
    topic: 'find',
    difficulty: '★★★',
    prompt: 'Without using find, set ctx.val to first even number.',
    snippet: `const nums=[3,5,6,8];\n// Your code sets ctx.val = 6`,
    setup: `const nums=[3,5,6,8];`,
    context: { val: null },
    verify: (ctx) => ctx.val === 6,
    hints: [
      'Loop and break',
      'Check n%2===0',
      'Assign when found'
    ]
  },
  {
    id: 'FIND_CODE6',
    title: 'Code: find object after filter (two-step)',
    type: 'code',
    topic: 'find',
    difficulty: '★★',
    prompt: 'Filter active then find name starting with L; set ctx.name.',
    snippet: `const users=[{name:'Ada',active:true},{name:'Lin',active:true},{name:'Edsger',active:false}];\n// Your code sets ctx.name = 'Lin'`,
    setup: `const users=[{name:'Ada',active:true},{name:'Lin',active:true},{name:'Edsger',active:false}];`,
    context: { name: null },
    verify: (ctx) => ctx.name === 'Lin',
    hints: [
      'First filter active',
      'Then find starting with L',
      'Assign'
    ]
  },
  {
    id: 'FIND_CODE7',
    title: 'Code: safe access with optional chaining',
    type: 'code',
    topic: 'find',
    difficulty: '★★',
    prompt: 'Set ctx.id to meta.id of first item with meta.id>10 else -1.',
    snippet: `const arr=[{meta:{id:5}},{meta:{id:12}},{meta:{id:3}}];\n// Your code sets ctx.id = 12`,
    setup: `const arr=[{meta:{id:5}},{meta:{id:12}},{meta:{id:3}}];`,
    context: { id: null },
    verify: (ctx) => ctx.id === 12,
    hints: [
      'find(i=>i.meta.id>10)',
      'Then read .meta.id',
      'Assign'
    ]
  },
  {
    id: 'FIND_CODE8',
    title: 'Code: emulate find',
    type: 'code',
    topic: 'find',
    difficulty: '★★★',
    prompt: 'Without using .find, set ctx.res to first string length>3.',
    snippet: `const words=['a','tool','map'];\n// Your code sets ctx.res = 'tool'`,
    setup: `const words=['a','tool','map'];`,
    context: { res: null },
    verify: (ctx) => ctx.res === 'tool',
    hints: [
      'Loop until length>3',
      'Break after assign',
      'Assign string'
    ]
  }
];
