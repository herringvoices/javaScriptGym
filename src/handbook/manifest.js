// Dynamic manifest for handbook MDX chapters.
// Add new entries by placing an <id>.mdx file in this folder and adding a mapping here.

export const handbookChapters = {
  overview: () => import('./overview.mdx'),
  'JS.VDT.PRM': () => import('./JS.VDT.PRM.mdx'),
  'JS.VDT.COL': () => import('./JS.VDT.COL.mdx'),
  'JS.VDT.MTH': () => import('./JS.VDT.MTH.mdx'),
  'JS.FN.BAS': () => import('./JS.FN.BAS.mdx'),
};

export const handbookOrder = [
  'overview',
  'JS.VDT.PRM',
  'JS.VDT.COL',
  'JS.VDT.MTH',
  'JS.FN.BAS',
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
        id: 'collections-overview',
        title: 'Collections Overview',
        load: () => import('./standards/JS.VDT.PRM/collections-overview.mdx'),
      },
    ],
    // Intro loader: reuse the existing top-level chapter as the intro
    loadIntro: () => import('./JS.VDT.PRM.mdx'),
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
