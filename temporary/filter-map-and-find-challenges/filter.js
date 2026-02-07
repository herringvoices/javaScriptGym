// Challenges — Array.prototype.filter()
export const filterChallenges = [
  {
    id: 'FILT1',
    title: 'Filter even numbers',
    type: 'value',
    topic: 'filter',
    difficulty: '★',
    prompt: 'What is logged to the console?',
    snippet: `const nums = [1,2,3,4];\nconst evens = nums.filter(n => n % 2 === 0);\nconsole.log(evens);`,
    expected: [2,4],
    hints: [
      'filter runs the predicate on each element',
      'Keep numbers where n % 2 === 0',
      'Only 2 and 4 remain'
    ]
  },
  {
    id: 'FILT2',
    title: 'Filter length > 3',
    type: 'value',
    topic: 'filter',
    difficulty: '★',
    prompt: 'What is logged to the console?',
    snippet: `const words = ['to', 'tree', 'rock', 'sun'];\nconst longOnes = words.filter(w => w.length > 3);\nconsole.log(longOnes);`,
    expected: ['tree','rock'],
    hints: [
      'Check each word length',
      'Keep those with length greater than 3',
      'tree and rock qualify'
    ]
  },
  {
    id: 'FILT3',
    title: 'Filter objects by property',
    type: 'value',
    topic: 'filter',
    difficulty: '★★',
    prompt: 'What is logged to the console?',
    snippet: `const users = [\n  { name: 'Ada', active: true },\n  { name: 'Lin', active: false },\n  { name: 'Edsger', active: true }\n];\nconst active = users.filter(u => u.active);\nconsole.log(active.map(u => u.name));`,
    expected: ['Ada','Edsger'],
    hints: [
      'Predicate returns truthy only for active true',
      'Two objects match',
      'Map extracts their names'
    ]
  },
  {
    id: 'FILT4',
    title: 'Filter no matches yields empty',
    type: 'value',
    topic: 'filter',
    difficulty: '★',
    prompt: 'What is logged to the console?',
    snippet: `const xs = [1,3,5];\nconst evens = xs.filter(n => n % 2 === 0);\nconsole.log(evens);`,
    expected: [],
    hints: [
      'No element satisfies n % 2 === 0',
      'filter returns a new array',
      'With zero elements'
    ]
  },
  {
    id: 'FILT5',
    title: 'Code: filter using index parameter',
    type: 'code',
    topic: 'filter',
    difficulty: '★★',
    prompt: 'Set ctx.out to the letters at odd indexes using filter.',
    snippet: `const letters = ['a','b','c','d'];\n// Your code sets ctx.out to ['b','d']`,
    setup: `const letters = ['a','b','c','d'];`,
    context: { out: null },
    verify: (ctx) => Array.isArray(ctx.out) && ctx.out.length===2 && ctx.out[0]==='b' && ctx.out[1]==='d',
    hints: [
      'Predicate uses index i',
      'Odd indexes: 1 and 3',
      "Letters there are 'b' and 'd'"
    ]
  },
  {
    id: 'FILT6',
    title: 'Code: chained filter count',
    type: 'code',
    topic: 'filter',
    difficulty: '★★',
    prompt: 'Create ctx.len equal to the count of even numbers > 5.',
    snippet: `const nums = [4,7,8,10,11];\n// Your code sets ctx.len to 2`,
    setup: `const nums = [4,7,8,10,11];`,
    context: { len: null },
    verify: (ctx) => ctx.len === 2,
    hints: [
      'First filter keeps > 5: [7,8,10,11]',
      'Second keeps evens: 8 and 10',
      'Length is 2'
    ]
  }
  ,
  {
    id: 'FILT_CODE1',
    title: 'Write a filter for primes',
    type: 'code',
    topic: 'filter',
    difficulty: '★★',
    prompt: 'Write code that adds an array of prime numbers from nums into ctx.result using filter (e.g. ctx.result = ...).',
    snippet: `const nums = [2,3,4,5,6,7];\n// Your code: set ctx.result to an array of primes from nums`,
    setup: `const nums = [2,3,4,5,6,7];\nfunction isPrime(n){ if(n<2) return false; for(let i=2;i<=Math.sqrt(n);i++) if(n%i===0) return false; return true; }`,
    context: { result: null },
    verify: (ctx) => {
      if (!Array.isArray(ctx.result)) return 'ctx.result must be an array.';
      const expected = [2,3,5,7];
      if (ctx.result.length !== expected.length) return 'Incorrect number of primes.';
      for (let i=0;i<expected.length;i++) if (ctx.result[i] !== expected[i]) return 'Prime list incorrect.';
      return true;
    },
    hints: [
      'Use nums.filter with isPrime predicate',
      'Assign the result to ctx.result',
      'Order should be preserved'
    ]
  },
  {
    id: 'FILT_CODE2',
    title: 'Filter then map custom objects',
    type: 'code',
    topic: 'filter',
    difficulty: '★★★',
    prompt: 'Use filter to keep even numbers then map to objects {value:n}. Store in ctx.out.',
    snippet: `const nums = [1,2,3,4];\n// Your code: produce [{value:2},{value:4}] in ctx.out`,
    setup: `const nums=[1,2,3,4];`,
    context: { out: null },
    verify: (ctx) => {
      if (!Array.isArray(ctx.out)) return 'ctx.out must be an array.';
      const exp = [{value:2},{value:4}];
      if (ctx.out.length !== exp.length) return false;
      for (let i=0;i<exp.length;i++) if (!ctx.out[i] || ctx.out[i].value !== exp[i].value) return false;
      return true;
    },
    hints: [
      'Chain filter(...).map(...)',
      'Even test: n % 2 === 0',
      'Map to an object with value property'
    ]
  }
  ,
  // Added value challenges FILT7-12
  {
    id: 'FILT7',
    title: 'Filter negatives',
    type: 'value',
    topic: 'filter',
    difficulty: '★',
    prompt: 'What is logged to the console?',
    snippet: `const nums = [-2,-1,0,3];\nconst neg = nums.filter(n => n < 0);\nconsole.log(neg);`,
    expected: [-2,-1],
    hints: [
      'Predicate n < 0',
      'Negatives kept',
      '[-2,-1]'
    ]
  },
  {
    id: 'FILT8',
    title: 'Filter unique by indexOf',
    type: 'value',
    topic: 'filter',
    difficulty: '★★',
    prompt: 'What is logged to the console?',
    snippet: `const xs = [1,2,2,3];\nconst unique = xs.filter((v,i,a) => a.indexOf(v) === i);\nconsole.log(unique);`,
    expected: [1,2,3],
    hints: [
      'indexOf finds first occurrence index',
      'Keep only when first occurrence equals current i',
      'Removes duplicate 2'
    ]
  },
  {
    id: 'FILT9',
    title: 'Filter objects by nested property',
    type: 'value',
    topic: 'filter',
    difficulty: '★★',
    prompt: 'What is logged to the console?',
    snippet: `const items=[{meta:{ok:true}},{meta:{ok:false}},{meta:{ok:true}}];\nconst ok = items.filter(it => it.meta.ok).length;\nconsole.log(ok);`,
    expected: 2,
    hints: [
      'Check it.meta.ok',
      'Two objects true',
      'Length 2'
    ]
  },
  {
    id: 'FILT10',
    title: 'Filter strings containing letter',
    type: 'value',
    topic: 'filter',
    difficulty: '★',
    prompt: 'What is logged to the console?',
    snippet: `const words=['apple','pear','kiwi'];\nconst withP = words.filter(w => w.includes('p'));\nconsole.log(withP);`,
    expected: ['apple','pear'],
    hints: [
      'includes("p")',
      'apple and pear match',
      'kiwi excluded'
    ]
  },
  {
    id: 'FILT11',
    title: 'Filter by index parity',
    type: 'value',
    topic: 'filter',
    difficulty: '★',
    prompt: 'What is logged to the console?',
    snippet: `const letters=['a','b','c','d'];\nconst evenIndex = letters.filter((_,i)=> i % 2 === 0);\nconsole.log(evenIndex);`,
    expected: ['a','c'],
    hints: [
      'i % 2 === 0 selects indexes 0,2',
      'letters there a,c',
      '["a","c"]'
    ]
  },
  {
    id: 'FILT12',
    title: 'Filter then length comparison',
    type: 'value',
    topic: 'filter',
    difficulty: '★★',
    prompt: 'What is logged to the console?',
    snippet: `const nums=[1,2,3,4,5];\nconst gt2 = nums.filter(n=>n>2);\nconsole.log(gt2.length === 3);`,
    expected: true,
    hints: [
      'Numbers >2 are 3,4,5',
      'Length 3',
      '3 === 3 -> true'
    ]
  },
  // Added code challenges FILT_CODE3 - FILT_CODE8
  {
    id: 'FILT_CODE3',
    title: 'Code: remove falsy values',
    type: 'code',
    topic: 'filter',
    difficulty: '★★',
    prompt: 'Using filter, set ctx.clean = [1,"hi",true].',
    snippet: `const arr=[0,1,'',"hi",false,true];\n// Your code sets ctx.clean`,
    setup: `const arr=[0,1,'',"hi",false,true];`,
    context: { clean: null },
    verify: (ctx) => Array.isArray(ctx.clean) && ctx.clean.length===3 && ctx.clean[0]===1 && ctx.clean[1]==='hi' && ctx.clean[2]===true,
    hints: [
      'Falsy: 0, "", false',
      'Filter by Boolean(v)',
      'Assign to ctx.clean'
    ]
  },
  {
    id: 'FILT_CODE4',
    title: 'Code: filter primes inline',
    type: 'code',
    topic: 'filter',
    difficulty: '★★★',
    prompt: 'Without helper function, set ctx.primes = [2,3,5].',
    snippet: `const nums=[2,3,4,5,6];\n// Your code sets ctx.primes`,
    setup: `const nums=[2,3,4,5,6];`,
    context: { primes: null },
    verify: (ctx) => Array.isArray(ctx.primes) && ctx.primes.join(',')==='2,3,5',
    hints: [
      'Inline prime test loop or sqrt check',
      'Return true only if prime',
      'Assign array'
    ]
  },
  {
    id: 'FILT_CODE5',
    title: 'Code: filter by dynamic threshold',
    type: 'code',
    topic: 'filter',
    difficulty: '★★',
    prompt: 'Given limit=10, set ctx.big = numbers > limit.',
    snippet: `const nums=[5,9,10,11,15];\nconst limit=10;\n// Your code sets ctx.big = [11,15]`,
    setup: `const nums=[5,9,10,11,15]; const limit=10;`,
    context: { big: null },
    verify: (ctx) => Array.isArray(ctx.big) && ctx.big.length===2 && ctx.big[0]===11 && ctx.big[1]===15,
    hints: [
      'Use nums.filter(n => n > limit)',
      'Strict greater than',
      'Assign to ctx.big'
    ]
  },
  {
    id: 'FILT_CODE6',
    title: 'Code: filter objects then map names',
    type: 'code',
    topic: 'filter',
    difficulty: '★★',
    prompt: 'Set ctx.names to active user names.',
    snippet: `const users=[{name:'Ada',active:true},{name:'Lin',active:false},{name:'Edsger',active:true}];\n// Your code sets ctx.names = ['Ada','Edsger']`,
    setup: `const users=[{name:'Ada',active:true},{name:'Lin',active:false},{name:'Edsger',active:true}];`,
    context: { names: null },
    verify: (ctx) => Array.isArray(ctx.names) && ctx.names[0]==='Ada' && ctx.names[1]==='Edsger' && ctx.names.length===2,
    hints: [
      'Filter active true',
      'Map names',
      'Assign array'
    ]
  },
  {
    id: 'FILT_CODE7',
    title: 'Code: filter indices with predicate',
    type: 'code',
    topic: 'filter',
    difficulty: '★★',
    prompt: 'Set ctx.idx to indexes of even numbers.',
    snippet: `const nums=[3,4,5,8];\n// Your code sets ctx.idx = [1,3]`,
    setup: `const nums=[3,4,5,8];`,
    context: { idx: null },
    verify: (ctx) => Array.isArray(ctx.idx) && ctx.idx[0]===1 && ctx.idx[1]===3 && ctx.idx.length===2,
    hints: [
      'Use nums.map with index? or filter on indexes array',
      'Simpler: nums.forEach push index if even',
      'Any approach accepted'
    ]
  },
  {
    id: 'FILT_CODE8',
    title: 'Code: emulate filter manually',
    type: 'code',
    topic: 'filter',
    difficulty: '★★★',
    prompt: 'Without using .filter, build ctx.out with even numbers.',
    snippet: `const nums=[1,2,3,4,5,6];\n// Your code sets ctx.out = [2,4,6]`,
    setup: `const nums=[1,2,3,4,5,6];`,
    context: { out: null },
    verify: (ctx) => Array.isArray(ctx.out) && ctx.out.join(',')==='2,4,6',
    hints: [
      'Initialize []',
      'Loop and push if even',
      'Assign to ctx.out'
    ]
  }
];
