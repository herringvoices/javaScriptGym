// Dynamic manifest for handbook MDX chapters.
// Add new entries by placing an <id>.mdx file in this folder and adding a mapping here.

export const handbookChapters = {
  overview: () => import('./overview.mdx'),
  'JS.VDT.PRM': () => import('./JS.VDT.PRM.mdx'),
  'JS.VDT.COL': () => import('./JS.VDT.COL.mdx'),
  'JS.VDT.MTH': () => import('./JS.VDT.MTH.mdx'),
  'JS.FN.BAS': () => import('./JS.FN.BAS.mdx'),
  'JS.PF.CON': () => import('./JS.PF.CON.mdx'),
  'JS.PF.ITR': () => import('./JS.PF.ITR.mdx'),
  'JS.FN.HOF': () => import('./JS.FN.HOF.mdx'),
  'JS.AR.ACC': () => import('./JS.AR.ACC.mdx'),
  'JS.AR.MTH': () => import('./JS.AR.MTH.mdx'),
  'JS.SD.ELM': () => import('./JS.SD.ELM.mdx'),
  'JS.SD.EVH': () => import('./JS.SD.EVH.mdx'),
};

export const handbookOrder = [
  'overview',
  'JS.VDT.PRM',
  'JS.VDT.COL',
  'JS.VDT.MTH',
  'JS.FN.BAS',
  'JS.FN.HOF',
  'JS.PF.CON',
  'JS.PF.ITR',
  'JS.AR.ACC',
  'JS.AR.MTH',
  'JS.SD.ELM',
  'JS.SD.EVH',
];
// Start small and migrate standards incrementally.
export const handbookEntries = {
  // Example: migrate the "overview" standard to a new entry with an editor
  overview: () => import('./entries/overview.js').then((m) => m.default),
  // Add more as they are converted:
  'JS.VDT.PRM': () => import('./entries/JS.VDT.PRM.js').then(m => m.default),
  'JS.VDT.COL': () => import('./entries/JS.VDT.COL.js').then(m => m.default),
  'JS.VDT.MTH': () => import('./entries/JS.VDT.MTH.js').then(m => m.default),
  'JS.FN.BAS': () => import('./entries/JS.FN.BAS.js').then(m => m.default),
  'JS.PF.CON': () => import('./entries/JS.PF.CON.js').then(m => m.default),
  'JS.PF.ITR': () => import('./entries/JS.PF.ITR.js').then(m => m.default),
  'JS.AR.ACC': () => import('./entries/JS.AR.ACC.js').then(m => m.default),
  'JS.AR.MTH': () => import('./entries/JS.AR.MTH.js').then(m => m.default),

  'JS.SD.ELM': () => import('./entries/JS.SD.ELM.js').then(m => m.default),

  'JS.SD.EVH': () => import('./entries/JS.SD.EVH.js').then(m => m.default),


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
    ],
    loadIntro: () => import('./JS.VDT.COL.mdx'),
  },
  'JS.VDT.MTH': {
    chapters: [
      {
        id: 'JS.VDT.MTH.STR',
        title: 'String Methods \u00b7 Clean & Normalize Text',
        load: () => import('./standards/JS.VDT.MTH/string-methods-clean-normalize.mdx'),
      },
      {
        id: 'JS.VDT.MTH.NUM_PARSE',
        title: 'Number Parsers \u00b7 From Strings to Numbers',
        load: () => import('./standards/JS.VDT.MTH/number-parsers-from-strings-to-numbers.mdx'),
      },
      {
        id: 'JS.VDT.MTH.OBJ_UTIL',
        title: 'Object Utilities \u00b7 Peek & Shape',
        load: () => import('./standards/JS.VDT.MTH/object-utilities-peek-shape.mdx'),
      },
      {
        id: 'JS.VDT.COL.ARR_ENDS',
        title: 'Array Methods \u00b7 Add & Remove Items',
        load: () => import('./standards/JS.VDT.MTH/arrays-end-controls.mdx'),
      },
    ],
    loadIntro: () => import('./JS.VDT.MTH.mdx'),
  },
  'JS.FN.BAS': {
    chapters: [
      {
        id: 'JS.FN.BAS.INTRO',
        title: 'Functions \u00b7 Recipes for Reusable Code',
        load: () => import('./standards/JS.FN.BAS/functions-recipes-for-reusable-code.mdx'),
      },
      {
        id: 'JS.FN.BAS.PARAMS',
        title: 'Functions \u00b7 Parameters (Make One Recipe Do More)',
        load: () => import('./standards/JS.FN.BAS/functions-parameters.mdx'),
      },
      {
        id: 'JS.FN.BAS.RETURN',
        title: 'Functions \u00b7 Return Values (Getting Results Back)',
        load: () => import('./standards/JS.FN.BAS/functions-return.mdx'),
      },
      {
        id: 'JS.FN.BAS.COMPOSE',
        title: 'Functions \u00b7 Composing Helpers (Small Pieces Working Together)',
        load: () => import('./standards/JS.FN.BAS/functions-composing-helpers.mdx'),
      },
    ],
    loadIntro: () => import('./JS.FN.BAS.mdx'),
  },
  'JS.PF.CON': {
    chapters: [

      {
        id: 'JS.PF.CON.LADDER',
        title: 'Conditionals \u00b7 Stacks of Screens (Else If & Ordering)',
        load: () => import('./standards/JS.PF.CON/conditionals-stacks-of-screens.mdx'),
      },
      {
        id: 'JS.PF.CON.COMBO',
        title: 'Conditionals \u00b7 Combined Screens (AND, OR & Short-Circuiting)',
        load: () => import('./standards/JS.PF.CON/conditionals-combined-screens.mdx'),
      },
      {
        id: 'JS.PF.CON.SWITCH',
        title: 'Conditionals \u00b7 Labeled Gates (switch vs if/else)',
        load: () => import('./standards/JS.PF.CON/conditionals-labeled-gates.mdx'),
      },
    ],
    loadIntro: () => import('./JS.PF.CON.mdx'),
  },
  'JS.PF.ITR': {
    chapters: [
      {
        id: 'JS.PF.ITR.INTRO',
        title: 'Iteration \u00b7 for Loops (Start, Stop, Step)',
        load: () => import('./standards/JS.PF.ITR/iteration-for-loops.mdx'),
      },
      {
        id: 'JS.PF.ITR.FOROF',
        title: 'Iteration \u00b7 for...of Loops (One Item at a Time)',
        load: () => import('./standards/JS.PF.ITR/iteration-forof-loops.mdx'),
      },
      {
        id: 'JS.PF.ITR.NEST',
        title: 'Iteration \u00b7 Nested for...of Loops',
        load: () => import('./standards/JS.PF.ITR/iteration-nested-forof-loops.mdx'),
      },
    ],
    loadIntro: () => import('./JS.PF.ITR.mdx'),
  },
  'JS.AR.MTH': {
    chapters: [
      {
        id: 'JS.AR.MTH.CALLBACKS',
        title: 'Callback Functions \u00b7 Let Arrays Run Your Code',
        load: () => import('./standards/JS.AR.MTH/callbacks.mdx'),
      },
      {
        id: 'JS.AR.MTH.MAP',
        title: 'Array Methods \u00b7 map() Transforms',
        load: () => import('./standards/JS.AR.MTH/map-transforms.mdx'),
      },
      {
        id: 'JS.AR.MTH.FILTER',
        title: 'Array Methods \u00b7 filter() Creates Subsets',
        load: () => import('./standards/JS.AR.MTH/filter-subsets.mdx'),
      },
      {
        id: 'JS.AR.MTH.LOOKUPS',
        title: 'Lookups & Validation \u00b7 find, some, every',
        load: () => import('./standards/JS.AR.MTH/lookups-validation.mdx'),
      },
      {
        id: 'JS.AR.MTH.REDUCE',
        title: 'Array Methods \u00b7 reduce() Summarizes',
        load: () => import('./standards/JS.AR.MTH/reduce-summarize.mdx'),
      },
      {
        id: 'JS.AR.MTH.ROSTERS',
        title: 'House Rosters \u00b7 map + join + Helpers',
        load: () => import('./standards/JS.AR.MTH/printing-rosters.mdx'),
      },
    ],
    loadIntro: () => import('./JS.AR.MTH.mdx'),
  },

  'JS.SD.ELM': {
    chapters: [
      {
        id: 'flow-diagrams',
        title: 'Flow Diagrams \u00b7 Tracking What Happens First',
        load: () => import('./standards/JS.SD.ELM/flow-diagrams.mdx'),
      },
      {
        id: 'dom-basics',
        title: 'DOM Basics \u00b7 The Page as Objects',
        load: () => import('./standards/JS.SD.ELM/dom-basics.mdx'),
      },
      {
        id: 'textcontent',
        title: 'textContent \u00b7 Put Plain Text on the Page',
        load: () => import('./standards/JS.SD.ELM/textcontent.mdx'),
      },

      {
        id: 'innerhtml-app-shell',
        title: 'innerHTML \u00b7 Render the App Shell',
        load: () => import('./standards/JS.SD.ELM/innerhtml-app-shell.mdx'),
      },
      {
        id: 'selecting-rendered-elements',
        title: 'Selecting Rendered Elements \u00b7 Find the List',
        load: () => import('./standards/JS.SD.ELM/selecting-rendered-elements.mdx'),
      },
      {
        id: 'importing-data',
        title: 'Importing Data \u00b7 Get the Potions',
        load: () => import('./standards/JS.SD.ELM/importing-data.mdx'),
      },
      {
        id: 'one-object-one-list-item',
        title: 'One Object \u2192 One List Item',
        load: () => import('./standards/JS.SD.ELM/one-object-one-list-item.mdx'),
      },
      {
        id: 'potionitem-component',
        title: 'PotionItem \u00b7 A Function That Returns HTML',
        load: () => import('./standards/JS.SD.ELM/potionitem-component.mdx'),
      },
      {
        id: 'map-full-list',
        title: 'Full List Render \u00b7 map() Turns Data Into HTML',
        load: () => import('./standards/JS.SD.ELM/map-full-list.mdx'),
      },
      {
        id: 'join-render-full-list',
        title: 'join("") \u00b7 One Big String for innerHTML',
        load: () => import('./standards/JS.SD.ELM/join-render-full-list.mdx'),
      },
      {
        id: 'render-function',
        title: 'Render Function \u00b7 Put the DOM Update in One Place',
        load: () => import('./standards/JS.SD.ELM/render-function.mdx'),
      },
    ],
    loadIntro: () => import('./JS.SD.ELM.mdx'),
  },

  'JS.SD.EVH': {
    chapters: [

      {
        id: 'JS.SD.EVH-01',
        title: 'Potion Shelf \u00b7 Rendering the List',
        load: () => import('./standards/JS.SD.EVH/potion-shelf-rendering-the-list.mdx'),
      },

      {
        id: 'JS.SD.EVH-02',
        title: 'Potion Shelf \u00b7 Listening for Clicks',
        load: () => import('./standards/JS.SD.EVH/potion-shelf-listening-for-clicks.mdx'),
      },

      {
        id: 'JS.SD.EVH-03',
        title: 'Potion Shelf \u00b7 The Event Object',
        load: () => import('./standards/JS.SD.EVH/potion-shelf-the-event-object.mdx'),
      },

      {
        id: 'JS.SD.EVH-04',
        title: 'Potion Shelf \u00b7 From Click to Data',
        load: () => import('./standards/JS.SD.EVH/potion-shelf-from-click-to-data.mdx'),
      },

      {
        id: 'JS.SD.EVH-05',
        title: 'Potion Shelf \u00b7 Listening for Changes',
        load: () => import('./standards/JS.SD.EVH/potion-shelf-listening-for-changes.mdx'),
      },

      {
        id: 'JS.SD.EVH-06',
        title: 'Potion Shelf \u00b7 Change \u2192 Filter \u2192 Re-render',
        load: () => import('./standards/JS.SD.EVH/potion-shelf-change-filter-rerender.mdx'),
      },

    ],
    loadIntro: () => import('./JS.SD.EVH.mdx'),
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
