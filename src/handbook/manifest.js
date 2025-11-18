// Dynamic manifest for handbook MDX chapters.
// Add new entries by placing an <id>.mdx file in this folder and adding a mapping here.

export const handbookChapters = {
  overview: () => import('./overview.mdx'),
  'JS.VDT.PRM': () => import('./JS.VDT.PRM.mdx'),
  'JS.VDT.COL': () => import('./JS.VDT.COL.mdx'),
  'JS.VDT.MTH': () => import('./JS.VDT.MTH.mdx'),
  'JS.FN.BAS': () => import('./JS.FN.BAS.mdx'),
  'JS.PF.CON': () => import('./JS.PF.CON.mdx'),
  'JS.FN.HOF': () => import('./JS.FN.HOF.mdx'),
};

export const handbookOrder = [
  'overview',
  'JS.VDT.PRM',
  'JS.VDT.COL',
  'JS.VDT.MTH',
  'JS.FN.BAS',
  'JS.FN.HOF',
  'JS.PF.CON',
];

// New-style handbook entries with embedded editor workbench
// Map of standardId -> async loader returning a HandbookEntry object
// Start small and migrate standards incrementally.
export const handbookEntries = {
  // Example: migrate the "overview" standard to a new entry with an editor
  overview: () => import('./entries/overview.js').then((m) => m.default),
  // Add more as they’re converted:
  'JS.VDT.PRM': () => import('./entries/JS.VDT.PRM.js').then(m => m.default),
  'JS.VDT.COL': () => import('./entries/JS.VDT.COL.js').then(m => m.default),
  'JS.VDT.MTH': () => import('./entries/JS.VDT.MTH.js').then(m => m.default),
  'JS.FN.BAS': () => import('./entries/JS.FN.BAS.js').then(m => m.default),
  'JS.PF.CON': () => import('./entries/JS.PF.CON.js').then(m => m.default),
};

export async function loadHandbookEntry(standardId) {
  const loader = handbookEntries[standardId];
  if (!loader) return null;
  try {
    const entry = await loader();
    return entry || null;
  } catch (e) {
    // Surface null on failure so the page can fall back to legacy content
    void e;
    return null;
  }
}

