// Challenges — Array.prototype.map()
export const mapChallenges = [
  {
    id: 'MAP1',
    title: 'Map numbers to doubles',
    type: 'value',
    topic: 'map',
    difficulty: '★',
    prompt: 'What is logged to the console?',
    snippet: `const nums = [1,2,3];\nconst doubled = nums.map(n => n * 2);\nconsole.log(doubled);`,
    expected: [2,4,6],
    hints: [
      'map transforms each value',
      'n * 2 applied to 1,2,3',
      'Result is [2,4,6]'
    ]
  },
  {
    id: 'MAP2',
    title: 'Map strings to lengths',
    type: 'value',
    topic: 'map',
    difficulty: '★',
    prompt: 'What is logged to the console?',
    snippet: `const words = ['a','cat','tree'];\nconst lens = words.map(w => w.length);\nconsole.log(lens);`,
    expected: [1,3,4],
    hints: [
      'Lengths of a, cat, tree',
      '1,3,4',
      'Return that array'
    ]
  },
  {
    id: 'MAP3',
    title: 'Map objects to property',
    type: 'value',
    topic: 'map',
    difficulty: '★',
    prompt: 'What is logged to the console?',
    snippet: `const users = [\n  { name: 'Ada' },\n  { name: 'Lin' }\n];\nconst names = users.map(u => u.name);\nconsole.log(names);`,
    expected: ['Ada','Lin'],
    hints: [
      'Pick name from each object',
      'Return array of names',
      "['Ada','Lin']"
    ]
  },
  {
    id: 'MAP4',
    title: 'Map with index parameter',
    type: 'value',
    topic: 'map',
    difficulty: '★★',
    prompt: 'What is logged to the console?',
    snippet: `const letters = ['a','b','c'];\nconst tagged = letters.map((ch,i) => ch + i);\nconsole.log(tagged);`,
    expected: ['a0','b1','c2'],
    hints: [
      'Index appended as number',
      'a->a0, b->b1, c->c2',
      'Return new array'
    ]
  },
  {
    id: 'MAP5',
    title: 'Chained map math',
    type: 'value',
    topic: 'map',
    difficulty: '★★',
    prompt: 'What is logged to the console?',
    snippet: `const nums = [2,4];\nconst result = nums.map(n => n * 3).map(n => n + 1);\nconsole.log(result);`,
    expected: [7,13],
    hints: [
      'First map multiplies by 3 -> [6,12]',
      'Second adds 1 -> [7,13]',
      'Return [7,13]'
    ]
  },
  {
    id: 'MAP6',
    title: 'Map to boolean test',
    type: 'value',
    topic: 'map',
    difficulty: '★★',
    prompt: 'What is logged to the console?',
    snippet: `const nums = [3,4,5];\nconst isEven = nums.map(n => n % 2 === 0);\nconsole.log(isEven);`,
    expected: [false,true,false],
    hints: [
      '3%2->1 false, 4%2->0 true, 5%2->1 false',
      'map builds array of booleans',
      '[false,true,false]'
    ]
  }
  ,
  {
    id: 'MAP_CODE1',
    title: 'Implement square mapping',
    type: 'code',
    topic: 'map',
    difficulty: '★★',
    prompt: 'Map nums to their squares and store in ctx.squares.',
    snippet: `const nums = [2,5,6];\n// Your code: ctx.squares => [4,25,36]`,
    setup: `const nums=[2,5,6];`,
    context: { squares: null },
    verify: (ctx) => Array.isArray(ctx.squares) && ctx.squares.length===3 && ctx.squares[0]===4 && ctx.squares[1]===25 && ctx.squares[2]===36,
    hints: [
      'Use nums.map(n => n * n)',
      'Assign to ctx.squares',
      'Order stays the same'
    ]
  },
  {
    id: 'MAP_CODE2',
    title: 'Map objects with derived field',
    type: 'code',
    topic: 'map',
    difficulty: '★★★',
    prompt: 'Given users, create ctx.tags = ["Ada:3","Lin:5"].',
    snippet: `const users=[{name:'Ada',repos:3},{name:'Lin',repos:5}];\n// Your code: ctx.tags = ...`,
    setup: `const users=[{name:'Ada',repos:3},{name:'Lin',repos:5}];`,
    context: { tags: null },
    verify: (ctx) => Array.isArray(ctx.tags) && ctx.tags[0]==='Ada:3' && ctx.tags[1]==='Lin:5',
    hints: [
      'Use users.map(u => `${u.name}:${u.repos}`)',
      'Assign to ctx.tags',
      'Template string or concatenation both fine'
    ]
  },
  // Additional MAP challenges
  {
    id: 'MAP7',
    title: 'Map numbers to prefixed strings',
    type: 'value',
    topic: 'map',
    difficulty: '★',
    prompt: 'What is logged to the console?',
    snippet: `const nums = [3,5];\nconst pref = nums.map(n => 'id-' + n);\nconsole.log(pref);`,
    expected: ['id-3','id-5'],
    hints: [
      'Concatenate string with number',
      'Order preserved',
      "Result ['id-3','id-5']"
    ]
  },
  {
    id: 'MAP8',
    title: 'Map strings digits to numbers',
    type: 'value',
    topic: 'map',
    difficulty: '★',
    prompt: 'What is logged to the console?',
    snippet: `const digits = ['1','9','42'];\nconst nums = digits.map(d => Number(d));\nconsole.log(nums);`,
    expected: [1,9,42],
    hints: [
      'Number("42") -> 42',
      'Each string coerced to number',
      '[1,9,42]'
    ]
  },
  {
    id: 'MAP9',
    title: 'Map objects adding derived property',
    type: 'value',
    topic: 'map',
    difficulty: '★★',
    prompt: 'What is logged to the console?',
    snippet: `const people = [{first:'Ada',last:'L'},{first:'Lin',last:'Z'}];\nconst full = people.map(p => ({...p, name: p.first + ' ' + p.last}));\nconsole.log(full.map(p => p.name));`,
    expected: ['Ada L','Lin Z'],
    hints: [
      'Spread copies original fields',
      'Add name property',
      'Then map names'
    ]
  },
  {
    id: 'MAP10',
    title: 'Map to indexes',
    type: 'value',
    topic: 'map',
    difficulty: '★',
    prompt: 'What is logged to the console?',
    snippet: `const letters = ['x','y','z'];\nconst idxs = letters.map((_,i) => i);\nconsole.log(idxs);`,
    expected: [0,1,2],
    hints: [
      'Ignore value, return index',
      'Three elements -> 0,1,2',
      '[0,1,2]'
    ]
  },
  {
    id: 'MAP11',
    title: 'Map boolean inversion',
    type: 'value',
    topic: 'map',
    difficulty: '★',
    prompt: 'What is logged to the console?',
    snippet: `const flags = [true,false,false];\nconst flipped = flags.map(b => !b);\nconsole.log(flipped);`,
    expected: [false,true,true],
    hints: [
      '!true -> false',
      '!false -> true',
      '[false,true,true]'
    ]
  },
  {
    id: 'MAP12',
    title: 'Map nested arrays to lengths',
    type: 'value',
    topic: 'map',
    difficulty: '★★',
    prompt: 'What is logged to the console?',
    snippet: `const lists = [[1],[2,3],[4,5,6]];\nconst lens = lists.map(a => a.length);\nconsole.log(lens);`,
    expected: [1,2,3],
    hints: [
      'Length of each inner array',
      'Counts are 1,2,3',
      '[1,2,3]'
    ]
  },
  {
    id: 'MAP13',
    title: 'Map with conditional expression',
    type: 'value',
    topic: 'map',
    difficulty: '★★',
    prompt: 'What is logged to the console?',
    snippet: `const nums = [1,2,3,4];\nconst tag = nums.map(n => n % 2 === 0 ? 'even' : 'odd');\nconsole.log(tag);`,
    expected: ['odd','even','odd','even'],
    hints: [
      'Test evenness with n % 2 === 0',
      'Return even or odd',
      "['odd','even','odd','even']"
    ]
  },
  {
    id: 'MAP14',
    title: 'Code: two-step chain equivalence',
    type: 'code',
    topic: 'map',
    difficulty: '★★',
    prompt: 'Using two chained maps, set ctx.out to [20,30].',
    snippet: `const nums = [1,2];\n// Your code sets ctx.out = [20,30]`,
    setup: `const nums = [1,2];`,
    context: { out: null },
    verify: (ctx) => Array.isArray(ctx.out) && ctx.out.length===2 && ctx.out[0]===20 && ctx.out[1]===30,
    hints: [
      'First +1 -> [2,3]',
      '*10 -> [20,30]',
      '[20,30]'
    ]
  },
  {
    id: 'MAP15',
    title: 'Code: original array unchanged',
    type: 'code',
    topic: 'map',
    difficulty: '★★',
    prompt: 'Set ctx.original to the original nums and ctx.doubled to doubled result.',
    snippet: `const nums = [2,4];\n// Your code sets ctx.original = [2,4] and ctx.doubled = [4,8]`,
    setup: `const nums = [2,4];`,
    context: { original: null, doubled: null },
    verify: (ctx) => Array.isArray(ctx.original) && Array.isArray(ctx.doubled) && ctx.original[0]===2 && ctx.original[1]===4 && ctx.doubled[0]===4 && ctx.doubled[1]===8,
    hints: [
      'map is non-mutating',
      'Original stays [2,4]',
      'New is [4,8]'
    ]
  },
  {
    id: 'MAP16',
    title: 'Code: map to object shape',
    type: 'code',
    topic: 'map',
    difficulty: '★★★',
    prompt: 'Map nums to objects {original:n,double:n*2} and set ctx.list.',
    snippet: `const nums = [1,2];\n// Your code sets ctx.list = [{original:1,double:2},{original:2,double:4}]`,
    setup: `const nums = [1,2];`,
    context: { list: null },
    verify: (ctx) => Array.isArray(ctx.list) && ctx.list.length===2 && ctx.list[0].original===1 && ctx.list[0].double===2 && ctx.list[1].original===2 && ctx.list[1].double===4,
    hints: [
      'Return object literal each time',
      'Extract double values',
      '[2,4]'
    ]
  },
  {
    id: 'MAP_CODE3',
    title: 'Code: uppercase trimmed names',
    type: 'code',
    topic: 'map',
    difficulty: '★★',
    prompt: 'Produce ctx.out = ["ADA","LIN"] from users (trim then uppercase).',
    snippet: `const users = [{name:' Ada '},{name:' Lin '}];\n// Your code sets ctx.out`,
    setup: `const users = [{name:' Ada '},{name:' Lin '}];`,
    context: { out: null },
    verify: (ctx) => Array.isArray(ctx.out) && ctx.out[0]==='ADA' && ctx.out[1]==='LIN',
    hints: [
      'Trim with .trim()',
      'Uppercase with .toUpperCase()',
      'Assign array to ctx.out'
    ]
  },
  {
    id: 'MAP_CODE4',
    title: 'Code: reimplement map',
    type: 'code',
    topic: 'map',
    difficulty: '★★★',
    prompt: 'Without using .map, build ctx.res = nums squared (use for loop).',
    snippet: `const nums=[2,3,4];\n// Your code sets ctx.res = [4,9,16]`,
    setup: `const nums=[2,3,4];`,
    context: { res: null },
    verify: (ctx) => Array.isArray(ctx.res) && ctx.res.length===3 && ctx.res[0]===4 && ctx.res[1]===9 && ctx.res[2]===16,
    hints: [
      'Initialize empty array',
      'Loop pushing n*n',
      'Assign to ctx.res'
    ]
  },
  {
    id: 'MAP18',
    title: 'Code: map to nested duplicate arrays',
    type: 'code',
    topic: 'map',
    difficulty: '★★★',
    prompt: 'Using map, set ctx.out = [[1,1],[3,3]].',
    snippet: `const nums = [1,3];\n// Your code sets ctx.out = [[1,1],[3,3]]`,
    setup: `const nums = [1,3];`,
    context: { out: null },
    verify: (ctx) => Array.isArray(ctx.out) && ctx.out.length===2 && Array.isArray(ctx.out[0]) && ctx.out[0][0]===1 && ctx.out[0][1]===1 && ctx.out[1][0]===3 && ctx.out[1][1]===3,
    hints: [
      'Return a two-element array each iteration',
      'First -> [1,1], second -> [3,3]',
      'Nested arrays'
    ]
  }
];
