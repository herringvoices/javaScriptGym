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
