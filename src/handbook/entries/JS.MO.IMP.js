// Handbook entry for Modules & Organization · Import/Export

/** @type {import('./overview.js').HandbookEntry} */
const entry = {
  id: "JS.MO.IMP-wb",
  standard: "JS.MO.IMP",
  files: [
    {
      path: "/main.js",
      type: "javascript",
      active: true,
      content: /*js*/ `// National Cryptid Census - Modules & Organization

const cryptids = [
  {
    id: 1,
    name: "Bigfoot",
    region: "Pacific Northwest",
    confirmed: true,
    sightings: 42,
  },
  {
    id: 2,
    name: "Mothman",
    region: "Appalachia",
    confirmed: true,
    sightings: 19,
  },
  {
    id: 3,
    name: "Jersey Devil",
    region: "Northeast",
    confirmed: true,
    sightings: 12,
  },
  {
    id: 4,
    name: "Chupacabra",
    region: "Southwest",
    confirmed: true,
    sightings: 28,
  },
  {
    id: 5,
    name: "Loveland Frog",
    region: "Midwest",
    confirmed: false,
    sightings: 7,
  },
  {
    id: 6,
    name: "Skunk Ape",
    region: "Southeast",
    confirmed: true,
    sightings: 16,
  },
  {
    id: 7,
    name: "Dover Demon",
    region: "Northeast",
    confirmed: false,
    sightings: 3,
  },
  {
    id: 8,
    name: "Flatwoods Monster",
    region: "Appalachia",
    confirmed: true,
    sightings: 9,
  },
];

function countConfirmed(records) {
  let count = 0;

  for (let i = 0; i < records.length; i++) {
    if (records[i].confirmed) {
      count++;
    }
  }

  return count;
}

function findCryptidByName(records, requestedName) {
  for (const cryptid of records) {
    const normalizedCryptidName = cryptid.name.toLowerCase();

    if (normalizedCryptidName === requestedName.toLowerCase()) {
      return cryptid;
    }
  }

  return null;
}

function totalSightingsInRegion(records, requestedRegion) {
  let total = 0;

  for (const cryptid of records) {
    if (cryptid.region === requestedRegion) {
      total += cryptid.sightings;
    }
  }

  return total;
}

const requestedName = "Mothman";
const requestedCryptid = findCryptidByName(cryptids, requestedName);
const requestedRegion = "Northeast";

console.log("======NATIONAL CRYPTID CENSUS======");
console.log(\`Records: \${cryptids.length}\`);
console.log(\`Confirmed: \${countConfirmed(cryptids)}\`);

console.log("======REQUESTED RECORD======");

if (requestedCryptid === null) {
  console.log(\`No record found for \${requestedName}.\`);
} else {
  console.log(\`Name: \${requestedCryptid.name}\`);
  console.log(\`Region: \${requestedCryptid.region}\`);
  console.log(\`Sightings: \${requestedCryptid.sightings}\`);
}

console.log("======REGION REPORT======");
console.log(\`Region: \${requestedRegion}\`);
console.log(
  \`Total sightings: \${totalSightingsInRegion(cryptids, requestedRegion)}\`
);
`,
    },
    {
      path: "/dependencyGraph.mmd",
      type: "mermaid",
      active: false,
      content: "",
    },
    {
      path: "/sequenceDiagram.mmd",
      type: "mermaid",
      active: false,
      content: "",
    },
  ],
  entry: "/main.js",
  sandbox: {
    runtime: "dom",
    defaultPanel: "console",
    showRightPanel: true,
    showExplorer: true,
  },
  mock: undefined,
  handbookMarkdown: "",
  tags: [],
};

export default entry;
