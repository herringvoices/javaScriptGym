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