// Hierarchical structure: substandard intro plus chapter list/loaders
// This drives the sidebar tree and chapter routing.
export const handbookStructure = {
  // Variables & Primitives: intro lives in JS.VDT.PRM.mdx (top-level),
  // chapters live under standards/JS.VDT.PRM/*.mdx
  'JS.VDT.PRM': {
    // Explicit chapter list with stable ids and user-facing titles
    chapters: [
      {
        id: 'strings-introduction',
        title: 'String Values',
        load: () => import('./standards/JS.VDT.PRM/strings-introduction.mdx'),
      },
      {
        id: 'numbers-introduction',
        title: 'Number Values',
        load: () => import('./standards/JS.VDT.PRM/numbers-introduction.mdx'),
      },
      {
        id: 'booleans-introduction',
        title: 'Booleans & Empty Values',
        load: () => import('./standards/JS.VDT.PRM/booleans-introduction.mdx'),
      },

    ],
    // Intro loader: reuse the existing top-level chapter as the intro
    loadIntro: () => import('./JS.VDT.PRM.mdx'),
  },
  'JS.VDT.COL': {
    chapters: [
      {
        id: 'objects-introduction',
        title: 'Objects',
        load: () => import('./standards/JS.VDT.COL/objects-introduction.mdx'),
      },
      {
        id: 'arrays-introduction',
        title: 'Arrays',
        load: () => import('./standards/JS.VDT.COL/arrays-introduction.mdx'),
      },
      {
        id: 'JS.VDT.COL.ARR_OBJ',
        title: 'Arrays of Objects',
        load: () => import('./standards/JS.VDT.COL/arrays-of-objects.mdx'),
      },
      {
        id: 'JS.VDT.COL.ARR_ENDS',
        title: 'Arrays: End Controls',
        load: () => import('./standards/JS.VDT.COL/arrays-end-controls.mdx'),
      },
      {
        id: 'JS.VDT.COL.PROJ.LIB',
        title: 'Mini Project: Library Shelf',
        load: () => import('./standards/JS.VDT.COL/project-library-shelf.mdx'),
      },
    ],
    loadIntro: () => import('./JS.VDT.COL.mdx'),
  },
  'JS.VDT.MTH': {
    chapters: [
      {
        id: 'JS.VDT.MTH.STR',
        title: 'String Methods · Clean & Normalize Text',
        load: () => import('./standards/JS.VDT.MTH/string-methods-clean-normalize.mdx'),
      },
      {
        id: 'JS.VDT.MTH.NUM_PARSE',
        title: 'Number Parsers · From Strings to Numbers',
        load: () => import('./standards/JS.VDT.MTH/number-parsers-from-strings-to-numbers.mdx'),
      },
      {
        id: 'JS.VDT.MTH.OBJ_UTIL',
        title: 'Object Utilities · Peek & Shape',
        load: () => import('./standards/JS.VDT.MTH/object-utilities-peek-shape.mdx'),
      },
    ],
    loadIntro: () => import('./JS.VDT.MTH.mdx'),
  },
  'JS.FN.BAS': {
    chapters: [
      {
        id: 'JS.FN.BAS.INTRO',
        title: 'Functions · Recipes for Reusable Code',
        load: () => import('./standards/JS.FN.BAS/functions-recipes-for-reusable-code.mdx'),
      },
      {
        id: 'JS.FN.BAS.PARAMS',
        title: 'Functions · Parameters (Make One Recipe Do More)',
        load: () => import('./standards/JS.FN.BAS/functions-parameters.mdx'),
      },
      {
        id: 'JS.FN.BAS.RETURN',
        title: 'Functions · Return Values (Getting Results Back)',
        load: () => import('./standards/JS.FN.BAS/functions-return.mdx'),
      },
      {
        id: 'JS.FN.BAS.COMPOSE',
        title: 'Functions · Composing Helpers (Small Pieces Working Together)',
        load: () => import('./standards/JS.FN.BAS/functions-composing-helpers.mdx'),
      },
    ],
    loadIntro: () => import('./JS.FN.BAS.mdx'),
  },
  'JS.PF.CON': {
    chapters: [
      {
        id: 'JS.PF.CON.INTRO',
        title: 'Conditionals 101 · Mesh Screens for Decisions',
        load: () => import('./standards/JS.PF.CON/conditionals-101-mesh-screens.mdx'),
      },
      {
        id: 'JS.PF.CON.LADDER',
        title: 'Conditionals 102 · Stacks of Screens (Else If & Ordering)',
        load: () => import('./standards/JS.PF.CON/conditionals-102-stacks-of-screens.mdx'),
      },
      {
        id: 'JS.PF.CON.COMBO',
        title: 'Conditionals 103 · Combined Screens (AND, OR & Short-Circuiting)',
        load: () => import('./standards/JS.PF.CON/conditionals-103-combined-screens.mdx'),
      },
      {
        id: 'JS.PF.CON.SWITCH',
        title: 'Conditionals 104 · Labeled Gates (switch vs if/else)',
        load: () => import('./standards/JS.PF.CON/conditionals-104-labeled-gates.mdx'),
      },
    ],
    loadIntro: () => import('./JS.PF.CON.mdx'),
  },
  // Add more standards here as their chapters are authored
};

export function getChaptersForStandard(standardId) {
  const node = handbookStructure[standardId];
  return node?.chapters || [];
}

export function getChapterLoader(standardId, chapterId) {
  const node = handbookStructure[standardId];
  if (!node) return null;
  if (!chapterId) return node.loadIntro || null;
  const item = node.chapters.find((c) => c.id === chapterId);
  return item ? item.load : null;
}
