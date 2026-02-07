// Unit C — Nested Objects
export const nested = [
  {
    id: "C1",
    title: "Nested dot → dot",
    type: "value",
    topic: "nested",
    difficulty: "★",
  prompt: "What is logged to the console?",
    snippet: `const player = {
  stats: {
    score: 1200,
    rank: "Rookie"
  }
};
console.log(player.stats.rank);`,
    expected: "Rookie",
    hints: [
      "Go step by step: player → stats → rank",
      "stats is an object with rank",
      "Return the rank string"
    ]
  },
  {
    id: "C2",
    title: "Mixed dot + bracket",
    type: "value",
    topic: "nested",
    difficulty: "★★",
  prompt: "What is logged to the console?",
    snippet: `const car = {
  specs: {
    mpg: {
      city: 24,
      highway: 32
    }
  }
};
console.log(car.specs.mpg["city"]);`,
    expected: 24,
    hints: [
      "Access specs, then mpg, then the 'city' key",
      "mpg is an object",
      "Return the number"
    ]
  },
  {
    id: "C3",
    title: "Deeper nest (3 levels)",
    type: "value",
    topic: "nested",
    difficulty: "★★",
  prompt: "What is logged to the console?",
    snippet: `const site = {
  theme: {
    colors: {
      primary: "#1d4ed8",
      bg: "#fff"
    }
  }
};
console.log(site.theme.colors.primary);`,
    expected: "#1d4ed8",
    hints: [
      "Follow the chain",
      "colors holds primary",
      "Return the hex string"
    ]
  },
  {
    id: "C4",
    title: "Missing nested branch",
    type: "value",
    topic: "nested",
    difficulty: "★★",
  prompt: "What is logged to the console if <code>address</code> doesn't exist?",
    snippet: `const order = {
  shipping: {
    method: "ground"
  }
};
console.log(order.shipping.address.zip);`,
    expected: undefined,
    hints: [
      "Reading a missing property yields undefined",
      "address isn't present",
      "So the whole path read is undefined"
    ]
  },
  {
    id: "C5",
    title: "Nested path writing",
    type: "path",
    topic: "nested",
    difficulty: "★★",
  prompt: "Type the <strong>path</strong> to read the manager's email.",
    snippet: `const company = {
  hr: {
    manager: {
      email: "mgr@corp.test"
    }
  }
};
// Type the property path to get the email`,
    expected: "company.hr.manager.email",
    hints: [
      "Walk hr → manager → email",
      "No brackets needed (valid identifiers)",
      "company.hr.manager.email"
    ]
  }
  ,
  {
    id: "C6",
    title: "Nested bracket with variable",
    type: "value",
    topic: "nested",
    difficulty: "★★",
  prompt: "What is logged to the console when <code>key</code> is 'highway'?",
    snippet: `const car = {
  mpg: {
    city: 24,
    highway: 32
  }
};
const key = "highway";
console.log(car.mpg[key]);`,
    expected: 32,
    hints: [
      "Read mpg first",
      "Use bracket with the variable",
      "Return the highway number"
    ]
  },
  {
    id: "C7",
    title: "Deep bracket with space key",
    type: "value",
    topic: "nested",
    difficulty: "★★",
  prompt: "What is logged to the console?",
    snippet: `const album = {
  meta: {
    "release year": 1971
  }
};
console.log(album.meta["release year"]);`,
    expected: 1971,
    hints: [
      "Keys with spaces require brackets",
      "Access meta then the bracket key",
      "Return the year"
    ]
  },
  {
    id: "C8",
    title: "Nested path writing (mixed)",
    type: "path",
    topic: "nested",
    difficulty: "★★",
  prompt: "Type the <strong>path</strong> to read the city's name.",
    snippet: `const data = {
  location: {
    city: {
      name: "Sevilla"
    }
  }
};
// Type the property path to get the city name`,
    expected: "data.location.city.name",
    hints: [
      "Walk location → city → name",
      "All are valid identifiers",
      "data.location.city.name"
    ]
  },
  {
    id: "C9",
    title: "Nested dot then array index",
    type: "value",
    topic: "nested",
    difficulty: "★★",
  prompt: "What is logged to the console?",
    snippet: `const blog = {
  posts: [
    { title: "Intro" },
    { title: "Deep Dive" }
  ]
};
console.log(blog.posts[1].title);`,
    expected: "Deep Dive",
    hints: [
      "Read posts then index 1",
      "Then the title property",
      "Return the string"
    ]
  }
  ,
  {
    id: "C10",
    title: "Nested path to email",
    type: "path",
    topic: "nested",
    difficulty: "★★",
  prompt: "Type the <strong>path</strong> to read the admin's email.",
    snippet: `const system = {
  users: {
    admin: {
      email: "root@sys.test"
    }
  }
};
// Type the property path to get the admin email`,
    expected: "system.users.admin.email",
    hints: [
      "users → admin → email",
      "All valid identifiers",
      "system.users.admin.email"
    ]
  }
  ,
  {
    id: "C11",
    title: "Nested read with variable in middle",
    type: "value",
    topic: "nested",
    difficulty: "★★",
  prompt: "What is logged to the console when <code>mid</code> is 'prefs'?",
    snippet: `const user = {
  prefs: {
    lang: "en"
  }
};
const mid = "prefs";
console.log(user[mid].lang);`,
    expected: "en",
    hints: [
      "Use variable to select nested object",
      "Then dot to read lang",
      "Returns 'en'"
    ]
  },
  {
    id: "C12",
    title: "Nested bracket with dash key",
    type: "value",
    topic: "nested",
    difficulty: "★★",
  prompt: "What is logged to the console?",
    snippet: `const meta = {
  seo: {
    "og:title": "Hello"
  }
};
console.log(meta.seo["og:title"]);`,
    expected: "Hello",
    hints: [
      "Dash in key requires brackets",
      "Access seo then bracket key",
      "Return the string"
    ]
  },
  {
    id: "C13",
    title: "Path writing: deep property",
    type: "path",
    topic: "nested",
    difficulty: "★★★",
  prompt: "Type the <strong>path</strong> to read the timezone.",
    snippet: `const cfg = {
  ui: {
    locale: {
      timezone: "UTC"
    }
  }
};
// Type the property path to get timezone`,
    expected: "cfg.ui.locale.timezone",
    hints: [
      "ui → locale → timezone",
      "Valid identifiers, use dots",
      "cfg.ui.locale.timezone"
    ]
  }
];
